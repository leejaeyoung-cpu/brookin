import { create } from 'zustand';
import { Announcement } from '@/types/content';
import { fetchCollection, addToCollection, updateDocument, deleteDocument } from '@/lib/firebaseUtils';

interface AnnouncementState {
    announcements: Announcement[];
    addAnnouncement: (announcement: Omit<Announcement, 'id' | 'createdAt'>) => Promise<void>;
    updateAnnouncement: (id: string, announcement: Partial<Announcement>) => Promise<void>;
    deleteAnnouncement: (id: string) => Promise<void>;
    togglePin: (id: string) => Promise<void>;
    loadAnnouncements: () => Promise<void>;
}

export const useAnnouncementStore = create<AnnouncementState>((set, get) => ({
    announcements: [],

    addAnnouncement: async (announcement) => {
        try {
            const id = await addToCollection('announcements', announcement);
            const newAnnouncement = { ...announcement, id, createdAt: Date.now() };
            set({ announcements: [newAnnouncement, ...get().announcements] });
        } catch (error) {
            console.error('Failed to add announcement:', error);
        }
    },

    updateAnnouncement: async (id, updates) => {
        try {
            await updateDocument('announcements', id, updates);
            set({
                announcements: get().announcements.map((a) => (a.id === id ? { ...a, ...updates } : a)),
            });
        } catch (error) {
            console.error('Failed to update announcement:', error);
        }
    },

    deleteAnnouncement: async (id) => {
        try {
            await deleteDocument('announcements', id);
            set({
                announcements: get().announcements.filter((a) => a.id !== id),
            });
        } catch (error) {
            console.error('Failed to delete announcement:', error);
        }
    },

    togglePin: async (id) => {
        try {
            const announcement = get().announcements.find((a) => a.id === id);
            if (announcement) {
                const newPinState = !announcement.isPinned;
                await updateDocument('announcements', id, { isPinned: newPinState });
                set({
                    announcements: get().announcements.map((a) =>
                        a.id === id ? { ...a, isPinned: newPinState } : a
                    ),
                });
            }
        } catch (error) {
            console.error('Failed to toggle pin:', error);
        }
    },

    loadAnnouncements: async () => {
        try {
            const announcements = await fetchCollection<Announcement>('announcements');
            set({ announcements });
        } catch (error) {
            console.error('Failed to load announcements:', error);
        }
    },
}));
