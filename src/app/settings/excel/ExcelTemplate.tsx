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
import { createGoogleDriveDirectDownloadLink } from '@/utils/createDirectLink';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const profileFormSchema = z.object({
  excel: z.object({
    url: z.string().url(),
    directUrl: z.string().url(),
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ExcelTemplate() {
  const [copyUrl, setCopyUrl] = useState<string>('');
  const { toast } = useToast();
  const { excelUrl, excelDirectUrl, setExcelUrl, setExcelDirectUrl } =
    useSettingsStore();

  const linkHandler = (e: any) => {
    setCopyUrl(e.target.value);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(excelDirectUrl);
    toast({
      description: 'Copied to clipboard.',
    });
  };

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

  // const { fields, append } = useFieldArray({
  //   name: 'excelUrl',
  //   control: form.control,
  // });

  function onSubmit(data: ProfileFormValues) {
    setExcelUrl(data.excel.url);
    setExcelDirectUrl(createGoogleDriveDirectDownloadLink(data.excel.url));

    console.log(data.excel.url);
    console.log(createGoogleDriveDirectDownloadLink(data.excel.url));

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
        <div className="space-y-2">
          <Label>Direct URL</Label>
          <div className="flex space-x-2">
            <Input value={excelDirectUrl} readOnly onChange={linkHandler} />
            <Button
              variant="secondary"
              className="shrink-0"
              onClick={copy}
              disabled={!excelDirectUrl}
            >
              Copy Link
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            The direct URL of the Excel template. This is the URL that will be
            used to download the Excel template.
          </div>
        </div>
        <Button type="submit">Update template</Button>
      </form>
    </Form>
  );
}
