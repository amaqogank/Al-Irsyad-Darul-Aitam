import { Santri, AuditLogItem, Donation, Expense, Budget, FoundationActivity, SystemUser } from '../types';

export const initialSantriList: Santri[] = [
  {
    id: 'AST-0841',
    nis: '2026.0841',
    fullName: 'Muhammad Rayhan Al-Fatih',
    nickname: 'Rayhan',
    gender: 'Laki-laki',
    birthPlace: 'Solo, Jawa Tengah',
    birthDate: '2012-05-14',
    careStatus: 'Mukim Asrama (Penuh)',
    orphanStatus: 'Yatim',
    educationLevel: 'SMP / MTs Kls 8 (Tahfidz)',
    schoolName: 'MTs Al Irsyad Boarding School',
    dormRoom: 'Asrama Abu Bakar - Kamar 03',
    guardianName: 'Ibu Maryam Hasanah',
    guardianRelation: 'Ibu Kandung',
    guardianPhone: '0812-3456-7890',
    guardianAddress: 'Jl. Pasar Kliwon No. 42, Surakarta',
    publicConsent: true,
    spwDocNumber: 'SPW-09/YYS/2026',
    joinDate: '2023-07-15',
    monthlyAssistance: 750000,
    tahfidz: {
      currentJuz: 8,
      totalTargetJuz: 30,
      lastSurah: 'Al-Anfal (Juz 9 - Ayat 40)',
      lastAyat: 40,
      statusMutqin: 'Mutqin (Lancar)',
      ustadzPembimbing: 'Ust. Farhan Abu Maryam',
      nilaiUjianTerakhir: 94
    },
    medical: {
      bloodType: 'O',
      heightCm: 152,
      weightKg: 43,
      allergies: 'Udang / Seafood',
      chronicConditions: 'Tidak Ada',
      lastCheckupDate: '2026-09-20',
      healthNotes: 'Kondisi fisik prima, rutin olahraga memanah tiap sore.'
    },
    notes: 'Santri resmi masuk asrama mukim tahun ajaran baru dan wali menyerahkan berkas SPW.',
    updatedAt: '2026-10-14 14:28:12',
    updatedBy: 'Ust. Ahmad Zaki, S.E.I.'
  },
  {
    id: 'AST-0842',
    nis: '2026.0842',
    fullName: 'Abdullah Faris Al-Habsyi',
    nickname: 'Faris',
    gender: 'Laki-laki',
    birthPlace: 'Pekalongan, Jawa Tengah',
    birthDate: '2011-09-08',
    careStatus: 'Mukim Asrama (Penuh)',
    orphanStatus: 'Yatim Piatu',
    educationLevel: 'SMP / MTs Kls 9 (Tahfidz)',
    schoolName: 'MTs Al Irsyad Boarding School',
    dormRoom: 'Asrama Abu Bakar - Kamar 01',
    guardianName: 'Kakek H. Salim Bawazir',
    guardianRelation: 'Kakek',
    guardianPhone: '0857-8910-2234',
    guardianAddress: 'Krapyak Kidul RT 03/RW 02, Pekalongan',
    publicConsent: true,
    spwDocNumber: 'SPW-02/YYS/2023',
    joinDate: '2022-07-10',
    monthlyAssistance: 850000,
    tahfidz: {
      currentJuz: 14,
      totalTargetJuz: 30,
      lastSurah: 'Al-Hijr (Juz 14 - Ayat 50)',
      lastAyat: 50,
      statusMutqin: 'Mutqin (Lancar)',
      ustadzPembimbing: 'Ust. Muhammad Wildan, Lc.',
      nilaiUjianTerakhir: 98
    },
    medical: {
      bloodType: 'B',
      heightCm: 158,
      weightKg: 48,
      allergies: 'Debu tebal (bersin ringan)',
      chronicConditions: 'Tidak Ada',
      lastCheckupDate: '2026-09-20',
      healthNotes: 'Sehat wal afiat, kandidat wisuda tahfidz 15 juz akhir tahun.'
    },
    notes: 'Kandidat beasiswa sanad tahfidz ke Ma’had ‘Aly.',
    updatedAt: '2026-10-12 10:15:00',
    updatedBy: 'Ust. Farhan Abu Maryam'
  },
  {
    id: 'AST-0843',
    nis: '2026.0843',
    fullName: 'Aisyah Humaira Azzahra',
    nickname: 'Aisyah',
    gender: 'Perempuan',
    birthPlace: 'Semarang, Jawa Tengah',
    birthDate: '2013-03-21',
    careStatus: 'Mukim Asrama (Penuh)',
    orphanStatus: 'Yatim',
    educationLevel: 'SD / MI Kls 6',
    schoolName: 'SD Islam Al Irsyad 01',
    dormRoom: 'Asrama Khadijah - Kamar 02',
    guardianName: 'Ibu Fatimah Sungkar',
    guardianRelation: 'Ibu Kandung',
    guardianPhone: '0813-2289-4411',
    guardianAddress: 'Banyumanik Indah Blok C-4, Semarang',
    publicConsent: true,
    spwDocNumber: 'SPW-11/YYS/2024',
    joinDate: '2024-01-10',
    monthlyAssistance: 700000,
    tahfidz: {
      currentJuz: 6,
      totalTargetJuz: 30,
      lastSurah: 'Al-Ma’idah (Juz 6 - Ayat 80)',
      lastAyat: 80,
      statusMutqin: 'Ziyadah (Menambah)',
      ustadzPembimbing: 'Ustadzah Salma Basalamah',
      nilaiUjianTerakhir: 91
    },
    medical: {
      bloodType: 'A',
      heightCm: 142,
      weightKg: 34,
      allergies: 'Tidak ada',
      chronicConditions: 'Tidak ada',
      lastCheckupDate: '2026-09-22',
      healthNotes: 'Perlu suplementasi vitamin zat besi.'
    },
    notes: 'Juara 1 Lomba Pidato Bahasa Arab Tingkat Kota.',
    updatedAt: '2026-10-10 16:30:00',
    updatedBy: 'Siti Maryam, S.Kom'
  },
  {
    id: 'AST-0844',
    nis: '2026.0844',
    fullName: 'Ahmad Fauzan Baswedan',
    nickname: 'Fauzan',
    gender: 'Laki-laki',
    birthPlace: 'Surabaya, Jawa Timur',
    birthDate: '2010-11-15',
    careStatus: 'Mukim Asrama (Penuh)',
    orphanStatus: 'Piatu',
    educationLevel: 'SMA / MA Kls 10',
    schoolName: 'MA Al Irsyad Al Islamiyyah',
    dormRoom: 'Asrama Umar bin Khattab - Kamar 04',
    guardianName: 'Bapak Anis Baswedan',
    guardianRelation: 'Ayah Kandung',
    guardianPhone: '0821-4455-6677',
    guardianAddress: 'Ampel Suci Gg 5 No. 18, Surabaya',
    publicConsent: true,
    spwDocNumber: 'SPW-15/YYS/2025',
    joinDate: '2023-07-01',
    monthlyAssistance: 800000,
    tahfidz: {
      currentJuz: 18,
      totalTargetJuz: 30,
      lastSurah: 'Al-Kahf (Juz 15-16)',
      lastAyat: 110,
      statusMutqin: 'Mutqin (Lancar)',
      ustadzPembimbing: 'Ust. Muhammad Wildan, Lc.',
      nilaiUjianTerakhir: 96
    },
    medical: {
      bloodType: 'O',
      heightCm: 167,
      weightKg: 56,
      allergies: 'Tidak ada',
      chronicConditions: 'Tidak ada',
      lastCheckupDate: '2026-09-20',
      healthNotes: 'Ketua regu asrama putra, fisik sangat bugar.'
    },
    notes: 'Rutin memimpin imam shalat rawatib santri junior.',
    updatedAt: '2026-10-09 11:20:00',
    updatedBy: 'Ust. Ahmad Zaki, S.E.I.'
  },
  {
    id: 'AST-0845',
    nis: '2026.0845',
    fullName: 'Bilal bin Yusuf At-Tamimi',
    nickname: 'Bilal',
    gender: 'Laki-laki',
    birthPlace: 'Tegal, Jawa Tengah',
    birthDate: '2014-02-18',
    careStatus: 'Non-Mukim (Binaan Luar)',
    orphanStatus: 'Yatim',
    educationLevel: 'SD / MI Kls 5',
    schoolName: 'SD Negeri Pekauman 02',
    dormRoom: 'Binaan Luar (Keluarga Mandiri)',
    guardianName: 'Ibu Aminah Al-Katiri',
    guardianRelation: 'Ibu Kandung',
    guardianPhone: '0878-1122-3344',
    guardianAddress: 'Jl. Ahmad Yani No. 12, Kota Tegal',
    publicConsent: false,
    spwDocNumber: 'SPW-04/YYS/2025',
    joinDate: '2025-01-08',
    monthlyAssistance: 500000,
    tahfidz: {
      currentJuz: 3,
      totalTargetJuz: 10,
      lastSurah: 'An-Naba s.d Al-Inshiqaq',
      lastAyat: 25,
      statusMutqin: 'Ziyadah (Menambah)',
      ustadzPembimbing: 'Ust. Farhan Abu Maryam',
      nilaiUjianTerakhir: 88
    },
    medical: {
      bloodType: 'B',
      heightCm: 135,
      weightKg: 30,
      allergies: 'Dingin malam',
      chronicConditions: 'Tidak ada',
      lastCheckupDate: '2026-08-15',
      healthNotes: 'Mengikuti program bimbingan belajar akhir pekan di kantor cabang.'
    },
    notes: 'Santri binaan program beasiswa pendidikan non-mukim yatim perkotaan.',
    updatedAt: '2026-09-30 14:10:00',
    updatedBy: 'Siti Maryam, S.Kom'
  },
  {
    id: 'AST-0846',
    nis: '2026.0846',
    fullName: 'Khadijah Najwa Al-Jufri',
    nickname: 'Najwa',
    gender: 'Perempuan',
    birthPlace: 'Surakarta, Jawa Tengah',
    birthDate: '2012-08-30',
    careStatus: 'Mukim Asrama (Penuh)',
    orphanStatus: 'Yatim Piatu',
    educationLevel: 'SMP / MTs Kls 7',
    schoolName: 'MTs Al Irsyad Putri',
    dormRoom: 'Asrama Khadijah - Kamar 01',
    guardianName: 'Bibi Ruqayyah Al-Jufri',
    guardianRelation: 'Bibi',
    guardianPhone: '0815-6677-8899',
    guardianAddress: 'Sangkrah RT 01/RW 04, Solo',
    publicConsent: true,
    spwDocNumber: 'SPW-18/YYS/2026',
    joinDate: '2026-07-12',
    monthlyAssistance: 750000,
    tahfidz: {
      currentJuz: 5,
      totalTargetJuz: 30,
      lastSurah: 'An-Nisa (Juz 5)',
      lastAyat: 45,
      statusMutqin: 'Murajaah (Mengulang)',
      ustadzPembimbing: 'Ustadzah Salma Basalamah',
      nilaiUjianTerakhir: 90
    },
    medical: {
      bloodType: 'AB',
      heightCm: 148,
      weightKg: 39,
      allergies: 'Tidak ada',
      chronicConditions: 'Tidak ada',
      lastCheckupDate: '2026-09-22',
      healthNotes: 'Aktif di klub kaligrafi Arab yayasan.'
    },
    notes: 'Menerima bantuan paket seragam dan kitab lengkap dari donatur tetap.',
    updatedAt: '2026-10-01 09:40:00',
    updatedBy: 'Ust. Ahmad Zaki, S.E.I.'
  }
];

