import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import ExamTips from '../components/ExamTips/ExamTips';

jest.mock('react-i18next', () => ({
    useTranslation: jest.fn(),
}));

describe('ExamTips', () => {
    const t = (key: string) => key; // Mock translation function

    beforeEach(() => {
        (useTranslation as jest.Mock).mockReturnValue({ t });
    });

    test('renders ExamTips component with translated text', () => {
        render(<ExamTips />);

        // Check for presence of translated texts
        expect(screen.getByText(/title/i)).toBeInTheDocument();
        expect(screen.getByText(/intro/i)).toBeInTheDocument();
        expect(screen.getByText(/quote/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /button/i })).toBeInTheDocument();
    });
});
