'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useTrainingsStore from '@/store/useTrainingsStore';
import { TrainingT } from '@/types/training';
import { ArrowRight } from 'lucide-react';
import { useQuery, useMutation } from 'react-query';
import { columnsForTrainings } from './(components)/columns-for-trainings';
import { DataTableForTrainings } from './(components)/data-table-for-trainings';
import { useSession } from 'next-auth/react';
import { getTrainingsForParticipant } from '@/services/fetch/trainings/participant';
import { z } from 'zod';
import { enroll } from '@/services/fetch/enroll';
import { toast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const enrollmentFormSchema = z.object({
  trainingCode: z.string(),
});

type EnrollmentFormValues = z.infer<typeof enrollmentFormSchema>;

export default function TrainingsForParticipant() {
  const { data: session } = useSession();
  const { trainings, setTrainings } = useTrainingsStore();

  useQuery({
    queryKey: ['trainingsForParticipant', session?.user.id],
    queryFn: () => getTrainingsForParticipant(session?.user.id!),
    onSuccess: ({ data }: { data: TrainingT[] }) => {
      console.log(data);
      setTrainings(data);
    },
  });

  const form = useForm<EnrollmentFormValues>({
    resolver: zodResolver(enrollmentFormSchema),
  });

  const enrollmentMutation = useMutation({
    mutationKey: ['enroll-to-training', session?.user.id],
    mutationFn: ({ trainingCode }: EnrollmentFormValues) => {
      // console.log(formData);
      return enroll(session?.user?.id!, trainingCode);
    },
    onSuccess({ data }) {
      toast({
        title: 'Profile updated',
        description: 'Profile was successfully updated.',
      });
    },
    onError() {
      // papMutation.reset();
      toast({
        title: 'Something went wrong',
        description: 'Unable to update profile. Please try again.',
      });
    },
  });

  function onSubmit(data: EnrollmentFormValues) {
    enrollmentMutation.mutate(data);
  }

  return (
    <>
      <div className="space-y-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of trainings.
            </p>
          </div>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Enroll
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Enroll</DialogTitle>
                      <DialogDescription>
                        Enroll to a training by entering the training code.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col space-y-2 mt-6">
                      <FormField
                        control={form.control}
                        name="trainingCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Training Code</FormLabel>
                            <FormControl>
                              <Input placeholder="MCDXXXXXXXXX" {...field} />
                            </FormControl>
                            <FormDescription>
                              Enter the training code provided by the trainer.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit">Submit</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </form>
            </Form>
          </div>
        </div>
        <DataTableForTrainings data={trainings} columns={columnsForTrainings} />
      </div>
    </>
  );
}