export const initialAuditLogs: AuditLogItem[] = [
  {
    id: 'AUD-9021',
    recordId: '#AST-0841',
    table: 'children',
    tableNameLabel: 'children (Anak Asuh)',
    action: 'UPDATE',
    timestamp: '2026-10-14 14:28:12 WIB',
    relativeTime: '12 mnt lalu',
    executorName: 'Ust. Ahmad Zaki',
    executorRole: 'Bendahara',
    executorIp: '192.168.1.18',
    summary: 'Pembaruan status kepengasuhan & izin publikasi santri (M. Rayhan)',
    rationale: 'Santri resmi masuk asrama mukim tahun ajaran baru dan wali menyerahkan berkas SPW.',
    targetEntityName: 'Muhammad Rayhan Al-Fatih',
    prevHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    currHash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    changes: [
      {
        fieldName: 'care_status',
        oldValue: 'Non-Mukim (Binaan Luar)',
        newValue: 'Mukim Asrama (Penuh)',
        description: 'Perubahan jenis asuhan dari binaan luar menjadi santri mukim penuh'
      },
      {
        fieldName: 'guardian_phone',
        oldValue: '0812-3456-7890',
        newValue: '0812-3456-7890',
        description: 'Nomor telepon wali tetap valid'
      },
      {
        fieldName: 'public_consent',
        oldValue: false,
        newValue: true,
        description: 'Wali menandatangani persetujuan publikasi No. SPW-09'
      },
      {
        fieldName: 'education_level',
        oldValue: 'SD / MI Kelas 6',
        newValue: 'SMP / MTs Kls 8 (Tahfidz)',
        description: 'Kenaikan jenjang pendidikan ke tingkat lanjutan'
      },
      {
        fieldName: 'updated_at',
        oldValue: '10 Jan 2026, 09:12:00',
        newValue: '14 Okt 2026, 14:28:12',
        description: 'Stempel waktu audit trail sistem'
      }
    ]
  },
  {
    id: 'AUD-9020',
    recordId: '#DON-8921',
    table: 'donations',
    tableNameLabel: 'donations (Donasi & Wakaf)',
    action: 'VERIFY',
    timestamp: '2026-10-14 13:10:04 WIB',
    relativeTime: '1 jam lalu',
    executorName: 'H. Abdullah Azzam',
    executorRole: 'Ketua Yayasan',
    executorIp: '192.168.1.10',
    summary: 'Verifikasi mutasi kas donasi masuk BSI Rp 25.000.000 (Wakaf Sumur)',
    rationale: 'Kroscek rekening koran Bank Syariah Indonesia mutasi masuk valid dari H. Faisal Sungkar.',
    targetEntityName: 'Wakaf Sumur Bor Asrama Tahfidz Putri',
    prevHash: '7a2249e29a9f24b8e3a24192b02f5e3d7894a2f8b54e3d2c1b0a9f8e7d6c5b4a',
    currHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    changes: [
      {
        fieldName: 'verification_status',
        oldValue: 'Menunggu Konfirmasi',
        newValue: 'Diverifikasi',
        description: 'Status verifikasi mutasi bank BSI'
      },
      {
        fieldName: 'receipt_issued',
        oldValue: false,
        newValue: true,
        description: 'Kwitansi digital otomatis dikirim via WhatsApp donatur'
      },
      {
        fieldName: 'fund_allocation',
        oldValue: 'Dana Wakaf Belum Terikat',
        newValue: 'Wakaf Fasilitas Sumur Bor',
        description: 'Pengikatan pos syariah PSAK 109'
      }
    ]
  },
  {
    id: 'AUD-9019',
    recordId: '#EXP-4018',
    table: 'expenses',
    tableNameLabel: 'expenses (Pengeluaran Kas)',
    action: 'VOID',
    timestamp: '2026-10-14 11:45:30 WIB',
    relativeTime: '3 jam lalu',
    executorName: 'Ust. Ahmad Zaki',
    executorRole: 'Bendahara',
    executorIp: '192.168.1.18',
    summary: 'Pembatalan voucher kas belanja logistik dapur (Duplikasi nota)',
    rationale: 'Nota beras 500kg ternyata sudah terinput di voucher EXP-4015 sebelumnya oleh juru masak.',
    targetEntityName: 'Belanja Pangan Beras 500kg',
    prevHash: '1c4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f',
    currHash: '7a2249e29a9f24b8e3a24192b02f5e3d7894a2f8b54e3d2c1b0a9f8e7d6c5b4a',
    changes: [
      {
        fieldName: 'expense_status',
        oldValue: 'Menunggu Approval',
        newValue: 'VOID (Dibatalkan)',
        description: 'Status voucher dibatalkan untuk menghindari dobel bayar'
      },
      {
        fieldName: 'reversal_ledger',
        oldValue: 'Rp 6.750.000 (Pending)',
        newValue: 'Rp 0 (Jurnal Balik Kas)',
        description: 'Penyesuaian saldo buku kas tunai yayasan'
      }
    ]
  },
  {
    id: 'AUD-9018',
    recordId: '#REP-2026-10',
    table: 'financial_reports',
    tableNameLabel: 'financial_reports (Laporan Keuangan)',
    action: 'CREATE',
    timestamp: '2026-10-14 09:15:20 WIB',
    relativeTime: '5 jam lalu',
    executorName: 'Siti Maryam, S.Kom',
    executorRole: 'Staf Admin',
    executorIp: '192.168.1.34',
    summary: 'Penyusunan draf Laporan Posisi Keuangan Triwulan III 1446 H',
    rationale: 'Pelaporan rutin kepatuhan PSAK 109 untuk sidang pleno pengurus yayasan.',
    targetEntityName: 'Laporan Keuangan Q3 1446 H',
    prevHash: 'f4e3d2c1b0a9f8e7d6c5b4a39281726354453627182930415263748596071829',
    currHash: '1c4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f',
    changes: [
      {
        fieldName: 'report_period',
        oldValue: 'null',
        newValue: 'Juli - September 2026 (Muharram - Rabiul Awwal 1446 H)',
        description: 'Periode akuntansi keuangan syariah'
      },
      {
        fieldName: 'total_fund_balance',
        oldValue: 'Rp 0',
        newValue: 'Rp 642.850.000',
        description: 'Total akumulasi dana zakat, infak, wakaf terikat'
      }
    ]
  },
  {
    id: 'AUD-9017',
    recordId: '#BDG-2026-Q4',
    table: 'budgets',
    tableNameLabel: 'budgets (Anggaran RAPB)',
    action: 'UPDATE',
    timestamp: '2026-10-13 17:40:02 WIB',
    relativeTime: '1 hari lalu',
    executorName: 'Ust. Ahmad Zaki',
    executorRole: 'Bendahara',
    executorIp: '192.168.1.18',
    summary: 'Realokasi pos dana kesehatan darurat santri asrama putri',
    rationale: 'Penambahan alokasi klinik dokter rujukan & vitamin imunitas musim pancaroba.',
    targetEntityName: 'Pos Layanan Medis & Kesehatan Santri',
    prevHash: '3b2a1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b',
    currHash: 'f4e3d2c1b0a9f8e7d6c5b4a39281726354453627182930415263748596071829',
    changes: [
      {
        fieldName: 'allocated_amount',
        oldValue: 'Rp 15.000.000',
        newValue: 'Rp 22.500.000',
        description: 'Kenaikan plafon anggaran kesehatan santri Q4'
      },
      {
        fieldName: 'source_transfer',
        oldValue: 'Sisa Cadangan Operasional',
        newValue: 'Dialihkan ke Dana Medis',
        description: 'Persetujuan pleno Bendahara & Musyrif'
      }
    ]
  },
  {
    id: 'AUD-9016',
    recordId: '#ACT-092',
    table: 'activities',
    tableNameLabel: 'activities (Kegiatan Santri)',
    action: 'CREATE',
    timestamp: '2026-10-13 14:02:11 WIB',
    relativeTime: '1 hari lalu',
    executorName: 'Siti Maryam, S.Kom',
    executorRole: 'Staf Admin',
    executorIp: '192.168.1.34',
    summary: 'Pendaftaran agenda Rihlah & Ujian Tahfidz Akbar 1446 H',
    rationale: 'Penyusunan jadwal evaluasi hafalan santri bertempat di Agro Edukasi Tawangmangu.',
    targetEntityName: 'Rihlah & Ujian Tahfidz Akbar Santri 1446 H',
    prevHash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    currHash: '3b2a1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b',
    changes: [
      {
        fieldName: 'event_date',
        oldValue: 'null',
        newValue: '24 - 25 Oktober 2026',
        description: 'Jadwal pelaksanaan rihlah dan ujian'
      },
      {
        fieldName: 'participant_target',
        oldValue: '0',
        newValue: '65 Santri & 12 Asatidz',
        description: 'Estimasi jumlah peserta mukim dan binaan'
      }
    ]
  }
];

