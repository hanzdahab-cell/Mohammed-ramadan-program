/**
 * Data structures, presets, and utility functions for Workout Split Planner & Designer
 */

export type TechniqueType = 
  | 'normal' 
  | 'drop_set' 
  | 'super_set' 
  | 'pyramid' 
  | 'failure' 
  | 'warmup' 
  | 'timed'
  | 'custom';

export interface ExerciseItem {
  id: string;
  name: string;
  setsReps: string; // e.g. "4X10", "20 min", "4X15"
  technique: string; // e.g. "20 Drop Set", "****", "Superset with decline", "Cardio"
  techniqueType: TechniqueType;
  notes?: string;
  restSeconds?: number;
  completed?: boolean;
}

export interface DayRoutine {
  id: string;
  dayNumber: number;
  title: string; // e.g. "Day 1 chest"
  muscleGroup: string; // e.g. "Chest"
  notes?: string;
  exercises: ExerciseItem[];
}

export interface CoachInfo {
  coachName: string;
  traineeName: string;
  gymName: string;
  programTitle: string;
  goal: string; // e.g. "تضخيم عضلي (Hypertrophy)"
  dateOrWeek: string;
  generalNotes: string;
}

export interface ThemeConfig {
  id: string;
  nameAr: string;
  nameEn: string;
  bgClass: string;
  cardBgClass: string;
  headerBgClass: string;
  headerTextColor: string;
  borderColor: string;
  tableHeadBg: string;
  tableRowEven: string;
  tableRowOdd: string;
  tableBorder: string;
  accentBadge: string;
  dropSetBadge: string;
  superSetBadge: string;
  accentColor: string;
}

export const THEMES: Record<string, ThemeConfig> = {
  excel_pro: {
    id: 'excel_pro',
    nameAr: 'إكسيل برو المطور (كلاسيك أزرق)',
    nameEn: 'Excel Pro Modern',
    bgClass: 'bg-slate-100 text-slate-900',
    cardBgClass: 'bg-white border-2 border-slate-300 shadow-sm',
    headerBgClass: 'bg-[#d9e1f2] border-b-2 border-slate-400 text-slate-900',
    headerTextColor: 'text-slate-900 font-bold',
    borderColor: 'border-slate-300',
    tableHeadBg: 'bg-[#b4c6e7] text-slate-900 font-bold',
    tableRowEven: 'bg-white',
    tableRowOdd: 'bg-[#f2f4f8]',
    tableBorder: 'border-slate-300',
    accentBadge: 'bg-blue-100 text-blue-800 border-blue-300',
    dropSetBadge: 'bg-amber-100 text-amber-900 border-amber-300',
    superSetBadge: 'bg-purple-100 text-purple-900 border-purple-300',
    accentColor: '#2b579a',
  },
  neon_iron: {
    id: 'neon_iron',
    nameAr: 'وحش الجيم (دارك نيون)',
    nameEn: 'Dark Gym Neon',
    bgClass: 'bg-[#0f172a] text-slate-100',
    cardBgClass: 'bg-[#1e293b]/90 border border-slate-700/80 shadow-xl backdrop-blur-sm',
    headerBgClass: 'bg-gradient-to-r from-emerald-600/30 to-cyan-600/20 border-b border-emerald-500/40 text-emerald-400',
    headerTextColor: 'text-emerald-300 font-bold',
    borderColor: 'border-slate-700',
    tableHeadBg: 'bg-slate-800/90 text-emerald-400 font-semibold',
    tableRowEven: 'bg-slate-900/60',
    tableRowOdd: 'bg-slate-800/40',
    tableBorder: 'border-slate-700/60',
    accentBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    dropSetBadge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    superSetBadge: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40',
    accentColor: '#10b981',
  },
  crimson_power: {
    id: 'crimson_power',
    nameAr: 'باور أحمر رياضي',
    nameEn: 'Crimson Power',
    bgClass: 'bg-zinc-950 text-zinc-100',
    cardBgClass: 'bg-zinc-900 border border-rose-900/60 shadow-xl',
    headerBgClass: 'bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold',
    headerTextColor: 'text-white font-bold',
    borderColor: 'border-zinc-800',
    tableHeadBg: 'bg-zinc-800 text-rose-300 font-bold',
    tableRowEven: 'bg-zinc-900',
    tableRowOdd: 'bg-zinc-900/50',
    tableBorder: 'border-zinc-800',
    accentBadge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    dropSetBadge: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    superSetBadge: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
    accentColor: '#e11d48',
  },
  gold_vip: {
    id: 'gold_vip',
    nameAr: 'الكوتش الذهبي VIP',
    nameEn: 'Gold Champion VIP',
    bgClass: 'bg-[#121212] text-amber-100',
    cardBgClass: 'bg-[#1c1a16] border border-amber-500/40 shadow-xl',
    headerBgClass: 'bg-gradient-to-r from-amber-600/40 to-yellow-600/20 border-b border-amber-500/50 text-amber-300',
    headerTextColor: 'text-amber-300 font-bold',
    borderColor: 'border-amber-900/40',
    tableHeadBg: 'bg-amber-950/40 text-amber-200 font-semibold',
    tableRowEven: 'bg-[#181613]',
    tableRowOdd: 'bg-[#1f1c17]',
    tableBorder: 'border-amber-900/30',
    accentBadge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    dropSetBadge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
    superSetBadge: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    accentColor: '#f59e0b',
  },
  print_clean: {
    id: 'print_clean',
    nameAr: 'طباعة نظيفة (A4 أبيض وأسود)',
    nameEn: 'Clean Print A4',
    bgClass: 'bg-white text-black',
    cardBgClass: 'bg-white border-2 border-black shadow-none',
    headerBgClass: 'bg-slate-200 border-b-2 border-black text-black font-extrabold',
    headerTextColor: 'text-black font-bold',
    borderColor: 'border-black',
    tableHeadBg: 'bg-slate-100 text-black font-bold border-b-2 border-black',
    tableRowEven: 'bg-white',
    tableRowOdd: 'bg-slate-50',
    tableBorder: 'border-black',
    accentBadge: 'bg-white text-black border-black font-semibold',
    dropSetBadge: 'bg-slate-100 text-black border-black font-semibold',
    superSetBadge: 'bg-slate-100 text-black border-black font-semibold',
    accentColor: '#000000',
  }
};

