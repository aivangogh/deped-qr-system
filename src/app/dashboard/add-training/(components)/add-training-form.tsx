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
import { createPap, getPaps } from '@/services/fetch/paps';
import { createTraining } from '@/services/fetch/trainings';
import usePapsStore from '@/store/usePapsStore';
import { PapsT } from '@/types/paps';
import { CreateTrainingT } from '@/types/trainings';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'react-query';
import { dashboardRoutes } from '@/app/routes';

const TrainingFormSchema = z.object({
  title: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
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
  papId: z.string({
    required_error: 'Please select at least one PAP',
  }),
  validUntil: z.date({
    required_error: 'Please select a date and time',
    invalid_type_error: "That's not a date!",
  }),
});

const PapFormSchema = z.object({
  pap: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
});

export default function AddTrainingForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { paps, setPaps, addPap } = usePapsStore();

  const trainingForm = useForm<z.infer<typeof TrainingFormSchema>>({
    resolver: zodResolver(TrainingFormSchema),
  });

  const papForm = useForm<z.infer<typeof PapFormSchema>>({
    resolver: zodResolver(PapFormSchema),
  });

  useQuery({
    queryKey: ['paps'],
    queryFn: () => getPaps(),
    onSuccess({ data }) {
      setPaps(data);
      console.log(data);
    },
  });

  const addTrainingMutation = useMutation({
    mutationKey: ['new-training'],
    mutationFn: (formData: CreateTrainingT) => {
      return createTraining(formData);
    },
    onSuccess({ data }) {
      console.log(data);
      // addPap(data);
      router.replace(dashboardRoutes.dashboard.path);

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

  const papMutation = useMutation({
    mutationKey: ['new-pap'],
    mutationFn: (formData: PapsT) => {
      // console.log(formData);
      return createPap(formData);
    },
    onSuccess({ data }) {
      console.log(data);
      addPap(data);

      toast({
        title: 'PAP created',
        description: 'PAP created successfully',
      });
    },
    onError() {
      papMutation.reset();
      toast({
        title: 'Something went wrong',
        description: 'PAP was not created. Please try again.',
      });
    },
  });

  function onSubmitTraining(data: z.infer<typeof TrainingFormSchema>) {
    console.log(data);
    addTrainingMutation.mutate(data);
  }

  function onSubmitPap(data: z.infer<typeof PapFormSchema>) {
    // console.log(data);
    papMutation.mutate(data);
  }

  return (
    <>
      <Card>
        <Dialog>
          <Form {...trainingForm}>
            <form onSubmit={trainingForm.handleSubmit(onSubmitTraining)}>
              <CardHeader>
                <CardTitle>Add training</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
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
                                placeholder="Type here..."
                                {...field}
                                autoFocus
                              />
                            </FormControl>
                            <FormDescription>
                              This will be used as the title of the training.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex space-x-4">
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
                          <FormItem className="grid">
                            <FormLabel>No. of hours</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Type here..."
                                type="number"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Lorem ipsum dolor sit.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={trainingForm.control}
                        name="venue"
                        render={({ field }) => (
                          <FormItem className="grid">
                            <FormLabel>
                              Venue <span className="text-red-500"> *</span>
                              <span className="opacity-80 italic text-sm">
                                (New People’s Hall, 3rd Floor, New City Hall)
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Type here..." {...field} />
                            </FormControl>
                            <FormDescription>
                              Lorem ipsum dolor sit amet.
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
                              <Input placeholder="Type here..." {...field} />
                            </FormControl>
                            <FormDescription>
                              Lorem ipsum dolor sit amet.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={trainingForm.control}
                        name="issuedOn"
                        render={({ field }) => (
                          <FormItem className="grid">
                            <FormLabel>
                              Issued On <span className="text-red-500"> *</span>
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
                              Lorem ipsum dolor sit amet consectetur adipisicing
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
                              Issued At <span className="text-red-500"> *</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Type here..."
                                type="text"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Lorem ipsum dolor sit.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={trainingForm.control}
                        name="papId"
                        render={({ field }) => (
                          <FormItem className="grid">
                            <FormLabel>
                              Project, Activities and Projects (PAPs){' '}
                              <span className="text-red-500"> *</span>
                            </FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a PAP" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {/* TODO: Fetch PAPs here  */}
                                  {paps.length > 0 ? (
                                    <ScrollArea className="max-h-72 min-h-fit">
                                      {paps.map(({ papId, pap }) => (
                                        <SelectItem key={papId} value={papId}>
                                          {pap}
                                        </SelectItem>
                                      ))}
                                    </ScrollArea>
                                  ) : (
                                    <div className="text-center py-2">
                                      <span className="text-xs">
                                        No PAPs found
                                      </span>
                                    </div>
                                  )}
                                  <SelectSeparator />
                                  <DialogTrigger asChild>
                                    <Button variant="ghost" className="w-full">
                                      <PlusCircledIcon className="mr-2 h-4 w-4" />
                                      Add PAP
                                    </Button>
                                  </DialogTrigger>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormDescription>
                              Lorem ipsum dolor sit amet.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* <FormField
                        control={trainingForm.control}
                        name="trainingCode"
                        render={({ field }) => (
                          <FormItem className="grid">
                            <FormLabel>Traning Code</FormLabel>
                            <FormControl>
                              <Input
                                readOnly
                                {...field}
                                placeholder="MCD202307XXXX"
                                className="cursor-pointer"
                              />
                            </FormControl>
                            <FormDescription>
                              Lorem ipsum dolor sit amet.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      /> */}

                      <FormField
                        control={trainingForm.control}
                        name="validUntil"
                        render={({ field }) => (
                          <FormItem className="grid">
                            <FormLabel>
                              Date Time Validity{' '}
                              <span className="text-red-500"> *</span>
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
                              Lorem ipsum dolor sit amet consectetur adipisicing
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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

          {/* Adding PAP Dialog */}
          <DialogContent className="sm:max-w-[425px]">
            <Form {...papForm}>
              <form onSubmit={papForm.handleSubmit(onSubmitPap)}>
                <DialogHeader>
                  <DialogTitle>Add new PAP</DialogTitle>
                  <DialogDescription>
                    This will create a new PAP and add it to the list.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid items-center space-y-2">
                    <FormField
                      control={papForm.control}
                      name="pap"
                      render={({ field }) => (
                        <FormItem className="grid">
                          <FormLabel>
                            Project, Activity and Project (PAP)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Type here..."
                              {...field}
                              autoFocus
                            />
                          </FormControl>
                          <FormDescription>
                            This will be used as the title of the training.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={papMutation.isLoading}>
                    {papMutation.isLoading ? (
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
