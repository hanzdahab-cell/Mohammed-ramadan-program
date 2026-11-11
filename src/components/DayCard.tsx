import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Copy, 
  ChevronUp, 
  ChevronDown, 
  Sparkles, 
  Layers, 
  Flame, 
  Clock, 
  CheckCircle2, 
  Circle,
  MoreVertical
} from 'lucide-react';
import { 
  DayRoutine, 
  ExerciseItem, 
  ThemeConfig, 
  createEmptyExercise, 
  normalizeSetString, 
  detectTechniqueType,
  applyStandardSetsRepsToDay,
  EXERCISE_LIBRARY
} from '../utils/workoutData.ts';

interface DayCardProps {
  day: DayRoutine;
  dayIndex: number;
  totalDays: number;
  theme: ThemeConfig;
  isArabic: boolean;
  onUpdateDay: (updatedDay: DayRoutine) => void;
  onDeleteDay: () => void;
  onDuplicateDay: () => void;
  onMoveDay: (direction: 'up' | 'down') => void;
  liveTrackerActive?: boolean;
}

export const DayCard: React.FC<DayCardProps> = ({
  day,
  dayIndex,
  totalDays,
  theme,
  isArabic,
  onUpdateDay,
  onDeleteDay,
  onDuplicateDay,
  onMoveDay,
  liveTrackerActive = false,
}) => {
  const [activeSuggestionRow, setActiveSuggestionRow] = useState<string | null>(null);
  const [standardSets, setStandardSets] = useState<string>(() => {
    // Default to the first exercise's sets or 4X10
    return day.exercises[0]?.setsReps || '4X10';
  });
  const [showAppliedNotice, setShowAppliedNotice] = useState<boolean>(false);

  // Propagate standard sets & reps to all exercises in this day
  const handleApplyStandardToAll = (valueToApply: string) => {
    const formatted = normalizeSetString(valueToApply) || '4X10';
    setStandardSets(formatted);
    const updated = applyStandardSetsRepsToDay(day, formatted);
    onUpdateDay(updated);
    setShowAppliedNotice(true);
    setTimeout(() => setShowAppliedNotice(false), 2200);
  };

  // Add 1 empty box (inherits the standard sets)
  const handleAddEmptyRow = () => {
    const newEx = createEmptyExercise();
    if (standardSets) {
      newEx.setsReps = standardSets;
    }
    const updated = {
      ...day,
      exercises: [...day.exercises, newEx],
    };
    onUpdateDay(updated);
  };

  // Add 3 empty boxes at once (inherit the standard sets)
  const handleAddMultipleEmptyRows = () => {
    const makeEx = () => {
      const ex = createEmptyExercise();
      if (standardSets) ex.setsReps = standardSets;
      return ex;
    };
    const updated = {
      ...day,
      exercises: [
        ...day.exercises,
        makeEx(),
        makeEx(),
        makeEx(),
      ],
    };
    onUpdateDay(updated);
  };

  // Update a single exercise
  const handleUpdateExercise = (exId: string, patch: Partial<ExerciseItem>) => {
    const updatedExercises = day.exercises.map((ex) => {
      if (ex.id !== exId) return ex;
      const merged = { ...ex, ...patch };
      if (patch.technique !== undefined) {
        merged.techniqueType = detectTechniqueType(patch.technique);
      }
      return merged;
    });
    onUpdateDay({ ...day, exercises: updatedExercises });
  };

  // Move exercise up or down
  const handleMoveExercise = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= day.exercises.length) return;
    const items = [...day.exercises];
    const [moved] = items.splice(index, 1);
    items.splice(targetIndex, 0, moved);
    onUpdateDay({ ...day, exercises: items });
  };

  // Delete an exercise row
  const handleDeleteExercise = (exId: string) => {
    onUpdateDay({
      ...day,
      exercises: day.exercises.filter((ex) => ex.id !== exId),
    });
  };

  // Quick preset pills for sets
  const SET_PRESETS = ['4X10', '3X12', '4X12', '4X15', '5X5', '20 min'];

  return (
    <div 
      className={`rounded-xl overflow-hidden border ${theme.borderColor} ${theme.cardBgClass} flex flex-col transition shadow-sm hover:shadow-md page-break-inside-avoid`}
    >
      {/* Day Header */}
      <div className={`p-3.5 sm:p-4 flex items-center justify-between gap-3 border-b ${theme.borderColor} ${theme.headerBgClass}`}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-extrabold uppercase px-2 py-0.5 rounded border ${theme.accentBadge}`}>
              {day.muscleGroup || (isArabic ? 'يوم تدريبي' : 'Training Day')}
            </span>
            <span className="text-xs opacity-70">
              ({day.exercises.length} {isArabic ? 'تمارين' : 'exercises'})
            </span>
          </div>
          <input
            type="text"
            value={day.title}
            onChange={(e) => onUpdateDay({ ...day, title: e.target.value })}
            placeholder={isArabic ? 'عنوان اليوم (مثال: Day 1 chest)' : 'Day title (e.g. Day 1 chest)'}
            className={`w-full bg-transparent text-base sm:text-lg font-black tracking-tight focus:outline-none focus:ring-1 focus:ring-amber-400/50 rounded px-1 -mx-1 mt-0.5 ${theme.headerTextColor}`}
          />
        </div>

        {/* Day Actions */}
        <div className="flex items-center gap-1 no-print shrink-0">
          <button
            onClick={() => onMoveDay('up')}
            disabled={dayIndex === 0}
            className="p-1 rounded hover:bg-black/10 disabled:opacity-20 transition"
            title={isArabic ? 'تحريك لأعلى' : 'Move Up'}
            aria-label="Move day up"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => onMoveDay('down')}
            disabled={dayIndex === totalDays - 1}
            className="p-1 rounded hover:bg-black/10 disabled:opacity-20 transition"
            title={isArabic ? 'تحريك لأسفل' : 'Move Down'}
            aria-label="Move day down"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          <button
            onClick={onDuplicateDay}
            className="p-1 rounded hover:bg-black/10 transition"
            title={isArabic ? 'تكرار اليوم' : 'Duplicate Day'}
            aria-label="Duplicate day"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={onDeleteDay}
            className="p-1 rounded hover:bg-red-500/20 text-rose-500 transition"
            title={isArabic ? 'حذف اليوم' : 'Delete Day'}
            aria-label="Delete day"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Focus Muscle & Standard Sets Propagator Bar */}
      <div className={`px-3.5 py-2 text-xs flex flex-wrap items-center justify-between gap-2.5 border-b ${theme.borderColor} bg-black/5`}>
        {/* Focus muscle */}
        <div className="flex items-center gap-1.5 min-w-[130px] flex-1">
          <span className="font-bold opacity-75">{isArabic ? 'العضلة:' : 'Focus:'}</span>
          <input
            type="text"
            value={day.muscleGroup}
            onChange={(e) => onUpdateDay({ ...day, muscleGroup: e.target.value })}
            placeholder="e.g. Chest / الصدر"
            className="bg-transparent focus:outline-none text-xs w-full font-semibold"
          />
        </div>

        {/* Standard Sets & Reps for this Day Propagator */}
        <div className="flex items-center gap-1.5 no-print flex-wrap">
          <div className="flex items-center gap-1 bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded-lg border border-black/10">
            <span className="font-bold text-[11px] text-amber-500 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {isArabic ? 'جولات اليوم الافتراضية:' : 'Day Standard:'}
            </span>
            <input
              type="text"
              dir="ltr"
              value={standardSets}
              onChange={(e) => setStandardSets(e.target.value)}
              onBlur={(e) => {
                const formatted = normalizeSetString(e.target.value);
                if (formatted) setStandardSets(formatted);
              }}
              placeholder="4X10"
              className="w-16 bg-black/20 text-center font-mono font-black text-xs rounded px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-amber-400"
              title={isArabic ? 'العدد القياسي للجولات والعدات لهذا اليوم' : 'Standard sets and reps for this day'}
            />
          </div>

          {/* Propagate to all exercises button */}
          <button
            type="button"
            onClick={() => handleApplyStandardToAll(standardSets)}
            className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1 shadow-xs transition active:scale-95"
            title={isArabic ? `تطبيق ${standardSets} على كل تمارين هذا اليوم (${day.exercises.length} تمارين)` : `Apply ${standardSets} to all ${day.exercises.length} exercises in this day`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isArabic ? 'تعميم على كل تمارين اليوم' : 'Apply to Day'}</span>
          </button>
        </div>
      </div>

      {/* Confirmation feedback banner when propagated */}
      {showAppliedNotice && (
        <div className="px-3.5 py-1.5 bg-emerald-500/20 text-emerald-400 text-xs font-bold border-b border-emerald-500/30 flex items-center justify-between animate-fadeIn no-print">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>
              {isArabic 
                ? `تم بنجاح تعميم (${standardSets}) على جميع تمارين ${day.title}!` 
                : `Successfully propagated (${standardSets}) to all exercises in ${day.title}!`}
            </span>
          </div>
          <span className="text-[10px] opacity-75">
            {isArabic ? 'أي تمرين جديد سيأخذ نفس القيمة' : 'New exercises will inherit this value'}
          </span>
        </div>
      )}

      {/* Exercises Table / Ready-Made Boxes */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className={`border-b ${theme.tableBorder} ${theme.tableHeadBg} text-xs uppercase tracking-wider`}>
              {liveTrackerActive && <th className="p-2.5 w-9 text-center">✓</th>}
              <th className="p-2.5 w-10 text-center font-bold">#</th>
              <th className="p-2.5 min-w-[170px] font-bold text-start">{isArabic ? 'التمرين (Exercise)' : 'Exercise'}</th>
              <th className="p-2.5 w-24 sm:w-28 font-bold text-center">{isArabic ? 'الجولات / العدات' : 'Sets & Reps'}</th>
              <th className="p-2.5 min-w-[140px] font-bold text-center">{isArabic ? 'الأسلوب والملاحظات' : 'Technique / Notes'}</th>
              <th className="p-2.5 w-16 text-center no-print font-bold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {day.exercises.map((exercise, index) => {
              const isEven = index % 2 === 0;
              const rowBg = isEven ? theme.tableRowEven : theme.tableRowOdd;
              
              // Technique styling badge
              let techBadge = 'bg-slate-200/40 text-slate-700';
              if (exercise.techniqueType === 'drop_set') {
                techBadge = theme.dropSetBadge;
              } else if (exercise.techniqueType === 'super_set') {
                techBadge = theme.superSetBadge;
              } else if (exercise.techniqueType === 'timed') {
                techBadge = 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30';
              }

              return (
                <tr 
                  key={exercise.id} 
                  className={`${rowBg} transition hover:brightness-105 group relative ${
                    exercise.completed && liveTrackerActive ? 'opacity-50 line-through' : ''
                  }`}
                >
                  {/* Tracker checkbox in live mode */}
                  {liveTrackerActive && (
                    <td className="p-2 text-center align-middle">
                      <button
                        onClick={() => handleUpdateExercise(exercise.id, { completed: !exercise.completed })}
                        className="text-emerald-500 hover:scale-110 transition"
                      >
                        {exercise.completed ? (
                          <CheckCircle2 className="w-5 h-5 fill-emerald-500 text-slate-900" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-400" />
                        )}
                      </button>
                    </td>
                  )}

                  {/* Index / Number */}
                  <td className="p-2 text-center align-middle font-mono text-xs opacity-60">
                    {index + 1}
                  </td>

                  {/* Exercise Name Box with autocomplete */}
                  <td className="p-2 align-middle relative text-start">
                    <div className="relative">
                      <input
                        type="text"
                        dir="auto"
                        value={exercise.name}
                        onFocus={() => setActiveSuggestionRow(exercise.id)}
                        onBlur={() => {
                          setTimeout(() => setActiveSuggestionRow(null), 200);
                        }}
                        onChange={(e) => handleUpdateExercise(exercise.id, { name: e.target.value })}
                        placeholder={isArabic ? 'اكتب اسم التمرين هنا...' : 'e.g. Bench Press...'}
                        className="w-full bg-transparent text-start rounded px-2.5 py-1.5 text-xs sm:text-sm font-bold focus:outline-none focus:ring-1 focus:ring-amber-400/80 border border-transparent hover:border-black/10 focus:border-amber-400/50"
                      />

                      {/* Autocomplete suggestions dropdown when focused */}
                      {activeSuggestionRow === exercise.id && exercise.name.trim().length > 1 && (
                        <div className="absolute left-0 top-full mt-1 z-30 w-72 max-h-48 overflow-y-auto bg-slate-900 text-slate-100 rounded-lg shadow-2xl border border-slate-700 py-1 text-xs" dir="ltr">
                          {EXERCISE_LIBRARY.filter(
                            (item) =>
                              item.name.toLowerCase().includes(exercise.name.toLowerCase()) ||
                              item.arName.includes(exercise.name)
                          )
                            .slice(0, 5)
                            .map((matchItem, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onMouseDown={() => {
                                  handleUpdateExercise(exercise.id, { name: matchItem.name });
                                  setActiveSuggestionRow(null);
                                }}
                                className="w-full text-left px-3 py-1.5 hover:bg-slate-800 flex items-center justify-between text-xs"
                              >
                                <span className="font-bold text-slate-200">{matchItem.name}</span>
                                <span className="text-[10px] text-amber-400">{matchItem.arName}</span>
                              </button>
                            ))}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Sets & Reps Box */}
                  <td className="p-2 align-middle text-center" dir="ltr">
                    <input
                      type="text"
                      dir="ltr"
                      value={exercise.setsReps}
                      onChange={(e) => handleUpdateExercise(exercise.id, { setsReps: e.target.value })}
                      onBlur={(e) => {
                        const formatted = normalizeSetString(e.target.value);
                        if (formatted !== e.target.value) {
                          handleUpdateExercise(exercise.id, { setsReps: formatted });
                        }
                      }}
                      placeholder="4X10"
                      className="w-full bg-transparent font-mono text-xs sm:text-sm font-black text-center rounded px-1.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-400/80 border border-transparent hover:border-black/10"
                    />
                  </td>

                  {/* Technique / Notes Box */}
                  <td className="p-2 align-middle text-center" dir="ltr">
                    <div className="flex items-center justify-center">
                      <input
                        type="text"
                        dir="ltr"
                        value={exercise.technique}
                        onChange={(e) => handleUpdateExercise(exercise.id, { technique: e.target.value })}
                        placeholder={isArabic ? 'دروب سيت / سوبر سيت...' : 'e.g. 20 Drop Set'}
                        className={`w-full text-xs font-bold text-center rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-400/80 border border-transparent ${techBadge}`}
                      />
                    </div>
                  </td>

                  {/* Row actions */}
                  <td className="p-1 text-center align-middle no-print">
                    <div className="flex items-center justify-center gap-0.5 opacity-40 group-hover:opacity-100 transition">
                      <button
                        onClick={() => handleMoveExercise(index, 'up')}
                        disabled={index === 0}
                        className="p-1 hover:bg-black/10 rounded disabled:opacity-20"
                        title={isArabic ? 'تقديم التمرين' : 'Move exercise up'}
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveExercise(index, 'down')}
                        disabled={index === day.exercises.length - 1}
                        className="p-1 hover:bg-black/10 rounded disabled:opacity-20"
                        title={isArabic ? 'تأخير التمرين' : 'Move exercise down'}
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteExercise(exercise.id)}
                        className="p-1 hover:bg-red-500/20 text-rose-500 rounded"
                        title={isArabic ? 'حذف التمرين' : 'Delete exercise'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Quick Set Presets & Fast "Add Empty Box" Buttons */}
      <div className={`p-2.5 sm:p-3 bg-black/5 border-t ${theme.borderColor} flex flex-wrap items-center justify-between gap-2 no-print`}>
        {/* Left: Quick empty slots */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleAddEmptyRow}
            className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-500 border border-amber-500/30 text-xs font-bold flex items-center gap-1 transition active:scale-95"
            title={isArabic ? 'إضافة مربع فاضي للكتابة فيه' : 'Add empty slot to type into'}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isArabic ? '+ مربع فاضي' : '+ Empty Slot'}</span>
          </button>

          <button
            onClick={handleAddMultipleEmptyRows}
            className="px-2 py-1 rounded bg-slate-800/40 hover:bg-slate-700/60 text-slate-300 border border-slate-700/50 text-xs font-semibold flex items-center gap-1 transition"
            title={isArabic ? 'إضافة 3 مربعات فارغة دفعة واحدة' : 'Add 3 empty slots'}
          >
            <span>{isArabic ? '+ 3 مربعات' : '+ 3 Slots'}</span>
          </button>
        </div>

        {/* Right: Quick sets helper with instant day propagation */}
        <div className="flex items-center gap-1 text-[11px] opacity-80 flex-wrap">
          <span className="font-bold">{isArabic ? 'تعميم سريع للكل:' : 'Propagate All:'}</span>
          {SET_PRESETS.map((preset) => (
            <button
              key={preset}
              onClick={() => handleApplyStandardToAll(preset)}
              className="px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 text-amber-500 text-[11px] font-mono font-bold border border-amber-500/30 transition active:scale-95"
              title={isArabic ? `تعميم ${preset} على جميع تمارين اليوم` : `Propagate ${preset} to all exercises`}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
