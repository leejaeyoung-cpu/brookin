'use client';

import { useState, useEffect } from 'react';
import { X, Save, Trash2 } from 'lucide-react';
import ImageUploader from './ImageUploader';
import VideoUploader from './VideoUploader';
import { toast } from 'react-hot-toast';
import { News } from '@/types/content';

interface NewsEditorProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => Promise<void>;
    initialData?: News | null;
}

export default function NewsEditor({ isOpen, onClose, onSave, initialData }: NewsEditorProps) {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        imageUrl: '',
        videoUrl: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                content: initialData.content,
                imageUrl: initialData.imageUrl || '',
                videoUrl: initialData.videoUrl || ''
            });
        } else {
            setFormData({ title: '', content: '', imageUrl: '', videoUrl: '' });
        }
    }, [initialData, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.content.trim()) {
            toast.error('제목과 내용을 입력해주세요.');
            return;
        }

        setIsSubmitting(true);
        try {
            console.log('Submitting data:', formData); // Debug log
            await onSave(formData);
            toast.success(initialData ? '수정되었습니다.' : '등록되었습니다.');
            onClose();
        } catch (error) {
            console.error('Save failed:', error);
            toast.error('저장에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
                <div className="flex items-center justify-between p-8 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {initialData ? '소식 수정' : '새 소식 작성'}
                    </h2>
                    <button onClick={onClose} className="p-3 hover:bg-gray-100 rounded-full transition">
                        <X className="w-8 h-8 text-gray-500" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    <div>
                        <label className="block text-lg font-bold text-gray-800 mb-3">제목</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-6 py-4 text-lg rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition outline-none"
                            placeholder="제목을 입력하세요"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-bold text-gray-800 mb-3">내용</label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className="w-full px-6 py-4 text-lg rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition outline-none min-h-[300px] resize-none leading-relaxed"
                            placeholder="내용을 입력하세요"
                        />
                    </div>

                    <div className="space-y-8 pt-6 border-t border-gray-100">
                        <ImageUploader
                            value={formData.imageUrl}
                            onChange={(val) => setFormData({ ...formData, imageUrl: val })}
                            label="이미지 첨부"
                        />
                        <VideoUploader
                            value={formData.videoUrl}
                            onChange={(val) => setFormData({ ...formData, videoUrl: val })}
                            label="동영상 첨부"
                        />
                    </div>
                </div>

                <div className="p-8 border-t border-gray-100 bg-gray-50">
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-5 rounded-2xl text-xl font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        {isSubmitting ? (
                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Save className="w-6 h-6" />
                                {initialData ? '수정 완료' : '등록하기'}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
