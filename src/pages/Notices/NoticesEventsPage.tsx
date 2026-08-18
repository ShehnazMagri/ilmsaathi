import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { NoticeItem, EventItem } from '../../types';
import { Modal } from '../../components/common/Modal';
import { Bell, Calendar, Pin, Plus } from 'lucide-react';

export const NoticesEventsPage: React.FC = () => {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeContent, setNewNoticeContent] = useState('');

  useEffect(() => {
    apiService.getNotices().then(setNotices);
    apiService.getEvents().then(setEvents);
  }, []);

  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    const notice: NoticeItem = {
      id: `ntc-${Date.now()}`,
      title: newNoticeTitle || 'School Announcement',
      category: 'General',
      targetAudience: 'All',
      date: new Date().toISOString().split('T')[0],
      postedBy: 'Principal / Admin',
      content: newNoticeContent || 'Detailed notification text.',
      pinned: true
    };
    setNotices(prev => [notice, ...prev]);
    setIsNoticeModalOpen(false);
    setNewNoticeTitle('');
    setNewNoticeContent('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white">Notice Board & Event Calendar</h1>
          <p className="text-xs text-slate-400 mt-1">Broadcast official announcements, emergency alerts, and track upcoming school events.</p>
        </div>

        <button
          onClick={() => setIsNoticeModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Notice</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Notice Feed */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-400" />
            <span>Active Announcements ({notices.length})</span>
          </h3>

          <div className="space-y-4">
            {notices.map(ntc => (
              <div key={ntc.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl relative overflow-hidden">
                {ntc.pinned && (
                  <div className="absolute top-3 right-3 text-amber-400 flex items-center gap-1 text-[10px] font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                    <Pin className="w-3 h-3" />
                    <span>PINNED</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold">
                    {ntc.category}
                  </span>
                  <span className="text-slate-400">{ntc.date} • Target: {ntc.targetAudience}</span>
                </div>
                <h4 className="text-base font-bold text-white">{ntc.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{ntc.content}</p>
                <p className="text-[10px] text-slate-400">Posted by: <strong>{ntc.postedBy}</strong></p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events Calendar List */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-400" />
            <span>Upcoming School Events</span>
          </h3>

          <div className="space-y-4">
            {events.map(evt => (
              <div key={evt.id} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold">
                    {evt.category}
                  </span>
                  <span className="text-amber-400 font-bold">{evt.date} @ {evt.time}</span>
                </div>
                <h4 className="text-sm font-bold text-white">{evt.title}</h4>
                <p className="text-xs text-slate-400">{evt.description}</p>
                <p className="text-[10px] text-indigo-300 font-semibold">Venue: {evt.venue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={isNoticeModalOpen} onClose={() => setIsNoticeModalOpen(false)} title="Publish Official School Notice">
        <form onSubmit={handlePostNotice} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Notice Headline</label>
            <input
              type="text"
              required
              placeholder="e.g. Science Fair Registration Deadline"
              value={newNoticeTitle}
              onChange={e => setNewNoticeTitle(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Announcement Body</label>
            <textarea
              rows={4}
              required
              placeholder="Detailed notice text..."
              value={newNoticeContent}
              onChange={e => setNewNoticeContent(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
          >
            Broadcast Notice Now
          </button>
        </form>
      </Modal>
    </div>
  );
};
