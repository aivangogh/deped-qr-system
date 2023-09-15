'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  CalendarIcon,
  PlusCircledIcon,
  ReloadIcon,
} from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { dashboardRoutes } from '@/app/routes';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { createOffice, getOffices } from '@/services/fetch/offices';
import { createTraining, getTraining } from '@/services/fetch/trainings';
import useOfficesStore from '@/store/useOfficesStore';
import { OfficesT } from '@/types/offices';
import { CreateTrainingT } from '@/types/trainings';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'react-query';
import useTrainingStore from '@/store/useTrainingStore';

const TrainingFormSchema = z.object({
  title: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  amount: z.coerce.number().positive(),
  year: z.string({
    required_error: 'Please select a year!',
  }),
  dateFrom: z.date({
    required_error: 'Please select a date and time',
    invalid_type_error: "That's not a date!",
  }),
  dateTo: z.date({
    required_error: 'Please select a date and time',
    invalid_type_error: "That's not a date!",
  }),
  numberOfHours: z.coerce.number().positive(),
  venue: z.string().min(2, {
    message: 'Venue must be at least 2 characters.',
  }),
  addressOfTheVenue: z.string().min(2, {
    message: 'Address of the venue must be at least 2 characters.',
  }),
  issuedOn: z.date({
    required_error: 'Please select a date and time',
    invalid_type_error: "That's not a date!",
  }),
  issuedAt: z.string({
    required_error: 'Please select must be at least 2 characters.',
    invalid_type_error: "That's not a date!",
  }),
  officeId: z.string({
    required_error: 'Please select implementing office!',
  }),
  programHolder: z.string({
    required_error: 'Please select program holder!',
  }),
});

const OfficeFormSchema = z.object({
  office: z.string({
    required_error: 'Please select must be at least 2 characters.',
  }),
});