export const initialDonations: Donation[] = [
  {
    id: 'DON-8921',
    receiptNumber: 'KW/ZIS-8921/2026',
    donorName: 'H. Faisal Sungkar',
    donorPhone: '0811-2233-4455',
    donorEmail: 'faisal.sungkar@gmail.com',
    category: 'Wakaf Tunai (Sumur/Fasilitas)',
    amount: 25000000,
    date: '2026-10-14',
    paymentMethod: 'Bank Syariah Indonesia',
    status: 'Diverifikasi',
    notes: 'Wakaf sarana sumur bor asrama santriwati tahfidz.',
    verifiedBy: 'H. Abdullah Azzam',
    verifiedAt: '2026-10-14 13:10:04'
  },
  {
    id: 'DON-8922',
    receiptNumber: 'KW/ZIS-8922/2026',
    donorName: 'Ibu Hj. Mariam Al-Habsyi',
    donorPhone: '0812-9988-7766',
    donorEmail: 'mariam.habsyi@yahoo.com',
    category: 'Orang Tua Asuh Santri',
    amount: 3000000,
    date: '2026-10-14',
    paymentMethod: 'BSI Virtual Account',
    status: 'Diverifikasi',
    designatedForSantriId: 'AST-0841',
    designatedForSantriName: 'Muhammad Rayhan Al-Fatih',
    notes: 'Biaya asrama & saku 4 bulan ke depan.',
    verifiedBy: 'Ust. Ahmad Zaki',
    verifiedAt: '2026-10-14 10:20:11'
  },
  {
    id: 'DON-8923',
    receiptNumber: 'KW/ZIS-8923/2026',
    donorName: 'dr. Hendra Kurniawan, Sp.A',
    donorPhone: '0813-5566-7788',
    category: 'Zakat Mal',
    amount: 15000000,
    date: '2026-10-13',
    paymentMethod: 'Bank Muamalat',
    status: 'Diverifikasi',
    notes: 'Penunaian nisab zakat profesi & perniagaan klinis.',
    verifiedBy: 'Ust. Ahmad Zaki',
    verifiedAt: '2026-10-13 15:45:00'
  },
  {
    id: 'DON-8924',
    receiptNumber: 'KW/ZIS-8924/2026',
    donorName: 'Hamba Allah (Anonim Pekalongan)',
    donorPhone: '0856-7788-9900',
    category: 'Infaq Operasional',
    amount: 5000000,
    date: '2026-10-13',
    paymentMethod: 'Tunai / Kantor Sekretariat',
    status: 'Diverifikasi',
    notes: 'Infaq rutin jumat berkah untuk dapur asrama.',
    verifiedBy: 'Siti Maryam, S.Kom',
    verifiedAt: '2026-10-13 11:30:00'
  },
  {
    id: 'DON-8925',
    receiptNumber: 'KW/ZIS-8925/2026',
    donorName: 'PT Berkah Logistik Madani',
    donorPhone: '021-7788990',
    donorEmail: 'csr@berkahmadani.co.id',
    category: 'Infaq / Sedekah Terikat',
    amount: 50000000,
    date: '2026-10-12',
    paymentMethod: 'Bank Syariah Indonesia',
    status: 'Diverifikasi',
    notes: 'Program CSR beasiswa santri yatim penghafal Al-Qur’an.',
    verifiedBy: 'H. Abdullah Azzam',
    verifiedAt: '2026-10-12 14:00:00'
  }
];

