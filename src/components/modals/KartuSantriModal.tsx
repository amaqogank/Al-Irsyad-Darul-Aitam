import React from 'react';
import { Santri } from '../../types';

interface Props {
  santri: Santri;
  onClose: () => void;
}

export const KartuSantriModal: React.FC<Props> = ({ santri, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl border border-surface-container overflow-hidden my-6">
        <div className="p-4 bg-surface-container-low border-b border-surface-container flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">badge</span>
            <span className="text-sm font-bold text-on-surface">Kartu Identitas Santri Resmi</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-outline cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* The Printable ID Card (Standard CR80 / Card Aspect Ratio) */}
        <div className="p-6 flex flex-col items-center">
          <div className="w-full max-w-md bg-gradient-to-br from-[#003426] via-[#0f4c3a] to-[#002117] text-white rounded-2xl p-6 shadow-xl relative overflow-hidden border border-emerald-900/40">
            {/* Background Pattern */}
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute right-4 top-4 text-emerald-400/20 pointer-events-none">
              <span className="material-symbols-outlined text-[80px]">account_balance</span>
            </div>

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-emerald-700/50 pb-3 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white text-primary flex items-center justify-center font-bold shadow-sm">
                <span className="material-symbols-outlined text-[24px]">mosque</span>
              </div>
              <div>
                <h4 className="text-sm font-bold tracking-tight text-white leading-tight">YAYASAN AL IRSYAD</h4>
                <p className="text-[10px] text-emerald-200 font-medium uppercase tracking-wider">
                  Darul Aitam &amp; Pesantren Tahfidz
                </p>
                <p className="text-[9px] text-emerald-300/70">Kemenag: YYS/ZAK-0921/2024</p>
              </div>
            </div>

            {/* Content Body */}
            <div className="mt-4 flex gap-4 items-center relative z-10">
              <div className="w-20 h-24 rounded-xl bg-surface-container-lowest text-primary flex flex-col items-center justify-center border-2 border-emerald-400/30 shadow-md shrink-0">
                <span className="text-xl font-bold">{santri.nickname.slice(0, 2).toUpperCase()}</span>
                <span className="text-[9px] font-semibold text-outline uppercase mt-1">SANTRI</span>
              </div>

              <div className="space-y-1 flex-1 text-xs">
                <div className="font-mono text-[11px] font-bold text-amber-300">
                  NIS: {santri.nis} (#{santri.id})
                </div>
                <div className="font-bold text-white text-sm leading-tight">{santri.fullName}</div>
                <div className="text-[11px] text-emerald-200">
                  Hafalan: <strong className="text-white">{santri.tahfidz.currentJuz} Juz</strong> ({santri.tahfidz.statusMutqin})
                </div>
                <div className="text-[10px] text-emerald-300/80">
                  Kamar: {santri.dormRoom}
                </div>
                <div className="text-[10px] text-emerald-300/80">
                  Status: {santri.careStatus}
                </div>
              </div>
            </div>

            {/* Footer Bar */}
            <div className="mt-5 pt-3 border-t border-emerald-700/50 flex items-center justify-between text-[9px] text-emerald-300/80 relative z-10">
              <div>
                <span className="block font-mono">BERLAKU: 1446 - 1447 H</span>
                <span className="block text-[8px] text-emerald-400">SURAKARTA / INDONESIA</span>
              </div>
              <div className="text-right">
                <span className="block font-semibold text-white">Ust. Ahmad Zaki, S.E.I.</span>
                <span className="block text-[8px]">Pengasuh Asrama</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-surface-container-low border-t border-surface-container flex items-center justify-end gap-2.5 no-print">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold cursor-pointer"
          >
            Tutup
          </button>
          <button
            onClick={() => window.print()}
            className="h-9 px-4 rounded-lg bg-primary hover:bg-primary/90 text-on-primary text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>Cetak Kartu Santri</span>
          </button>
        </div>
      </div>
    </div>
  );
};
