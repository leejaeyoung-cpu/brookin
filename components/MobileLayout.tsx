'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export default function MobileLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    // 데모 페이지에서는 모바일 프레임 해제 (전체 화면 사용)
    if (pathname === '/demo') {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#f0f2f5] flex justify-center items-center p-0 sm:p-4 md:p-8">
            {/* Phone Frame Container */}
            <div className="w-full max-w-[430px] h-[100dvh] sm:h-auto sm:min-h-[800px] bg-white sm:rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-gray-900 sm:border-[12px]">

                {/* Notch (Desktop only) */}
                <div className="hidden sm:block absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[30px] bg-gray-900 rounded-b-[20px] z-50"></div>

                {/* Content Area */}
                <div className="h-full overflow-y-auto scrollbar-hide bg-white relative">
                    {children}
                </div>

                {/* Home Indicator (Desktop only) */}
                <div className="hidden sm:block absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[140px] h-[5px] bg-gray-900 rounded-full opacity-20 z-50"></div>
            </div>
        </div>
    );
}
