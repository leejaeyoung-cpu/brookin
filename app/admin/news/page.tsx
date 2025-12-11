'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, Link as LinkIcon, Check, X } from 'lucide-react';
import Link from 'next/link';
import { useNewsStore } from '@/stores/newsStore';
import ImageUploader from '@/components/ImageUploader';
import VideoUploader from '@/components/VideoUploader';

export default function NewsManagePage() {
    const { newsList, addNews, updateNews, deleteNews, loadNews } = useNewsStore();
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        imageUrl: '',
        videoUrl: ''
    });
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        loadNews();
    }, [loadNews]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing && editingId) {
            await updateNews(editingId, formData);
        } else {
            await addNews(formData);
        }
        resetForm();
    };

    const handleEdit = (news: any) => {
        setIsEditing(true);
        setEditingId(news.id);
        setFormData({
            title: news.title,
            content: news.content,
            imageUrl: news.imageUrl || '',
            videoUrl: news.videoUrl || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (confirm('정말 삭제하시겠습니까?')) {
            await deleteNews(id);
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setEditingId(null);
        setFormData({ title: '', content: '', imageUrl: '', videoUrl: '' });
    };

    const copyLink = (id: string) => {
        const url = `${window.location.origin}/news/${id}`;
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="min-h-screen bg-[var(--background)] pb-20">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
                    <Link href="/admin" className="p-2 -ml-2">
                        <ArrowLeft className="w-6 h-6 text-[var(--text-primary)]" />
                    </Link>
                    <h1 className="text-lg font-bold text-[var(--text-primary)]">소식 관리</h1>
                    <div className="w-10" />
                </div>
            </header>

            <main className="max-w-md mx-auto p-4 space-y-6">
                {/* Form */}
                <div className={`kakao-card p-6 transition-colors duration-300 ${isEditing ? 'border-2 border-blue-500 bg-blue-50' : ''}`}>
                    <h2 className="text-lg font-bold mb-4 flex items-center justify-between">
                        <div className="flex items-center">
                            {isEditing ? <Edit className="w-5 h-5 mr-2 text-blue-500" /> : <Plus className="w-5 h-5 mr-2 text-blue-500" />}
                            {isEditing ? '소식 수정 중...' : '새 소식 작성'}
                        </div>
                        {isEditing && (
                            <button
                                onClick={resetForm}
                                className="text-sm text-gray-500 hover:text-gray-700 underline"
                            >
                                수정 취소
                            </button>
                        )}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">제목</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="kakao-input"
                                placeholder="제목을 입력하세요"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">내용</label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                className="kakao-input min-h-[100px]"
                                placeholder="내용을 입력하세요"
                                required
                            />
                        </div>

                        <ImageUploader
                            value={formData.imageUrl}
                            onChange={(val) => setFormData({ ...formData, imageUrl: val })}
                            label="이미지 첨부 (선택)"
                        />

                        <VideoUploader
                            value={formData.videoUrl}
                            onChange={(val) => setFormData({ ...formData, videoUrl: val })}
                            label="동영상 첨부 (선택)"
                        />

                        <div className="flex space-x-2 pt-2">
                            <button type="submit" className={`kakao-btn flex-1 ${isEditing ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}`}>
                                {isEditing ? '수정 내용 저장' : '등록하기'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* List */}
                <div className="space-y-4">
                    <h3 className="font-bold text-[var(--text-secondary)] px-1">등록된 소식 ({newsList.length})</h3>
                    {newsList.map((news) => (
                        <div key={news.id} className="kakao-card p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg line-clamp-1">{news.title}</h3>
                                <div className="flex space-x-1">
                                    <button onClick={() => handleEdit(news)} className="p-2 text-gray-400 hover:text-blue-500">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(news.id)} className="p-2 text-gray-400 hover:text-red-500">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <p className="text-[var(--text-secondary)] text-sm line-clamp-2 mb-3">
                                {news.content}
                            </p>

                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                                <span className="text-xs text-gray-400">
                                    {new Date(news.createdAt).toLocaleDateString()}
                                </span>
                                <button
                                    onClick={() => copyLink(news.id)}
                                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${copiedId === news.id
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {copiedId === news.id ? (
                                        <>
                                            <Check className="w-3 h-3" />
                                            <span>복사됨</span>
                                        </>
                                    ) : (
                                        <>
                                            <LinkIcon className="w-3 h-3" />
                                            <span>링크 복사</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
