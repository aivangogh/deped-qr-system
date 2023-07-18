import Image from 'next/image';
import DepedLogo from '../../../public/images/deped-logo.png';
import { DialogFileUpload } from './FileUploader/dialog-file-upload';
import { PresetActions } from './PresetActions';
import Link from 'next/link';
import { navRoutes } from '../routes';

export default function Navbar() {
  return (
    <>
      <div className="w-full flex justify-between">
        <div className="flex space-x-2">
          <Image src={DepedLogo} width={44} height={44} alt="DepEd Logo" />

          <Link
            href={navRoutes.home.path}
            passHref
            className="flex items-center"
          >
            <h2 className="text-lg font-bold  tracking-normal">
              Training QR System
            </h2>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <DialogFileUpload />
          <PresetActions />
        </div>
      </div>
    </>
  );
}