export const initialExpenses: Expense[] = [
  {
    id: 'EXP-4015',
    voucherNumber: 'VC-KAS/2026/10-015',
    category: 'Logistik Dapur & Pangan Santri',
    title: 'Belanja Bahan Pangan Pokok (Beras Cianjur 500kg & Minyak Goreng)',
    amount: 6750000,
    date: '2026-10-14',
    recipient: 'Toko Beras Barokah Pasar Kliwon',
    approvedBy: 'Ust. Ahmad Zaki',
    paymentSource: 'Kas BSI Operasional',
    status: 'Disetujui',
    notes: 'Kebutuhan makan harian 65 santri mukim 2 pekan.'
  },
  {
    id: 'EXP-4016',
    voucherNumber: 'VC-KAS/2026/10-016',
    category: 'Pendidikan & SPP Formal',
    title: 'Pembayaran SPP MTs & MA Al Irsyad Bulan Oktober (42 Santri)',
    amount: 14700000,
    date: '2026-10-13',
    recipient: 'Bendahara Sekolah Al Irsyad',
    approvedBy: 'H. Abdullah Azzam',
    paymentSource: 'Kas BSI Operasional',
    status: 'Disetujui',
    notes: 'Subsidi penuh SPP sekolah formal santri asrama.'
  },
  {
    id: 'EXP-4017',
    voucherNumber: 'VC-KAS/2026/10-017',
    category: 'Layanan Medis & Kesehatan',
    title: 'Pemeriksaan Rutin Dokter Gigi & Suplemen Multivitamin Santri',
    amount: 3200000,
    date: '2026-10-12',
    recipient: 'Klinik Pratama PKU Muhammadiyah',
    approvedBy: 'Ust. Ahmad Zaki',
    paymentSource: 'Kas BSI Operasional',
    status: 'Disetujui',
    notes: 'Pemeriksaan gigi 65 santri dan pemberian obat flu.'
  },
  {
    id: 'EXP-4018',
    voucherNumber: 'VC-KAS/2026/10-018',
    category: 'Logistik Dapur & Pangan Santri',
    title: 'Pembelian Cadangan Beras Tambahan (Duplikasi Nota)',
    amount: 6750000,
    date: '2026-10-14',
    recipient: 'Toko Beras Barokah',
    approvedBy: 'Ust. Ahmad Zaki',
    paymentSource: 'Kas Tunai Yayasan',
    status: 'VOID (Dibatalkan)',
    voidReason: 'Duplikasi nota pembelanjaan dengan voucher VC-KAS/2026/10-015.',
    notes: 'Dibatalkan demi integritas pembukuan kas.'
  }
];

