import { useEffect, useMemo } from 'react';
import Header from './components/Header';
import PersonalInfo from './components/PersonalInfo';
import GoalCard from './components/GoalCard';
import TodoCard from './components/TodoCard';
import FinancialTimeline from './components/FinancialTimeline';
import WeeklyRoutine from './components/WeeklyRoutine';
import { useStore } from './store/useStore';
import { autoSaveLog, loadAutoSave } from './utils/logManager';

export default function App() {
  const { 
    autoSaveEnabled, 
    goals, 
    todoLists, 
    financialRecords, 
    currentPlanId, 
    loadFromLog,
    monthlyPlan,
    weeklyPlan,
    portfolioProjects,
    sideHustleTasks,
    skillsToLearn
  } = useStore();

  useEffect(() => {
    const autoSaved = loadAutoSave();
    if (autoSaved) {
      loadFromLog(autoSaved);
    }
  }, [loadFromLog]);

  useEffect(() => {
    if (!autoSaveEnabled) return;

    const interval = setInterval(() => {
      autoSaveLog(currentPlanId, goals, todoLists, financialRecords);
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, [autoSaveEnabled, currentPlanId, goals, todoLists, financialRecords]);

  const quarterDeadline = useMemo(() => {
    const month = new Date().getMonth();
    const deadlineMonth = [3, 3, 3, 6, 6, 6, 9, 9, 9, 12, 12, 12][month];
    const enMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
      month: deadlineMonth,
      en: enMonths[deadlineMonth - 1]
    };
  }, []);

  return (
    <div className="min-h-screen bg-notion-bg">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="flex flex-col gap-5">
            <PersonalInfo />
            <TodoCard todoList={monthlyPlan} />
            {todoLists.map((list) => (
              <TodoCard
                key={list.id}
                todoList={{
                  ...list,
                  title: `到${quarterDeadline.month}月底必须完成`,
                  titleEn: `Must Complete by ${quarterDeadline.en}`
                }}
                className="flex-1"
              />
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <GoalCard goal={goals[0]} />
            <GoalCard goal={goals[1]} />
            <TodoCard todoList={weeklyPlan} />
            <TodoCard todoList={portfolioProjects} className="flex-1" />
          </div>

          <div className="flex flex-col gap-5">
            <GoalCard goal={goals[2]} />
            <WeeklyRoutine />
            <TodoCard todoList={sideHustleTasks} className="flex-1" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 mt-5">
          <div className="col-span-2">
            <FinancialTimeline className="" />
          </div>
          <div>
            <TodoCard todoList={skillsToLearn} />
          </div>
        </div>

        <footer className="mt-10 text-center text-xs text-notion-text-muted pb-8">
          <p>Life Plan Dashboard - 22 → 27-29 Years</p>
          <p className="mt-1">Live a free and relaxed life ✨</p>
        </footer>
      </main>
    </div>
  );
}
