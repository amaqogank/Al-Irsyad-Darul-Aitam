import React from 'react';
import { useApp } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const { activePath, setActivePath, mobileMenuOpen, setMobileMenuOpen } = useApp();

  const handleNavClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActivePath(path);
    setMobileMenuOpen(false);
  };

  const isCurrent = (path: string) => {
    if (activePath === path) return true;
    if (path === 'donasi' && activePath === 'donasi-dan-wakaf') return true;
    if (path === 'kegiatan' && activePath === 'kegiatan-yayasan') return true;
    if (path === 'pengguna' && activePath === 'pengguna-dan-rbac') return true;
    return false;
  };

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
      isCurrent(path)
        ? 'bg-primary-container text-on-primary font-semibold shadow-xs'
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
        className={`fixed left-0 top-0 h-full w-72 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col">
          {/* Brand Header with Letter 'A' Box */}
          <div className="px-6 py-6 flex items-center justify-between border-b border-surface-container/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary font-bold text-xl shadow-xs">
                A
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-primary tracking-tight leading-tight">Al Irsyad</span>
                <span className="text-[10px] text-secondary uppercase tracking-widest font-semibold">Darul Aitam Portal</span>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 text-on-surface-variant hover:text-on-surface rounded-lg"
              aria-label="Tutup menu"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Section: Menu Operasional */}
          <div className="px-6 py-2 pt-4">
            <span className="text-[11px] uppercase text-outline tracking-wider font-semibold block">
              Menu Operasional
            </span>
          </div>

          <nav className="flex flex-col px-4 gap-1">
            <a
              className={linkClass('dashboard')}
              data-path="dashboard"
              href="#dashboard"
              onClick={(e) => handleNavClick('dashboard', e)}
              aria-current={isCurrent('dashboard') ? 'page' : undefined}
            >
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
              <span>Dashboard</span>
            </a>
            <a
              className={linkClass('donasi')}
              data-path="donasi"
              href="#donasi"
              onClick={(e) => handleNavClick('donasi', e)}
              aria-current={isCurrent('donasi') ? 'page' : undefined}
            >
              <span className="material-symbols-outlined text-[20px]">volunteer_activism</span>
              <span>Donasi</span>
            </a>
            <a
              className={linkClass('pengeluaran')}
              data-path="pengeluaran"
              href="#pengeluaran"
              onClick={(e) => handleNavClick('pengeluaran', e)}
              aria-current={isCurrent('pengeluaran') ? 'page' : undefined}
            >
              <span className="material-symbols-outlined text-[20px]">payments</span>
              <span>Pengeluaran</span>
            </a>
            <a
              className={linkClass('anggaran')}
              data-path="anggaran"
              href="#anggaran"
              onClick={(e) => handleNavClick('anggaran', e)}
              aria-current={isCurrent('anggaran') ? 'page' : undefined}
            >
              <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
              <span>Anggaran</span>
            </a>
            <a
              className={linkClass('laporan-keuangan')}
              data-path="laporan-keuangan"
              href="#laporan-keuangan"
              onClick={(e) => handleNavClick('laporan-keuangan', e)}
              aria-current={isCurrent('laporan-keuangan') ? 'page' : undefined}
            >
              <span className="material-symbols-outlined text-[20px]">analytics</span>
              <span>Laporan Keuangan</span>
            </a>
            <a
              className={linkClass('anak-asuh')}
              data-path="anak-asuh"
              href="#anak-asuh"
              onClick={(e) => handleNavClick('anak-asuh', e)}
              aria-current={isCurrent('anak-asuh') ? 'page' : undefined}
            >
              <span className="material-symbols-outlined text-[20px]">escalator_warning</span>
              <span>Anak Asuh</span>
            </a>
            <a
              className={linkClass('kegiatan')}
              data-path="kegiatan"
              href="#kegiatan"
              onClick={(e) => handleNavClick('kegiatan', e)}
              aria-current={isCurrent('kegiatan') ? 'page' : undefined}
            >
              <span className="material-symbols-outlined text-[20px]">event</span>
              <span>Kegiatan</span>
            </a>

            <div className="my-2 border-t border-surface-container"></div>

            {/* Section: Sistem & Tata Kelola */}
            <div className="px-2 py-1">
              <span className="text-[11px] uppercase text-outline tracking-wider font-semibold block">
                Sistem &amp; Tata Kelola
              </span>
            </div>

            <a
              className={linkClass('master-data')}
              data-path="master-data"
              href="#master-data"
              onClick={(e) => handleNavClick('master-data', e)}
              aria-current={isCurrent('master-data') ? 'page' : undefined}
            >
              <span className="material-symbols-outlined text-[20px]">database</span>
              <span>Master Data</span>
            </a>
            <a
              className={linkClass('pengguna')}
              data-path="pengguna"
              href="#pengguna"
              onClick={(e) => handleNavClick('pengguna', e)}
              aria-current={isCurrent('pengguna') ? 'page' : undefined}
            >
              <span className="material-symbols-outlined text-[20px]">group</span>
              <span>Pengguna</span>
            </a>
            <a
              className={linkClass('audit-log')}
              data-path="audit-log"
              href="#audit-log"
              onClick={(e) => handleNavClick('audit-log', e)}
              aria-current={isCurrent('audit-log') ? 'page' : undefined}
            >
              <span className="material-symbols-outlined text-[20px]">history</span>
              <span>Audit Log</span>
            </a>
          </nav>
        </div>

        {/* Bottom Hijri Calendar Widget */}
        <div className="p-4 mx-4 mb-4 rounded-xl bg-surface-container-low flex flex-col gap-1 border border-surface-container/60 shadow-2xs">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
            <span className="text-xs font-semibold">Kalender Hijriah &amp; Masehi</span>
          </div>
          <div className="flex flex-col text-xs text-on-surface-variant font-mono">
            <span className="text-on-surface font-semibold">14 Syaban 1446 H</span>
            <span className="text-[11px]">Selasa, 13 Februari 2025</span>
          </div>
        </div>
      </aside>
    </>
  );
};
