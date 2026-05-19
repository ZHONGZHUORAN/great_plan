import { Goal, TodoList, FinancialEntry } from '../data/plans';
import { formatDateTime } from './dateUtils';

export interface LogData {
  currentPlan: string;
  goals: Goal[];
  todoLists: TodoList[];
  financialRecords: FinancialEntry[];
  lastSaved: string;
}

const STORAGE_KEY = 'plan_log_path';

export const getSavedLogPath = (): string | null => {
  return localStorage.getItem(STORAGE_KEY);
};

export const setSavedLogPath = (path: string): void => {
  localStorage.setItem(STORAGE_KEY, path);
};

export const saveLog = async (data: LogData, filePath?: string): Promise<void> => {
  const logContent = JSON.stringify(data, null, 2);
  const blob = new Blob([logContent], { type: 'application/json' });
  
  if (filePath) {
    setSavedLogPath(filePath);
  } else {
    let savedPath = getSavedLogPath();
    if (!savedPath) {
      savedPath = `plan_log_${Date.now()}.json`;
      setSavedLogPath(savedPath);
    }
    filePath = savedPath;
  }
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filePath;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const loadLog = async (file: File): Promise<LogData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        data.lastSaved = formatDateTime(new Date());
        resolve(data);
      } catch {
        reject(new Error('文件解析失败'));
      }
    };
    reader.onerror = () => reject(new Error('文件读取失败'));
    reader.readAsText(file);
  });
};

export const createLogData = (
  currentPlan: string,
  goals: Goal[],
  todoLists: TodoList[],
  financialRecords: FinancialEntry[]
): LogData => {
  return {
    currentPlan,
    goals,
    todoLists,
    financialRecords,
    lastSaved: formatDateTime(new Date())
  };
};

export const autoSaveLog = (
  currentPlan: string,
  goals: Goal[],
  todoLists: TodoList[],
  financialRecords: FinancialEntry[]
): void => {
  const data = createLogData(currentPlan, goals, todoLists, financialRecords);
  localStorage.setItem('plan_auto_save', JSON.stringify(data));
};

export const loadAutoSave = (): LogData | null => {
  const saved = localStorage.getItem('plan_auto_save');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  }
  return null;
};
