import { ButtonType } from 'types';

import { SectionTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';

export default function Promotions() {
  return (
    <SectionTemplate>
      <p>Акційні пропозиції</p>
      <PrimaryButtonUI type={ButtonType.Button} />
    </SectionTemplate>
  );
}
