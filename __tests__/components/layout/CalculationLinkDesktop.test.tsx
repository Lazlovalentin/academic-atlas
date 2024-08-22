import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import { AriaLabel, MenuLinks, PopupID } from 'types';
import { useCalculationResult } from 'context';
import { usePricePopupControls } from 'hooks';

import CalculationLinkDesktop from 'components/layout/subcomponents/calculation-link-desktop';
import { createRef } from 'react';

jest.mock('context', () => ({
  useCalculationResult: jest.fn(),
}));

jest.mock('hooks', () => ({
  usePricePopupControls: jest.fn(),
}));

jest.mock('template', () => ({
  ModalTemplate: jest.fn(({ children, isOpen, id }) =>
    isOpen(id) ? <div data-testid='desktop-calculation-link-popup'>{children}</div> : null,
  ),
}));

jest.mock('components/calculation/product-price-calculator', () =>
  jest.fn(() => <div data-testid='price-calculator' />),
);

describe('CalculationLinkDesktop Component', () => {
  const mockUseCalculationResult = useCalculationResult as jest.Mock;
  const mockUsePricePopupControls = usePricePopupControls as jest.Mock;
  const togglePopupMock = jest.fn();
  const mockOpenPopups: { [key: string]: boolean } = { [PopupID.CostSection]: false };
  const isPopupOpenMock = jest.fn((key: string) => !!mockOpenPopups[key]);
  const popupRefsMock = {
    current: { [PopupID.CostSection]: createRef<HTMLDivElement>() },
  };

  beforeEach(() => {
    mockUseCalculationResult.mockReturnValue({ hasSubmitData: false });
    mockUsePricePopupControls.mockReturnValue({
      popupId: PopupID.CostSection,
      popupRefs: popupRefsMock,
      togglePopup: togglePopupMock,
      isPopupOpen: isPopupOpenMock,
      openPopups: mockOpenPopups,
    });

    jest.clearAllMocks();
  });

  it('should render button with correct attributes and styles', () => {
    render(<CalculationLinkDesktop />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(MenuLinks.Cost);
    expect(button).toHaveAttribute('aria-label', AriaLabel.CalculationModule);
    expect(button).toHaveClass(
      'hidden hocus:text-accentPrimary dark:text-whiteBase dark:hocus:text-accentSecondary',
    );
  });

  it('should open popup when togglePopup is called', () => {
    render(<CalculationLinkDesktop />);

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(togglePopupMock).toHaveBeenCalledWith(PopupID.CostSection);
  });

  it('should render ModalTemplate with PriceCalculator content when the popup is open', async () => {
    const { rerender } = render(<CalculationLinkDesktop />);

    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(togglePopupMock).toHaveBeenCalledWith(PopupID.CostSection);

    act(() => {
      mockOpenPopups[PopupID.CostSection] = true;
      isPopupOpenMock.mockReturnValue(true);
    });

    rerender(<CalculationLinkDesktop />);

    await waitFor(() => {
      const modal = screen.queryByTestId('desktop-calculation-link-popup');
      expect(modal).toBeInTheDocument();
      const priceCalculator = screen.queryByTestId('price-calculator');
      expect(priceCalculator).toBeInTheDocument();
    });
  });

  it('should not render ModalTemplate when the popup is closed', async () => {
    const { rerender } = render(<CalculationLinkDesktop />);

    act(() => {
      mockOpenPopups[PopupID.CostSection] = false;
      isPopupOpenMock.mockReturnValue(false);
    });

    rerender(<CalculationLinkDesktop />);

    await waitFor(() => {
      const modal = screen.queryByTestId('desktop-calculation-link-popup');
      expect(modal).toBeNull();
    });
  });
});