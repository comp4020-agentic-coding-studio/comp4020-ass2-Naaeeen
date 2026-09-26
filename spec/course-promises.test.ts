import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

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

  it("has at least one lecture whose deck actually exists in the built site", () => {
    const lectures = nodesOfType("lectures");
    const withDeck = lectures.filter((node) => typeof node.meta?.slides === "string");
    expect(withDeck.length, "no lecture declares a `slides` deck link").toBeGreaterThan(0);

    const resolved = withDeck.some((node) =>
      existsSync(resolve(`dist${node.meta!.slides as string}index.html`)),
    );
    expect(resolved, "no lecture's `slides` link resolves to a built deck page").toBe(true);
  });

  it("runs a session across all twelve dated teaching weeks", () => {
    // data-integrity.test.ts already checks that every dated node falls
    // inside the teaching period; this checks the coverage promise itself,
    // that the twelve weeks are actually there.
    const weeks = nodesOfType("sessions")
      .map((node) => Number(node.meta?.week))
      .sort((a, b) => a - b);
    const expected = Array.from({ length: 12 }, (_, i) => i + 1);
    expect(weeks, `sessions cover weeks [${weeks.join(", ")}], not all twelve`).toEqual(expected);
  });
});
