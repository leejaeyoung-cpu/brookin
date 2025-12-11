'use client';

import { useState, useRef } from 'react';
import { Upload, X, Film } from 'lucide-react';

interface VideoUploaderProps {
    value: string;
    onChange: (value: string) => void; // Base64 or URL
    label?: string;
    maxSizeMB?: number;
}

export default function VideoUploader({
    value,
    onChange,
    label = "동영상 업로드",
    maxSizeMB = 10 // 영상은 용량이 크므로 기본 10MB
}: VideoUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File) => {
        setError('');

        // Check file type
        if (!file.type.startsWith('video/')) {
            setError('동영상 파일만 업로드 가능합니다.');
            return;
        }

        // Check file size
        const maxSize = maxSizeMB * 1024 * 1024;
        if (file.size > maxSize) {
            setError(`파일 크기는 ${maxSizeMB}MB 이하여야 합니다.`);
            return;
        }

        // Convert to base64 (Note: Large videos might crash browser with Base64. 
        // Ideally should upload to storage directly, but keeping consistent with current pattern for now)
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

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                {label}
            </label>

            {!value ? (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className={`
            border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors
            ${isDragging
                            ? 'border-[var(--kakao-yellow)] bg-yellow-50'
                            : 'border-gray-300 hover:border-[var(--kakao-yellow)] hover:bg-gray-50'
                        }
          `}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="video/*"
                        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                    />
                    <div className="flex flex-col items-center space-y-2 text-gray-500">
                        <Film className="w-8 h-8" />
                        <span className="text-sm">클릭하거나 영상을 드래그하세요</span>
                        <span className="text-xs text-gray-400">(최대 {maxSizeMB}MB)</span>
                    </div>
                </div>
            ) : (
                <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-black">
                    <video
                        src={value}
                        controls
                        className="w-full h-48 object-contain"
                    />
                    <button
                        onClick={() => onChange('')}
                        className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {error && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                    <span className="mr-1">⚠️</span> {error}
                </p>
            )}
        </div>
    );
}
