import Image from 'next/image';
import { DialogFileUpload } from './FileUploader/dialog-file-upload';
import DepedLogo from '../../../public/images/deped-logo.png';

export default function Header() {
  return (
    <>
      <div className="w-full flex justify-between">
        <div className="flex space-x-2">
          <Image src={DepedLogo} width={50} height={50} alt="DepEd Logo" />
          <div className="flex items-center">
            <h2 className="text-3xl font-bold tracking-tight">QR System</h2>
          </div>
        </div>
        <div className='flex items-center'>
          <DialogFileUpload />
        </div>
      </div>
    </>
  );
}
