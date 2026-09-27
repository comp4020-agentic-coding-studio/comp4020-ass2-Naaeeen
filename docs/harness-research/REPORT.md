# A2 CLAUDE.md 研究、比较与改进记录

研究日期：2026-09-27。状态：研究、独立审查、两轮共18次配对运行和最终文件更新已完成。结果属于本项目的探索性证据，不是普遍最优或统计优胜证明。

## 决策目标与范围

目标是改善这个 Ubuntu / Astro 课程网站项目中代理的实际行为：完成授权任务、遵守固定平台、有效验证、诚实记录证据，并减少过度研究、重复检查、无关防御性文字和推测性代码。不能仅靠文件更短、规则更多或社区项目更热门来判定质量。

只修改项目规则及本次研究/评估记录。课程内容、学生的 PROCESS.md、个人凭据、全局模型设置、sandbox、审批机制、插件和远端状态均不属于本次修改目标。

本地核实：源版本为 `148cd779e18c365957c343f7e54f4e3671951896`；Codex CLI 0.157.1，配置模型为 gpt-6-astra、effort 为 ultra，workspace-write/on-request；Ubuntu 中 Claude Code 为 2.1.283。这些是本次环境事实，不是对所有项目的推荐设置。

## 证据怎样使用

课程原文和实际仓库决定项目要求。官方产品文档用于确认加载、命令和配置行为；原始实验用于判断其测量范围内的效果；厂商工程文章和作者实践用于提出可测试假设。实验论文也不能取消课程明确要求。

完整来源与版本见 [sources.md](sources.md)。没有把打不开的社交帖当作已核实原文，也没有把阅读官方演讲幻灯片说成观看了完整录像。

## 原始研究与能得出的结论

