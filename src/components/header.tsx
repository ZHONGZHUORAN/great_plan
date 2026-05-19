import React, { useState } from 'react';
import { Save, Upload, Clock, Sparkles } from 'lucide-react';
import { plans } from '../data/plans';
import { useStore } from '../store/useStore';
import { saveLog, createLogData, loadLog } from '../utils/logManager';
import { formatDateTime } from '../utils/dateUtils';

export const Header: React.FC = () => {
  const { 
    currentPlanId, 
    setCurrentPlan, 
    goals, 
    todoLists, 
    financialRecords,
    autoSaveEnabled,
    setAutoSaveEnabled,
    setLastSaved
  } = useStore();
  
  const [saveMessage, setSaveMessage] = useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    const data = createLogData(currentPlanId, goals, todoLists, financialRecords);
    try {
      await saveLog(data);
      setLastSaved(formatDateTime(new Date()));
      setSaveMessage('Saved successfully');
      setTimeout(() => setSaveMessage(''), 2000);
    } catch {
      setSaveMessage('Failed to save');
      setTimeout(() => setSaveMessage(''), 2000);
    }
  };

  const handleLoad = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const data = await loadLog(file);
        useStore.getState().loadFromLog(data);
        setLastSaved(formatDateTime(new Date()));
        setSaveMessage('Loaded successfully');
        setTimeout(() => setSaveMessage(''), 2000);
      } catch {
        setSaveMessage('Failed to load');
        setTimeout(() => setSaveMessage(''), 2000);
      }
    }
  };

  return (
    <header className="bg-notion-bg-card border-b border-notion-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-notion-accent rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-notion-text">GREAT PLAN Dashboard</h1>
              <p className="text-xs text-notion-text-muted">22 → 27-29 Years Old</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-notion-bg rounded-lg p-0.5">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setCurrentPlan(plan.id)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    currentPlanId === plan.id
                      ? 'bg-notion-accent text-white'
                      : 'text-notion-text-muted hover:text-notion-text hover:bg-notion-bg-hover'
                  }`}
                >
                  {plan.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-3 py-1.5 bg-notion-bg-hover hover:bg-notion-border rounded-md text-sm text-notion-text transition-colors"
              >
                <Save className="w-4 h-4" />
                Save
              </button>

              <label className="flex items-center gap-2 px-3 py-1.5 bg-notion-bg-hover hover:bg-notion-border rounded-md text-sm text-notion-text transition-colors cursor-pointer">
                <Upload className="w-4 h-4" />
                Load
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleLoad}
                  className="hidden"
                />
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <div className={`w-10 h-5 rounded-full transition-all duration-200 ${
                  autoSaveEnabled ? 'bg-notion-accent' : 'bg-notion-border'
                }`}>
                  <div className={`w-4 h-4 bg-white rounded-full transform transition-transform duration-200 ${
                    autoSaveEnabled ? 'translate-x-5' : 'translate-x-0.5'
                  }`} />
                </div>
                <div className="flex items-center gap-1 text-xs text-notion-text-muted">
                  <Clock className="w-3 h-3" />
                  Auto Save
                </div>
                <input
                  type="checkbox"
                  checked={autoSaveEnabled}
                  onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {saveMessage && (
          <div className={`mt-3 text-center text-xs font-medium animate-fade-in ${
            saveMessage.includes('successfully') ? 'text-notion-success' : 'text-notion-danger'
          }`}>
            {saveMessage}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
