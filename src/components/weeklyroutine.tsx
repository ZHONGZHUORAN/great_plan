import React, { useState } from 'react';
import { Calendar, Sun, Coffee, Moon } from 'lucide-react';
import Card from './Card';
import EditableText from './EditableText';

interface WeeklyRoutineProps {
  className?: string;
}

interface RoutineDay {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  tasks: string[];
}

export const WeeklyRoutine: React.FC<WeeklyRoutineProps> = ({ className = '' }) => {
  const [routine, setRoutine] = useState<RoutineDay[]>([
    {
      id: 'weekdays',
      title: '周一～周五',
      icon: Coffee,
      color: 'text-notion-accent',
      bgColor: 'bg-notion-accent/20',
      tasks: ['上班/实习', '下班纯休息', '不加班、不内卷']
    },
    {
      id: 'saturday',
      title: '周六',
      icon: Sun,
      color: 'text-notion-success',
      bgColor: 'bg-notion-success/20',
      tasks: ['3小时 → 做副业模板', '学习产品知识', '整理作品集']
    },
    {
      id: 'sunday',
      title: '周日',
      icon: Moon,
      color: 'text-notion-warning',
      bgColor: 'bg-notion-warning/20',
      tasks: ['1小时 → 上传平台', '更新作品集', '放松休息']
    }
  ]);

  const updateTask = (dayId: string, index: number, newText: string) => {
    setRoutine(routine.map(day => {
      if (day.id !== dayId) return day;
      const newTasks = [...day.tasks];
      newTasks[index] = newText;
      return { ...day, tasks: newTasks };
    }));
  };

  const addTask = (dayId: string, afterIndex?: number) => {
    setRoutine(routine.map(day => {
      if (day.id !== dayId) return day;
      const newTasks = [...day.tasks];
      if (afterIndex !== undefined) {
        newTasks.splice(afterIndex + 1, 0, '');
      } else {
        newTasks.push('');
      }
      return { ...day, tasks: newTasks };
    }));
  };

  const removeTask = (dayId: string, index: number) => {
    setRoutine(routine.map(day => {
      if (day.id !== dayId) return day;
      const newTasks = day.tasks.filter((_, i) => i !== index);
      return { ...day, tasks: newTasks };
    }));
  };

  return (
    <Card className={className}>
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-4 h-4 text-notion-accent" />
        <h3 className="text-base font-semibold text-notion-text">Weekly Routine</h3>
      </div>

      <div className="space-y-3">
        {routine.map((day) => {
          const Icon = day.icon;
          return (
            <div key={day.id} className="bg-notion-bg rounded-md p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 ${day.bgColor} rounded-md flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${day.color}`} />
                </div>
                <span className="text-sm font-medium text-notion-text">{day.title}</span>
              </div>
              <ul className="ml-9 space-y-1">
                {day.tasks.map((task, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-notion-border rounded-full flex-shrink-0" />
                    <EditableText
                      value={task}
                      onChange={(newText) => updateTask(day.id, index, newText)}
                      placeholder="Write a task..."
                      className="text-xs text-notion-text-muted"
                      onEnter={() => addTask(day.id, index)}
                      onBackspaceEmpty={() => removeTask(day.id, index)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default WeeklyRoutine;
