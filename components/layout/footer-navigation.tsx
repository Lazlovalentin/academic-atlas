'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AriaLabel, Paths, PositionInLayout } from 'types';
import { getFooterLinks, mapArray } from 'helpers';

import { CalculationLinkDesktop, CalculationLinkMobile } from './subcomponents';

export default function FooterMenu() {
  const pathname = usePathname();
  const footerMenuLinks = getFooterLinks();

  const getAriaCurrent = (path: Paths) => {
    if (pathname === path) {
      return 'page';
    } else if (pathname.startsWith('#')) {
      return 'location';
    } else {
      return undefined;
    }
  };

  return (
    <nav aria-label={AriaLabel.FooterNav}>
      <ul
        className='max-md:space-y-6 md:grid md:grid-cols-[200px_minmax(200px,_1fr)] md:grid-rows-4 md:gap-y-6 lg:grid-cols-[324px_minmax(324px,_1fr)] lg:gap-y-4'
        role='list'
      >
        <li>
          <CalculationLinkDesktop />
          <CalculationLinkMobile position={PositionInLayout.Footer} />
        </li>
        {mapArray(footerMenuLinks, ({ path, label }) => (
          <li key={label}>
            <Link
              href={path}
              aria-current={getAriaCurrent(path)}
              className='generalText hocus:text-accentPrimary dark:hocus:text-accentSecondary'
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
