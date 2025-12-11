// Local storage helper functions

const STORAGE_KEYS = {
    BULLETINS: 'church_bulletins',
    ANNOUNCEMENTS: 'church_announcements',
    GALLERY: 'church_gallery',
} as const;

export function saveToStorage<T>(key: string, data: T): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to storage:', error);
    }
}

export function loadFromStorage<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error loading from storage:', error);
        return defaultValue;
    }
}

export function removeFromStorage(key: string): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing from storage:', error);
    }
}

export { STORAGE_KEYS };
