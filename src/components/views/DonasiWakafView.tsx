import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Donation } from '../../types';
import { DonasiFormModal } from '../modals/DonasiFormModal';
import { KwitansiModal } from '../modals/KwitansiModal';

export const DonasiWakafView: React.FC = () => {
  const { donations, verifyDonation } = useApp();

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [kwitansiDonation, setKwitansiDonation] = useState<Donation | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Zakat Calculator state
  const [zakatHarta, setZakatHarta] = useState<number>(150000000);
  const goldPricePerGram = 1450000;
  const nisabGold = 85 * goldPricePerGram; // Rp 123.250.000
  const isWajibZakat = zakatHarta >= nisabGold;
  const calculatedZakat = isWajibZakat ? zakatHarta * 0.025 : 0;

  const filteredDonations = donations.filter((d) => {
    const matchCategory = filterCategory === 'all' || d.category === filterCategory;
    const matchSearch =
      searchQuery === '' ||
      d.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.receiptNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.notes && d.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const totalCollected = donations.reduce((acc, curr) => acc + curr.amount, 0);

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
            <span className="text-primary font-semibold">Donasi &amp; Wakaf</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-[28px] font-bold text-on-surface tracking-tight">
                  Pengelolaan Donasi, Infaq &amp; Wakaf
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Standar Akuntansi ZISWAF PSAK 109
                </span>
              </div>
              <p className="text-sm text-on-surface-variant max-w-4xl">
                Pencatatan dana zakat mal, infaq operasional asrama, program orang tua asuh santri, serta wakaf produktif terikat.
              </p>
            </div>

            <button
              onClick={() => setFormModalOpen(true)}
              className="h-11 px-4 bg-primary hover:bg-primary/90 text-on-primary text-sm font-medium rounded-lg shadow-sm flex items-center gap-2 transition-all cursor-pointer self-start lg:self-center"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Catat Donasi Masuk</span>
            </button>
          </div>
        </div>

        {/* 2 Top Column Split: Summary & Interactive Zakat Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Summary cards (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-outline font-semibold block">
                    Total Dana ZISWAF Dihimpun
                  </span>
                  <span className="font-mono text-3xl font-bold text-primary mt-1 block">
                    Rp {totalCollected.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">savings</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-surface-container flex flex-wrap items-center gap-4 text-xs text-on-surface-variant">
                <span>Rekening Utama: <strong>Bank Syariah Indonesia (BSI)</strong></span>
                <span>•</span>
                <span>Audit Akuntan Publik 2026: <strong>WTP</strong></span>
              </div>
            </div>

            {/* Filter toolbar */}
            <div className="p-4 bg-surface-container-lowest rounded-2xl border border-surface-container shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="relative flex-1 w-full">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari donatur atau no. kwitansi..."
                  className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface-container-low text-xs border border-transparent outline-none focus:border-primary"
                />
              </div>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="h-10 px-3 bg-surface-container-low text-on-surface text-xs font-medium rounded-lg appearance-none cursor-pointer outline-none border border-transparent w-full md:w-auto"
              >
                <option value="all">Semua Program ZISWAF</option>
                <option value="Zakat Mal">Zakat Mal</option>
                <option value="Infaq Operasional">Infaq Operasional</option>
                <option value="Infaq / Sedekah Terikat">Infaq / Sedekah Terikat</option>
                <option value="Wakaf Tunai (Sumur/Fasilitas)">Wakaf Tunai</option>
                <option value="Orang Tua Asuh Santri">Orang Tua Asuh</option>
              </select>
            </div>
          </div>

          {/* Right: Interactive Zakat Mal Calculator (5 cols) */}
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl border border-surface-container p-6 shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-surface-container">
              <span className="material-symbols-outlined text-primary text-[20px]">calculate</span>
              <div>
                <h3 className="font-bold text-sm text-on-surface">Kalkulator Zakat Mal Syariah</h3>
                <span className="text-[10px] text-outline">Nisab Emas 85 gram = Rp {nisabGold.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-outline mb-1">
                  Total Harta / Tabungan Tersimpan 1 Tahun (Haul)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-outline">Rp</span>
                  <input
                    type="number"
                    step="1000000"
                    value={zakatHarta}
                    onChange={(e) => setZakatHarta(Number(e.target.value))}
                    className="w-full h-10 pl-10 pr-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface font-mono font-bold text-sm outline-none"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-outline">Status Kewajiban:</span>
                  <span className={`font-bold ${isWajibZakat ? 'text-primary' : 'text-outline'}`}>
                    {isWajibZakat ? 'Wajib Zakat (Mencapai Nisab)' : 'Belum Wajib Zakat'}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-1 border-t border-surface-container">
                  <span className="font-semibold text-on-surface">Zakat yang Dikeluarkan (2.5%):</span>
                  <span className="font-mono text-base font-bold text-primary">
                    Rp {calculatedZakat.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setFormModalOpen(true);
                }}
                className="w-full h-9 rounded-lg bg-primary hover:bg-primary/90 text-on-primary text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">payments</span>
                <span>Tunaikan Zakat ke Al Irsyad</span>
              </button>
            </div>
          </div>
        </div>

        {/* Donations Table */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-surface-container overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container text-on-surface-variant text-[11px] uppercase tracking-wider font-semibold select-none">
                <tr>
                  <th className="py-3 px-4">Kwitansi &amp; Tanggal</th>
                  <th className="py-3 px-4">Nama Donatur</th>
                  <th className="py-3 px-4">Kategori ZISWAF</th>
                  <th className="py-3 px-4">Nominal</th>
                  <th className="py-3 px-4">Kanal / Bank</th>
                  <th className="py-3 px-4">Status Mutasi</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container/60 text-on-surface">
                {filteredDonations.map((d) => (
                  <tr key={d.id} className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="py-3 px-4 align-middle">
                      <div className="flex flex-col">
                        <span className="font-mono text-xs font-bold text-primary">{d.receiptNumber}</span>
                        <span className="text-[11px] text-outline font-mono mt-0.5">{d.date}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 align-middle">
                      <div className="flex flex-col">
                        <span className="font-semibold text-on-surface text-xs">{d.donorName}</span>
                        <span className="text-[11px] font-mono text-outline">{d.donorPhone}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 align-middle">
                      <div className="flex flex-col">
                        <span className="font-semibold text-primary">{d.category}</span>
                        {d.designatedForSantriName && (
                          <span className="text-[10px] text-secondary">
                            Khusus: {d.designatedForSantriName}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4 align-middle">
                      <span className="font-mono font-bold text-on-surface text-xs">
                        Rp {d.amount.toLocaleString('id-ID')}
                      </span>
                    </td>

                    <td className="py-3 px-4 align-middle">
                      <span className="text-xs text-on-surface-variant">{d.paymentMethod}</span>
                    </td>

                    <td className="py-3 px-4 align-middle">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                          d.status === 'Diverifikasi' ? 'text-primary' : 'text-amber-600'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {d.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 align-middle text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {d.status !== 'Diverifikasi' && (
                          <button
                            onClick={() => verifyDonation(d.id)}
                            className="px-2.5 py-1 bg-surface-container hover:bg-surface-container-high text-primary rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            Verifikasi
                          </button>
                        )}
                        <button
                          onClick={() => setKwitansiDonation(d)}
                          className="px-2.5 py-1 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary/90 flex items-center gap-1 cursor-pointer shadow-2xs"
                        >
                          <span className="material-symbols-outlined text-[14px]">receipt_long</span>
                          <span>Kwitansi</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {formModalOpen && <DonasiFormModal onClose={() => setFormModalOpen(false)} />}
      {kwitansiDonation && <KwitansiModal donation={kwitansiDonation} onClose={() => setKwitansiDonation(null)} />}
    </div>
  );
};
