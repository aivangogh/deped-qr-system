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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { navRoutes } from '@/app/routes';
import { useRouter } from 'next/navigation';
import { Mutation, useMutation, useQuery } from 'react-query';
import { createPap, getPaps } from '@/services/fetch/paps';
import { PapsT } from '@/types/paps';
import usePapsStore from '@/store/usePapsStore';
import { useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

const TrainingFormSchema = z.object({
  title: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  date: z.date({
    required_error: 'Please select a date and time',
    invalid_type_error: "That's not a date!",
  }),
  numberOfHours: z.number().int().positive(),
  venue: z.string().min(2, {
    message: 'Venue must be at least 2 characters.',
  }),
  issuedOn: z.date({
    required_error: 'Please select a date and time',
    invalid_type_error: "That's not a date!",
  }),
  issuedAt: z.date({
    required_error: 'Please select a date and time',
    invalid_type_error: "That's not a date!",
  }),
  paps: z.string({
    required_error: 'Please select at least one PAP',
  }),
  trainingCode: z.string().min(13, {
    message: 'Training code must be at least 13 characters.',
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
  const { paps, setPaps } = usePapsStore();

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
    },
  });

  const papMutation = useMutation({
    mutationKey: ['paps'],
    mutationFn: (formData: PapsT) => {
      // console.log(formData);
      return createPap(formData);
    },
    onSuccess({ data }) {
      console.log(data);
      setPaps(data);

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
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
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
                            <FormLabel>Title</FormLabel>
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

                      <FormField
                        control={trainingForm.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="grid">
                            <FormLabel>Date</FormLabel>
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
                        name="numberOfHours"
                        render={({ field }) => (
                          <FormItem className="grid">
                            <FormLabel>No. of hours</FormLabel>
                            <FormControl>
                              <Input placeholder="Type here..." {...field} />
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
                            <FormLabel>Venue</FormLabel>
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
                            <FormLabel>Issued On</FormLabel>
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
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date('1900-01-01')
                                  }
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
                            <FormLabel>Issued At</FormLabel>
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
                        name="paps"
                        render={({ field }) => (
                          <FormItem className="grid">
                            <FormLabel>
                              Project, Activities and Projects (PAPs)
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
                                    <ScrollArea className="h-72">
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
                                      <PlusCircledIcon className="mr-2 h-5 w-5" />
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

                      <FormField
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
                      />

                      <FormField
                        control={trainingForm.control}
                        name="validUntil"
                        render={({ field }) => (
                          <FormItem className="grid">
                            <FormLabel>Date Time Validity</FormLabel>
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
                <Button type="submit">Submit</Button>
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
