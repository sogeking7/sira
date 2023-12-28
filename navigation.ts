import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';
import { pathnames, localePrefix, localesArray} from './config';

export const {Link, redirect, usePathname, useRouter} =
  createLocalizedPathnamesNavigation({
    locales: localesArray,
    pathnames,
    localePrefix
  });
