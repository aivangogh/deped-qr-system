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
  excel: z.object({
    url: z.string().url(),
    directUrl: z.string().url(),
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ExcelTemplate() {
  const { toast } = useToast();
  const { excelUrl, excelDirectUrl, setExcelUrl, setExcelDirectUrl } =
    useSettingsStore();

  const defaultValues = {
    excel: {
      url: excelUrl,
      directUrl: excelDirectUrl,
    },
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });


  function onSubmit(data: ProfileFormValues) {
    setExcelUrl(data.excel.url);

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
            name="excel.url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Drive file link for Excel Template</FormLabel>
                <FormDescription></FormDescription>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <div className="text-xs text-muted-foreground">
                  The URL of the Excel template.
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Update Excel template</Button>
      </form>
    </Form>
  );
}
