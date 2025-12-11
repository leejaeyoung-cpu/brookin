import { create } from 'zustand';
import { Bulletin } from '@/types/content';
import { fetchCollection, addToCollection, updateDocument, deleteDocument } from '@/lib/firebaseUtils';

interface BulletinState {
    bulletins: Bulletin[];
    addBulletin: (bulletin: Omit<Bulletin, 'id' | 'createdAt'>) => Promise<void>;
    updateBulletin: (id: string, bulletin: Partial<Bulletin>) => Promise<void>;
    deleteBulletin: (id: string) => Promise<void>;
    loadBulletins: () => Promise<void>;
}

export const useBulletinStore = create<BulletinState>((set, get) => ({
    bulletins: [],

    addBulletin: async (bulletin) => {
        try {
            const id = await addToCollection('bulletins', bulletin);
            const newBulletin = { ...bulletin, id, createdAt: Date.now() };
            set({ bulletins: [newBulletin, ...get().bulletins] });
        } catch (error) {
            console.error('Failed to add bulletin:', error);
        }
    },

    updateBulletin: async (id, updates) => {
        try {
            await updateDocument('bulletins', id, updates);
            set({
                bulletins: get().bulletins.map((b) => (b.id === id ? { ...b, ...updates } : b)),
            });
        } catch (error) {
            console.error('Failed to update bulletin:', error);
        }
    },

    deleteBulletin: async (id) => {
        try {
            await deleteDocument('bulletins', id);
            set({
                bulletins: get().bulletins.filter((b) => b.id !== id),
            });
        } catch (error) {
            console.error('Failed to delete bulletin:', error);
        }
    },

    loadBulletins: async () => {
        try {
            const bulletins = await fetchCollection<Bulletin>('bulletins');
            set({ bulletins });
        } catch (error) {
            console.error('Failed to load bulletins:', error);
        }
    },
}));
