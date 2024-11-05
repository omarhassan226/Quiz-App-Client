import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import QuizComponent from '../components/DueAssignmentCard/DueAssignmentCard';
import { QuizProvider } from '../contexts/QuizContext/QuizContext';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('renders quiz cards correctly', async () => {
    mockedAxios.get.mockResolvedValueOnce({
        data: {
            data: [
                {
                    _id: '1',
                    name: 'Sample Quiz',
                    course: 'Math',
                    topic: 'Algebra',
                    dueDate: new Date().toISOString(),
                },
            ],
        },
    });

    render(
        <QuizProvider>
            <QuizComponent />
        </QuizProvider>
    );

    await waitFor(() => {
        expect(screen.getByText('Sample Quiz')).toBeInTheDocument();
        expect(screen.getByText(/Course: Math/)).toBeInTheDocument();
        expect(screen.getByText(/Topic: Algebra/)).toBeInTheDocument();
    });
});

test('opens and closes modal for adding a quiz', () => {
    render(
        <QuizProvider>
            <QuizComponent />
        </QuizProvider>
    );

    const addButton = screen.getByText('Add New Quiz');
    fireEvent.click(addButton);


    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

});

test('handles quiz submission', async () => {
    mockedAxios.post.mockResolvedValueOnce({
        data: {
            data: {
                _id: '2',
                name: 'New Quiz',
                course: 'Science',
                topic: 'Physics',
                dueDate: new Date().toISOString(),
            },
        },
    });

    render(
        <QuizProvider>
            <QuizComponent />
        </QuizProvider>
    );

    const addButton = screen.getByText('Add New Quiz');
    fireEvent.click(addButton);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'New Quiz' } });
    fireEvent.change(screen.getByLabelText('Course'), { target: { value: 'Science' } });
    fireEvent.change(screen.getByLabelText('Topic'), { target: { value: 'Physics' } });
    fireEvent.change(screen.getByLabelText('Due Date'), { target: { value: '2024-12-31T23:59' } });

    const submitButton = screen.getByText('Add Quiz');
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(screen.getByText('New Quiz')).toBeInTheDocument();
    });
});
