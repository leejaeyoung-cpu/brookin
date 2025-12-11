'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Upload, X, Link2, Image as ImageIcon, Eye, Send } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface LinkData {
    label: string;
    url: string;
}

export default function NewMessagePage() {
    const searchParams = useSearchParams();
    const typeParam = searchParams.get('type');

    const [messageType, setMessageType] = useState<string>(typeParam || '주보');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [links, setLinks] = useState<LinkData[]>([
        { label: '', url: '' },
        { label: '', url: '' }
    ]);
    const [showPreview, setShowPreview] = useState(false);

    const messageTypes = ['주보', '공지', '부고', '이벤트'];

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setImagePreview('');
    };

    const handleLinkChange = (index: number, field: 'label' | 'url', value: string) => {
        const newLinks = [...links];
        newLinks[index][field] = value;
        setLinks(newLinks);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 여기서 실제 API 호출 또는 메시지 발송 로직을 구현합니다
        console.log({
            type: messageType,
            title,
            content,
            image,
            links: links.filter(link => link.url && link.label)
        });

        alert('메시지가 발송되었습니다!');
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
                            <h1 className="text-xl font-bold text-[var(--text-primary)]">새 메시지 작성</h1>
                        </div>

                        <div className="flex items-center space-x-3">
                            <button
                                type="button"
                                onClick={() => setShowPreview(!showPreview)}
                                className="flex items-center space-x-2 px-4 py-2 border border-[var(--border-medium)] rounded-xl text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition"
                            >
                                <Eye className="w-5 h-5" />
                                <span>{showPreview ? '편집' : '미리보기'}</span>
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="kakao-btn flex items-center space-x-2"
                            >
                                <Send className="w-5 h-5" />
                                <span>발송하기</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Editor Section */}
                    <div className={showPreview ? 'hidden lg:block' : ''}>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Message Type */}
                            <div className="kakao-card">
                                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-3">
                                    메시지 유형
                                </label>
                                <div className="grid grid-cols-4 gap-3">
                                    {messageTypes.map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setMessageType(type)}
                                            className={`py-3 px-4 rounded-xl font-medium transition ${messageType === type
                                                ? 'bg-[var(--kakao-yellow)] text-[var(--kakao-brown)]'
                                                : 'bg-[var(--background)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Title */}
                            <div className="kakao-card">
                                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-3">
                                    제목
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="메시지 제목을 입력하세요"
                                    className="kakao-input"
                                    required
                                />
                            </div>

                            {/* Content */}
                            <div className="kakao-card">
                                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-3">
                                    내용
                                </label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="메시지 내용을 입력하세요"
                                    className="kakao-input min-h-[200px] resize-y"
                                    required
                                />
                            </div>

                            {/* Image Upload */}
                            <div className="kakao-card">
                                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-3">
                                    이미지
                                </label>

                                {!imagePreview ? (
                                    <div className="border-2 border-dashed border-[var(--border-medium)] rounded-xl p-8 text-center hover:border-[var(--kakao-yellow)] transition">
                                        <input
                                            type="file"
                                            id="image-upload"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                        <label htmlFor="image-upload" className="cursor-pointer">
                                            <div className="w-16 h-16 bg-[var(--background)] rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Upload className="w-8 h-8 text-[var(--text-secondary)]" />
                                            </div>
                                            <p className="text-[var(--text-primary)] font-medium mb-2">
                                                이미지를 업로드하세요
                                            </p>
                                            <p className="text-sm text-[var(--text-secondary)]">
                                                또는 파일을 드래그 앤 드롭하세요
                                            </p>
                                        </label>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full rounded-xl"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Links */}
                            <div className="kakao-card">
                                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-3">
                                    링크 (최대 2개)
                                </label>
                                <div className="space-y-4">
                                    {links.map((link, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <Link2 className="w-5 h-5 text-[var(--text-secondary)]" />
                                                <span className="text-sm font-medium text-[var(--text-secondary)]">
                                                    링크 {index + 1}
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                value={link.label}
                                                onChange={(e) => handleLinkChange(index, 'label', e.target.value)}
                                                placeholder="링크 제목 (예: 주보 보기)"
                                                className="kakao-input"
                                            />
                                            <input
                                                type="url"
                                                value={link.url}
                                                onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                                                placeholder="URL (예: http://cafe.daum.net/sorea2009/...)"
                                                className="kakao-input"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-3 text-sm text-[var(--text-secondary)]">
                                    💡 다음카페 게시글 링크를 붙여넣으세요
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Preview Section */}
                    <div className={!showPreview ? 'hidden lg:block' : ''}>
                        <div className="sticky top-24">
                            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                                📱 카카오톡 미리보기
                            </h3>

                            {/* Kakao Message Preview */}
                            <div className="bg-[#B2C7D9] rounded-3xl p-6 shadow-lg">
                                <div className="bg-white rounded-2xl overflow-hidden shadow-md max-w-sm">
                                    {/* Message Header */}
                                    <div className="bg-[var(--kakao-yellow)] px-4 py-3 flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-[var(--kakao-brown)] rounded-full flex items-center justify-center text-white font-bold">
                                            소
                                        </div>
                                        <div>
                                            <p className="font-semibold text-[var(--kakao-brown)]">소래포구 성당</p>
                                            <p className="text-xs text-[var(--kakao-brown)] opacity-70">
                                                {new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Message Content */}
                                    <div className="p-4">
                                        {imagePreview && (
                                            <img
                                                src={imagePreview}
                                                alt="Message preview"
                                                className="w-full rounded-lg mb-3"
                                            />
                                        )}

                                        <div className="space-y-2">
                                            {title && (
                                                <h4 className="font-bold text-[var(--text-primary)] text-lg">
                                                    {title}
                                                </h4>
                                            )}

                                            {content && (
                                                <p className="text-[var(--text-secondary)] text-sm whitespace-pre-wrap">
                                                    {content}
                                                </p>
                                            )}
                                        </div>

                                        {links.some(link => link.url && link.label) && (
                                            <div className="mt-4 space-y-2">
                                                {links.filter(link => link.url && link.label).map((link, index) => (
                                                    <div
                                                        key={index}
                                                        className="bg-[var(--background)] border border-[var(--border-light)] rounded-lg px-4 py-3 flex items-center justify-between hover:bg-[var(--surface-hover)] transition cursor-pointer"
                                                    >
                                                        <span className="text-sm font-medium text-[var(--text-primary)]">
                                                            {link.label}
                                                        </span>
                                                        <Link2 className="w-4 h-4 text-[var(--text-secondary)]" />
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="mt-4 pt-3 border-t border-[var(--divider)] flex items-center justify-between text-xs text-[var(--text-tertiary)]">
                                            <span className="kakao-badge primary text-xs">{messageType}</span>
                                            <span>천주교 인천교구 소래포구 성당</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Empty State */}
                                {!title && !content && !imagePreview && (
                                    <div className="text-center text-white mt-4">
                                        <p className="text-sm opacity-80">
                                            ← 왼쪽에서 메시지를 작성하면 여기에 미리보기가 표시됩니다
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
