import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

export default function SendViaEmailSpeakers() {
  return (
    <>
      <Button size="sm" className="ml-auto h-8">
        <Send className="mr-2 h-4 w-4" />
        Send via email
      </Button>
    </>
  );
}
