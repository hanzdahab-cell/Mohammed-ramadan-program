import React, { useState } from 'react';
import { X, Search, Plus, Check } from 'lucide-react';
import { EXERCISE_LIBRARY, DayRoutine } from '../utils/workoutData.ts';

interface ExerciseLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  days: DayRoutine[];
  onAddExerciseToDay: (dayId: string, exName: string) => void;
  isArabic: boolean;
}

export const ExerciseLibraryModal: React.FC<ExerciseLibraryModalProps> = ({
  isOpen,
  onClose,
  days,
  onAddExerciseToDay,
  isArabic,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [targetDayId, setTargetDayId] = useState<string>(days[0]?.id || '');
  const [addedItem, setAddedItem] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = ['All', ...Array.from(new Set(EXERCISE_LIBRARY.map((item) => item.category)))];

  const filteredExercises = EXERCISE_LIBRARY.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.arName.includes(search);
    return matchesCategory && matchesSearch;
  });

  const handleAdd = (name: string) => {
    if (!targetDayId && days[0]) {
      onAddExerciseToDay(days[0].id, name);
    } else {
      onAddExerciseToDay(targetDayId, name);
    }
    setAddedItem(name);
    setTimeout(() => setAddedItem(null), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">
              {isArabic ? 'مكتبة التمارين الجاهزة' : 'Exercise Library'}
            </h3>
            <p className="text-xs text-slate-400">
              {isArabic ? 'اختر أي تمرين لإضافته فوراً إلى جدولك' : 'Click any exercise to insert directly into your split'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target Day Picker & Search */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex flex-wrap gap-3 items-center">
          {/* Target Day Select */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-300">
              {isArabic ? 'إضافة إلى:' : 'Add to:'}
            </span>
            <select
              value={targetDayId}
              onChange={(e) => setTargetDayId(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-xs sm:text-sm text-slate-100 rounded-lg px-2.5 py-1.5 focus:outline-none"
            >
              {days.map((day) => (
                <option key={day.id} value={day.id}>
                  {day.title} ({day.muscleGroup})
                </option>
              ))}
            </select>
          </div>

          {/* Search bar */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isArabic ? 'ابحث عن اسم التمرين...' : 'Search exercises...'}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Categories Pills */}
        <div className="px-4 py-2 border-b border-slate-800 flex gap-1.5 overflow-x-auto text-xs scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {cat === 'All' ? (isArabic ? 'الكل' : 'All') : cat}
            </button>
          ))}
        </div>

        {/* Exercises Grid List */}
        <div className="p-4 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {filteredExercises.map((item, idx) => {
            const isJustAdded = addedItem === item.name;
            return (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 flex items-center justify-between gap-2 transition"
              >
                <div>
                  <div className="text-sm font-bold text-slate-100">{item.name}</div>
                  <div className="text-xs text-amber-400/90">{item.arName}</div>
                </div>

                <button
                  onClick={() => handleAdd(item.name)}
                  className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                    isJustAdded
                      ? 'bg-emerald-500 text-slate-950 scale-105'
                      : 'bg-slate-700 hover:bg-emerald-600 text-white'
                  }`}
                  title="إضافة"
                >
                  {isJustAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            {isArabic ? 'إغلاق' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
