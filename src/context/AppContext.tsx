import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Santri,
  AuditLogItem,
  Donation,
  Expense,
  Budget,
  FoundationActivity,
  SystemUser,
  AuditTable
} from '../types';
import {
  initialSantriList,
  initialAuditLogs,
  initialDonations,
  initialExpenses,
  initialBudgets,
  initialActivities,
  initialUsers
} from '../data/initialData';

interface AppContextType {
  // Navigation
  activePath: string;
  setActivePath: (path: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;

  // Santri Management
  santriList: Santri[];
  selectedSantri: Santri | null;
  setSelectedSantri: (santri: Santri | null) => void;
  addSantri: (data: Omit<Santri, 'id' | 'nis' | 'updatedAt' | 'updatedBy'>) => void;
  updateSantri: (id: string, updatedFields: Partial<Santri>, rationale?: string) => void;
  deleteSantri: (id: string) => void;

  // Audit Log Management
  auditLogs: AuditLogItem[];
  selectedAuditId: string | null;
  setSelectedAuditId: (id: string | null) => void;
  selectedAuditItem: AuditLogItem | null;
  addAuditLog: (entry: Omit<AuditLogItem, 'id' | 'prevHash' | 'currHash'>) => void;

  // Donations & Wakaf
  donations: Donation[];
  addDonation: (data: Omit<Donation, 'id' | 'receiptNumber'>) => void;
  verifyDonation: (id: string) => void;

  // Expenses
  expenses: Expense[];
  addExpense: (data: Omit<Expense, 'id' | 'voucherNumber'>) => void;
  voidExpense: (id: string, reason: string) => void;

  // Budgets
  budgets: Budget[];
  updateBudget: (id: string, allocated: number) => void;

  // Activities
  activities: FoundationActivity[];
  addActivity: (act: Omit<FoundationActivity, 'id'>) => void;

  // Users
  currentUser: SystemUser;
  setCurrentUser: (user: SystemUser) => void;
  users: SystemUser[];
  addUser: (data: Omit<SystemUser, 'id'>) => void;
  updateUser: (id: string, data: Partial<SystemUser>) => void;
  toggleUserStatus: (id: string) => void;

  // Global Modals
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  modalData: any;
  setModalData: (data: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Simple pseudo-SHA256 hex string generator for demonstration
function generatePseudoSha256(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0;
  }
  const hexPart = Math.abs(hash).toString(16).padStart(8, '0');
  const randomSuffix = Array.from({ length: 56 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  return (hexPart + randomSuffix).slice(0, 64);
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePath, setActivePath] = useState<string>('pengguna');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Load from localStorage or use initialData
  const [santriList, setSantriList] = useState<Santri[]>(() => {
    const saved = localStorage.getItem('al_irsyad_santri');
    return saved ? JSON.parse(saved) : initialSantriList;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    const saved = localStorage.getItem('al_irsyad_audit_logs');
    return saved ? JSON.parse(saved) : initialAuditLogs;
  });

  const [donations, setDonations] = useState<Donation[]>(() => {
    const saved = localStorage.getItem('al_irsyad_donations');
    return saved ? JSON.parse(saved) : initialDonations;
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('al_irsyad_expenses');
    return saved ? JSON.parse(saved) : initialExpenses;
  });

  const [budgets, setBudgets] = useState<Budget[]>(() => {
    const saved = localStorage.getItem('al_irsyad_budgets');
    return saved ? JSON.parse(saved) : initialBudgets;
  });

  const [activities, setActivities] = useState<FoundationActivity[]>(() => {
    const saved = localStorage.getItem('al_irsyad_activities');
    return saved ? JSON.parse(saved) : initialActivities;
  });

  const [users, setUsers] = useState<SystemUser[]>(() => {
    const saved = localStorage.getItem('al_irsyad_users_v2');
    return saved ? JSON.parse(saved) : initialUsers;
  });
  const [currentUser, setCurrentUser] = useState<SystemUser>(() => {
    const saved = localStorage.getItem('al_irsyad_current_user_v2');
    return saved ? JSON.parse(saved) : initialUsers[0]; // Ust. Ahmad Nashir, S.Pd.I
  });

  const [selectedAuditId, setSelectedAuditId] = useState<string | null>('AUD-9021');
  const [selectedSantri, setSelectedSantri] = useState<Santri | null>(initialSantriList[0]);

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('al_irsyad_users_v2', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('al_irsyad_current_user_v2', JSON.stringify(currentUser));
  }, [currentUser]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('al_irsyad_santri', JSON.stringify(santriList));
  }, [santriList]);

  useEffect(() => {
    localStorage.setItem('al_irsyad_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('al_irsyad_donations', JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem('al_irsyad_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('al_irsyad_budgets', JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem('al_irsyad_activities', JSON.stringify(activities));
  }, [activities]);

  // Helper to add audit log with chained hash
  const addAuditLog = (entry: Omit<AuditLogItem, 'id' | 'prevHash' | 'currHash'>) => {
    setAuditLogs((prev) => {
      const prevHash = prev.length > 0 ? prev[0].currHash : '0000000000000000000000000000000000000000000000000000000000000000';
      const newHash = generatePseudoSha256(prevHash + entry.recordId + entry.action + Date.now());
      const nextId = `AUD-${9022 + prev.length}`;

      const newLog: AuditLogItem = {
        ...entry,
        id: nextId,
        prevHash,
        currHash: newHash
      };
      return [newLog, ...prev];
    });
  };

  // Add Santri
  const addSantri = (data: Omit<Santri, 'id' | 'nis' | 'updatedAt' | 'updatedBy'>) => {
    const nextNum = 840 + santriList.length + 1;
    const newId = `AST-0${nextNum}`;
    const newNis = `2026.0${nextNum}`;
    const nowStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }) + ' WIB';

    const newSantri: Santri = {
      ...data,
      id: newId,
      nis: newNis,
      updatedAt: nowStr,
      updatedBy: currentUser.name
    };

    setSantriList((prev) => [newSantri, ...prev]);

    // Create Audit Log
    addAuditLog({
      recordId: `#${newId}`,
      table: 'children',
      tableNameLabel: 'children (Anak Asuh)',
      action: 'CREATE',
      timestamp: nowStr,
      relativeTime: 'Baru saja',
      executorName: currentUser.name,
      executorRole: currentUser.role,
      executorIp: '192.168.1.18',
      summary: `Pendaftaran santri baru anak asuh: ${data.fullName}`,
      rationale: `Penerimaan santri baru berkas lengkap dengan status ${data.orphanStatus} & ${data.careStatus}.`,
      targetEntityName: data.fullName,
      changes: [
        { fieldName: 'full_name', oldValue: 'null', newValue: data.fullName, description: 'Nama lengkap santri' },
        { fieldName: 'care_status', oldValue: 'null', newValue: data.careStatus, description: 'Status mukim' },
        { fieldName: 'orphan_status', oldValue: 'null', newValue: data.orphanStatus, description: 'Kategori yatim/dhuafa' },
        { fieldName: 'dorm_room', oldValue: 'null', newValue: data.dormRoom, description: 'Penempatan kamar asrama' }
      ]
    });
  };

  // Update Santri
  const updateSantri = (id: string, updatedFields: Partial<Santri>, rationale?: string) => {
    const existing = santriList.find((s) => s.id === id);
    if (!existing) return;

    const nowStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }) + ' WIB';

