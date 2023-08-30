export { default } from 'next-auth/middleware';

export const config = {
  // Add any additional protected routes to this list
  matcher: [
    '/api/:path*',
    '/training/:path*',
    '/dashboard/:path*',
    '/participant/:path*',
  ],
};
