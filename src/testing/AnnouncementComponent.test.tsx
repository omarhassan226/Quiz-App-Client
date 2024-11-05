import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { AnnouncementProvider } from '../contexts/AnnouncementContext/AnnouncementContext';
import AnnouncementComponent from '../components/AnnouncementCard/AnnouncementCard';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AnnouncementComponent', () => {
    it('renders announcements and allows adding a new one', async () => {
        const mockData = {
            data: { data: [{ _id: '1', name: 'Test Announcement', subject: 'Test Subject', avatar: '', message: 'Test Message', createdAt: '2024-01-01' }] },
        };
        mockedAxios.get.mockResolvedValueOnce(mockData);

        const { getByText, getByLabelText, getByRole } = render(
            <AnnouncementProvider>
                <AnnouncementComponent />
            </AnnouncementProvider>
        );


        fireEvent.click(getByText('Add New Announcement'));
        fireEvent.change(getByLabelText('Name'), { target: { value: 'New Announcement' } });
        fireEvent.click(getByRole('button', { name: 'Add Announcement' }));

        mockedAxios.post.mockResolvedValueOnce({
            data: { data: { _id: '2', name: 'New Announcement', subject: 'New Subject', avatar: '', message: 'New Message', createdAt: '2024-02-01' } },
        });

    });

    it('handles errors when adding a new announcement', async () => {
        mockedAxios.post.mockRejectedValueOnce(new Error('Failed to add announcement'));

        const { getByText, getByRole } = render(
            <AnnouncementProvider>
                <AnnouncementComponent />
            </AnnouncementProvider>
        );

        fireEvent.click(getByText('Add New Announcement'));
        fireEvent.click(getByRole('button', { name: 'Add Announcement' }));

    });
});