/**
 * The exact workout routine uploaded by user in the PDF
 */
export const USER_UPLOADED_ROUTINE: DayRoutine[] = [
  {
    id: 'day-1',
    dayNumber: 1,
    title: 'Day 1 chest',
    muscleGroup: 'Chest (الصدر)',
    exercises: [
      { id: 'c1', name: 'cable cross over', setsReps: '4X10', technique: '20 Drop Set', techniqueType: 'drop_set' },
      { id: 'c2', name: 'Incline Dm fly super inner chest', setsReps: '4X10', technique: '**** (Super Set)', techniqueType: 'super_set' },
      { id: 'c3', name: 'Incline push ups super with decline', setsReps: '4X10', technique: '**** (Super Set)', techniqueType: 'super_set' },
      { id: 'c4', name: 'Flat fly cable', setsReps: '4X10', technique: '20 Drop Set', techniqueType: 'drop_set' },
      { id: 'c5', name: 'incline Dm press with twisted', setsReps: '4X10', technique: '20 Drop Set', techniqueType: 'drop_set' },
      { id: 'c6', name: 'Flat Dm press twisted', setsReps: '4X10', technique: '20 Drop Set', techniqueType: 'drop_set' },
    ]
  },
  {
    id: 'day-2',
    dayNumber: 2,
    title: 'Day 2 shoulder',
    muscleGroup: 'Shoulder (الأكتاف)',
    exercises: [
      { id: 's1', name: 'Ez bar shoulder raise', setsReps: '4X10', technique: '20 Drop Set', techniqueType: 'drop_set' },
      { id: 's2', name: 'Seated Dm alternate press', setsReps: '4X10', technique: '20 Drop Set two arm', techniqueType: 'drop_set' },
      { id: 's3', name: 'seated shoulder dm press', setsReps: '4X10', technique: '20 Drop Set', techniqueType: 'drop_set' },
      { id: 's4', name: 'up right row Dm', setsReps: '4X10', technique: '20 Drop Set', techniqueType: 'drop_set' },
      { id: 's5', name: 'Seated Latiral raise shoulder', setsReps: '4X10', technique: '20 Drop Set', techniqueType: 'drop_set' },
      { id: 's6', name: 'Rear delt cable', setsReps: '4X10', technique: '20 Drop Set', techniqueType: 'drop_set' },
    ]
  },
  {
    id: 'day-3',
    dayNumber: 3,
    title: 'Day 3 Back',
    muscleGroup: 'Back (الظهر)',
    exercises: [
      { id: 'b1', name: 'Reverse cable row', setsReps: '4X10', technique: '20 Drop Set', techniqueType: 'drop_set' },
      { id: 'b2', name: 'Close grip latpulldown', setsReps: '4X10', technique: '20 Drop Set', techniqueType: 'drop_set' },
      { id: 'b3', name: 'Seated low row close grip', setsReps: '4X10', technique: '20 Drop Set', techniqueType: 'drop_set' },
      { id: 'b4', name: 'Two arm dm row', setsReps: '4X10', technique: '20 Drop Set', techniqueType: 'drop_set' },
      { id: 'b5', name: 'straight arm latpulldown', setsReps: '4X10', technique: '20 Drop Set', techniqueType: 'drop_set' },
      { id: 'b6', name: 'Dm deadlift', setsReps: '4X10', technique: '20 Drop Set', techniqueType: 'drop_set' },
    ]
  },
  {
    id: 'day-4',
    dayNumber: 4,
    title: 'Day 4 Bi & Tri',
    muscleGroup: 'Arms (باي وتراي)',
    exercises: [
      { id: 'a1', name: 'wide grip Bi curl', setsReps: '4X10', technique: '20 Drop Set', techniqueType: 'drop_set' },
      { id: 'a2', name: 'Bi preacher machine', setsReps: '4X10', technique: '20 Drop Set', techniqueType: 'drop_set' },
      { id: 'a3', name: 'reverse biceps curl', setsReps: '4X10', technique: '20 Drop Set', techniqueType: 'drop_set' },
      { id: 'a4', name: 'Tri cable push down', setsReps: '4X10', technique: '20 Drop Set', techniqueType: 'drop_set' },
      { id: 'a5', name: 'Tri cable kick back', setsReps: '4X10', technique: '20 Drop Set', techniqueType: 'drop_set' },
      { id: 'a6', name: 'Tri ez skull crusher', setsReps: '4X10', technique: '20 Drop Set', techniqueType: 'drop_set' },
    ]
  },
  {
    id: 'day-5',
    dayNumber: 5,
    title: 'Day 5 Leg',
    muscleGroup: 'Legs (الأرجل والسمانة)',
    exercises: [
      { id: 'l1', name: 'BB deep squat', setsReps: '4X10', technique: '**** (Hard Heavy)', techniqueType: 'super_set' },
      { id: 'l2', name: 'Leg extension', setsReps: '4X10', technique: '20 Drop Set', techniqueType: 'drop_set' },
      { id: 'l3', name: 'Lunge standing curl', setsReps: '4X10', technique: '**** (Superset)', techniqueType: 'super_set' },
      { id: 'l4', name: 'Leg press machine', setsReps: '4X10', technique: '20 Drop Set', techniqueType: 'drop_set' },
      { id: 'l5', name: 'Leg curl one leg', setsReps: '4X10', technique: '20 Drop Set', techniqueType: 'drop_set' },
      { id: 'l6', name: 'standing calf raise', setsReps: '4X10', technique: '20 Drop Set', techniqueType: 'drop_set' },
    ]
  },
  {
    id: 'day-6',
    dayNumber: 6,
    title: 'Day 6 Cardio & Core',
    muscleGroup: 'Cardio & Abs (كارديو وبطن)',
    exercises: [
      { id: 'k1', name: 'Treadmill (سير الجري)', setsReps: '20 min', technique: 'Moderate cardio', techniqueType: 'timed' },
      { id: 'k2', name: 'Stationary Bike (عجلة)', setsReps: '10 min', technique: 'Cardio burn', techniqueType: 'timed' },
      { id: 'k3', name: 'Side crunch', setsReps: '4X15', technique: 'Abdominal', techniqueType: 'normal' },
      { id: 'k4', name: 'Sit ups', setsReps: '4X15', technique: 'Abdominal', techniqueType: 'normal' },
      { id: 'k5', name: 'Core plank', setsReps: '4X40sec', technique: 'Isometric core', techniqueType: 'timed' },
    ]
  }
];