export const initialBudgets: Budget[] = [
  {
    id: 'BDG-01',
    code: 'B-PANGAN',
    categoryName: 'Logistik Dapur & Pangan Santri',
    allocatedAmount: 45000000,
    spentAmount: 28500000,
    fiscalPeriod: '1446 H / Q4 2026'
  },
  {
    id: 'BDG-02',
    code: 'B-DIK',
    categoryName: 'Pendidikan, Kitab & SPP Formal',
    allocatedAmount: 38000000,
    spentAmount: 22400000,
    fiscalPeriod: '1446 H / Q4 2026'
  },
  {
    id: 'BDG-03',
    code: 'B-KESH',
    categoryName: 'Layanan Medis & Kesehatan Santri',
    allocatedAmount: 22500000,
    spentAmount: 8900000,
    fiscalPeriod: '1446 H / Q4 2026'
  },
  {
    id: 'BDG-04',
    code: 'B-OPS',
    categoryName: 'Operasional, Listrik & Air Asrama',
    allocatedAmount: 18000000,
    spentAmount: 11200000,
    fiscalPeriod: '1446 H / Q4 2026'
  },
  {
    id: 'BDG-05',
    code: 'B-HONOR',
    categoryName: 'Kesejahteraan Musyrif & Guru Tahfidz',
    allocatedAmount: 35000000,
    spentAmount: 28000000,
    fiscalPeriod: '1446 H / Q4 2026'
  }
];

