import { create } from 'zustand';
import { plans, getPlanById, Goal, TodoList, FinancialEntry, Plan, TodoItem } from '../data/plans';

interface PlanState {
  currentPlanId: string;
  goals: Goal[];
  todoLists: TodoList[];
  monthlyPlan: TodoList;
  weeklyPlan: TodoList;
  portfolioProjects: TodoList;
  sideHustleTasks: TodoList;
  skillsToLearn: TodoList;
  financialRecords: FinancialEntry[];
  autoSaveEnabled: boolean;
  lastSaved: string;
  currentPlan: Plan | undefined;

  setCurrentPlan: (planId: string) => void;
  toggleTodoItem: (listId: string, itemId: string) => void;
  updateTodoItem: (listId: string, itemId: string, newText: string) => void;
  addTodoItem: (listId: string, afterItemId?: string) => void;
  removeTodoItem: (listId: string, itemId: string) => void;
  updateGoalProgress: (goalId: string, progress: number) => void;
  updateGoal: (goalId: string, updates: Partial<Goal>) => void;
  updateFinancialRecord: (age: number, field: keyof FinancialEntry, value: string) => void;
  updatePersonalInfo: (updates: Partial<Pick<Plan, 'careerGoal' | 'targetRetireAge'>>) => void;
  updateSkills: (newSkills: string[]) => void;
  updateInterests: (newInterests: string[]) => void;
  updateWeeklyRoutine: (dayId: string, newTasks: string[]) => void;
  setAutoSaveEnabled: (enabled: boolean) => void;
  setLastSaved: (timestamp: string) => void;
  loadFromLog: (data: { goals: Goal[], todoLists: TodoList[], financialRecords: FinancialEntry[], currentPlan: string }) => void;
  resetToDefault: () => void;
}

const getInitialState = (planId: string): Pick<PlanState, 'goals' | 'todoLists' | 'monthlyPlan' | 'weeklyPlan' | 'portfolioProjects' | 'sideHustleTasks' | 'skillsToLearn' | 'financialRecords' | 'currentPlan'> => {
  const plan = getPlanById(planId);
  if (plan) {
    return {
      currentPlan: plan,
      goals: JSON.parse(JSON.stringify(plan.goals)),
      todoLists: JSON.parse(JSON.stringify(plan.todoLists)),
      monthlyPlan: JSON.parse(JSON.stringify(plan.monthlyPlan)),
      weeklyPlan: JSON.parse(JSON.stringify(plan.weeklyPlan)),
      portfolioProjects: JSON.parse(JSON.stringify(plan.portfolioProjects)),
      sideHustleTasks: JSON.parse(JSON.stringify(plan.sideHustleTasks)),
      skillsToLearn: JSON.parse(JSON.stringify(plan.skillsToLearn)),
      financialRecords: JSON.parse(JSON.stringify(plan.financialTimeline))
    };
  }
  const emptyList: TodoList = { id: '', title: '', titleEn: '', items: [] };
  return { currentPlan: undefined, goals: [], todoLists: [], monthlyPlan: emptyList, weeklyPlan: emptyList, portfolioProjects: emptyList, sideHustleTasks: emptyList, skillsToLearn: emptyList, financialRecords: [] };
};

const updateTodoList = (list: TodoList, updater: (items: TodoItem[]) => TodoItem[]): TodoList => {
  return { ...list, items: updater(list.items) };
};

