'use client';

import { forwardRef, Ref, useImperativeHandle } from 'react';

import { ButtonType, DropdownAriaId, DropdownOption, IDropdownRef } from 'types';

import { useDropdown } from 'hooks';

import { MappedListTemplate } from 'template';
import CustomScroll from './custom-scroll';
import { DropdownTrigger } from './subcomponents';

interface IOption {
  typeId: string;
  option: DropdownOption;
}

interface IDropdownProps {
  label: DropdownOption;
  options: IOption[];
  onOptionSelect: (option: DropdownOption) => void;
  ariaId: DropdownAriaId;
}

function Dropdown(
  { label, options, onOptionSelect, ariaId }: IDropdownProps,
  ref: Ref<IDropdownRef | null>,
) {
  const {
    isDropdownOpen,
    dropdownRef,
    selectedLabel,
    isOptionSelected,
    toggleDropdown,
    resetSelectedLabel,
    handleOptionClick,
  } = useDropdown({ label, onOptionSelect });

  useImperativeHandle(ref, () => ({
    resetSelectedLabel,
  }));

  return (
    <div
      className='relative'
      ref={dropdownRef}
    >
      <DropdownTrigger
        isOpen={isDropdownOpen}
        isOptionSelected={isOptionSelected}
        selectedLabel={selectedLabel}
        handleToggle={toggleDropdown}
        ariaId={ariaId}
      />
      {isDropdownOpen && (
        <div
          id={`${ariaId}-list`}
          role='listbox'
          aria-labelledby={`${ariaId}-trigger`}
          className='absolute z-10 max-h-[248px] w-full overflow-hidden rounded-b-lg ring-[2px] ring-accentPrimary dark:ring-accentSecondary lg:max-h-[314px]'
        >
          <CustomScroll className='max-h-[248px]'>
            <MappedListTemplate<IOption>
              items={options}
              className='w-full space-y-6 rounded-b-lg bg-whiteBase bg-background-light-gradient p-4 text-sm dark:bg-background-dark-gradient max-md:leading-130 md:text-base lg:text-medium'
            >
              {({ typeId, option }) => (
                <li key={typeId}>
                  <button
                    type={ButtonType.Button}
                    onClick={() => handleOptionClick(option)}
                    role='option'
                    aria-selected={isOptionSelected}
                    className='text-start text-darkBase hover:text-accentPrimary dark:text-whiteBase dark:hover:text-accentSecondary'
                  >
                    {option}
                  </button>
                </li>
              )}
            </MappedListTemplate>
          </CustomScroll>
        </div>
      )}
    </div>
  );
}

export default forwardRef(Dropdown);
