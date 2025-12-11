'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, FileText, Calendar, Check, X } from 'lucide-react';
import Link from 'next/link';
import { useBulletinStore } from '@/stores/bulletinStore';
import { Bulletin } from '@/types/content';
import ImageUploader from '@/components/ImageUploader';

export default function BulletinManagePage() {
    const { bulletins, addBulletin, updateBulletin, deleteBulletin, loadBulletins } = useBulletinStore();
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        content: '',
        pdfUrl: '',
        thumbnailUrl: '',
    });

    useEffect(() => {
        loadBulletins();
    }, [loadBulletins]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            updateBulletin(editingId, formData);
            setEditingId(null);
        } else {
            addBulletin(formData);
        }
        setFormData({ title: '', date: '', content: '', pdfUrl: '', thumbnailUrl: '' });
        setShowForm(false);
    };

    const handleEdit = (bulletin: Bulletin) => {
        setFormData({
            title: bulletin.title,
            date: bulletin.date,
            content: bulletin.content || '',
            pdfUrl: bulletin.pdfUrl || '',
            thumbnailUrl: bulletin.thumbnailUrl || '',
        });
        setEditingId(bulletin.id);
        setShowForm(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('정말 삭제하시겠습니까?')) {
            deleteBulletin(id);
        }
    };

    const handleCancel = () => {
        setFormData({ title: '', date: '', content: '', pdfUrl: '', thumbnailUrl: '' });
        setEditingId(null);
        setShowForm(false);
    };

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
                            <h1 className="text-xl font-bold text-[var(--text-primary)]">주보 관리</h1>
                        </div>

                        <button
                            onClick={() => {
                                handleCancel();
                                setShowForm(!showForm);
                            }}
                            className="kakao-btn flex items-center space-x-2"
                        >
                            <Plus className="w-5 h-5" />
                            <span>새 주보 추가</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Add/Edit Form */}
                {showForm && (
                    <div className="kakao-card mb-6">
                        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                            {editingId ? '주보 수정' : '새 주보 추가'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    제목
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="예: 대림 제3주일 주보"
                                    className="kakao-input"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    날짜
                                </label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="kakao-input"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    내용 (간단 요약)
                                </label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="이번 주 주요 일정 및 공지사항"
                                    className="kakao-input min-h-[100px]"
                                    rows={4}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    PDF URL (선택)
                                </label>
                                <input
                                    type="url"
                                    value={formData.pdfUrl}
                                    onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                                    placeholder="https://example.com/bulletin.pdf"
                                    className="kakao-input"
                                />
                            </div>

                            <ImageUploader
                                value={formData.thumbnailUrl}
                                onChange={(imageData) => setFormData({ ...formData, thumbnailUrl: imageData })}
                                label="썸네일 이미지 (선택)"
                                maxSizeMB={2}
                            />

                            <div className="flex space-x-3">
                                <button type="submit" className="kakao-btn flex-1 flex items-center justify-center space-x-2">
                                    <Check className="w-5 h-5" />
                                    <span>{editingId ? '수정하기' : '추가하기'}</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-6 py-3 border border-[var(--border-medium)] rounded-xl font-medium hover:bg-[var(--surface-hover)] transition flex-1 flex items-center justify-center space-x-2"
                                >
                                    <X className="w-5 h-5" />
                                    <span>취소</span>
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Bulletin List */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-[var(--text-primary)]">
                        전체 주보 ({bulletins.length}개)
                    </h2>

                    {bulletins.length === 0 ? (
                        <div className="kakao-card text-center py-12">
                            <FileText className="w-16 h-16 text-[var(--text-tertiary)] mx-auto mb-4" />
                            <p className="text-[var(--text-secondary)]">등록된 주보가 없습니다.</p>
                            <p className="text-sm text-[var(--text-tertiary)] mt-2">
                                "새 주보 추가" 버튼을 클릭하여 주보를 등록하세요.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {bulletins.map((bulletin) => (
                                <div key={bulletin.id} className="kakao-card">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <Calendar className="w-5 h-5 text-[var(--kakao-brown)]" />
                                                <span className="text-sm text-[var(--text-secondary)]">
                                                    {bulletin.date}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                                                {bulletin.title}
                                            </h3>
                                            {bulletin.content && (
                                                <p className="text-sm text-[var(--text-secondary)] mb-3 whitespace-pre-wrap">
                                                    {bulletin.content}
                                                </p>
                                            )}
                                            {bulletin.pdfUrl && (
                                                <a
                                                    href={bulletin.pdfUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-[var(--kakao-brown)] hover:underline"
                                                >
                                                    📄 PDF 보기
                                                </a>
                                            )}
                                        </div>

                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEdit(bulletin)}
                                                className="p-2 hover:bg-blue-50 rounded-lg transition"
                                                title="수정"
                                            >
                                                <Edit className="w-5 h-5 text-blue-600" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(bulletin.id)}
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

