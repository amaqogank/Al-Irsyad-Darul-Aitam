export type CareStatus = 'Mukim Asrama (Penuh)' | 'Non-Mukim (Binaan Luar)' | 'Alumni Binaan' | 'Cuti / Karantina';
export type Gender = 'Laki-laki' | 'Perempuan';
export type OrphanStatus = 'Yatim' | 'Piatu' | 'Yatim Piatu' | 'Dhuafa';
export type EducationLevel = 'SD / MI' | 'SMP / MTs' | 'SMA / MA' | 'Perguruan Tinggi' | 'Pra-Sekolah';

export interface TahfidzProgress {
  currentJuz: number;
  totalTargetJuz: number;
  lastSurah: string;
  lastAyat: number;
  statusMutqin: 'Mutqin (Lancar)' | 'Ziyadah (Menambah)' | 'Murajaah (Mengulang)';
  ustadzPembimbing: string;
  nilaiUjianTerakhir: number; // 0 - 100
}

export interface MedicalRecord {
  bloodType: 'A' | 'B' | 'AB' | 'O' | '-';
  heightCm: number;
  weightKg: number;
  allergies: string;
  chronicConditions: string;
  lastCheckupDate: string;
  healthNotes: string;
}

export interface Santri {
  id: string; // e.g. AST-0841
  nis: string; // Nomor Induk Santri, e.g. 2026.0841
  fullName: string;
  nickname: string;
  gender: Gender;
  birthPlace: string;
  birthDate: string; // YYYY-MM-DD
  careStatus: CareStatus;
  orphanStatus: OrphanStatus;
  educationLevel: string; // e.g. SMP / MTs Kls 8 (Tahfidz)
  schoolName: string;
  dormRoom: string; // e.g. Asrama Abu Bakar - Kamar 03
  guardianName: string;
  guardianRelation: string; // Ibu Kandung, Paman, Kakek, dll
  guardianPhone: string;
  guardianAddress: string;
  publicConsent: boolean; // Izin publikasi dokumentasi/PDP
  spwDocNumber: string; // No. Surat Pernyataan Wali
  joinDate: string;
  photoUrl?: string;
  monthlyAssistance: number; // Rp uang saku / santunan
  tahfidz: TahfidzProgress;
  medical: MedicalRecord;
  notes?: string;
  updatedAt: string;
  updatedBy: string;
}

export type ActionType = 'CREATE' | 'UPDATE' | 'VERIFY' | 'VOID' | 'DELETE';
export type AuditTable = 'children' | 'donations' | 'expenses' | 'financial_reports' | 'activities' | 'budgets' | 'users';

export interface AuditDiffField {
  fieldName: string;
  oldValue: any;
  newValue: any;
  description?: string;
}

export interface AuditLogItem {
  id: string; // e.g. AUD-9021
  recordId: string; // e.g. #AST-0841
  table: AuditTable;
  tableNameLabel: string;
  action: ActionType;
  timestamp: string; // ISO format or formatted
  relativeTime: string;
  executorName: string;
  executorRole: string;
  executorIp: string;
  summary: string;
  rationale?: string;
  targetEntityName?: string;
  prevHash: string;
  currHash: string;
  changes: AuditDiffField[];
}

export type DonationCategory = 'Zakat Mal' | 'Zakat Fitrah' | 'Infaq / Sedekah Terikat' | 'Infaq Operasional' | 'Wakaf Tunai (Sumur/Fasilitas)' | 'Orang Tua Asuh Santri';
export type PaymentMethod = 'BSI Virtual Account' | 'Bank Syariah Indonesia' | 'Bank Muamalat' | 'BCA Syariah' | 'Tunai / Kantor Sekretariat' | 'QRIS ZISWAF';

export interface Donation {
  id: string; // e.g. DON-8921
  receiptNumber: string;
  donorName: string;
  donorPhone: string;
  donorEmail?: string;
  category: DonationCategory;
  amount: number;
  date: string;
  paymentMethod: PaymentMethod;
  status: 'Diverifikasi' | 'Menunggu Konfirmasi' | 'Dibatalkan';
  designatedForSantriId?: string;
  designatedForSantriName?: string;
  notes?: string;
  verifiedBy?: string;
  verifiedAt?: string;
}

export type ExpenseCategory = 'Logistik Dapur & Pangan Santri' | 'Pendidikan & SPP Formal' | 'Uang Saku & Beasiswa Santri' | 'Layanan Medis & Kesehatan' | 'Operasional & Listrik Asrama' | 'Pemeliharaan Gedung' | 'Honor Asatidz & Musyrif';

export interface Expense {
  id: string; // e.g. EXP-4018
  voucherNumber: string;
  category: ExpenseCategory;
  title: string;
  amount: number;
  date: string;
  recipient: string;
  approvedBy: string;
  paymentSource: string; // e.g. Kas BSI Operasional
  status: 'Disetujui' | 'Menunggu Approval' | 'VOID (Dibatalkan)';
  voidReason?: string;
  receiptAttachment?: string;
  notes?: string;
}

export interface Budget {
  id: string;
  code: string;
  categoryName: string;
  allocatedAmount: number;
  spentAmount: number;
  fiscalPeriod: string; // e.g. 1446 H / Q4 2026
}

export interface FoundationActivity {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'Halaqah Tahfidz' | 'Kajian & Dakwah' | 'Rihlah & Outing' | 'Ekstrakurikuler' | 'Pemeriksaan Medis' | 'Bakti Sosial';
  picUstadz: string;
  santriParticipantCount: number;
  description: string;
  status: 'Akan Datang' | 'Berjalan' | 'Selesai';
}

export interface SystemUser {
  id: string;
  name: string;
  title?: string;
  role: 'Ketua Yayasan' | 'Bendahara' | 'Musyrif Senior' | 'Staf Admin' | 'Pembina Tahfidz';
  roleCategory: 'KETUA' | 'BENDAHARA' | 'STAF';
  roleLabel: string;
  nip: string;
  email: string;
  phone: string;
  avatarText: string;
  status: 'Aktif' | 'Nonaktif';
  is_active: boolean;
  lastActive: string;
  ipAddress: string;
}
