import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { gitOrigin, resolveDeployment } from "../scripts/pages-base";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}

interface CourseApi {
  course: {
    code: string;
  };
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const nodesOfType = (type: string) => api.nodes.filter((node) => node.type === type);

describe("assignment 2 spec promises", () => {
  it("adds assessment weight up to 100%", () => {
    const assessments = nodesOfType("assessments");
    const total = assessments.reduce((sum, node) => sum + Number(node.meta?.weight ?? 0), 0);
    expect(total, `assessment weights sum to ${total}, not 100`).toBe(100);
  });

  it("keeps the three digits the repo was provisioned with", () => {
    // The course code's last three digits (897) were assigned when this repo
    // was provisioned and are shared with no other course in the cohort; the
    // first digit is the course's level, and is free to change.
    expect(api.course.code.slice(-3), `course code is ${api.course.code}`).toBe("897");
  });

  it("has at least one lecture linking to a real deck in the built site", () => {
    const deployment = resolveDeployment(process.env, gitOrigin);
    const siteUrl = new URL(
      `${deployment.base.replace(/\/$/, "")}/`,
      deployment.site ?? "http://localhost",
    );
    const linkedDeck = nodesOfType("lectures").some((lecture) => {
      const page = readFileSync(resolve("dist", lecture.id, "index.html"), "utf8")
        .replace(/<!--[\s\S]*?-->/g, "");
      // Both slides metadata and Markdown links render as anchors. Inspect
      // their output so the check does not prescribe an authoring method.
      const links = page.matchAll(/<a\b[^>]*?\shref\s*=\s*(["'])(.*?)\1/gi);
      return [...links].some((link) => {
        try {
          const target = new URL(link[2], new URL(`${lecture.id}/`, siteUrl));
          if (target.origin !== siteUrl.origin || !target.pathname.startsWith(siteUrl.pathname)) {
            return false;
          }
          const path = decodeURIComponent(target.pathname.slice(siteUrl.pathname.length));
          if (!path.startsWith("decks/") || path === "decks/") return false;
          const builtPage = path.endsWith(".html") ? path : `${path.replace(/\/$/, "")}/index.html`;
          return existsSync(resolve("dist", builtPage));
        } catch {
          return false;
        }
      });
    });
    expect(linkedDeck, "no rendered lecture links to an existing built deck page").toBe(true);
  });

  it("runs a session across all twelve dated teaching weeks", () => {
    // data-integrity.test.ts already checks that every dated node falls
    // inside the teaching period; this checks the coverage promise itself,
    // that the twelve weeks are actually there.
    // A week may contain several sessions; coverage is about distinct weeks.
    const weeks = [...new Set(nodesOfType("sessions").map((node) => Number(node.meta?.week)))]
      .sort((a, b) => a - b);
    const expected = Array.from({ length: 12 }, (_, i) => i + 1);
    expect(weeks, `sessions cover weeks [${weeks.join(", ")}], not all twelve`).toEqual(expected);
  });
});
