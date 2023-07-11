import { Separator } from '@/components/ui/separator';
import { ExcelTemplate } from './ExcelTemplate';

export default function SettingsExcelTemplatePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Excel Template</h3>
        {/* <p className="text-sm text-muted-foreground">
        Lorem, ipsum dolor sit amet consectetur adipisicing.
        </p> */}
      </div>
      <Separator />

      <ExcelTemplate />
    </div>
  );
}