| 研究 | 方法与主要结果 | 不能据此推出什么 |
| --- | --- | --- |
| [Evaluating AGENTS.md v2](https://arxiv.org/html/2602.11988v2)，2026-06-23 | SWE-bench Lite 300 个任务/11 个 Python 仓库，加 CTXbench 138 个任务/12 个仓库，覆盖四种 agent/model 组合。相对无文件，LLM 文件的成功率差异不显著（p=.87/.37），开发者文件相对无文件亦不显著（p=.21）；LLM 文件的平均成本增加约20%/23%。 | 不能沿用旧版“显著降低成功率”的标题；不显著不等于严格等效。长度/类别消融也没有给出固定最佳长度。全部 Python 任务，不能直接代表我们的 Astro 内容创作。 |
| [Efficiency of AI Coding Agents v2](https://arxiv.org/html/2601.20404v2)，2026-03-30 | 124 个 PR、10 个仓库，只用 GPT-5.2-Codex，比较有/无根指令文件。时间中位数降低28.64%，输出 token 降低16.58%，但总 token 中位数增加1.29%。 | 只有50个任务的人工 sanity check，没有完整功能正确性评估。不能宣称“相同质量下总 token 降低”。 |
| [Agentless v2](https://arxiv.org/html/2407.01489v2)，2024-10-29 | GPT-4o 与 SWE-bench Lite 300 个任务。候选筛选从多数票77个成功，加入回归测试81个，再加入复现测试96个。 | 213个能在旧代码上失败的复现测试，只有94个在参考补丁上确认修复；单纯看到红灯不是测试正确的证明。不能照搬旧模型的候选数量。 |
| [Lost in the Middle v3](https://arxiv.org/html/2307.03172v3)，2023-11-20 | 旧模型上的多文档问答和键值检索实验表明，信息位置可影响检索表现，任务与模型之间也有差异。 | 不是当前 Codex/Claude 的指令长度或压缩设置实验，不能推出“到50%必须清空”或“规则要首尾重复”。 |

这些研究支持的保守结论是：保留本项目真实需要的约束，并检验效果；尚无足够证据证明一个跨模型、跨任务的最佳 CLAUDE.md。

## 官方指导如何转成项目规则

- **上下文按需使用。** [Claude Code best practices](https://code.claude.com/docs/en/best-practices) 与 [Astra 专项文章](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra) 都支持按任务规模决定规划与读取范围。我们保留约束和入口，让 README 保存平台事实、PLAN 保存当前状态；不要求每个小改动重新读全部文档。
- **完成边界明确。** [当前 GPT-6 指南](https://developers.openai.com/api/docs/guides/latest-model) 支持完成已授权工作，再报告真实验证和剩余限制。外部发布权限仍按用户授权处理。
- **验证要有因果意义。** 本仓库 `check → test → build` 已包含构建，额外再跑 build 会重复。修复应复现问题，并确认检查同时接受合法方案、拒绝违规方案；真实 UI 修改仍需浏览器证据。
- **迭代有停止条件。** [Anthropic 长程 harness 案例](https://www.anthropic.com/engineering/harness-design-long-running-apps) 提醒，模型能力变化会改变 harness 需求，更多轮次不总是更好。采用独立审查并处理有证据的发现，而不为凑轮次持续增加复杂度。
- **规则文件并不强制执行。** [Claude memory](https://code.claude.com/docs/en/memory) 与 [Codex discovery](https://learn.chatgpt.com/docs/agent-configuration/agents-md) 的加载机制不同。保留相同 AGENTS 桥接，核查实际读取；文字规则不替代运行时权限和测试。

## “Defensive writing”分开评估

1. **表达层面：**结论明确，使用具体语言，避免不必要的免责声明、套话、夸张营销和重复解释。真实限制仍必须说明。
2. **认识层面：**区分官方要求、仓库事实、设计提议与未验证的判断。不能为显得果断而虚构来源或把构建通过说成浏览器通过。
3. **代码层面：**沿用已有 schema，验证真实外部边界，保留可诊断错误；避免为不存在的情境添加静默 fallback、宽泛 catch 或新抽象。这是待本地验证的工程建议，并不等于禁止错误处理。

[Claude prompting guidance](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) 对某些 Claude 版本的过度触发、过度认真和防御代码有明确建议，但不能当作 GPT-6 上已完成的因果实验。

文案质量采用匿名输出的独立评分，按事实保留、自然清楚和必要限制评估；不通过禁词计数或单纯字数给质量打分。

## 常见方法的取舍

| 方法 | 采用方式 |
| --- | --- |
| Explore → Plan → Implement → Verify | 有不确定性或跨文件影响时先计划；小而明确的任务直接完成。 |
| 独立 reviewer / 并行研究 | 用于边界清晰的研究和审查；课程目标、考核与十二周叙事相互依赖，不默认拆成十二个独立作者。参见[官方演讲材料](https://resources.anthropic.com/hubfs/Claude%20Code%20Advanced%20Patterns_%20Subagents,%20MCP,%20and%20Scaling%20to%20Real%20Codebases.pdf)。 |
| Command → Agent → Skill | 参考[作者原始例子](https://github.com/shanraisshan/claude-code-best-practice/blob/b70072cc2fed48b710ddb555b66c3d0ad7c40641/orchestration-workflow/orchestration-workflow.md)的职责划分；不为已有课程脚本增加三层包装。 |
| Ralph 持续循环 | 不作为默认流程。[官方版本](https://github.com/anthropics/claude-plugins-official/tree/fa59bc9037741ecfa131aa27938272605710d7b2/plugins/ralph-loop)通过 Stop hook 重发提示；promise 匹配并非独立验收。A2 的未完成内容和本人过程叙述不能靠无限循环解决。 |

Ralph 默认脚本没有正数迭代上限，但客户端另有防止无进展 Stop 阻塞的机制，故也不能简单说“必然无限运行”。未安装或启用任何循环。

## 对用户指定实践仓库的审计

固定检查 [b70072cc2fed48b710ddb555b66c3d0ad7c40641](https://github.com/shanraisshan/claude-code-best-practice/tree/b70072cc2fed48b710ddb555b66c3d0ad7c40641)，而非混用搜索缓存版本。

它是有价值的实践索引与示范。其自身规则包含逐文件提交、约50%手动 compact，配置包含广泛工具允许项、自动启用项目 MCP 和声音 hooks。这些并非其效果已经通过对照实验验证的证据，也不适合整包复制到 A2。保留连贯修改提交、任务相关工具和现有授权边界。

## 设置决策

| 设置 | 本次决定与理由 |
| --- | --- |
| 模型与 reasoning effort | 保持现有 Astra/ultra，作为 A/B 的固定条件。未做 effort 比较，不声称 ultra 最优。 |
| sandbox / approvals | 保持现有设置；没有 bypass、ignore-rules 或新增自动授权。 |
| context / compaction | 不改窗口或百分比。采用阶段性 PLAN 交接；无通用最优重启阈值证据。 |
| plugins / MCP / hooks | 不新增、不自动导入。已有脚本和工具足以完成当前工作。 |
| CLAUDE / AGENTS | 保留课程要求的 CLAUDE 正文及短 AGENTS 入口。默认加载另行观察，不与文字效果混为一谈。 |
| 验证频率 | 由真实改动、失败或未解疑点触发；文档小改不强行创造应用单测。 |

## 对照实验协议

固定模型、effort、全局规则、依赖和初始源版本。每次使用新的独立 fixture 和 ephemeral 会话；只替换 CLAUDE 内容。两组先显式读取相同位置的 AGENTS 与各自的 CLAUDE，以测量已加载指导的效果；这不同于默认加载可靠性。

六个开发实例：修正过强 deck 检查、只读解释已知失败、小型元数据修改、显示标签修改、准备本人 PROCESS 的事实材料、简短学生文案。两个预留实例用于最终版本确认；作者知道其大致类型，所以不能称完全未知盲测。

最初计划28次；用户要求加快后，保留首轮六案的A/B共12次，最终稿只复测D6写作及预留H1/H2，共6次。总计18次。调整在预留任务结果出现之前记录，判据不变。每个 trial 上限480秒，最多两个 case pair 并行，配对顺序交替并在第二轮反转。共享机器和服务缓存会影响时间，时间记录不等于严格速度基准。

评分器先接受正确结果、拒绝合理错误结果，再冻结。评分器与判据位于被测代理工作区之外并校验哈希。客观属性以最终文件和真实测试为准；主观结果另做独立匿名审查。基础设施失败、超时和模型行为失败分别记录，不静默删除。原始轨迹只在本地保留，丢弃 reasoning 文本。

## 静态审查与版本

- A：现有文件，810个空白分隔词，106行。
- v1：首稿，906词，58行。行数更少不代表上下文更短。
- v2：根据独立审查修复三处措辞，953词，58行，作为首个运行候选。修复保护错误断言、只读任务触发写入、禁止虚构误伤设计提议的问题。
- 这些数字是描述性指标，不是质量评分。详情见 [review-01.md](review-01.md)。

## 实验结果与最终选择

已安装v3：844词、103行；与v2的953词相比删去了重复表达，但仍比原稿810词略长。增加的是来源判断、写作与授权边界，不能用长度单独评价质量。独立内容审查未发现阻断问题。

| 对照 | 范围 | 机械验收 |
| --- | --- | --- |
| 原稿 A vs v2 B | D1–D6，六组配对 | 12/12通过 |
| 原稿 A vs最终v3 B | D6、H1、H2，三组配对 | 6/6通过 |

最终v3只重测了后三类任务，不能说它经过了六类任务的完整重复验证。参见 [结果摘要](results-summary.json)、[第一轮匿名审查](blind-review-r1.json)和[最终匿名审查](blind-review-final.json)。

第一轮独立匿名审查发现一个自动评分漏检的P2：原稿条件下生成的某个正则，会把其他HTML属性内的href文字当作真正链接。父代理用精确正则复现了这个提取错误。候选条件下的对应产物包含该反例且正确处理。这个单一观察支持保留独立审查，不能证明候选在所有编码任务上更强，也不能把机械全绿等同完整正确。

最终六份匿名产物未发现实质虚构、验证夸大或来源层级错误；必要的诚实限制不作为坏的防御性写作扣分。部分遮蔽/省略记录不能独立重建，审查保留uncertain项。

首轮耗时有快有慢，不支持“新版全面更快”。输入、缓存输入、输出token及命令次数按客户端实测保存在摘要；不把它们合并成一个质量分数或货币成本。

初次控制批次只启动了2个任务，另10个未启动。Codex自动在配置中登记临时仓库触发了过严的原始哈希检查；删除仅那两个登记块的内存副本，能精确恢复原哈希。模型、effort、sandbox、审批和其他配置内容未变。后续仅排除本轮精确预声明路径的正常trusted登记，同时记录原始哈希。没有手工修改真实个人配置。详情见 [环境控制修订](environment-control-amendment.md)。

另一个初期评分错误是隐藏地禁止D1新增合理helper/tests和PLAN记录；已由独立审查纠正并重新校准。原记录保留，未把它包装成原稿缺陷。见 [范围控制修订](scope-control-amendment.md)。

部分被测代理的pnpm命令触发自动依赖安装并受到sandbox限制；独立评分器用已安装、固定版本的Astro/Vitest入口验证最终产物。这证明的是产物检查结果，不是代理自行成功执行了所有命令。代理是否诚实说明限制另由匿名审查判断。

本次模型运行使用Codex CLI，而不是Claude模型的跨提供商比较；Claude部分依据其官方文档、原始工程材料和本机版本。A/B统一显式读取指令，验证已加载文本的行为；未额外声称桌面当前聊天或普通网页ChatGPT会自动同步Ubuntu文件。

最后，重新核对[课程AI政策](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/ai-use-and-integrity/)后，修正了过度限制PROCESS协助的措辞：课程允许AI草拟但由人负责，禁止虚假过程叙述。我们的应用是可以按请求忠实整理、起草或编辑用户提供的真实笔记；不能编造经历、动机和验证结果，或自主填满模板。这是对两份课程文件的协调解释，不是捏造一个额外禁令。

选择v3的理由是约束和触发条件更清楚、去除重复验证、保留真实反馈和必要限制，并通过独立审查及重点回归验证。没有证据声称它是所有模型和任务的最佳文件。

## 应用与验证范围

实际根CLAUDE.md与受测v3逐字节相同。AGENTS入口保持原样；课程源码、spec、包配置和PROCESS.md未改。Markdown差异与一致性检查通过。项目原有的缺周和starter证据红灯仍属于课程内容待办。

原始运行轨迹仅本地保存且忽略Git；可提交的文档保留来源、协议、评估器、候选历史、审查与去敏摘要。没有发布、推送或启用新工具。
