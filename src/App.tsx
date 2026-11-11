import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Sparkles, 
  Dumbbell, 
  RotateCcw, 
  SlidersHorizontal, 
  Layers, 
  CheckCircle,
  FileSpreadsheet,
  BookOpen,
  LayoutGrid,
  Columns3,
  Columns2
} from 'lucide-react';
import { 
  DayRoutine, 
  CoachInfo, 
  ThemeConfig, 
  THEMES, 
  USER_UPLOADED_ROUTINE, 
  DEFAULT_COACH_INFO, 
  createEmptyDay, 
  calculateStats,
  createEmptyExercise
} from './utils/workoutData.ts';
import { Header } from './components/Header.tsx';
import { CoachHeaderCard } from './components/CoachHeaderCard.tsx';
import { DayCard } from './components/DayCard.tsx';
import { ExerciseLibraryModal } from './components/ExerciseLibraryModal.tsx';
import { PresetSelectorModal } from './components/PresetSelectorModal.tsx';
import { ExportModal } from './components/ExportModal.tsx';
import { LiveTrackerModal } from './components/LiveTrackerModal.tsx';

const STORAGE_KEY_ROUTINE = 'gymcraft_workout_days_v1';
const STORAGE_KEY_COACH = 'gymcraft_coach_info_v1';
const STORAGE_KEY_THEME = 'gymcraft_theme_id_v1';

