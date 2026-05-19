import React, { useState, useEffect } from 'react';
import { User, Briefcase, Star, Heart, Calendar, Target } from 'lucide-react';
import { useCurrentPlan } from '../store/useStore';
import { useStore } from '../store/useStore';
import { calculateAge } from '../utils/dateUtils';
import { BIRTHDAY } from '../data/plans';
import Card from './Card';
import EditableText from './EditableText';
import EditableTags from './EditableTags';

interface PersonalInfoProps {
  className?: string;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({ className = '' }) => {
  const plan = useCurrentPlan();
  const { updatePersonalInfo, updateSkills, updateInterests } = useStore();
  const [age, setAge] = useState(calculateAge(BIRTHDAY));

  useEffect(() => {
    const timer = setInterval(() => {
      setAge(calculateAge(BIRTHDAY));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  if (!plan) return null;

  return (
    <Card className={`col-span-1 md:col-span-2 lg:col-span-1 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-notion-accent/20 rounded-lg flex items-center justify-center">
          <User className="w-6 h-6 text-notion-accent" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-notion-text">My Profile</h2>
          <p className="text-xs text-notion-text-muted">Shanghai</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between bg-notion-bg rounded-md px-3 py-2.5">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-notion-text-muted" />
            <span className="text-xs text-notion-text-muted">Current Age</span>
          </div>
          <span className="text-lg font-semibold text-notion-text">{age.toFixed(7)}</span>
        </div>

        <div className="flex items-center justify-between bg-notion-bg rounded-md px-3 py-2.5 gap-2">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Briefcase className="w-4 h-4 text-notion-text-muted" />
            <span className="text-xs text-notion-text-muted">Career Goal</span>
          </div>
          <EditableText
            value={plan.careerGoal}
            onChange={(newText) => updatePersonalInfo({ careerGoal: newText })}
            placeholder="What's your goal?"
            className="text-xs font-medium text-notion-text text-right"
          />
        </div>

        <div className="flex items-center justify-between bg-notion-bg rounded-md px-3 py-2.5 gap-2">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Target className="w-4 h-4 text-notion-text-muted" />
            <span className="text-xs text-notion-text-muted">Retire at</span>
          </div>
          <EditableText
            value={plan.targetRetireAge}
            onChange={(newText) => updatePersonalInfo({ targetRetireAge: newText })}
            placeholder="When?"
            className="text-xs font-medium text-notion-text text-right"
          />
        </div>

        <div className="notion-divider my-3" />

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-notion-accent" />
            <span className="text-xs font-medium text-notion-text">Skills</span>
          </div>
          <EditableTags
            tags={plan.skills}
            onTagsChange={updateSkills}
            placeholder="Add a skill..."
          />
        </div>

        <div className="mt-3">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-notion-accent" />
            <span className="text-xs font-medium text-notion-text">Interests</span>
          </div>
          <EditableTags
            tags={plan.interests}
            onTagsChange={updateInterests}
            placeholder="Add an interest..."
          />
        </div>
      </div>
    </Card>
  );
};

export default PersonalInfo;
