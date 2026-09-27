# PROCESS.md 中文核对稿

> 对应根目录 [PROCESS.md](../../PROCESS.md) 的英文草稿，尚待你核对。正文中的“我”指你；代理执行的检查明确归属于代理。以下译文与英文正文逐段对应。

## 过程概述

在开始编写课程内容之前，我先要求 Codex 研究代理本身应该怎样工作。我希望 After Aincrad 从 2035 年的视角把 SAO 当作历史来讲，并为完全不了解背景的学生提供清晰的学习路线。我沿用了 Crit 5 的 harness，在 Claude 初始化项目时对它作了适配，并要求代理先测试修改，再投入使用（[0b50b24](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/0b50b24)、[c14d959](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/c14d959)）。

研究涵盖了 OpenAI 和 Anthropic 的指导、关于指令文件的研究，以及实践者的工作方法。我要求把这些建议放到我们的仓库任务中检验。两轮配对比较共进行了 18 次计分运行，使用独立的新测试环境、固定的初始代码与配置，以及放在被测代理工作区之外、预先冻结的评分器。18 次运行都通过了机械检查。随后，一名独立代理检查了匿名化输出，发现，有一个生成的正则表达式会把另一个 HTML 属性中的 href 文本当作真实链接。负责整合的代理复现了这个错误，后来改用 HTML 解析器的检查通过了 31 个有效与无效案例。这一发现让“检查评估工具本身”成为验收的一部分。最终采用的 harness 明确了何时需要规划、应该加载哪些上下文，以及何时验证已经足够，也去掉了重复的构建流程（[2b885c8](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/2b885c8)、[785b1ce](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/785b1ce)）。

当来源、设计选择或失败需要调查时，我要求继续开展研究。要进一步了解我是怎样指导这项工作的，我推荐阅读三份文档：[详细实现目标](../planning/implementation-goals.md)规定了五个人工审阅节点及其验收条件；[实现研究记录](../IMPLEMENTATION-RESEARCH.md)，尤其是评估器复现检查和第四节点决策部分，把来源、备选方案与设计选择联系起来；[过程证据库](../PROCESS-EVIDENCE.md)则保留问题、修正和 commit 证据。我要求代理在决策变化时持续维护它们。CLAUDE.md 保存可复用的规则，PLAN.md 保存当前状态和下一步行动。这样，每个新阶段都能重新找到要求、作出某项选择的理由，以及接受该结果的证据（[c14d959](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/c14d959)、[c14d959...8d518f9](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/compare/c14d959...8d518f9)）。

工作流程因此形成了这样的顺序：研究、规划、实现一个代表性单元、检查它，再在我审阅后扩展。不同代理分别负责教学文案、来源、界面和幻灯片；负责整合的代理对照文件、原始来源和浏览器输出核实它们的发现。当我澄清历史视角时，审查发现第二周仍在比较宣传材料和作品发布日期。修订后的计划同时改变了阅读材料、活动和考核：学生现在围绕案例叙述及其段落引用开展工作，所链接的来源说明则交代实际依据的作品。CLAUDE.md 随之要求先介绍陌生术语，并把课前准备、研讨课产出和考核联系起来（[1c27051...9741b89](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/compare/1c27051...9741b89)）。

我对导航的反馈进一步检验了这门课是否方便使用。学生需要一个明确的起点，同时 Atlas 和其他重要资料也应保持显眼。最终方案把每周学习路线与资料直达入口结合起来。浏览器检查发现，手机端周次选择器被放在很长的导览说明之后，内嵌幻灯片的控件也超出了显示框。代理修正了这两项问题，并在 1920×1080 和 390×844 下检查真实布局。这些发现转化为 CLAUDE.md 中对首个操作入口和内嵌幻灯片的明确检查要求。测试负责保护阅读顺序的一致性、准备时间总计和跨周链接；历史叙述的语气、视觉吸引力与课程连贯性，我留给真人审阅（[9741b89](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/9741b89)、[7625ae9](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/7625ae9)）。