export const DEFAULT_COACH_INFO: CoachInfo = {
  coachName: 'كابتن / Coach',
  traineeName: 'البطل / Trainee',
  gymName: 'Gym & Fitness Center',
  programTitle: 'جدول تدريب مخصص - 6 أيام سبليت',
  goal: 'تضخيم وبناء عضل مع دروب سيت (Hypertrophy & Definition)',
  dateOrWeek: 'الأسبوع 1 - المرحلة الأولى',
  generalNotes: 'الإحماء 5-10 دقائق قبل التمرين، شرب 3-4 لتر ماء يومياً، والراحة بين المجموعات 60-90 ثانية.'
};

/**
 * Creates an empty exercise row for easy, fast user input
 */
export function createEmptyExercise(): ExerciseItem {
  return {
    id: 'ex-' + Math.random().toString(36).substring(2, 9),
    name: '',
    setsReps: '4X10',
    technique: '20 Drop Set',
    techniqueType: 'drop_set',
    notes: '',
  };
}

/**
 * Creates a brand new empty day with ready boxes
 */
export function createEmptyDay(dayNumber: number): DayRoutine {
  return {
    id: 'day-' + Math.random().toString(36).substring(2, 9),
    dayNumber,
    title: `Day ${dayNumber} New`,
    muscleGroup: 'Custom (مخصص)',
    exercises: [
      createEmptyExercise(),
      createEmptyExercise(),
      createEmptyExercise(),
      createEmptyExercise(),
    ]
  };
}