export const useStore = create<PlanState>((set) => ({
  currentPlanId: 'A',
  ...getInitialState('A'),
  autoSaveEnabled: false,
  lastSaved: '',
  currentPlan: getPlanById('A'),

  setCurrentPlan: (planId) => {
    if (plans.some(p => p.id === planId)) {
      const state = getInitialState(planId);
      set({
        currentPlanId: planId,
        ...state
      });
    }
  },

  toggleTodoItem: (listId, itemId) => {
    const updateItems = (items: TodoItem[]) => items.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    set((state) => ({
      todoLists: state.todoLists.map(list =>
        list.id === listId ? updateTodoList(list, updateItems) : list
      ),
      monthlyPlan: state.monthlyPlan.id === listId ? updateTodoList(state.monthlyPlan, updateItems) : state.monthlyPlan,
      weeklyPlan: state.weeklyPlan.id === listId ? updateTodoList(state.weeklyPlan, updateItems) : state.weeklyPlan,
      portfolioProjects: state.portfolioProjects.id === listId ? updateTodoList(state.portfolioProjects, updateItems) : state.portfolioProjects,
      sideHustleTasks: state.sideHustleTasks.id === listId ? updateTodoList(state.sideHustleTasks, updateItems) : state.sideHustleTasks,
      skillsToLearn: state.skillsToLearn.id === listId ? updateTodoList(state.skillsToLearn, updateItems) : state.skillsToLearn,
    }));
  },

  updateTodoItem: (listId, itemId, newText) => {
    const updateItems = (items: TodoItem[]) => items.map(item =>
      item.id === itemId ? { ...item, text: newText } : item
    );
    set((state) => ({
      todoLists: state.todoLists.map(list =>
        list.id === listId ? updateTodoList(list, updateItems) : list
      ),
      monthlyPlan: state.monthlyPlan.id === listId ? updateTodoList(state.monthlyPlan, updateItems) : state.monthlyPlan,
      weeklyPlan: state.weeklyPlan.id === listId ? updateTodoList(state.weeklyPlan, updateItems) : state.weeklyPlan,
      portfolioProjects: state.portfolioProjects.id === listId ? updateTodoList(state.portfolioProjects, updateItems) : state.portfolioProjects,
      sideHustleTasks: state.sideHustleTasks.id === listId ? updateTodoList(state.sideHustleTasks, updateItems) : state.sideHustleTasks,
      skillsToLearn: state.skillsToLearn.id === listId ? updateTodoList(state.skillsToLearn, updateItems) : state.skillsToLearn,
    }));
  },

  addTodoItem: (listId, afterItemId) => {
    const newItem: TodoItem = { id: `item-${Date.now()}`, text: '', completed: false };
    const updateItems = (items: TodoItem[]) => {
      if (!afterItemId) {
        return [...items, newItem];
      }
      const index = items.findIndex(item => item.id === afterItemId);
      if (index === -1) return [...items, newItem];
      const newItems = [...items];
      newItems.splice(index + 1, 0, newItem);
      return newItems;
    };
    set((state) => ({
      todoLists: state.todoLists.map(list =>
        list.id === listId ? updateTodoList(list, updateItems) : list
      ),
      monthlyPlan: state.monthlyPlan.id === listId ? updateTodoList(state.monthlyPlan, updateItems) : state.monthlyPlan,
      weeklyPlan: state.weeklyPlan.id === listId ? updateTodoList(state.weeklyPlan, updateItems) : state.weeklyPlan,
      portfolioProjects: state.portfolioProjects.id === listId ? updateTodoList(state.portfolioProjects, updateItems) : state.portfolioProjects,
      sideHustleTasks: state.sideHustleTasks.id === listId ? updateTodoList(state.sideHustleTasks, updateItems) : state.sideHustleTasks,
      skillsToLearn: state.skillsToLearn.id === listId ? updateTodoList(state.skillsToLearn, updateItems) : state.skillsToLearn,
    }));
  },

  removeTodoItem: (listId, itemId) => {
    const updateItems = (items: TodoItem[]) => items.filter(item => item.id !== itemId);
    set((state) => ({
      todoLists: state.todoLists.map(list =>
        list.id === listId ? updateTodoList(list, updateItems) : list
      ),
      monthlyPlan: state.monthlyPlan.id === listId ? updateTodoList(state.monthlyPlan, updateItems) : state.monthlyPlan,
      weeklyPlan: state.weeklyPlan.id === listId ? updateTodoList(state.weeklyPlan, updateItems) : state.weeklyPlan,
      portfolioProjects: state.portfolioProjects.id === listId ? updateTodoList(state.portfolioProjects, updateItems) : state.portfolioProjects,
      sideHustleTasks: state.sideHustleTasks.id === listId ? updateTodoList(state.sideHustleTasks, updateItems) : state.sideHustleTasks,
      skillsToLearn: state.skillsToLearn.id === listId ? updateTodoList(state.skillsToLearn, updateItems) : state.skillsToLearn,
    }));
  },

  updateGoalProgress: (goalId, progress) => {
    set((state) => ({
      goals: state.goals.map(goal => {
        if (goal.id === goalId) {
          return { ...goal, progress: Math.min(100, Math.max(0, progress)) };
        }
        return goal;
      })
    }));
  },

  updateGoal: (goalId, updates) => {
    set((state) => ({
      goals: state.goals.map(goal =>
        goal.id === goalId ? { ...goal, ...updates } : goal
      )
    }));
  },

  updateFinancialRecord: (age, field, value) => {
    set((state) => ({
      financialRecords: state.financialRecords.map(record => {
        if (record.age === age) {
          return { ...record, [field]: value };
        }
        return record;
      })
    }));
  },

  updatePersonalInfo: (updates) => {
    set((state) => ({
      currentPlan: state.currentPlan ? { ...state.currentPlan, ...updates } : state.currentPlan
    }));
  },

  updateSkills: (newSkills) => {
    set((state) => ({
      currentPlan: state.currentPlan ? { ...state.currentPlan, skills: newSkills } : state.currentPlan
    }));
  },

  updateInterests: (newInterests) => {
    set((state) => ({
      currentPlan: state.currentPlan ? { ...state.currentPlan, interests: newInterests } : state.currentPlan
    }));
  },

  updateWeeklyRoutine: () => {}, // 暂时留空

  setAutoSaveEnabled: (enabled) => {
    set({ autoSaveEnabled: enabled });
  },

  setLastSaved: (timestamp) => {
    set({ lastSaved: timestamp });
  },

  loadFromLog: (data) => {
    const plan = getPlanById(data.currentPlan);
    const state = getInitialState(data.currentPlan);
    set({
      currentPlanId: data.currentPlan,
      currentPlan: plan,
      goals: data.goals,
      todoLists: data.todoLists.length > 0 ? data.todoLists : state.todoLists,
      monthlyPlan: state.monthlyPlan,
      weeklyPlan: state.weeklyPlan,
      portfolioProjects: state.portfolioProjects,
      sideHustleTasks: state.sideHustleTasks,
      skillsToLearn: state.skillsToLearn,
      financialRecords: data.financialRecords
    });
  },

  resetToDefault: () => {
    const state = getInitialState('A');
    set({
      currentPlanId: 'A',
      ...state,
      lastSaved: ''
    });
  }
}));

export const useCurrentPlan = (): Plan | undefined => {
  return useStore((state) => state.currentPlan);
};
