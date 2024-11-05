import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

jest.mock('react-i18next', () => ({
    useTranslation: jest.fn(),
}));

describe('LanguageSwitcher', () => {
    const changeLanguageMock = jest.fn();

    beforeEach(() => {
        (useTranslation as jest.Mock).mockReturnValue({
            i18n: {
                changeLanguage: changeLanguageMock,
            },
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders language buttons', () => {
        render(<LanguageSwitcher />);

        expect(screen.getByText(/English/i)).toBeInTheDocument();
        expect(screen.getByText(/العربية/i)).toBeInTheDocument();
    });

    test('changes language to English when the English button is clicked', () => {
        render(<LanguageSwitcher />);

        fireEvent.click(screen.getByText(/English/i));

        expect(changeLanguageMock).toHaveBeenCalledWith('en');
    });

    test('changes language to Arabic when the Arabic button is clicked', () => {
        render(<LanguageSwitcher />);

        fireEvent.click(screen.getByText(/العربية/i));

        expect(changeLanguageMock).toHaveBeenCalledWith('ar');
    });
});
