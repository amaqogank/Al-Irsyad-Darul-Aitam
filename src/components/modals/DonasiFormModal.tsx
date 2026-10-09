import React, { useState } from 'react';
import { DonationCategory, PaymentMethod } from '../../types';
import { useApp } from '../../context/AppContext';

interface Props {
  onClose: () => void;
}

export const DonasiFormModal: React.FC<Props> = ({ onClose }) => {
  const { addDonation, santriList } = useApp();

  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('0812-');
  const [donorEmail, setDonorEmail] = useState('');
  const [category, setCategory] = useState<DonationCategory>('Infaq Operasional');
  const [amount, setAmount] = useState<number>(1000000);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Bank Syariah Indonesia');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [designatedSantriId, setDesignatedSantriId] = useState<string>('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim() || amount <= 0) return;

    const designated = santriList.find((s) => s.id === designatedSantriId);

    addDonation({
      donorName,
      donorPhone,
      donorEmail,
      category,
      amount,
      paymentMethod,
      date,
      status: 'Diverifikasi',
      designatedForSantriId: designated?.id,
      designatedForSantriName: designated?.fullName,
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
              <span className="material-symbols-outlined text-primary text-[22px]">volunteer_activism</span>
              <h3 className="text-base font-bold text-on-surface">Pencatatan Donasi Masuk (ZISWAF)</h3>
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
              <label className="block text-[11px] font-semibold text-outline mb-1">Nama Donatur / Muzakki *</label>
              <input
                required
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="Contoh: H. Faisal Sungkar / Hamba Allah"
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-outline mb-1">No. WhatsApp</label>
                <input
                  type="text"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-outline mb-1">Email (Opsional)</label>
                <input
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  placeholder="email@domain.com"
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-outline mb-1">Kategori Program ZISWAF</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as DonationCategory)}
                  className="w-full h-10 px-2 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none cursor-pointer"
                >
                  <option value="Infaq Operasional">Infaq Operasional</option>
                  <option value="Zakat Mal">Zakat Mal</option>
                  <option value="Zakat Fitrah">Zakat Fitrah</option>
                  <option value="Infaq / Sedekah Terikat">Infaq / Sedekah Terikat</option>
                  <option value="Wakaf Tunai (Sumur/Fasilitas)">Wakaf Tunai (Sumur/Fasilitas)</option>
                  <option value="Orang Tua Asuh Santri">Orang Tua Asuh Santri</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-outline mb-1">Metode Setoran</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                  className="w-full h-10 px-2 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none cursor-pointer"
                >
                  <option value="Bank Syariah Indonesia">Bank Syariah Indonesia (BSI)</option>
                  <option value="BSI Virtual Account">BSI Virtual Account</option>
                  <option value="Bank Muamalat">Bank Muamalat</option>
                  <option value="Tunai / Kantor Sekretariat">Tunai / Sekretariat</option>
                  <option value="QRIS ZISWAF">QRIS ZISWAF</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-outline mb-1">Nominal Donasi (Rp) *</label>
              <input
                required
                type="number"
                min="10000"
                step="50000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none font-mono font-bold text-base focus:border-primary text-primary"
              />
            </div>

            {category === 'Orang Tua Asuh Santri' && (
              <div>
                <label className="block text-[11px] font-semibold text-outline mb-1">Dialokasikan untuk Santri Spesifik</label>
                <select
                  value={designatedSantriId}
                  onChange={(e) => setDesignatedSantriId(e.target.value)}
                  className="w-full h-10 px-2 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none cursor-pointer font-medium"
                >
                  <option value="">-- Bebas / Terbuka untuk Seluruh Santri --</option>
                  {santriList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.fullName} ({s.orphanStatus} - #{s.id})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-outline mb-1">Keterangan / Niat Akad Muzakki</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Misal: Niat zakat mal keluarga / titip makan santri penghafal Quran"
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
              Simpan &amp; Terbitkan Kwitansi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
