import withAuth from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === 'admin',
    },
  }
);

export async function middleware(request: any) {
  const origin = request.headers.get('origin');

  const response = NextResponse.next();
  response.headers.set(
    'Access-Control-Allow-Origin',
    /^https?:\/\/(www\.)?.(deped\-qr\-system\.vercel\.app)$/i.test(origin)
      ? origin
      : null
  );
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );
  response.headers.set('Access-Control-Max-Age', '86400');

  return response;
}

export const config = {
  // Add any additional protected routes to this list
  matcher: ['/api/:path*', '/training/:path*', '/dashboard/:path*'],
};
