'use client';

import { useState } from 'react';
import { ArrowLeft, Send, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import ImageUploader from '@/components/ImageUploader';

export default function MessageBuilderPage() {
    const [formData, setFormData] = useState({
        imageUrl: '',
        content: '',
        button1Text: '',
        button1Link: '',
        button2Text: '',
        button2Link: ''
    });

    const handleCopy = () => {
        // 실제 발송 로직은 없으므로 클립보드에 요약 내용 복사
        const summary = `
[메시지 발송 내용]
이미지: ${formData.imageUrl ? '있음' : '없음'}
내용: ${formData.content}
버튼1: ${formData.button1Text} (${formData.button1Link})
버튼2: ${formData.button2Text} (${formData.button2Link})
    `.trim();

        navigator.clipboard.writeText(summary);
        alert('메시지 내용이 클립보드에 복사되었습니다. 카카오톡 채널 관리자 센터에 붙여넣으세요.');
    };

    return (
        <div className="min-h-screen bg-[var(--background)] flex flex-col lg:flex-row">
            {/* Left: Editor */}
            <div className="flex-1 p-6 overflow-y-auto">
                <header className="flex items-center mb-8">
                    <Link href="/admin" className="p-2 -ml-2 mr-2">
                        <ArrowLeft className="w-6 h-6 text-[var(--text-primary)]" />
                    </Link>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">메시지 작성</h1>
                </header>

                <div className="max-w-xl mx-auto space-y-8">
                    {/* 1. Image Section */}
                    <section className="kakao-card p-6">
                        <h2 className="text-lg font-bold mb-4 flex items-center">
                            <ImageIcon className="w-5 h-5 mr-2 text-blue-500" />
                            상단 이미지
                        </h2>
                        <ImageUploader
                            value={formData.imageUrl}
                            onChange={(val) => setFormData({ ...formData, imageUrl: val })}
                            label="이미지 업로드 (권장: 가로형)"
                        />
                    </section>

                    {/* 2. Content Section */}
                    <section className="kakao-card p-6">
                        <h2 className="text-lg font-bold mb-4 flex items-center">
                            <span className="w-5 h-5 mr-2 flex items-center justify-center bg-gray-200 rounded-full text-xs font-bold">T</span>
                            본문 내용
                        </h2>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className="kakao-input min-h-[150px]"
                            placeholder="메시지 내용을 입력하세요. (최대 400자)"
                        />
                        <p className="text-right text-sm text-gray-400 mt-2">
                            {formData.content.length} / 400자
                        </p>
                    </section>

                    {/* 3. Buttons Section */}
                    <section className="kakao-card p-6">
                        <h2 className="text-lg font-bold mb-4 flex items-center">
                            <LinkIcon className="w-5 h-5 mr-2 text-green-500" />
                            링크 버튼 설정
                        </h2>

                        <div className="space-y-4">
                            {/* Button 1 */}
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <h3 className="font-bold text-sm mb-3 text-gray-600">버튼 1</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        value={formData.button1Text}
                                        onChange={(e) => setFormData({ ...formData, button1Text: e.target.value })}
                                        className="kakao-input"
                                        placeholder="버튼 이름 (예: 소식 보기)"
                                    />
                                    <input
                                        type="text"
                                        value={formData.button1Link}
                                        onChange={(e) => setFormData({ ...formData, button1Link: e.target.value })}
                                        className="kakao-input"
                                        placeholder="링크 URL"
                                    />
                                </div>
                            </div>

                            {/* Button 2 */}
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <h3 className="font-bold text-sm mb-3 text-gray-600">버튼 2</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        value={formData.button2Text}
                                        onChange={(e) => setFormData({ ...formData, button2Text: e.target.value })}
                                        className="kakao-input"
                                        placeholder="버튼 이름 (예: 홈페이지)"
                                    />
                                    <input
                                        type="text"
                                        value={formData.button2Link}
                                        onChange={(e) => setFormData({ ...formData, button2Link: e.target.value })}
                                        className="kakao-input"
                                        placeholder="링크 URL"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Right: Preview */}
            <div className="w-full lg:w-[400px] bg-gray-100 p-6 border-l border-gray-200 flex flex-col">
                <h2 className="text-lg font-bold mb-6 text-gray-600 text-center">미리보기</h2>

                {/* KakaoTalk Preview Card */}
                <div className="bg-[#bacee0] p-4 rounded-xl flex-1 overflow-y-auto">
                    <div className="flex items-start space-x-2 mb-4">
                        <div className="w-10 h-10 bg-yellow-400 rounded-xl flex-shrink-0" />
                        <div className="flex-1">
                            <div className="text-xs text-gray-600 mb-1">소래포구 성당</div>
                            <div className="bg-white rounded-lg overflow-hidden shadow-sm max-w-[300px]">
                                {/* Image */}
                                {formData.imageUrl && (
                                    <div className="w-full h-40 bg-gray-100 relative">
                                        <img
                                            src={formData.imageUrl}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-4">
                                    <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                                        {formData.content || '내용을 입력하면 여기에 표시됩니다.'}
                                    </p>
                                </div>

                                {/* Buttons */}
                                {(formData.button1Text || formData.button2Text) && (
                                    <div className="border-t border-gray-100 bg-gray-50">
                                        {formData.button1Text && (
                                            <div className="p-3 text-center border-b border-gray-100 last:border-0">
                                                <span className="text-sm font-bold text-gray-700 block cursor-pointer hover:bg-gray-100 transition">
                                                    {formData.button1Text}
                                                </span>
                                            </div>
                                        )}
                                        {formData.button2Text && (
                                            <div className="p-3 text-center border-b border-gray-100 last:border-0">
                                                <span className="text-sm font-bold text-gray-700 block cursor-pointer hover:bg-gray-100 transition">
                                                    {formData.button2Text}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-6">
                    <button
                        onClick={handleCopy}
                        className="w-full kakao-btn py-4 text-lg font-bold flex items-center justify-center space-x-2"
                    >
                        <Send className="w-5 h-5" />
                        <span>내용 복사하기</span>
                    </button>
                    <p className="text-xs text-center text-gray-500 mt-2">
                        * 실제 발송은 카카오톡 채널 관리자 센터에서 진행해야 합니다.
                    </p>
                </div>
            </div>
        </div>
    );
}
