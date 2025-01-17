import {
  type IAccession,
  AriaDescription,
  AriaId,
  PrimaryButtonLabel,
  TelegramScenario,
} from 'types';
import { getAccession, getSectionProps, imageSettings } from 'data';

import { MappedListTemplate, SectionTemplate, TelegramButton } from 'template';
import { ImageUI } from 'ui';
import { AccessionItem } from './subcomponents';

export default function Accession() {
  const accessionData = getAccession();
  const { partnershipAccession } = imageSettings;
  const sectionProps = getSectionProps();
  const performersAccessionProps = sectionProps.performersAccession;

  const { src, alt, width, height, className } = partnershipAccession;

  return (
    <SectionTemplate {...performersAccessionProps}>
      <div className='space-y-6 md:space-y-10 lg:space-y-[72px]'>
        <div className='max-md:space-y-6 md:flex md:items-center md:justify-between md:gap-x-6 lg:gap-x-28'>
          <MappedListTemplate<IAccession>
            items={accessionData}
            className='space-y-6 md:space-y-8'
          >
            {({ id, desc }) => (
              <AccessionItem
                key={id}
                id={id}
                desc={desc}
              />
            )}
          </MappedListTemplate>
          <ImageUI
            src={src}
            height={height}
            width={width}
            alt={alt}
            className={className}
          />
        </div>
        <div className='flex items-center justify-center'>
          <TelegramButton
            command={TelegramScenario.Join}
            label={PrimaryButtonLabel.Accession}
            isOnLightBackground
            ariaId={AriaId.AccessionProcedure}
            ariaDescription={AriaDescription.AccessionProcedure}
          />
        </div>
      </div>
    </SectionTemplate>
  );
}
