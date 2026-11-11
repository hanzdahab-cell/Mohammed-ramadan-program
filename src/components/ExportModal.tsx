import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  Printer, 
  FileCode, 
  Upload, 
  Share2, 
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { 
  CoachInfo, 
  DayRoutine, 
  formatWhatsAppMessage 
} from '../utils/workoutData.ts';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  coachInfo: CoachInfo;
  days: DayRoutine[];
  onImportDays: (days: DayRoutine[], info?: Partial<CoachInfo>) => void;
  isArabic: boolean;
  onPrint: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  coachInfo,
  days,
  onImportDays,
  isArabic,
  onPrint,
}) => {
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [isExportingImage, setIsExportingImage] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  if (!isOpen) return null;

  const whatsappText = formatWhatsAppMessage(coachInfo, days);

  // Download high-resolution PNG image
  const handleDownloadImage = async () => {
    setIsExportingImage(true);
    setExportError(null);
    try {
      const node = document.getElementById('workout-export-target');
      if (!node) {
        throw new Error('Workout container not found');
      }

      // Generate PNG
      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 2, // High resolution for mobile retina screens
        backgroundColor: '#0f172a',
      });

      const link = document.createElement('a');
      link.download = `${coachInfo.traineeName || 'workout'}-split-gymcraft.png`;
      link.href = dataUrl;
      link.click();
    } catch (err: any) {
      console.error('Image export failed:', err);
      setExportError(isArabic ? 'حدث خطأ أثناء حفظ الصورة، يمكنك استخدام الطباعة كبديل' : 'Failed to export image, please use Print instead.');
    } finally {
      setIsExportingImage(false);
    }
  };

  // Copy WhatsApp Text
  const handleCopyWhatsApp = async () => {
    try {
      await navigator.clipboard.writeText(whatsappText);
      setCopiedWhatsApp(true);
      setTimeout(() => setCopiedWhatsApp(false), 2000);
    } catch {
      // Fallback
    }
  };

  // Export JSON backup file
  const handleExportJson = () => {
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      coachInfo,
      days,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gymcraft-${coachInfo.traineeName || 'plan'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON file
  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.days && Array.isArray(parsed.days)) {
          onImportDays(parsed.days, parsed.coachInfo);
          onClose();
        } else {
          alert(isArabic ? 'صيغة الملف غير صحيحة' : 'Invalid file format');
        }
      } catch (err) {
        alert(isArabic ? 'تعذر قراءة الملف' : 'Could not read file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-white">
              {isArabic ? 'خيارات الحفظ والمشاركة' : 'Export & Share'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content options */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* 1. Download as Image (PNG) */}
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {isArabic ? 'تحميل كصورة عالية الدقة (PNG)' : 'Download High-Res PNG Image'}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {isArabic ? 'جاهزة للإرسال على واتساب أو نشرها للمتدرب' : 'Perfect for WhatsApp, Instagram, or printing'}
                  </p>
                </div>
              </div>

              <button
                onClick={handleDownloadImage}
                disabled={isExportingImage}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition active:scale-95 shrink-0"
              >
                {isExportingImage ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{isArabic ? 'جارٍ المعالجة...' : 'Exporting...'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>{isArabic ? 'تحميل الصورة' : 'Download'}</span>
                  </>
                )}
              </button>
            </div>
            {exportError && (
              <p className="text-xs text-rose-400 mt-2">{exportError}</p>
            )}
          </div>

          {/* 2. Copy for WhatsApp */}
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Copy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {isArabic ? 'نسخ كنص منسق للواتساب' : 'Copy Formatted WhatsApp Text'}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {isArabic ? 'نص مرتب بالإيموجي وأسماء التمارين والجولات' : 'Formatted with emojis and clean day lists'}
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopyWhatsApp}
                className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shrink-0 ${
                  copiedWhatsApp
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-600/80 hover:bg-emerald-500 text-white'
                }`}
              >
                {copiedWhatsApp ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedWhatsApp ? (isArabic ? 'تم النسخ!' : 'Copied!') : (isArabic ? 'نسخ النص' : 'Copy')}</span>
              </button>
            </div>

            {/* Quick preview of WhatsApp text */}
            <div className="mt-3 p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-300 max-h-24 overflow-y-auto whitespace-pre-wrap">
              {whatsappText}
            </div>
          </div>

          {/* 3. Print / Save as PDF */}
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {isArabic ? 'طباعة مباشرة / حفظ PDF' : 'Direct Print / Save as PDF'}
                </h4>
                <p className="text-xs text-slate-400">
                  {isArabic ? 'تنسيق قياسي A4 مرتب للطباعة الورقية' : 'Optimized standard A4 paper layout'}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                setTimeout(onPrint, 300);
              }}
              className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition active:scale-95 shrink-0"
            >
              <Printer className="w-4 h-4" />
              <span>{isArabic ? 'طباعة' : 'Print'}</span>
            </button>
          </div>

          {/* 4. Backup & Restore (JSON) */}
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {isArabic ? 'نسخة احتياطية (JSON)' : 'Backup & Restore File'}
                </h4>
                <p className="text-xs text-slate-400">
                  {isArabic ? 'احفظ جدولك كملف واسترجعه في أي وقت' : 'Save full routine data or import back'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleExportJson}
                className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold"
                title="تصدير ملف"
              >
                {isArabic ? 'تصدير' : 'Export'}
              </button>

              <label className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold cursor-pointer">
                <span>{isArabic ? 'استيراد' : 'Import'}</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJsonFile}
                  className="hidden"
                />
              </label>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            {isArabic ? 'إغلاق' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
