'use client';

import { navRoutes } from '@/app/routes';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn, useSession } from 'next-auth/react';

export function SignIn() {
  const { data: session } = useSession();

  console.log(session);

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>to Training QR System</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 gap-6">
          <Button
            variant="outline"
            onClick={() => signIn('google', { callbackUrl: '/' })}
          >
            <Icons.google className="h-4 w-4" />
            Google
          </Button>
        </div>
        {/* <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or</span>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div> */}
      </CardContent>
      {/* <CardFooter>
        <Button className="w-full">Continue</Button>
      </CardFooter> */}
    </Card>
  );
}
