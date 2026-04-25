import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['id', 'en'],
  defaultLocale: 'id'  // default ke Bahasa Indonesia
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};