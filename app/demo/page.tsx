'use client';

export default function DemoPage() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
                소래포구 성당 알림 시스템 데모
            </h1>

            <div className="flex flex-col lg:flex-row justify-center items-center gap-12">
                {/* User App */}
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-4 text-blue-600">📱 신자용 앱</h2>
                    <div className="w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden border-[12px] border-gray-900 relative">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[30px] bg-gray-900 rounded-b-[20px] z-50"></div>
                        <iframe
                            src="/"
                            className="w-full h-full border-none"
                            title="User App"
                        />
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[140px] h-[5px] bg-gray-900 rounded-full opacity-20 z-50"></div>
                    </div>
                </div>

                {/* Admin App */}
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-4 text-red-600">🔐 관리자용 앱</h2>
                    <div className="w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden border-[12px] border-gray-900 relative">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[30px] bg-gray-900 rounded-b-[20px] z-50"></div>
                        <iframe
                            src="/admin/login"
                            className="w-full h-full border-none"
                            title="Admin App"
                        />
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[140px] h-[5px] bg-gray-900 rounded-full opacity-20 z-50"></div>
                    </div>
                </div>
            </div>

            <p className="text-center text-gray-500 mt-12">
                * 실제 모바일 환경과 동일한 비율(375x812)로 시뮬레이션된 화면입니다.
            </p>
        </div>
    );
}
