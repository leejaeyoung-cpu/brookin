'use client';

import { Bell, Book, Calendar, Camera, Church, Home, Users, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AppHomePage() {
    const [installPrompt, setInstallPrompt] = useState<any>(null);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        // PWA 설치 프롬프트 감지
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setInstallPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // 이미 설치되었는지 확인
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInstalled(true);
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!installPrompt) return;

        installPrompt.prompt();
        const { outcome } = await installPrompt.userChoice;

        if (outcome === 'accepted') {
            setInstallPrompt(null);
            setIsInstalled(true);
        }
    };

    const recentNotifications = [
        {
            id: 1,
            type: '주보',
            title: '대림 제3주일 주보',
            date: '2025-12-15',
            image: 'https://via.placeholder.com/400x200/FEE500/3C1E1E?text=주보',
        },
        {
            id: 2,
            type: '공지',
            title: '성탄 미사 시간 안내',
            date: '2025-12-10',
            image: 'https://via.placeholder.com/400x200/E8F5E9/00C851?text=성탄',
        },
    ];

    const quickActions = [
        { icon: Book, label: '주보', href: '/bulletin', color: 'bg-yellow-100 text-yellow-700' },
        { icon: Calendar, label: '미사 시간', href: '/mass-schedule', color: 'bg-blue-100 text-blue-700' },
        { icon: Camera, label: '사진첩', href: '/gallery', color: 'bg-purple-100 text-purple-700' },
        { icon: Users, label: '단체/모임', href: '/groups', color: 'bg-green-100 text-green-700' },
        { icon: Church, label: '성당 소개', href: '/about', color: 'bg-red-100 text-red-700' },
        { icon: MapPin, label: '오시는 길', href: '/location', color: 'bg-orange-100 text-orange-700' },
    ];

    return (
        <div className="min-h-screen bg-[var(--background)] pb-20">
            {/* Header */}
            <header className="bg-gradient-to-r from-[var(--kakao-yellow)] to-[var(--kakao-yellow-dark)] text-[var(--kakao-brown)] py-6 px-4 shadow-md">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-16 h-16 bg-[var(--kakao-brown)] rounded-full flex items-center justify-center">
                            <Church className="w-10 h-10 text-[var(--kakao-yellow)]" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">소래포구 성당</h1>
                            <p className="text-sm opacity-80">천주교 인천교구</p>
                        </div>
                    </div>

                    {!isInstalled && installPrompt && (
                        <button
                            onClick={handleInstallClick}
                            className="w-full bg-[var(--kakao-brown)] text-[var(--kakao-yellow)] px-4 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-opacity-90 transition"
                        >
                            <Home className="w-5 h-5" />
                            <span>앱을 홈 화면에 추가하기</span>
                        </button>
                    )}
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
                {/* 최신 알림 */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center space-x-2">
                            <Bell className="w-6 h-6" />
                            <span>최신 소식</span>
                        </h2>
                        <Link href="/notifications" className="text-sm text-[var(--kakao-brown)] font-medium">
                            전체보기 →
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {recentNotifications.map((notification) => (
                            <div key={notification.id} className="kakao-card cursor-pointer">
                                <img
                                    src={notification.image}
                                    alt={notification.title}
                                    className="w-full h-48 object-cover rounded-lg mb-3"
                                />
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className={`kakao-badge ${notification.type === '주보' ? 'primary' : 'info'
                                        }`}>
                                        {notification.type}
                                    </span>
                                    <span className="text-sm text-[var(--text-secondary)]">{notification.date}</span>
                                </div>
                                <h3 className="font-bold text-[var(--text-primary)]">{notification.title}</h3>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 빠른 실행 */}
                <section>
                    <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">메뉴</h2>

                    <div className="grid grid-cols-3 gap-4">
                        {quickActions.map((action, index) => (
                            <Link key={index} href={action.href}>
                                <div className="kakao-card text-center hover:shadow-lg transition cursor-pointer p-4">
                                    <div className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                                        <action.icon className="w-7 h-7" />
                                    </div>
                                    <p className="text-sm font-medium text-[var(--text-primary)]">{action.label}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 미사 시간 (간략) */}
                <section className="kakao-card bg-gradient-to-br from-blue-50 to-purple-50">
                    <h3 className="font-bold text-[var(--text-primary)] mb-3 flex items-center space-x-2">
                        <Calendar className="w-5 h-5" />
                        <span>미사 시간</span>
                    </h3>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-[var(--text-secondary)]">주일 미사</span>
                            <span className="font-medium text-[var(--text-primary)]">09:00, 11:00, 16:00</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[var(--text-secondary)]">평일 미사</span>
                            <span className="font-medium text-[var(--text-primary)]">월/수/금 10:00</span>
                        </div>
                        <Link href="/mass-schedule" className="block text-center text-[var(--kakao-brown)] font-medium mt-3">
                            전체 시간표 보기 →
                        </Link>
                    </div>
                </section>

                {/* 성당 정보 */}
                <section className="kakao-card">
                    <h3 className="font-bold text-[var(--text-primary)] mb-3 flex items-center space-x-2">
                        <MapPin className="w-5 h-5" />
                        <span>오시는 길</span>
                    </h3>

                    <p className="text-sm text-[var(--text-secondary)] mb-2">
                        인천광역시 남동구 장도로 18-2
                    </p>
                    <p className="text-sm text-[var(--text-secondary)] mb-3">
                        전화: 032-123-4567
                    </p>

                    <Link href="/location">
                        <button className="w-full bg-[var(--kakao-yellow)] text-[var(--kakao-brown)] py-2 rounded-lg font-medium hover:bg-[var(--kakao-yellow-dark)] transition">
                            지도에서 보기
                        </button>
                    </Link>
                </section>
            </main>

            {/* 관리자 링크 (개발용) */}
            <div className="fixed bottom-4 right-4">
                <Link href="/">
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm shadow-lg hover:bg-gray-700 transition">
                        관리자 →
                    </button>
                </Link>
            </div>
        </div>
    );
}
