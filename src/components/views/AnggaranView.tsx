import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const AnggaranView: React.FC = () => {
  const { budgets, updateBudget } = useApp();
  const [selectedBudgetToEdit, setSelectedBudgetToEdit] = useState<string | null>(null);
  const [newAllocated, setNewAllocated] = useState<number>(0);

  const totalAllocated = budgets.reduce((acc, curr) => acc + curr.allocatedAmount, 0);
  const totalSpent = budgets.reduce((acc, curr) => acc + curr.spentAmount, 0);
  const totalRemaining = totalAllocated - totalSpent;

  const handleEditBudget = (id: string, currentAmount: number) => {
    setSelectedBudgetToEdit(id);
    setNewAllocated(currentAmount);
  };

  const handleSaveBudget = (id: string) => {
    if (newAllocated > 0) {
      updateBudget(id, newAllocated);
      setSelectedBudgetToEdit(null);
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
            <span className="text-primary font-semibold">Anggaran</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-[28px] font-bold text-on-surface tracking-tight">
                  Rencana Anggaran Pendapatan &amp; Belanja (RAPB)
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  Tahun 1446 H / Q4 2026
                </span>
              </div>
              <p className="text-sm text-on-surface-variant max-w-4xl">
                Alokasi plafon belanja per pos kebutuhan santri dan monitoring realisasi keuangan secara akuntabel.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Overview Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs">
            <span className="text-[11px] uppercase tracking-wider text-outline font-semibold block">
              Plafon Anggaran Ditetapkan
            </span>
            <span className="font-mono text-2xl font-bold text-primary mt-1 block">
              Rp {totalAllocated.toLocaleString('id-ID')}
            </span>
            <span className="text-xs text-on-surface-variant mt-1 block">Musyawarah Pleno Yayasan</span>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs">
            <span className="text-[11px] uppercase tracking-wider text-outline font-semibold block">
              Total Realisasi Terpakai
            </span>
            <span className="font-mono text-2xl font-bold text-on-surface mt-1 block">
              Rp {totalSpent.toLocaleString('id-ID')}
            </span>
            <span className="text-xs text-on-surface-variant mt-1 block">
              {Math.round((totalSpent / totalAllocated) * 100)}% dari Plafon
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs">
            <span className="text-[11px] uppercase tracking-wider text-outline font-semibold block">
              Sisa Anggaran Tersedia
            </span>
            <span className="font-mono text-2xl font-bold text-secondary mt-1 block">
              Rp {totalRemaining.toLocaleString('id-ID')}
            </span>
            <span className="text-xs text-on-surface-variant mt-1 block">Aman &amp; Terkendali</span>
          </div>
        </div>

        {/* Budget Allocation Progress List */}
        <div className="bg-surface-container-lowest rounded-2xl border border-surface-container p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-surface-container">
            <div>
              <h3 className="font-bold text-base text-on-surface">Monitoring Pos Pengeluaran Santri</h3>
              <p className="text-xs text-on-surface-variant">Klik "Sesuaikan Plafon" untuk mengubah alokasi (tercatat di Audit Log)</p>
            </div>
          </div>

          <div className="space-y-6">
            {budgets.map((b) => {
              const percentage = Math.min(100, Math.round((b.spentAmount / b.allocatedAmount) * 100));
              const isOver = b.spentAmount > b.allocatedAmount;

              return (
                <div key={b.id} className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-container-highest text-primary font-bold">
                        {b.code}
                      </span>
                      <h4 className="font-bold text-sm text-on-surface">{b.categoryName}</h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right text-xs">
                        <span className="text-outline">Realisasi: </span>
                        <strong className="font-mono text-on-surface">Rp {b.spentAmount.toLocaleString('id-ID')}</strong>
                        <span className="text-outline"> / Rp {b.allocatedAmount.toLocaleString('id-ID')}</span>
                      </div>

                      {selectedBudgetToEdit === b.id ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            value={newAllocated}
                            onChange={(e) => setNewAllocated(Number(e.target.value))}
                            className="w-32 h-8 px-2 text-xs rounded bg-surface-container-lowest border border-primary font-mono outline-none"
                          />
                          <button
                            onClick={() => handleSaveBudget(b.id)}
                            className="px-2.5 py-1 bg-primary text-on-primary text-xs font-semibold rounded cursor-pointer"
                          >
                            Simpan
                          </button>
                          <button
                            onClick={() => setSelectedBudgetToEdit(null)}
                            className="px-2 py-1 bg-surface-container text-xs rounded cursor-pointer"
                          >
                            Batal
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEditBudget(b.id, b.allocatedAmount)}
                          className="px-2.5 py-1 bg-surface-container hover:bg-surface-container-high text-primary text-xs font-semibold rounded cursor-pointer"
                        >
                          Sesuaikan Plafon
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-outline font-mono">
                      <span>Penggunaan Plafon: {percentage}%</span>
                      <span>Sisa: Rp {(b.allocatedAmount - b.spentAmount).toLocaleString('id-ID')}</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-surface-container overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isOver ? 'bg-error' : percentage > 80 ? 'bg-secondary' : 'bg-primary'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
