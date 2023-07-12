'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import useSettingsStore from '@/store/useSettingsStore';

const profileFormSchema = z.object({
  driveFolderUrl: z.string().url(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function DriveFolder() {
  const { toast } = useToast();
  const { driveFolderUrl, setDriveFolderUrl } = useSettingsStore();

  const defaultValues = {
    driveFolderUrl,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: ProfileFormValues) {
    setDriveFolderUrl(data.driveFolderUrl);

    toast({
      description: 'Drive Folder URL updated.',
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <FormField
            control={form.control}
            name="driveFolderUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Drive folder for templates</FormLabel>
                <FormDescription></FormDescription>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <div className="text-xs text-muted-foreground">
                  The URL of the Drive folder for templates.
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Update Drive folder</Button>
      </form>
    </Form>
  );
}
