import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useTrainingStore from '@/store/useTrainingStore';
import { Training } from '@prisma/client';
import { CalendarDateRangePicker } from '../event-info/date-range-picker';

export default function TrainingSidebar() {
  const { training } = useTrainingStore();

  return (
    <>
      <div className="flex flex-col space-y-4 p-4 border-l w-full">
        <h1 className="text-2xl font-bold">Training Details</h1>
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
    </>
  );
}
