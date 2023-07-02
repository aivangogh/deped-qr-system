'use client';

import { Download, ListRestart, MoreHorizontal } from 'lucide-react';

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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import useTrainingInfoStore from '@/store/useTrainingInfoStore';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Link as LinkIcon } from 'lucide-react';

export function PresetActions() {
  const [open, setIsOpen] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const { resetInfo } = useTrainingInfoStore();
  const [showDownloadDialog, setShowDownloadDialog] = useState<boolean>(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm">
            <span className="sr-only">Actions</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setShowDownloadDialog(true)}>
            <Download className="mr-2 h-4 w-4" />
            Download Template
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            <ListRestart className="mr-2 h-4 w-4" />
            Reset Data
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
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                resetInfo();
                setShowDeleteDialog(false);
                toast({
                  description: 'This imported data has been deleted.',
                });
              }}
            >
              Reset
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
              <Link
                href="https://docs.google.com/spreadsheets/d/1vZsa6pFv6oCnsTnOoZp_Pnft1l8pyR51/edit?usp=drive_link&ouid=111981708478442355980&rtpof=true&sd=true"
                target="_blank"
              >
                Open Link
              </Link>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
