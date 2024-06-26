import { SectionTitle } from 'types';

import { getServices, idValues } from 'helpers';

import { SectionTemplate } from 'template';
import { ServiceItem } from './subcomponents';

export default function Services() {
  const serviceItems = getServices();

  return (
    <SectionTemplate
      title={SectionTitle.OurServices}
      id={idValues.Services ?? ''}
    >
      <ul className='max-sm:space-y-4 sm:max-md:flex sm:max-md:flex-wrap sm:max-md:justify-between sm:max-md:gap-y-6 md:gap-4 md:max-lg:grid md:max-lg:grid-cols-4 md:max-lg:grid-rows-4 lg:flex lg:flex-wrap lg:gap-9'>
        {Array.isArray(serviceItems) &&
          serviceItems.map(({ imageSrc, imageAlt, serviceTitle, gridPosition }) => (
            <ServiceItem
              key={serviceTitle}
              imageSrc={imageSrc}
              imageAlt={imageAlt}
              serviceTitle={serviceTitle}
              gridPosition={gridPosition}
            />
          ))}
      </ul>
    </SectionTemplate>
  );
}
