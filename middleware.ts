import createMiddleware from 'next-intl/middleware';
import { pathnames, localeDetection, localesArray} from './config';

export default createMiddleware({
  defaultLocale: 'ru',
  locales: localesArray,
  localePrefix: 'always',
  localeDetection,
  pathnames
});

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(ru|en|kz)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};
