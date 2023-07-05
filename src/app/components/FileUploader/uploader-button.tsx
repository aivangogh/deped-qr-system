import { UploadButton } from '@uploadthing/react';

import { OurFileRouter } from '@/app/api/uploadthing/core';
import { useToast } from '@/components/ui/use-toast';
import useSettingsStore from '@/store/useSettingsStore';
import { getSingleFileUrl } from '@/utils/getSingleFileUrl';

export const FileUploadButton = () => {
  const { toast } = useToast();
  const { setDocumentsForParticipantsDirectUrl } = useSettingsStore();

  return (

      <UploadButton<OurFileRouter>
        endpoint="blobUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log('Files: ', res);

          const url = getSingleFileUrl(res);
          console.log(url)
          setDocumentsForParticipantsDirectUrl(url!);
          toast({
            description: 'File uploaded successfully.',
          });
        }}
        onUploadError={(error: Error) => {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem with your request.',
            // action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }}
      />
  );
};
