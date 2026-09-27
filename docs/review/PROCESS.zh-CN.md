# PROCESS.md 中文核对稿

> 对应根目录 [PROCESS.md](../../PROCESS.md) 的英文草稿。正文中的“我”指你；代理完成的检查会明确写成代理的工作。以下六段与英文逐段对应，供你核对。

## 过程概述

After Aincrad 是一门设定在 2035 年、以《刀剑神域》为基础的历史课。我希望不了解 SAO 的学生也能看懂发生了什么，知道先读什么、每周要做什么。在开始制作这些页面之前，我先要求 Codex 研究自己应该怎样开展工作。它阅读了 OpenAI 和 Anthropic 的指导、有关指令文件的研究，以及实践者的案例。我从 Crit 5 的规则开始，Claude 在初始化课程网站时已经对这些规则作了适配（[0b50b24](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/0b50b24)）。

我要求代理在新的项目副本里，用原有规则和修改后的规则完成相同的小任务。用来判断结果的代码保存在这些副本之外。纳入比较的 18 次运行全部通过了自动检查。随后，另一个审阅代理发现了一个很能说明问题的错误：某个检查会把“看起来像链接的文字”算作链接，但实际上那里根本没有可以点击的链接。主代理先复现这个问题，再替换检查方法。新方法读取 HTML 中真实的链接，并通过了 31 个有效和无效案例。这让独立审阅有了一项具体任务：检查测试本身有没有问对问题（[2b885c8](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/2b885c8)、[785b1ce](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/785b1ce)）。

实现时，我采用了三种做法：遇到不确定的选择，先核对作业说明和原始文档；修改网站多个部分之前，先写一份简短计划；把不同文件交给不同代理负责，再由主代理核实它们的结果。我也要求代理把已经作出的决定记录下来。

[实现目标](../planning/implementation-goals.md)写清了五次由我审阅之前，各阶段必须准备好什么。[研究记录](../IMPLEMENTATION-RESEARCH.md)保存来源、备选方案和选择理由。[证据库](../PROCESS-EVIDENCE.md)把重要问题、修复和 commits 联系起来。这是我推荐 tutor 阅读的三份文档。持续更新它们，意味着下一项任务可以从已经作出的决定继续。CLAUDE.md 保存后续工作要遵循的规则；PLAN.md 则说明目前做到哪里、下一步做什么（[c14d959](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/c14d959)、[c14d959...8d518f9](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/compare/c14d959...8d518f9)）。

我们先完成了一个完整教学周，再扩展课程（[4fc9cde](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/4fc9cde)）。后来，我进一步说明，应该把 SAO 当作在课程世界里真实发生过的事件来讲。审阅发现，第二周仍然要求学生比较宣传材料和作品发布日期。我们先修改计划和 CLAUDE.md 中的规则，再一起修改阅读材料、活动、幻灯片和考核。现在，学生比较对事件的不同叙述，并引用具体段落；另一个来源说明页面交代这些材料依据哪些作品。CLAUDE.md 也要求每周的课前准备和课堂活动与考核衔接起来（[1c27051...9741b89](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/compare/1c27051...9741b89)）。

我也指出了导航过于拥挤的问题。学生需要一个清楚的起点，同时 Atlas 等有用页面仍应容易找到。修改后，网站在每周学习路线旁保留了资料直达链接。随后，浏览器检查发现，手机上的周次选择器被放在一大段介绍下面。代理把它移到了首屏，并在 CLAUDE.md 中加入规则，要求检查手机上的起始操作入口是否可见。测试负责检查阅读顺序、准备时间总计，以及第九周到第二周讲义的链接等具体事项。至于文字的语气、吸引力和课程整体是否连贯，我留在自己的审阅中判断（[9741b89](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/9741b89)、[7625ae9](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/7625ae9)）。
