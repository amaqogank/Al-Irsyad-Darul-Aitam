import React, { useState } from 'react';
import { Santri } from '../../types';
import { useApp } from '../../context/AppContext';

interface Props {
  santri: Santri;
  onClose: () => void;
  onEdit: (santri: Santri) => void;
  onPrintCard: (santri: Santri) => void;
}

export const SantriDetailModal: React.FC<Props> = ({
  santri,
  onClose,
  onEdit,
  onPrintCard
}) => {
  const [activeTab, setActiveTab] = useState<'biodata' | 'wali' | 'tahfidz' | 'medis'>('biodata');
  const { auditLogs, setActivePath, setSelectedAuditId } = useApp();

  // Find audit logs specifically for this santri
  const relatedAudits = auditLogs.filter(
    (log) => log.recordId === `#${santri.id}` || log.targetEntityName === santri.fullName
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="bg-surface-container-lowest w-full max-w-4xl rounded-2xl shadow-2xl border border-surface-container overflow-hidden my-8 animate-in fade-in duration-200">
        {/* Modal Header */}
        <div className="p-6 bg-surface-container-low border-b border-surface-container flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary text-on-primary font-bold text-xl flex items-center justify-center shadow-sm shrink-0">
              {santri.nickname.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-on-surface">{santri.fullName}</h2>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-surface-container-highest text-primary font-bold">
                  #{santri.id}
                </span>
              </div>
              <div className="text-xs text-on-surface-variant flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                <span>NIS: <strong className="font-mono text-on-surface">{santri.nis}</strong></span>
                <span>•</span>
                <span>{santri.educationLevel}</span>
                <span>•</span>
                <span className="text-secondary font-medium">{santri.careStatus}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-surface-container flex items-center justify-center text-outline hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-surface-container flex items-center gap-2 bg-surface-container-lowest overflow-x-auto">
          <button
            onClick={() => setActiveTab('biodata')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'biodata'
                ? 'border-primary text-primary'
                : 'border-transparent text-outline hover:text-on-surface'
            }`}
          >
            Biodata &amp; Asrama
          </button>
          <button
            onClick={() => setActiveTab('wali')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'wali'
                ? 'border-primary text-primary'
                : 'border-transparent text-outline hover:text-on-surface'
            }`}
          >
            Wali &amp; Berkas PDP
          </button>
          <button
            onClick={() => setActiveTab('tahfidz')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'tahfidz'
                ? 'border-primary text-primary'
                : 'border-transparent text-outline hover:text-on-surface'
            }`}
          >
            Tahfidz &amp; Akademik
          </button>
          <button
            onClick={() => setActiveTab('medis')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'medis'
                ? 'border-primary text-primary'
                : 'border-transparent text-outline hover:text-on-surface'
            }`}
          >
            Rekam Medis &amp; Kesehatan
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {activeTab === 'biodata' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                  <span className="text-[11px] text-outline uppercase font-semibold">Nama Panggilan</span>
                  <p className="text-sm font-semibold text-on-surface">{santri.nickname}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                  <span className="text-[11px] text-outline uppercase font-semibold">Jenis Kelamin</span>
                  <p className="text-sm font-semibold text-on-surface">{santri.gender}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                  <span className="text-[11px] text-outline uppercase font-semibold">Tempat, Tanggal Lahir</span>
                  <p className="text-sm font-semibold text-on-surface">{santri.birthPlace}, {santri.birthDate}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                  <span className="text-[11px] text-outline uppercase font-semibold">Kategori Asuhan</span>
                  <p className="text-sm font-semibold text-primary">{santri.orphanStatus}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                  <span className="text-[11px] text-outline uppercase font-semibold">Kamar / Penempatan Asrama</span>
                  <p className="text-sm font-semibold text-on-surface">{santri.dormRoom}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                  <span className="text-[11px] text-outline uppercase font-semibold">Tanggal Mulai Asuhan</span>
                  <p className="text-sm font-semibold text-on-surface">{santri.joinDate}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                  <span className="text-[11px] text-outline uppercase font-semibold">Bantuan Bulanan / Saku</span>
                  <p className="text-sm font-mono font-bold text-primary">
                    Rp {santri.monthlyAssistance.toLocaleString('id-ID')}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                  <span className="text-[11px] text-outline uppercase font-semibold">Terakhir Diperbarui</span>
                  <p className="text-xs text-on-surface font-medium">{santri.updatedAt} oleh {santri.updatedBy}</p>
                </div>
              </div>

              {santri.notes && (
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                  <span className="text-[11px] text-outline uppercase font-semibold">Catatan Khusus Pengasuh</span>
                  <p className="text-xs text-on-surface italic">“{santri.notes}”</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'wali' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                  <span className="text-[11px] text-outline uppercase font-semibold">Nama Wali / Pengasuh</span>
                  <p className="text-sm font-semibold text-on-surface">{santri.guardianName}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                  <span className="text-[11px] text-outline uppercase font-semibold">Hubungan Keluarga</span>
                  <p className="text-sm font-semibold text-on-surface">{santri.guardianRelation}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                  <span className="text-[11px] text-outline uppercase font-semibold">Kontak Wali (Telepon / WA)</span>
                  <a
                    href={`https://wa.me/${santri.guardianPhone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-mono font-semibold text-primary hover:underline flex items-center gap-1.5"
                  >
                    <span>{santri.guardianPhone}</span>
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                  </a>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                  <span className="text-[11px] text-outline uppercase font-semibold">Dokumen SPW (Surat Pernyataan Wali)</span>
                  <p className="text-xs font-mono font-semibold text-on-surface">{santri.spwDocNumber}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                <span className="text-[11px] text-outline uppercase font-semibold">Alamat Domisili Wali</span>
                <p className="text-xs text-on-surface font-medium">{santri.guardianAddress}</p>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-on-surface block">Persetujuan Publikasi Dokumentasi (UU PDP)</span>
                  <span className="text-[11px] text-outline block">
                    {santri.publicConsent
                      ? 'Wali telah menandatangani persetujuan publikasi kegiatan dakwah yayasan.'
                      : 'Wali meminta data dan foto santri disamarkan (anonimitas terproteksi).'}
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    santri.publicConsent
                      ? 'bg-surface-container-highest text-primary'
                      : 'bg-error-container text-error'
                  }`}
                >
                  {santri.publicConsent ? 'Izin Diberikan' : 'Proteksi Anonim'}
                </span>
              </div>
            </div>
          )}

          {activeTab === 'tahfidz' && (
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-primary-container text-on-primary-container flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-on-primary-container/80 uppercase tracking-wider block font-medium">
                    Progres Capaian Al-Qur’an
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-bold font-mono text-white">
                      {santri.tahfidz.currentJuz}
                    </span>
                    <span className="text-sm text-on-primary-container">
                      dari target {santri.tahfidz.totalTargetJuz} Juz
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/15 text-white">
                    {santri.tahfidz.statusMutqin}
                  </span>
                  <span className="text-xs text-on-primary-container/90 mt-1">
                    Nilai Ujian Terakhir: <strong>{santri.tahfidz.nilaiUjianTerakhir} / 100</strong>
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-outline font-mono">
                  <span>Persentase Target Hafalan</span>
                  <span>{Math.round((santri.tahfidz.currentJuz / santri.tahfidz.totalTargetJuz) * 100)}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-surface-container overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{
                      width: `${(santri.tahfidz.currentJuz / santri.tahfidz.totalTargetJuz) * 100}%`
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                  <span className="text-[11px] text-outline uppercase font-semibold">Hafalan Terakhir (Ziyadah)</span>
                  <p className="text-xs font-semibold text-on-surface">{santri.tahfidz.lastSurah}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                  <span className="text-[11px] text-outline uppercase font-semibold">Asatidz Pembimbing Halaqah</span>
                  <p className="text-xs font-semibold text-on-surface">{santri.tahfidz.ustadzPembimbing}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                  <span className="text-[11px] text-outline uppercase font-semibold">Sekolah Formal</span>
                  <p className="text-xs font-semibold text-on-surface">{santri.schoolName}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                  <span className="text-[11px] text-outline uppercase font-semibold">Tingkat Kelas</span>
                  <p className="text-xs font-semibold text-on-surface">{santri.educationLevel}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'medis' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container text-center space-y-1">
                  <span className="text-[11px] text-outline uppercase font-semibold">Gol. Darah</span>
                  <p className="text-xl font-bold font-mono text-primary">{santri.medical.bloodType}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container text-center space-y-1">
                  <span className="text-[11px] text-outline uppercase font-semibold">Tinggi Badan</span>
                  <p className="text-xl font-bold font-mono text-on-surface">{santri.medical.heightCm} cm</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container text-center space-y-1">
                  <span className="text-[11px] text-outline uppercase font-semibold">Berat Badan</span>
                  <p className="text-xl font-bold font-mono text-on-surface">{santri.medical.weightKg} kg</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container text-center space-y-1">
                  <span className="text-[11px] text-outline uppercase font-semibold">Cek Rutin Terakhir</span>
                  <p className="text-xs font-mono font-semibold text-outline mt-1">{santri.medical.lastCheckupDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                  <span className="text-[11px] text-outline uppercase font-semibold">Riwayat Alergi</span>
                  <p className="text-xs font-semibold text-on-surface">{santri.medical.allergies}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                  <span className="text-[11px] text-outline uppercase font-semibold">Penyakit Kronis / Bawaan</span>
                  <p className="text-xs font-semibold text-on-surface">{santri.medical.chronicConditions}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-1">
                <span className="text-[11px] text-outline uppercase font-semibold">Catatan Kesehatan Petugas Medis</span>
                <p className="text-xs text-on-surface font-medium">{santri.medical.healthNotes}</p>
              </div>
            </div>
          )}

          {/* Related Audits Mini Section */}
          {relatedAudits.length > 0 && (
            <div className="pt-4 border-t border-surface-container">
              <span className="text-xs font-bold text-on-surface block mb-2">
                Riwayat Audit Perubahan Terkait ({relatedAudits.length} Log)
              </span>
              <div className="space-y-2">
                {relatedAudits.slice(0, 2).map((audit) => (
                  <div
                    key={audit.id}
                    onClick={() => {
                      onClose();
                      setSelectedAuditId(audit.id);
                      setActivePath('audit-log');
                    }}
                    className="p-3 bg-surface-container-low hover:bg-surface-container rounded-xl flex items-center justify-between text-xs cursor-pointer transition-colors border border-surface-container"
                  >
                    <div>
                      <span className="font-semibold text-primary">{audit.summary}</span>
                      <span className="text-[10px] text-outline block">{audit.timestamp} oleh {audit.executorName}</span>
                    </div>
                    <span className="text-[11px] text-primary font-semibold hover:underline">Lihat Diff</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-surface-container-low border-t border-surface-container flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onPrintCard(santri)}
            className="h-10 px-4 bg-surface-container-lowest hover:bg-surface-container text-on-surface text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors border border-surface-container cursor-pointer shadow-2xs"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">badge</span>
            <span>Cetak Kartu Identitas Santri</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(santri)}
              className="h-10 px-4 bg-primary hover:bg-primary/90 text-on-primary text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
              <span>Edit Data Santri</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
