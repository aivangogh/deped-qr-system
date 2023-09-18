'use client';

import { DialogFileUpload } from '@/app/dashboard/(components)/FileUploader/dialog-file-upload';
import { dashboardRoutes } from '@/app/routes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useParticipantStore from '@/store/useParticipantStore';
import useSpeakerStore from '@/store/useSpeakerStore';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { PresetActions } from '@/app/dashboard/(components)/PresetActions';
import { columnsForParticipants } from './participants/columnsForParticipants';
import { DataTableForParticipants } from './participants/data-table-for-participants';
import TrainingSidebar from './sidebar/TrainingSidebar';
import { columnsForSpeakers } from './speakers/columnsForSpeakers';
import { DataTableForSpeakers } from './speakers/data-table-for-speakers';
import useTrainingStore from '@/store/useTrainingStore';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Training() {
  const { training } = useTrainingStore();
  const { speakers } = useSpeakerStore();
  const { participants } = useParticipantStore();
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [training, speakers, participants]);

  return (
    <>
      <div className="grid grid-cols-4">
        <div className="container col-span-3 h-full flex-1 flex-col space-y-4 my-4">
          <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
            <Link
              href={dashboardRoutes.dashboard.path}
              className="overflow-hidden text-ellipsis whitespace-nowrap hover:text-foreground hover:underline"
            >
              {dashboardRoutes.dashboard.label}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <div className="font-medium text-foreground">
              {training?.trainingCode!}
            </div>
          </div>

          <Tabs defaultValue="participants">
            <div className="flex justify-between mb-4">
              <TabsList className="grid w-96 grid-cols-2">
                <TabsTrigger value="participants">Participants</TabsTrigger>
                <TabsTrigger value="speakers">Speakers</TabsTrigger>
              </TabsList>
              <div className="space-x-2">
                <DialogFileUpload />
                <PresetActions />
              </div>
            </div>
            <TabsContent value="speakers">
              <DataTableForSpeakers
                data={speakers!}
                columns={columnsForSpeakers}
              />
            </TabsContent>
            <TabsContent value="participants">
              <DataTableForParticipants
                data={participants!}
                columns={columnsForParticipants}
              />
            </TabsContent>
          </Tabs>
        </div>

        <TrainingSidebar />
      </div>
    </>
  );
}
