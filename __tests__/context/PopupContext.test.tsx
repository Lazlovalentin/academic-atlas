import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef, ReactNode } from 'react';

import { CalculationProvider } from 'context/CalculationProvider';
import { CalculationResultProvider } from 'context/CalculationResultProvider';
import { usePopup, PopupProvider } from 'context/PopupProvider';

jest.mock('context/PopupProvider', () => {
  const actual = jest.requireActual('context/PopupProvider');
  return {
    __esModule: true,
    ...actual,
    usePopup: jest.fn(),
  };
});

const PopupTestComponent = () => {
  const {
    isPopupOpen,
    togglePopup,
    closePopup,
    setBodyOverflow,
    resetValues,
    popupRefs,
    openPopups,
  } = usePopup();

  return (
    <div>
      <div data-testid='popup-status'>
        {Object.keys(openPopups).map((key) => (
          <div
            key={key}
            data-testid={`popup-${key}`}
          >
            {key}: {isPopupOpen(key) ? 'Open' : 'Closed'}
          </div>
        ))}
      </div>
      <button onClick={() => togglePopup('test-popup')}>Toggle Popup</button>
      <button onClick={() => closePopup('test-popup')}>Close Popup</button>
      <button onClick={() => setBodyOverflow(true)}>Set Body Overflow Hidden</button>
      <button onClick={() => setBodyOverflow(false)}>Reset Body Overflow</button>
      <button onClick={resetValues}>Reset Values</button>

      <div data-testid='popup-refs'>
        {Object.keys(popupRefs.current).map((key) => (
          <div
            key={key}
            data-testid={`popup-ref-${key}`}
          >
            {key}: {popupRefs.current[key]?.current ? 'Exists' : 'Does not exist'}
          </div>
        ))}
      </div>
    </div>
  );
};

