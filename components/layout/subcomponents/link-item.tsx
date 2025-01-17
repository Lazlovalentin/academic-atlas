'use client';

import { useActiveLink } from 'context';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AriaDescription, AriaId, MenuLinks, Paths } from 'types';

import { AriaDescriptionUI } from 'ui';

interface ILegalLinkItemProps {
  href: Paths;
  ariaId: AriaId;
  ariaDescription: AriaDescription;
  linkLabel: MenuLinks;
}

export default function LegalLinkItem({
  href,
  ariaId,
  ariaDescription,
  linkLabel,
}: ILegalLinkItemProps) {
  const pathname = usePathname();
  const { handleActivateLink } = useActiveLink();

  return (
    <>
      <Link
        href={href}
        aria-describedby={ariaId}
        aria-current={pathname === href ? 'page' : undefined}
        onClick={() => {
          handleActivateLink(href);
        }}
        className='text-xs hocus:text-accentPrimary dark:hocus:text-accentSecondary md:text-sm lg:text-base'
      >
        {linkLabel}
      </Link>
      <AriaDescriptionUI
        id={ariaId}
        description={ariaDescription}
      />
    </>
  );
}
