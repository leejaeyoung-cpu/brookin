'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        // 로그인 페이지는 검사 제외
        if (pathname === '/admin/login') {
            setIsAuthorized(true);
            return;
        }

        // 세션 스토리지에서 인증 확인
        const isAdmin = sessionStorage.getItem('isAdmin');
        if (!isAdmin) {
            router.replace('/admin/login');
        } else {
            setIsAuthorized(true);
        }
    }, [pathname, router]);

    if (!isAuthorized) {
        return null; // 인증 확인 전까지 아무것도 보여주지 않음
    }

    return <>{children}</>;
}