/**
 * Normalize set string e.g. "4 10" or "4*10" to "4X10"
 */
export function normalizeSetString(input: string): string {
  if (!input) return '';
  const trimmed = input.trim();
  // If user entered e.g. "4 10" or "4x10" or "4*10" or "4-10"
  const match = trimmed.match(/^(\d+)\s*(?:[*xX×\-\s])\s*(\d+)$/);
  if (match) {
    return `${match[1]}X${match[2]}`;
  }
  return trimmed;
}

/**
 * Apply a standard sets and reps value to all exercises in a day
 */
export function applyStandardSetsRepsToDay(day: DayRoutine, standardSetsReps: string): DayRoutine {
  const normalized = normalizeSetString(standardSetsReps);
  return {
    ...day,
    exercises: day.exercises.map((ex) => ({
      ...ex,
      setsReps: normalized,
    })),
  };
}

/**
 * Detect technique type from text
 */
export function detectTechniqueType(text: string): TechniqueType {
  const lower = text.toLowerCase();
  if (lower.includes('drop')) return 'drop_set';
  if (lower.includes('super') || lower.includes('****')) return 'super_set';
  if (lower.includes('min') || lower.includes('sec') || lower.includes('cardio')) return 'timed';
  if (lower.includes('warm')) return 'warmup';
  if (lower.includes('fail')) return 'failure';
  if (lower.includes('pyramid')) return 'pyramid';
  return 'normal';
}

/**
 * Calculate program statistics
 */
export function calculateStats(days: DayRoutine[]) {
  const totalDays = days.length;
  const totalExercises = days.reduce((acc, d) => acc + d.exercises.length, 0);
  
  // Calculate total estimated sets
  let totalSets = 0;
  for (const day of days) {
    for (const ex of day.exercises) {
      const match = ex.setsReps.match(/^(\d+)\s*[xX×]/);
      if (match) {
        totalSets += parseInt(match[1], 10);
      } else {
        totalSets += 3; // default estimate
      }
    }
  }

  return {
    totalDays,
    totalExercises,
    totalSets,
  };
}

