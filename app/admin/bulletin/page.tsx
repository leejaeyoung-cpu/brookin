'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, FileText, Calendar, Link as LinkIcon, Search } from 'lucide-react';
import { useBulletinStore } from '@/stores/bulletinStore';
import { Bulletin } from '@/types/content';
import ImageUploader from '@/components/ImageUploader';
import { toast } from 'react-hot-toast';

export default function BulletinManagePage() {
    const { bulletins, addBulletin, updateBulletin, deleteBulletin, loadBulletins } = useBulletinStore();
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        content: '',
        pdfUrl: '',
        thumbnailUrl: '',
    });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadBulletins();
    }, [loadBulletins]);

    const filteredBulletins = bulletins.filter(b =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.date.includes(searchTerm)
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateBulletin(editingId, formData);
                toast.success('주보가 수정되었습니다.');
            } else {
                await addBulletin(formData);
                toast.success('새 주보가 등록되었습니다.');
            }
            handleCancel();
        } catch (error) {
            console.error(error);
            toast.error('저장에 실패했습니다.');
        }
    };

    const handleEdit = (bulletin: Bulletin) => {
        setFormData({
            title: bulletin.title,
            date: bulletin.date,
            content: bulletin.content || '',
            pdfUrl: bulletin.pdfUrl || '',
            thumbnailUrl: bulletin.thumbnailUrl || '',
        });
        setEditingId(bulletin.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('정말 삭제하시겠습니까?')) {
            try {
                await deleteBulletin(id);
                toast.success('삭제되었습니다.');
            } catch (error) {
                toast.error('삭제에 실패했습니다.');
            }
        }
    };

    const handleCancel = () => {
        setFormData({ title: '', date: '', content: '', pdfUrl: '', thumbnailUrl: '' });
        setEditingId(null);
        setShowForm(false);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">주보 관리</h1>
                    <p className="text-gray-500 mt-2 text-lg">매주 발행되는 주보를 등록하고 관리하세요.</p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
                    >
                        <Plus className="w-6 h-6" />
                        새 주보 등록
                    </button>
                )}
            </div>

            {/* Form Section */}
            {showForm && (
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 animate-fade-in-down">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        {editingId ? '주보 수정' : '새 주보 등록'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-lg font-bold text-gray-800 mb-3">제목</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="예: 대림 제3주일 주보"
                                    className="w-full px-6 py-4 text-lg rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-bold text-gray-800 mb-3">날짜</label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full px-6 py-4 text-lg rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-lg font-bold text-gray-800 mb-3">내용 (요약)</label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                placeholder="이번 주 주요 일정 및 공지사항"
                                className="w-full px-6 py-4 text-lg rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition outline-none min-h-[150px]"
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-bold text-gray-800 mb-3">PDF URL (선택)</label>
                            <input
                                type="url"
                                value={formData.pdfUrl}
                                onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                                placeholder="https://example.com/bulletin.pdf"
                                className="w-full px-6 py-4 text-lg rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition outline-none"
                            />
                        </div>

                        <ImageUploader
                            value={formData.thumbnailUrl}
                            onChange={(imageData) => setFormData({ ...formData, thumbnailUrl: imageData })}
                            label="썸네일 이미지 (선택)"
                            maxSizeMB={2}
                        />

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition text-lg shadow-md"
                            >
                                {editingId ? '수정 완료' : '등록하기'}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-200 transition text-lg"
                            >
                                취소
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Search */}
            {!showForm && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                        <input
                            type="text"
                            placeholder="제목이나 날짜로 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-16 pr-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-100 transition outline-none text-gray-800 text-lg"
                        />
                    </div>
                </div>
            )}

            {/* List */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-8 py-6 text-sm font-bold text-gray-500 uppercase tracking-wider w-32">썸네일</th>
                            <th className="px-8 py-6 text-sm font-bold text-gray-500 uppercase tracking-wider">제목 / 날짜</th>
                            <th className="px-8 py-6 text-sm font-bold text-gray-500 uppercase tracking-wider w-48 text-right">관리</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredBulletins.length > 0 ? (
                            filteredBulletins.map((bulletin) => (
                                <tr key={bulletin.id} className="hover:bg-gray-50 transition group">
                                    <td className="px-8 py-6 align-top">
                                        <div className="w-20 h-20 rounded-2xl bg-gray-100 overflow-hidden flex items-center justify-center border border-gray-200 shadow-sm">
                                            {bulletin.thumbnailUrl ? (
                                                <img src={bulletin.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <FileText className="w-8 h-8 text-gray-400" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 align-top">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-bold">
                                                {bulletin.date}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">{bulletin.title}</h3>
                                        <p className="text-base text-gray-500 line-clamp-1">{bulletin.content}</p>
                                    </td>
                                    <td className="px-8 py-6 align-top text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <button
                                                onClick={() => handleEdit(bulletin)}
                                                className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition"
                                                title="수정"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(bulletin.id)}
                                                className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                                                title="삭제"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="px-8 py-20 text-center text-gray-400 text-lg">
                                    {searchTerm ? '검색 결과가 없습니다.' : '등록된 주보가 없습니다.'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
