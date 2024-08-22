import { render, screen } from '@testing-library/react';

import { getRequisites } from 'data';
import { Requisites } from 'components/legal-documents/subcomponents';

jest.mock('data', () => ({
  getRequisites: jest.fn(() => [
    { id: 'company-name', fieldName: 'Academic Atlas' },
    { id: 'address', fieldName: 'Адреса: вул. Трипільська 13а, Житомир, Україна' },
    { id: 'phone', fieldName: 'Телефон: +380 (63) 20-761-20' },
    { id: 'email', fieldName: 'Email: AcademicAtlas@ukr.net' },
  ]),
}));

describe('Requisites Component', () => {
  beforeEach(() => {
    render(<Requisites />);
  });

  it('renders all requisites correctly', () => {
    const requisites = getRequisites();
    requisites.forEach((requisite) => {
      expect(screen.getByText(requisite.fieldName)).toBeInTheDocument();
    });
  });

  it('renders the correct number of requisites', () => {
    const requisites = getRequisites();
    expect(screen.getAllByRole('paragraph')).toHaveLength(requisites.length);
  });

  it('renders requisites with correct styles', () => {
    const requisites = getRequisites();
    requisites.forEach((requisite) => {
      const element = screen.getByText(requisite.fieldName);
      expect(element).toHaveClass('italic');
    });
  });
});