import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FoundationActivity } from '../../types';

export const KegiatanYayasanView: React.FC = () => {
  const { activities, addActivity } = useApp();
  const [modalOpen, setModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2026-10-25');
  const [time, setTime] = useState('08:00 - 11:30 WIB');
  const [location, setLocation] = useState('Aula Utama Darul Aitam');
  const [category, setCategory] = useState<FoundationActivity['category']>('Halaqah Tahfidz');
  const [picUstadz, setPicUstadz] = useState('Ust. Muhammad Wildan, Lc.');
  const [santriParticipantCount, setSantriParticipantCount] = useState<number>(65);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addActivity({
      title,
      date,
      time,
      location,
      category,
      picUstadz,
      santriParticipantCount,
      description,
      status: 'Akan Datang'
    });

    setModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6 max-w-[1600px] mx-auto w-full">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col gap-1">
          <nav className="flex items-center gap-1.5 text-on-surface-variant text-xs tracking-wide">
            <span className="hover:text-primary cursor-pointer transition-colors">Panel Pengurus</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Sosial &amp; Santri</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-semibold">Kegiatan Yayasan</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-[28px] font-bold text-on-surface tracking-tight">
                  Agenda &amp; Kegiatan Santri Yayasan
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  Tarbiyah &amp; Ekstrakurikuler
                </span>
              </div>
              <p className="text-sm text-on-surface-variant max-w-4xl">
                Jadwal pembinaan tahfidz, kajian kitab kuning, ekstrakurikuler sunnah nabawiyah, dan rihlah edukatif santri.
              </p>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="h-11 px-4 bg-primary hover:bg-primary/90 text-on-primary text-sm font-medium rounded-lg shadow-sm flex items-center gap-2 transition-all cursor-pointer self-start lg:self-center"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Tambah Jadwal Kegiatan</span>
            </button>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activities.map((act) => (
            <div
              key={act.id}
              className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-primary font-bold text-xs">
                    {act.category}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      act.status === 'Berjalan'
                        ? 'bg-primary-container text-on-primary-container'
                        : act.status === 'Akan Datang'
                        ? 'bg-secondary-fixed text-on-secondary-fixed'
                        : 'bg-surface-container text-outline'
                    }`}
                  >
                    {act.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-on-surface mt-3">{act.title}</h3>
                <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">{act.description}</p>

                <div className="mt-4 pt-3 border-t border-surface-container space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px] text-primary">calendar_today</span>
                    <span className="font-medium">{act.date} • {act.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                    <span>{act.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px] text-primary">person</span>
                    <span>Pembimbing: <strong>{act.picUstadz}</strong></span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-surface-container flex items-center justify-between text-xs">
                <span className="text-outline">
                  Peserta Terdaftar: <strong className="text-primary font-mono">{act.santriParticipantCount} Santri</strong>
                </span>
                <span className="text-primary font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">done_all</span>
                  Presensi Terbuka
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl border border-surface-container overflow-hidden my-6">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="p-5 bg-surface-container-low border-b border-surface-container flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">event</span>
                  <h3 className="text-base font-bold text-on-surface">Tambah Kegiatan Santri</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-outline cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <div className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-outline mb-1">Nama Kegiatan *</label>
                  <input
                    required
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Rihlah Tadabbur Alam & Ujian Tahfidz"
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-outline mb-1">Kategori</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full h-10 px-2 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none cursor-pointer"
                    >
                      <option value="Halaqah Tahfidz">Halaqah Tahfidz</option>
                      <option value="Kajian & Dakwah">Kajian &amp; Dakwah</option>
                      <option value="Rihlah & Outing">Rihlah &amp; Outing</option>
                      <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                      <option value="Pemeriksaan Medis">Pemeriksaan Medis</option>
                      <option value="Bakti Sosial">Bakti Sosial</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-outline mb-1">Target Peserta (Santri)</label>
                    <input
                      type="number"
                      value={santriParticipantCount}
                      onChange={(e) => setSantriParticipantCount(Number(e.target.value))}
                      className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-outline mb-1">Tanggal</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-outline mb-1">Waktu</label>
                    <input
                      type="text"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-outline mb-1">Lokasi</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-outline mb-1">Ustadz Penanggung Jawab</label>
                  <input
                    type="text"
                    value={picUstadz}
                    onChange={(e) => setPicUstadz(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-outline mb-1">Deskripsi Kegiatan</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none"
                  />
                </div>
              </div>

              <div className="p-5 bg-surface-container-low border-t border-surface-container flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="h-10 px-4 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="h-10 px-5 rounded-lg bg-primary hover:bg-primary/90 text-on-primary font-semibold text-xs shadow-xs cursor-pointer"
                >
                  Simpan Jadwal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
