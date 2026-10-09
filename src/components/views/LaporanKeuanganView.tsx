import React from 'react';
import { useApp } from '../../context/AppContext';

export const LaporanKeuanganView: React.FC = () => {
  const { donations, expenses } = useApp();

  const totalDonations = donations.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = expenses
    .filter((e) => e.status !== 'VOID (Dibatalkan)')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const sisaLebihDana = totalDonations - totalExpenses;

  // Breakdown simulation for PSAK 109
  const danaZakat = donations.filter((d) => d.category.includes('Zakat')).reduce((a, b) => a + b.amount, 0);
  const danaInfaq = donations.filter((d) => d.category.includes('Infaq') || d.category.includes('Orang Tua Asuh')).reduce((a, b) => a + b.amount, 0);
  const danaWakaf = donations.filter((d) => d.category.includes('Wakaf')).reduce((a, b) => a + b.amount, 0);

  return (
    <div className="flex flex-col w-full">
      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6 max-w-[1600px] mx-auto w-full">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col gap-1">
          <nav className="flex items-center gap-1.5 text-on-surface-variant text-xs tracking-wide">
            <span className="hover:text-primary cursor-pointer transition-colors">Panel Pengurus</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Utama &amp; Transaksi</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-semibold">Laporan Keuangan</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-[28px] font-bold text-on-surface tracking-tight">
                  Laporan Keuangan Syariah (PSAK 109)
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  Opini KAP: Wajar Tanpa Pengecualian (WTP)
                </span>
              </div>
              <p className="text-sm text-on-surface-variant max-w-4xl">
                Laporan Posisi Keuangan, Perubahan Dana Zakat, Infaq, Sedekah dan Wakaf Yayasan Al Irsyad Darul Aitam.
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="h-11 px-4 bg-primary hover:bg-primary/90 text-on-primary text-sm font-medium rounded-lg shadow-sm flex items-center gap-2 transition-all cursor-pointer no-print self-start lg:self-center"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              <span>Cetak Laporan PSAK 109</span>
            </button>
          </div>
        </div>

        {/* Printable Financial Statement Container */}
        <div className="bg-surface-container-lowest rounded-2xl border border-surface-container p-8 shadow-xs space-y-8">
          {/* Header Lembaga */}
          <div className="text-center border-b-2 border-primary pb-6 space-y-1">
            <h2 className="text-xl font-bold text-primary tracking-tight uppercase">YAYASAN AL IRSYAD DARUL AITAM</h2>
            <h3 className="text-base font-semibold text-on-surface">LAPORAN POSISI KEUANGAN (NERACA KAS SYARIAH)</h3>
            <p className="text-xs text-on-surface-variant font-mono">
              Periode Triwulan III / IV 1446 H (Per 14 Oktober 2026)
            </p>
          </div>

          {/* Table: ASET */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-primary uppercase tracking-wider pb-1 border-b border-surface-container">
              I. ASET YAYASAN
            </h4>
            <div className="divide-y divide-surface-container/60 text-xs">
              <div className="py-2.5 flex justify-between font-semibold text-on-surface">
                <span>A. Aset Lancar</span>
                <span></span>
              </div>
              <div className="py-2 pl-6 flex justify-between text-on-surface-variant">
                <span>1. Kas Tunai Brankas Bendahara</span>
                <span className="font-mono">Rp 12.500.000</span>
              </div>
              <div className="py-2 pl-6 flex justify-between text-on-surface-variant">
                <span>2. Bank Syariah Indonesia (BSI) - Rek Giro Utama</span>
                <span className="font-mono">Rp 82.250.000</span>
              </div>
              <div className="py-2 pl-6 flex justify-between text-on-surface-variant">
                <span>3. Bank Muamalat Indonesia - ZISWAF</span>
                <span className="font-mono">Rp 35.800.000</span>
              </div>
              <div className="py-2 pl-6 flex justify-between text-on-surface-variant">
                <span>4. Piutang Bantuan / Titipan Donatur</span>
                <span className="font-mono">Rp 0</span>
              </div>
              <div className="py-2.5 flex justify-between font-semibold text-on-surface bg-surface-container-low px-3 rounded-lg">
                <span>Jumlah Aset Lancar</span>
                <span className="font-mono font-bold text-primary">Rp 130.550.000</span>
              </div>

              <div className="py-2.5 flex justify-between font-semibold text-on-surface pt-4">
                <span>B. Aset Tidak Lancar (Aset Wakaf Produktif)</span>
                <span></span>
              </div>
              <div className="py-2 pl-6 flex justify-between text-on-surface-variant">
                <span>1. Tanah &amp; Bangunan Asrama Putra &amp; Putri (Nilai Perolehan)</span>
                <span className="font-mono">Rp 1.850.000.000</span>
              </div>
              <div className="py-2 pl-6 flex justify-between text-on-surface-variant">
                <span>2. Sarana Air Bersih &amp; Sumur Bor Wakaf</span>
                <span className="font-mono">Rp 45.000.000</span>
              </div>
              <div className="py-2 pl-6 flex justify-between text-on-surface-variant">
                <span>3. Inventaris Komputer &amp; Sarana Tahfidz</span>
                <span className="font-mono">Rp 28.500.000</span>
              </div>
              <div className="py-2.5 flex justify-between font-semibold text-on-surface bg-surface-container-low px-3 rounded-lg">
                <span>Jumlah Aset Tidak Lancar</span>
                <span className="font-mono font-bold text-primary">Rp 1.923.500.000</span>
              </div>

              <div className="py-3 flex justify-between font-bold text-sm text-primary bg-surface-container-highest px-4 rounded-xl mt-2">
                <span>TOTAL ASET (A + B)</span>
                <span className="font-mono text-base">Rp 2.054.050.000</span>
              </div>
            </div>
          </div>

          {/* Table: SALDO DANA PSAK 109 */}
          <div className="space-y-3 pt-4">
            <h4 className="font-bold text-sm text-primary uppercase tracking-wider pb-1 border-b border-surface-container">
              II. LIABILITAS &amp; SALDO DANA (PSAK 109)
            </h4>
            <div className="divide-y divide-surface-container/60 text-xs">
              <div className="py-2.5 flex justify-between font-semibold text-on-surface">
                <span>A. Saldo Dana Terikat &amp; Tidak Terikat</span>
                <span></span>
              </div>
              <div className="py-2 pl-6 flex justify-between text-on-surface-variant">
                <span>1. Dana Zakat Mal &amp; Zakat Fitrah</span>
                <span className="font-mono">Rp {danaZakat.toLocaleString('id-ID')}</span>
              </div>
              <div className="py-2 pl-6 flex justify-between text-on-surface-variant">
                <span>2. Dana Infaq / Sedekah Operasional &amp; Anak Asuh</span>
                <span className="font-mono">Rp {danaInfaq.toLocaleString('id-ID')}</span>
              </div>
              <div className="py-2 pl-6 flex justify-between text-on-surface-variant">
                <span>3. Dana Wakaf Produktif &amp; Fisik</span>
                <span className="font-mono">Rp {(1923500000 + danaWakaf).toLocaleString('id-ID')}</span>
              </div>
              <div className="py-2 pl-6 flex justify-between text-on-surface-variant">
                <span>4. Dana Amil (Hak Pengelola Sesuai Syariah 12.5%)</span>
                <span className="font-mono">Rp 12.300.000</span>
              </div>

              <div className="py-3 flex justify-between font-bold text-sm text-primary bg-surface-container-highest px-4 rounded-xl mt-2">
                <span>TOTAL SALDO DANA &amp; LIABILITAS</span>
                <span className="font-mono text-base">Rp 2.054.050.000</span>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="pt-8 border-t border-surface-container grid grid-cols-2 text-center text-xs">
            <div className="space-y-16">
              <span className="text-outline">Disusun Oleh:</span>
              <div>
                <span className="font-bold text-on-surface block">Ust. Ahmad Zaki, S.E.I.</span>
                <span className="text-[11px] text-outline">Bendahara &amp; Admin Yayasan</span>
              </div>
            </div>
            <div className="space-y-16">
              <span className="text-outline">Disetujui &amp; Disahkan Oleh:</span>
              <div>
                <span className="font-bold text-on-surface block">H. Abdullah Azzam</span>
                <span className="text-[11px] text-outline">Ketua Yayasan Al Irsyad Darul Aitam</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
