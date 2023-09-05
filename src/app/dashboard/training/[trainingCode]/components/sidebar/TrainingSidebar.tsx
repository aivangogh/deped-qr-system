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
              <Label htmlFor="numberOfHours">Date of Training:</Label>
              <CalendarDateRangePicker
                dateData={{
                  from: training.dateFrom,
                  to: training.dateTo,
                }}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="numberOfHours">
                Project, Activities and Projects (PAPs)
              </Label>
              <Input
                type="text"
                id="pap"
                value={training.pap}
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
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Training Details</SheetTitle>
            <SheetDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 ">EDIT</div>
        </SheetContent>
      </Sheet>
    </>
  );
}
