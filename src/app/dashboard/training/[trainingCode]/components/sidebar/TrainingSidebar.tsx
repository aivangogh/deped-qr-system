import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useTrainingStore from '@/store/useTrainingStore';
import { Training } from '@prisma/client';
import { CalendarDateRangePicker } from '../event-info/date-range-picker';
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
import UpdateTraining from './UpdateTraining';

import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from '@/components/ui/select';
import usePapsStore from '@/store/usePapsStore';
import { useQuery } from 'react-query';
import { getPaps } from '@/services/fetch/paps';
import { Pap } from '@prisma/client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import useOfficesStore from '@/store/useOfficesStore';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Save } from 'lucide-react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { usePathname } from 'next/navigation';
import { dashboardRoutes } from '@/app/routes';
import Link from 'next/link';

const trainingFormSchema = z.object({
  titleOfTraining: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  dateFrom: z.date({
    required_error: 'Please select a date and time',
    invalid_type_error: "That's not a date!",
  }),
  dateTo: z.date({
    required_error: 'Please select a date and time',
    invalid_type_error: "That's not a date!",
  }),
  officeId: z.string(),
  numberOfHours: z.number(),
  venue: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  addressOfTheVenue: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
});

type TrainingFormValues = z.infer<typeof trainingFormSchema>;

const defaultValues: Partial<TrainingFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
};

export default function TrainingSidebar() {
  const { training } = useTrainingStore();
  const { toast } = useToast();
  const { paps, setPaps } = usePapsStore();
  const { offices, setOffices } = useOfficesStore();

  useQuery({
    queryKey: 'paps',
    queryFn: () => getPaps(),
    onSuccess: (res) => {
      setPaps(res.data);
    },
  });

  const form = useForm<TrainingFormValues>({
    resolver: zodResolver(trainingFormSchema),
  });

  function onSubmit(data: TrainingFormValues) {
    toast({
      title: 'Training details saved successfully!',
      description: 'Working in progress...',
    });

    console.log(data);
  }

  return (
    <>
      <div className="flex flex-col space-y-4 p-4 border-l w-full">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">Training Details</span>
          <Link
            href={dashboardRoutes.editTraining.trainingCode(
              training.trainingCode!
            )}
          >
            <Button variant="link">Edit</Button>
          </Link>
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
    </>
  );
}
