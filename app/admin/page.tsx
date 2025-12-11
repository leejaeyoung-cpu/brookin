'use client';

import Link from 'next/link';
import { FileText, Send, Plus, ArrowRight, Users, Bell } from 'lucide-react';
import { useNewsStore } from '@/stores/newsStore';
import { useEffect } from 'react';

export default function AdminDashboard() {
  const { newsList, loadNews } = useNewsStore();

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const recentNews = newsList.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">안녕하세요, 관리자님 👋</h1>
        <p className="text-gray-500 mt-1">오늘도 소래포구 성당의 소식을 전해주세요.</p>
      </div>

      {/* Quick Stats / Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <FileText className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{newsList.length}</span>
          </div>
          <h3 className="font-medium text-gray-700">등록된 소식</h3>
          <Link href="/admin/news" className="text-sm text-blue-600 mt-2 inline-flex items-center hover:underline">
            관리하기 <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600">
              <Send className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-gray-900">-</span>
          </div>
          <h3 className="font-medium text-gray-700">메시지 발송</h3>
          <Link href="/admin/messages" className="text-sm text-blue-600 mt-2 inline-flex items-center hover:underline">
            작성하기 <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-lg text-white">
          <h3 className="font-bold text-lg mb-2">새 소식 작성하기</h3>
          <p className="text-blue-100 text-sm mb-6">주보나 공지사항을 빠르게 등록하세요.</p>
          <Link
            href="/admin/news"
            className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 transition inline-flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" />
            작성 시작
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-lg text-gray-900">최근 등록된 소식</h2>
          <Link href="/admin/news" className="text-sm text-gray-500 hover:text-gray-900">
            전체보기
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {recentNews.length > 0 ? (
            recentNews.map((news) => (
              <div key={news.id} className="p-6 hover:bg-gray-50 transition flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {news.imageUrl ? (
                    <img src={news.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                      <FileText className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900 line-clamp-1">{news.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{news.content}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                  {new Date(news.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-gray-400">
              아직 등록된 소식이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
