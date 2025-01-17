'use client';

import { AriaLabel, IconName, IconSize, ThemeVariants } from 'types';
import { useTheme } from 'context';

import { SvgIconUI, SwitchUI } from 'ui';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <SwitchUI
      onClick={toggleTheme}
      aria-label={AriaLabel.SwitchTheme}
    >
      <SvgIconUI
        id={theme === ThemeVariants.LIGHT ? IconName.Sun : IconName.Moon}
        size={{ width: IconSize.BG, height: IconSize.BG }}
        className='fill-accentPrimary'
        ariaHidden={false}
        ariaLabel={AriaLabel.Theme}
      />
    </SwitchUI>
  );
}
