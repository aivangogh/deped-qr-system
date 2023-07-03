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
  excelUrl: z.string().url(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function DocumentTemplate() {
  const { toast } = useToast();
  const { excelUrl, setExcelTemplate } = useSettingsStore();

  const defaultValues = {
    excelUrl,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  // const { fields, append } = useFieldArray({
  //   name: 'excelUrl',
  //   control: form.control,
  // });

  function onSubmit(data: ProfileFormValues) {
    setExcelTemplate(data.excelUrl);
    toast({
      description: 'Excel template updated.',
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <FormField
            control={form.control}
            name="excelUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormDescription></FormDescription>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  The URL of the Excel template.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Update template</Button>
      </form>
    </Form>
  );
}
