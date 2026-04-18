import { Phase } from '@/lib/types';

export const curriculum: Phase[] = [
  {
    id: 'phase-a',
    name: 'AI 认知扫盲',
    description: '理解 AI 能做什么、不能做什么，建立对 LLM 的基本认知',
    color: '#6366f1',
    status: 'active',
    units: [
      {
        id: 'a1',
        name: 'LLM 基本原理',
        phase: 'phase-a',
        jdSkills: ['理解 LLM 工作原理'],
        read: {
          items: [
            { type: 'article', title: '什么是 LLM（大语言模型）？它是怎么「生成」回答的？' },
            { type: 'article', title: 'Token 和上下文长度：为什么 LLM 有记忆限制？' },
            { type: 'article', title: '什么是「幻觉」？为什么 LLM 会一本正经地胡说八道？' },
            { type: 'article', title: '一阶推理 vs 思维链（Chain-of-Thought）：AI 是怎么「思考」的？' },
          ],
        },
        understand: [
          'LLM 和传统程序有什么本质区别？（提示：一个是规则驱动，一个是统计概率）',
          '为什么 LLM 有时会「一本正经地胡说八道」？',
          '如果让你向一个 10 岁小孩解释「Token」，你会怎么说？',
        ],
        experiment: {
          title: '探索 ChatGPT / Claude / Kimi',
          description: '打开任意 AI 对话工具，做以下实验：\n1. 问一个你知道答案的事实问题\n2. 问一个创意问题（写诗/编故事）\n3. 问一个它可能答错的问题\n记录：AI 在什么情况下表现好？在什么情况下开始胡说？',
          verification: '记录至少 3 个 AI 回答，包含正确和错误的例子',
        },
        output: {
          title: '费曼输出：用外婆能懂的话解释 LLM',
          prompt: '用一段话向外婆解释「什么是 LLM」。想象你在给她打电话解释你的新工作。',
          constraints: ['100 字以内', '不允许出现「神经网络」「深度学习」「参数」「Transformer」等词'],
          wordLimit: 100,
        },
        status: 'pending',
      },
      {
        id: 'a2',
        name: 'AI 产品能做什么',
        phase: 'phase-a',
        jdSkills: ['对 AI 充满热情，相信 AI 能促进创新'],
        read: {
          items: [
            { type: 'article', title: '案例：金融行业 AI 应用（智能客服、风险评估、文档处理）' },
            { type: 'article', title: '案例：零售行业 AI 应用（个性化推荐、智能选品、库存预测）' },
            { type: 'article', title: '案例：运动领域 AI 应用（Whoop、Garmin Connect 的 AI 功能分析）' },
          ],
        },
        understand: [
          '哪些工作 AI 做得比人好？哪些 AI 还做不到？',
          '在你熟悉的领域（软件开发/铁三），哪些场景最适合 AI 介入？',
          '「AI 能促进创新」这句话怎么理解？举一个具体的例子。',
        ],
        experiment: {
          title: '研究 TrainingPeaks 的 AI 功能',
          description: '搜索或使用 TrainingPeaks，找出：\n1. TrainingPeaks 目前有哪些 AI 相关功能？\n2. 这些功能解决了什么问题？没解决什么？\n3. 如果你是 PM，你会先做什么 AI 功能？',
          verification: '输出一份 TrainingPeaks AI 功能分析报告（至少 5 个功能点）',
        },
        output: {
          title: '费曼输出：AI 在训练中能帮教练做什么？',
          prompt: '用一段话向一位完全不懂 AI 的教练解释：「AI 可以在训练中帮我做什么？」',
          constraints: ['100 字以内', '不允许用术语，要用生活化的比喻'],
          wordLimit: 100,
        },
        status: 'pending',
      },
      {
        id: 'a3',
        name: 'AI 产品经理是什么',
        phase: 'phase-a',
        jdSkills: ['具备敏锐的商业判断，又乐于亲自动手实践'],
        read: {
          items: [
            { type: 'article', title: 'AI PM 和传统 PM 有什么区别？' },
            { type: 'article', title: 'AI PM 的日常工作：写 Prompt、评数据、调效果' },
            { type: 'article', title: '为什么 AI 产品上线才是开始？（AI 产品 vs 软件产品）' },
          ],
        },
        understand: [
          '传统 PM 的核心技能是「需求分析 + 项目管理」，AI PM 还需要什么额外能力？',
          '为什么 AI PM 需要「亲自动手」而不是只写 PRD？',
          '「让 AI 产品真正落地成功」这句话意味着什么？难点在哪？',
        ],
        experiment: {
          title: '对比 AI PM JD 和传统 PM JD',
          description: '搜索一份传统软件 PM 的 JD，对比你发给我的 Inspire AI PM JD，找出：\n1. 两份 JD 的核心差异\n2. AI PM 多出了哪些要求',
          verification: '输出一份对比分析，至少包含 5 个差异点',
        },
        output: {
          title: '费曼输出：AI PM 和普通 PM 的最大区别',
          prompt: '写一段话告诉一位想转型的同事：「AI PM 和普通 PM 的最大区别是什么」',
          constraints: ['150 字以内', '要具体，不要泛泛而谈'],
          wordLimit: 150,
        },
        status: 'pending',
      },
      {
        id: 'a4',
        name: '自我差距评估与目标设定',
        phase: 'phase-a',
        jdSkills: ['自我认知，制定个性化学习路径'],
        read: {
          items: [
            { type: 'article', title: '重读 Inspire JD，标注所有你「已经会」的技能' },
            { type: 'article', title: '重读 Inspire JD，标注所有你「不会」的技能' },
            { type: 'article', title: '了解 RAG/Agent/Prompt Engineering 三大技术概念（预热）' },
          ],
        },
        understand: [
          '你现在的技能和 Inspire 要求之间，差距最大的是哪块？',
          '哪个差距是最容易补的？哪个是最难的？',
          '4-6 个月后，你想成为什么样的 AI PM？',
        ],
        experiment: {
          title: '完成技能评估表格',
          description: '在 Obsidian 或本应用中完成以下评估：\n1. 对照 Inspire 要求，给自己每项技能打分（0-5分）\n2. 找出最大差距\n3. 制定接下来 4 周的学习计划',
          verification: '输出一份完整的技能评估 + 行动计划文档',
        },
        output: {
          title: '费曼输出：6 个月后的自己',
          prompt: '写一段话，描述你 6 个月后的目标：「6个月后，我想成为______的 AI PM，我已经准备好______」',
          constraints: ['要具体，不要空洞', '写出你具体会什么、能交付什么'],
        },
        status: 'pending',
      },
    ],
  },
  {
    id: 'phase-b',
    name: '技术框架入门',
    description: '理解 RAG、Agent、Prompt Engineering 三大核心技能',
    color: '#8b5cf6',
    status: 'locked',
    units: [
      {
        id: 'b1',
        name: 'RAG 深度理解',
        phase: 'phase-b',
        jdSkills: ['理解并能应用 RAG、GraphRAG 等主流 AI 架构'],
        read: {
          items: [
            { type: 'article', title: 'RAG 全流程：文档切分 → Embedding → 向量检索 → 重排 → 生成' },
            { type: 'article', title: '什么是 Chunking（分块）？不同分块策略有什么区别？' },
            { type: 'article', title: '什么是 Embedding？向量相似度是如何工作的？' },
            { type: 'article', title: 'RAG vs Fine-tuning：什么时候用哪个？' },
            { type: 'article', title: 'GraphRAG 是什么？什么时候需要构建知识图谱？' },
          ],
        },
        understand: [
          '为什么 RAG 可以减少 LLM 的幻觉？',
          '什么情况下 RAG 会失效？有哪些典型失败场景？',
          '铁三教练 AI 场景下，知识库应该包含哪些内容？',
        ],
        experiment: {
          title: '用 Dify 搭一个 RAG 对话机器人',
          description: '用 Dify（本地或云端）搭一个最简单的 RAG 对话机器人：\n1. 上传一份铁三训练科普文档\n2. 问它关于文档内容的问题\n3. 故意问一个文档里没有的问题，看它怎么回答',
          verification: '记录 RAG 的 3 个成功案例和 1 个失败案例',
        },
        output: {
          title: '费曼输出：AI 怎么知道用什么知识回答？',
          prompt: '用一段话向一位教练解释：「我的 AI 怎么知道该用什么知识来回答你的问题？」想象你在给一位完全不懂技术的教练打比方。',
          constraints: ['100 字以内', '不允许用「向量」「Embedding」「检索」等词', '用生活化的比喻'],
          wordLimit: 100,
        },
        status: 'pending',
      },
      {
        id: 'b2',
        name: 'Agent 与工作流',
        phase: 'phase-b',
        jdSkills: ['Agent、ReAct、Agentic Workflow 等主流 AI 工作流架构'],
        read: {
          items: [
            { type: 'article', title: '什么是 ReAct（Reason + Act）？AI 是怎么思考→行动→再思考的？' },
            { type: 'article', title: 'Plan-and-Execute vs Action-Agent：两者适用场景' },
            { type: 'article', title: '什么是 Tool-use？Agent 怎么调用外部工具？' },
            { type: 'article', title: '什么是 Agentic Workflow？多步骤任务如何分解？' },
          ],
        },
        understand: [
          '铁三教练 AI 场景下，哪些任务需要 Agent？哪些不需要？',
          '「训练计划制定」这个任务，Agent 需要哪几步？',
          '如果 AI 给出了错误的训练建议，风险有多大？这个场景适合用 Agent 吗？',
        ],
        experiment: {
          title: '用 Dify 工作流搭「训练计划制定」流程',
          description: '用 Dify 的「工作流」功能搭一个训练计划制定流程：\n输入：本周训练目标（如「提高游泳耐力」）\n步骤1：AI 分析目标合理性\n步骤2：AI 从知识库查找建议\n步骤3：AI 生成训练计划\n输出：一周训练计划',
          verification: '跑通整个流程，记录哪个步骤最容易出错',
        },
        output: {
          title: '费曼输出：AI 是怎么一步步制定训练计划的？',
          prompt: '用一段话向一位教练解释：「AI 是怎么一步步制定训练计划的」——像讲故事一样，从教练输入到最终输出，中间发生了什么？',
          constraints: ['150 字以内', '像讲故事，不要像在写技术文档'],
          wordLimit: 150,
        },
        status: 'pending',
      },
      {
        id: 'b3',
        name: 'Prompt Engineering 进阶',
        phase: 'phase-b',
        jdSkills: ['Prompt Engineering 与上下文管理，能让 AI 稳定、可解释地输出结果'],
        read: {
          items: [
            { type: 'article', title: '结构化 Prompt：System / Context / Examples / Output Format 四层结构' },
            { type: 'article', title: 'Few-shot Learning：怎么给 AI 举例子让它学会格式？' },
            { type: 'article', title: 'Chain-of-Thought：怎么引导 AI「想一想」再回答？' },
            { type: 'article', title: '输出稳定性：温度、Top-p、Stop Sequences 如何影响输出' },
          ],
        },
        understand: [
          '为什么同样的问题，不同的 Prompt 会得到完全不同的答案？',
          '什么是「上下文管理」？在长对话中 AI 为什么会忘记早期内容？',
          'Prompt 的「温度」设高和设低，各适合什么场景？',
        ],
        experiment: {
          title: '为「训练数据解读」写 Prompt',
          description: '为「训练数据解读」场景写一个结构化 Prompt：\n1. 任务：用户上传一周的训练数据，AI 输出一段解读\n2. 要求：输出格式稳定（必须包含：训练量、强度、恢复建议）\n3. 测试：准备 5 个不同类型的训练数据 case\n4. 优化：基于测试结果迭代 Prompt，记录每次变更的原因',
          verification: '输出一版 Prompt + 5 个测试 case 的结果对比',
        },
        output: {
          title: '费曼输出：我的 Prompt 设计思路',
          prompt: '描述你现在的 Prompt 设计思路：你的 Prompt 是什么？结构是怎样的？如果满分 10 分，你给自己几分？为什么？',
          constraints: ['100 字以内', '要诚实，不要自夸'],
        },
        status: 'pending',
      },
      {
        id: 'b4',
        name: '交互设计与用户体验',
        phase: 'phase-b',
        jdSkills: ['AI 产品交互设计，会话式应用、多模态交互的用户体验设计'],
        read: {
          items: [
            { type: 'article', title: '会话式 UX 设计原则：AI 对话不是「搜索框 + 结果列表」' },
            { type: 'article', title: '信任设计：AI 建议不确定时，如何告知用户？' },
            { type: 'article', title: '错误处理：AI 答错了，怎么让用户觉得「系统很好」？' },
          ],
        },
        understand: [
          '为什么 AI 产品不能用「输入 → 输出」的简单逻辑来设计？',
          '铁三教练场景下，用户（教练）和 AI 对话时，最担心什么？',
          '如何设计 AI 的「不确定性表达」？什么情况下 AI 应该「少说为妙」？',
        ],
        experiment: {
          title: '设计「铁三教练 AI 助手」的对话流程',
          description: '设计「铁三教练 AI 助手」的对话流程：\n1. 用户（教练）可能问什么问题？\n2. AI 在什么时机应该主动提问？什么时候应该直接给建议？\n3. 当 AI 不确定答案时，应该怎么回复？\n4. 画出用户对话流程图（可用文字描述）',
          verification: '输出一份完整的对话流程图（文字版也可以）',
        },
        output: {
          title: '费曼输出：3 个「危险」的 AI 回答',
          prompt: '设计 3 个「危险」的 AI 回答——即 AI 如果这样说，教练可能会误解或者做出错误决策。然后写出：应该怎么改？为什么这样改？',
          constraints: ['每个危险回答 + 改进方案，字数不限，但要讲清楚道理'],
        },
        status: 'pending',
      },
    ],
  },
  {
    id: 'phase-c',
    name: '项目正式启动',
    description: '从零到一启动铁三教练 AI 项目，完成需求确认到 MVP 验证',
    color: '#06b6d4',
    status: 'locked',
    units: [
      {
        id: 'c1',
        name: '需求确认与用户研究',
        phase: 'phase-c',
        jdSkills: ['对齐业务目标，明确 AI 项目的业务价值与成功指标'],
        read: {
          items: [
            { type: 'article', title: '怎么发现高价值的 AI 场景？Impact vs Feasibility 矩阵' },
            { type: 'article', title: '用户访谈怎么做：怎么问出教练真正的痛点而不是需求？' },
            { type: 'article', title: '业务价值怎么定义：OKR / 关键指标 / 成功标准' },
          ],
        },
        understand: [
          '教练最花时间的 3 件事是什么？AI 能帮哪件？',
          '怎么判断一个场景「值得做 AI」而不是「传统方法就够了」？',
          '如果「帮助教练节省 30% 分析时间」是 KPI，怎么验证？',
        ],
        experiment: {
          title: '访谈 3-5 位铁三教练',
          description: '访谈 3-5 位铁三教练（可以是朋友/同事），记录：\n1. 他们的工作流程是什么？\n2. 哪些工作让他们觉得烦/累/重复？\n3. 他们对 AI 的态度（期待？担心？）\n4. 如果 AI 能做一件事，他们最希望是哪件？',
          verification: '输出一份教练访谈摘要，包含 3 位教练的共同痛点',
        },
        output: {
          title: '费曼输出：教练访谈摘要',
          prompt: '写一份「教练访谈摘要」：3 位教练的共同痛点是什么？AI 最适合介入的场景是什么？',
          constraints: ['要具体，不要空洞', '用教练的原话会更好'],
        },
        status: 'pending',
      },
      {
        id: 'c2',
        name: '产品设计与技术方案',
        phase: 'phase-c',
        jdSkills: ['主导交互流程与用户旅程原型设计，规划 AI 介入节点及合理的人机协作方式'],
        read: {
          items: [
            { type: 'article', title: '用户旅程地图：Current State vs AI-Augmented State' },
            { type: 'article', title: '人机协作边界：AI 做什么，教练做什么？谁的判断优先级更高？' },
            { type: 'article', title: 'MVP 定义：最小可行功能是什么？哪些是 v1 不做的？' },
          ],
        },
        understand: [
          '「AI 辅助」和「AI 原生」有什么区别？铁三教练 AI 应该是哪种？',
          '如果 AI 给出的训练建议是错误的，谁来承担责任？',
          'MVP 的「最小」怎么定义？哪些是「看起来需要但其实 v1 不需要」？',
        ],
        experiment: {
          title: '画「铁三教练 AI 助手」的用户旅程地图',
          description: '画一张「铁三教练 AI 助手」的用户旅程地图：\n时间线：训练前一周 → 训练中 → 训练后\n在每个阶段，标注：AI 介入点、AI 做什么、教练做什么\n标注：哪些是 MVP 功能，哪些是 v2 功能',
          verification: '输出一份完整的用户旅程地图',
        },
        output: {
          title: '费曼输出：铁三教练 AI 的 MVP 是什么？',
          prompt: '用一段话向一位工程师描述「铁三教练 AI 的 MVP 是什么」。重点说明：教练用 MVP 能得到什么？不能得到什么？',
          constraints: ['150 字以内', '要清晰，不要模糊'],
          wordLimit: 150,
        },
        status: 'pending',
      },
      {
        id: 'c3',
        name: '数据集构建与验证',
        phase: 'phase-c',
        jdSkills: ['构建测试数据集（典型 / 边界 / 异常），组织种子用户验证与效果复盘'],
        read: {
          items: [
            { type: 'article', title: '什么是 Golden Cases（典型案例库）？怎么构建？' },
            { type: 'article', title: '边界案例（Edge Cases）：模糊输入、跨场景输入怎么处理？' },
            { type: 'article', title: '召回率 / 精确率 / 幻觉率：怎么衡量 AI 输出质量？' },
          ],
        },
        understand: [
          '为什么 AI 产品需要「测试数据集」？传统软件测试能替代吗？',
          '什么是「幻觉」？在铁三教练场景下，AI 幻觉可能造成什么后果？',
          '召回率和精确率，哪个更重要？取决于什么因素？',
        ],
        experiment: {
          title: '构建「训练数据解读」测试数据集',
          description: '为「训练数据解读」功能构建测试数据集：\n1. 收集 20 个真实训练 case\n2. 标注：每个 case 的期望输出\n3. 分类：10 个典型 case、5 个边界 case、5 个已知错误 case\n4. 跑一遍原型，记录每个 case 的输出质量',
          verification: '输出一份测试数据集 + 结果分析报告',
        },
        output: {
          title: '费曼输出：AI 表现最差的 3 个 case',
          prompt: '你收集的 20 个测试 case 中，AI 表现最差的 3 个是什么？为什么？这说明 Prompt 或知识库有什么问题？',
          constraints: ['要具体描述每个 case 的问题', '给出你的分析'],
        },
        status: 'pending',
      },
      {
        id: 'c4',
        name: 'MVP 上线与效果验证',
        phase: 'phase-c',
        jdSkills: ['定义 MVP 上线标准与关键指标，确保按期上线并达成业务目标'],
        read: {
          items: [
            { type: 'article', title: 'MVP 上线标准（Definition of Done）：什么情况下可以上线？' },
            { type: 'article', title: '灰度发布：怎么先让小部分用户用？' },
            { type: 'article', title: '上线后复盘：怎么判断「产品成功了」还是「产品失败了」？' },
          ],
        },
        understand: [
          '如果 MVP 只做一个功能，应该是哪个？为什么？',
          '「教练在 80% 的场景下愿意参考 AI 建议」——这个标准怎么测量？',
          '上线后第 1 周，最重要的监控指标是什么？',
        ],
        experiment: {
          title: '设计 MVP 监控仪表盘',
          description: '设计 MVP 监控仪表盘（可用飞书多维表格或 Excel）：\n指标 1：每日活跃教练数（DAU）\n指标 2：AI 建议采纳率\n指标 3：教练满意度评分\n指标 4：幻觉/错误出现次数\n设置每个指标的「告警阈值」',
          verification: '输出一份监控仪表盘设计文档',
        },
        output: {
          title: '费曼输出：MVP 电梯演讲',
          prompt: '假设明天 MVP 要上线了。你要给投资人来一段 2 分钟的介绍。你会说什么？写出你的「电梯演讲」。',
          constraints: ['300 字以内', '要有数字、有场景、有愿景'],
          wordLimit: 300,
        },
        status: 'pending',
      },
    ],
  },
  {
    id: 'phase-d',
    name: '运营体系建设',
    description: '建立数据驱动的持续运营机制，让 AI 产品越用越好',
    color: '#f59e0b',
    status: 'locked',
    units: [
      {
        id: 'd1',
        name: '数据飞轮设计',
        phase: 'phase-d',
        jdSkills: ['打造 AI 产品数据飞轮：错题标签体系、知识闭环、Prompt 热修复'],
        read: {
          items: [
            { type: 'article', title: '什么是数据飞轮？为什么 AI 产品需要数据飞轮？' },
            { type: 'article', title: '错题本体系：幻觉 / 理解错误 / 知识缺失 三类标签怎么定义？' },
            { type: 'article', title: 'Prompt 热修复：不改代码也能调整 Prompt 的机制设计' },
          ],
        },
        understand: [
          '数据飞轮和「产品迭代」有什么区别？为什么 AI 产品特别需要飞轮？',
          '怎么区分「AI 幻觉」「AI 理解错误」「知识库缺失」？区分的意义是什么？',
          'Prompt 热修复的风险是什么？怎么避免「改 Prompt 改坏了」？',
        ],
        experiment: {
          title: '设计「铁三教练 AI」错题本',
          description: '为铁三教练 AI 设计一套「错题本」：\n记录格式：日期 / 用户问题 / AI 回答 / 正确答案 / 错误类型 / 修复方案\n设计 3 个标签：幻觉 / 理解错误 / 知识缺失\n模拟 10 个错误 case，标注类型，给出修复方案',
          verification: '输出一份错题本模板 + 10 个模拟 case',
        },
        output: {
          title: '费曼输出：AI 运营负责人一天的工作',
          prompt: '用一段话描述「如果我是铁三教练 AI 的运营负责人，我的一天是怎么过的」，重点是怎么发现和修复 AI 的错误。',
          constraints: ['150 字以内', '像在讲故事，不要像在写工作流程'],
          wordLimit: 150,
        },
        status: 'pending',
      },
      {
        id: 'd2',
        name: '监控指标与持续优化',
        phase: 'phase-d',
        jdSkills: ['设计并构建数据驱动的 AI 产品持续运营机制，建立监控仪表盘'],
        read: {
          items: [
            { type: 'article', title: 'AI 产品指标体系：业务指标 vs AI 质量指标' },
            { type: 'article', title: 'A/B Prompt 测试：怎么科学地比较两个 Prompt 的效果？' },
            { type: 'article', title: '用户反馈闭环：显性反馈和隐性反馈怎么结合？' },
          ],
        },
        understand: [
          '「建议采纳率」是越高越好吗？有没有「采纳率过高」的问题？',
          '幻觉率多少算「可接受」？不同场景标准一样吗？',
          '如果某个指标持续下降，你首先检查什么？',
        ],
        experiment: {
          title: '搭建「铁三教练 AI 监控仪表盘」',
          description: '用 Grafana / 飞书多维表格搭建监控仪表盘：\n实时展示：DAU、AI 建议采纳率、幻觉率、响应延迟\n每周自动汇总：本周 Top 5 错误 case\n设置告警：指标超过阈值时通知',
          verification: '输出一份监控仪表盘设计文档，包含指标定义和告警规则',
        },
        output: {
          title: '费曼输出：AI 产品健康分设计',
          prompt: '给铁三教练 AI 设计一个「健康分」：从 0-100 分，基于哪些指标计算？各占多少权重？为什么这样设计？',
          constraints: ['要给出具体公式', '解释每个指标的权重理由'],
        },
        status: 'pending',
      },
    ],
  },
  {
    id: 'phase-e',
    name: '简历与面试',
    description: '把项目经历变成可呈现的简历素材，准备面试',
    color: '#10b981',
    status: 'locked',
    units: [
      {
        id: 'e1',
        name: '简历素材整理',
        phase: 'phase-e',
        jdSkills: ['把你做过的项目变成可呈现的简历素材'],
        read: {
          items: [
            { type: 'article', title: 'AI PM 简历怎么写：项目描述模板' },
            { type: 'article', title: '数字说话：怎么量化 AI 产品的成果？' },
            { type: 'article', title: 'STAR 法则：Situation / Task / Action / Result 怎么用？' },
          ],
        },
        understand: [
          '「主导」和「参与」在简历上有什么区别？',
          'AI 项目的成果怎么量化？有哪些常见的指标可以写？',
          'STAR 法则的每个部分，应该各占多少篇幅？',
        ],
        experiment: {
          title: '用 STAR 法则写「铁三教练 AI 项目」',
          description: '用 STAR 法则写「铁三教练 AI 项目」的经历：\nSituation：当时的背景\nTask：你作为 PM 负责什么\nAction：你具体做了什么（RAG 设计、Prompt 迭代、数据集构建等）\nResult：最终达成了什么指标',
          verification: '输出一份完整的 STAR 格式项目描述',
        },
        output: {
          title: '费曼输出：铁三教练 AI 项目描述（可直接用于简历）',
          prompt: '输出一份「铁三教练 AI」的项目描述，200 字以内，可以直接贴在简历上。',
          constraints: ['200 字以内', '要有数字、有技术细节、能体现 PM 能力'],
          wordLimit: 200,
        },
        status: 'pending',
      },
      {
        id: 'e2',
        name: '面试准备',
        phase: 'phase-e',
        jdSkills: ['能讲清楚每个技术决策的背景和权衡'],
        read: {
          items: [
            { type: 'article', title: '常见 AI PM 面试题清单（30 道）' },
            { type: 'article', title: '如何回答「你遇到的最大的技术挑战是什么」' },
            { type: 'article', title: '如何回答「你怎么做 Prompt 迭代的」' },
          ],
        },
        understand: [
          '「你为什么选择 RAG 而不是 Fine-tuning？」——怎么回答才不像在背书？',
          '「AI 幻觉怎么处理？」——面试官想听的是什么？',
          '「你有什么问题想问我？」——问面试官什么能加分？',
        ],
        experiment: {
          title: '准备 5 道高频 AI PM 面试题',
          description: '对着镜子或录音，准备以下 5 道题的 2 分钟回答：\n1. 讲一个你主导的 AI 产品项目，从需求到上线\n2. 你怎么判断一个场景适合用 RAG？\n3. Prompt 效果不好的时候你怎么排查？\n4. 你遇到过 AI 幻觉吗？怎么处理的？\n5. 人机协作的边界怎么定？\n回听录音，迭代优化。',
          verification: '录制 5 段回答音频（或文字稿），每段至少 90 秒',
        },
        output: {
          title: '费曼输出：AI PM 电梯演讲（自我介绍）',
          prompt: '你的「AI PM 电梯演讲」：如果给你 2 分钟介绍自己，你会说什么？（不是念简历，是展示你对 AI PM 的理解和你的项目经历）',
          constraints: ['2 分钟内能说完', '有热情、有逻辑、有数字'],
        },
        status: 'pending',
      },
    ],
  },
];
