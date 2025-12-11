'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FileText,
    Send,
    QrCode,
    LogOut,
    Settings
} from 'lucide-react';
import { clsx } from 'clsx';

export default function AdminSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { name: '대시보드', href: '/admin', icon: LayoutDashboard },
        { name: '소식 관리', href: '/admin/news', icon: FileText },
        { name: '메시지 발송', href: '/admin/messages', icon: Send },
        { name: 'QR 코드', href: '/admin/qr-code', icon: QrCode },
    ];

    return (
        <div className="w-72 bg-white border-r border-gray-200 h-full flex flex-col hidden lg:flex shadow-sm z-10">
            <div className="p-8 border-b border-gray-100">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[var(--kakao-yellow)] rounded-xl flex items-center justify-center text-lg shadow-sm">
                        ⛪
                    </div>
                    소래포구 성당
                </h1>
                <p className="text-sm text-gray-500 mt-2 ml-14 font-medium">관리자 센터</p>
            </div>

            <nav className="flex-1 p-6 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                'flex items-center gap-4 px-6 py-4 rounded-2xl text-base font-bold transition-all duration-200',
                                isActive
                                    ? 'bg-gray-900 text-white shadow-lg transform scale-105'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                            )}
                        >
                            <item.icon className={clsx("w-6 h-6", isActive ? "text-white" : "text-gray-400")} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-gray-100">
                <button
                    onClick={() => {
                        sessionStorage.removeItem('isAdmin');
                        window.location.href = '/admin/login';
                    }}
                    className="flex items-center gap-4 px-6 py-4 rounded-2xl text-base font-bold text-red-600 hover:bg-red-50 w-full transition-colors"
                >
                    <LogOut className="w-6 h-6" />
                    로그아웃
                </button>
            </div>
        </div>
    );
}
