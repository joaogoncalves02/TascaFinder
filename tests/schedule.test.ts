import assert from 'assert';
import { isOpen, formatScheduleRange, todaysSchedule } from '@/lib/schedule';

export const runScheduleTests = () => {
  const schedule = {
    mon: [
      ['12:00', '15:00'],
      ['19:00', '22:00'],
    ],
    tue: [],
    wed: [['10:00', '02:00']],
  };

  const mondayLunch = new Date('2024-01-01T13:00:00');
  assert(isOpen(schedule, mondayLunch), 'Deve estar aberto na hora de almoço de segunda-feira');

  const mondayNight = new Date('2024-01-01T23:30:00');
  assert(!isOpen(schedule, mondayNight), 'Deve fechar após as 22h de segunda-feira');

  const wednesdayLate = new Date('2024-01-03T01:30:00');
  assert(isOpen(schedule, wednesdayLate), 'Faixa que atravessa a meia-noite deve ser reconhecida.');

  const todayRange = todaysSchedule(schedule, new Date('2024-01-01T08:00:00'));
  assert(formatScheduleRange(todayRange) === '12:00–15:00, 19:00–22:00', 'Formato de horário deve usar separador EN dash.');
};
