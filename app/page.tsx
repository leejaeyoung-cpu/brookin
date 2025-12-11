'use client';

import Link from 'next/link';
import { FileText, Bell, ChevronRight, Calendar, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-sans">
            {/* Sticky Header */}
            <header
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
                    }`}
            >
                <div className="px-6 flex justify-between items-center">
                    <h1 className={`font-bold text-xl transition-colors ${scrolled ? 'text-gray-900' : 'text-white drop-shadow-md'}`}>
                        소래포구 성당
                    </h1>
                    {/* <button className={`p-2 rounded-full ${scrolled ? 'bg-gray-100 text-gray-600' : 'bg-white/20 text-white backdrop-blur-sm'}`}>
            <Bell className="w-5 h-5" />
          </button> */}
                </div>
            </header>

            {/* Hero Section */}
            <div className="relative h-[320px] bg-gray-900 overflow-hidden rounded-b-[40px] shadow-2xl">
                <div className="absolute inset-0">
                    <img
                        src="/church.jpg"
                        alt="Church"
                        className="w-full h-full object-cover opacity-80 scale-105 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium mb-3 border border-white/10">
                        천주교 인천교구
                    </span>
                    <h2 className="text-3xl font-bold mb-2 leading-tight">
                        주님의 평화가<br />함께하시길 빕니다
                    </h2>
                    <p className="text-white/80 text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        인천광역시 남동구 앵고개로 931번길 50
                    </p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="px-6 -mt-8 relative z-10 grid grid-cols-2 gap-4">
                <Link href="/bulletin" className="group">
                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-50 h-full flex flex-col justify-between">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-gray-900 mb-1">주보 보기</h3>
                            <p className="text-xs text-gray-500">이번 주 주보와<br />미사 안내</p>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </Link>

                <Link href="/announcements" className="group">
                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-50 h-full flex flex-col justify-between">
                        <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600 mb-4 group-hover:scale-110 transition-transform">
                            <Bell className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-gray-900 mb-1">공지사항</h3>
                            <p className="text-xs text-gray-500">성당의 새로운<br />소식들</p>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Mass Times (Optional Info) */}
            <div className="px-6 mt-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        미사 시간 안내
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                            <span className="text-gray-600 font-medium">주일미사</span>
                            <span className="text-gray-900 font-bold">10:00 / 17:00</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                            <span className="text-gray-600 font-medium">평일미사</span>
                            <span className="text-gray-900 font-bold">06:30 / 19:30</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                            <span className="text-gray-600 font-medium">토요미사</span>
                            <span className="text-gray-900 font-bold">15:00 (어린이) / 19:00</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-12 text-center text-gray-400 text-xs pb-8">
                <p>© 2025 소래포구 성당. All rights reserved.</p>
            </footer>
        </div>
    );
}
