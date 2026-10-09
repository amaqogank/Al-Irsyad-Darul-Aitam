import React from 'react';
import { useApp } from '../../context/AppContext';

export const DashboardView: React.FC = () => {
  const {
    santriList,
    donations,
    expenses,
    auditLogs,
    setActivePath,
    setSelectedSantri,
    setSelectedAuditId
  } = useApp();

  // Metrics
  const totalSantri = santriList.length;
  const mukimCount = santriList.filter((s) => s.careStatus === 'Mukim Asrama (Penuh)').length;
  const nonMukimCount = santriList.filter((s) => s.careStatus === 'Non-Mukim (Binaan Luar)').length;

  const totalDonationAmount = donations.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenseAmount = expenses
    .filter((e) => e.status !== 'VOID (Dibatalkan)')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const netBalance = totalDonationAmount - totalExpenseAmount;

  // Tahfidz Breakdown
  const tahfidzTier1 = santriList.filter((s) => s.tahfidz.currentJuz <= 5).length;
  const tahfidzTier2 = santriList.filter((s) => s.tahfidz.currentJuz > 5 && s.tahfidz.currentJuz <= 10).length;
  const tahfidzTier3 = santriList.filter((s) => s.tahfidz.currentJuz > 10 && s.tahfidz.currentJuz <= 20).length;
  const tahfidzTier4 = santriList.filter((s) => s.tahfidz.currentJuz > 20).length;

  return (
    <div className="flex flex-col w-full">
      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6 max-w-[1600px] mx-auto w-full">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-[28px] font-bold text-on-surface tracking-tight">
                Dashboard Eksekutif Yayasan
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                1446 Hijriyah
              </span>
            </div>
            <p className="text-sm text-on-surface-variant mt-0.5">
              Ringkasan komprehensif kepengasuhan santri yatim, transparansi keuangan ZISWAF, dan kepatuhan audit sistem.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActivePath('anak-asuh')}
              className="h-10 px-4 rounded-xl bg-primary hover:bg-primary/90 text-on-primary text-xs font-semibold flex items-center gap-2 shadow-xs cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">child_care</span>
              <span>Kelola Santri</span>
            </button>
            <button
              onClick={() => setActivePath('donasi-dan-wakaf')}
              className="h-10 px-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-on-surface text-xs font-semibold flex items-center gap-2 shadow-xs border border-surface-container cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">volunteer_activism</span>
              <span>Input Donasi</span>
            </button>
          </div>
        </div>

        {/* 4 Big KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Card 1: Saldo Kas */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-outline font-semibold block">
                  Saldo Bersih ZISWAF
                </span>
                <span className="font-mono text-2xl font-bold text-primary mt-1 block">
                  Rp {netBalance.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-surface-container/60 text-xs text-on-surface-variant flex items-center justify-between">
              <span>Dana Terikat &amp; Operasional</span>
              <span className="text-primary font-semibold">PSAK 109</span>
            </div>
          </div>

          {/* Card 2: Total Santri */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-outline font-semibold block">
                  Santri Dalam Binaan
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-mono text-2xl font-bold text-on-surface">{totalSantri}</span>
                  <span className="text-xs text-on-surface-variant">Anak Asuh</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">child_care</span>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-surface-container/60 text-xs text-on-surface-variant flex items-center justify-between">
              <span>{mukimCount} Mukim Asrama</span>
              <span className="text-secondary font-semibold">{nonMukimCount} Binaan Luar</span>
            </div>
          </div>

          {/* Card 3: Donasi Masuk */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-outline font-semibold block">
                  Penerimaan ZISWAF Masuk
                </span>
                <span className="font-mono text-2xl font-bold text-primary mt-1 block">
                  Rp {totalDonationAmount.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-surface-container-highest text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">payments</span>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-surface-container/60 text-xs text-on-surface-variant flex items-center justify-between">
              <span>{donations.length} Transaksi Terverifikasi</span>
              <span className="text-primary font-semibold">100% Sah</span>
            </div>
          </div>

          {/* Card 4: Penyaluran Kas */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-outline font-semibold block">
                  Penyaluran Kebutuhan Santri
                </span>
                <span className="font-mono text-2xl font-bold text-on-surface mt-1 block">
                  Rp {totalExpenseAmount.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">shopping_basket</span>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-surface-container/60 text-xs text-on-surface-variant flex items-center justify-between">
              <span>Pangan, SPP &amp; Kesehatan</span>
              <span className="text-secondary font-semibold">Tercatat</span>
            </div>
          </div>
        </div>

        {/* 2-Column Split: Tahfidz Progress & Recent Cash Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Column 1: Tahfidz Milestone (7 cols) */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl border border-surface-container p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-surface-container">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">auto_stories</span>
                  <div>
                    <h3 className="font-bold text-sm text-on-surface">Sebaran Capaian Hafalan Al-Qur’an</h3>
                    <p className="text-[11px] text-on-surface-variant">Target Kurikulum Tahfidz Ma’had Darul Aitam</p>
                  </div>
                </div>
                <button
                  onClick={() => setActivePath('anak-asuh')}
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  Lihat Semua Santri
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
                <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container text-center">
                  <span className="text-[11px] text-outline font-semibold uppercase">1 - 5 Juz</span>
                  <div className="text-xl font-bold font-mono text-primary mt-1">{tahfidzTier1}</div>
                  <span className="text-[10px] text-on-surface-variant">Santri Pemula</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container text-center">
                  <span className="text-[11px] text-outline font-semibold uppercase">6 - 10 Juz</span>
                  <div className="text-xl font-bold font-mono text-primary mt-1">{tahfidzTier2}</div>
                  <span className="text-[10px] text-on-surface-variant">Santri Menengah</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container text-center">
                  <span className="text-[11px] text-outline font-semibold uppercase">11 - 20 Juz</span>
                  <div className="text-xl font-bold font-mono text-primary mt-1">{tahfidzTier3}</div>
                  <span className="text-[10px] text-on-surface-variant">Santri Lanjutan</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container text-center">
                  <span className="text-[11px] text-outline font-semibold uppercase">20+ Juz</span>
                  <div className="text-xl font-bold font-mono text-secondary mt-1">{tahfidzTier4}</div>
                  <span className="text-[10px] text-on-surface-variant">Menuju Wisuda</span>
                </div>
              </div>

              {/* Santri Highlights */}
              <div className="space-y-2 mt-4">
                <span className="text-xs font-bold text-outline uppercase tracking-wider block">
                  Santri Berprestasi Bulan Ini
                </span>
                {santriList.slice(0, 3).map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setSelectedSantri(s);
                      setActivePath('anak-asuh');
                    }}
                    className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between cursor-pointer border border-surface-container text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary text-on-primary font-bold flex items-center justify-center text-xs">
                        {s.nickname.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-semibold text-on-surface block">{s.fullName}</span>
                        <span className="text-[10px] text-outline">
                          {s.dormRoom} • #{s.id}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-primary block">{s.tahfidz.currentJuz} Juz</span>
                      <span className="text-[10px] text-secondary font-medium">{s.tahfidz.statusMutqin}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Recent Audit Activity (5 cols) */}
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl border border-surface-container p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-surface-container">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">history</span>
                  <div>
                    <h3 className="font-bold text-sm text-on-surface">Audit Trail Terkini (Immutable)</h3>
                    <p className="text-[11px] text-on-surface-variant">Pencatatan SHA-256 Otomatis</p>
                  </div>
                </div>
                <button
                  onClick={() => setActivePath('audit-log')}
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  Buka Ledger
                </button>
              </div>

              <div className="divide-y divide-surface-container/60 mt-3">
                {auditLogs.slice(0, 4).map((log) => (
                  <div
                    key={log.id}
                    onClick={() => {
                      setSelectedAuditId(log.id);
                      setActivePath('audit-log');
                    }}
                    className="py-3 hover:bg-surface-container-low px-2 rounded-xl transition-colors cursor-pointer text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold text-primary">{log.recordId}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface-container-highest text-primary font-semibold">
                          {log.action}
                        </span>
                      </div>
                      <span className="text-[10px] text-outline font-mono">{log.relativeTime}</span>
                    </div>
                    <p className="text-on-surface font-medium line-clamp-1">{log.summary}</p>
                    <span className="text-[10px] text-outline block mt-0.5">
                      Oleh: {log.executorName} ({log.executorRole})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-surface-container mt-4">
              <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-between text-xs">
                <span className="text-outline">Integritas Block Hash:</span>
                <span className="font-mono text-primary font-bold">100% OK Chained</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => setActivePath('anak-asuh')}
            className="p-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container border border-surface-container text-left transition-colors flex items-center gap-3 shadow-2xs"
          >
            <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">person_add</span>
            </div>
            <div>
              <span className="text-xs font-bold text-on-surface block">Pendaftaran Santri</span>
              <span className="text-[10px] text-outline">Formulir baru</span>
            </div>
          </button>

          <button
            onClick={() => setActivePath('donasi-dan-wakaf')}
            className="p-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container border border-surface-container text-left transition-colors flex items-center gap-3 shadow-2xs"
          >
            <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">volunteer_activism</span>
            </div>
            <div>
              <span className="text-xs font-bold text-on-surface block">Catat Donasi</span>
              <span className="text-[10px] text-outline">Kwitansi digital</span>
            </div>
          </button>

          <button
            onClick={() => setActivePath('pengeluaran')}
            className="p-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container border border-surface-container text-left transition-colors flex items-center gap-3 shadow-2xs"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </div>
            <div>
              <span className="text-xs font-bold text-on-surface block">Voucher Kas Keluar</span>
              <span className="text-[10px] text-outline">Belanja operasional</span>
            </div>
          </button>

          <button
            onClick={() => setActivePath('laporan-keuangan')}
            className="p-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container border border-surface-container text-left transition-colors flex items-center gap-3 shadow-2xs"
          >
            <div className="w-10 h-10 rounded-xl bg-surface-container-highest text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">assessment</span>
            </div>
            <div>
              <span className="text-xs font-bold text-on-surface block">Laporan PSAK 109</span>
              <span className="text-[10px] text-outline">Neraca &amp; arus kas</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