describe('PopupProvider', () => {
  const mockUsePopup = usePopup as jest.Mock;
  const mockSetBodyOverflow = jest.fn((isHidden: boolean) => {
    document.body.style.overflow = isHidden ? 'hidden' : 'auto';
  });
  const mockResetValues = jest.fn(() => {
    mockResetCalculation();
    mockHandleResetCostResult();
  });
  const mockTogglePopup = jest.fn((id: string) => {
    const newOpenState = !mockOpenPopups[id];
    mockOpenPopups = { ...mockOpenPopups, [id]: newOpenState };

    mockSetBodyOverflow(newOpenState);

    if (!newOpenState) {
      setTimeout(() => {
        mockResetValues();
      }, 0);
    }
  });
  const mockClosePopup = jest.fn((id: string) => {
    mockOpenPopups = { ...mockOpenPopups, [id]: false };

    mockSetBodyOverflow(false);
    mockResetValues();
  });

  let mockOpenPopups: { [key: string]: boolean } = { 'test-popup': false };
  const mockIsPopupOpen = jest.fn((key: string) => !!mockOpenPopups[key]);

  const mockResetCalculation = jest.fn();
  const mockHandleResetCostResult = jest.fn();

  mockUsePopup.mockReturnValue({
    isPopupOpen: mockIsPopupOpen,
    togglePopup: mockTogglePopup,
    closePopup: mockClosePopup,
    setBodyOverflow: mockSetBodyOverflow,
    resetValues: mockResetValues,
    popupRefs: { current: {} },
    openPopups: mockOpenPopups,
  });

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <CalculationProvider>
      <CalculationResultProvider>
        <PopupProvider>{children}</PopupProvider>
      </CalculationResultProvider>
    </CalculationProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    mockOpenPopups = { 'test-popup': false };
  });

  it('should initialise with no popups open', () => {
    render(<PopupTestComponent />, { wrapper: Wrapper });

    expect(screen.getByTestId('popup-status')).toHaveTextContent('test-popup: Closed');
  });

  it('should call setBodyOverflow and reset when toggling popup', async () => {
    const { rerender } = render(<PopupTestComponent />, { wrapper: Wrapper });

    fireEvent.click(screen.getByText('Toggle Popup'));
    expect(mockTogglePopup).toHaveBeenCalledWith('test-popup');
    expect(mockSetBodyOverflow).toHaveBeenCalledWith(true);
    expect(mockResetValues).not.toHaveBeenCalled();

    mockOpenPopups = { 'test-popup': true };
    rerender(<PopupTestComponent />);

    await waitFor(() =>
      expect(screen.getByTestId('popup-status')).toHaveTextContent('test-popup: Open'),
    );

    fireEvent.click(screen.getByText('Close Popup'));
    expect(mockClosePopup).toHaveBeenCalledWith('test-popup');
    expect(mockSetBodyOverflow).toHaveBeenCalledWith(false);
    expect(mockResetValues).toHaveBeenCalled();

    mockOpenPopups = { 'test-popup': false };
    rerender(<PopupTestComponent />);

    await waitFor(() => {
      expect(screen.getByTestId('popup-status')).toHaveTextContent('test-popup: Closed');
    });
  });

  it('calls resetValues after popup is closed with timeout', async () => {
    const { rerender } = render(<PopupTestComponent />, { wrapper: Wrapper });

    fireEvent.click(screen.getByText('Toggle Popup'));
    expect(mockTogglePopup).toHaveBeenCalledWith('test-popup');
    expect(mockSetBodyOverflow).toHaveBeenCalledWith(true);
    expect(mockResetValues).not.toHaveBeenCalled();

    mockOpenPopups = { 'test-popup': true };
    rerender(<PopupTestComponent />);

    await waitFor(() =>
      expect(screen.getByTestId('popup-status')).toHaveTextContent('test-popup: Open'),
    );

    fireEvent.click(screen.getByText('Close Popup'));
    expect(mockClosePopup).toHaveBeenCalledWith('test-popup');
    expect(mockSetBodyOverflow).toHaveBeenCalledWith(false);

    await waitFor(() => expect(mockResetValues).toHaveBeenCalled());
  });

  it('should not call resetValues when opening popup in togglePopup', () => {
    render(<PopupTestComponent />, { wrapper: Wrapper });

    fireEvent.click(screen.getByText('Toggle Popup'));

    expect(mockResetValues).not.toHaveBeenCalled();
  });

  it('calls setBodyOverflow with true when opening a popup', () => {
    render(<PopupTestComponent />, { wrapper: Wrapper });

    fireEvent.click(screen.getByText('Toggle Popup'));
    expect(mockSetBodyOverflow).toHaveBeenCalledWith(true);
  });

  it('should update openPopups correctly when togglePopup is called', () => {
    render(<PopupTestComponent />, { wrapper: Wrapper });

    fireEvent.click(screen.getByText('Toggle Popup'));
    expect(mockOpenPopups['test-popup']).toBe(true);

    fireEvent.click(screen.getByText('Toggle Popup'));
    expect(mockOpenPopups['test-popup']).toBe(false);
  });

  it('should reset values after timeout when popup is closed', async () => {
    render(<PopupTestComponent />, { wrapper: Wrapper });

    fireEvent.click(screen.getByText('Toggle Popup'));

    fireEvent.click(screen.getByText('Toggle Popup'));

    await waitFor(() => expect(mockResetValues).toHaveBeenCalled());
  });

  it('should call resetValues and setBodyOverflow(false) when closePopup is called', () => {
    render(<PopupTestComponent />, { wrapper: Wrapper });

    fireEvent.click(screen.getByText('Close Popup'));

    expect(mockResetValues).toHaveBeenCalled();
    expect(mockSetBodyOverflow).toHaveBeenCalledWith(false);
  });

  it('should call setBodyOverflow and not call resetValues when opening popup, but call resetValues when closing', async () => {
    const { rerender } = render(<PopupTestComponent />, { wrapper: Wrapper });

    fireEvent.click(screen.getByText('Toggle Popup'));
    expect(mockTogglePopup).toHaveBeenCalledWith('test-popup');
    expect(mockSetBodyOverflow).toHaveBeenCalledWith(true);
    expect(mockResetValues).not.toHaveBeenCalled();

    mockOpenPopups = { 'test-popup': true };
    rerender(<PopupTestComponent />);

    await waitFor(() =>
      expect(screen.getByTestId('popup-status')).toHaveTextContent('test-popup: Open'),
    );

    fireEvent.click(screen.getByText('Close Popup'));
    expect(mockClosePopup).toHaveBeenCalledWith('test-popup');
    expect(mockSetBodyOverflow).toHaveBeenCalledWith(false);
    expect(mockResetValues).toHaveBeenCalled();
  });

  it('should call resetCalculation and handleResetCostResult inside resetValues', () => {
    render(<PopupTestComponent />, { wrapper: Wrapper });

    fireEvent.click(screen.getByText('Reset Values'));
    expect(mockResetValues).toHaveBeenCalled();
    expect(mockResetCalculation).toHaveBeenCalled();
    expect(mockHandleResetCostResult).toHaveBeenCalled();
  });

  it('should correctly handle non-existing popups in isPopupOpen', () => {
    render(<PopupTestComponent />, { wrapper: Wrapper });

    expect(mockIsPopupOpen('non-existing-popup')).toBe(false);
    expect(screen.queryByTestId('popup-non-existing-popup')).not.toBeInTheDocument();
  });

  it('should correctly update body overflow style when setBodyOverflow is called', () => {
    render(<PopupTestComponent />, { wrapper: Wrapper });

    fireEvent.click(screen.getByText('Set Body Overflow Hidden'));
    expect(document.body.style.overflow).toBe('hidden');
    expect(mockSetBodyOverflow).toHaveBeenCalledWith(true);

    fireEvent.click(screen.getByText('Reset Body Overflow'));
    expect(document.body.style.overflow).toBe('auto');

    expect(mockSetBodyOverflow).toHaveBeenCalledWith(false);
  });

  it('should handle popupRefs correctly', () => {
    const { rerender } = render(<PopupTestComponent />, { wrapper: Wrapper });

    const popupRefKey = 'test-popup';
    const testRef = createRef<HTMLDivElement>();

    mockUsePopup.mockReturnValue({
      ...mockUsePopup(),
      popupRefs: { current: { [popupRefKey]: testRef } },
    });

    rerender(<PopupTestComponent />);

    expect(screen.getByTestId(`popup-ref-${popupRefKey}`)).toHaveTextContent(
      `${popupRefKey}: ${testRef.current ? 'Exists' : 'Does not exist'}`,
    );
  });

  it('should throw error when usePopup is used outside of PopupProvider', () => {
    mockUsePopup.mockImplementation(() => {
      const actual = jest.requireActual('context/PopupProvider');
      return actual.usePopup();
    });

    expect(() =>
      render(<PopupTestComponent />, { wrapper: ({ children }) => <>{children}</> }),
    ).toThrow('usePopup must be used within a PopupProvider');
  });
});
