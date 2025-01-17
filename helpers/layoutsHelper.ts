import { AriaCurrent, AriaLabelTrigger, Paths } from '../types';

export const getAriaLabelContacts = (href: string, label: string): string => {
  if (href.startsWith('tel:')) {
    return `Call ${label}`;
  } else if (href.startsWith('mailto:')) {
    return `Email ${label}`;
  } else {
    return `Open link to ${label}`;
  }
};

export const getAriaLabelSwitcher = (
  isNavMenuOpen: boolean,
  isCalcMenuOpen: boolean,
  showCalculationMenu: boolean,
): AriaLabelTrigger => {
  switch (true) {
    case showCalculationMenu:
      return AriaLabelTrigger.CloseCalculation;
    case isNavMenuOpen:
      return AriaLabelTrigger.CloseNavigation;
    case isCalcMenuOpen:
      return AriaLabelTrigger.CloseCalculation;

    default:
      return AriaLabelTrigger.Default;
  }
};

export const getMenuAriaCurrent = (path: Paths, pathname: string, isActive: boolean = false) => {
  if (isActive && path.startsWith('/#')) {
    return AriaCurrent.Location;
  }
  if (pathname === path) {
    return AriaCurrent.Page;
  }

  return undefined;
};
