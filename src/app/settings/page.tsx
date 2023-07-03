import { Separator } from '@/components/ui/separator';
import { DocumentTemplate } from './(components)/DocumentTemplate';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Document Template</h3>
        <p className="text-sm text-muted-foreground">
          Lorem, ipsum dolor sit amet consectetur adipisicing.
        </p>
      </div>
      <Separator />

      <DocumentTemplate />
    </div>
  );
}
