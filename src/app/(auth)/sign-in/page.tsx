import { SignIn } from './components/sign-in';

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full min-w-xs max-w-sm">
        <SignIn />
      </div>
    </div>
  );
}
