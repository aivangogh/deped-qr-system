import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useTrainingStore from '@/store/useTrainingStore';
import { Training } from '@prisma/client';
import { CalendarDateRangePicker } from '../event-info/date-range-picker';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import UpdateTraining from './UpdateTraining';

export default function TrainingSidebar() {
  const { training } = useTrainingStore();

  return (
    <>
      <Sheet>
        <div className="flex flex-col space-y-4 p-4 border-l w-full">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">Training Details</span>
            <Button variant="link" className="text-sm">
              <SheetTrigger>Edit</SheetTrigger>
            </Button>
          </div>
          <div className="space-y-4">
            <div className="w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="trainingCode">Training Code:</Label>
              <Input
                type="text"
                id="trainingCode"
                value={training.trainingCode!}
                readOnly
                className="cursor-default"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="titleOfTraining">Title of Training:</Label>
              <Input
                type="text"
                id="titleOfTraining"
                value={training.title}
                readOnly
                className="cursor-default"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Date of Training:</Label>
              <CalendarDateRangePicker
                dateData={{
                  from: training.dateFrom,
                  to: training.dateTo,
                }}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="office">Implementing Office</Label>
              <Input
                type="text"
                id="office"
                value={training.officeId}
                readOnly
                className="cursor-default"
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="office">Program Holder</Label>
              <Input
                type="text"
                id="programHolder"
                value={training.programHolder}
                readOnly
                className="cursor-default"
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="numberOfHours">Number of hours:</Label>
              <Input
                type="number"
                id="numberOfHours"
                placeholder="24"
                value={training.numberOfHours ? training.numberOfHours : 0}
                readOnly
                className="cursor-default"
              />
            </div>

            <div className="w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="trainingCode">Venue:</Label>
              <Input
                type="text"
                id="venue"
                value={training.venue!}
                readOnly
                className="cursor-default"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="titleOfTraining">Address of the venue:</Label>
              <Input
                type="text"
                id="addressOfTheVenue"
                value={training.addressOfTheVenue}
                readOnly
                className="cursor-default"
              />
            </div>
            {/* <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="titleOfTraining">Project:</Label>
            <Input
              type="text"
              id="addressOfTheVenue"
              value={training.addressOfTheVenue}
              readOnly
              className="cursor-default"
            />
          </div> */}
          </div>
        </div>
        <UpdateTraining />
      </Sheet>
    </>
  );
}
