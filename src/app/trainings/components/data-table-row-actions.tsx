'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Row } from '@tanstack/react-table';
import { Download, Eye, FileText, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ParticipantDetailsT } from '@/types/types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from 'react';
import QRCode from 'react-qr-code';
import DocumentGenerator from '@/components/DocumentGenerator';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const participant = row.original as ParticipantDetailsT;

  const qrCodeRef = useRef<HTMLDivElement>(null);

  const downloadQRCodeAsPDF = () => {
    if (qrCodeRef.current) {
      html2canvas(qrCodeRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 50, 0, 'FAST');
        pdf.save(`${participant.participant}.pdf`);
      });
    }
  };

  const previewQRCodeAsPDF = () => {
    if (qrCodeRef.current) {
      html2canvas(qrCodeRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 50, 0, 'FAST');
        setTimeout(() => {
          const previewUrl = pdf.output('datauristring');
          window.open(previewUrl, '_blank');
        }, 500);
      });
    }
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem>
            <DialogTrigger className="flex items-center">
              <FileText className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Generate PDF
            </DialogTrigger>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Preview PDF
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generated QR code</DialogTitle>
          <DialogDescription>
            This QR code can be used to check-in the participant.
          </DialogDescription>
        </DialogHeader>

        <div ref={qrCodeRef} className="h-auto w-100 max-w-64 m-0 mx-auto">
          <QRCode
            size={256}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={participant.participant}
            viewBox={`0 0 256 256`}
          />
        </div>
        <DialogFooter>
          <Button variant="secondary" size="sm" onClick={previewQRCodeAsPDF}>
            <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Preview
          </Button>
          {/* <Button size="sm" onClick={downloadQRCodeAsPDF}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button> */}
          <DocumentGenerator data={participant} />
          {/* <DocumentGenerator  /> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
