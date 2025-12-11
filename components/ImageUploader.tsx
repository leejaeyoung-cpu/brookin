'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
    value: string;
    onChange: (imageData: string) => void;
    label?: string;
    maxSizeMB?: number;
}

export default function ImageUploader({
    value,
    onChange,
    label = "이미지 업로드",
    maxSizeMB = 2
}: ImageUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File) => {
        setError('');

        // Check file type
        if (!file.type.startsWith('image/')) {
            setError('이미지 파일만 업로드 가능합니다.');
            return;
        }

        // Check file size
        const maxSize = maxSizeMB * 1024 * 1024;
        if (file.size > maxSize) {
            setError(`파일 크기는 ${maxSizeMB}MB 이하여야 합니다.`);
            return;
        }

        // Convert to base64
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            onChange(result);
        };
        reader.onerror = () => {
            setError('파일을 읽는 중 오류가 발생했습니다.');
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleRemove = () => {
        onChange('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                {label}
            </label>

            {value ? (
                <div className="relative">
                    <img
                        src={value}
                        alt="Preview"
                        className="w-full max-w-md rounded-lg border border-[var(--border-light)]"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition shadow-lg"
                        title="이미지 제거"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${isDragging
                            ? 'border-[var(--kakao-yellow)] bg-[var(--kakao-yellow)] bg-opacity-10'
                            : 'border-[var(--border-medium)] hover:border-[var(--kakao-brown)] hover:bg-[var(--surface-hover)]'
                        }`}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                    />

                    <ImageIcon className="w-12 h-12 text-[var(--text-tertiary)] mx-auto mb-3" />

                    <p className="text-sm text-[var(--text-secondary)] mb-2">
                        <span className="font-medium text-[var(--kakao-brown)]">클릭하여 업로드</span>
                        {' '}또는 이미지를 드래그하세요
                    </p>

                    <p className="text-xs text-[var(--text-tertiary)]">
                        JPG, PNG, GIF (최대 {maxSizeMB}MB)
                    </p>
                </div>
            )}

            {error && (
                <p className="text-sm text-red-600 mt-2">⚠️ {error}</p>
            )}
        </div>
    );
}
