import { db, storage } from './firebase';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    query,
    orderBy,
    DocumentData
} from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

// Firestore Helpers
export const fetchCollection = async <T>(collectionName: string): Promise<T[]> => {
    try {
        const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as T[];
    } catch (error) {
        console.error(`Error fetching ${collectionName}:`, error);
        return [];
    }
};

export const addToCollection = async (collectionName: string, data: any) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), {
            ...data,
            createdAt: Date.now()
        });
        return docRef.id;
    } catch (error) {
        console.error(`Error adding to ${collectionName}:`, error);
        throw error;
    }
};

export const updateDocument = async (collectionName: string, id: string, data: any) => {
    try {
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, data);
    } catch (error) {
        console.error(`Error updating document ${id}:`, error);
        throw error;
    }
};

export const deleteDocument = async (collectionName: string, id: string) => {
    try {
        await deleteDoc(doc(db, collectionName, id));
    } catch (error) {
        console.error(`Error deleting document ${id}:`, error);
        throw error;
    }
};

// Storage Helpers (for Base64 images)
export const uploadImage = async (path: string, dataUrl: string): Promise<string> => {
    try {
        const storageRef = ref(storage, path);
        await uploadString(storageRef, dataUrl, 'data_url');
        return await getDownloadURL(storageRef);
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};
