'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Link as LinkIcon, MoreVertical, FileText, Video } from 'lucide-react';
import { useNewsStore } from '@/stores/newsStore';
import NewsEditor from '@/components/NewsEditor';
import { toast } from 'react-hot-toast';
import { News } from '@/types/content';

export default function NewsManagePage() {
    const { newsList, addNews, updateNews, deleteNews, loadNews } = useNewsStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingNews, setEditingNews] = useState<News | null>(null);

    useEffect(() => {
        loadNews();
    }, [loadNews]);

    const filteredNews = newsList.filter(news =>
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreate = () => {
        setEditingNews(null);
        setIsEditorOpen(true);
    };

    const handleEdit = (news: News) => {
        setEditingNews(news);
        setIsEditorOpen(true);
    };

    const handleSave = async (data: any) => {
        if (editingNews) {
            await updateNews(editingNews.id, data);
        } else {
            await addNews(data);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
            try {
                await deleteNews(id);
                toast.success('삭제되었습니다.');
            } catch (error) {
                toast.error('삭제에 실패했습니다.');
            }
        }
    };

    const copyLink = (id: string) => {
        const url = `${window.location.origin}/news/${id}`;
        navigator.clipboard.writeText(url);
        toast.success('링크가 복사되었습니다!');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">소식 관리</h1>
                    <p className="text-gray-500 mt-1">주보, 공지사항, 영상을 관리하세요.</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2 shadow-sm hover:shadow-md"
                >
                    <Plus className="w-5 h-5" />
                    새 소식 작성
                </button>
            </div>

            {/* Search & Filter */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="제목이나 내용으로 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-100 transition outline-none text-gray-700"
                    />
                </div>
            </div>

            {/* News List (Table) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">미디어</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">제목 / 내용</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-32">작성일</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-40 text-right">관리</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredNews.length > 0 ? (
                            filteredNews.map((news) => (
                                <tr key={news.id} className="hover:bg-gray-50 transition group">
                                    <td className="px-6 py-4 align-top">
                                        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center border border-gray-200">
                                            {news.imageUrl ? (
                                                <img src={news.imageUrl} alt="" className="w-full h-full object-cover" />
                                            ) : news.videoUrl ? (
                                                <Video className="w-5 h-5 text-gray-400" />
                                            ) : (
                                                <FileText className="w-5 h-5 text-gray-400" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 align-top">
                                        <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition">{news.title}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-2">{news.content}</p>
                                    </td>
                                    <td className="px-6 py-4 align-top text-sm text-gray-500">
                                        {new Date(news.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 align-top text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => copyLink(news.id)}
                                                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                                                title="링크 복사"
                                            >
                                                <LinkIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(news)}
                                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                title="수정"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(news.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                                title="삭제"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                                    {searchTerm ? '검색 결과가 없습니다.' : '등록된 소식이 없습니다.'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <NewsEditor
                isOpen={isEditorOpen}
                onClose={() => setIsEditorOpen(false)}
                onSave={handleSave}
                initialData={editingNews}
            />
        </div>
    );
}
