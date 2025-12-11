'use client';

import { Smartphone, Monitor, ArrowRight } from 'lucide-react';

export default function DemoPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 font-sans text-white">
            {/* Header */}
            <div className="max-w-7xl mx-auto text-center mb-16 pt-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl mb-6 shadow-2xl">
                    <span className="text-4xl">⛪</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                    소래포구 성당 알림 시스템
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    신자들을 위한 모바일 주보 서비스와<br className="hidden sm:block" />
                    관리자를 위한 통합 운영 플랫폼을 경험해보세요.
                </p>
            </div>

            {/* Demo Container */}
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-center items-start gap-16 lg:gap-8 xl:gap-16">

                {/* User App Section */}
                <div className="flex flex-col items-center group">
                    <div className="mb-8 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-bold mb-3 border border-blue-500/20">
                            <Smartphone className="w-4 h-4" />
                            신자용 앱
                        </div>
                        <h2 className="text-2xl font-bold mb-2">모바일 주보 & 알림</h2>
                        <p className="text-gray-400 text-sm">
                            주보 열람, 공지사항 확인, 미사 시간 안내 등<br />
                            신자들에게 필요한 정보를 제공합니다.
                        </p>
                    </div>

                    {/* Phone Frame */}
                    <div className="relative transition-transform duration-500 group-hover:-translate-y-4">
                        <div className="absolute -inset-4 bg-blue-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="w-[375px] h-[812px] bg-white rounded-[50px] shadow-2xl overflow-hidden border-[14px] border-gray-900 relative z-10">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[30px] bg-gray-900 rounded-b-[24px] z-50"></div>
                            <iframe
                                src="/"
                                className="w-full h-full border-none bg-white"
                                title="User App"
                            />
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[130px] h-[5px] bg-gray-900 rounded-full opacity-20 z-50"></div>
                        </div>
                    </div>
                </div>

                {/* Arrow (Desktop only) */}
                <div className="hidden lg:flex items-center justify-center h-[800px] text-gray-600">
                    <ArrowRight className="w-12 h-12 opacity-20" />
                </div>

                {/* Admin App Section */}
                <div className="flex flex-col items-center group">
                    <div className="mb-8 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-full text-sm font-bold mb-3 border border-red-500/20">
                            <Monitor className="w-4 h-4" />
                            관리자용 앱
                        </div>
                        <h2 className="text-2xl font-bold mb-2">통합 관리자 센터</h2>
                        <p className="text-gray-400 text-sm">
                            소식 및 주보 등록, 메시지 발송, QR 코드 관리 등<br />
                            성당 운영을 위한 모든 기능을 제공합니다.
                        </p>
                    </div>

                    {/* Phone Frame (Admin is responsive, showing mobile view here) */}
                    <div className="relative transition-transform duration-500 group-hover:-translate-y-4">
                        <div className="absolute -inset-4 bg-red-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="w-[375px] h-[812px] bg-white rounded-[50px] shadow-2xl overflow-hidden border-[14px] border-gray-900 relative z-10">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[30px] bg-gray-900 rounded-b-[24px] z-50"></div>
                            <iframe
                                src="/admin/login"
                                className="w-full h-full border-none bg-gray-50"
                                title="Admin App"
                            />
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[130px] h-[5px] bg-gray-900 rounded-full opacity-20 z-50"></div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="mt-24 text-center text-gray-600 pb-8">
                <p className="text-sm">
                    © 2025 Soraepogu Catholic Church Notification System. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
