'use client';

import { useEffect } from 'react';
import { Book, Calendar, Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useBulletinStore } from '@/stores/bulletinStore';

export default function BulletinPage() {
    const { bulletins, loadBulletins } = useBulletinStore();

    useEffect(() => {
        loadBulletins();
    }, [loadBulletins]);

    return (
        <div className="min-h-screen bg-[var(--background)] pb-20">
            {/* Header */}
            <header className="bg-gradient-to-r from-[var(--kakao-yellow)] to-[var(--kakao-yellow-dark)] text-[var(--kakao-brown)] py-6 px-4 shadow-md">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center space-x-3 mb-2">
                        <Link href="/" className="hover:opacity-80 transition">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <Book className="w-8 h-8" />
                        <h1 className="text-2xl font-bold">주보</h1>
                    </div>
                    <p className="text-sm opacity-80 ml-14">소래포구 성당 주간 소식</p>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-6">
                {bulletins.length === 0 ? (
                    <div className="kakao-card text-center py-12">
                        <Book className="w-16 h-16 text-[var(--text-tertiary)] mx-auto mb-4" />
                        <p className="text-[var(--text-secondary)]">등록된 주보가 없습니다.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bulletins.map((bulletin) => (
                            <div key={bulletin.id} className="kakao-card cursor-pointer hover:shadow-lg transition">
                                {bulletin.thumbnailUrl && (
                                    <img
                                        src={bulletin.thumbnailUrl}
                                        alt={bulletin.title}
                                        className="w-full h-48 object-cover rounded-lg mb-4"
                                    />
                                )}

                                <div className="flex items-center space-x-2 mb-3">
                                    <Calendar className="w-4 h-4 text-[var(--kakao-brown)]" />
                                    <span className="text-sm text-[var(--text-secondary)]">{bulletin.date}</span>
                                    <span className="kakao-badge primary">주보</span>
                                </div>

                                <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                                    {bulletin.title}
                                </h2>

                                {bulletin.content && (
                                    <p className="text-sm text-[var(--text-secondary)] mb-4 whitespace-pre-wrap">
                                        {bulletin.content}
                                    </p>
                                )}

                                {bulletin.pdfUrl && (
                                    <a
                                        href={bulletin.pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center space-x-2 bg-[var(--kakao-yellow)] text-[var(--kakao-brown)] px-4 py-2 rounded-lg font-medium hover:bg-[var(--kakao-yellow-dark)] transition"
                                    >
                                        <Download className="w-4 h-4" />
                                        <span>PDF 다운로드</span>
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
