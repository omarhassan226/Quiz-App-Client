import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import { AnnouncementProvider, useAnnouncementContext } from '../contexts/AnnouncementContext/AnnouncementContext';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AnnouncementContext', () => {
    it('fetches and sets announcements successfully', async () => {
        const mockData = {
            data: { data: [{ _id: '1', name: 'Test', subject: 'Subject', avatar: '', message: 'Message', createdAt: '2024-01-01' }] },
        };
        mockedAxios.get.mockResolvedValueOnce(mockData);

        const TestComponent = () => {
            const { announcements, loading } = useAnnouncementContext();
            return (
                <>
                    {loading ? <span>Loading...</span> : <span>{announcements[0]?.name}</span>}
                </>
            );
        };

        const { getByText } = render(
            <AnnouncementProvider>
                <TestComponent />
            </AnnouncementProvider>
        );

        await waitFor(() => expect(getByText('Test')).toBeInTheDocument());
    });

    it('handles error while fetching announcements', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

        const TestComponent = () => {
            const { error } = useAnnouncementContext();
            return <span>{error}</span>;
        };

        const { getByText } = render(
            <AnnouncementProvider>
                <TestComponent />
            </AnnouncementProvider>
        );

        await waitFor(() => expect(getByText('Error fetching announcements.')).toBeInTheDocument());
    });
});
