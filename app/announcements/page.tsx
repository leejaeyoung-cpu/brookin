'use client';

import { useEffect } from 'react';
import { Bell, Pin, Calendar, ArrowLeft, Link2, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useAnnouncementStore } from '@/stores/announcementStore';

export default function AnnouncementsPage() {
    const { announcements, loadAnnouncements } = useAnnouncementStore();

    useEffect(() => {
        loadAnnouncements();
    }, [loadAnnouncements]);

    const sortedAnnouncements = [...announcements].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return b.createdAt - a.createdAt;
    });

    return (
        <div className="min-h-screen bg-[var(--background)] pb-20">
            {/* Header */}
            <header className="bg-gradient-to-r from-[var(--kakao-yellow)] to-[var(--kakao-yellow-dark)] text-[var(--kakao-brown)] py-6 px-4 shadow-md">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center space-x-3 mb-2">
                        <Link href="/" className="hover:opacity-80 transition">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <Bell className="w-8 h-8" />
                        <h1 className="text-2xl font-bold">공지사항</h1>
                    </div>
                    <p className="text-sm opacity-80 ml-14">소래포구 성당 알림</p>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-6">
                {announcements.length === 0 ? (
                    <div className="kakao-card text-center py-12">
                        <Bell className="w-16 h-16 text-[var(--text-tertiary)] mx-auto mb-4" />
                        <p className="text-[var(--text-secondary)]">등록된 공지사항이 없습니다.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {sortedAnnouncements.map((announcement) => (
                            <div key={announcement.id} className={`kakao-card ${announcement.isPinned ? 'border-2 border-[var(--kakao-yellow)] bg-[var(--kakao-yellow)] bg-opacity-5' : ''}`}>
                                {announcement.isPinned && (
                                    <div className="flex items-center space-x-2 mb-3 pb-3 border-b border-[var(--divider)]">
                                        <Pin className="w-4 h-4 text-[var(--kakao-brown)]" />
                                        <span className="text-sm font-bold text-[var(--kakao-brown)]">공지</span>
                                    </div>
                                )}

                                <div className="flex items-center space-x-2 mb-3">
                                    <span className={`kakao-badge ${announcement.type === '주보' ? 'primary' :
                                            announcement.type === '공지' ? 'info' :
                                                announcement.type === '부고' ? 'warning' : 'success'
                                        }`}>
                                        {announcement.type}
                                    </span>
                                    <span className="text-xs text-[var(--text-tertiary)]">
                                        {new Date(announcement.createdAt).toLocaleDateString('ko-KR')}
                                    </span>
                                </div>

                                <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                                    {announcement.title}
                                </h2>

                                {announcement.imageUrl && (
                                    <img
                                        src={announcement.imageUrl}
                                        alt={announcement.title}
                                        className="w-full rounded-lg mb-4"
                                    />
                                )}

                                <p className="text-sm text-[var(--text-secondary)] mb-4 whitespace-pre-wrap">
                                    {announcement.content}
                                </p>

                                {announcement.links && announcement.links.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {announcement.links.map((link, idx) => (
                                            <a
                                                key={idx}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center space-x-2 bg-[var(--kakao-yellow)] text-[var(--kakao-brown)] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[var(--kakao-yellow-dark)] transition"
                                            >
                                                <Link2 className="w-4 h-4" />
                                                <span>{link.label}</span>
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