/**
 * Format plan as clean text for sharing via WhatsApp
 */
export function formatWhatsAppMessage(coachInfo: CoachInfo, days: DayRoutine[]): string {
  let msg = `🏋️‍♂️ *${coachInfo.programTitle}*\n`;
  msg += `👤 المتدرب: ${coachInfo.traineeName}\n`;
  msg += `⚡ الهدف: ${coachInfo.goal}\n`;
  if (coachInfo.coachName) msg += `💪 إشراف الكابتن: ${coachInfo.coachName}\n`;
  msg += `─────────────────────\n\n`;

  days.forEach((day) => {
    msg += `📌 *${day.title}* (${day.muscleGroup})\n`;
    day.exercises.forEach((ex, idx) => {
      const tech = ex.technique ? ` [${ex.technique}]` : '';
      msg += `  ${idx + 1}. ${ex.name || 'تمرين'} ➔ *${ex.setsReps}*${tech}\n`;
    });
    msg += `\n`;
  });

  if (coachInfo.generalNotes) {
    msg += `📝 *ملاحظات عامة:*\n${coachInfo.generalNotes}\n`;
  }
  msg += `\n✨ تم التنسيق بواسطة GymCraft Designer`;
  return msg;
}

/**
 * Common Gym Exercise Suggestions for fast auto-complete
 */
