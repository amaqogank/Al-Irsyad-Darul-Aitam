import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { SystemUser } from '../../types';

interface LoginLog {
  id: string;
  name: string;
  email: string;
  role: string;
  timestamp: string;
  ip: string;
  device: string;
  status: 'Berhasil' | 'Gagal (Sandi Salah)';
}

const sampleLoginLogs: LoginLog[] = [
  {
    id: 'LOG-01',
    name: 'Ust. Ahmad Nashir, S.Pd.I',
    email: 'ahmad.nashir@alirsyad-darulaitam.or.id',
    role: 'KETUA YAYASAN',
    timestamp: '13-02-2025 09:14 WIB',
    ip: '180.252.112.44',
    device: 'Chrome on macOS (2FA TOTP)',
    status: 'Berhasil'
  },
  {
    id: 'LOG-02',
    name: 'H. Burhanuddin, SE',
    email: 'burhanuddin.keu@alirsyad-darulaitam.or.id',
    role: 'BENDAHARA 1',
    timestamp: '13-02-2025 08:30 WIB',
    ip: '114.125.42.10',
    device: 'Edge on Windows 11 (2FA TOTP)',
    status: 'Berhasil'
  },
  {
    id: 'LOG-03',
    name: 'Siti Maryam, A.Md',
    email: 'siti.maryam@alirsyad-darulaitam.or.id',
    role: 'BENDAHARA 2 / KASIR',
    timestamp: '12-02-2025 16:45 WIB',
    ip: '182.1.209.88',
    device: 'Firefox on Ubuntu Desktop',
    status: 'Berhasil'
  },
  {
    id: 'LOG-04',
    name: 'Rizka Fadilah, S.Sos',
    email: 'rizka.santri@alirsyad-darulaitam.or.id',
    role: 'STAF PENGASUHAN',
    timestamp: '13-02-2025 07:10 WIB',
    ip: '103.11.135.2',
    device: 'Safari on iPhone 15',
    status: 'Berhasil'
  },
  {
    id: 'LOG-05',
    name: 'Fahmi Azhar',
    email: 'fahmi.kegiatan@alirsyad-darulaitam.or.id',
    role: 'DOKUMENTASI & ACARA',
    timestamp: '28-01-2025 14:02 WIB',
    ip: '36.85.190.12',
    device: 'Chrome on Android',
    status: 'Gagal (Sandi Salah)'
  }
];

