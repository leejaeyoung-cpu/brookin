'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, Bell, Pin, Check, X, Link2 } from 'lucide-react';
import Link from 'next/link';
import { useAnnouncementStore } from '@/stores/announcementStore';
import { Announcement } from '@/types/content';
import ImageUploader from '@/components/ImageUploader';

export default function AnnouncementManagePage() {
    const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement, togglePin, loadAnnouncements } = useAnnouncementStore();
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        type: '공지' as '주보' | '공지' | '부고' | '이벤트',
        isPinned: false,
        imageUrl: '',
        links: [{ label: '', url: '' }],
    });

    useEffect(() => {
        loadAnnouncements();
    }, [loadAnnouncements]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validLinks = formData.links.filter(link => link.url && link.label);

        if (editingId) {
            updateAnnouncement(editingId, { ...formData, links: validLinks });
            setEditingId(null);
        } else {
            addAnnouncement({ ...formData, links: validLinks });
        }

        resetForm();
    };

    const resetForm = () => {
        setFormData({
            title: '',
            content: '',
            type: '공지',
            isPinned: false,
            imageUrl: '',
            links: [{ label: '', url: '' }],
        });
        setShowForm(false);
    };

    const handleEdit = (announcement: Announcement) => {
        setFormData({
            title: announcement.title,
            content: announcement.content,
            type: announcement.type,
            isPinned: announcement.isPinned,
            imageUrl: announcement.imageUrl || '',
            links: announcement.links && announcement.links.length > 0
                ? announcement.links
                : [{ label: '', url: '' }],
        });
        setEditingId(announcement.id);
        setShowForm(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('정말 삭제하시겠습니까?')) {
            deleteAnnouncement(id);
        }
    };

    const sortedAnnouncements = [...announcements].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return b.createdAt - a.createdAt;
    });

    return (
        <div className="min-h-screen bg-[var(--background)]">
            {/* Header */}
            <header className="bg-white border-b border-[var(--border-light)] sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <Link href="/admin" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                                <ArrowLeft className="w-6 h-6" />
                            </Link>
                            <h1 className="text-xl font-bold text-[var(--text-primary)]">공지사항 관리</h1>
                        </div>

                        <button
                            onClick={() => {
                                resetForm();
                                setShowForm(!showForm);
                            }}
                            className="kakao-btn flex items-center space-x-2"
                        >
                            <Plus className="w-5 h-5" />
                            <span>새 공지 작성</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Add/Edit Form */}
                {showForm && (
                    <div className="kakao-card mb-6">
                        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                            {editingId ? '공지 수정' : '새 공지 작성'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                        유형
                                    </label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                                        className="kakao-input"
                                    >
                                        <option value="주보">주보</option>
                                        <option value="공지">공지</option>
                                        <option value="부고">부고</option>
                                        <option value="이벤트">이벤트</option>
                                    </select>
                                </div>

                                <div className="flex items-end">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.isPinned}
                                            onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                                            className="w-5 h-5"
                                        />
                                        <span className="text-sm font-medium text-[var(--text-primary)]">📌 상단 고정</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    제목
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="공지 제목을 입력하세요"
                                    className="kakao-input"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    내용
                                </label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="공지 내용을 입력하세요"
                                    className="kakao-input min-h-[150px]"
                                    rows={6}
                                    required
                                />
                            </div>

                            <ImageUploader
                                value={formData.imageUrl}
                                onChange={(imageData) => setFormData({ ...formData, imageUrl: imageData })}
                                label="이미지 (선택)"
                                maxSizeMB={2}
                            />

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    링크 (선택)
                                </label>
                                <div className="space-y-3">
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            value={formData.links[0]?.label || ''}
                                            onChange={(e) => {
                                                const newLinks = [...formData.links];
                                                newLinks[0] = { ...newLinks[0], label: e.target.value };
                                                setFormData({ ...formData, links: newLinks });
                                            }}
                                            placeholder="링크 제목 (예: 상세 보기)"
                                            className="kakao-input flex-1"
                                        />
                                        <input
                                            type="url"
                                            value={formData.links[0]?.url || ''}
                                            onChange={(e) => {
                                                const newLinks = [...formData.links];
                                                newLinks[0] = { ...newLinks[0], url: e.target.value };
                                                setFormData({ ...formData, links: newLinks });
                                            }}
                                            placeholder="https://example.com"
                                            className="kakao-input flex-1"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <button type="submit" className="kakao-btn flex-1 flex items-center justify-center space-x-2">
                                    <Check className="w-5 h-5" />
                                    <span>{editingId ? '수정하기' : '작성하기'}</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-3 border border-[var(--border-medium)] rounded-xl font-medium hover:bg-[var(--surface-hover)] transition flex-1 flex items-center justify-center space-x-2"
                                >
                                    <X className="w-5 h-5" />
                                    <span>취소</span>
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Announcement List */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-[var(--text-primary)]">
                        전체 공지 ({announcements.length}개)
                    </h2>

                    {announcements.length === 0 ? (
                        <div className="kakao-card text-center py-12">
                            <Bell className="w-16 h-16 text-[var(--text-tertiary)] mx-auto mb-4" />
                            <p className="text-[var(--text-secondary)]">등록된 공지사항이 없습니다.</p>
                            <p className="text-sm text-[var(--text-tertiary)] mt-2">
                                "새 공지 작성" 버튼을 클릭하여 공지를 등록하세요.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {sortedAnnouncements.map((announcement) => (
                                <div key={announcement.id} className={`kakao-card ${announcement.isPinned ? 'border-2 border-[var(--kakao-yellow)]' : ''}`}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                {announcement.isPinned && (
                                                    <Pin className="w-4 h-4 text-[var(--kakao-brown)]" />
                                                )}
                                                <span className={`kakao-badge ${announcement.type === '주보' ? 'primary' :
                                                    announcement.type === '공지' ? 'info' :
                                                        announcement.type === '부고' ? 'warning' : 'success'
                                                    }`}>
                                                    {announcement.type}
                                                </span>
                                                {announcement.isPinned && (
                                                    <span className="text-xs text-[var(--kakao-brown)] font-medium">상단 고정</span>
                                                )}
                                            </div>

                                            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                                                {announcement.title}
                                            </h3>

                                            <p className="text-sm text-[var(--text-secondary)] mb-3 whitespace-pre-wrap">
                                                {announcement.content}
                                            </p>

                                            {announcement.imageUrl && (
                                                <div className="mb-3">
                                                    <img
                                                        src={announcement.imageUrl}
                                                        alt={announcement.title}
                                                        className="w-full max-w-md rounded-lg"
                                                    />
                                                </div>
                                            )}

                                            {announcement.links && announcement.links.length > 0 && (
                                                <div className="flex gap-2">
                                                    {announcement.links.map((link, idx) => (
                                                        <a
                                                            key={idx}
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-sm text-[var(--kakao-brown)] hover:underline flex items-center space-x-1"
                                                        >
                                                            <Link2 className="w-3 h-3" />
                                                            <span>{link.label}</span>
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => togglePin(announcement.id)}
                                                className={`p-2 rounded-lg transition ${announcement.isPinned
                                                    ? 'bg-[var(--kakao-yellow)] text-[var(--kakao-brown)]'
                                                    : 'hover:bg-gray-100 text-gray-400'
                                                    }`}
                                                title={announcement.isPinned ? '고정 해제' : '상단 고정'}
                                            >
                                                <Pin className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(announcement)}
                                                className="p-2 hover:bg-blue-50 rounded-lg transition"
                                                title="수정"
                                            >
                                                <Edit className="w-5 h-5 text-blue-600" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(announcement.id)}
                                                className="p-2 hover:bg-red-50 rounded-lg transition"
                                                title="삭제"
                                            >
                                                <Trash2 className="w-5 h-5 text-red-600" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
