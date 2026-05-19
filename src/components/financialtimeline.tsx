import React, { useState, useMemo } from 'react';
import { TrendingUp, Calendar, Target, CheckCircle, Plus, X, Trash2 } from 'lucide-react';
import Card from './Card';
import EditableText from './EditableText';

interface ActualRecord {
  id: string;
  date: string;
  type: 'income' | 'expense';
  amount: string;
  description: string;
}

interface TargetRecord {
  age: number;
  date: string;
  targetSavings: string;
  monthlyIncome?: string;
  notes?: string;
}

interface FinancialTimelineProps {
  className?: string;
}

const calculateAgeFromDate = (dateStr: string): number => {
  const date = new Date(dateStr);
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
    age--;
  }
  return age;
};

export const FinancialTimeline: React.FC<FinancialTimelineProps> = ({ className = '' }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecord, setNewRecord] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'income' as 'income' | 'expense',
    amount: '',
    description: ''
  });

  const [actualRecords, setActualRecords] = useState<ActualRecord[]>([
    { id: '1', date: '2026-05-18', type: 'income', amount: '3', description: '本金' }
  ]);

  const [targetRecords, setTargetRecords] = useState<TargetRecord[]>([
    { age: 22, date: '2026-12-31', targetSavings: '4万-5万', monthlyIncome: '实习150/天', notes: '本金2万' },
    { age: 23, date: '2027-12-31', targetSavings: '11.5万-16万', monthlyIncome: '9k-12k', notes: '年存7.5万-10万' },
    { age: 24, date: '2028-12-31', targetSavings: '24万-33万', monthlyIncome: '12k-16k', notes: '年存10万-13万' },
    { age: 25, date: '2029-12-31', targetSavings: '40万-55万', monthlyIncome: '15k-20k', notes: '年存13万-17万' },
    { age: 26, date: '2030-12-31', targetSavings: '62万-85万', monthlyIncome: '18k-24k' },
    { age: 27, date: '2031-12-31', targetSavings: '88万-120万', monthlyIncome: '22k-28k' },
    { age: 28, date: '2032-12-31', targetSavings: '100万-150万', monthlyIncome: '25k-35k', notes: '被动收入1万/月' },
    { age: 29, date: '2033-12-31', targetSavings: '120万-200万', monthlyIncome: '25k-35k', notes: '躺平线' }
  ]);

  const sortedRecords = useMemo(() => {
    return [...actualRecords].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [actualRecords]);

  const calculateCumulativeSavings = useMemo(() => {
    let total = 0;
    const savingsMap: Record<string, number> = {};
    sortedRecords.forEach(record => {
      const match = record.amount.match(/(\d+(?:\.\d+)?)/);
      if (match) {
        const amount = parseFloat(match[1]);
        if (record.type === 'income') {
          total += amount;
        } else {
          total -= amount;
        }
      }
      savingsMap[record.id] = total;
    });
    return { total, savingsMap };
  }, [sortedRecords]);

  const currentSavings = calculateCumulativeSavings.total;

  const handleAddRecord = () => {
    if (newRecord.amount) {
      const record: ActualRecord = {
        id: Date.now().toString(),
        date: newRecord.date,
        type: newRecord.type,
        amount: newRecord.amount,
        description: newRecord.description
      };
      setActualRecords([...actualRecords, record]);
      resetAddForm();
    }
  };

  const resetAddForm = () => {
    setNewRecord({
      date: new Date().toISOString().split('T')[0],
      type: 'income',
      amount: '',
      description: ''
    });
    setShowAddForm(false);
  };

  const updateTargetRecord = (age: number, field: keyof TargetRecord, value: string) => {
    setTargetRecords(targetRecords.map(record => {
      if (record.age === age) {
        if (field === 'date') {
          return { ...record, [field]: value, age: calculateAgeFromDate(value) };
        }
        return { ...record, [field]: value };
      }
      return record;
    }));
  };

  const updateActualRecord = (id: string, field: keyof ActualRecord, value: string) => {
    setActualRecords(actualRecords.map(record => {
      if (record.id === id) {
        if (field === 'date') {
          return { ...record, [field]: value };
        }
        return { ...record, [field]: value };
      }
      return record;
    }));
  };

  const updateActualRecordBySavings = (id: string, newSavings: number) => {
    const sorted = [...actualRecords].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const recordIndex = sorted.findIndex(r => r.id === id);
    
    let prevTotal = 0;
    for (let i = 0; i < recordIndex; i++) {
      const match = sorted[i].amount.match(/(\d+(?:\.\d+)?)/);
      if (match) {
        const amount = parseFloat(match[1]);
        prevTotal += sorted[i].type === 'income' ? amount : -amount;
      }
    }
    
    const neededAmount = newSavings - prevTotal;
    const newAmount = Math.abs(neededAmount);
    const newType = neededAmount >= 0 ? 'income' : 'expense';
    
    setActualRecords(actualRecords.map(r => {
      if (r.id === id) {
        return { ...r, amount: String(newAmount), type: newType };
      }
      return r;
    }));
  };

  const removeActualRecord = (id: string) => {
    setActualRecords(actualRecords.filter(record => record.id !== id));
  };

  const toggleActualRecordType = (id: string) => {
    setActualRecords(actualRecords.map(record => {
      if (record.id === id) {
        return { ...record, type: record.type === 'income' ? 'expense' : 'income' };
      }
      return record;
    }));
  };

  const allRows = [
    ...targetRecords.map(t => ({
      type: 'target' as const,
      age: t.age,
      date: t.date,
      targetSavings: t.targetSavings,
      monthlyIncome: t.monthlyIncome,
      notes: t.notes,
      id: `target-${t.age}`
    })),
    ...actualRecords.map(a => ({
      type: 'actual' as const,
      age: calculateAgeFromDate(a.date),
      date: a.date,
      amount: { type: a.type, value: a.amount },
      description: a.description,
      cumulativeSavings: calculateCumulativeSavings.savingsMap[a.id],
      id: a.id
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-notion-accent" />
          <h3 className="text-base font-semibold text-notion-text">Financial Timeline</h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1 px-3 py-1 text-xs font-medium bg-notion-accent hover:bg-notion-accent/80 text-white rounded-md transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add Record
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="mb-4 p-3 bg-notion-bg rounded-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-notion-text">Add New Record</span>
            <button
              onClick={resetAddForm}
              className="p-1 hover:bg-notion-bg-card rounded transition-colors"
            >
              <X className="w-4 h-4 text-notion-text-muted" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs text-notion-text-muted mb-1">Date</label>
              <input
                type="date"
                value={newRecord.date}
                onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                className="w-full px-2 py-1 text-xs bg-notion-bg-card border border-notion-border rounded-md focus:outline-none focus:border-notion-accent"
              />
            </div>
            <div>
              <label className="block text-xs text-notion-text-muted mb-1">Type</label>
              <select
                value={newRecord.type}
                onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value as 'income' | 'expense' })}
                className="w-full px-2 py-1 text-xs bg-notion-bg-card border border-notion-border rounded-md focus:outline-none focus:border-notion-accent"
              >
                <option value="income">💰 Income</option>
                <option value="expense">💸 Expense</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-notion-text-muted mb-1">Amount (万)</label>
              <input
                type="text"
                value={newRecord.amount}
                onChange={(e) => setNewRecord({ ...newRecord, amount: e.target.value })}
                placeholder="e.g. 5"
                className="w-full px-2 py-1 text-xs bg-notion-bg-card border border-notion-border rounded-md focus:outline-none focus:border-notion-accent"
              />
            </div>
            <div className="flex items-end gap-2">
              <button
                onClick={resetAddForm}
                className="flex-1 px-3 py-1 text-xs font-medium bg-notion-bg-card hover:bg-notion-bg-hover text-notion-text-muted rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRecord}
                className="flex-1 px-3 py-1 text-xs font-medium bg-notion-accent hover:bg-notion-accent/80 text-white rounded-md transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 mb-4 px-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-notion-accent/30 rounded"></div>
          <span className="text-xs text-notion-text-muted">Target</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-notion-success/30 rounded"></div>
          <span className="text-xs text-notion-text-muted">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-notion-danger/30 rounded"></div>
          <span className="text-xs text-notion-text-muted">Expense</span>
        </div>
        <div className="ml-auto text-xs text-notion-accent font-medium">
          Current Savings: {currentSavings}万
        </div>
      </div>

      <div className="overflow-x-auto overflow-y-auto max-h-80 scrollbar-thin">
        <table className="w-full text-xs table-fixed">
          <colgroup>
            <col style={{ width: '12%' }} />
            <col style={{ width: '8%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '20%' }} />
          </colgroup>
          <thead>
            <tr className="bg-notion-bg sticky top-0">
              <th className="px-3 py-2.5 text-left font-medium text-notion-text-muted rounded-tl-md">Type</th>
              <th className="px-3 py-2.5 text-left font-medium text-notion-text-muted">Age</th>
              <th className="px-3 py-2.5 text-left font-medium text-notion-text-muted">Date</th>
              <th className="px-3 py-2.5 text-left font-medium text-notion-text-muted">Target/Savings</th>
              <th className="px-3 py-2.5 text-left font-medium text-notion-text-muted">Amount</th>
              <th className="px-3 py-2.5 text-left font-medium text-notion-text-muted rounded-tr-md">Notes</th>
            </tr>
          </thead>
          <tbody>
            {allRows.map((row) => (
              <tr
                key={row.id}
                className={`border-b border-notion-border/50 transition-colors ${
                  row.type === 'target' 
                    ? 'bg-notion-accent/5 hover:bg-notion-accent/10' 
                    : row.amount?.type === 'income'
                    ? 'bg-notion-success/5 hover:bg-notion-success/10'
                    : 'bg-notion-danger/5 hover:bg-notion-danger/10'
                }`}
              >
                <td className="px-3 py-2.5">
                  {row.type === 'target' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap bg-notion-accent/20 text-notion-accent">
                      <Target className="w-3 h-3" /> Target
                    </span>
                  ) : (
                    <button
                      onClick={() => toggleActualRecordType(row.id)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                        row.amount?.type === 'income'
                          ? 'bg-notion-success/20 text-notion-success hover:bg-notion-success/30'
                          : 'bg-notion-danger/20 text-notion-danger hover:bg-notion-danger/30'
                      }`}
                    >
                      <CheckCircle className="w-3 h-3" /> 
                      {row.amount?.type === 'income' ? 'Income' : 'Expense'}
                    </button>
                  )}
                </td>
                <td className="px-3 py-2.5">
                  <span className="font-medium text-notion-text">{row.age}岁</span>
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-notion-text-muted flex-shrink-0" />
                    {row.type === 'target' ? (
                      <EditableText
                        value={row.date}
                        onChange={(newText) => updateTargetRecord(row.age, 'date', newText)}
                        className="text-notion-text"
                      />
                    ) : (
                      <EditableText
                        value={row.date}
                        onChange={(newText) => updateActualRecord(row.id, 'date', newText)}
                        className="text-notion-text"
                      />
                    )}
                  </div>
                </td>
                <td className="px-3 py-2.5">
                  {row.type === 'target' ? (
                    <div>
                      <EditableText
                        value={row.targetSavings || ''}
                        onChange={(newText) => updateTargetRecord(row.age, 'targetSavings', newText)}
                        className="font-medium text-notion-text"
                      />
                      {row.monthlyIncome && (
                        <div className="text-xs text-notion-text-muted mt-0.5">
                          <EditableText
                            value={row.monthlyIncome}
                            onChange={(newText) => updateTargetRecord(row.age, 'monthlyIncome', newText)}
                            className="text-notion-text-muted"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <EditableText
                      value={`${row.cumulativeSavings}万`}
                      onChange={(newText) => {
                        const match = newText.match(/(\d+(?:\.\d+)?)/);
                        if (match) {
                          updateActualRecordBySavings(row.id, parseFloat(match[1]));
                        }
                      }}
                      className="font-medium text-notion-accent"
                    />
                  )}
                </td>
                <td className="px-3 py-2.5">
                  {row.type === 'target' ? (
                    <span className="text-notion-text-muted">-</span>
                  ) : row.amount ? (
                    <div className="flex items-center gap-2">
                      <span className={`font-medium whitespace-nowrap ${
                        row.amount.type === 'income' ? 'text-notion-success' : 'text-notion-danger'
                      }`}>
                        <EditableText
                          value={`${row.amount.type === 'income' ? '+' : '-'}${row.amount.value}万`}
                          onChange={(newText) => {
                            const sign = newText.startsWith('-') ? 'expense' : 'income';
                            const value = newText.replace(/^[+-]/, '');
                            updateActualRecord(row.id, 'amount', value);
                            if (sign !== row.amount.type) {
                              toggleActualRecordType(row.id);
                            }
                          }}
                          className={row.amount.type === 'income' ? 'text-notion-success' : 'text-notion-danger'}
                        />
                      </span>
                      <button
                        onClick={() => removeActualRecord(row.id)}
                        className="p-1 hover:bg-notion-danger/20 rounded transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-3 h-3 text-notion-text-muted hover:text-notion-danger" />
                      </button>
                    </div>
                  ) : null}
                </td>
                <td className="px-3 py-2.5">
                  {row.type === 'target' ? (
                    <EditableText
                      value={row.notes || ''}
                      onChange={(newText) => updateTargetRecord(row.age, 'notes', newText)}
                      placeholder="Notes..."
                      className="text-notion-text-muted"
                    />
                  ) : (
                    <EditableText
                      value={row.description}
                      onChange={(newText) => updateActualRecord(row.id, 'description', newText)}
                      placeholder="Description..."
                      className="text-notion-text-muted"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default FinancialTimeline;
