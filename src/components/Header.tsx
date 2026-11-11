import React from 'react';
import { 
  Dumbbell, 
  Palette, 
  Plus, 
  Download, 
  Printer, 
  Share2, 
  Play, 
  FileSpreadsheet, 
  RotateCcw,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { THEMES, ThemeConfig } from '../utils/workoutData.ts';

interface HeaderProps {
  currentTheme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
  onAddDay: () => void;
  onOpenExport: () => void;
  onPrint: () => void;
  onOpenLiveTracker: () => void;
  onOpenLibrary: () => void;
  onOpenPresets: () => void;
  onResetToBlank: () => void;
  isArabic: boolean;
  setIsArabic: (val: boolean) => void;
  liveTrackerActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTheme,
  setTheme,
  onAddDay,
  onOpenExport,
  onPrint,
  onOpenLiveTracker,
  onOpenLibrary,
  onOpenPresets,
  onResetToBlank,
  isArabic,
  setIsArabic,
  liveTrackerActive,
}) => {
  return (
    <header className="no-print sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/10 ring-1 ring-white/20">
              <Dumbbell className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  GymCraft
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {isArabic ? 'صانع الجداول الذكي' : 'Split Designer'}
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {isArabic 
                  ? 'قوالب جاهزة ومربعات منظمة لتصميم جداول التمرين بضغطة زر' 
                  : 'Smart ready-to-use workout split templates and instant export'}
              </p>
            </div>
          </div>

          {/* Center: Theme Selector & Presets */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Presets Button */}
            <button
              onClick={onOpenPresets}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 border border-slate-700 transition"
              title={isArabic ? 'نماذج جاهزة' : 'Templates & Presets'}
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>{isArabic ? 'النماذج والقوالب' : 'Presets'}</span>
            </button>

            {/* Exercise Library Button */}
            <button
              onClick={onOpenLibrary}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 border border-slate-700 transition"
              title={isArabic ? 'مكتبة التمارين' : 'Exercise Library'}
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>{isArabic ? 'مكتبة التمارين' : 'Exercises'}</span>
            </button>

            {/* Theme Picker Dropdown */}
            <div className="relative flex items-center">
              <label htmlFor="theme-select" className="sr-only">اختر المظهر</label>
              <div className="flex items-center gap-1 bg-slate-800/90 border border-slate-700 rounded-lg px-2 py-1">
                <Palette className="w-3.5 h-3.5 text-amber-400" />
                <select
                  id="theme-select"
                  value={currentTheme.id}
                  onChange={(e) => {
                    const found = THEMES[e.target.value];
                    if (found) setTheme(found);
                  }}
                  className="bg-transparent text-xs sm:text-sm text-slate-200 focus:outline-none cursor-pointer pr-1"
                >
                  {Object.values(THEMES).map((t) => (
                    <option key={t.id} value={t.id} className="bg-slate-800 text-slate-100">
                      {isArabic ? t.nameAr : t.nameEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Language switch */}
            <button
              onClick={() => setIsArabic(!isArabic)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
              title="تغيير اللغة / Switch Language"
            >
              {isArabic ? 'English' : 'عربي'}
            </button>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Add New Day */}
            <button
              onClick={onAddDay}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md shadow-emerald-700/20 transition active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>{isArabic ? 'إضافة يوم جديد' : 'Add Day'}</span>
            </button>

            {/* Live In-Gym Mode */}
            <button
              onClick={onOpenLiveTracker}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 border transition ${
                liveTrackerActive 
                  ? 'bg-amber-600/30 text-amber-300 border-amber-500 animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{isArabic ? 'وضع التمرين المباشر' : 'Live Workout'}</span>
            </button>

            {/* Export Image / Share */}
            <button
              onClick={onOpenExport}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-sm transition active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{isArabic ? 'تصدير / صورة' : 'Export Image'}</span>
            </button>

            {/* Print Button */}
            <button
              onClick={onPrint}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-1 border border-slate-700 transition"
              title={isArabic ? 'طباعة / PDF' : 'Print / PDF'}
            >
              <Printer className="w-4 h-4 text-slate-300" />
              <span className="hidden sm:inline">{isArabic ? 'طباعة' : 'Print'}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