    // Track changes for diff
    const changes: AuditLogItem['changes'] = [];
    Object.keys(updatedFields).forEach((key) => {
      const k = key as keyof Santri;
      if (updatedFields[k] !== undefined && JSON.stringify(updatedFields[k]) !== JSON.stringify(existing[k])) {
        changes.push({
          fieldName: k,
          oldValue: existing[k],
          newValue: updatedFields[k],
          description: `Pembaruan data pada field ${k}`
        });
      }
    });

    const updatedSantri: Santri = {
      ...existing,
      ...updatedFields,
      updatedAt: nowStr,
      updatedBy: currentUser.name
    };

    setSantriList((prev) => prev.map((s) => (s.id === id ? updatedSantri : s)));
    if (selectedSantri?.id === id) {
      setSelectedSantri(updatedSantri);
    }

    if (changes.length > 0) {
      addAuditLog({
        recordId: `#${id}`,
        table: 'children',
        tableNameLabel: 'children (Anak Asuh)',
        action: 'UPDATE',
        timestamp: nowStr,
        relativeTime: 'Baru saja',
        executorName: currentUser.name,
        executorRole: currentUser.role,
        executorIp: '192.168.1.18',
        summary: `Pembaruan data santri (${existing.fullName})`,
        rationale: rationale || `Pembaruan record data anak asuh oleh ${currentUser.name}.`,
        targetEntityName: existing.fullName,
        changes
      });
    }
  };

  // Delete Santri
  const deleteSantri = (id: string) => {
    const target = santriList.find((s) => s.id === id);
    if (!target) return;

    const nowStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) + ' WIB';

    setSantriList((prev) => prev.filter((s) => s.id !== id));

    addAuditLog({
      recordId: `#${id}`,
      table: 'children',
      tableNameLabel: 'children (Anak Asuh)',
      action: 'DELETE',
      timestamp: nowStr,
      relativeTime: 'Baru saja',
      executorName: currentUser.name,
      executorRole: currentUser.role,
      executorIp: '192.168.1.18',
      summary: `Pengarsipan/Penghapusan data santri: ${target.fullName}`,
      rationale: 'Santri telah tamat pendidikan atau pindah ke wali keluarga.',
      targetEntityName: target.fullName,
      changes: [
        { fieldName: 'status', oldValue: 'Aktif', newValue: 'Diarsipkan / Hapus', description: 'Penghapusan dari sistem aktif' }
      ]
    });
  };

  // Add Donation
  const addDonation = (data: Omit<Donation, 'id' | 'receiptNumber'>) => {
    const nextNum = 8920 + donations.length + 1;
    const newId = `DON-${nextNum}`;
    const receiptNum = `KW/ZIS-${nextNum}/2026`;
    const nowStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) + ' WIB';

    const newDonation: Donation = {
      ...data,
      id: newId,
      receiptNumber: receiptNum
    };

    setDonations((prev) => [newDonation, ...prev]);

    addAuditLog({
      recordId: `#${newId}`,
      table: 'donations',
      tableNameLabel: 'donations (Donasi & Wakaf)',
      action: 'CREATE',
      timestamp: nowStr,
      relativeTime: 'Baru saja',
      executorName: currentUser.name,
      executorRole: currentUser.role,
      executorIp: '192.168.1.18',
      summary: `Penerimaan donasi masuk: ${data.donorName} (${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(data.amount)})`,
      rationale: `Pencatatan dana zakat/infaq/wakaf via ${data.paymentMethod}.`,
      targetEntityName: data.category,
      changes: [
        { fieldName: 'amount', oldValue: '0', newValue: `Rp ${data.amount.toLocaleString('id-ID')}`, description: 'Nominal donasi' },
        { fieldName: 'category', oldValue: 'null', newValue: data.category, description: 'Jenis program ZISWAF' },
        { fieldName: 'donor_name', oldValue: 'null', newValue: data.donorName, description: 'Nama muzakki/donatur' }
      ]
    });
  };

  // Verify Donation
  const verifyDonation = (id: string) => {
    const existing = donations.find((d) => d.id === id);
    if (!existing || existing.status === 'Diverifikasi') return;

    const nowStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) + ' WIB';

    setDonations((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: 'Diverifikasi', verifiedBy: currentUser.name, verifiedAt: nowStr }
          : d
      )
    );

    addAuditLog({
      recordId: `#${id}`,
      table: 'donations',
      tableNameLabel: 'donations (Donasi & Wakaf)',
      action: 'VERIFY',
      timestamp: nowStr,
      relativeTime: 'Baru saja',
      executorName: currentUser.name,
      executorRole: currentUser.role,
      executorIp: '192.168.1.18',
      summary: `Verifikasi mutasi kas donasi masuk: ${existing.donorName} (Rp ${existing.amount.toLocaleString('id-ID')})`,
      rationale: 'Validasi mutasi bank rekening yayasan berhasil.',
      targetEntityName: existing.category,
      changes: [
        { fieldName: 'status', oldValue: 'Menunggu Konfirmasi', newValue: 'Diverifikasi', description: 'Status mutasi kas' },
        { fieldName: 'verified_by', oldValue: 'null', newValue: currentUser.name, description: 'Otorisator' }
      ]
    });
  };

  // Add Expense
  const addExpense = (data: Omit<Expense, 'id' | 'voucherNumber'>) => {
    const nextNum = 4010 + expenses.length + 1;
    const newId = `EXP-${nextNum}`;
    const voucherNum = `VC-KAS/2026/10-0${nextNum}`;
    const nowStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) + ' WIB';

    const newExpense: Expense = {
      ...data,
      id: newId,
      voucherNumber: voucherNum
    };

    setExpenses((prev) => [newExpense, ...prev]);

    addAuditLog({
      recordId: `#${newId}`,
      table: 'expenses',
      tableNameLabel: 'expenses (Pengeluaran Kas)',
      action: 'CREATE',
      timestamp: nowStr,
      relativeTime: 'Baru saja',
      executorName: currentUser.name,
      executorRole: currentUser.role,
      executorIp: '192.168.1.18',
      summary: `Penerbitan voucher kas: ${data.title} (Rp ${data.amount.toLocaleString('id-ID')})`,
      rationale: `Pengeluaran operasional asrama dan santri.`,
      targetEntityName: data.title,
      changes: [
        { fieldName: 'amount', oldValue: '0', newValue: `Rp ${data.amount.toLocaleString('id-ID')}`, description: 'Nominal voucher kas' },
        { fieldName: 'category', oldValue: 'null', newValue: data.category, description: 'Pos akun PSAK 109' },
        { fieldName: 'recipient', oldValue: 'null', newValue: data.recipient, description: 'Penerima manfaat' }
      ]
    });
  };

  // Void Expense
  const voidExpense = (id: string, reason: string) => {
    const existing = expenses.find((e) => e.id === id);
    if (!existing) return;

    const nowStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) + ' WIB';

    setExpenses((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, status: 'VOID (Dibatalkan)', voidReason: reason } : e
      )
    );

    addAuditLog({
      recordId: `#${id}`,
      table: 'expenses',
      tableNameLabel: 'expenses (Pengeluaran Kas)',
      action: 'VOID',
      timestamp: nowStr,
      relativeTime: 'Baru saja',
      executorName: currentUser.name,
      executorRole: currentUser.role,
      executorIp: '192.168.1.18',
      summary: `Pembatalan voucher kas ${id}: ${existing.title}`,
      rationale: reason || 'Pembatalan transaksi oleh bendahara.',
      targetEntityName: existing.title,
      changes: [
        { fieldName: 'status', oldValue: existing.status, newValue: 'VOID (Dibatalkan)', description: 'Status voucher dibatalkan' },
        { fieldName: 'void_reason', oldValue: 'null', newValue: reason, description: 'Alasan pembatalan voucher' }
      ]
    });
  };

  // Update Budget
  const updateBudget = (id: string, allocated: number) => {
    const existing = budgets.find((b) => b.id === id);
    if (!existing) return;

    const nowStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) + ' WIB';

    setBudgets((prev) =>
      prev.map((b) => (b.id === id ? { ...b, allocatedAmount: allocated } : b))
    );

    addAuditLog({
      recordId: `#${existing.code}`,
      table: 'budgets',
      tableNameLabel: 'budgets (Anggaran RAPB)',
      action: 'UPDATE',
      timestamp: nowStr,
      relativeTime: 'Baru saja',
      executorName: currentUser.name,
      executorRole: currentUser.role,
      executorIp: '192.168.1.18',
      summary: `Penyesuaian alokasi anggaran: ${existing.categoryName}`,
      rationale: `Plafon anggaran disesuaikan menjadi Rp ${allocated.toLocaleString('id-ID')}.`,
      targetEntityName: existing.categoryName,
      changes: [
        { fieldName: 'allocated_amount', oldValue: `Rp ${existing.allocatedAmount.toLocaleString('id-ID')}`, newValue: `Rp ${allocated.toLocaleString('id-ID')}`, description: 'Plafon baru anggaran' }
      ]
    });
  };

  // Add Activity
  const addActivity = (act: Omit<FoundationActivity, 'id'>) => {
    const nextNum = 92 + activities.length + 1;
    const newId = `ACT-0${nextNum}`;
    const newAct: FoundationActivity = { ...act, id: newId };
    setActivities((prev) => [newAct, ...prev]);
  };

  // Add User
  const addUser = (data: Omit<SystemUser, 'id'>) => {
    const nextNum = users.length + 1;
    const newId = `USR-0${nextNum}`;
    const newUser: SystemUser = { ...data, id: newId };
    setUsers((prev) => [...prev, newUser]);

    const nowStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) + ' WIB';

    addAuditLog({
      recordId: `#${data.nip || newId}`,
      table: 'users',
      tableNameLabel: 'users (Pengguna Sistem)',
      action: 'CREATE',
      timestamp: nowStr,
      relativeTime: 'Baru saja',
      executorName: currentUser.name,
      executorRole: currentUser.role,
      executorIp: currentUser.ipAddress || '192.168.1.18',
      summary: `Penambahan akun pengurus baru: ${data.name} (${data.role})`,
      rationale: 'Pemberian akses operasional staf Darul Aitam berprinsip RBAC.',
      targetEntityName: data.name,
      changes: [
        { fieldName: 'role', oldValue: 'null', newValue: data.role, description: 'Peran operasional' },
        { fieldName: 'email', oldValue: 'null', newValue: data.email, description: 'Surel akun' }
      ]
    });
  };

  // Update User
  const updateUser = (id: string, data: Partial<SystemUser>) => {
    const existing = users.find((u) => u.id === id);
    if (!existing) return;

    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...data } : u)));
    if (currentUser.id === id) {
      setCurrentUser((prev) => ({ ...prev, ...data }));
    }

    const nowStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) + ' WIB';

    addAuditLog({
      recordId: `#${existing.nip || existing.id}`,
      table: 'users',
      tableNameLabel: 'users (Pengguna Sistem)',
      action: 'UPDATE',
      timestamp: nowStr,
      relativeTime: 'Baru saja',
      executorName: currentUser.name,
      executorRole: currentUser.role,
      executorIp: currentUser.ipAddress || '192.168.1.18',
      summary: `Pembaruan hak akses / profil: ${existing.name}`,
      rationale: 'Penyesuaian kewenangan tugas pengurus yayasan.',
      targetEntityName: existing.name,
      changes: Object.keys(data).map((k) => ({
        fieldName: k,
        oldValue: (existing as any)[k],
        newValue: (data as any)[k],
        description: `Perubahan data pada field ${k}`
      }))
    });
  };

  // Toggle User Status
  const toggleUserStatus = (id: string) => {
    const existing = users.find((u) => u.id === id);
    if (!existing) return;

    const newActive = !existing.is_active;
    const newStatus = newActive ? 'Aktif' : 'Nonaktif';

    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, is_active: newActive, status: newStatus } : u))
    );

    const nowStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) + ' WIB';

    addAuditLog({
      recordId: `#${existing.nip || existing.id}`,
      table: 'users',
      tableNameLabel: 'users (Pengguna Sistem)',
      action: 'UPDATE',
      timestamp: nowStr,
      relativeTime: 'Baru saja',
      executorName: currentUser.name,
      executorRole: currentUser.role,
      executorIp: currentUser.ipAddress || '192.168.1.18',
      summary: `Ubah status akun pengurus ${existing.name} menjadi ${newStatus}`,
      rationale: `Status login diubah ke ${newStatus}.`,
      targetEntityName: existing.name,
      changes: [
        { fieldName: 'is_active', oldValue: existing.is_active, newValue: newActive, description: 'Status keaktifan login' }
      ]
    });
  };

  // Find currently selected audit item
  const selectedAuditItem =
    auditLogs.find((item) => item.id === selectedAuditId || item.recordId === selectedAuditId) ||
    auditLogs[0] ||
    null;

  return (
    <AppContext.Provider
      value={{
        activePath,
        setActivePath,
        mobileMenuOpen,
        setMobileMenuOpen,
        santriList,
        selectedSantri,
        setSelectedSantri,
        addSantri,
        updateSantri,
        deleteSantri,
        auditLogs,
        selectedAuditId,
        setSelectedAuditId,
        selectedAuditItem,
        addAuditLog,
        donations,
        addDonation,
        verifyDonation,
        expenses,
        addExpense,
        voidExpense,
        budgets,
        updateBudget,
        activities,
        addActivity,
        currentUser,
        setCurrentUser,
        users,
        addUser,
        updateUser,
        toggleUserStatus,
        activeModal,
        setActiveModal,
        modalData,
        setModalData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
