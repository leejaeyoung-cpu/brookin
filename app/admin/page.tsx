'use client';

import Link from 'next/link';
import { FileText, Send, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-6">
      <div className="max-w-md mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">관리자 모드</h1>
            <p className="text-[var(--text-secondary)]">소래포구 성당</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-500 hover:text-red-500 transition"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>

        {/* Main Menu Grid */}
        <div className="grid grid-cols-1 gap-6">
          {/* 1. 소식 관리 */}
          <Link href="/admin/news">
            <div className="kakao-card hover:bg-blue-50 transition-colors cursor-pointer p-8 flex items-center space-x-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1">소식 관리</h2>
                <p className="text-[var(--text-secondary)]">주보, 공지, 영상 업로드 및 링크 생성</p>
              </div>
            </div>
          </Link>

          {/* 2. 메시지 보내기 */}
          <Link href="/admin/messages">
            <div className="kakao-card hover:bg-[var(--kakao-yellow)] transition-colors cursor-pointer p-8 flex items-center space-x-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Send className="w-8 h-8 text-[var(--text-primary)]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1">메시지 보내기</h2>
                <p className="text-[var(--text-secondary)]">사진 + 내용 + 버튼 2개 구성</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer Info */}
        <div className="text-center text-sm text-gray-400 mt-12">
          관리자 계정으로 로그인 중입니다.
        </div>
      </div>
    </div>
  );
}