export default function EditTrainingForm({
  trainingCode,
}: {
  trainingCode: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const { offices, setOffices, addOffice } = useOfficesStore();
  const { training, setTraining } = useTrainingStore();

  console.log(trainingCode);

  useQuery({
    queryKey: ['training', trainingCode],
    queryFn: () => getTraining(trainingCode),
    onSuccess({ data }) {
      console.log(data.training);
      setTraining(data.training);
    },
  });

  console.log(training);
  useQuery({
    queryKey: ['office-list'],
    queryFn: () => getOffices(),
    onSuccess({ data }) {
      setOffices(data);
    },
  });

  const addTrainingMutation = useMutation({
    mutationKey: ['new-training'],
    mutationFn: (formData: CreateTrainingT) => {
      return createTraining(formData);
    },
    onSuccess({ data }) {
      console.log(data);
      router.push(dashboardRoutes.dashboard.path);

      toast({
        title: 'Training created',
        description: 'Training created successfully',
      });
    },
    onError() {
      addTrainingMutation.reset();
      toast({
        title: 'Something went wrong',
        description: 'Training was not created. Please try again.',
      });
    },
  });

  const officeMutation = useMutation({
    mutationKey: ['new-office'],
    mutationFn: (formData: OfficesT) => {
      return createOffice(formData);
    },
    onSuccess({ data }) {
      console.log(data);
      addOffice(data);

      toast({
        title: 'Office created',
        description: 'Office added successfully',
      });
    },
    onError() {
      officeMutation.reset();
      toast({
        title: 'Something went wrong',
        description: 'Office was not added. Please try again.',
      });
    },
  });

  const trainingForm = useForm<z.infer<typeof TrainingFormSchema>>({
    resolver: zodResolver(TrainingFormSchema),
    defaultValues: {
      title: training?.title,
      // amount: training?.amount,
      // year: training?.year,
      dateFrom: training?.dateFrom,
      dateTo: training?.dateTo,
      numberOfHours: training?.numberOfHours,
      venue: training?.venue,
      addressOfTheVenue: training?.addressOfTheVenue,
      issuedOn: training?.issuedOn,
      issuedAt: training?.issuedAt,
      officeId: training?.officeId,
      programHolder: training?.programHolder,
    },
  });

  const officeForm = useForm<z.infer<typeof OfficeFormSchema>>({
    resolver: zodResolver(OfficeFormSchema),
  });

  function onSubmitTraining(data: z.infer<typeof TrainingFormSchema>) {
    console.log(data);
    addTrainingMutation.mutate(data);
  }

  function onSubmitOffice(data: z.infer<typeof OfficeFormSchema>) {
    // console.log(data);
    officeMutation.mutate(data);
  }

  return (
    <>
      <Card>
        <Dialog>
          <Form {...trainingForm}>
            <form onSubmit={trainingForm.handleSubmit(onSubmitTraining)}>
              <CardHeader>
                <CardTitle>Edit training</CardTitle>
                <CardDescription>
                  Edit the training information and details.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div>
                          <span className="text-xl font-bold">
                            Training Information
                          </span>
                        </div>
                        <div className="space-y-6">
                          <FormField
                            control={trainingForm.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem className="grid">
                                <FormLabel>
                                  Title
                                  <span className="text-red-500"> *</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    defaultValue={training?.title}
                                    placeholder="Type here..."
                                    {...field}
                                    autoFocus
                                  />
                                </FormControl>
                                <FormDescription>
                                  This will be used as the title of the
                                  training.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex space-x-4">
                            <FormField
                              control={trainingForm.control}
                              name="amount"
                              render={({ field }) => (
                                <FormItem className="grid">
                                  <FormLabel>
                                    HRTD Budget Allocation
                                    <span className="text-red-500"> *</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="0"
                                      defaultValue={0}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={trainingForm.control}
                              name="year"
                              render={({ field }) => (
                                <FormItem className="w-36">
                                  <FormLabel>
                                    Year{' '}
                                    <span className="text-red-500"> *</span>
                                  </FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select a year" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <ScrollArea className="h-[200px]">
                                        {Array.from({ length: 50 }, (_, i) => (
                                          <SelectItem
                                            key={i}
                                            value={`${
                                              new Date().getFullYear() + i
                                            }`}
                                          >
                                            {new Date().getFullYear() + i}
                                          </SelectItem>
                                        ))}
                                      </ScrollArea>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="flex space-x-6">
                            <FormField
                              control={trainingForm.control}
                              name="dateFrom"
                              render={({ field }) => (
                                <FormItem className="grid">
                                  <FormLabel>
                                    Date From{' '}
                                    <span className="text-red-500"> *</span>
                                  </FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={'outline'}
                                          className={cn(
                                            'w-[240px] pl-3 text-left font-normal',
                                            !field.value &&
                                              'text-muted-foreground'
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
                                    <PopoverContent
                                      className="w-auto p-0"
                                      align="start"
                                    >
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
                              control={trainingForm.control}
                              name="dateTo"
                              render={({ field }) => (
                                <FormItem className="grid">
                                  <FormLabel>
                                    Date To{' '}
                                    <span className="text-red-500"> *</span>
                                  </FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={'outline'}
                                          className={cn(
                                            'w-[240px] pl-3 text-left font-normal',
                                            !field.value &&
                                              'text-muted-foreground'
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
                                    <PopoverContent
                                      className="w-auto p-0"
                                      align="start"
                                    >
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
                          <FormField
                            control={trainingForm.control}
                            name="numberOfHours"
                            render={({ field }) => (
                              <FormItem className="w-fit">
                                <FormLabel>
                                  No. of hours{' '}
                                  <span className="text-red-500"> *</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="0"
                                    type="number"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="text-xl font-bold">
                            Training Location
                          </span>
                        </div>
                        <div className="space-y-6">
                          <FormField
                            control={trainingForm.control}
                            name="venue"
                            render={({ field }) => (
                              <FormItem className="grid">
                                <FormLabel>
                                  Venue <span className="text-red-500"> *</span>
                                  <span className="opacity-80 italic text-sm">
                                    (New People’s Hall, 3rd Floor, New City
                                    Hall)
                                  </span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Type here..."
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Note: The input here will be used as the venue
                                  of generated certificate.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={trainingForm.control}
                            name="addressOfTheVenue"
                            render={({ field }) => (
                              <FormItem className="grid">
                                <FormLabel>
                                  Address of the training
                                  <span className="text-red-500"> *</span>
                                  <span className="opacity-80 italic text-sm">
                                    (Malaybalay City, Bukidnon)
                                  </span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Type here..."
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Note: The input here will be used as the
                                  address of generated certificate.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="text-xl font-bold">
                            Training Details
                          </span>
                        </div>
                        <div className="space-y-6">
                          <FormField
                            control={trainingForm.control}
                            name="issuedOn"
                            render={({ field }) => (
                              <FormItem className="grid">
                                <FormLabel>
                                  Issued On{' '}
                                  <span className="text-red-500"> *</span>
                                </FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={'outline'}
                                        className={cn(
                                          'w-[240px] pl-3 text-left font-normal',
                                          !field.value &&
                                            'text-muted-foreground'
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
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormDescription>
                                  This form as the date of the certificate
                                  issued.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={trainingForm.control}
                            name="issuedAt"
                            render={({ field }) => (
                              <FormItem className="grid">
                                <FormLabel>
                                  Issued At{' '}
                                  <span className="text-red-500"> *</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Type here..."
                                    type="text"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  This form as the place of the certificate
                                  issued.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={trainingForm.control}
                            name="officeId"
                            render={({ field }) => (
                              <FormItem className="w-72">
                                <FormLabel>
                                  Implementing Office{' '}
                                  <span className="text-red-500"> *</span>
                                </FormLabel>
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select a Office" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {offices.length > 0 ? (
                                        <ScrollArea className="max-h-72 min-h-fit">
                                          {offices.map(
                                            ({ officeId, office }) => (
                                              <SelectItem
                                                key={officeId}
                                                value={officeId}
                                                className="h-10"
                                              >
                                                {office}
                                              </SelectItem>
                                            )
                                          )}
                                        </ScrollArea>
                                      ) : (
                                        <div className="text-center py-2">
                                          <span className="text-xs">
                                            No Office found
                                          </span>
                                        </div>
                                      )}
                                      <SelectSeparator />
                                      <DialogTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          className="w-full h-8"
                                        >
                                          <PlusCircledIcon className="mr-2 h-4 w-4" />
                                          Add Office
                                        </Button>
                                      </DialogTrigger>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={trainingForm.control}
                            name="programHolder"
                            render={({ field }) => (
                              <FormItem className="grid">
                                <FormLabel>
                                  Program Holder{' '}
                                  <span className="text-red-500"> *</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Type here..."
                                    type="text"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between space-x-2">
                <Button variant="ghost" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={addTrainingMutation.isLoading}>
                  {addTrainingMutation.isLoading ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit'
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>

          {/* Adding Office Dialog */}
          <DialogContent className="sm:max-w-[425px]">
            <Form {...officeForm}>
              <form onSubmit={officeForm.handleSubmit(onSubmitOffice)}>
                <DialogHeader>
                  <DialogTitle>Impletement new Office</DialogTitle>
                  <DialogDescription>
                    This will create a new office and add it to the list.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-8">
                  <div className="grid items-center space-y-2">
                    <FormField
                      control={officeForm.control}
                      name="office"
                      render={({ field }) => (
                        <FormItem className="grid">
                          <FormLabel>Implementing Office</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Type here..."
                              {...field}
                              autoFocus
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={officeMutation.isLoading}>
                    {officeMutation.isLoading ? (
                      <>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      'Add new'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </Card>
    </>
  );
}
