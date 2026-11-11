import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Circle, 
  Flame, 
  Clock, 
  Dumbbell,
  Trophy,
  Volume2
} from 'lucide-react';
import { DayRoutine, ExerciseItem } from '../utils/workoutData.ts';

interface LiveTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  days: DayRoutine[];
  onToggleExerciseDone: (dayId: string, exId: string) => void;
  isArabic: boolean;
}

export const LiveTrackerModal: React.FC<LiveTrackerModalProps> = ({
  isOpen,
  onClose,
  days,
  onToggleExerciseDone,
  isArabic,
}) => {
  const [selectedDayId, setSelectedDayId] = useState<string>(days[0]?.id || '');
  
  // Timer state
  const [timerSeconds, setTimerSeconds] = useState<number>(60);
  const [initialSeconds, setInitialSeconds] = useState<number>(60);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      // Play web audio chime
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.6);
      } catch (e) {
        // Audio error silent fallback
      }
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  if (!isOpen) return null;

  const currentDay = days.find((d) => d.id === selectedDayId) || days[0];
  const completedCount = currentDay ? currentDay.exercises.filter((e) => e.completed).length : 0;
  const totalCount = currentDay ? currentDay.exercises.length : 0;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const startTimerWithDuration = (seconds: number) => {
    setInitialSeconds(seconds);
    setTimerSeconds(seconds);
    setTimerRunning(true);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-xl flex flex-col shadow-2xl overflow-hidden max-h-[92vh]">
        
        {/* Header with Active Day & Close */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-amber-600/20 via-slate-900 to-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                {isArabic ? 'وضع التمرين المباشر (داخل الجيم)' : 'Live Workout Tracker'}
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-extrabold uppercase animate-pulse">
                  LIVE
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {isArabic ? 'علّم على التمارين واحسب وقت الراحة بالساعة' : 'Track completed exercises & time your rest'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Day Selector Chips */}
        <div className="px-4 py-2 border-b border-slate-800 bg-slate-950/60 flex gap-2 overflow-x-auto scrollbar-none">
          {days.map((day) => (
            <button
              key={day.id}
              onClick={() => setSelectedDayId(day.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                day.id === currentDay?.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              {day.title}
            </button>
          ))}
        </div>

        {/* Progress Bar & Rest Timer Section */}
        <div className="p-4 bg-slate-950/40 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Progress */}
          <div className="w-full sm:w-1/2">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-slate-300">
                {isArabic ? 'إنجاز اليوم:' : 'Session Progress:'}
              </span>
              <span className="font-mono text-emerald-400 font-bold">
                {completedCount} / {totalCount} ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Rest Stopwatch Widget */}
          <div className="flex items-center gap-3 bg-slate-800/80 px-3.5 py-2 rounded-2xl border border-slate-700/80 w-full sm:w-auto justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-xl font-black text-amber-300 w-14">
                {formatTimer(timerSeconds)}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className={`p-1.5 rounded-lg text-xs font-bold transition ${
                  timerRunning ? 'bg-amber-500 text-slate-950' : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                }`}
                title={timerRunning ? 'إيقاف مؤقت' : 'تشغيل'}
              >
                {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <button
                onClick={() => {
                  setTimerRunning(false);
                  setTimerSeconds(initialSeconds);
                }}
                className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition"
                title="إعادة ضبط"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Seconds Buttons */}
            <div className="flex items-center gap-1">
              {[30, 60, 90].map((s) => (
                <button
                  key={s}
                  onClick={() => startTimerWithDuration(s)}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                    initialSeconds === s && timerRunning
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-700/60 hover:bg-slate-600 text-slate-300'
                  }`}
                >
                  {s}s
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Exercises Checklist */}
        <div className="p-4 overflow-y-auto flex-1 space-y-2">
          {currentDay?.exercises.map((exercise, idx) => (
            <div
              key={exercise.id}
              onClick={() => onToggleExerciseDone(currentDay.id, exercise.id)}
              className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                exercise.completed
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-400 opacity-80'
                  : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <button className="text-emerald-400 shrink-0">
                  {exercise.completed ? (
                    <CheckCircle2 className="w-6 h-6 fill-emerald-500 text-slate-900" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-500 hover:text-slate-300" />
                  )}
                </button>
                <div>
                  <div className={`text-sm sm:text-base font-bold ${exercise.completed ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                    {exercise.name || (isArabic ? 'تمرين بدون اسم' : 'Unnamed Exercise')}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5" dir="ltr">
                    <span className="text-xs font-mono font-extrabold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                      {exercise.setsReps}
                    </span>
                    {exercise.technique && (
                      <span className="text-xs font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                        {exercise.technique}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Start rest timer trigger */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  startTimerWithDuration(60);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-700/60 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-xs font-semibold flex items-center gap-1 transition shrink-0"
                title="بدء عداد الراحة"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>60s</span>
              </button>
            </div>
          ))}

          {progressPercent === 100 && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600/30 to-amber-600/20 border border-emerald-500/50 text-center text-white mt-4">
              <Trophy className="w-8 h-8 text-amber-400 mx-auto mb-1 animate-bounce" />
              <h4 className="text-base font-black">
                {isArabic ? 'عاش يا بطل! أنهيت تمرين اليوم بنجاح 💪' : 'Workout Complete! Great job Champion!'}
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                {isArabic ? 'اهتم بوجبة ما بعد التمرين وشرب الماء للتعافي العضلي' : 'Focus on post-workout nutrition and hydration for recovery'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
          >
            {isArabic ? 'إغلاق الوضع المباشر' : 'Close Live Tracker'}
          </button>
        </div>

      </div>
    </div>
  );
};
