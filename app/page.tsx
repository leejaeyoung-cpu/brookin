'use client';

import { Book, Menu } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">소래포구 성당</h1>
                    <p className="text-gray-600 mt-2">Sorae Port Catholic Church</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 py-12">
                {/* Church Photo */}
                <div className="mb-12">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src="/church.jpg"
                            alt="소래포구 성당"
                            className="w-full h-auto"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {/* 주보 보기 */}
                    <Link href="/bulletin">
                        <button className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition">
                                    <Book className="w-8 h-8 text-blue-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">주보 보기</h2>
                                <p className="text-gray-600 text-center">주간 미사 안내 및 공지사항</p>
                            </div>
                        </button>
                    </Link>

                    {/* 메뉴 보기 */}
                    <Link href="/announcements">
                        <button className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition">
                                    <Menu className="w-8 h-8 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">공지사항</h2>
                                <p className="text-gray-600 text-center">성당 소식 및 알림</p>
                            </div>
                        </button>
                    </Link>
                </div>

                {/* Footer Info */}
                <div className="mt-16 text-center">
                    <div className="inline-block bg-white rounded-xl shadow-md px-8 py-6 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">미사 시간</h3>
                        <div className="space-y-2 text-gray-700">
                            <p><span className="font-medium">주일미사:</span> 오전 10:00, 오후 5:00</p>
                            <p><span className="font-medium">평일미사:</span> 오전 6:30</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
