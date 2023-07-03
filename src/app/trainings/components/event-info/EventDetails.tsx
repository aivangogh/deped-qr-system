'use client';

import { addDays } from 'date-fns';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TrainingDetailsT } from '@/types/types';
import { CalendarDateRangePicker } from './date-range-picker';

export function EventDetails({ data }: { data: TrainingDetailsT }) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 20),
  });

  return (
    <>
      <div className="flex space-x-20">
        <div className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="trainingId">Training ID:</Label>
            <Input type="text" id="trainingId" value={data.trainingId} />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="titleOfTraining">Title of Training:</Label>
            <Input type="text" id="titleOfTraining" value={data.title} />
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="numberOfHours">Date of Training:</Label>
            <CalendarDateRangePicker dateData={data.date} />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="numberOfHours">Number of hours:</Label>
            <Input
              type="number"
              id="numberOfHours"
              placeholder="24"
              value={data.hours}
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="programHolder">Program Holder:</Label>
            <Input type="text" id="programHolder" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="nameOfProgramHolder">Name of Program Holder:</Label>
            <Input type="text" id="nameOfProgramHolder" />
          </div>
        </div>
      </div>
    </>
  );
}
