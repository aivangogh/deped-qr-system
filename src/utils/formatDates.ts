export function formatDatesToDateRange(
  startDateStr: string,
  endDateStr: string
): string {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const month = startDate.toLocaleDateString('en-US', { month: 'long' });
  const year = startDate.getFullYear();

  if (startDay === endDay) {
    return `${month} ${startDay}, ${year}`;
  } else {
    return `${month} ${startDay}-${endDay}, ${year}`;
  }
}

export function generateDayLabel(dateStr: Date): string {
  const date = new Date(dateStr);
  const day = date.getDate();
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

export function generateMonthYearLabel(dateStr: string): string {
  const date = new Date(dateStr);
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const year = date.getFullYear();
  return `${month}, ${year}`;
}
