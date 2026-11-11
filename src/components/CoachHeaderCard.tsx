import React, { useState } from 'react';
import { 
  User, 
  Award, 
  Target, 
  Calendar, 
  Edit3, 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  FileText,
  Sparkles
} from 'lucide-react';
import { CoachInfo, ThemeConfig } from '../utils/workoutData.ts';

interface CoachHeaderCardProps {
  coachInfo: CoachInfo;
  onChangeCoachInfo: (info: CoachInfo) => void;
  currentTheme: ThemeConfig;
  isArabic: boolean;
  totalDays: number;
  totalExercises: number;
  totalSets: number;
}

export const CoachHeaderCard: React.FC<CoachHeaderCardProps> = ({
  coachInfo,
  onChangeCoachInfo,
  currentTheme,
  isArabic,
  totalDays,
  totalExercises,
  totalSets,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleChange = (field: keyof CoachInfo, value: string) => {
    onChangeCoachInfo({
      ...coachInfo,
      [field]: value,
    });
  };

  return (
    <div className={`rounded-2xl transition-all duration-300 overflow-hidden mb-6 ${currentTheme.cardBgClass}`}>
      {/* Top Banner / Summary */}
      <div className={`p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border-b ${currentTheme.borderColor}`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-inner">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300">
                {coachInfo.gymName || 'FITNESS CLUB'}
              </span>
              <span className="text-xs text-slate-400">
                • {totalDays} {isArabic ? 'أيام' : 'Days'} • {totalExercises} {isArabic ? 'تمرين' : 'Exercises'} • ~{totalSets} {isArabic ? 'مجموعة' : 'Sets'}
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black tracking-tight mt-0.5">
              {coachInfo.programTitle}
            </h2>
          </div>
        </div>

        {/* Quick controls: Edit toggle & Collapse */}
        <div className="flex items-center gap-2 no-print">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              isEditing 
                ? 'bg-emerald-600 text-white shadow-sm' 
                : 'bg-slate-800/70 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? (isArabic ? 'حفظ البيانات' : 'Done Editing') : (isArabic ? 'تعديل بيانات الكوتش' : 'Edit Header')}</span>
          </button>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title={isCollapsed ? 'توسيع' : 'طي'}
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Body details */}
      {!isCollapsed && (
        <div className="p-4 sm:p-5">
          {isEditing ? (
            /* Editing form */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">
                  {isArabic ? 'اسم البرنامج / الخطة' : 'Program Title'}
                </label>
                <input
                  type="text"
                  value={coachInfo.programTitle}
                  onChange={(e) => handleChange('programTitle', e.target.value)}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">
                  {isArabic ? 'اسم الجيم / الأكاديمية' : 'Gym / Club Name'}
                </label>
                <input
                  type="text"
                  value={coachInfo.gymName}
                  onChange={(e) => handleChange('gymName', e.target.value)}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">
                  {isArabic ? 'اسم المتدرب / البطل' : 'Trainee Name'}
                </label>
                <input
                  type="text"
                  value={coachInfo.traineeName}
                  onChange={(e) => handleChange('traineeName', e.target.value)}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">
                  {isArabic ? 'إشراف الكابتن / المدرب' : 'Coach Name'}
                </label>
                <input
                  type="text"
                  value={coachInfo.coachName}
                  onChange={(e) => handleChange('coachName', e.target.value)}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">
                  {isArabic ? 'الهدف التدريبي' : 'Goal'}
                </label>
                <input
                  type="text"
                  value={coachInfo.goal}
                  onChange={(e) => handleChange('goal', e.target.value)}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">
                  {isArabic ? 'المرحلة / الأسبوع' : 'Phase / Week'}
                </label>
                <input
                  type="text"
                  value={coachInfo.dateOrWeek}
                  onChange={(e) => handleChange('dateOrWeek', e.target.value)}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-xs font-bold text-slate-400 mb-1">
                  {isArabic ? 'تعليمات وملاحظات الكوتش العامة' : 'General Coach Instructions'}
                </label>
                <textarea
                  rows={2}
                  value={coachInfo.generalNotes}
                  onChange={(e) => handleChange('generalNotes', e.target.value)}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          ) : (
            /* View mode */
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-3">
                <div className="p-3 rounded-xl bg-slate-500/10 border border-slate-500/20 shadow-xs">
                  <div className="text-[11px] font-bold flex items-center gap-1 opacity-70">
                    <User className="w-3.5 h-3.5 text-blue-500" />
                    <span>{isArabic ? 'المتدرب' : 'Trainee'}</span>
                  </div>
                  <div className="text-sm sm:text-base font-extrabold mt-0.5 truncate">
                    {coachInfo.traineeName}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-500/10 border border-slate-500/20 shadow-xs">
                  <div className="text-[11px] font-bold flex items-center gap-1 opacity-70">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>{isArabic ? 'الكوتش' : 'Coach'}</span>
                  </div>
                  <div className="text-sm sm:text-base font-extrabold mt-0.5 truncate">
                    {coachInfo.coachName}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-500/10 border border-slate-500/20 shadow-xs">
                  <div className="text-[11px] font-bold flex items-center gap-1 opacity-70">
                    <Target className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{isArabic ? 'الهدف' : 'Target Goal'}</span>
                  </div>
                  <div className="text-sm sm:text-base font-extrabold mt-0.5 truncate">
                    {coachInfo.goal}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-500/10 border border-slate-500/20 shadow-xs">
                  <div className="text-[11px] font-bold flex items-center gap-1 opacity-70">
                    <Calendar className="w-3.5 h-3.5 text-purple-500" />
                    <span>{isArabic ? 'الفترة' : 'Timeline'}</span>
                  </div>
                  <div className="text-sm sm:text-base font-extrabold mt-0.5 truncate">
                    {coachInfo.dateOrWeek}
                  </div>
                </div>
              </div>

              {coachInfo.generalNotes && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm flex items-start gap-2 shadow-xs">
                  <FileText className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-amber-600 dark:text-amber-400">{isArabic ? 'توجيهات الكوتش: ' : 'Instructions: '}</span>
                    <span className="opacity-90">{coachInfo.generalNotes}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