export const initialActivities: FoundationActivity[] = [
  {
    id: 'ACT-092',
    title: 'Rihlah Tadabbur Alam & Ujian Tahfidz Akbar 1446 H',
    date: '2026-10-24',
    time: '07:30 - 16:30 WIB',
    location: 'Agro Edukasi Lereng Lawu, Tawangmangu',
    category: 'Rihlah & Outing',
    picUstadz: 'Ust. Muhammad Wildan, Lc.',
    santriParticipantCount: 65,
    description: 'Ujian tasmi’ sekali duduk 5 juz santri mukim sekaligus rihlah penyegaran jasmani.',
    status: 'Akan Datang'
  },
  {
    id: 'ACT-091',
    title: 'Halaqah Subuh: Setoran Ziyadah & Mutqin Harian',
    date: '2026-10-15',
    time: '05:00 - 06:30 WIB',
    location: 'Masjid Jami’ Al Irsyad Pusat',
    category: 'Halaqah Tahfidz',
    picUstadz: 'Ust. Farhan Abu Maryam',
    santriParticipantCount: 48,
    description: 'Setoran hafalan santri mukim asrama putra dan putri dengan musyrif masing-masing.',
    status: 'Berjalan'
  },
  {
    id: 'ACT-090',
    title: 'Kajian Rutin Adab Menuntut Ilmu & Sirah Nabawiyah',
    date: '2026-10-12',
    time: '18:30 - 19:45 WIB',
    location: 'Aula Utama Darul Aitam',
    category: 'Kajian & Dakwah',
    picUstadz: 'H. Abdullah Azzam',
    santriParticipantCount: 70,
    description: 'Kajian kitab Ta’lim Muta’allim bersama seluruh santri mukim dan non-mukim.',
    status: 'Selesai'
  },
  {
    id: 'ACT-089',
    title: 'Latihan Memanah & Seni Bela Diri Santri',
    date: '2026-10-10',
    time: '16:00 - 17:30 WIB',
    location: 'Lapangan Asrama Putra',
    category: 'Ekstrakurikuler',
    picUstadz: 'Ust. Zulfikar, S.Pd',
    santriParticipantCount: 35,
    description: 'Sunnah nabawiyah olahraga ketangkasan dan pembentukan karakter kepemimpinan santri.',
    status: 'Selesai'
  }
];

