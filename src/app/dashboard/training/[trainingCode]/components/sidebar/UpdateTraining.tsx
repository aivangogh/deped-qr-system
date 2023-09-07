import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CalendarDateRangePicker } from '../event-info/date-range-picker';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Save } from 'lucide-react';
import useTrainingStore from '@/store/useTrainingStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from '@/components/ui/select';
import usePapsStore from '@/store/usePapsStore';
import { useQuery } from 'react-query';
import { getPaps } from '@/services/fetch/paps';
import { Pap } from '@prisma/client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';

const trainingFormSchema = z.object({
  titleOfTraining: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  dateFrom: z.date({
    required_error: 'Please select a date and time',
    invalid_type_error: "That's not a date!",
  }),
  dateTo: z.date({
    required_error: 'Please select a date and time',
    invalid_type_error: "That's not a date!",
  }),
  papId: z.string(),
  numberOfHours: z.number(),
  venue: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  addressOfTheVenue: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
});

type TrainingFormValues = z.infer<typeof trainingFormSchema>;

const defaultValues: Partial<TrainingFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
};

export default function UpdateTraining() {
  const { toast } = useToast();
  const { paps, setPaps } = usePapsStore();
  const { training } = useTrainingStore();

  useQuery({
    queryKey: 'paps',
    queryFn: () => getPaps(),
    onSuccess: (res) => {
      setPaps(res.data);
    },
  });

  const form = useForm<TrainingFormValues>({
    resolver: zodResolver(trainingFormSchema),
  });

  function onSubmit(data: TrainingFormValues) {
    toast({
      title: 'Training details saved successfully!',
      description: 'Working in progress...',
    });

    console.log(data);
  }

  return (
    <>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Training Details</SheetTitle>
          <SheetDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col justify-between h-full space-y-4"
            >
              <div className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="titleOfTraining"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title of Training:</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            id="titleOfTraining"
                            value={training.title}
                            className="cursor-default"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="dateFrom"
                    render={({ field }) => (
                      <FormItem className="grid">
                        <FormLabel>
                          Date From <span className="text-red-500"> *</span>
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-[240px] pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Training starts on the first day.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dateTo"
                    render={({ field }) => (
                      <FormItem className="grid">
                        <FormLabel>
                          Date To <span className="text-red-500"> *</span>
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-[240px] pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Training ends on the last day.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="papId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Project, Activities and Projects (PAPs):
                        </FormLabel>
                        <Select value={training.papId!}>
                          <FormControl>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select a PAP" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {paps.map(({ papId, pap }) => (
                              <SelectItem key={papId} value={papId}>
                                {pap}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="numberOfHours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of hours:</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            id="numberOfHours"
                            placeholder="24"
                            value={
                              training.numberOfHours
                                ? training.numberOfHours
                                : 0
                            }
                            className="cursor-default"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="venue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Venue:</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            id="venue"
                            placeholder="Type here..."
                            value={training.venue!}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="addressOfTheVenue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address of the venue:</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            id="addressOfTheVenue"
                            placeholder="Type here..."
                            value={training.addressOfTheVenue!}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="">
                <Button size="sm" type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Update Details
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </>
  );
}
