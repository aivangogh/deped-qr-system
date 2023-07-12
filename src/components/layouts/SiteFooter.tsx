import Image from 'next/image';
import DepedLogo from '../../../public/images/deped-logo.png';
import Link from 'next/link';

export default function SiteFooter() {
  return (
    <>
      <footer className="container py-4 px-12 border-t">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Image src={DepedLogo} width={32} height={32} alt="DepEd Logo" />

            <Link href="/" passHref className="flex items-center">
              <h2 className="text-sm ">Training QR System</h2>
            </Link>
          </div>
          <span className="text-xs">
            Built by <span className="font-bold">SGOD Interns</span>
          </span>
        </div>
      </footer>
    </>
  );
}
