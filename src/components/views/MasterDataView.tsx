import React, { useState } from 'react';

export const MasterDataView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kamar' | 'program' | 'rekening'>('kamar');

  const dormRooms = [
    { name: 'Asrama Abu Bakar - Kamar 01', capacity: 16, occupied: 15, musyrif: 'Ust. Muhammad Wildan, Lc.' },
    { name: 'Asrama Abu Bakar - Kamar 02', capacity: 16, occupied: 14, musyrif: 'Ust. Muhammad Wildan, Lc.' },
    { name: 'Asrama Abu Bakar - Kamar 03', capacity: 16, occupied: 16, musyrif: 'Ust. Farhan Abu Maryam' },
    { name: 'Asrama Umar bin Khattab - Kamar 04', capacity: 12, occupied: 10, musyrif: 'Ust. Zulfikar, S.Pd' },
    { name: 'Asrama Khadijah - Kamar 01 (Putri)', capacity: 18, occupied: 16, musyrif: 'Ustadzah Salma Basalamah' },
    { name: 'Asrama Khadijah - Kamar 02 (Putri)', capacity: 18, occupied: 15, musyrif: 'Ustadzah Salma Basalamah' }
  ];

  const donationPrograms = [
    { code: 'PRG-01', name: 'Zakat Mal & Penghasilan', type: 'Zakat Wajib', target: 'Mustahik 8 Asnaf' },
    { code: 'PRG-02', name: 'Orang Tua Asuh Santri (OTA)', type: 'Infaq Terikat', target: 'Pendidikan & Saku Santri' },
    { code: 'PRG-03', name: 'Wakaf Fasilitas Sumur Bor', type: 'Wakaf Produktif', target: 'Sanitasi Asrama Putri' },
    { code: 'PRG-04', name: 'Infaq Logistik Dapur Berkah', type: 'Infaq Operasional', target: 'Konsumsi Harian Santri' },
    { code: 'PRG-05', name: 'Beasiswa Sanad Tahfidz', type: 'Infaq Terikat', target: 'Santri Mutqin 30 Juz' }
  ];

  const bankAccounts = [
    { bank: 'Bank Syariah Indonesia (BSI)', noRek: '700-1234-567', atasNama: 'Yayasan Al Irsyad Darul Aitam (Operasional)', status: 'Utama' },
    { bank: 'Bank Muamalat Indonesia', noRek: '101-0987-654', atasNama: 'Yayasan Al Irsyad Darul Aitam (ZISWAF)', status: 'Khusus Zakat' },
    { bank: 'BCA Syariah', noRek: '088-7654-321', atasNama: 'Yayasan Al Irsyad Darul Aitam (Wakaf)', status: 'Wakaf Tunai' }
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6 max-w-[1600px] mx-auto w-full">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col gap-1">
          <nav className="flex items-center gap-1.5 text-on-surface-variant text-xs tracking-wide">
            <span className="hover:text-primary cursor-pointer transition-colors">Panel Pengurus</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Administrasi &amp; Sistem</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-semibold">Master Data</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-[28px] font-bold text-on-surface tracking-tight">
                  Master Data Pengaturan Lembaga
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  Sistem Terkonfigurasi
                </span>
              </div>
              <p className="text-sm text-on-surface-variant max-w-4xl">
                Parameter data kamar asrama santri, program donasi syariah, dan rekening bank penampung resmi yayasan.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-surface-container">
          <button
            onClick={() => setActiveTab('kamar')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'kamar' ? 'border-primary text-primary' : 'border-transparent text-outline'
            }`}
          >
            Kamar &amp; Asrama ({dormRooms.length})
          </button>
          <button
            onClick={() => setActiveTab('program')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'program' ? 'border-primary text-primary' : 'border-transparent text-outline'
            }`}
          >
            Program ZISWAF ({donationPrograms.length})
          </button>
          <button
            onClick={() => setActiveTab('rekening')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'rekening' ? 'border-primary text-primary' : 'border-transparent text-outline'
            }`}
          >
            Rekening Bank ({bankAccounts.length})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'kamar' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dormRooms.map((room, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs">
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-sm text-on-surface">{room.name}</h4>
                  <span className="text-[11px] font-mono font-bold text-primary">
                    {room.occupied}/{room.capacity}
                  </span>
                </div>
                <div className="mt-3 space-y-2 text-xs">
                  <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(room.occupied / room.capacity) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-outline text-[11px]">
                    <span>Musyrif Asrama:</span>
                    <span className="font-medium text-on-surface">{room.musyrif}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'program' && (
          <div className="bg-surface-container-lowest rounded-2xl border border-surface-container overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container text-on-surface-variant text-[11px] uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Kode</th>
                  <th className="py-3 px-4">Nama Program</th>
                  <th className="py-3 px-4">Jenis Akad</th>
                  <th className="py-3 px-4">Peruntukan Dana</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container/60 text-on-surface">
                {donationPrograms.map((prg) => (
                  <tr key={prg.code} className="hover:bg-surface-container-low/60">
                    <td className="py-3 px-4 font-mono font-bold text-primary">{prg.code}</td>
                    <td className="py-3 px-4 font-semibold">{prg.name}</td>
                    <td className="py-3 px-4 text-outline">{prg.type}</td>
                    <td className="py-3 px-4 text-on-surface-variant">{prg.target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'rekening' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bankAccounts.map((acc, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-primary">{acc.bank}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container-highest text-primary font-semibold">
                    {acc.status}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container">
                  <span className="text-[10px] text-outline uppercase block">Nomor Rekening Giro</span>
                  <span className="font-mono text-base font-bold text-on-surface">{acc.noRek}</span>
                </div>
                <span className="text-[11px] text-on-surface-variant block">a.n. {acc.atasNama}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