export default function App() {
  const [isArabic, setIsArabic] = useState<boolean>(true);
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(THEMES.excel_pro);
  const [days, setDays] = useState<DayRoutine[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ROUTINE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      // LocalStorage error fallback
    }
    return USER_UPLOADED_ROUTINE;
  });

  const [coachInfo, setCoachInfo] = useState<CoachInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COACH);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Fallback
    }
    return DEFAULT_COACH_INFO;
  });

  const [columnsLayout, setColumnsLayout] = useState<'2-col' | '3-col'>('2-col');
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isLiveTrackerOpen, setIsLiveTrackerOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ROUTINE, JSON.stringify(days));
    } catch (e) {}
  }, [days]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COACH, JSON.stringify(coachInfo));
    } catch (e) {}
  }, [coachInfo]);

  // Statistics
  const stats = calculateStats(days);

  // Add Day handler
  const handleAddDay = () => {
    const nextDayNumber = days.length + 1;
    const newDay = createEmptyDay(nextDayNumber);
    setDays([...days, newDay]);
  };

  // Update specific Day
  const handleUpdateDay = (index: number, updatedDay: DayRoutine) => {
    const newDays = [...days];
    newDays[index] = updatedDay;
    setDays(newDays);
  };

  // Delete Day
  const handleDeleteDay = (index: number) => {
    if (days.length <= 1) {
      // Don't leave with 0 days, create a blank one
      setDays([createEmptyDay(1)]);
      return;
    }
    const newDays = days.filter((_, i) => i !== index).map((d, i) => ({
      ...d,
      dayNumber: i + 1,
    }));
    setDays(newDays);
  };

  // Duplicate Day
  const handleDuplicateDay = (index: number) => {
    const source = days[index];
    const clone: DayRoutine = {
      ...source,
      id: 'day-' + Math.random().toString(36).substring(2, 9),
      dayNumber: days.length + 1,
      title: `${source.title} (نسخة)`,
      exercises: source.exercises.map((e) => ({
        ...e,
        id: 'ex-' + Math.random().toString(36).substring(2, 9),
      })),
    };
    setDays([...days, clone]);
  };

  // Move Day up or down
  const handleMoveDay = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= days.length) return;
    const newDays = [...days];
    const [moved] = newDays.splice(index, 1);
    newDays.splice(targetIndex, 0, moved);
    setDays(newDays.map((d, i) => ({ ...d, dayNumber: i + 1 })));
  };

  // Add exercise from library into specific day
  const handleAddExerciseToDay = (dayId: string, exName: string) => {
    setDays((prevDays) =>
      prevDays.map((d) => {
        if (d.id !== dayId) return d;
        const newEx = createEmptyExercise();
        newEx.name = exName;
        return {
          ...d,
          exercises: [...d.exercises, newEx],
        };
      })
    );
  };

  // Toggle completion in live mode
  const handleToggleExerciseDone = (dayId: string, exId: string) => {
    setDays((prevDays) =>
      prevDays.map((d) => {
        if (d.id !== dayId) return d;
        return {
          ...d,
          exercises: d.exercises.map((ex) =>
            ex.id === exId ? { ...ex, completed: !ex.completed } : ex
          ),
        };
      })
    );
  };

  // Print trigger
  const handlePrint = () => {
    window.print();
  };

  // Reset to empty boxes
  const handleResetToBlank = () => {
    const blankDays = [createEmptyDay(1), createEmptyDay(2)];
    setDays(blankDays);
  };

  return (
    <div 
      className={`min-h-screen ${currentTheme.bgClass} transition-colors duration-300 font-sans selection:bg-amber-500/30`}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Top Header */}
      <Header
        currentTheme={currentTheme}
        setTheme={setCurrentTheme}
        onAddDay={handleAddDay}
        onOpenExport={() => setIsExportOpen(true)}
        onPrint={handlePrint}
        onOpenLiveTracker={() => setIsLiveTrackerOpen(true)}
        onOpenLibrary={() => setIsLibraryOpen(true)}
        onOpenPresets={() => setIsPresetsOpen(true)}
        onResetToBlank={handleResetToBlank}
        isArabic={isArabic}
        setIsArabic={setIsArabic}
        liveTrackerActive={isLiveTrackerOpen}
      />

      {/* Main Container - ID used for export target */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6">
        
        {/* Quick Toolbar above sheet */}
        <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800 backdrop-blur-sm">
          {/* Left: Quick advice & theme switch */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {isArabic 
                ? 'قالب جاهز بمربعات فارغة للكتابة المباشرة: عدّل أي اسم، جولة، أو أسلوب بنقرة واحدة' 
                : 'Interactive ready boxes: edit any cell, set, or technique directly'}
            </span>
          </div>

          {/* Right: Layout Switch & Quick Add */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
              <button
                onClick={() => setColumnsLayout('2-col')}
                className={`p-1.5 rounded text-xs font-semibold flex items-center gap-1 transition ${
                  columnsLayout === '2-col' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                }`}
                title="عرض عمودين متوازيين"
              >
                <Columns2 className="w-3.5 h-3.5" />
                <span>2</span>
              </button>
              <button
                onClick={() => setColumnsLayout('3-col')}
                className={`p-1.5 rounded text-xs font-semibold flex items-center gap-1 transition ${
                  columnsLayout === '3-col' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                }`}
                title="عرض 3 أعمدة متجاورة"
              >
                <Columns3 className="w-3.5 h-3.5" />
                <span>3</span>
              </button>
            </div>

            <button
              onClick={handleAddDay}
              className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-400 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 transition active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isArabic ? '+ يوم تدريبي جديد' : '+ New Day'}</span>
            </button>
          </div>
        </div>

        {/* The Printable & Exportable Canvas Block */}
        <div id="workout-export-target" className="p-2 sm:p-4 rounded-3xl transition-all">
          
          {/* Coach & Trainee Header Card */}
          <CoachHeaderCard
            coachInfo={coachInfo}
            onChangeCoachInfo={setCoachInfo}
            currentTheme={currentTheme}
            isArabic={isArabic}
            totalDays={stats.totalDays}
            totalExercises={stats.totalExercises}
            totalSets={stats.totalSets}
          />

          {/* Routine Days Grid */}
          <div 
            className={`grid gap-5 ${
              columnsLayout === '3-col' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 lg:grid-cols-2'
            }`}
          >
            {days.map((day, index) => (
              <DayCard
                key={day.id}
                day={day}
                dayIndex={index}
                totalDays={days.length}
                theme={currentTheme}
                isArabic={isArabic}
                onUpdateDay={(updated) => handleUpdateDay(index, updated)}
                onDeleteDay={() => handleDeleteDay(index)}
                onDuplicateDay={() => handleDuplicateDay(index)}
                onMoveDay={(dir) => handleMoveDay(index, dir)}
                liveTrackerActive={isLiveTrackerOpen}
              />
            ))}
          </div>

          {/* Bottom Branding & Watermark in Print / Image */}
          <div className="mt-8 pt-4 border-t border-slate-700/40 flex flex-wrap items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-300">GymCraft Workout Studio</span>
              <span>•</span>
              <span>{coachInfo.gymName || 'Fitness Club'}</span>
            </div>
            <div className="font-mono text-[11px] opacity-75">
              {coachInfo.traineeName} • {coachInfo.dateOrWeek}
            </div>
          </div>

        </div>

        {/* Floating Quick Action Bar at bottom */}
        <div className="no-print mt-8 flex justify-center items-center gap-3">
          <button
            onClick={handleAddDay}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-700/20 flex items-center gap-2 transition active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span>{isArabic ? 'إضافة يوم جديد للملف (مربعات فارغة)' : 'Add New Workout Day'}</span>
          </button>

          <button
            onClick={() => setIsPresetsOpen(true)}
            className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 flex items-center gap-2 transition"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>{isArabic ? 'تغيير النموذج' : 'Change Template'}</span>
          </button>
        </div>

      </main>

      {/* Modals */}
      <ExerciseLibraryModal
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        days={days}
        onAddExerciseToDay={handleAddExerciseToDay}
        isArabic={isArabic}
      />

      <PresetSelectorModal
        isOpen={isPresetsOpen}
        onClose={() => setIsPresetsOpen(false)}
        onSelectPreset={(newDays, newInfo) => {
          setDays(newDays);
          if (newInfo) {
            setCoachInfo((prev) => ({ ...prev, ...newInfo }));
          }
        }}
        isArabic={isArabic}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        coachInfo={coachInfo}
        days={days}
        onImportDays={(importedDays, importedInfo) => {
          setDays(importedDays);
          if (importedInfo) {
            setCoachInfo((prev) => ({ ...prev, ...importedInfo }));
          }
        }}
        isArabic={isArabic}
        onPrint={handlePrint}
      />

      <LiveTrackerModal
        isOpen={isLiveTrackerOpen}
        onClose={() => setIsLiveTrackerOpen(false)}
        days={days}
        onToggleExerciseDone={handleToggleExerciseDone}
        isArabic={isArabic}
      />
    </div>
  );
}
