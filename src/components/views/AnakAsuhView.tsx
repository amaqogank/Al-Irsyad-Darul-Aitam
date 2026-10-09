import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Santri, CareStatus, OrphanStatus, Gender } from '../../types';
import { SantriDetailModal } from '../modals/SantriDetailModal';
import { SantriFormModal } from '../modals/SantriFormModal';
import { KartuSantriModal } from '../modals/KartuSantriModal';

export const AnakAsuhView: React.FC = () => {
  const { santriList, addSantri, updateSantri, deleteSantri } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCareStatus, setFilterCareStatus] = useState<string>('all');
  const [filterOrphan, setFilterOrphan] = useState<string>('all');
  const [filterGender, setFilterGender] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Modals state
  const [detailModalSantri, setDetailModalSantri] = useState<Santri | null>(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingSantri, setEditingSantri] = useState<Santri | null>(null);
  const [cardModalSantri, setCardModalSantri] = useState<Santri | null>(null);

  // Filtered santri
  const filteredSantri = useMemo(() => {
    return santriList.filter((s) => {
      const matchSearch =
        searchQuery === '' ||
        s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.nis.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.guardianName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.dormRoom.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCare = filterCareStatus === 'all' || s.careStatus === filterCareStatus;
      const matchOrphan = filterOrphan === 'all' || s.orphanStatus === filterOrphan;
      const matchGender = filterGender === 'all' || s.gender === filterGender;

      return matchSearch && matchCare && matchOrphan && matchGender;
    });
  }, [santriList, searchQuery, filterCareStatus, filterOrphan, filterGender]);

  // Statistics
  const totalSantri = santriList.length;
  const mukimCount = santriList.filter((s) => s.careStatus === 'Mukim Asrama (Penuh)').length;
  const nonMukimCount = santriList.filter((s) => s.careStatus === 'Non-Mukim (Binaan Luar)').length;
  const avgJuz = (
    santriList.reduce((acc, curr) => acc + curr.tahfidz.currentJuz, 0) / (totalSantri || 1)
  ).toFixed(1);

  // Export CSV
  const handleExportCsv = () => {
    const headers = [
      'ID',
      'NIS',
      'Nama_Lengkap',
      'Panggilan',
      'Gender',
      'Status_Asuhan',
      'Status_Kepengasuhan',
      'Jenjang_Pendidikan',
      'Sekolah',
      'Kamar_Asrama',
      'Hafalan_Juz',
      'Target_Juz',
      'Status_Mutqin',
      'Nama_Wali',
      'Kontak_Wali',
      'Uang_Saku_Bulanan',
      'Izin_Publikasi_PDP'
    ];

    const rows = filteredSantri.map((s) => [
      s.id,
      s.nis,
      `"${s.fullName}"`,
      `"${s.nickname}"`,
      s.gender,
      s.orphanStatus,
      `"${s.careStatus}"`,
      `"${s.educationLevel}"`,
      `"${s.schoolName}"`,
      `"${s.dormRoom}"`,
      s.tahfidz.currentJuz,
      s.tahfidz.totalTargetJuz,
      `"${s.tahfidz.statusMutqin}"`,
      `"${s.guardianName}"`,
      `"${s.guardianPhone}"`,
      s.monthlyAssistance,
      s.publicConsent ? 'Ya' : 'Tidak'
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Data_Santri_Al_Irsyad_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenAddForm = () => {
    setEditingSantri(null);
    setFormModalOpen(true);
  };

  const handleOpenEditForm = (santri: Santri) => {
    setDetailModalSantri(null);
    setEditingSantri(santri);
    setFormModalOpen(true);
  };

  const handleSaveSantriForm = (data: any, rationale?: string) => {
    if (editingSantri) {
      updateSantri(editingSantri.id, data, rationale);
    } else {
      addSantri(data);
    }
    setFormModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Yakin ingin mengarsipkan / menghapus data santri: ${name}?`)) {
      deleteSantri(id);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6 max-w-[1600px] mx-auto w-full">
        {/* Breadcrumb & Title Bar */}
        <div className="flex flex-col gap-1">
          <nav className="flex items-center gap-1.5 text-on-surface-variant text-xs tracking-wide">
            <span className="hover:text-primary cursor-pointer transition-colors">Panel Pengurus</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Sosial &amp; Santri</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-semibold">Anak Asuh</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-[28px] font-bold text-on-surface tracking-tight">
                  Pengelolaan Data Santri &amp; Anak Asuh
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Verifikasi SPW Kemenag
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary text-xs font-semibold">
                  <span className="material-symbols-outlined text-[14px]">menu_book</span>
                  Halaqah Tahfidz Aktif
                </span>
              </div>
              <p className="text-sm text-on-surface-variant max-w-4xl">
                Sistem database terpadu biodata santri mukim &amp; non-mukim, pemantauan hafalan Al-Qur’an, rekam medis, dan kepatuhan UU Perlindungan Data Pribadi (UU PDP).
              </p>
            </div>

            <div className="flex items-center gap-2.5 self-start lg:self-center shrink-0 no-print">
              <button
                onClick={handleExportCsv}
                className="h-11 px-4 bg-surface-container-lowest hover:bg-surface-container text-on-surface text-sm font-medium rounded-lg shadow-xs border border-surface-container flex items-center gap-2 transition-all cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">download</span>
                <span>Ekspor CSV</span>
              </button>
              <button
                onClick={handleOpenAddForm}
                className="h-11 px-4 bg-primary hover:bg-primary/90 text-on-primary text-sm font-medium rounded-lg shadow-sm flex items-center gap-2 transition-all cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">person_add</span>
                <span>Tambah Santri Baru</span>
              </button>
            </div>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-outline font-semibold block">
                  Total Santri Terdaftar
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono text-2xl font-bold text-on-surface">{totalSantri}</span>
                  <span className="text-xs text-on-surface-variant">Anak Asuh</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">groups</span>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-surface-container/60 text-xs text-on-surface-variant flex items-center justify-between">
              <span>100% Menerima Beasiswa</span>
              <span className="text-primary font-semibold">Aktif</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-outline font-semibold block">
                  Santri Mukim Asrama
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono text-2xl font-bold text-primary">{mukimCount}</span>
                  <span className="text-xs text-on-surface-variant">Tinggal Penuh</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">holiday_village</span>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-surface-container/60 text-xs text-on-surface-variant flex items-center justify-between">
              <span>4 Asrama Putra &amp; Putri</span>
              <span className="font-mono font-medium">{Math.round((mukimCount / (totalSantri || 1)) * 100)}% Kapasitas</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-outline font-semibold block">
                  Santri Binaan Luar
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono text-2xl font-bold text-secondary">{nonMukimCount}</span>
                  <span className="text-xs text-on-surface-variant">Non-Mukim</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">family_restroom</span>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-surface-container/60 text-xs text-on-surface-variant flex items-center justify-between">
              <span>Santunan &amp; Bimbingan Rutin</span>
              <span className="text-secondary font-semibold">Terkontrol</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-outline font-semibold block">
                  Rata-Rata Tahfidz
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono text-2xl font-bold text-primary">{avgJuz}</span>
                  <span className="text-xs text-on-surface-variant">Juz / Santri</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-surface-container-highest text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">auto_stories</span>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-surface-container/60 text-xs text-on-surface-variant flex items-center justify-between">
              <span>94% Ujian Mutqin Lulus</span>
              <span className="text-primary font-semibold">Target 30 Juz</span>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="p-4 bg-surface-container-lowest rounded-2xl shadow-xs border border-surface-container flex flex-col gap-3">
          <div className="flex flex-col md:flex-row gap-2.5 items-stretch md:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                search
              </span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari santri berdasarkan nama, NIS (#AST-xxxx), wali, atau kamar asrama..."
                type="text"
                className="w-full h-11 pl-10 pr-4 bg-surface-container-low focus:bg-surface-container-lowest text-on-surface text-sm rounded-xl border border-transparent focus:border-primary/30 outline-none transition-colors placeholder:text-outline"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl self-end md:self-center">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'table' ? 'bg-surface-container-lowest text-primary shadow-2xs font-bold' : 'text-outline'
                }`}
                title="Tampilan Tabel"
              >
                <span className="material-symbols-outlined text-[20px]">table_rows</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-surface-container-lowest text-primary shadow-2xs font-bold' : 'text-outline'
                }`}
                title="Tampilan Kartu / Grid"
              >
                <span className="material-symbols-outlined text-[20px]">grid_view</span>
              </button>
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <select
              value={filterCareStatus}
              onChange={(e) => setFilterCareStatus(e.target.value)}
              className="h-9 px-3 bg-surface-container-low text-on-surface text-xs font-medium rounded-lg appearance-none cursor-pointer outline-none border border-transparent"
            >
              <option value="all">Semua Status Mukim</option>
              <option value="Mukim Asrama (Penuh)">Mukim Asrama (Penuh)</option>
              <option value="Non-Mukim (Binaan Luar)">Non-Mukim (Binaan Luar)</option>
              <option value="Alumni Binaan">Alumni Binaan</option>
              <option value="Cuti / Karantina">Cuti / Karantina</option>
            </select>

            <select
              value={filterOrphan}
              onChange={(e) => setFilterOrphan(e.target.value)}
              className="h-9 px-3 bg-surface-container-low text-on-surface text-xs font-medium rounded-lg appearance-none cursor-pointer outline-none border border-transparent"
            >
              <option value="all">Semua Status Asuh</option>
              <option value="Yatim">Yatim</option>
              <option value="Piatu">Piatu</option>
              <option value="Yatim Piatu">Yatim Piatu</option>
              <option value="Dhuafa">Dhuafa</option>
            </select>

            <select
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
              className="h-9 px-3 bg-surface-container-low text-on-surface text-xs font-medium rounded-lg appearance-none cursor-pointer outline-none border border-transparent"
            >
              <option value="all">Semua Gender (L/P)</option>
              <option value="Laki-laki">Santri Putra (L)</option>
              <option value="Perempuan">Santri Putri (P)</option>
            </select>

            <div className="ml-auto text-xs text-on-surface-variant flex items-center gap-2">
              <span>Menampilkan: <strong>{filteredSantri.length}</strong> santri</span>
              {(searchQuery || filterCareStatus !== 'all' || filterOrphan !== 'all' || filterGender !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterCareStatus('all');
                    setFilterOrphan('all');
                    setFilterGender('all');
                  }}
                  className="text-primary font-semibold hover:underline cursor-pointer"
                >
                  Reset Filter
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content View: Table Mode */}
        {viewMode === 'table' ? (
          <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-surface-container overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-container text-on-surface-variant text-[11px] uppercase tracking-wider font-semibold select-none">
                  <tr>
                    <th className="py-3 px-4">Santri &amp; NIS</th>
                    <th className="py-3 px-4">Status &amp; Asrama</th>
                    <th className="py-3 px-4">Pendidikan &amp; Sekolah</th>
                    <th className="py-3 px-4">Progres Tahfidz</th>
                    <th className="py-3 px-4">Wali &amp; Kontak</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container/60 text-on-surface">
                  {filteredSantri.map((santri) => (
                    <tr key={santri.id} className="hover:bg-surface-container-low/60 transition-colors">
                      <td className="py-3 px-4 align-middle">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-primary text-on-primary font-bold text-xs flex items-center justify-center shrink-0">
                            {santri.nickname.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-on-surface text-xs leading-snug">
                              {santri.fullName}
                            </span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="font-mono text-[11px] font-bold text-primary">
                                #{santri.id}
                              </span>
                              <span className="text-[10px] text-outline">({santri.gender === 'Laki-laki' ? 'L' : 'P'})</span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface-container-highest text-primary font-medium">
                                {santri.orphanStatus}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 align-middle">
                        <div className="flex flex-col">
                          <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                            santri.careStatus === 'Mukim Asrama (Penuh)' ? 'text-primary' : 'text-secondary'
                          }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            {santri.careStatus}
                          </span>
                          <span className="text-[11px] text-outline mt-0.5">{santri.dormRoom}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4 align-middle">
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-on-surface">{santri.educationLevel}</span>
                          <span className="text-[11px] text-outline">{santri.schoolName}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4 align-middle">
                        <div className="flex flex-col gap-1 max-w-[140px]">
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="font-bold text-primary font-mono">{santri.tahfidz.currentJuz} / {santri.tahfidz.totalTargetJuz} Juz</span>
                            <span className="text-[10px] text-outline font-semibold">{santri.tahfidz.statusMutqin.split(' ')[0]}</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${(santri.tahfidz.currentJuz / santri.tahfidz.totalTargetJuz) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 align-middle">
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-on-surface">{santri.guardianName}</span>
                          <span className="text-[11px] font-mono text-outline">{santri.guardianPhone}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4 align-middle text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setDetailModalSantri(santri)}
                            className="p-1.5 hover:bg-surface-container text-primary rounded-lg transition-colors cursor-pointer"
                            title="Lihat Detail Santri"
                          >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </button>
                          <button
                            onClick={() => handleOpenEditForm(santri)}
                            className="p-1.5 hover:bg-surface-container text-on-surface-variant rounded-lg transition-colors cursor-pointer"
                            title="Edit Data Santri"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                          <button
                            onClick={() => setCardModalSantri(santri)}
                            className="p-1.5 hover:bg-surface-container text-secondary rounded-lg transition-colors cursor-pointer"
                            title="Cetak Kartu Santri"
                          >
                            <span className="material-symbols-outlined text-[18px]">badge</span>
                          </button>
                          <button
                            onClick={() => handleDelete(santri.id, santri.fullName)}
                            className="p-1.5 hover:bg-error-container text-error rounded-lg transition-colors cursor-pointer"
                            title="Hapus / Arsipkan"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-surface-container-low border-t border-surface-container flex items-center justify-between text-xs text-on-surface-variant">
              <span>Total Santri Ditampilkan: <strong>{filteredSantri.length}</strong></span>
              <span>Kepatuhan PSAK 109 &amp; UU PDP Terverifikasi</span>
            </div>
          </div>
        ) : (
          /* Content View: Grid Cards Mode */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredSantri.map((santri) => (
              <div
                key={santri.id}
                className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary text-on-primary font-bold text-base flex items-center justify-center shadow-xs">
                        {santri.nickname.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-on-surface leading-tight">{santri.fullName}</h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-mono text-xs font-bold text-primary">#{santri.id}</span>
                          <span className="text-[10px] text-outline">• {santri.orphanStatus}</span>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        santri.careStatus === 'Mukim Asrama (Penuh)'
                          ? 'bg-primary-container text-on-primary-container'
                          : 'bg-secondary-fixed text-on-secondary-fixed'
                      }`}
                    >
                      {santri.careStatus === 'Mukim Asrama (Penuh)' ? 'Mukim' : 'Binaan'}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between text-on-surface-variant">
                      <span className="text-outline">Asrama:</span>
                      <span className="font-medium text-on-surface">{santri.dormRoom}</span>
                    </div>
                    <div className="flex justify-between text-on-surface-variant">
                      <span className="text-outline">Pendidikan:</span>
                      <span className="font-medium text-on-surface">{santri.educationLevel}</span>
                    </div>
                    <div className="flex justify-between text-on-surface-variant">
                      <span className="text-outline">Wali:</span>
                      <span className="font-medium text-on-surface">{santri.guardianName}</span>
                    </div>

                    {/* Tahfidz Bar */}
                    <div className="pt-2 border-t border-surface-container">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-primary">Hafalan: {santri.tahfidz.currentJuz} / {santri.tahfidz.totalTargetJuz} Juz</span>
                        <span className="text-[10px] text-outline">{santri.tahfidz.statusMutqin}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(santri.tahfidz.currentJuz / santri.tahfidz.totalTargetJuz) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-surface-container flex items-center justify-between">
                  <button
                    onClick={() => setCardModalSantri(santri)}
                    className="text-xs font-semibold text-secondary hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">badge</span>
                    <span>Kartu Santri</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditForm(santri)}
                      className="p-1.5 hover:bg-surface-container text-on-surface-variant rounded-lg cursor-pointer"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button
                      onClick={() => setDetailModalSantri(santri)}
                      className="px-3 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary/90 cursor-pointer shadow-2xs"
                    >
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {detailModalSantri && (
        <SantriDetailModal
          santri={detailModalSantri}
          onClose={() => setDetailModalSantri(null)}
          onEdit={handleOpenEditForm}
          onPrintCard={(s) => {
            setDetailModalSantri(null);
            setCardModalSantri(s);
          }}
        />
      )}

      {/* Add / Edit Form Modal */}
      {formModalOpen && (
        <SantriFormModal
          initialData={editingSantri}
          onClose={() => setFormModalOpen(false)}
          onSave={handleSaveSantriForm}
        />
      )}

      {/* Print ID Card Modal */}
      {cardModalSantri && (
        <KartuSantriModal
          santri={cardModalSantri}
          onClose={() => setCardModalSantri(null)}
        />
      )}
    </div>
  );
};
