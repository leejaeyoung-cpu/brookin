'use client';

import { useState } from 'react';
import { Send, Image as ImageIcon, Link as LinkIcon, Copy, Info } from 'lucide-react';
import ImageUploader from '@/components/ImageUploader';
import { toast } from 'react-hot-toast';

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
        const summary = `
[메시지 발송 내용]
이미지: ${formData.imageUrl ? '있음' : '없음'}
내용: ${formData.content}
버튼1: ${formData.button1Text} (${formData.button1Link})
버튼2: ${formData.button2Text} (${formData.button2Link})
    `.trim();

        navigator.clipboard.writeText(summary);
        toast.success('메시지 내용이 복사되었습니다!\n카카오톡 채널 관리자 센터에 붙여넣으세요.');
    };

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row gap-6 overflow-hidden">
            {/* Left: Editor (Scrollable) */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-6 pb-20">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">메시지 작성</h1>
                    <p className="text-gray-500 mt-1">카카오톡 알림톡 스타일의 메시지를 만드세요.</p>
                </div>

                {/* 1. Image Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold mb-4 flex items-center text-gray-800">
                        <ImageIcon className="w-5 h-5 mr-2 text-blue-500" />
                        상단 이미지
                    </h2>
                    <ImageUploader
                        value={formData.imageUrl}
                        onChange={(val) => setFormData({ ...formData, imageUrl: val })}
                        label="이미지 업로드 (권장: 800x400, 가로형)"
                    />
                </div>

                {/* 2. Content Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold mb-4 flex items-center text-gray-800">
                        <span className="w-5 h-5 mr-2 flex items-center justify-center bg-gray-200 rounded-full text-xs font-bold text-gray-600">T</span>
                        본문 내용
                    </h2>
                    <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition outline-none min-h-[150px] resize-none"
                        placeholder="메시지 내용을 입력하세요. (최대 400자)"
                    />
                    <p className="text-right text-sm text-gray-400 mt-2">
                        {formData.content.length} / 400자
                    </p>
                </div>

                {/* 3. Buttons Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold mb-4 flex items-center text-gray-800">
                        <LinkIcon className="w-5 h-5 mr-2 text-green-500" />
                        링크 버튼 설정
                    </h2>

                    <div className="space-y-4">
                        {/* Button 1 */}
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-bold text-sm text-gray-700">버튼 1</h3>
                                <span className="text-xs text-gray-400">선택사항</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    value={formData.button1Text}
                                    onChange={(e) => setFormData({ ...formData, button1Text: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm"
                                    placeholder="버튼 이름 (예: 소식 보기)"
                                />
                                <input
                                    type="text"
                                    value={formData.button1Link}
                                    onChange={(e) => setFormData({ ...formData, button1Link: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm"
                                    placeholder="링크 URL"
                                />
                            </div>
                        </div>

                        {/* Button 2 */}
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-bold text-sm text-gray-700">버튼 2</h3>
                                <span className="text-xs text-gray-400">선택사항</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    value={formData.button2Text}
                                    onChange={(e) => setFormData({ ...formData, button2Text: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm"
                                    placeholder="버튼 이름 (예: 홈페이지)"
                                />
                                <input
                                    type="text"
                                    value={formData.button2Link}
                                    onChange={(e) => setFormData({ ...formData, button2Link: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm"
                                    placeholder="링크 URL"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Preview (Sticky) */}
            <div className="w-full lg:w-[400px] flex flex-col h-full bg-gray-50 border-l border-gray-200 -mr-8 pr-8 pl-6 py-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">미리보기</h2>
                    <div className="text-xs text-gray-500 flex items-center bg-white px-2 py-1 rounded-full border border-gray-200">
                        <Info className="w-3 h-3 mr-1" />
                        실제 화면 예시
                    </div>
                </div>

                {/* KakaoTalk Preview Card */}
                <div className="bg-[#bacee0] p-4 rounded-2xl flex-1 overflow-y-auto shadow-inner relative">
                    <div className="flex items-start space-x-2 mb-4">
                        <div className="w-10 h-10 bg-[var(--kakao-yellow)] rounded-[14px] flex-shrink-0 border border-black/5" />
                        <div className="flex-1 max-w-[300px]">
                            <div className="text-xs text-gray-600 mb-1 ml-1">소래포구 성당</div>
                            <div className="bg-white rounded-[14px] overflow-hidden shadow-sm border border-black/5">
                                {/* Image */}
                                {formData.imageUrl && (
                                    <div className="w-full h-40 bg-gray-100 relative border-b border-gray-100">
                                        <img
                                            src={formData.imageUrl}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-4">
                                    <p className="text-[15px] text-gray-900 whitespace-pre-wrap leading-relaxed">
                                        {formData.content || <span className="text-gray-400">내용을 입력하면 여기에 표시됩니다.</span>}
                                    </p>
                                </div>

                                {/* Buttons */}
                                {(formData.button1Text || formData.button2Text) && (
                                    <div className="border-t border-gray-100 bg-gray-50/50">
                                        {formData.button1Text && (
                                            <div className="p-3 text-center border-b border-gray-100 last:border-0 hover:bg-gray-100 cursor-pointer transition">
                                                <span className="text-sm font-medium text-gray-800 block">
                                                    {formData.button1Text}
                                                </span>
                                            </div>
                                        )}
                                        {formData.button2Text && (
                                            <div className="p-3 text-center border-b border-gray-100 last:border-0 hover:bg-gray-100 cursor-pointer transition">
                                                <span className="text-sm font-medium text-gray-800 block">
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
                        className="w-full bg-[var(--kakao-yellow)] text-black py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-[#FDD835] transition shadow-sm hover:shadow-md"
                    >
                        <Copy className="w-5 h-5" />
                        <span>내용 복사하기</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
