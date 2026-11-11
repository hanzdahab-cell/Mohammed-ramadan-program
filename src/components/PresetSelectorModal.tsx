import React from 'react';
import { X, Check, Dumbbell, Sparkles, LayoutGrid, Flame, RefreshCw } from 'lucide-react';
import { 
  DayRoutine, 
  USER_UPLOADED_ROUTINE, 
  createEmptyDay, 
  createEmptyExercise,
  CoachInfo
} from '../utils/workoutData.ts';

interface PresetSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (presetDays: DayRoutine[], presetInfo?: Partial<CoachInfo>) => void;
  isArabic: boolean;
}

export const PresetSelectorModal: React.FC<PresetSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectPreset,
  isArabic,
}) => {
  if (!isOpen) return null;

  // 1. User Uploaded Routine (6 days from their PDF)
  const handleSelectUserRoutine = () => {
    onSelectPreset(USER_UPLOADED_ROUTINE, {
      programTitle: 'جدول تدريب مخصص - 6 أيام سبليت',
      goal: 'تضخيم وبناء عضل مع دروب سيت وسوبر سيت',
    });
    onClose();
  };

  // 2. Completely blank template with empty boxes ("مربعات فاضية وأنا كاتب فيها")
  const handleSelectBlankTemplate = () => {
    const blankDays: DayRoutine[] = [
      createEmptyDay(1),
      createEmptyDay(2),
      createEmptyDay(3),
      createEmptyDay(4),
    ];
    blankDays[0].title = 'Day 1 Chest';
    blankDays[0].muscleGroup = 'Chest (الصدر)';
    blankDays[1].title = 'Day 2 Back';
    blankDays[1].muscleGroup = 'Back (الظهر)';
    blankDays[2].title = 'Day 3 Shoulders';
    blankDays[2].muscleGroup = 'Shoulders (الأكتاف)';
    blankDays[3].title = 'Day 4 Legs';
    blankDays[3].muscleGroup = 'Legs (الأرجل)';

    onSelectPreset(blankDays, {
      programTitle: 'قالب فارغ جديد - جاهز للكتابة',
      goal: 'مخصص حسب رغبة الكوتش والمتدرب',
    });
    onClose();
  };

  // 3. Push Pull Legs (PPL)
  const handleSelectPPL = () => {
    const pplDays: DayRoutine[] = [
      {
        id: 'ppl-1',
        dayNumber: 1,
        title: 'Day 1: Push (دفع)',
        muscleGroup: 'صدر + كتف أمامي + تراي',
        exercises: [
          { id: 'p1', name: 'Barbell Bench Press', setsReps: '4X8-10', technique: 'Heavy strength', techniqueType: 'normal' },
          { id: 'p2', name: 'Incline Dumbbell Press', setsReps: '4X10-12', technique: 'Hypertrophy', techniqueType: 'normal' },
          { id: 'p3', name: 'Seated Dumbbell Shoulder Press', setsReps: '4X10', technique: '20 Drop Set', techniqueType: 'drop_set' },
          { id: 'p4', name: 'Lateral Cable Raise', setsReps: '4X15', technique: 'Drop Set', techniqueType: 'drop_set' },
          { id: 'p5', name: 'Triceps Rope Pushdown', setsReps: '4X12', technique: 'Burnout', techniqueType: 'normal' },
        ]
      },
      {
        id: 'ppl-2',
        dayNumber: 2,
        title: 'Day 2: Pull (سحب)',
        muscleGroup: 'ظهر + كتف خلفي + باي',
        exercises: [
          { id: 'pl1', name: 'Lat Pulldown Wide Grip', setsReps: '4X10', technique: 'Control eccentric', techniqueType: 'normal' },
          { id: 'pl2', name: 'Barbell Bent Over Row', setsReps: '4X8-10', technique: 'Heavy', techniqueType: 'normal' },
          { id: 'pl3', name: 'Seated Cable Row', setsReps: '4X12', technique: '20 Drop Set', techniqueType: 'drop_set' },
          { id: 'pl4', name: 'Face Pulls Rope', setsReps: '4X15', technique: 'Rear Delts', techniqueType: 'normal' },
          { id: 'pl5', name: 'Incline Dumbbell Curl', setsReps: '4X10', technique: 'Stretch & squeeze', techniqueType: 'normal' },
        ]
      },
      {
        id: 'ppl-3',
        dayNumber: 3,
        title: 'Day 3: Legs (أرجل)',
        muscleGroup: 'أرجل شاملة + سمانة',
        exercises: [
          { id: 'l1', name: 'Barbell Squat', setsReps: '4X8-10', technique: 'Deep squat', techniqueType: 'normal' },
          { id: 'l2', name: 'Romanian Deadlift (RDL)', setsReps: '4X10', technique: 'Hamstrings focus', techniqueType: 'normal' },
          { id: 'l3', name: 'Leg Press Machine', setsReps: '4X12', technique: '20 Drop Set', techniqueType: 'drop_set' },
          { id: 'l4', name: 'Leg Curl Machine', setsReps: '4X12', technique: 'Slow negative', techniqueType: 'normal' },
          { id: 'l5', name: 'Standing Calf Raise', setsReps: '4X15-20', technique: 'Full extension', techniqueType: 'normal' },
        ]
      },
    ];

    onSelectPreset(pplDays, {
      programTitle: 'نظام بوش بول ليجز (PPL Pro Split)',
      goal: 'زيادة الكتلة العضلية والقوة الشاملة',
    });
    onClose();
  };

  // 4. Upper / Lower Split (4 days)
  const handleSelectUpperLower = () => {
    const ulDays: DayRoutine[] = [
      {
        id: 'ul-1',
        dayNumber: 1,
        title: 'Day 1: Upper Power (جزء علوي - قوة)',
        muscleGroup: 'صدر + ظهر + كتف + ذراع',
        exercises: [
          { id: 'u1', name: 'Flat Barbell Bench Press', setsReps: '4X6-8', technique: 'Power set', techniqueType: 'normal' },
          { id: 'u2', name: 'Bent Over Barbell Row', setsReps: '4X6-8', technique: 'Heavy', techniqueType: 'normal' },
          { id: 'u3', name: 'Overhead Shoulder Press', setsReps: '3X8', technique: 'Strict form', techniqueType: 'normal' },
          { id: 'u4', name: 'Barbell Biceps Curl', setsReps: '3X10', technique: 'Normal', techniqueType: 'normal' },
          { id: 'u5', name: 'Skull Crushers EZ Bar', setsReps: '3X10', technique: 'Normal', techniqueType: 'normal' },
        ]
      },
      {
        id: 'ul-2',
        dayNumber: 2,
        title: 'Day 2: Lower Power (جزء سفلي - قوة)',
        muscleGroup: 'أرجل أمامية وخلفية',
        exercises: [
          { id: 'lo1', name: 'Barbell Back Squat', setsReps: '4X6-8', technique: 'Heavy strength', techniqueType: 'normal' },
          { id: 'lo2', name: 'Romanian Deadlift', setsReps: '4X8', technique: 'Hamstrings focus', techniqueType: 'normal' },
          { id: 'lo3', name: 'Leg Press Machine', setsReps: '3X10', technique: 'Drop Set', techniqueType: 'drop_set' },
          { id: 'lo4', name: 'Standing Calf Raise', setsReps: '4X15', technique: 'Pause at top', techniqueType: 'normal' },
        ]
      },
    ];

    onSelectPreset(ulDays, {
      programTitle: 'نظام الجزء العلوي والسفلي (Upper / Lower 4 Days)',
      goal: 'زيادة القوة والحجم العضلي',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">
              {isArabic ? 'نماذج وقوالب التمارين الجاهزة' : 'Ready Workout Split Templates'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-4 space-y-3 max-h-[70vh] overflow-y-auto">
          
          {/* User's uploaded PDF routine */}
          <div
            onClick={handleSelectUserRoutine}
            className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border-2 border-emerald-500/50 hover:border-emerald-500 cursor-pointer transition shadow-md group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                {isArabic ? 'الجدول المرفوع في الصورة (PDF)' : 'Your Uploaded PDF Routine'}
              </span>
              <span className="text-xs text-slate-400 font-bold">{isArabic ? '6 أيام كاملة' : '6 Days Split'}</span>
            </div>
            <h4 className="text-base font-bold text-white mt-1 group-hover:text-emerald-400 transition">
              {isArabic ? 'جدول الـ 6 أيام الأصلي (صدر، كتف، ظهر، باي وتراي، أرجل، كارديو)' : 'Your 6-Day Custom Split (Chest, Shoulder, Back, Arms, Legs, Cardio)'}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              {isArabic 
                ? 'نفس التمارين والدروب سيت والسوبر سيت الموجودة في ملفك بالضبط بتصميم فخم وجاهز للتعديل والطباعة.' 
                : 'Exact exercises, drop sets, and supersets from your attached file.'}
            </p>
          </div>

          {/* Blank Template with empty boxes */}
          <div
            onClick={handleSelectBlankTemplate}
            className="p-4 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-amber-500/40 hover:border-amber-400 cursor-pointer transition group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40">
                {isArabic ? 'مربعات فارغة للكتابة الحرة' : 'Blank Template with Empty Boxes'}
              </span>
              <span className="text-xs text-slate-400 font-bold">{isArabic ? '4 أيام فارغة' : '4 Days Blank'}</span>
            </div>
            <h4 className="text-base font-bold text-white mt-1 group-hover:text-amber-400 transition">
              {isArabic ? 'قالب مربعات فارغة تماماً (أنت اللي تكتب فيه)' : 'Blank Ready-Made Boxes Template'}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              {isArabic 
                ? 'مثل ما طلبت: مربعات جاهزة ومرتبة وفاضية وأنت بس تكتب فيها التمرين والجولات، بدون ما تشيل هم الألوان والتنسيق.' 
                : 'Clean empty boxes ready for typing your own exercises without design hassle.'}
            </p>
          </div>

          {/* Push Pull Legs */}
          <div
            onClick={handleSelectPPL}
            className="p-4 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 cursor-pointer transition group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/40">
                {isArabic ? 'نظام بوش بول ليجز' : 'Push Pull Legs'}
              </span>
              <span className="text-xs text-slate-400 font-bold">{isArabic ? '3 أو 6 أيام' : '3-6 Days'}</span>
            </div>
            <h4 className="text-base font-bold text-white mt-1 group-hover:text-blue-400 transition">
              PPL Hypertrophy Split (دفع - سحب - أرجل)
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              {isArabic 
                ? 'تقسيم كمال الأجسام الشهير الأكثر فاعلية للتضخيم وزيادة الكثافة التدريبية.' 
                : 'Popular bodybuilding split divided into pushing, pulling, and legs.'}
            </p>
          </div>

          {/* Upper / Lower */}
          <div
            onClick={handleSelectUpperLower}
            className="p-4 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 cursor-pointer transition group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/40">
                {isArabic ? 'علوي / سفلي' : 'Upper / Lower'}
              </span>
              <span className="text-xs text-slate-400 font-bold">{isArabic ? '4 أيام' : '4 Days'}</span>
            </div>
            <h4 className="text-base font-bold text-white mt-1 group-hover:text-purple-400 transition">
              Upper / Lower Power Split (4 أيام)
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              {isArabic 
                ? 'مثالي لمن يتمرن 4 أيام أسبوعياً مع تركيز عالي على القوة وبناء العضلات.' 
                : 'Ideal for 4-day gym schedules with high frequency.'}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            {isArabic ? 'إلغاء' : 'Cancel'}
          </button>
        </div>

      </div>
    </div>
  );
};
