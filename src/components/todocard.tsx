import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { TodoList } from '../data/plans';
import { useStore } from '../store/useStore';
import Card from './Card';
import EditableText from './EditableText';

interface TodoCardProps {
  todoList: TodoList;
  className?: string;
}

export const TodoCard: React.FC<TodoCardProps> = ({ todoList, className = '' }) => {
  const { toggleTodoItem, updateTodoItem, addTodoItem, removeTodoItem } = useStore();

  const completedCount = todoList.items.filter(item => item.completed).length;
  const totalCount = todoList.items.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-base font-semibold text-notion-text">{todoList.title}</h3>
          <p className="text-xs text-notion-text-muted">{todoList.titleEn}</p>
        </div>
        <span className="text-xs text-notion-text-muted bg-notion-bg px-2 py-1 rounded-md">
          {completedCount}/{totalCount}
        </span>
      </div>

      {totalCount > 0 && (
        <div className="w-full h-1.5 bg-notion-border rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-notion-accent transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <ul className="space-y-1.5 max-h-48 overflow-y-auto scrollbar-thin">
        {todoList.items.map((item) => (
          <li key={item.id} className="flex items-center gap-2 group">
            <button
              onClick={() => toggleTodoItem(todoList.id, item.id)}
              className="checkmark-animation flex-shrink-0"
            >
              {item.completed ? (
                <CheckCircle className="w-4 h-4 text-notion-success" />
              ) : (
                <Circle className="w-4 h-4 text-notion-border group-hover:text-notion-accent transition-colors" />
              )}
            </button>
            <EditableText
              value={item.text}
              onChange={(newText) => updateTodoItem(todoList.id, item.id, newText)}
              placeholder="Write a todo..."
              className={`text-xs ${item.completed ? 'line-through text-notion-text-muted' : 'text-notion-text-muted'}`}
              onEnter={() => addTodoItem(todoList.id, item.id)}
              onBackspaceEmpty={() => removeTodoItem(todoList.id, item.id)}
            />
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default TodoCard;
