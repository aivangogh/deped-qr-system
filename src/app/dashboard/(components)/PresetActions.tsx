'use client';

import { Download, ListRestart, Settings, MoreVertical } from 'lucide-react';

import { dashboardRoutes } from '@/app/routes';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import useSettingsStore from '@/store/useSettingsStore';
import Link from 'next/link';
import { useState } from 'react';
import useTrainingStore from '@/store/useTrainingStore';
import useParticipantStore from '@/store/useParticipantStore';
import useSpeakerStore from '@/store/useSpeakerStore';
import { deleteSpeakers } from '@/services/fetch/speakers';
import { deleteParticipants } from '@/services/fetch/participants';
import { ReloadIcon } from '@radix-ui/react-icons';

async function deleteSpeakersPromise(trainingCode: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    deleteSpeakers(trainingCode)
      .then((res) => {
        if (res.status === 200) resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });
}

async function deleteParticipantsPromise(
  trainingCode: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    deleteParticipants(trainingCode)
      .then((res) => {
        if (res.status === 200) resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });
}

export function PresetActions() {
  const [open, setIsOpen] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const { training } = useTrainingStore();
  const { resetSpeakers } = useSpeakerStore();
  const { resetParticipants } = useParticipantStore();
  const [showDownloadDialog, setShowDownloadDialog] = useState<boolean>(false);
  const [isResting, setIsResting] = useState<boolean>(false);
  const { excelDirectUrl } = useSettingsStore();

  const resetDataHandler = async () => {
    setIsResting(true);
    const res = await Promise.all([
      deleteSpeakersPromise(training.trainingCode),
      deleteParticipantsPromise(training.trainingCode),
    ]);

    if (res[0] && res[1] === true) {
      resetSpeakers();
      resetParticipants();

      setShowDeleteDialog(false);
      setIsResting(false);

      toast({
        description: 'This imported data has been deleted.',
      });
    } else {
      toast({
        description: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="ml-auto h-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setShowDownloadDialog(true)}>
            <Download className="mr-2 h-4 w-4" />
            Download Template
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            <Link
              href={dashboardRoutes.settings.path}
              passHref
              className="flex mr-2 w-full items-center"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600"
            onSelect={() => setShowDeleteDialog(true)}
          >
            <ListRestart className="mr-2 h-4 w-4" />
            Delete Data
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This imported data will no longer be
              accessible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isResting}>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={resetDataHandler}
              disabled={isResting}
            >
              {isResting ? (
                <>
                  <ReloadIcon className="animate-spin mr-2 h-4 w-4" />
                  Deleting...
                </>
              ) : (
                'Delete Data'
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        open={showDownloadDialog}
        onOpenChange={setShowDownloadDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              You will be redirected to the link.
            </AlertDialogTitle>
            <AlertDialogDescription>
              {/* Description edirection to the link to download the excel template */}
              Clicking on the button below will redirect you to the link to
              download the excel template.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={() => {
                setShowDownloadDialog(false);
              }}
            >
              <Link href={excelDirectUrl} target="_blank">
                Open Link
              </Link>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
