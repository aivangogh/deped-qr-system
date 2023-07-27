'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Save } from 'lucide-react';
import { useMutation, useQuery } from 'react-query';
import { useSession } from 'next-auth/react';
import { updateProfile } from '@/services/fetch/users';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { participantRoutes } from '@/app/routes';

const accountFormSchema = z.object({
  position: z.string(),
  school: z.string(),
  contactNumber: z.string(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
  });

  const profileMutation = useMutation({
    mutationKey: ['update-profile'],
    mutationFn: (formData: AccountFormValues) => {
      // console.log(formData);
      return updateProfile(session?.user?.id!, formData);
    },
    onSuccess({ data }) {
      toast({
        title: 'Profile updated',
        description: 'Profile was successfully updated.',
      });

      router.push(participantRoutes.participant.path);
    },
    onError() {
      // papMutation.reset();
      toast({
        title: 'Something went wrong',
        description: 'Unable to update profile. Please try again.',
      });
    },
  });

  function onSubmit(data: AccountFormValues) {
    profileMutation.mutate(data);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 w-96">
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">
                        Position <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex. Teacher I"
                          {...field}
                          disabled={profileMutation.isLoading}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="school"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        School <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Type here..."
                          {...field}
                          disabled={profileMutation.isLoading}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Contact Number <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="09123456789"
                          {...field}
                          disabled={profileMutation.isLoading}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                type="submit"
                size="sm"
                disabled={profileMutation.isLoading}
              >
                {profileMutation.isLoading ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Info
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
}
