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
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import useSettingsStore from '@/store/useSettingsStore';


const profileFormSchema = z.object({
  participants: z.object({
    url: z.string().url(),
    directUrl: z.string().url(),
  }),
  speakers: z.object({
    url: z.string().url(),
    directUrl: z.string().url(),
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function DocumentTemplate() {
  const { toast } = useToast();
  const {
    documentForParticipantsUrl,
    documentForParticipantsDirectUrl,
    documentForSpeakersUrl,
    documentForSpeakersDirectUrl,
    setDocumentsForParticipantsUrl,
    setDocumentsForSpeakersUrl,
  } = useSettingsStore();

  const defaultValues = {
    participants: {
      url: documentForParticipantsUrl,
      directUrl: documentForParticipantsDirectUrl,
    },
    speakers: {
      url: documentForSpeakersUrl,
      directUrl: documentForSpeakersDirectUrl,
    },
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function onSubmitForParticipants(data: ProfileFormValues) {
    setDocumentsForParticipantsUrl(data.participants.url);

    toast({
      description: 'Participant template updated.',
    });
  }

  async function onSubmitForSpeakers(data: ProfileFormValues) {
    setDocumentsForSpeakersUrl(data.speakers.url);

    toast({
      description: 'Speaker template updated.',
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitForParticipants)}
          className="space-y-8"
        >
          <div>
            <FormField
              control={form.control}
              name="participants.url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Drive file link for Certificates for participants
                  </FormLabel>
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

          <Button type="submit">Update participant template</Button>
        </form>
      </Form>
      <Separator />
      <Form {...form}>
        <div className="space-y-0">
          <h3 className="text-lg font-medium">Certificates for Speaker/s</h3>
          <p className="text-sm text-muted-foreground">
            The URL of the Document template that will be used to generate
            certificates for speaker/s.
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmitForSpeakers)}
          className="space-y-8"
        >
          <div>
            <FormField
              control={form.control}
              name="speakers.url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Drive file link for Certificates for speaker/s
                  </FormLabel>
                  <FormDescription></FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <div className="text-xs text-muted-foreground">
                    The URL of the certificates for speaker/s template.
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Update speaker template</Button>
        </form>
      </Form>
    </>
  );
}
