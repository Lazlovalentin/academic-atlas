'use client';

import { createContext, useContext, useState, useRef, ReactNode, useEffect } from 'react';

import { type IDropdownRef } from 'types';

import { useCalculation } from './CalculationProvider';
import { checkCalculationField } from 'helpers';
import { useHandleClickOutside } from 'hooks';

interface IMenuContext {
  isCalcMenuOpen: boolean;
  isNavMenuOpen: boolean;
  showCalculationMenu: boolean;
  toggleCalcMenu: () => void;
  toggleNavMenu: () => void;
  closeMenu: () => void;
  changeMenuContent: () => void;
  registerDropdownRefs: (refs: Record<string, IDropdownRef | null>) => void;
}

const MenuContext = createContext<IMenuContext | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [isCalcMenuOpen, setIsCalcMenuOpen] = useState(false);
  const [showCalculationMenu, setShowCalculationMenu] = useState(false);
  const [isValidData, setIsValidData] = useState(false);
  const [dropdownRefs, setDropdownRefs] = useState<Record<string, IDropdownRef | null>>({});

  const menuRef = useRef<HTMLDivElement>(null);

  const { calculationData, resetCalculation } = useCalculation();

  useEffect(() => {
    if (isNavMenuOpen || isCalcMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isCalcMenuOpen, isNavMenuOpen]);

  useEffect(() => {
    const isNotDefaultData = checkCalculationField(calculationData);

    setIsValidData(isNotDefaultData);
  }, [calculationData]);

  const resetAllDropdownLabels = () => {
    Object.values(dropdownRefs).forEach((ref) => {
      if (ref) {
        ref.resetSelectedLabel();
      }
    });
  };

  const toggleNavMenu = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
  };

  const changeMenuContent = () => {
    setShowCalculationMenu(true);
  };

  const toggleCalcMenu = () => {
    setIsCalcMenuOpen(!isCalcMenuOpen);
    showCalculationMenu && setShowCalculationMenu(false);
    resetAllDropdownLabels();

    if (isValidData) {
      resetCalculation();
    }
  };

  const closeMenu = () => {
    setIsCalcMenuOpen(false);
    setIsNavMenuOpen(false);
    setShowCalculationMenu(false);
    resetAllDropdownLabels();

    if (isValidData) {
      resetCalculation();
    }
  };

  const registerDropdownRefs = (refs: Record<string, IDropdownRef | null>) => {
    setDropdownRefs((prevRefs) => {
      if (JSON.stringify(prevRefs) === JSON.stringify(refs)) {
        return prevRefs;
      }
      return refs;
    });
  };

  useHandleClickOutside(menuRef, isCalcMenuOpen || isNavMenuOpen, closeMenu);

  return (
    <MenuContext.Provider
      value={{
        isCalcMenuOpen,
        isNavMenuOpen,
        showCalculationMenu,
        changeMenuContent,
        toggleCalcMenu,
        toggleNavMenu,
        closeMenu,
        registerDropdownRefs,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
