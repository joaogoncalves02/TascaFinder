export type DailySchedule = [string, string][];
export type WeeklySchedule = Record<string, DailySchedule>;

const weekdayMap = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const parseTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export const isOpen = (schedule: WeeklySchedule, referenceDate: Date = new Date()) => {
  const dayKey = weekdayMap[referenceDate.getDay()];
  const today = schedule[dayKey] ?? [];
  if (today.length === 0) {
    return false;
  }
  const minutes = referenceDate.getHours() * 60 + referenceDate.getMinutes();
  return today.some(([start, end]) => {
    const startMinutes = parseTime(start);
    const endMinutes = parseTime(end);
    if (endMinutes < startMinutes) {
      return minutes >= startMinutes || minutes <= endMinutes;
    }
    return minutes >= startMinutes && minutes <= endMinutes;
  });
};

export const todaysSchedule = (schedule: WeeklySchedule, referenceDate: Date = new Date()) => {
  const dayKey = weekdayMap[referenceDate.getDay()];
  return schedule[dayKey] ?? [];
};

export const formatScheduleRange = (range: DailySchedule) =>
  range.map(([start, end]) => `${start}–${end}`).join(', ');
