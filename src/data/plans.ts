export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoList {
  id: string;
  title: string;
  titleEn: string;
  items: TodoItem[];
}

export interface Goal {
  id: string;
  name: string;
  nameEn: string;
  targetAge: number;
  targetDate: string;
  progress: number;
}

export interface FinancialEntry {
  age: number;
  targetSavings: string;
  actualSavings?: string;
  monthlyIncome?: string;
  monthlyExpense?: string;
  notes?: string;
}

export interface Plan {
  id: 'A' | 'B' | 'C' | 'D';
  name: string;
  nameEn: string;
  description: string;
  careerGoal: string;
  skills: string[];
  interests: string[];
  monthlyPlan: TodoList;
  weeklyPlan: TodoList;
  goals: Goal[];
  todoLists: TodoList[];
  portfolioProjects: TodoList;
  sideHustleTasks: TodoList;
  skillsToLearn: TodoList;
  financialTimeline: FinancialEntry[];
  targetRetireAge: string;
}

export const BIRTHDAY = '2004-11-09';

export const plans: Plan[] = [
  {
    id: 'A',
    name: 'Plan A',
    nameEn: 'Aggressive PM Track',
    description: '冲高薪产品，激进存钱，快速躺平',
    careerGoal: '产品经理',
    skills: ['Figma', 'AE', '需求分析', '原型设计', 'PRD文档'],
    interests: ['产品设计', '用户研究', '数据分析', 'UI设计'],
    monthlyPlan: {
      id: 'amp1',
      title: '本月计划',
      titleEn: 'Monthly Plan',
      items: [
        { id: 'amp1-1', text: '每周存下实习工资50%', completed: false },
        { id: 'amp1-2', text: 'Figma保持熟练，每周练习2次', completed: false },
        { id: 'amp1-3', text: '周末做1套副业模板', completed: false },
        { id: 'amp1-4', text: '学习产品知识体系，每周读1本书', completed: false },
        { id: 'amp1-5', text: '更新作品集，完成1个项目', completed: false }
      ]
    },
    weeklyPlan: {
      id: 'awp1',
      title: '本周任务',
      titleEn: 'Weekly Tasks',
      items: [
        { id: 'awp1-1', text: '周一～周五：上班/实习，下班纯休息', completed: false },
        { id: 'awp1-2', text: '周六上午：做1套Figma模板', completed: false },
        { id: 'awp1-3', text: '周六下午：学习产品方法论', completed: false },
        { id: 'awp1-4', text: '周日上午：上传模板到平台', completed: false },
        { id: 'awp1-5', text: '周日下午：整理作品集', completed: false }
      ]
    },
    targetRetireAge: '27-29岁',
    goals: [
      { id: 'a1', name: '搬出去自己住', nameEn: 'Live Alone', targetAge: 25, targetDate: '2029-11-09', progress: 0 },
      { id: 'a2', name: '养宠物', nameEn: 'Get Pet', targetAge: 26, targetDate: '2030-11-09', progress: 0 },
      { id: 'a3', name: '实现躺平', nameEn: 'Retire Early', targetAge: 28, targetDate: '2032-11-09', progress: 0 }
    ],
    todoLists: [
      {
        id: 'at1',
        title: '到9月必须完成',
        titleEn: 'Must Complete by Sep',
        items: [
          { id: 'at1-1', text: '作品集3个项目全部做完', completed: false },
          { id: 'at1-2', text: '副业上架 ≥30套模板', completed: false },
          { id: 'at1-3', text: '存款从2万 → 4万–5万', completed: false },
          { id: 'at1-4', text: '产品知识体系建立完', completed: false },
          { id: 'at1-5', text: '准备秋招简历和面试', completed: false }
        ]
      }
    ],
    portfolioProjects: {
      id: 'app1',
      title: '作品集项目',
      titleEn: 'Portfolio Projects',
      items: [
        { id: 'app1-1', text: '项目1：智能家居控制小程序 - 写用户痛点', completed: false },
        { id: 'app1-2', text: '项目1：智能家居控制小程序 - 画功能流程图', completed: false },
        { id: 'app1-3', text: '项目1：智能家居控制小程序 - 做低保真原型', completed: false },
        { id: 'app1-4', text: '项目1：智能家居控制小程序 - 做高保真界面', completed: false },
        { id: 'app1-5', text: '项目2：校园效率工具 - 确定主题和信息架构', completed: false },
        { id: 'app1-6', text: '项目2：校园效率工具 - 核心流程拆解', completed: false },
        { id: 'app1-7', text: '项目3：B端订单管理后台 - 表格列表页', completed: false },
        { id: 'app1-8', text: '项目3：B端订单管理后台 - 筛选搜索功能', completed: false }
      ]
    },
    sideHustleTasks: {
      id: 'ash1',
      title: '副业任务',
      titleEn: 'Side Hustle',
      items: [
        { id: 'ash1-1', text: '产品简历模板 ×3', completed: false },
        { id: 'ash1-2', text: '产品作品集模板', completed: false },
        { id: 'ash1-3', text: 'PRD需求文档模板', completed: false },
        { id: 'ash1-4', text: '用户流程图组件', completed: false },
        { id: 'ash1-5', text: '小程序原型套件', completed: false },
        { id: 'ash1-6', text: '表单/弹窗组件库', completed: false },
        { id: 'ash1-7', text: '产品周报PPT模板', completed: false },
        { id: 'ash1-8', text: '数据信息图模板', completed: false }
      ]
    },
    skillsToLearn: {
      id: 'asl1',
      title: '技能培养',
      titleEn: 'Skills to Learn',
      items: [
        { id: 'asl1-1', text: 'Figma高级技巧 - 组件系统', completed: false },
        { id: 'asl1-2', text: '用户体验设计方法论', completed: false },
        { id: 'asl1-3', text: '数据分析基础 - SQL', completed: false },
        { id: 'asl1-4', text: '需求分析与优先级排序', completed: false },
        { id: 'asl1-5', text: '产品路线图规划', completed: false },
        { id: 'asl1-6', text: 'A/B测试基础', completed: false },
        { id: 'asl1-7', text: '跨部门沟通技巧', completed: false },
        { id: 'asl1-8', text: '原型评审与反馈', completed: false }
      ]
    },
    financialTimeline: [
      { age: 22, targetSavings: '4万-5万', actualSavings: '3万', monthlyIncome: '实习150/天', notes: '本金2万' },
      { age: 23, targetSavings: '11.5万-16万', monthlyIncome: '9k-12k', monthlyExpense: '4k', notes: '年存7.5万-10万' },
      { age: 24, targetSavings: '24万-33万', monthlyIncome: '12k-16k', monthlyExpense: '5k', notes: '年存10万-13万' },
      { age: 25, targetSavings: '40万-55万', monthlyIncome: '15k-20k', monthlyExpense: '6k', notes: '年存13万-17万' },
      { age: 26, targetSavings: '62万-85万', monthlyIncome: '18k-24k', monthlyExpense: '7k' },
      { age: 27, targetSavings: '88万-120万', monthlyIncome: '22k-28k', monthlyExpense: '8k' },
      { age: 28, targetSavings: '100万-150万', monthlyIncome: '25k-35k', monthlyExpense: '10k', notes: '被动收入1万/月' },
      { age: 29, targetSavings: '120万-200万', monthlyIncome: '25k-35k', monthlyExpense: '10k', notes: '躺平线' }
    ]
  },
  {
    id: 'B',
    name: 'Plan B',
    nameEn: 'Steady Assistant Track',
    description: '中小厂轻量助理，稳扎稳打，最稳妥主流方案',
    careerGoal: '产品助理/交互助理',
    skills: ['Figma', 'AE', '原型绘制', '流程图', 'PRD文档'],
    interests: ['交互设计', '后台产品', '文档编写', '轻量开发'],
    monthlyPlan: {
      id: 'bmp1',
      title: '本月计划',
      titleEn: 'Monthly Plan',
      items: [
        { id: 'bmp1-1', text: '每周存下实习工资50%', completed: false },
        { id: 'bmp1-2', text: 'Figma熟练绘制原型', completed: false },
        { id: 'bmp1-3', text: '佛系做副业素材，每周随缘1套', completed: false },
        { id: 'bmp1-4', text: '完成轻量版作品集', completed: false },
        { id: 'bmp1-5', text: '学习后台产品基础', completed: false }
      ]
    },
    weeklyPlan: {
      id: 'bwp1',
      title: '本周任务',
      titleEn: 'Weekly Tasks',
      items: [
        { id: 'bwp1-1', text: '周一～周五：上班/实习，下班纯休息', completed: false },
        { id: 'bwp1-2', text: '周六：2小时 → 佛系做手绘素材', completed: false },
        { id: 'bwp1-3', text: '周日：30分钟 → 上传平台 + 简单整理', completed: false }
      ]
    },
    targetRetireAge: '27-29岁',
    goals: [
      { id: 'b1', name: '搬出去自己住', nameEn: 'Live Alone', targetAge: 25, targetDate: '2029-11-09', progress: 0 },
      { id: 'b2', name: '养宠物', nameEn: 'Get Pet', targetAge: 26, targetDate: '2030-11-09', progress: 0 },
      { id: 'b3', name: '实现躺平', nameEn: 'Retire Early', targetAge: 28, targetDate: '2032-11-09', progress: 0 }
    ],
    todoLists: [
      {
        id: 'bt1',
        title: '到9月必须完成',
        titleEn: 'Must Complete by Sep',
        items: [
          { id: 'bt1-1', text: '轻量作品集2个项目完成', completed: false },
          { id: 'bt1-2', text: '副业上架 ≥20套手绘素材/模板', completed: false },
          { id: 'bt1-3', text: '存款从2万 → 4万–4.5万', completed: false },
          { id: 'bt1-4', text: '掌握产品助理基础技能', completed: false }
        ]
      }
    ],
    portfolioProjects: {
      id: 'bpp1',
      title: '作品集项目',
      titleEn: 'Portfolio Projects',
      items: [
        { id: 'bpp1-1', text: '项目1：小程序基础功能原型', completed: false },
        { id: 'bpp1-2', text: '项目1：简单用户场景梳理', completed: false },
        { id: 'bpp1-3', text: '项目1：基础功能流程图', completed: false },
        { id: 'bpp1-4', text: '项目2：后台管理系统基础界面', completed: false },
        { id: 'bpp1-5', text: '项目2：信息架构梳理', completed: false },
        { id: 'bpp1-6', text: '项目2：列表、筛选、详情页原型', completed: false }
      ]
    },
    sideHustleTasks: {
      id: 'bsh1',
      title: '副业任务',
      titleEn: 'Side Hustle',
      items: [
        { id: 'bsh1-1', text: '简约产品原型组件包', completed: false },
        { id: 'bsh1-2', text: '基础流程图组件', completed: false },
        { id: 'bsh1-3', text: '极简表单/弹窗组件', completed: false },
        { id: 'bsh1-4', text: '助理岗周报、文档模板', completed: false },
        { id: 'bsh1-5', text: '手绘手账素材', completed: false },
        { id: 'bsh1-6', text: '小红书极简手绘封面', completed: false }
      ]
    },
    skillsToLearn: {
      id: 'bsl1',
      title: '技能培养',
      titleEn: 'Skills to Learn',
      items: [
        { id: 'bsl1-1', text: '原型绘制规范', completed: false },
        { id: 'bsl1-2', text: '流程图绘制技巧', completed: false },
        { id: 'bsl1-3', text: 'PRD文档写作', completed: false },
        { id: 'bsl1-4', text: '后台产品基础', completed: false },
        { id: 'bsl1-5', text: '交互设计原则', completed: false },
        { id: 'bsl1-6', text: '需求文档整理', completed: false }
      ]
    },
    financialTimeline: [
      { age: 22, targetSavings: '4万-4.5万', monthlyIncome: '实习150/天', notes: '本金2万' },
      { age: 23, targetSavings: '10万-12万', monthlyIncome: '7k-9k', monthlyExpense: '3k', notes: '年存6万' },
      { age: 24, targetSavings: '16万-18万', monthlyIncome: '8k-10k', monthlyExpense: '3.5k', notes: '年存6万' },
      { age: 25, targetSavings: '22万-24万', monthlyIncome: '8k-10k', monthlyExpense: '3.5k', notes: '年存6万' },
      { age: 26, targetSavings: '30万-33万', monthlyIncome: '9k-11k', monthlyExpense: '4k' },
      { age: 27, targetSavings: '38万-45万', monthlyIncome: '9k-11k', monthlyExpense: '4k', notes: '躺平起点' },
      { age: 28, targetSavings: '45万-55万', monthlyIncome: '副业', monthlyExpense: '4k' },
      { age: 29, targetSavings: '55万-65万', monthlyIncome: '副业', monthlyExpense: '4k', notes: '极简躺平安全线' }
    ]
  },
  {
    id: 'C',
    name: 'Plan C',
    nameEn: 'Full-time Side Hustle',
    description: '毕业全职居家副业，时间自由，不确定性最高',
    careerGoal: '全职副业创作者',
    skills: ['Figma', '手绘', 'Canva', '剪映', '小红书运营'],
    interests: ['设计', '插画', '自媒体', '内容创作'],
    monthlyPlan: {
      id: 'cmp1',
      title: '本月计划',
      titleEn: 'Monthly Plan',
      items: [
        { id: 'cmp1-1', text: '每周稳定产出2套模板', completed: false },
        { id: 'cmp1-2', text: '小红书账号更新，每周3篇', completed: false },
        { id: 'cmp1-3', text: '批量上架平台', completed: false },
        { id: 'cmp1-4', text: '研究爆款模板逻辑', completed: false },
        { id: 'cmp1-5', text: '维护素材库，整理分类', completed: false }
      ]
    },
    weeklyPlan: {
      id: 'cwp1',
      title: '本周任务',
      titleEn: 'Weekly Tasks',
      items: [
        { id: 'cwp1-1', text: '周一～周五：实习，下班研究平台规则', completed: false },
        { id: 'cwp1-2', text: '周六：4小时 → 批量做手绘素材', completed: false },
        { id: 'cwp1-3', text: '周日：2小时 → 上架全平台、更新小红书', completed: false }
      ]
    },
    targetRetireAge: '27-29岁',
    goals: [
      { id: 'c1', name: '搬出去自己住', nameEn: 'Live Alone', targetAge: 25, targetDate: '2029-11-09', progress: 0 },
      { id: 'c2', name: '养宠物', nameEn: 'Get Pet', targetAge: 26, targetDate: '2030-11-09', progress: 0 },
      { id: 'c3', name: '实现躺平', nameEn: 'Retire Early', targetAge: 28, targetDate: '2032-11-09', progress: 0 }
    ],
    todoLists: [
      {
        id: 'ct1',
        title: '到9月必须完成',
        titleEn: 'Must Complete by Sep',
        items: [
          { id: 'ct1-1', text: '副业上架≥50套模板/手绘素材', completed: false },
          { id: 'ct1-2', text: '小红书账号成型，有基础流量', completed: false },
          { id: 'ct1-3', text: '存款从2万 → 4.5万–5万', completed: false },
          { id: 'ct1-4', text: '吃透4个平台分成规则', completed: false }
        ]
      }
    ],
    portfolioProjects: {
      id: 'cpp1',
      title: '作品集项目',
      titleEn: 'Portfolio Projects',
      items: [
        { id: 'cpp1-1', text: '手绘治愈系元素合集', completed: false },
        { id: 'cpp1-2', text: '手账素材包设计', completed: false },
        { id: 'cpp1-3', text: '简约贴纸设计', completed: false },
        { id: 'cpp1-4', text: 'Canva小红书封面模板', completed: false },
        { id: 'cpp1-5', text: '简历/PPT模板设计', completed: false },
        { id: 'cpp1-6', text: '醒图/美图秀秀人像装饰素材', completed: false }
      ]
    },
    sideHustleTasks: {
      id: 'csh1',
      title: '副业任务',
      titleEn: 'Side Hustle',
      items: [
        { id: 'csh1-1', text: '剪映静态手绘模板', completed: false },
        { id: 'csh1-2', text: '图文模板设计', completed: false },
        { id: 'csh1-3', text: 'Figma产品/办公极简模板组件包', completed: false },
        { id: 'csh1-4', text: '小红书极简手绘封面', completed: false },
        { id: 'csh1-5', text: '治愈系日程模板', completed: false },
        { id: 'csh1-6', text: '简约几何线条插画', completed: false },
        { id: 'csh1-7', text: '工业风极简装饰画', completed: false },
        { id: 'csh1-8', text: '宠物手绘周边素材', completed: false }
      ]
    },
    skillsToLearn: {
      id: 'csl1',
      title: '技能培养',
      titleEn: 'Skills to Learn',
      items: [
        { id: 'csl1-1', text: '手绘技巧提升', completed: false },
        { id: 'csl1-2', text: 'Canva高级技巧', completed: false },
        { id: 'csl1-3', text: '剪映视频剪辑', completed: false },
        { id: 'csl1-4', text: '小红书运营技巧', completed: false },
        { id: 'csl1-5', text: '爆款内容分析', completed: false },
        { id: 'csl1-6', text: '电商选品思路', completed: false },
        { id: 'csl1-7', text: '品牌视觉设计', completed: false },
        { id: 'csl1-8', text: '客户沟通技巧', completed: false }
      ]
    },
    financialTimeline: [
      { age: 22, targetSavings: '4.5万-5万', monthlyIncome: '实习150/天', notes: '本金2万' },
      { age: 23, targetSavings: '7.5万-9万', monthlyIncome: '2k-4k', monthlyExpense: '2k', notes: '起步期' },
      { age: 24, targetSavings: '12万-15万', monthlyIncome: '3.5k-6k', monthlyExpense: '2.5k', notes: '年存4.5万-6万' },
      { age: 25, targetSavings: '18万-22万', monthlyIncome: '4k-7k', monthlyExpense: '3k', notes: '年存5万-7万' },
      { age: 26, targetSavings: '25万-30万', monthlyIncome: '5k-8k', monthlyExpense: '3.5k' },
      { age: 27, targetSavings: '32万-38万', monthlyIncome: '6k-9k', monthlyExpense: '4k', notes: '被动占比80%' },
      { age: 28, targetSavings: '40万-45万', monthlyIncome: '7k-10k', monthlyExpense: '4.5k' },
      { age: 29, targetSavings: '48万-55万', monthlyIncome: '7k-10k', monthlyExpense: '4.5k', notes: '彻底自由' }
    ]
  },
  {
    id: 'D',
    name: 'Plan D',
    nameEn: 'Basic Job Backup',
    description: '基础岗过渡兜底，稳收入+养副业，最保底退路',
    careerGoal: '监控/店员/服务生',
    skills: ['监控操作', '客户服务', '手绘', '时间管理', '副业运营'],
    interests: ['安静工作', '副业创作', '休闲生活', '宠物'],
    monthlyPlan: {
      id: 'dmp1',
      title: '本月计划',
      titleEn: 'Monthly Plan',
      items: [
        { id: 'dmp1-1', text: '每周存下工资50%', completed: false },
        { id: 'dmp1-2', text: '佛系做副业素材', completed: false },
        { id: 'dmp1-3', text: '保持手绘手感', completed: false },
        { id: 'dmp1-4', text: '了解考证信息', completed: false }
      ]
    },
    weeklyPlan: {
      id: 'dwp1',
      title: '本周任务',
      titleEn: 'Weekly Tasks',
      items: [
        { id: 'dwp1-1', text: '周一～周五：实习，下班休息', completed: false },
        { id: 'dwp1-2', text: '周六：2小时 → 做副业模板/手绘素材', completed: false },
        { id: 'dwp1-3', text: '周日：30分钟 → 上传整理', completed: false }
      ]
    },
    targetRetireAge: '27-29岁',
    goals: [
      { id: 'd1', name: '搬出去自己住', nameEn: 'Live Alone', targetAge: 25, targetDate: '2029-11-09', progress: 0 },
      { id: 'd2', name: '养宠物', nameEn: 'Get Pet', targetAge: 26, targetDate: '2030-11-09', progress: 0 },
      { id: 'd3', name: '实现躺平', nameEn: 'Retire Early', targetAge: 28, targetDate: '2032-11-09', progress: 0 }
    ],
    todoLists: [
      {
        id: 'dt1',
        title: '到9月必须完成',
        titleEn: 'Must Complete by Sep',
        items: [
          { id: 'dt1-1', text: '副业上架≥20套素材', completed: false },
          { id: 'dt1-2', text: '了解监控岗考证信息', completed: false },
          { id: 'dt1-3', text: '存款从2万 → 4万–4.5万', completed: false }
        ]
      }
    ],
    portfolioProjects: {
      id: 'dpp1',
      title: '作品集项目',
      titleEn: 'Portfolio Projects',
      items: [
        { id: 'dpp1-1', text: '手绘素材合集整理', completed: false },
        { id: 'dpp1-2', text: 'Canva模板设计', completed: false },
        { id: 'dpp1-3', text: '简历模板优化', completed: false }
      ]
    },
    sideHustleTasks: {
      id: 'dsh1',
      title: '副业任务',
      titleEn: 'Side Hustle',
      items: [
        { id: 'dsh1-1', text: '手绘素材创作', completed: false },
        { id: 'dsh1-2', text: 'Canva模板制作', completed: false },
        { id: 'dsh1-3', text: '醒图/剪映模板', completed: false },
        { id: 'dsh1-4', text: 'Figma轻量组件', completed: false }
      ]
    },
    skillsToLearn: {
      id: 'dsl1',
      title: '技能培养',
      titleEn: 'Skills to Learn',
      items: [
        { id: 'dsl1-1', text: '手绘基础练习', completed: false },
        { id: 'dsl1-2', text: 'Canva基础操作', completed: false },
        { id: 'dsl1-3', text: '副业运营基础', completed: false },
        { id: 'dsl1-4', text: '监控证考试准备', completed: false }
      ]
    },
    financialTimeline: [
      { age: 22, targetSavings: '4万-4.5万', monthlyIncome: '实习150/天', notes: '本金2万' },
      { age: 23, targetSavings: '8.8万-9.3万', monthlyIncome: '5.5k-7k', monthlyExpense: '2.5k', notes: '年存4.8万' },
      { age: 24, targetSavings: '13.6万-14.1万', monthlyIncome: '6k-7.5k', monthlyExpense: '2.5k', notes: '年存4.8万' },
      { age: 25, targetSavings: '16万-20万', monthlyIncome: '6.5k-8k', monthlyExpense: '3k', notes: '年存4.8万' },
      { age: 26, targetSavings: '22万-26万', monthlyIncome: '7k-8.5k', monthlyExpense: '3k' },
      { age: 27, targetSavings: '28万-34万', monthlyIncome: '7k-8.5k', monthlyExpense: '3k', notes: '躺平起点' },
      { age: 28, targetSavings: '35万-42万', monthlyIncome: '副业', monthlyExpense: '3.5k' },
      { age: 29, targetSavings: '42万-50万', monthlyIncome: '副业', monthlyExpense: '3.5k', notes: '彻底脱离基础岗' }
    ]
  }
];

export const getPlanById = (id: string): Plan | undefined => {
  return plans.find(p => p.id === id);
};
