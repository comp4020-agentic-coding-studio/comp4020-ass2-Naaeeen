# PROCESS.md 中文核对稿

> 对应根目录 [PROCESS.md](../../PROCESS.md) 的英文草稿。正文中的“我”指你；代理执行的检查明确归属于代理。以下六段与英文逐段对应，供你核对。

## 过程概述

《刀剑神域》最初吸引了我去学习计算机。我希望 After Aincrad 这门设定在 2035 年的历史课，能让不了解 SAO 的学生也理解其中发生的事件。在开始编写课程内容之前，我先要求 Codex 研究 OpenAI 和 Anthropic 的指导、有关指令文件的研究，以及实践者的方法。来源、研究报告、候选指令和实验结果都保存在 [harness 研究文件夹](../harness-research/README.md)中。我的起点是 Crit 5 的指令，Claude 在初始化项目时已经对它们作了适配（[0b50b24](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/0b50b24)）。

我们比较的“规则”，就是 CLAUDE.md 中给代理的工作指令：应该读哪些文件、什么时候先做计划、怎样检查自己的工作。Codex 根据研究起草修改版，再让原版和修改版完成仓库中的一些小任务。共进行了 18 次计分运行，每组比较都从初始内容相同的独立项目副本开始，只有 CLAUDE.md 的版本不同；模型和设置保持不变。我们保留了浏览器检查，加入独立审阅，并要求代理先为不确定的修改做计划、只读取相关文件。我们还删去了重复构建的指令。选中的做法写入 CLAUDE.md，我要求代理后续按它执行。AGENTS.md 则明确要求 Codex 在编辑前阅读这个文件（[2b885c8](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/2b885c8)）。

评估既看代码，也看代理的行为：是否保留已有修改、是否在只读任务中保持文件不变，以及是否如实说明实际运行了哪些检查。比较输出之前，我们就确定这些标准，并把判定结果的代码放在被测项目副本之外，检查它有没有被改动。18 次结果全部通过了自动检查。随后，另一名代理在不知道各份输出来自哪个指令版本的情况下进行审阅，发现了一次误判：某段看起来像链接的文字被算作链接，但实际上并没有可以点击的内容。主代理先复现问题，再把文字搜索改成检查 HTML 中真实的链接。新方法通过了 31 个有效和无效案例。检查测试本身，也由此成为决定是否接受结果的一部分（[785b1ce](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/785b1ce)）。

实现也沿用这套循环：先研究一个选择、做计划、实现一小部分、比较和审阅结果，再更新下一项任务的指令。不同代理分别负责教学、资料来源、界面和幻灯片文件，主代理核实它们的发现。我们使用相同课程材料比较首页布局，并先完成一个教学周，再扩展整个课程（[800ed14](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/800ed14)、[4fc9cde](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/4fc9cde)）。我推荐 tutor 阅读三份工作文档：[目标文件](../planning/implementation-goals.md)说明五次由我审阅前必须准备好什么；[实现研究](../IMPLEMENTATION-RESEARCH.md)记录来源和选择；[过程证据](../PROCESS-EVIDENCE.md)把重要问题、修复与 commits 联系起来。我要求持续更新它们，让后续任务能接着已有决定推进。PLAN.md 记录下一步任务、已完成的检查，以及仍未决定的事项（[c14d959...8d518f9](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/compare/c14d959...8d518f9)）。

一次重要修正始于我再次强调：应该把 SAO 当作课程世界里发生过的事件来讲。审阅发现，第二周仍在比较宣传材料和作品发布日期。我们先修改计划和 CLAUDE.md，再一起修改阅读材料、活动、幻灯片和考核。现在，学生比较对事件的不同叙述，并引用具体段落，来源说明则标明这些材料依据哪些作品。Harness 也要求课前准备和课堂活动与考核相衔接。这样，历史课的定位实际影响了学生要做的事（[1c27051...9741b89](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/compare/1c27051...9741b89)）。

当这份过程叙述显得太抽象时，我再次采用了比较。两轮比较使用同一组事实和标准，由新的审阅代理评阅，隐藏版本标签，并交换阅读顺序。我要求把有依据的长处结合起来；代理则对照 commits 核实审阅者提出的问题。由此形成的写作规则要求写清实际要求、观察结果和具体修改。测试负责保护阅读顺序、跨周链接等细节；文字语气、吸引力和课程是否连贯，仍由我在审阅节点判断（[9bc8a25](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Naaeeen/commit/9bc8a25)）。
