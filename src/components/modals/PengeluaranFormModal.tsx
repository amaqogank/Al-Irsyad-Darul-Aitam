import React, { useState } from 'react';
import { ExpenseCategory } from '../../types';
import { useApp } from '../../context/AppContext';

interface Props {
  onClose: () => void;
}

export const PengeluaranFormModal: React.FC<Props> = ({ onClose }) => {
  const { addExpense } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('Logistik Dapur & Pangan Santri');
  const [amount, setAmount] = useState<number>(2500000);
  const [recipient, setRecipient] = useState('');
  const [paymentSource, setPaymentSource] = useState('Kas BSI Operasional');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || amount <= 0) return;

    addExpense({
      title,
      category,
      amount,
      recipient,
      paymentSource,
      date,
      approvedBy: 'Ust. Ahmad Zaki',
      status: 'Disetujui',
      notes
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl border border-surface-container overflow-hidden my-6">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="p-5 bg-surface-container-low border-b border-surface-container flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">payments</span>
              <h3 className="text-base font-bold text-on-surface">Penerbitan Voucher Kas Keluar</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-outline cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div className="p-6 space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-outline mb-1">Judul / Peruntukan Pengeluaran *</label>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Belanja Pangan Santri / Biaya Berobat Santri"
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-outline mb-1">Pos Kategori Anggaran</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                  className="w-full h-10 px-2 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none cursor-pointer"
                >
                  <option value="Logistik Dapur & Pangan Santri">Logistik Dapur &amp; Pangan Santri</option>
                  <option value="Pendidikan & SPP Formal">Pendidikan &amp; SPP Formal</option>
                  <option value="Uang Saku & Beasiswa Santri">Uang Saku &amp; Beasiswa Santri</option>
                  <option value="Layanan Medis & Kesehatan">Layanan Medis &amp; Kesehatan</option>
                  <option value="Operasional & Listrik Asrama">Operasional &amp; Listrik Asrama</option>
                  <option value="Honor Asatidz & Musyrif">Honor Asatidz &amp; Musyrif</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-outline mb-1">Sumber Rekening Kas</label>
                <select
                  value={paymentSource}
                  onChange={(e) => setPaymentSource(e.target.value)}
                  className="w-full h-10 px-2 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none cursor-pointer"
                >
                  <option value="Kas BSI Operasional">Kas BSI Operasional</option>
                  <option value="Kas Muamalat ZISWAF">Kas Muamalat ZISWAF</option>
                  <option value="Kas Tunai Yayasan">Kas Tunai Bendahara</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-outline mb-1">Nominal Biaya (Rp) *</label>
                <input
                  required
                  type="number"
                  min="5000"
                  step="10000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none font-mono font-bold text-base focus:border-primary text-primary"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-outline mb-1">Pihak Penerima Dana</label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Nama Toko / Klinik / Pihak Ke-3"
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-outline mb-1">Catatan Tambahan &amp; Nomor Nota</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="No nota fisik terlampir pada ordner bendahara"
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none"
              />
            </div>
          </div>

          <div className="p-5 bg-surface-container-low border-t border-surface-container flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-4 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="h-10 px-5 rounded-lg bg-primary hover:bg-primary/90 text-on-primary font-semibold text-xs shadow-xs cursor-pointer"
            >
              Terbitkan Voucher Kas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
