'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDays, format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from '@/components/ui/use-toast';
import { TrainingDetailsT } from '@/types/types';
import { programs } from '../../data/programs';
import { Label } from '@/components/ui/label';
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
            <Input
              type="text"
              id="trainingId"
              placeholder="2023-#####"
              value={data.trainingId}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="titleOfTraining">Title of Training:</Label>
            <Input
              type="text"
              id="titleOfTraining"
              placeholder="2023-#####"
              value={data.title}
            />
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
        <div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="numberOfHours">Program Holder:</Label>
            <Select value={data.programHolder}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Program" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="CID">CID</SelectItem>
                  <SelectItem value="OSDS">OSDS</SelectItem>
                  <SelectItem value="SGOD">SGOD</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
}
