import React, { useState } from 'react';
import { Santri, CareStatus, Gender, OrphanStatus } from '../../types';

interface Props {
  initialData?: Santri | null;
  onClose: () => void;
  onSave: (data: any, rationale?: string) => void;
}

export const SantriFormModal: React.FC<Props> = ({
  initialData,
  onClose,
  onSave
}) => {
  const isEdit = Boolean(initialData);

  const [fullName, setFullName] = useState(initialData?.fullName || '');
  const [nickname, setNickname] = useState(initialData?.nickname || '');
  const [gender, setGender] = useState<Gender>(initialData?.gender || 'Laki-laki');
  const [birthPlace, setBirthPlace] = useState(initialData?.birthPlace || 'Solo, Jawa Tengah');
  const [birthDate, setBirthDate] = useState(initialData?.birthDate || '2012-05-14');
  const [careStatus, setCareStatus] = useState<CareStatus>(initialData?.careStatus || 'Mukim Asrama (Penuh)');
  const [orphanStatus, setOrphanStatus] = useState<OrphanStatus>(initialData?.orphanStatus || 'Yatim');
  const [educationLevel, setEducationLevel] = useState(initialData?.educationLevel || 'SMP / MTs Kls 8 (Tahfidz)');
  const [schoolName, setSchoolName] = useState(initialData?.schoolName || 'MTs Al Irsyad Boarding School');
  const [dormRoom, setDormRoom] = useState(initialData?.dormRoom || 'Asrama Abu Bakar - Kamar 03');
  const [guardianName, setGuardianName] = useState(initialData?.guardianName || '');
  const [guardianRelation, setGuardianRelation] = useState(initialData?.guardianRelation || 'Ibu Kandung');
  const [guardianPhone, setGuardianPhone] = useState(initialData?.guardianPhone || '0812-');
  const [guardianAddress, setGuardianAddress] = useState(initialData?.guardianAddress || '');
  const [publicConsent, setPublicConsent] = useState<boolean>(initialData?.publicConsent ?? true);
  const [spwDocNumber, setSpwDocNumber] = useState(initialData?.spwDocNumber || `SPW-${Math.floor(Math.random() * 90 + 10)}/YYS/2026`);
  const [joinDate, setJoinDate] = useState(initialData?.joinDate || '2026-07-15');
  const [monthlyAssistance, setMonthlyAssistance] = useState<number>(initialData?.monthlyAssistance || 750000);

  // Tahfidz
  const [currentJuz, setCurrentJuz] = useState<number>(initialData?.tahfidz.currentJuz || 5);
  const [totalTargetJuz, setTotalTargetJuz] = useState<number>(initialData?.tahfidz.totalTargetJuz || 30);
  const [statusMutqin, setStatusMutqin] = useState(initialData?.tahfidz.statusMutqin || 'Mutqin (Lancar)');
  const [ustadzPembimbing, setUstadzPembimbing] = useState(initialData?.tahfidz.ustadzPembimbing || 'Ust. Farhan Abu Maryam');
  const [lastSurah, setLastSurah] = useState(initialData?.tahfidz.lastSurah || 'Juz Amma / Al-Baqarah');
  const [nilaiUjianTerakhir, setNilaiUjianTerakhir] = useState<number>(initialData?.tahfidz.nilaiUjianTerakhir || 90);

  // Medical
  const [bloodType, setBloodType] = useState(initialData?.medical.bloodType || 'O');
  const [heightCm, setHeightCm] = useState<number>(initialData?.medical.heightCm || 150);
  const [weightKg, setWeightKg] = useState<number>(initialData?.medical.weightKg || 42);
  const [allergies, setAllergies] = useState(initialData?.medical.allergies || 'Tidak ada');
  const [chronicConditions, setChronicConditions] = useState(initialData?.medical.chronicConditions || 'Tidak ada');
  const [healthNotes, setHealthNotes] = useState(initialData?.medical.healthNotes || 'Kondisi kesehatan stabil.');

  const [notes, setNotes] = useState(initialData?.notes || '');
  const [auditRationale, setAuditRationale] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    const payload = {
      fullName,
      nickname: nickname || fullName.split(' ')[0],
      gender,
      birthPlace,
      birthDate,
      careStatus,
      orphanStatus,
      educationLevel,
      schoolName,
      dormRoom,
      guardianName,
      guardianRelation,
      guardianPhone,
      guardianAddress,
      publicConsent,
      spwDocNumber,
      joinDate,
      monthlyAssistance,
      tahfidz: {
        currentJuz,
        totalTargetJuz,
        lastSurah,
        lastAyat: 1,
        statusMutqin,
        ustadzPembimbing,
        nilaiUjianTerakhir
      },
      medical: {
        bloodType: bloodType as any,
        heightCm,
        weightKg,
        allergies,
        chronicConditions,
        lastCheckupDate: new Date().toISOString().slice(0, 10),
        healthNotes
      },
      notes
    };

    onSave(payload, auditRationale);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="bg-surface-container-lowest w-full max-w-3xl rounded-2xl shadow-2xl border border-surface-container overflow-hidden my-6">
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Header */}
          <div className="p-5 bg-surface-container-low border-b border-surface-container flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-primary text-[22px]">
                {isEdit ? 'edit_note' : 'person_add'}
              </span>
              <div>
                <h3 className="text-base font-bold text-on-surface">
                  {isEdit ? `Edit Data Santri: ${initialData?.fullName}` : 'Pendaftaran Santri Anak Asuh Baru'}
                </h3>
                <span className="text-[11px] text-outline">
                  Kepatuhan Standar Dokumen Kemenag &amp; PSAK 109
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-outline hover:text-on-surface cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Form Fields Body */}
          <div className="p-6 max-h-[65vh] overflow-y-auto space-y-5 text-xs">
            {/* Bagian 1: Identitas Pokok */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                1. Identitas Pokok Santri
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-semibold text-outline mb-1">Nama Lengkap Santri *</label>
                  <input
                    required
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Contoh: Muhammad Rayhan Al-Fatih"
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-outline mb-1">Nama Panggilan</label>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="Rayhan"
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-outline mb-1">Jenis Kelamin</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as Gender)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none cursor-pointer"
                  >
                    <option value="Laki-laki">Laki-laki (Putra)</option>
                    <option value="Perempuan">Perempuan (Putri)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-outline mb-1">Kategori Anak Asuh</label>
                  <select
                    value={orphanStatus}
                    onChange={(e) => setOrphanStatus(e.target.value as OrphanStatus)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none cursor-pointer"
                  >
                    <option value="Yatim">Yatim (Ayah Meninggal)</option>
                    <option value="Piatu">Piatu (Ibu Meninggal)</option>
                    <option value="Yatim Piatu">Yatim Piatu</option>
                    <option value="Dhuafa">Dhuafa / Keluarga Miskin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-outline mb-1">Tempat Lahir</label>
                  <input
                    type="text"
                    value={birthPlace}
                    onChange={(e) => setBirthPlace(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-outline mb-1">Tanggal Lahir</label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Bagian 2: Status Kepengasuhan & Pendidikan */}
            <div className="space-y-3 pt-3 border-t border-surface-container">
              <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                2. Status Kepengasuhan &amp; Pendidikan
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-semibold text-outline mb-1">Status Kepengasuhan *</label>
                  <select
                    value={careStatus}
                    onChange={(e) => setCareStatus(e.target.value as CareStatus)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none font-semibold cursor-pointer"
                  >
                    <option value="Mukim Asrama (Penuh)">Mukim Asrama (Penuh)</option>
                    <option value="Non-Mukim (Binaan Luar)">Non-Mukim (Binaan Luar)</option>
                    <option value="Alumni Binaan">Alumni Binaan</option>
                    <option value="Cuti / Karantina">Cuti / Karantina</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-outline mb-1">Penempatan Asrama &amp; Kamar</label>
                  <input
                    type="text"
                    value={dormRoom}
                    onChange={(e) => setDormRoom(e.target.value)}
                    placeholder="Asrama Abu Bakar - Kamar 03"
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-outline mb-1">Jenjang Pendidikan &amp; Kelas</label>
                  <input
                    type="text"
                    value={educationLevel}
                    onChange={(e) => setEducationLevel(e.target.value)}
                    placeholder="SMP / MTs Kls 8 (Tahfidz)"
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-outline mb-1">Nama Lembaga Sekolah</label>
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="MTs Al Irsyad Boarding School"
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-outline mb-1">Bantuan Uang Saku Bulanan (Rp)</label>
                  <input
                    type="number"
                    value={monthlyAssistance}
                    onChange={(e) => setMonthlyAssistance(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-outline mb-1">Tanggal Masuk Yayasan</label>
                  <input
                    type="date"
                    value={joinDate}
                    onChange={(e) => setJoinDate(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Bagian 3: Wali & Kepatuhan UU PDP */}
            <div className="space-y-3 pt-3 border-t border-surface-container">
              <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                3. Data Wali &amp; Kepatuhan UU PDP
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-semibold text-outline mb-1">Nama Lengkap Wali</label>
                  <input
                    type="text"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    placeholder="Ibu Maryam Hasanah"
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-outline mb-1">Hubungan dengan Santri</label>
                  <input
                    type="text"
                    value={guardianRelation}
                    onChange={(e) => setGuardianRelation(e.target.value)}
                    placeholder="Ibu Kandung / Paman / Kakek"
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-outline mb-1">No. WhatsApp / Telepon Wali</label>
                  <input
                    type="text"
                    value={guardianPhone}
                    onChange={(e) => setGuardianPhone(e.target.value)}
                    placeholder="0812-3456-7890"
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-outline mb-1">No. Registrasi SPW</label>
                  <input
                    type="text"
                    value={spwDocNumber}
                    onChange={(e) => setSpwDocNumber(e.target.value)}
                    placeholder="SPW-09/YYS/2026"
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none font-mono"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-semibold text-outline mb-1">Alamat Asal / Tempat Tinggal Wali</label>
                  <input
                    type="text"
                    value={guardianAddress}
                    onChange={(e) => setGuardianAddress(e.target.value)}
                    placeholder="Jl. Pasar Kliwon No. 42, Surakarta"
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none"
                  />
                </div>
              </div>

              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-low border border-surface-container cursor-pointer">
                <input
                  type="checkbox"
                  checked={publicConsent}
                  onChange={(e) => setPublicConsent(e.target.checked)}
                  className="mt-0.5 rounded text-primary"
                />
                <span className="text-[11px] text-on-surface">
                  <strong>Persetujuan Publikasi Dokumentasi Santri (UU PDP No. 27/2022)</strong>: Wali telah menandatangani persetujuan publikasi kegiatan hafalan &amp; dakwah santri untuk laporan donatur.
                </span>
              </label>
            </div>

            {/* Bagian 4: Tahfidz Al-Qur'an */}
            <div className="space-y-3 pt-3 border-t border-surface-container">
              <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                4. Data Tahfidz &amp; Capaian Hafalan
              </span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-outline mb-1">Capaian Juz</label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={currentJuz}
                    onChange={(e) => setCurrentJuz(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-outline mb-1">Target Juz</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={totalTargetJuz}
                    onChange={(e) => setTotalTargetJuz(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-outline mb-1">Status Kelancaran</label>
                  <select
                    value={statusMutqin}
                    onChange={(e) => setStatusMutqin(e.target.value as any)}
                    className="w-full h-10 px-2 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none cursor-pointer"
                  >
                    <option value="Mutqin (Lancar)">Mutqin (Lancar)</option>
                    <option value="Ziyadah (Menambah)">Ziyadah (Menambah)</option>
                    <option value="Murajaah (Mengulang)">Murajaah (Mengulang)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-outline mb-1">Nilai Ujian (0-100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={nilaiUjianTerakhir}
                    onChange={(e) => setNilaiUjianTerakhir(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none font-mono font-bold"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[11px] font-semibold text-outline mb-1">Hafalan Terakhir (Surah/Ayat)</label>
                  <input
                    type="text"
                    value={lastSurah}
                    onChange={(e) => setLastSurah(e.target.value)}
                    placeholder="Al-Anfal (Juz 9 - Ayat 40)"
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[11px] font-semibold text-outline mb-1">Ustaz Pembimbing Halaqah</label>
                  <input
                    type="text"
                    value={ustadzPembimbing}
                    onChange={(e) => setUstadzPembimbing(e.target.value)}
                    placeholder="Ust. Farhan Abu Maryam"
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container text-on-surface outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Bagian 5: Alasan Perubahan untuk Audit Trail (Jika Edit) */}
            {isEdit && (
              <div className="space-y-2 pt-3 border-t border-surface-container bg-surface-container-highest/20 p-3 rounded-xl border">
                <span className="text-xs font-bold text-secondary uppercase tracking-wider block">
                  Catatan Justifikasi Audit Trail (Immutable Log)
                </span>
                <input
                  type="text"
                  value={auditRationale}
                  onChange={(e) => setAuditRationale(e.target.value)}
                  placeholder="Misal: Santri resmi masuk asrama mukim tahun ajaran baru dan wali menyerahkan berkas SPW."
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-lowest border border-surface-container text-on-surface outline-none"
                />
                <span className="text-[10px] text-outline block">
                  Perubahan data akan otomatis dicatat ke tabel Audit Log dengan rantai enkripsi SHA-256.
                </span>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-5 bg-surface-container-low border-t border-surface-container flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-4 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="h-10 px-5 rounded-lg bg-primary hover:bg-primary/90 text-on-primary font-semibold text-xs shadow-xs transition-colors cursor-pointer"
            >
              {isEdit ? 'Simpan Perubahan & Catat Audit' : 'Daftarkan Santri Baru'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
