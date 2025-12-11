import { create } from 'zustand';
import { News } from '@/types/content';
import { fetchCollection, addToCollection, updateDocument, deleteDocument } from '@/lib/firebaseUtils';

interface NewsState {
    newsList: News[];
    addNews: (news: Omit<News, 'id' | 'createdAt'>) => Promise<string>; // Returns ID for linking
    updateNews: (id: string, news: Partial<News>) => Promise<void>;
    deleteNews: (id: string) => Promise<void>;
    loadNews: () => Promise<void>;
}

export const useNewsStore = create<NewsState>((set, get) => ({
    newsList: [],

    addNews: async (news) => {
        try {
            const id = await addToCollection('news', news);
            const newNews = { ...news, id, createdAt: Date.now() };
            set({ newsList: [newNews, ...get().newsList] });
            return id;
        } catch (error) {
            console.error('Failed to add news:', error);
            throw error;
        }
    },

    updateNews: async (id, updates) => {
        try {
            await updateDocument('news', id, updates);
            set({
                newsList: get().newsList.map((n) => (n.id === id ? { ...n, ...updates } : n)),
            });
        } catch (error) {
            console.error('Failed to update news:', error);
        }
    },

    deleteNews: async (id) => {
        try {
            await deleteDocument('news', id);
            set({
                newsList: get().newsList.filter((n) => n.id !== id),
            });
        } catch (error) {
            console.error('Failed to delete news:', error);
            alert('삭제에 실패했습니다. 권한을 확인해주세요.');
        }
    },

    loadNews: async () => {
        try {
            const newsList = await fetchCollection<News>('news');
            set({ newsList });
        } catch (error) {
            console.error('Failed to load news:', error);
        }
    },
}));
