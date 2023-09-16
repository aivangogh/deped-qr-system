'use client';

import { Row } from '@tanstack/react-table';
import { ParticipantDetailsT } from '@/types/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button, buttonVariants } from '@/components/ui/button';
import { DotsHorizontalIcon, ReloadIcon } from '@radix-ui/react-icons';
import { Training } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ExternalLink, Trash2 } from 'lucide-react';
import DeleteTraining from './DeleteTraining';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { deleteTraining } from '@/services/fetch/trainings';
import { useToast } from '@/components/ui/use-toast';
import useTrainingStore from '@/store/useTrainingStore';
import useTrainingsStore from '@/store/useTrainingsStore';
import { useState } from 'react';
import { useQueryClient } from 'react-query';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { trainingCode } = row.original as Training;
  const router = useRouter();
  const { toast } = useToast();
  const { removeTraining } = useTrainingsStore();
  const [isTrainingDeleting, setIsTrainingDeleting] = useState(false);
  const query = useQueryClient();

  const deleteTrainingHandler = async () => {
    setIsTrainingDeleting(true);

    await deleteTraining(trainingCode)
      .then((res) => {
        if (res.status === 200) {
          setIsTrainingDeleting(false);

          toast({
            title: 'Training deleted successfully',
          });

          removeTraining(trainingCode);
        }
      })
      .catch((err) => {
        toast({
          title: 'Error deleting training',
          description: err.message,
        });
      });
  };

  return (
    <>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <DotsHorizontalIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <Link href={`/dashboard/training/${trainingCode}`} target="_blank">
              <DropdownMenuItem>
                <ExternalLink className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
            </Link>

            {/* <AlertDialogTrigger asChild>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </AlertDialogTrigger> */}
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              training and remove all data from our servers. This will also
              delete all participants and speakers and their data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <Button
              type="submit"
              variant="destructive"
              onClick={deleteTrainingHandler}
              disabled={isTrainingDeleting}
            >
              {isTrainingDeleting ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* <DocumentGenerator participant={participant} /> */}
    </>
  );
}
