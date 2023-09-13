import { SignIn } from './components/sign-in';
import Image from 'next/image';
import Link from 'next/link';
import DepedLogo from '../../../../public/images/deped-logo.png';

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full min-w-xs max-w-sm h-full flex flex-col items-center justify-center">
        <div className="mb-8">
          <Image src={DepedLogo} width={60} height={60} alt="DepEd Logo" />
        </div>
        <div className='w-64'>
          <SignIn />
        </div>
      </div>
      <footer className="container py-4 px-12">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Image src={DepedLogo} width={32} height={32} alt="DepEd Logo" />

            <Link href="/" passHref className="flex items-center">
              <h2 className="text-sm font-semibold">Training QR System</h2>
            </Link>
          </div>
          <span className="text-xs">
            Built by <span className="font-bold">SGOD Interns</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