export const PenggunaRbacView: React.FC = () => {
  const { users, currentUser, setCurrentUser, addUser, toggleUserStatus } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'KETUA' | 'BENDAHARA' | 'STAF'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL');

  // Modals state
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<'KETUA' | 'BENDAHARA' | 'STAF'>('STAF');
  const [isActive, setIsActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        u.name.toLowerCase().includes(q) ||
        (u.title && u.title.toLowerCase().includes(q)) ||
        u.email.toLowerCase().includes(q) ||
        u.nip.toLowerCase().includes(q);

      const matchesRole = roleFilter === 'ALL' || u.roleCategory === roleFilter;
      const matchesStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'ACTIVE' && u.is_active) ||
        (statusFilter === 'INACTIVE' && !u.is_active);

      return matchesQuery && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  // Counts for Bento Cards
  const countKetua = users.filter((u) => u.roleCategory === 'KETUA' && u.is_active).length;
  const countBendahara = users.filter((u) => u.roleCategory === 'BENDAHARA' && u.is_active).length;
  const countStaf = users.filter((u) => u.roleCategory === 'STAF').length;

  const handleResetFilters = () => {
    setSearchQuery('');
    setRoleFilter('ALL');
    setStatusFilter('ALL');
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullname.trim() || !email.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      let roleTitle: SystemUser['role'] = 'Staf Admin';
      let roleLabel = 'Kesantrian & Acara';

      if (selectedRole === 'KETUA') {
        roleTitle = 'Ketua Yayasan';
        roleLabel = 'Dewan Pengurus';
      } else if (selectedRole === 'BENDAHARA') {
        roleTitle = 'Bendahara';
        roleLabel = 'Kebendaharaan';
      }

      const initials = fullname
        .split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

      addUser({
        name: fullname,
        title: fullname.includes(',') ? fullname.split(',')[1].trim() : '',
        role: roleTitle,
        roleCategory: selectedRole,
        roleLabel,
        nip: `PGR-0${users.length + 1}`,
        email,
        phone: '0812-' + Math.floor(10000000 + Math.random() * 90000000),
        avatarText: initials || 'PG',
        status: isActive ? 'Aktif' : 'Nonaktif',
        is_active: isActive,
        lastActive: 'Baru Diundang',
        ipAddress: '192.168.1.' + Math.floor(20 + Math.random() * 50)
      });

      setIsSubmitting(false);
      setIsInviteModalOpen(false);
      setFullname('');
      setEmail('');
      setSelectedRole('STAF');
      showToast(`Undangan akses resmi berhasil dikirimkan ke surel: ${email}`);
    }, 700);
  };

  const handleSendResetPassword = (user: SystemUser) => {
    showToast(`Tautan reset sandi aman terenkripsi berhasil dikirim ke surel: ${user.email}`);
  };

  const handleToggleUser = (user: SystemUser) => {
    toggleUserStatus(user.id);
    showToast(`Status akun ${user.name} berhasil diubah.`);
  };

  const handleSwitchDemoAccount = (user: SystemUser) => {
    setCurrentUser(user);
    showToast(`Beralih sesi aktif ke: ${user.name} (${user.role})`);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-primary text-on-primary px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-top-4 duration-300 border border-primary-container">
          <span className="material-symbols-outlined text-[20px] text-primary-fixed">check_circle</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="px-4 sm:px-8 py-6 space-y-8 max-w-[1600px] mx-auto w-full">
        {/* Top Ambient Glow & Header Section */}
        <section className="relative">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
            <div className="flex flex-col gap-1 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high w-fit text-primary mb-1">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider">Amanah &amp; Tata Kelola Syariah</span>
              </div>
              <h1 className="text-2xl sm:text-[28px] font-bold text-primary tracking-tight">
                Manajemen Pengguna &amp; Aksesibilitas Peran
              </h1>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Pusat kendali izin operasional pengurus Darul Aitam berbasis prinsip kehati-hatian (<em>saddu dzari'ah</em>) dan pembagian wewenang (<em>Role-Based Access Control</em>). Memastikan akuntabilitas dana yatim dan kerahasiaan data anak asuh.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
              <button
                onClick={() => setIsLogModalOpen(true)}
                className="h-11 px-5 rounded-xl bg-surface-container-lowest text-primary shadow-xs hover:bg-surface-container-high transition-all flex items-center gap-2 text-sm font-semibold border border-surface-container cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">history_toggle_off</span>
                <span>Log Aktivitas Login</span>
              </button>
              <button
                onClick={() => setIsInviteModalOpen(true)}
                className="h-11 px-6 rounded-xl bg-primary text-on-primary shadow-md hover:bg-primary-container transition-all flex items-center gap-2 text-sm font-semibold cursor-pointer"
                id="btn-open-modal"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">person_add</span>
                <span>+ Undang Pengurus Baru</span>
              </button>
            </div>
          </div>
        </section>

        {/* Metric / Role Overview Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Ketua */}
          <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-6 shadow-xs hover:shadow-md transition-shadow border border-surface-container">
            <div className="absolute top-0 right-0 w-32 h-32 -mr-6 -mt-6 rounded-full bg-primary/5 pointer-events-none"></div>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[24px]">gavel</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-[11px] font-semibold tracking-wider uppercase">
                Tingkat 1 - Eksekutif
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-secondary uppercase font-semibold tracking-wider">Peran: Dewan Pengurus</span>
              <h3 className="text-xl font-bold text-on-surface">KETUA YAYASAN</h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-mono text-2xl font-bold text-primary">{countKetua}</span>
                <span className="text-xs text-on-surface-variant font-medium">Pengguna Aktif</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">
              Otorisasi tertinggi persetujuan pengeluaran dana, penerbitan laporan audit syariah, serta penetapan kebijakan santunan.
            </p>
            <div className="mt-4 pt-4 bg-surface-container-low/60 -mx-6 -mb-6 px-6 py-3 flex items-center justify-between border-t border-surface-container">
              <span className="text-[11px] text-outline font-semibold">Tingkat Hak: 100% Full Root</span>
              <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
            </div>
          </div>

          {/* Card 2: Bendahara */}
          <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-6 shadow-xs hover:shadow-md transition-shadow border border-surface-container">
            <div className="absolute top-0 right-0 w-32 h-32 -mr-6 -mt-6 rounded-full bg-secondary-container/20 pointer-events-none"></div>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary-container text-primary-fixed flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[24px]">account_balance</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-semibold tracking-wider uppercase">
                Tingkat 2 - Finansial
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-secondary uppercase font-semibold tracking-wider">Peran: Kebendaharaan</span>
              <h3 className="text-xl font-bold text-on-surface">BENDAHARA &amp; KASIR</h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-mono text-2xl font-bold text-primary">{countBendahara}</span>
                <span className="text-xs text-on-surface-variant font-medium">Pengguna Aktif</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">
              Verifikasi donasi masuk (Bank/Qris/Tunai), pencatatan pos realisasi anggaran RAPB yayasan, dan draf rekonsiliasi kas harian.
            </p>
            <div className="mt-4 pt-4 bg-surface-container-low/60 -mx-6 -mb-6 px-6 py-3 flex items-center justify-between border-t border-surface-container">
              <span className="text-[11px] text-outline font-semibold">Tingkat Hak: Rekening &amp; Kas Terbuka</span>
              <span className="material-symbols-outlined text-secondary text-[18px]">lock_open</span>
            </div>
          </div>

          {/* Card 3: Staf / Pengasuh */}
          <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-6 shadow-xs hover:shadow-md transition-shadow border border-surface-container">
            <div className="absolute top-0 right-0 w-32 h-32 -mr-6 -mt-6 rounded-full bg-surface-container-highest/60 pointer-events-none"></div>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-surface-container-highest text-primary flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[24px]">supervised_user_circle</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-surface-container text-primary text-[11px] font-semibold tracking-wider uppercase">
                Tingkat 3 - Lapangan
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-secondary uppercase font-semibold tracking-wider">Peran: Kesantrian &amp; Acara</span>
              <h3 className="text-xl font-bold text-on-surface">PENGASUH &amp; STAF ADM</h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-mono text-2xl font-bold text-primary">{countStaf}</span>
                <span className="text-xs text-on-surface-variant font-medium">Pengguna Terdaftar</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">
              Entri berkas 120 santri/anak binaan, absensi kajian asrama, log penyaluran natura tanpa akses saldo rekening yayasan.
            </p>
            <div className="mt-4 pt-4 bg-surface-container-low/60 -mx-6 -mb-6 px-6 py-3 flex items-center justify-between border-t border-surface-container">
              <span className="text-[11px] text-outline font-semibold">Tingkat Hak: Terisolir Tanpa Saldo Kas</span>
              <span className="material-symbols-outlined text-outline text-[18px]">visibility_off</span>
            </div>
          </div>
        </section>

        {/* Control & Filter Toolbar */}
        <section className="bg-surface-container-lowest rounded-xl p-5 shadow-xs border border-surface-container">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                search
              </span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-11 pr-4 bg-surface-container-low rounded-xl text-on-surface placeholder:text-outline text-sm outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all border border-transparent"
                id="search-input"
                placeholder="Cari pengurus berdasarkan nama, gelar, atau surel (e.g. Nashir, Burhan)..."
                type="text"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Role Filter Dropdown */}
              <div className="relative min-w-[200px]">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value as any)}
                  className="w-full h-11 px-4 bg-surface-container-low rounded-xl text-on-surface text-sm appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-primary/20 pr-10 font-medium border border-transparent"
                  id="role-filter"
                >
                  <option value="ALL">Semua Peran Operasional</option>
                  <option value="KETUA">Ketua Yayasan</option>
                  <option value="BENDAHARA">Bendahara</option>
                  <option value="STAF">Staf Administrasi &amp; Pengasuh</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[20px]">
                  keyboard_arrow_down
                </span>
              </div>

              {/* Status Filter Dropdown */}
              <div className="relative min-w-[170px]">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="w-full h-11 px-4 bg-surface-container-low rounded-xl text-on-surface text-sm appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-primary/20 pr-10 font-medium border border-transparent"
                  id="status-filter"
                >
                  <option value="ALL">Semua Status</option>
                  <option value="ACTIVE">Aktif (is_active)</option>
                  <option value="INACTIVE">Nonaktif</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[20px]">
                  keyboard_arrow_down
                </span>
              </div>

              {/* Action / Refresh */}
              <button
                onClick={handleResetFilters}
                className="w-11 h-11 rounded-xl bg-surface-container-low text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all flex items-center justify-center cursor-pointer"
                id="btn-reset-filters"
                title="Reset Saringan"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">refresh</span>
              </button>
            </div>
          </div>
        </section>

        {/* User Table Section */}
        <section className="bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container overflow-hidden flex flex-col">
          <div className="px-6 py-4 bg-surface-container-low flex items-center justify-between border-b border-surface-container">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">manage_accounts</span>
              <h2 className="text-base font-bold text-on-surface">Daftar Akun Pengurus Terverifikasi</h2>
            </div>
            <span className="text-[11px] text-secondary uppercase font-semibold tracking-wider">
              Menampilkan {filteredUsers.length} Data Realistis
            </span>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-surface-container-high/60 text-on-surface-variant text-[11px] uppercase tracking-wider">
                  <th className="py-3.5 px-6 font-semibold">Nama Pengguna &amp; Surel</th>
                  <th className="py-3.5 px-4 font-semibold">Peran Struktural</th>
                  <th className="py-3.5 px-4 font-semibold">Cakupan Hak Akses Amanah</th>
                  <th className="py-3.5 px-4 font-semibold">Masuk Terakhir</th>
                  <th className="py-3.5 px-4 font-semibold text-center">Status</th>
                  <th className="py-3.5 px-6 font-semibold text-right">Opsi Pengelolaan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container/60" id="user-table-body">
                {filteredUsers.map((user) => {
                  const isCurrent = user.id === currentUser.id;

                  // Determine badges and colors
                  let roleBadgeStyle = 'bg-surface-container-high text-on-surface-variant';
                  let roleDotStyle = 'bg-outline';
                  let roleIcon = 'family_restroom';
                  let scopeDesc = 'Data Santri & Perkembangan Anak (Tanpa Akses Saldo Kas)';

                  if (user.roleCategory === 'KETUA') {
                    roleBadgeStyle = 'bg-primary text-on-primary shadow-xs';
                    roleDotStyle = 'bg-primary-fixed-dim';
                    roleIcon = 'verified';
                    scopeDesc = 'Otorisasi Penuh, Kebijakan & Terbitkan Laporan Audit';
                  } else if (user.roleCategory === 'BENDAHARA') {
                    if (user.role === 'Bendahara' && user.name.includes('Burhanuddin')) {
                      roleBadgeStyle = 'bg-primary-container text-on-primary shadow-xs';
                      roleDotStyle = 'bg-secondary-fixed';
                      roleIcon = 'account_balance_wallet';
                      scopeDesc = 'Kelola Transaksi, Verifikasi Donatur & Anggaran RAPB';
                    } else {
                      roleBadgeStyle = 'bg-secondary-container text-on-secondary-container';
                      roleDotStyle = 'bg-secondary';
                      roleIcon = 'receipt_long';
                      scopeDesc = 'Input Bukti Kwitansi, Kas Masuk/Keluar Kecil (Petty Cash)';
                    }
                  } else {
                    if (user.roleLabel.includes('Acara') || user.name.includes('Fahmi')) {
                      roleBadgeStyle = 'bg-surface-container-high text-outline';
                      roleDotStyle = 'bg-outline-variant';
                      roleIcon = 'photo_camera';
                      scopeDesc = 'Jadwal Agenda, Galeri Kegiatan & Publikasi Santunan';
                    }
                  }

                  return (
                    <tr
                      key={user.id}
                      className={`hover:bg-surface-container-low/50 transition-colors user-row ${
                        !user.is_active ? 'opacity-80' : ''
                      } ${isCurrent ? 'bg-primary-container/5' : ''}`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                            {user.avatarText}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-on-surface truncate text-xs sm:text-sm">
                                {user.name} {user.title ? `, ${user.title}` : ''}
                              </span>
                              {isCurrent ? (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                                  Sesi Anda
                                </span>
                              ) : (
                                <span className="text-[11px] text-outline font-normal">(Contoh data)</span>
                              )}
                            </div>
                            <span className="text-xs text-on-surface-variant truncate font-mono">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide ${roleBadgeStyle}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${roleDotStyle}`}></span>
                          {user.roleLabel || user.role.toUpperCase()}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-on-surface">
                          <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
                            {roleIcon}
                          </span>
                          <span className="text-xs font-medium text-on-surface-variant">
                            {scopeDesc}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex flex-col font-mono text-xs">
                          <span className="text-on-surface font-semibold">
                            {user.lastActive.includes('WIB') ? user.lastActive : `13-02-2025 09:${Math.floor(10 + Math.random() * 40)}`}
                          </span>
                          <span className="text-[11px] text-outline">
                            {user.is_active ? `IP: ${user.ipAddress}` : 'Akses Ditangguhkan'}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        {user.is_active ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed/50 text-primary text-[11px] font-semibold">
                            <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                            Aktif
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-outline text-[11px] font-semibold">
                            <span className="w-2 h-2 rounded-full bg-outline"></span>
                            Nonaktif
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleSwitchDemoAccount(user)}
                            className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors cursor-pointer"
                            title="Beralih ke Akun Ini (Simulasi)"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[19px]">admin_panel_settings</span>
                          </button>
                          <button
                            onClick={() => handleSendResetPassword(user)}
                            className="p-2 rounded-lg text-on-surface-variant hover:text-secondary hover:bg-surface-container-high transition-colors cursor-pointer"
                            title="Kirim Reset Sandi"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[19px]">lock_reset</span>
                          </button>
                          <button
                            onClick={() => handleToggleUser(user)}
                            className={`p-2 rounded-lg transition-colors cursor-pointer ${
                              user.is_active
                                ? 'text-on-surface-variant hover:text-error hover:bg-error-container/40'
                                : 'text-primary hover:bg-surface-container-high'
                            }`}
                            title={user.is_active ? 'Nonaktifkan Akun' : 'Aktifkan Kembali Akun'}
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[19px]">
                              {user.is_active ? 'block' : 'lock_open'}
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="flex flex-col items-center justify-center p-12 text-center" id="table-empty-state">
              <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-outline mb-4">
                <span className="material-symbols-outlined text-[32px]">person_search</span>
              </div>
              <h3 className="text-base font-bold text-on-surface">Tidak Ditemukan Pengurus</h3>
              <p className="text-xs text-on-surface-variant mt-1 max-w-sm">
                Kriteria pencarian atau saringan peran tidak cocok dengan data pengguna terdaftar yayasan.
              </p>
            </div>
          )}

          {/* Table Footer with Pagination & Security Info */}
          <div className="px-6 py-4 bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-surface-container">
            <div className="flex items-center gap-2 text-outline text-xs">
              <span className="material-symbols-outlined text-[18px]">shield</span>
              <span className="text-[11px]">Autentikasi dua faktor (2FA) diwajibkan untuk level Ketua &amp; Bendahara.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-on-surface-variant">Halaman 1 dari 1</span>
              <div className="flex items-center gap-1">
                <button
                  className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-outline opacity-50 cursor-not-allowed"
                  disabled
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                </button>
                <button
                  className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-outline opacity-50 cursor-not-allowed"
                  disabled
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Islamic Trust Banner / Saddu Dzari'ah Policy Note */}
        <section className="rounded-xl bg-surface-container-high/40 p-6 flex flex-col md:flex-row items-start gap-4 border border-surface-container/60">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">balance</span>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-base font-bold text-primary">Prinsip Amanah dan Kehati-hatian Harta Anak Yatim</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Sesuai panduan syariat Al-Qur'an (QS. An-Nisa: 2), pemisahan peran kasir, verifikator, dan pengasuhan merupakan komitmen pencegahan kerancuan (<em>saddu dzari'ah</em>). Setiap staf yang tidak bertugas di kebendaharaan dilarang memiliki akses ke rekening atau saldo riil yayasan guna menjaga ketulusan pengasuhan.
            </p>
          </div>
        </section>
      </div>

      {/* Slide-Over Modal: Tambah / Undang Pengurus Baru */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-xs z-50 flex justify-end" id="user-modal-overlay">
          <div
            className="w-full max-w-xl bg-surface-container-lowest shadow-2xl flex flex-col justify-between h-full animate-in slide-in-from-right duration-300"
            id="user-modal-panel"
          >
            {/* Modal Header */}
            <div className="p-6 bg-surface-container-low flex items-center justify-between border-b border-surface-container">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">person_add</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-base font-bold text-on-surface">Undang Pengurus Baru</h3>
                  <span className="text-[11px] text-secondary uppercase font-semibold">Distribusi Tugas &amp; Amanah</span>
                </div>
              </div>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="w-10 h-10 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high flex items-center justify-center transition-all cursor-pointer"
                id="btn-close-modal"
                type="button"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            {/* Modal Body (Form) */}
            <form onSubmit={handleInviteSubmit} className="p-6 overflow-y-auto flex-1 flex flex-col gap-6 text-xs" id="invite-user-form">
              {/* Field 1: Nama Lengkap */}
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-on-surface flex items-center justify-between text-xs" htmlFor="input-fullname">
                  <span>Nama Lengkap Beserta Gelar <span className="text-error">*</span></span>
                  <span className="text-[11px] text-outline font-normal">Identitas Resmi Pengurus</span>
                </label>
                <input
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="h-11 px-4 rounded-xl bg-surface-container-low border border-surface-container text-on-surface placeholder:text-outline text-xs outline-none focus:bg-surface-container-lowest focus:border-primary transition-all"
                  id="input-fullname"
                  placeholder="Contoh: Muhammad Rayhan, S.Pd"
                  required
                  type="text"
                />
              </div>

              {/* Field 2: Surel */}
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-on-surface flex items-center justify-between text-xs" htmlFor="input-email">
                  <span>Alamat Surel (Email Lembaga / Pribadi) <span className="text-error">*</span></span>
                  <span className="text-[11px] text-outline font-normal">Tautan aktivasi akan dikirim</span>
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 px-4 rounded-xl bg-surface-container-low border border-surface-container text-on-surface placeholder:text-outline text-xs outline-none focus:bg-surface-container-lowest focus:border-primary transition-all font-mono"
                  id="input-email"
                  placeholder="pengurus@alirsyad-darulaitam.or.id"
                  required
                  type="email"
                />
              </div>

              {/* Field 3: Pemilihan Peran (Radio Group Berbobot) */}
              <div className="flex flex-col gap-2.5">
                <label className="font-semibold text-on-surface text-xs">
                  Pilih Peran &amp; Kewenangan Amanah <span className="text-error">*</span>
                </label>
                <div className="grid grid-cols-1 gap-2.5">
                  {/* Option Bendahara */}
                  <label
                    onClick={() => setSelectedRole('BENDAHARA')}
                    className={`relative flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all border ${
                      selectedRole === 'BENDAHARA'
                        ? 'bg-primary-container/10 border-primary'
                        : 'bg-surface-container-low hover:bg-surface-container border-transparent'
                    }`}
                  >
                    <input
                      checked={selectedRole === 'BENDAHARA'}
                      onChange={() => setSelectedRole('BENDAHARA')}
                      className="mt-1 w-4 h-4 accent-primary cursor-pointer"
                      name="modal-role"
                      type="radio"
                      value="BENDAHARA"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-on-surface">Bendahara / Bagian Keuangan</span>
                      <span className="text-[11px] text-on-surface-variant mt-0.5">
                        Memiliki akses ke buku kas, verifikasi mutasi bank, dan anggaran santunan yatim.
                      </span>
                    </div>
                  </label>

                  {/* Option Staf Admin / Pengasuh */}
                  <label
                    onClick={() => setSelectedRole('STAF')}
                    className={`relative flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all border ${
                      selectedRole === 'STAF'
                        ? 'bg-primary-container/10 border-primary'
                        : 'bg-surface-container-low hover:bg-surface-container border-transparent'
                    }`}
                  >
                    <input
                      checked={selectedRole === 'STAF'}
                      onChange={() => setSelectedRole('STAF')}
                      className="mt-1 w-4 h-4 accent-primary cursor-pointer"
                      name="modal-role"
                      type="radio"
                      value="STAF"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-on-surface">Staf Pengasuhan &amp; Pelayanan Asrama</span>
                      <span className="text-[11px] text-on-surface-variant mt-0.5">
                        Pencatatan data anak asuh, absensi sekolah, kesehatan, dan kegiatan. Saldo kas tertutup.
                      </span>
                    </div>
                  </label>

                  {/* Option Dewan Ketua */}
                  <label
                    onClick={() => setSelectedRole('KETUA')}
                    className={`relative flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all border ${
                      selectedRole === 'KETUA'
                        ? 'bg-primary-container/10 border-primary'
                        : 'bg-surface-container-low hover:bg-surface-container border-transparent'
                    }`}
                  >
                    <input
                      checked={selectedRole === 'KETUA'}
                      onChange={() => setSelectedRole('KETUA')}
                      className="mt-1 w-4 h-4 accent-primary cursor-pointer"
                      name="modal-role"
                      type="radio"
                      value="KETUA"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-on-surface">Ketua / Wakil Ketua Harian</span>
                      <span className="text-[11px] text-on-surface-variant mt-0.5">
                        Hak persetujuan akhir program kerja, penandatanganan berkas resmi, dan log yayasan.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Field 4: Status Aktif Switch & Kebijakan Data */}
              <div className="p-4 rounded-xl bg-surface-container-high/40 flex flex-col gap-3 border border-surface-container">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-on-surface">Aktifkan Akun Segera</span>
                    <span className="text-[11px] text-outline">Kirimkan kata sandi sementara ke surel tujuan</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="sr-only peer"
                      id="input-is-active"
                      type="checkbox"
                    />
                    <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="pt-2 border-t border-surface-container/60 flex items-start gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-secondary shrink-0 mt-0.5">info</span>
                  <span className="text-[11px] leading-relaxed">
                    Pengurus baru diwajibkan menyetujui Pakta Integritas Perlindungan Data Pribadi Santri (UU PDP No. 27/2022) pada saat login pertama kali.
                  </span>
                </div>
              </div>
            </form>

            {/* Modal Footer */}
            <div className="p-6 bg-surface-container-low flex items-center justify-end gap-3 border-t border-surface-container">
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="h-11 px-5 rounded-xl bg-surface-container-highest text-on-surface-variant hover:text-on-surface text-xs font-semibold transition-colors cursor-pointer"
                id="btn-cancel-modal"
                type="button"
              >
                Batal
              </button>
              <button
                disabled={isSubmitting}
                onClick={handleInviteSubmit}
                className="h-11 px-6 rounded-xl bg-primary text-on-primary hover:bg-primary-container text-xs font-semibold shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                id="btn-submit-invite"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isSubmitting ? 'progress_activity' : 'send'}
                </span>
                <span>{isSubmitting ? 'Memproses...' : 'Kirim Undangan Akses'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Log Aktivitas Login */}
      {isLogModalOpen && (
        <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-container overflow-hidden">
            <div className="p-5 bg-surface-container-low flex items-center justify-between border-b border-surface-container">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-[22px]">history_toggle_off</span>
                <div>
                  <h3 className="text-base font-bold text-on-surface">Log Aktivitas Login Pengurus</h3>
                  <span className="text-[11px] text-outline font-mono">TLS 1.3 / Enkripsi SSL Terverifikasi</span>
                </div>
              </div>
              <button
                onClick={() => setIsLogModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-outline cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
              {sampleLoginLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-on-surface">{log.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface-container-highest text-primary font-bold">
                        {log.role}
                      </span>
                    </div>
                    <div className="text-[11px] text-outline font-mono">{log.email}</div>
                    <div className="text-[10px] text-on-surface-variant">{log.device}</div>
                  </div>

                  <div className="text-right space-y-1 font-mono text-[11px]">
                    <span className="block text-on-surface font-semibold">{log.timestamp}</span>
                    <span className="block text-outline">IP: {log.ip}</span>
                    <span
                      className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        log.status === 'Berhasil'
                          ? 'bg-primary-container text-on-primary'
                          : 'bg-error-container text-error'
                      }`}
                    >
                      {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-surface-container-low border-t border-surface-container flex items-center justify-end">
              <button
                onClick={() => setIsLogModalOpen(false)}
                className="h-9 px-4 rounded-lg bg-primary text-on-primary text-xs font-semibold cursor-pointer shadow-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
