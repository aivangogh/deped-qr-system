import moment from 'moment-timezone';

export function formatDatesToDateRange(
  startDateStr: Date,
  endDateStr: Date
): string {
  const startDate = moment(startDateStr).tz('Asia/Manila');
  const endDate = moment(endDateStr).tz('Asia/Manila');

  const startDay = startDate.date();
  const endDay = endDate.date();
  const month = startDate.format('MMMM');
  const year = startDate.year();

  if (startDay === endDay) {
    return `${month} ${startDay}, ${year}`;
  } else {
    return `${month} ${startDay}-${endDay}, ${year}`;
  }
}

export function generateDayLabel(dateStr: Date): string {
  const date = moment(dateStr).tz('Asia/Manila');
  const day = date.date();
  const suffix = getDaySuffix(day);
  return `${day}${suffix}`;
}

function getDaySuffix(day: number): string {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  const lastDigit = day % 10;
  switch (lastDigit) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export function generateMonthYearLabel(dateStr: Date): string {
  const date = moment(dateStr).tz('Asia/Manila');
  const month = date.format('MMMM');
  const year = date.year();
  return `${month}, ${year}`;
}