export const initialUsers: SystemUser[] = [
  {
    id: 'USR-01',
    name: 'Ust. Ahmad Zaki, S.E.I.',
    role: 'Bendahara',
    email: 'zaki.bendahara@alirsyad-darulaitam.or.id',
    phone: '0812-1111-2222',
    avatarText: 'AZ',
    status: 'Aktif',
    lastActive: 'Sedang Aktif (IP: 192.168.1.18)'
  },
  {
    id: 'USR-02',
    name: 'H. Abdullah Azzam',
    role: 'Ketua Yayasan',
    email: 'ketua@alirsyad-darulaitam.or.id',
    phone: '0811-2222-3333',
    avatarText: 'AA',
    status: 'Aktif',
    lastActive: '1 jam lalu (IP: 192.168.1.10)'
  },
  {
    id: 'USR-03',
    name: 'Siti Maryam, S.Kom',
    role: 'Staf Admin',
    email: 'admin.sekretariat@alirsyad-darulaitam.or.id',
    phone: '0813-3333-4444',
    avatarText: 'SM',
    status: 'Aktif',
    lastActive: '30 mnt lalu (IP: 192.168.1.34)'
  },
  {
    id: 'USR-04',
    name: 'Ust. Farhan Abu Maryam',
    role: 'Pembina Tahfidz',
    email: 'tahfidz@alirsyad-darulaitam.or.id',
    phone: '0815-4444-5555',
    avatarText: 'FA',
    status: 'Aktif',
    lastActive: '2 jam lalu (IP: 192.168.1.45)'
  },
  {
    id: 'USR-05',
    name: 'Ust. Muhammad Wildan, Lc.',
    role: 'Musyrif Senior',
    email: 'asrama.putra@alirsyad-darulaitam.or.id',
    phone: '0817-5555-6666',
    avatarText: 'MW',
    status: 'Aktif',
    lastActive: 'Kemarin (IP: 192.168.1.50)'
  }
];
