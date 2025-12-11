'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // 간단한 하드코딩 비밀번호 (실제 운영 시에는 환경변수나 DB 사용 권장)
        if (password === '0423') { // 소래포구 성당 설립일 등 의미있는 숫자로 변경 가능
            // 로그인 성공 시 세션 스토리지에 저장 (간이 인증)
            sessionStorage.setItem('isAdmin', 'true');
            router.push('/admin');
        } else {
            setError('비밀번호가 올바르지 않습니다.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">관리자 로그인</h1>
                    <p className="text-gray-600 mt-2">관리자 암호를 입력해주세요.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 outline-none transition"
                            autoFocus
                        />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition transform active:scale-95"
                    >
                        접속하기
                    </button>
                </form>
            </div>
        </div>
    );
}
