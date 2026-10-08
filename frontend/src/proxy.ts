import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';
import { routing } from './navigation';

const intlMiddleware = createMiddleware(routing);
const isProduction = process.env.NODE_ENV === 'production';

function getApiOrigin() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) return null;

  try {
    return new URL(apiUrl).origin;
  } catch {
    return null;
  }
}

function buildContentSecurityPolicy(nonce: string) {
  const apiOrigin = getApiOrigin();
  const connectSources = [
    "'self'",
    apiOrigin,
    'https://*.tile.openstreetmap.org',
  ].filter(Boolean);

  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${!isProduction ? "'unsafe-eval'" : ""}`.trim(),
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    [
      "img-src 'self' data: blob:",
      'https://afaq-lilac.vercel.app',
      'https://images.unsplash.com',
      'https://*.tile.openstreetmap.org',
    ].join(' '),
    "media-src 'self' blob:",
    `connect-src ${connectSources.join(' ')}`,
    "worker-src 'self' blob:",
    "manifest-src 'self'",
  ];

  if (isProduction) {
    directives.push('upgrade-insecure-requests');
  }

  return directives.join('; ');
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPortalPath = /^\/(?:fr|en|ar)?\/?portal(?:\/.*)?$/.test(pathname);
  const isAuthPage = /^\/(?:fr|en|ar)?\/?portal\/(?:login|register)$/.test(pathname);

  if (isPortalPath && !isAuthPage) {
    const token = request.cookies.get('auth_token');
    if (!token) {
      const localeMatch = pathname.match(/^\/(fr|en|ar)\//);
      const prefix = localeMatch ? `/${localeMatch[1]}` : '';
      return NextResponse.redirect(new URL(`${prefix}/portal/login`, request.url));
    }
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const contentSecurityPolicy = buildContentSecurityPolicy(nonce);

  request.headers.set('x-nonce', nonce);
  request.headers.set('Content-Security-Policy', contentSecurityPolicy);

  const response = intlMiddleware(request);

  response.headers.set('Content-Security-Policy', contentSecurityPolicy);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), payment=(), usb=(), geolocation=(self)',
  );

  if (isProduction) {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload',
    );
  }

  if (isPortalPath) {
    response.headers.set('X-Robots-Tag', 'noindex');
  }

  if (isProduction) {
    const localeCookie = response.cookies.get('NEXT_LOCALE');
    if (localeCookie) {
      response.cookies.set({
        ...localeCookie,
        secure: true,
      });
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
