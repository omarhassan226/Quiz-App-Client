import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { QuizProvider } from '../contexts/QuizContext/QuizContext';
import QuizComponent from '../components/DueAssignmentCard/DueAssignmentCard';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('QuizComponent', () => {
    it('should fetch and display quizzes', async () => {
        // Mock the API response
        mockedAxios.get.mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    data: [
                        {
                            _id: '1',
                            name: 'Sample Quiz',
                            course: 'Math 101',
                            topic: 'Algebra',
                            dueDate: '2024-11-15T10:00:00Z',
                            createdAt: '2024-11-01T08:00:00Z',
                        },
                    ],
                },
            })
        );

        render(
            <QuizProvider>
                <QuizComponent />
            </QuizProvider>
        );

        // Wait for the component to load and display quizzes
        await waitFor(() => expect(screen.getByText('Sample Quiz')).toBeInTheDocument());
    });
});
