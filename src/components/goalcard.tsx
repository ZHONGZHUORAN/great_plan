import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Goal } from '../data/plans';
import { useStore } from '../store/useStore';
import { daysUntilTarget, calculateGoalProgress } from '../utils/dateUtils';
import Card from './Card';
import EditableText from './EditableText';

interface GoalCardProps {
  goal: Goal;
  className?: string;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, className = '' }) => {
  const { updateGoalProgress, updateGoal } = useStore();
  const [autoProgress, setAutoProgress] = useState(0);
  const daysLeft = daysUntilTarget(goal.targetDate);
  const startDate = '2025-11-09'; // 21 岁生日

  useEffect(() => {
    const update = () => {
      setAutoProgress(calculateGoalProgress(startDate, goal.targetDate));
    };
    update(); // 初始
    const timer = setInterval(update, 1000); // 每秒自动更新
    return () => clearInterval(timer);
  }, [goal.targetDate]);

  const goalIcons: Record<string, string> = {
    '搬出去自己住': '🏠',
    '养宠物': '🐱',
    '实现躺平': '😌',
  };

  const icon = goalIcons[goal.name] || '🎯';
  const displayProgress = goal.progress > 0 ? goal.progress : autoProgress;

  return (
    <Card className={className}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <EditableText
            value={goal.name}
            onChange={(newText) => updateGoal(goal.id, { name: newText })}
            placeholder="Goal name..."
            className="text-base font-semibold text-notion-text"
          />
          <EditableText
            value={goal.nameEn}
            onChange={(newText) => updateGoal(goal.id, { nameEn: newText })}
            placeholder="English..."
            className="text-xs text-notion-text-muted"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="text-center">
          <div className="text-3xl font-semibold text-notion-text">{daysLeft}</div>
          <div className="text-xs text-notion-text-muted">days left</div>
        </div>
        <div className="text-right">
          <EditableText
            value={String(goal.targetAge)}
            onChange={(newText) => updateGoal(goal.id, { targetAge: Number(newText) || 0 })}
            placeholder="Age..."
            className="text-sm font-medium text-notion-text"
          />
          <div className="text-xs text-notion-text-muted">Target Age</div>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-notion-text-muted mb-3">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <EditableText
            value={goal.targetDate}
            onChange={(newText) => updateGoal(goal.id, { targetDate: newText })}
            placeholder="YYYY-MM-DD"
            className="text-xs text-notion-text-muted"
          />
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>Deadline</span>
        </div>
      </div>

      <div className="relative">
        <div className="flex justify-between text-xs text-notion-text-muted mb-1">
          <span>Progress</span>
          <span>{displayProgress.toFixed(2)}%</span>
        </div>
        <div className="w-full h-2 bg-notion-border rounded-full overflow-hidden">
          <div
            className="h-full bg-notion-accent transition-all duration-500 rounded-full"
            style={{ width: `${displayProgress}%` }}
          />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={displayProgress}
          onChange={(e) => updateGoalProgress(goal.id, Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
      </div>
    </Card>
  );
};

export default GoalCard;
