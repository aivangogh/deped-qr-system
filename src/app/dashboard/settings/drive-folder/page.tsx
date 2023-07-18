import { Separator } from '@/components/ui/separator';
import { DriveFolder } from './DriveFolder';

export default function SettingsDriveFolderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Drive Folder</h3>
        {/* <p className="text-sm text-muted-foreground">
        Lorem, ipsum dolor sit amet consectetur adipisicing.
        </p> */}
      </div>
      <Separator />

      <DriveFolder />
    </div>
  );
}
