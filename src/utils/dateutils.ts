export const calculateAge = (birthday: string): number => {
  const birthDate = new Date(birthday).getTime();
  const now = Date.now();
  const msPerYear = 1000 * 60 * 60 * 24 * 365.25; // 考虑闰年
  return (now - birthDate) / msPerYear;
};

export const calculateGoalProgress = (startDate: string, targetDate: string): number => {
  const start = new Date(startDate).getTime();
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  if (now >= target) return 100;
  if (now <= start) return 0;
  return Math.min(100, Math.max(0, ((now - start) / (target - start)) * 100));
};

export const daysUntilTarget = (targetDate: string): number => {
  const target = new Date(targetDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(0, diffDays);
};

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

export const formatDateTime = (date: Date): string => {
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};
