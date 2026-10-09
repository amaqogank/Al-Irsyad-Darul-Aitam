import React from 'react';
import { Donation } from '../../types';

interface Props {
  donation: Donation;
  onClose: () => void;
}

export const KwitansiModal: React.FC<Props> = ({ donation, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-surface-container-lowest w-full max-w-xl rounded-2xl shadow-2xl border border-surface-container overflow-hidden my-6">
        <div className="p-4 bg-surface-container-low border-b border-surface-container flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">receipt_long</span>
            <span className="text-sm font-bold text-on-surface">Kwitansi Tanda Terima ZISWAF</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-outline cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Printable Official Receipt */}
        <div className="p-8 space-y-6 text-on-surface">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-primary pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold text-xl shadow-xs">
                <span className="material-symbols-outlined text-[28px]">account_balance</span>
              </div>
              <div>
                <h3 className="font-bold text-base text-primary uppercase leading-tight tracking-tight">
                  AL IRSYAD DARUL AITAM
                </h3>
                <p className="text-[11px] text-on-surface-variant">Lembaga Pengelola ZISWAF &amp; Asuhan Yatim</p>
                <p className="text-[10px] text-outline font-mono">Izin Kemenag: YYS/ZAK-0921/2024</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-outline uppercase font-semibold block">No. Kwitansi</span>
              <span className="font-mono text-sm font-bold text-primary">{donation.receiptNumber}</span>
              <span className="text-[10px] text-outline block mt-0.5">{donation.date}</span>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-surface-container">
              <span className="text-outline font-medium">Telah Diterima Dari</span>
              <span className="col-span-2 font-bold text-on-surface">{donation.donorName}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-surface-container">
              <span className="text-outline font-medium">Program / Pos Dana</span>
              <span className="col-span-2 font-semibold text-primary">{donation.category}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-surface-container">
              <span className="text-outline font-medium">Metode Pembayaran</span>
              <span className="col-span-2 font-medium">{donation.paymentMethod}</span>
            </div>

            {donation.notes && (
              <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-surface-container">
                <span className="text-outline font-medium">Keterangan / Akad</span>
                <span className="col-span-2 italic text-on-surface-variant">“{donation.notes}”</span>
              </div>
            )}

            {/* Big Amount Box */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-between mt-4">
              <span className="text-xs uppercase font-bold text-outline">Jumlah Dana Diterima:</span>
              <span className="font-mono text-2xl font-bold text-primary">
                Rp {donation.amount.toLocaleString('id-ID')}
              </span>
            </div>

            <p className="text-[11px] text-on-surface-variant italic pt-2">
              Teriring doa: <em>"Ajarakallahu fiima a'thoita, wa baaraka fiima abqoita, waja'alahu laka thahuura."</em> (Semoga Allah memberi pahala atas apa yang engkau berikan, memberkahi apa yang engkau sisakan, dan menjadikannya pembersih bagimu).
            </p>
          </div>

          {/* Signature */}
          <div className="pt-6 border-t border-surface-container flex items-end justify-between text-xs">
            <div>
              <span className="text-[10px] text-outline uppercase block">Status Verifikasi</span>
              <span className="inline-flex items-center gap-1 text-primary font-bold">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Lunas &amp; Tercatat di Buku Kas
              </span>
            </div>
            <div className="text-right space-y-1">
              <span className="text-[10px] text-outline block">Surakarta, {donation.date}</span>
              <span className="font-semibold block text-on-surface">Ust. Ahmad Zaki, S.E.I.</span>
              <span className="text-[10px] text-outline block">Bendahara Yayasan</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
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
            <span>Cetak Kwitansi (PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
