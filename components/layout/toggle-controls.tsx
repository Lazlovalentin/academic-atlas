'use client';

import { IconName, IconSize, ButtonType } from 'types';

import { useMenu } from 'context';
import { getAriaLabelSwitcher } from 'helpers';

import { MobileMenuTemplate } from 'template';
import { SvgIconUI } from 'ui';
import Menu from './menu';
import PriceCalculator from '../calculation/product-price-calculator';

export default function ToggleMenuTrigger() {
  const {
    isNavMenuOpen,
    isCalcMenuOpen,
    showCalculationMenu,
    toggleNavMenu,
    toggleCalcMenu,
    closeMenu,
  } = useMenu();

  const handleToggleMenu = (): void => {
    if (isCalcMenuOpen) {
      toggleCalcMenu();
    } else if (showCalculationMenu) {
      closeMenu();
    } else {
      toggleNavMenu();
    }
  };

  const dynamicAriaLabel = getAriaLabelSwitcher(isNavMenuOpen, isCalcMenuOpen);

  return (
    <>
      <button
        type={ButtonType.Button}
        onClick={handleToggleMenu}
        aria-label={dynamicAriaLabel}
        className='group size-10'
      >
        <SvgIconUI
          id={isNavMenuOpen || isCalcMenuOpen ? IconName.Close : IconName.Burger}
          size={{ width: IconSize.L, height: IconSize.L }}
          className='fill-darkBase group-hover:fill-accentPrimary dark:fill-whiteBase'
        />
      </button>

      <MobileMenuTemplate isOpen={isNavMenuOpen}>
        {showCalculationMenu ? <PriceCalculator /> : <Menu />}
      </MobileMenuTemplate>
    </>
  );
}
