'use client';

import { useState } from 'react';
import QRCode from 'qrcode';
import { Download, QrCode as QrIcon, ExternalLink } from 'lucide-react';

export default function QRCodePage() {
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://your-app-url.com';

    const generateQRCode = async () => {
        try {
            const url = await QRCode.toDataURL(appUrl, {
                width: 512,
                margin: 2,
                color: {
                    dark: '#3C1E1E',
                    light: '#FEE500',
                },
            });
            setQrCodeUrl(url);
        } catch (err) {
            console.error(err);
        }
    };

    const downloadQRCode = () => {
        const link = document.createElement('a');
        link.download = '소래포구성당_앱_QR코드.png';
        link.href = qrCodeUrl;
        link.click();
    };

    return (
        <div className="min-h-screen bg-[var(--background)] py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="kakao-card text-center">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                            📱 소래포구 성당 앱 QR 코드
                        </h1>
                        <p className="text-[var(--text-secondary)]">
                            QR 코드를 스캔하면 앱을 설치할 수 있습니다
                        </p>
                    </div>

                    {!qrCodeUrl ? (
                        <button
                            onClick={generateQRCode}
                            className="kakao-btn mx-auto flex items-center space-x-2"
                        >
                            <QrIcon className="w-5 h-5" />
                            <span>QR 코드 생성</span>
                        </button>
                    ) : (
                        <div className="space-y-6">
                            {/* QR Code */}
                            <div className="bg-[var(--kakao-yellow)] p-8 rounded-2xl inline-block">
                                <img
                                    src={qrCodeUrl}
                                    alt="QR Code"
                                    className="w-64 h-64 mx-auto"
                                />
                            </div>

                            {/* App URL */}
                            <div className="bg-[var(--background)] rounded-xl p-4">
                                <p className="text-sm text-[var(--text-secondary)] mb-2">앱 주소</p>
                                <div className="flex items-center space-x-2">
                                    <code className="flex-1 bg-white px-4 py-2 rounded-lg text-sm text-[var(--text-primary)] border border-[var(--border-light)]">
                                        {appUrl}
                                    </code>
                                    <button
                                        onClick={() => window.open(appUrl, '_blank')}
                                        className="p-2 hover:bg-[var(--surface-hover)] rounded-lg transition"
                                    >
                                        <ExternalLink className="w-5 h-5 text-[var(--text-secondary)]" />
                                    </button>
                                </div>
                            </div>

                            {/* Download Button */}
                            <button
                                onClick={downloadQRCode}
                                className="kakao-btn mx-auto flex items-center space-x-2"
                            >
                                <Download className="w-5 h-5" />
                                <span>QR 코드 다운로드</span>
                            </button>

                            {/* Instructions */}
                            <div className="bg-blue-50 rounded-xl p-6 text-left">
                                <h3 className="font-bold text-[var(--text-primary)] mb-3">
                                    📋 다음카페에 업로드하는 방법
                                </h3>
                                <ol className="space-y-2 text-sm text-[var(--text-secondary)]">
                                    <li className="flex items-start">
                                        <span className="font-bold text-[var(--text-primary)] mr-2">1.</span>
                                        <span>위의 "QR 코드 다운로드" 버튼을 클릭하여 이미지를 저장합니다</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-bold text-[var(--text-primary)] mr-2">2.</span>
                                        <span>다음카페 (http://cafe.daum.net/sorea2009)에 접속합니다</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-bold text-[var(--text-primary)] mr-2">3.</span>
                                        <span>공지사항 게시판에 새 글을 작성합니다</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-bold text-[var(--text-primary)] mr-2">4.</span>
                                        <span>제목: "소래포구 성당 앱 설치 안내" 입력</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-bold text-[var(--text-primary)] mr-2">5.</span>
                                        <span>다운로드한 QR 코드 이미지를 첨부합니다</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-bold text-[var(--text-primary)] mr-2">6.</span>
                                        <span>본문에 설치 안내 문구를 작성합니다</span>
                                    </li>
                                </ol>
                            </div>

                            {/* Sample Text */}
                            <div className="bg-green-50 rounded-xl p-6 text-left">
                                <h3 className="font-bold text-[var(--text-primary)] mb-3">
                                    💬 안내 문구 예시
                                </h3>
                                <div className="bg-white rounded-lg p-4 text-sm text-[var(--text-secondary)] whitespace-pre-wrap border border-[var(--border-light)]">
                                    {`📱 소래포구 성당 공식 앱이 출시되었습니다!

스마트폰으로 QR 코드를 스캔하시면
성당 앱을 바로 설치하실 수 있습니다.

📋 앱 주요 기능:
• 주보 및 공지사항 실시간 알림
• 미사 시간표 확인
• 성당 소식 및 사진첩
• 각종 단체 및 모임 정보

💡 설치 방법:
1. 스마트폰 카메라로 위 QR 코드 스캔
2. 링크 클릭
3. "홈 화면에 추가" 선택
4. 완료!

문의사항은 사무실로 연락주시기 바랍니다.
주님의 평화가 함께하시길 기도합니다.`}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
