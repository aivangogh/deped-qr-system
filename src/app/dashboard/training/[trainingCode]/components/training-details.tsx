'use client';

import { addDays } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as React from 'react';
import { DateRange } from 'react-day-picker';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TrainingDetailsT } from '@/types/types';
import { CalendarDateRangePicker } from './event-info/date-range-picker';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { TrainingT } from '@/types/training';
import { Training } from '@prisma/client';
import { PresetActions } from '../../../(components)/PresetActions';
import { DialogFileUpload } from '@/app/dashboard/(components)/FileUploader/dialog-file-upload';

const accountFormSchema = z.object({
  titleOfTraining: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  dateOfTraining: z.date({
    required_error: 'Date of training is required.',
  }),
  numberOfHours: z.number(),
  nameOfProgramHolder: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  programHolder: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
};

export function TrainingDetails({ data }: { data: Training }) {
  const { toast } = useToast();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 20),
  });

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  function onSubmit(data: AccountFormValues) {
    toast({
      title: 'Training details saved successfully!',
      description: 'Working in progress...',
    });
  }

  return (
    <>
      <div className="flex justify-between">
        <span className="text-3xl font-bold">Training Details</span>
        <div className="space-x-2">
          <DialogFileUpload />
          <PresetActions />
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex space-x-20"
        >
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="trainingCode">Training Code:</Label>
              <Input
                type="text"
                id="trainingCode"
                value={data.trainingCode!}
                readOnly
                className="cursor-default"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="titleOfTraining">Title of Training:</Label>
              <Input
                type="text"
                id="titleOfTraining"
                value={data.title}
                readOnly
                className="cursor-default"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="numberOfHours">Date of Training:</Label>
              <CalendarDateRangePicker
                dateData={{
                  from: data.dateFrom,
                  to: data.dateTo,
                }}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="numberOfHours">Number of hours:</Label>
              <Input
                type="number"
                id="numberOfHours"
                placeholder="24"
                value={data.numberOfHours ? data.numberOfHours : 0}
                readOnly
                className="cursor-default"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="programHolder">Program Holder:</Label>
              <Input
                type="text"
                id="programHolder"
                placeholder="Type here..."
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="nameOfProgramHolder">
                Name of Program Holder:
              </Label>
              <Input
                type="text"
                id="nameOfProgramHolder"
                placeholder="Type here..."
              />
            </div>
          </div>

          <div className="space-y-4 flex items-end">
            <Button size="sm" variant="secondary" type="submit">
              <Save className="mr-2 h-4 w-4" />
              Update Details
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