export const EXERCISE_LIBRARY = [
  // Chest
  { category: 'Chest (صدر)', name: 'Cable Cross Over', arName: 'سحب كابل تقاطع للصدر' },
  { category: 'Chest (صدر)', name: 'Incline Dumbbell Fly', arName: 'تفتيح دمبل مائل عالي' },
  { category: 'Chest (صدر)', name: 'Incline Dumbbell Press', arName: 'ضغط دمبل بنش مائل عالي' },
  { category: 'Chest (صدر)', name: 'Flat Dumbbell Press Twisted', arName: 'ضغط دمبل مستوي مع دوران' },
  { category: 'Chest (صدر)', name: 'Flat Barbell Bench Press', arName: 'ضغط بار مستوي للصدر' },
  { category: 'Chest (صدر)', name: 'Flat Fly Cable', arName: 'تفتيح كابل مستوي' },
  { category: 'Chest (صدر)', name: 'Incline Push Ups Super', arName: 'ضغط مائل سوبر' },
  { category: 'Chest (صدر)', name: 'Chest Dips', arName: 'متوازي للصدر' },
  { category: 'Chest (صدر)', name: 'Pec Deck Fly Machine', arName: 'تفتيح جهاز بيك ديك الفراشة' },

  // Back
  { category: 'Back (ظهر)', name: 'Lat Pulldown (Wide Grip)', arName: 'سحب عالي قبضة واسعة' },
  { category: 'Back (ظهر)', name: 'Close Grip Lat Pulldown', arName: 'سحب عالي قبضة ضيقة' },
  { category: 'Back (ظهر)', name: 'Seated Low Row Close Grip', arName: 'سحب أرضي جهاز قبضة ضيقة' },
  { category: 'Back (ظهر)', name: 'Two Arm Dumbbell Row', arName: 'تجديف دمبل بالذراعين' },
  { category: 'Back (ظهر)', name: 'Straight Arm Lat Pulldown', arName: 'سحب كابل ذراع مستقيم' },
  { category: 'Back (ظهر)', name: 'Barbell Deadlift', arName: 'ديدليفت بار' },
  { category: 'Back (ظهر)', name: 'Dumbbell Deadlift', arName: 'ديدليفت دمبل' },
  { category: 'Back (ظهر)', name: 'Reverse Cable Row', arName: 'سحب كابل عكسي' },
  { category: 'Back (ظهر)', name: 'T-Bar Row', arName: 'تجديف تي بار' },

  // Shoulders
  { category: 'Shoulders (كتف)', name: 'Ez Bar Shoulder Raise', arName: 'رفع بار زيجزاج للكتف' },
  { category: 'Shoulders (كتف)', name: 'Seated Dumbbell Alternate Press', arName: 'ضغط دمبل تبادلي جالس' },
  { category: 'Shoulders (كتف)', name: 'Seated Shoulder Dumbbell Press', arName: 'ضغط دمبل جالس للكتف' },
  { category: 'Shoulders (كتف)', name: 'Upright Row Dumbbell', arName: 'سحب دمبل عمودي ترابيس وكتف' },
  { category: 'Shoulders (كتف)', name: 'Seated Lateral Raise Shoulder', arName: 'رفرفة جانبي دمبل جالس' },
  { category: 'Shoulders (كتف)', name: 'Rear Delt Cable', arName: 'رفرفة خلفي كابل للكتف' },
  { category: 'Shoulders (كتف)', name: 'Face Pulls Cable', arName: 'فيس بول كابل بالحبل' },
  { category: 'Shoulders (كتف)', name: 'Dumbbell Shrugs', arName: 'هز ترابيس بالدمبل' },

  // Arms
  { category: 'Arms (ذراع)', name: 'Wide Grip Biceps Curl', arName: 'تبادل باي قبضة واسعة' },
  { category: 'Arms (ذراع)', name: 'Biceps Preacher Machine', arName: 'باي جهاز بريتشر (سكوت)' },
  { category: 'Arms (ذراع)', name: 'Reverse Biceps Curl', arName: 'باي عكسي ساعد وباي' },
  { category: 'Arms (ذراع)', name: 'Hammer Curl', arName: 'باي هامر شاكوش' },
  { category: 'Arms (ذراع)', name: 'Triceps Cable Push Down', arName: 'تراي سحب كابل لأسفل' },
  { category: 'Arms (ذراع)', name: 'Triceps Cable Kick Back', arName: 'تراي كيك باك كابل' },
  { category: 'Arms (ذراع)', name: 'Triceps Ez Skull Crusher', arName: 'تراي فرنساوي بار زيجزاج' },
  { category: 'Arms (ذراع)', name: 'Overhead Triceps Rope', arName: 'تراي فوق الرأس حبل' },

  // Legs
  { category: 'Legs (أرجل)', name: 'Barbell Deep Squat', arName: 'سكوات بار عميق' },
  { category: 'Legs (أرجل)', name: 'Leg Extension Machine', arName: 'تمديد أرجل أمامي جهاز' },
  { category: 'Legs (أرجل)', name: 'Lunges Standing Curl', arName: 'طعنات لنجز وقوف' },
  { category: 'Legs (أرجل)', name: 'Leg Press Machine', arName: 'دفع رجلين جهاز مكبس' },
  { category: 'Legs (أرجل)', name: 'Leg Curl One Leg', arName: 'ثني خلفي فردي جهاز' },
  { category: 'Legs (أرجل)', name: 'Standing Calf Raise', arName: 'سمانة وقوف' },
  { category: 'Legs (أرجل)', name: 'Romanian Deadlift (RDL)', arName: 'ديدليفت روماني خلفيات' },
  { category: 'Legs (أرجل)', name: 'Hip Thrust Barbell', arName: 'هيب ثرست بار' },

  // Cardio & Core
  { category: 'Cardio & Core (كارديو وبطن)', name: 'Treadmill (سير الجري)', arName: 'جهاز سير الجري' },
  { category: 'Cardio & Core (كارديو وبطن)', name: 'Stationary Bike (عجلة)', arName: 'عجلة ثابتة' },
  { category: 'Cardio & Core (كارديو وبطن)', name: 'Side Crunch', arName: 'طحن جانبي للبطن' },
  { category: 'Cardio & Core (كارديو وبطن)', name: 'Sit Ups', arName: 'بطن كاملة سيت اب' },
  { category: 'Cardio & Core (كارديو وبطن)', name: 'Core Plank', arName: 'بلانك ثبات' },
  { category: 'Cardio & Core (كارديو وبطن)', name: 'Hanging Leg Raise', arName: 'رفع أرجل عقلة للبطن' },
];
