import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

interface ExcelToJsonProps {
  onFileUpload: (file: File) => void;
}

const ExcelToJson: React.FC<ExcelToJsonProps> = ({ onFileUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center space-y-2">
      <Label htmlFor="excel">
        Excel{' '}
        <span className="text-sm text-muted-foreground">
          (.xlsx, .xls, .cvs)
        </span>
      </Label>
      <Input
        id="excel"
        type="file"
        onChange={handleFileChange}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
    </div>
  );
};

export default ExcelToJson;
