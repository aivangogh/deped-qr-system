import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet } from 'lucide-react';

export function DialogFileUpload() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="ml-auto hidden h-8 lg:flex">
          <Sheet className="mr-2 h-4 w-4" />
          Import
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import Excel File</DialogTitle>
          <DialogDescription>
            Import an Excel file to add new data to the table.
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="excel">Excel</Label>
          <Input
            id="excel"
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
        </div>
        <DialogFooter>
          <Button type="submit">Import File</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
