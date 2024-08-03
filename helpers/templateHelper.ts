import { BACKGROUNDS, SectionTitle } from '../types';

const DEVICES = ['largeDesktop', 'desktop', 'tablet', 'mobile'];

const getBackgroundImagePaths = (baseName: string, device: string): string => {
  return `/backgroundImage/${baseName}-${device}.webp`;
};

export const generateBackgroundImagePaths = (section: SectionTitle) => {
  const baseName = BACKGROUNDS[section];
  if (!baseName) return null;

  return DEVICES.reduce(
    (paths, device) => {
      paths[device] = getBackgroundImagePaths(baseName, device);

      return paths;
    },
    {} as Record<string, string>,
  );
};
