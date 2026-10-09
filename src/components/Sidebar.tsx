import React from 'react';
import { useApp } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const { activePath, setActivePath, mobileMenuOpen, setMobileMenuOpen } = useApp();

  const handleNavClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActivePath(path);
    setMobileMenuOpen(false);
  };

  const isCurrent = (path: string) => activePath === path;

  const linkClass = (path: string) =>
    `flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all text-sm font-medium ${
      isCurrent(path)
        ? 'bg-primary-container text-on-primary-container font-semibold shadow-xs'
        : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
    }`;

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-surface-container-low z-50 flex flex-col shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between bg-surface-container-lowest border-b border-surface-container">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm shrink-0">
              <span className="material-symbols-outlined text-[24px]">account_balance</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[19px] font-bold text-primary tracking-tight leading-tight">Al Irsyad</span>
              <span className="text-[11px] text-secondary font-semibold tracking-wider uppercase">Darul Aitam Portal</span>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-1.5 text-on-surface-variant hover:text-on-surface rounded-lg"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {/* Section 1: Utama & Transaksi */}
          <section>
            <div>
              <span className="px-3 text-[11px] uppercase text-outline tracking-wider font-semibold block mb-1.5">
                Utama &amp; Transaksi
              </span>
            </div>
            <nav className="space-y-1">
              <a
                href="#dashboard"
                onClick={(e) => handleNavClick('dashboard', e)}
                className={linkClass('dashboard')}
                aria-current={isCurrent('dashboard') ? 'page' : undefined}
              >
                <span className="material-symbols-outlined text-[20px]">grid_view</span>
                <span>Dashboard</span>
              </a>
              <a
                href="#donasi-dan-wakaf"
                onClick={(e) => handleNavClick('donasi-dan-wakaf', e)}
                className={linkClass('donasi-dan-wakaf')}
                aria-current={isCurrent('donasi-dan-wakaf') ? 'page' : undefined}
              >
                <span className="material-symbols-outlined text-[20px]">volunteer_activism</span>
                <span>Donasi &amp; Wakaf</span>
              </a>
              <a
                href="#pengeluaran"
                onClick={(e) => handleNavClick('pengeluaran', e)}
                className={linkClass('pengeluaran')}
                aria-current={isCurrent('pengeluaran') ? 'page' : undefined}
              >
                <span className="material-symbols-outlined text-[20px]">payments</span>
                <span>Pengeluaran</span>
              </a>
              <a
                href="#anggaran"
                onClick={(e) => handleNavClick('anggaran', e)}
                className={linkClass('anggaran')}
                aria-current={isCurrent('anggaran') ? 'page' : undefined}
              >
                <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                <span>Anggaran</span>
              </a>
              <a
                href="#laporan-keuangan"
                onClick={(e) => handleNavClick('laporan-keuangan', e)}
                className={linkClass('laporan-keuangan')}
                aria-current={isCurrent('laporan-keuangan') ? 'page' : undefined}
              >
                <span className="material-symbols-outlined text-[20px]">assessment</span>
                <span>Laporan Keuangan</span>
              </a>
            </nav>
          </section>

          {/* Section 2: Sosial & Santri */}
          <section>
            <div>
              <span className="px-3 text-[11px] uppercase text-outline tracking-wider font-semibold block mb-1.5">
                Sosial &amp; Santri
              </span>
            </div>
            <nav className="space-y-1">
              <a
                href="#anak-asuh"
                onClick={(e) => handleNavClick('anak-asuh', e)}
                className={linkClass('anak-asuh')}
                aria-current={isCurrent('anak-asuh') ? 'page' : undefined}
              >
                <span className="material-symbols-outlined text-[20px]">child_care</span>
                <span>Anak Asuh</span>
                <span className="ml-auto text-[11px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                  65
                </span>
              </a>
              <a
                href="#kegiatan-yayasan"
                onClick={(e) => handleNavClick('kegiatan-yayasan', e)}
                className={linkClass('kegiatan-yayasan')}
                aria-current={isCurrent('kegiatan-yayasan') ? 'page' : undefined}
              >
                <span className="material-symbols-outlined text-[20px]">event_available</span>
                <span>Kegiatan Yayasan</span>
              </a>
            </nav>
          </section>

          {/* Section 3: Administrasi & Sistem */}
          <section>
            <div>
              <span className="px-3 text-[11px] uppercase text-outline tracking-wider font-semibold block mb-1.5">
                Administrasi &amp; Sistem
              </span>
            </div>
            <nav className="space-y-1">
              <a
                href="#master-data"
                onClick={(e) => handleNavClick('master-data', e)}
                className={linkClass('master-data')}
                aria-current={isCurrent('master-data') ? 'page' : undefined}
              >
                <span className="material-symbols-outlined text-[20px]">database</span>
                <span>Master Data</span>
              </a>
              <a
                href="#pengguna-dan-rbac"
                onClick={(e) => handleNavClick('pengguna-dan-rbac', e)}
                className={linkClass('pengguna-dan-rbac')}
                aria-current={isCurrent('pengguna-dan-rbac') ? 'page' : undefined}
              >
                <span className="material-symbols-outlined text-[20px]">manage_accounts</span>
                <span>Pengguna &amp; RBAC</span>
              </a>
              <a
                href="#audit-log"
                onClick={(e) => handleNavClick('audit-log', e)}
                className={linkClass('audit-log')}
                aria-current={isCurrent('audit-log') ? 'page' : undefined}
              >
                <span className="material-symbols-outlined text-[20px]">history</span>
                <span>Audit Log</span>
                <span className="ml-auto w-2 h-2 rounded-full bg-secondary"></span>
              </a>
            </nav>
          </section>
        </div>

        {/* Bottom Year Widget */}
        <div className="p-3 bg-surface-container-low border-t border-surface-container">
          <div className="p-3 bg-surface-container rounded-xl flex items-center justify-between shadow-2xs">
            <div className="flex flex-col">
              <span className="text-[11px] text-on-surface-variant font-medium">Tahun Hijriyah</span>
              <span className="font-mono text-xs text-primary font-bold">1446 H / 2025</span>
            </div>
            <span className="material-symbols-outlined text-primary text-[20px]">mosque</span>
          </div>
        </div>
      </aside>
    </>
  );
};
