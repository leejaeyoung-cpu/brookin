'use client';

import { MessageSquare, Calendar, Users, TrendingUp, Plus } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const stats = [
    { label: '이번 달 발송', value: '24', icon: MessageSquare, color: 'text-blue-600' },
    { label: '예약 메시지', value: '3', icon: Calendar, color: 'text-purple-600' },
    { label: '수신 그룹', value: '5', icon: Users, color: 'text-green-600' },
    { label: '평균 도달률', value: '98%', icon: TrendingUp, color: 'text-orange-600' },
  ];

  const recentMessages = [
    {
      id: 1,
      type: '주보',
      title: '대림 제2주일 주보',
      date: '2025-12-08',
      status: '발송완료',
      recipients: 245
    },
    {
      id: 2,
      type: '공지',
      title: '성탄 미사 시간 안내',
      date: '2025-12-05',
      status: '발송완료',
      recipients: 245
    },
    {
      id: 3,
      type: '이벤트',
      title: '청년 성탄 모임 안내',
      date: '2025-12-03',
      status: '발송완료',
      recipients: 89
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="bg-white border-b border-[var(--border-light)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[var(--kakao-yellow)] rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-[var(--kakao-brown)]" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[var(--text-primary)]">소래포구 성당</h1>
                <p className="text-xs text-[var(--text-secondary)]">알림 발송 시스템</p>
              </div>
            </div>

            <nav className="hidden md:flex space-x-6">
              <Link href="/admin" className="text-[var(--text-primary)] font-medium hover:text-[var(--kakao-brown)] transition">
                대시보드
              </Link>
              <Link href="/admin/messages/new" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                메시지 작성
              </Link>
              <Link href="/admin/messages" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                발송 내역
              </Link>
              <Link href="/admin/groups" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                그룹 관리
              </Link>
              <Link href="/admin/bulletin" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                📖 주보 관리
              </Link>
              <Link href="/admin/announcements" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                📢 공지 관리
              </Link>
              <Link href="/admin/settings" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                설정
              </Link>
              <Link href="/admin/qr-code" className="text-[var(--kakao-brown)] font-medium hover:text-[var(--kakao-yellow-dark)] transition">
                📱 QR 코드
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="kakao-card mb-8 bg-gradient-to-r from-[var(--kakao-yellow)] to-[var(--kakao-yellow-dark)] border-none">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-[var(--kakao-brown)] mb-2">
                환영합니다! 👋
              </h2>
              <p className="text-[var(--kakao-brown)] opacity-80">
                새로운 메시지를 작성하거나 발송 내역을 확인하세요.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/admin/qr-code">
                <button className="bg-white bg-opacity-20 text-[var(--kakao-brown)] px-6 py-3 rounded-xl font-semibold hover:bg-opacity-30 transition flex items-center space-x-2 border-2 border-[var(--kakao-brown)]">
                  <span>📱</span>
                  <span>QR 코드 생성</span>
                </button>
              </Link>
              <Link href="/admin/messages/new">
                <button className="bg-white text-[var(--kakao-brown)] px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>새 메시지 작성</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="kakao-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--text-secondary)] text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-[var(--text-primary)]">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-opacity-10 ${stat.color} bg-current flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Messages */}
        <div className="kakao-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[var(--text-primary)]">최근 발송 내역</h3>
            <Link href="/admin/messages" className="text-[var(--kakao-brown)] font-medium hover:underline">
              전체 보기 →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-light)]">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-secondary)]">유형</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-secondary)]">제목</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-secondary)]">발송일</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-secondary)]">수신자</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-secondary)]">상태</th>
                </tr>
              </thead>
              <tbody>
                {recentMessages.map((message) => (
                  <tr key={message.id} className="border-b border-[var(--divider)] hover:bg-[var(--surface-hover)] transition">
                    <td className="py-4 px-4">
                      <span className={`kakao-badge ${message.type === '주보' ? 'primary' :
                        message.type === '공지' ? 'info' :
                          'warning'
                        }`}>
                        {message.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[var(--text-primary)] font-medium">{message.title}</td>
                    <td className="py-4 px-4 text-[var(--text-secondary)]">{message.date}</td>
                    <td className="py-4 px-4 text-[var(--text-secondary)]">{message.recipients}명</td>
                    <td className="py-4 px-4">
                      <span className="kakao-badge success">{message.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Link href="/admin/messages/new?type=주보" className="kakao-card hover:shadow-lg transition cursor-pointer">
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-[var(--kakao-yellow)] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-[var(--kakao-brown)]" />
              </div>
              <h4 className="font-bold text-[var(--text-primary)] mb-2">주보 발송</h4>
              <p className="text-sm text-[var(--text-secondary)]">주일 미사 주보를 발송합니다</p>
            </div>
          </Link>

          <Link href="/admin/messages/new?type=부고" className="kakao-card hover:shadow-lg transition cursor-pointer">
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-600" />
              </div>
              <h4 className="font-bold text-[var(--text-primary)] mb-2">부고 알림</h4>
              <p className="text-sm text-[var(--text-secondary)]">연령회 부고 소식을 전합니다</p>
            </div>
          </Link>

          <Link href="/admin/messages/new?type=이벤트" className="kakao-card hover:shadow-lg transition cursor-pointer">
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="font-bold text-[var(--text-primary)] mb-2">이벤트 안내</h4>
              <p className="text-sm text-[var(--text-secondary)]">행사 및 모임을 안내합니다</p>
            </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[var(--border-light)] mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-[var(--text-secondary)] text-sm">
            <p>© 2025 천주교 인천교구 소래포구 성당. All rights reserved.</p>
            <p className="mt-2">인천광역시 남동구 장도로 18-2</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
