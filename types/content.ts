// Content types for church app

export interface News {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    videoUrl?: string;
    createdAt: number;
}

export interface Bulletin {
    id: string;
    title: string;
    date: string; // YYYY-MM-DD
    pdfUrl?: string;
    thumbnailUrl?: string;
    content?: string; // 간단한 내용
    createdAt: number;
}

export interface Announcement {
    id: string;
    title: string;
    content: string;
    type: '주보' | '공지' | '부고' | '이벤트';
    isPinned: boolean;
    imageUrl?: string;
    links?: Array<{ label: string; url: string }>;
    createdAt: number;
}

export interface GalleryAlbum {
    id: string;
    title: string;
    description: string;
    coverImageUrl: string;
    images: Array<{
        id: string;
        url: string;
        caption?: string;
    }>;
    createdAt: number;
}
