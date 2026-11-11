import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  normalizeSetString, 
  detectTechniqueType, 
  calculateStats, 
  createEmptyDay, 
  createEmptyExercise,
  USER_UPLOADED_ROUTINE,
  formatWhatsAppMessage,
  DEFAULT_COACH_INFO 
} from './workoutData.ts';

test('normalizeSetString standardizes set notation', () => {
  assert.equal(normalizeSetString('4 10'), '4X10');
  assert.equal(normalizeSetString('4*10'), '4X10');
  assert.equal(normalizeSetString('3x12'), '3X12');
  assert.equal(normalizeSetString('4×15'), '4X15');
  assert.equal(normalizeSetString('20 min'), '20 min');
  assert.equal(normalizeSetString(''), '');
});

test('detectTechniqueType detects drop sets, super sets and cardio', () => {
  assert.equal(detectTechniqueType('20 Drop Set'), 'drop_set');
  assert.equal(detectTechniqueType('**** (Super Set)'), 'super_set');
  assert.equal(detectTechniqueType('20 min cardio'), 'timed');
  assert.equal(detectTechniqueType('To Failure'), 'failure');
  assert.equal(detectTechniqueType('Standard'), 'normal');
});

test('calculateStats aggregates days, exercises and sets', () => {
  const stats = calculateStats(USER_UPLOADED_ROUTINE);
  assert.equal(stats.totalDays, 6);
  assert.equal(stats.totalExercises, 35);
  assert(stats.totalSets > 50, 'Total sets should be greater than 50');
});

test('createEmptyDay generates clean day with exercises', () => {
  const day = createEmptyDay(7);
  assert.equal(day.dayNumber, 7);
  assert.equal(day.title, 'Day 7 New');
  assert.equal(day.exercises.length, 4);
  assert.equal(day.exercises[0].name, '');
});

test('createEmptyExercise has empty name and defaults', () => {
  const ex = createEmptyExercise();
  assert.equal(ex.name, '');
  assert.equal(ex.setsReps, '4X10');
});

test('formatWhatsAppMessage formats valid readable text', () => {
  const msg = formatWhatsAppMessage(DEFAULT_COACH_INFO, USER_UPLOADED_ROUTINE.slice(0, 2));
  assert(msg.includes('Day 1 chest'));
  assert(msg.includes('cable cross over'));
  assert(msg.includes('Day 2 shoulder'));
});

test('applyStandardSetsRepsToDay propagates standard sets & reps to all exercises in day', async () => {
  const { applyStandardSetsRepsToDay } = await import('./workoutData.ts');
  const day = createEmptyDay(1);
  day.exercises[0].setsReps = '4X10';
  day.exercises[1].setsReps = '3X12';
  day.exercises[2].setsReps = '5X5';

  const updatedDay = applyStandardSetsRepsToDay(day, '4 12');
  assert.equal(updatedDay.exercises.length, 4);
  assert.equal(updatedDay.exercises[0].setsReps, '4X12');
  assert.equal(updatedDay.exercises[1].setsReps, '4X12');
  assert.equal(updatedDay.exercises[2].setsReps, '4X12');
  assert.equal(updatedDay.exercises[3].setsReps, '4X12');
});
