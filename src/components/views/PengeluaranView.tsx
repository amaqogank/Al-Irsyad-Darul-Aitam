import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PengeluaranFormModal } from '../modals/PengeluaranFormModal';

export const PengeluaranView: React.FC = () => {
  const { expenses, voidExpense } = useApp();
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExpenses = expenses.filter((e) => {
    return (
      searchQuery === '' ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.voucherNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const totalSpent = expenses
    .filter((e) => e.status !== 'VOID (Dibatalkan)')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const handleVoid = (id: string, title: string) => {
    const reason = window.prompt(`Masukkan alasan pembatalan (VOID) voucher untuk: "${title}":`, 'Duplikasi nota pembelanjaan');
    if (reason) {
      voidExpense(id, reason);
    }
  };

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
            <span className="text-primary font-semibold">Pengeluaran</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-[28px] font-bold text-on-surface tracking-tight">
                  Pengeluaran Kas &amp; Belanja Kebutuhan Santri
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  <span className="material-symbols-outlined text-[14px]">receipt</span>
                  Voucher Kas Terverifikasi
                </span>
              </div>
              <p className="text-sm text-on-surface-variant max-w-4xl">
                Alokasi dana untuk operasional asrama santri, logistik pangan dapur, SPP formal, serta layanan medis &amp; kesehatan santri.
              </p>
            </div>

            <button
              onClick={() => setFormModalOpen(true)}
              className="h-11 px-4 bg-primary hover:bg-primary/90 text-on-primary text-sm font-medium rounded-lg shadow-sm flex items-center gap-2 transition-all cursor-pointer self-start lg:self-center"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Terbitkan Voucher Kas</span>
            </button>
          </div>
        </div>

        {/* Metric Banner */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-outline font-semibold block">
              Total Realisasi Pengeluaran Kas (Bulan Berjalan)
            </span>
            <span className="font-mono text-3xl font-bold text-on-surface mt-1 block">
              Rp {totalSpent.toLocaleString('id-ID')}
            </span>
            <span className="text-xs text-on-surface-variant mt-1 block">
              Dari alokasi RAPB Rp 138.500.000 (Realisasi Sehat)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari voucher atau penerima..."
                className="w-64 h-10 pl-9 pr-3 rounded-lg bg-surface-container-low text-xs border border-transparent outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Expenses Table */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-surface-container overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container text-on-surface-variant text-[11px] uppercase tracking-wider font-semibold select-none">
                <tr>
                  <th className="py-3 px-4">No. Voucher &amp; Tanggal</th>
                  <th className="py-3 px-4">Uraian Kebutuhan</th>
                  <th className="py-3 px-4">Kategori Pos</th>
                  <th className="py-3 px-4">Penerima Dana</th>
                  <th className="py-3 px-4">Nominal</th>
                  <th className="py-3 px-4">Status &amp; Otorisasi</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container/60 text-on-surface">
                {filteredExpenses.map((expense) => {
                  const isVoid = expense.status === 'VOID (Dibatalkan)';
                  return (
                    <tr
                      key={expense.id}
                      className={`transition-colors ${
                        isVoid ? 'bg-error-container/10' : 'hover:bg-surface-container-low/60'
                      }`}
                    >
                      <td className="py-3.5 px-4 align-middle">
                        <div className="flex flex-col">
                          <span className={`font-mono text-xs font-bold ${isVoid ? 'text-error line-through' : 'text-primary'}`}>
                            {expense.voucherNumber}
                          </span>
                          <span className="text-[11px] text-outline font-mono mt-0.5">{expense.date}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 align-middle">
                        <div className="flex flex-col">
                          <span className={`font-semibold text-xs ${isVoid ? 'line-through text-outline' : 'text-on-surface'}`}>
                            {expense.title}
                          </span>
                          {expense.voidReason && (
                            <span className="text-[10px] text-error font-medium mt-0.5">
                              Alasan Batal: {expense.voidReason}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 align-middle">
                        <span className="text-xs text-on-surface-variant">{expense.category}</span>
                      </td>

                      <td className="py-3.5 px-4 align-middle">
                        <span className="text-xs text-on-surface font-medium">{expense.recipient}</span>
                      </td>

                      <td className="py-3.5 px-4 align-middle">
                        <span className={`font-mono font-bold text-xs ${isVoid ? 'text-error line-through' : 'text-on-surface'}`}>
                          Rp {expense.amount.toLocaleString('id-ID')}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 align-middle">
                        <div className="flex flex-col">
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                              isVoid ? 'text-error' : 'text-primary'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            {expense.status}
                          </span>
                          <span className="text-[10px] text-outline mt-0.5">Oleh {expense.approvedBy}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 align-middle text-right">
                        {!isVoid && (
                          <button
                            onClick={() => handleVoid(expense.id, expense.title)}
                            className="px-2.5 py-1 text-error hover:bg-error-container/40 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                            title="Batalkan Voucher (VOID)"
                          >
                            VOID
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {formModalOpen && <PengeluaranFormModal onClose={() => setFormModalOpen(false)} />}
    </div>
  );
};
