/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export interface Announcement {
    _id: string;
    name: string;
    subject: string;
    avatar: string;
    message: string;
    createdAt: string;
}

interface AnnouncementContextType {
    announcements: Announcement[];
    loading: boolean;
    error: string | null;
    fetchAnnouncements: () => Promise<void>;
    addAnnouncement: (announcement: Omit<Announcement, '_id' | 'createdAt'>) => Promise<void>;
    updateAnnouncement: (id: string, updatedAnnouncement: Omit<Announcement, '_id' | 'createdAt'>) => Promise<void>;
    deleteAnnouncement: (id: string) => Promise<void>;
    deleteAllAnnouncements: () => Promise<void>;
}

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined);

export const AnnouncementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAnnouncements = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/announcement');
            setAnnouncements(response.data.data);
        } catch (error) {
            setError("Error fetching announcements.");
        } finally {
            setLoading(false);
        }
    };

    const addAnnouncement = async (announcement: Omit<Announcement, '_id' | 'createdAt'>) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('https://quiz-app-server1.vercel.app/api/announcement', announcement);
            setAnnouncements(prev => [...prev, response.data.data]);
            toast.success('Announcement Added Successfully...')
        } catch (error) {
            setError("Error adding announcement.");
        } finally {
            setLoading(false);
        }
    };

    const updateAnnouncement = async (id: string, updatedAnnouncement: Omit<Announcement, '_id' | 'createdAt'>) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.patch(`https://quiz-app-server1.vercel.app//api/announcement/${id}`, updatedAnnouncement);
            setAnnouncements(prev => prev.map(announcement => (announcement._id === id ? response.data.data : announcement)));
            toast.info('Announcement updated successfully...')
        } catch (error) {
            setError("Error updating announcement.");
        } finally {
            setLoading(false);
        }
    };

    const deleteAnnouncement = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`https://quiz-app-server1.vercel.app//api/announcement/${id}`);
            setAnnouncements(prev => prev.filter(announcement => announcement._id !== id));
            toast.error('Announcement deleted successfully...')
        } catch (error) {
            setError("Error deleting announcement.");
        } finally {
            setLoading(false);
        }
    };

    const deleteAllAnnouncements = async () => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete('https://quiz-app-server1.vercel.app//api/announcement');
            setAnnouncements([]);
        } catch (error) {
            setError("Error deleting all announcements.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    return (
        <AnnouncementContext.Provider value={{ announcements, loading, error, fetchAnnouncements, addAnnouncement, updateAnnouncement, deleteAnnouncement, deleteAllAnnouncements }}>
            {children}
        </AnnouncementContext.Provider>
    );
};

export const useAnnouncementContext = () => {
    const context = useContext(AnnouncementContext);
    if (!context) {
        throw new Error("useAnnouncementContext must be used within an AnnouncementProvider");
    }
    return context;
};
