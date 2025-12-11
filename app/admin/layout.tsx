'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const isAdmin = sessionStorage.getItem('isAdmin');
        if (!isAdmin && pathname !== '/admin/login') {
            router.push('/admin/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [router, pathname]);

    if (!isAuthenticated) {
        return null;
    }

    // 로그인 페이지에서는 사이드바 숨김
    if (pathname === '/admin/login') {
        return <div className="min-h-screen bg-gray-50">{children}</div>;
    }

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile Header (Optional, for small screens) */}
                <header className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                    <span className="font-bold text-lg">소래포구 성당 관리자</span>
                    {/* Mobile Menu Button could go here */}
                </header>

                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
