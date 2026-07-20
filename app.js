
const { useState, useEffect, useMemo, useRef } = React;

// ── Icon set minimal (pengganti lucide-react, biar tanpa build step) ──
function Icon({ children, size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {children}
    </svg>
  );
}
const Trash2 = (p) => <Icon {...p}><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></Icon>;
const AlertTriangle = (p) => <Icon {...p}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></Icon>;
const ShieldCheck = (p) => <Icon {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></Icon>;
const Clock = (p) => <Icon {...p}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></Icon>;
const X = (p) => <Icon {...p}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></Icon>;
const ChevronRight = (p) => <Icon {...p}><polyline points="9 18 15 12 9 6" /></Icon>;
const ChevronLeft = (p) => <Icon {...p}><polyline points="15 18 9 12 15 6" /></Icon>;
const FileText = (p) => <Icon {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></Icon>;
const ListChecks = (p) => <Icon {...p}><polyline points="3 7 5 9 9 5" /><line x1="13" y1="6" x2="21" y2="6" /><polyline points="3 15 5 17 9 13" /><line x1="13" y1="16" x2="21" y2="16" /></Icon>;
const Users = (p) => <Icon {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></Icon>;
const BookOpen = (p) => <Icon {...p}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></Icon>;
const Camera = (p) => <Icon {...p}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></Icon>;
const Home = (p) => <Icon {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></Icon>;
const Search = (p) => <Icon {...p}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></Icon>;

// ── Database Cari Pasal (ditanam langsung, bukan import file terpisah) ──
const kuhpDb=window.kuhpDb;
const kuhapDb=window.kuhapDb;
const penyesuaianDb=window.penyesuaianDb;
const verifiedDb=window.verifiedDb;;

const TINGKAT = [
  { key: "penyidik", label: "Penyidik", pasal: "Pasal 102 KUHAP", awal: 20, perpanjangan: 40, pejabatPerpanjangan: "Penuntut Umum", pejabatPengecualian: "Ketua Pengadilan Negeri" },
  { key: "penuntut", label: "Penuntut Umum", pasal: "Pasal 103 KUHAP", awal: 20, perpanjangan: 30, pejabatPerpanjangan: "Ketua Pengadilan Negeri", pejabatPengecualian: "Ketua Pengadilan Negeri" },
  { key: "pn", label: "Hakim Pengadilan Negeri", pasal: "Pasal 104 KUHAP", awal: 30, perpanjangan: 60, pejabatPerpanjangan: "Ketua Pengadilan Negeri", pejabatPengecualian: "Ketua Pengadilan Tinggi" },
  { key: "pt", label: "Hakim Pengadilan Tinggi (banding)", pasal: "Pasal 105 KUHAP", awal: 30, perpanjangan: 60, pejabatPerpanjangan: "Ketua Pengadilan Tinggi", pejabatPengecualian: "Ketua Mahkamah Agung" },
  { key: "ma", label: "Hakim Agung (kasasi)", pasal: "Pasal 106 KUHAP", awal: 30, perpanjangan: 60, pejabatPerpanjangan: "Ketua Mahkamah Agung", pejabatPengecualian: "Ketua Mahkamah Agung" },
];

const STATUS_OPTIONS = ["Lidik", "Henti Lidik", "Sidik", "Henti Sidik", "P21", "Tahap 2"];

const PASAL_ANCAMAN_9TH = new Set([188,189,191,192,193,194,198,203,210,211,224,250,262,277,285,287,293,306,308,319,321,323,325,327,329,334,335,342,349,352,353,355,368,374,375,378,413,414,415,417,418,422,425,429,433,446,450,451,454,458,459,460,461,464,467,468,469,473,477,479,482,503,542,543,544,545,546,553,554,559,560,575,577,579,580,581,583,586,587,588,589,590,598,599,601,604,607,609,610]);

function detectPasal107(pasalStr) {
  if (!pasalStr) return false;
  const s = pasalStr.toLowerCase();
  if (/narkotika|ite|tppo|perlindungan anak|kdrt|korupsi|tipikor|uu no|undang-undang nomor/.test(s) && !s.includes("kuhp")) return false;
  const nums = (pasalStr.match(/\d+/g) || []).map(Number);
  return nums.some(n => PASAL_ANCAMAN_9TH.has(n));
}
const STATUS_COLOR = {
  "Lidik": "bg-slate-100 text-slate-700 border-slate-300",
  "Henti Lidik": "bg-red-50 text-red-700 border-red-200",
  "Sidik": "bg-amber-50 text-amber-800 border-amber-200",
  "Henti Sidik": "bg-red-50 text-red-700 border-red-200",
  "P21": "bg-emerald-50 text-emerald-800 border-emerald-200",
  "Tahap 2": "bg-blue-50 text-blue-800 border-blue-200",
};

function toDate(d) { return d instanceof Date ? new Date(d.getTime()) : new Date(d + "T00:00:00"); }
function addDays(date, days) { const d = toDate(date); d.setDate(d.getDate() + days); return d; }
function fmt(d) { return toDate(d).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }); }
function daysBetween(a, b) {
  const x = toDate(a); x.setHours(0, 0, 0, 0);
  const y = toDate(b); y.setHours(0, 0, 0, 0);
  return Math.round((y - x) / 86400000);
}
function computeDetention(tingkatKey, startDate, extended, pengecualianTahap) {
  const t = TINGKAT.find(x => x.key === tingkatKey);
  const segments = [];
  let segStart = toDate(startDate);
  let segEnd = addDays(segStart, t.awal - 1);
  segments.push({ label: `Masa awal ${t.awal} hari`, days: t.awal, start: segStart, end: segEnd });
  if (extended) {
    segStart = addDays(segEnd, 1);
    segEnd = addDays(segStart, t.perpanjangan - 1);
    segments.push({ label: `Perpanjangan ${t.perpanjangan} hari (${t.pejabatPerpanjangan})`, days: t.perpanjangan, start: segStart, end: segEnd });
  }
  if (pengecualianTahap >= 1) {
    segStart = addDays(segEnd, 1);
    segEnd = addDays(segStart, 29);
    segments.push({ label: `Perpanjangan Psl 107 tahap 1 — 30 hari (${t.pejabatPengecualian})`, days: 30, start: segStart, end: segEnd });
  }
  if (pengecualianTahap >= 2) {
    segStart = addDays(segEnd, 1);
    segEnd = addDays(segStart, 29);
    segments.push({ label: `Perpanjangan Psl 107 tahap 2 — 30 hari (${t.pejabatPengecualian})`, days: 30, start: segStart, end: segEnd });
  }
  const finalEnd = segments[segments.length - 1].end;
  const remaining = daysBetween(new Date(), finalEnd);
  return { t, segments, finalEnd, remaining };
}

function StatusPill({ status }) {
  return <span className={`inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-semibold ${STATUS_COLOR[status] || "bg-slate-100 text-slate-700 border-slate-300"}`}>{status}</span>;
}
function DetentionBadge({ remaining }) {
  if (remaining < 0) return <span className="inline-flex items-center gap-1.5 rounded-sm bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-800 border border-red-200"><AlertTriangle size={13} /> Lewat batas {Math.abs(remaining)} hari</span>;
  if (remaining <= 5) return <span className="inline-flex items-center gap-1.5 rounded-sm bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800 border border-amber-200"><Clock size={13} /> {remaining} hari lagi</span>;
  return <span className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200"><ShieldCheck size={13} /> Aman — {remaining} hari lagi</span>;
}
function Timeline({ segments, startDate }) {
  const total = segments.reduce((a, s) => a + s.days, 0);
  const elapsed = Math.max(0, Math.min(total, daysBetween(new Date(startDate + "T00:00:00"), new Date())));
  const pct = Math.min(100, (elapsed / total) * 100);
  const colors = ["bg-slate-700", "bg-amber-600", "bg-red-700", "bg-red-900"];
  return (
    <div className="mt-3">
      <div className="flex h-2.5 w-full overflow-hidden rounded-sm border border-slate-300 bg-slate-100">
        {segments.map((s, i) => <div key={i} style={{ width: `${(s.days / total) * 100}%` }} className={`${colors[i]} h-full ${i > 0 ? "border-l border-white/40" : ""}`} title={s.label} />)}
      </div>
      <div className="relative h-3">
        <div className="absolute top-0 h-2 w-px bg-slate-900" style={{ left: `${pct}%` }} />
      </div>
      <div className="space-y-0.5">
        {segments.map((s, i) => (
          <p key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600 font-mono">
            <span className={`inline-block h-2 w-2 shrink-0 rounded-full ${colors[i]}`}></span>
            {s.label}: <span className="font-semibold text-slate-800">{fmt(s.start)}</span> s/d <span className="font-semibold text-slate-800">{fmt(s.end)}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

function emptyPerkara() {
  return {
    id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2)),
    nomorLP: "", tanggalLapor: new Date().toISOString().slice(0, 10), fotoLP: null,
    pelapor: "", uraian: "", status: "Lidik", saksi: [], barangBukti: [],
    upayaLain: "", kendala: "", rtl: "", penahanan: null,
  };
}

const STORAGE_KEY = "register-perkara-db";
function useStorage() {
  const [perkara, setPerkara] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setPerkara(raw ? JSON.parse(raw) : []);
    } catch { setPerkara([]); } finally { setLoading(false); }
  }, []);
  function persist(next) {
    setPerkara(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (err) { console.error("Gagal menyimpan:", err); }
  }
  return { perkara, persist, loading };
}

function BerandaCard({ icon: IconComp, title, desc, count, onClick }) {
  return (
    <button onClick={onClick} className="flex items-start gap-4 rounded-md border border-slate-200 bg-white p-5 text-left shadow-sm transition-colors hover:border-slate-400 hover:bg-slate-50">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-slate-900">
        <IconComp className="text-amber-500" size={20} />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="font-serif text-base text-slate-900">{title}</p>
          {count !== undefined && <span className="rounded-sm bg-slate-100 px-2 py-0.5 text-xs font-mono text-slate-600">{count}</span>}
        </div>
        <p className="mt-0.5 text-xs text-slate-500">{desc}</p>
      </div>
      <ChevronRight className="mt-1 text-slate-300" size={18} />
    </button>
  );
}

function InputLaporan({ perkara, persist, onSaved }) {
  const [nomorLP, setNomorLP] = useState("");
  const [tanggalLapor, setTanggalLapor] = useState(new Date().toISOString().slice(0, 10));
  const [pelapor, setPelapor] = useState("");
  const [uraian, setUraian] = useState("");
  const [fotoLP, setFotoLP] = useState(null);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  function handleFoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) { setError("Ukuran foto maksimal 3MB."); return; }
    const reader = new FileReader();
    reader.onload = () => setFotoLP(reader.result);
    reader.readAsDataURL(file);
  }
  function submit() {
    if (!nomorLP.trim()) { setError("Nomor LP wajib diisi."); return; }
    if (perkara.some(p => p.nomorLP.trim().toLowerCase() === nomorLP.trim().toLowerCase())) { setError("Nomor LP ini sudah pernah diinput."); return; }
    const entry = { ...emptyPerkara(), nomorLP, tanggalLapor, pelapor, uraian, fotoLP };
    persist([entry, ...perkara]);
    setNomorLP(""); setPelapor(""); setUraian(""); setFotoLP(null); setError("");
    if (fileRef.current) fileRef.current.value = "";
    onSaved();
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
        {error && <p className="mb-3 text-xs font-medium text-red-700">{error}</p>}
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Nomor LP</label>
            <input value={nomorLP} onChange={e => setNomorLP(e.target.value)} placeholder="LP/.../.../2026/SPKT" className="w-full rounded-sm border border-slate-300 px-3 py-2 text-sm font-mono focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Tanggal lapor</label>
            <input type="date" value={tanggalLapor} onChange={e => setTanggalLapor(e.target.value)} className="w-full rounded-sm border border-slate-300 px-3 py-2 text-sm font-mono focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Pelapor</label>
            <input value={pelapor} onChange={e => setPelapor(e.target.value)} className="w-full rounded-sm border border-slate-300 px-3 py-2 text-sm focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Uraian singkat</label>
            <textarea value={uraian} onChange={e => setUraian(e.target.value)} rows={3} className="w-full rounded-sm border border-slate-300 px-3 py-2 text-sm focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Foto LP (maks 3MB)</label>
            <div className="flex items-center gap-3">
              <button onClick={() => fileRef.current?.click()} className="flex items-center gap-2 rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"><Camera size={15} /> Pilih foto</button>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFoto} className="hidden" />
              {fotoLP && <img src={fotoLP} alt="Foto LP" className="h-12 w-12 rounded-sm object-cover border border-slate-200" />}
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={submit} className="rounded-sm bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">Simpan laporan</button>
        </div>
      </div>
    </div>
  );
}

function TrackingDetail({ item, onChange, onDelete, onBack }) {
  const [saksiInput, setSaksiInput] = useState("");
  const [bbInput, setBbInput] = useState("");
  function update(fields) { onChange({ ...item, ...fields }); }
  function addSaksi() { if (!saksiInput.trim()) return; update({ saksi: [...item.saksi, saksiInput.trim()] }); setSaksiInput(""); }
  function addBB() { if (!bbInput.trim()) return; update({ barangBukti: [...item.barangBukti, bbInput.trim()] }); setBbInput(""); }
  const showPenahanan = item.status === "Sidik" || item.status === "P21" || item.status === "Tahap 2" || item.penahanan?.nama;

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800"><ChevronLeft size={16} /> Kembali ke daftar</button>
      <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-mono text-slate-500">{item.nomorLP}</p>
            <p className="font-serif text-lg text-slate-900">{item.uraian || "(belum ada uraian)"}</p>
            <p className="text-xs text-slate-400">Lapor {fmt(new Date(item.tanggalLapor + "T00:00:00"))} · {item.pelapor || "pelapor tidak dicatat"}</p>
          </div>
          <button onClick={onDelete} className="text-slate-300 hover:text-red-700"><Trash2 size={16} /></button>
        </div>
        <div className="mt-4">
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Status perkara</label>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map(s => (
              <button key={s} onClick={() => {
                const fields = { status: s };
                if ((s === "P21" || s === "Tahap 2") && !item.tanggalLimpah) fields.tanggalLimpah = new Date().toISOString().slice(0, 10);
                update(fields);
              }} className={`rounded-sm border px-2.5 py-1 text-xs font-semibold transition-colors ${item.status === s ? STATUS_COLOR[s] + " ring-1 ring-offset-1" : "border-slate-200 text-slate-400 hover:bg-slate-50"}`}>{s}</button>
            ))}
          </div>
          {(item.status === "P21" || item.status === "Tahap 2") && item.penahanan?.nama && (
            <p className="mt-2 text-xs text-blue-700">Tahanan atas nama {item.penahanan.nama} otomatis dipindahkan dari Tahanan Aktif ke Daftar Tahanan (riwayat).</p>
          )}
        </div>
      </div>

      <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Saksi diperiksa</label>
          <div className="flex gap-2 mb-2">
            <input value={saksiInput} onChange={e => setSaksiInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addSaksi()} placeholder="Nama saksi" className="flex-1 rounded-sm border border-slate-300 px-3 py-1.5 text-sm focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600" />
            <button onClick={addSaksi} className="rounded-sm bg-slate-100 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-200">Tambah</button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {item.saksi.map((s, i) => (
              <span key={i} className="flex items-center gap-1 rounded-sm bg-slate-100 px-2 py-1 text-xs text-slate-700">{s}
                <button onClick={() => update({ saksi: item.saksi.filter((_, j) => j !== i) })}><X size={11} /></button>
              </span>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Barang bukti diamankan/disita</label>
          <div className="flex gap-2 mb-2">
            <input value={bbInput} onChange={e => setBbInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addBB()} placeholder="Deskripsi barang bukti" className="flex-1 rounded-sm border border-slate-300 px-3 py-1.5 text-sm focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600" />
            <button onClick={addBB} className="rounded-sm bg-slate-100 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-200">Tambah</button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {item.barangBukti.map((b, i) => (
              <span key={i} className="flex items-center gap-1 rounded-sm bg-slate-100 px-2 py-1 text-xs text-slate-700">{b}
                <button onClick={() => update({ barangBukti: item.barangBukti.filter((_, j) => j !== i) })}><X size={11} /></button>
              </span>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Upaya lain yang telah dilakukan</label>
          <textarea value={item.upayaLain} onChange={e => update({ upayaLain: e.target.value })} rows={2} className="w-full rounded-sm border border-slate-300 px-3 py-2 text-sm focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600" />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Kendala</label>
          <textarea value={item.kendala} onChange={e => update({ kendala: e.target.value })} rows={2} className="w-full rounded-sm border border-slate-300 px-3 py-2 text-sm focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600" />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Rencana Tindak Lanjut (RTL)</label>
          <textarea value={item.rtl} onChange={e => update({ rtl: e.target.value })} rows={2} className="w-full rounded-sm border border-slate-300 px-3 py-2 text-sm focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600" />
        </div>
      </div>

      {showPenahanan && (
        <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <p className="font-serif text-base text-slate-900 mb-3">Data penahanan (opsional)</p>
          <div className="grid gap-3 sm:grid-cols-2 mb-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Nama tersangka</label>
              <input value={item.penahanan?.nama || ""} onChange={e => update({ penahanan: { ...(item.penahanan || {}), nama: e.target.value } })} className="w-full rounded-sm border border-slate-300 px-3 py-2 text-sm focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Pasal disangkakan</label>
              <input value={item.penahanan?.pasal || ""} onChange={e => update({ penahanan: { ...(item.penahanan || {}), pasal: e.target.value } })} className="w-full rounded-sm border border-slate-300 px-3 py-2 text-sm focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Tingkat penahanan</label>
              <select value={item.penahanan?.tingkatKey || "penyidik"} onChange={e => update({ penahanan: { ...(item.penahanan || {}), tingkatKey: e.target.value } })} className="w-full rounded-sm border border-slate-300 px-3 py-2 text-sm focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600">
                {TINGKAT.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Tanggal mulai ditahan</label>
              <input type="date" value={item.penahanan?.startDate || new Date().toISOString().slice(0, 10)} onChange={e => update({ penahanan: { ...(item.penahanan || {}), startDate: e.target.value } })} className="w-full rounded-sm border border-slate-300 px-3 py-2 text-sm font-mono focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600" />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mb-3">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={item.penahanan?.extended || false} onChange={e => update({ penahanan: { ...(item.penahanan || {}), extended: e.target.checked } })} className="h-4 w-4" /> Sudah diperpanjang ({TINGKAT.find(t => t.key === (item.penahanan?.tingkatKey || "penyidik"))?.pejabatPerpanjangan}, {TINGKAT.find(t => t.key === (item.penahanan?.tingkatKey || "penyidik"))?.perpanjangan} hari)
            </label>
          </div>
          {(() => {
            const auto107 = detectPasal107(item.penahanan?.pasal);
            const manual107 = item.penahanan?.manual107 || false;
            const eligible = auto107 || manual107;
            return (
              <div className="mb-3 rounded-sm border border-slate-200 bg-slate-50 p-3">
                {auto107 ? (
                  <p className="text-xs text-emerald-800 font-medium mb-2">✓ Pasal sangkaan terdeteksi berancaman ≥9 tahun (KUHP) — syarat perpanjangan Pasal 107 huruf b terpenuhi, opsi PN tersedia otomatis.</p>
                ) : (
                  <label className="flex items-start gap-2 text-xs text-slate-600 mb-2">
                    <input type="checkbox" checked={manual107} onChange={e => update({ penahanan: { ...(item.penahanan || {}), manual107: e.target.checked } })} className="mt-0.5 h-3.5 w-3.5" />
                    <span>Aktifkan perpanjangan Pasal 107 secara manual (untuk pasal UU khusus berancaman ≥9 tahun yang tidak terdeteksi otomatis, atau tersangka sakit berat — verifikasi sendiri syaratnya)</span>
                  </label>
                )}
                {eligible && (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Perpanjangan Pasal 107 (oleh {TINGKAT.find(t => t.key === (item.penahanan?.tingkatKey || "penyidik"))?.pejabatPengecualian})</label>
                    <select value={item.penahanan?.pengecualianTahap || 0} onChange={e => update({ penahanan: { ...(item.penahanan || {}), pengecualianTahap: Number(e.target.value) } })} className="w-full sm:w-auto rounded-sm border border-slate-300 bg-white px-3 py-1.5 text-sm focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600">
                      <option value={0}>Belum ada</option>
                      <option value={1}>PN tahap 1 (+30 hari)</option>
                      <option value={2}>PN tahap 1 + 2 (+60 hari)</option>
                    </select>
                  </div>
                )}
              </div>
            );
          })()}
          {item.penahanan?.startDate && (
            <DetentionSummary tingkatKey={item.penahanan.tingkatKey || "penyidik"} startDate={item.penahanan.startDate} extended={item.penahanan.extended} pengecualianTahap={(detectPasal107(item.penahanan?.pasal) || item.penahanan?.manual107) ? (item.penahanan?.pengecualianTahap || 0) : 0} />
          )}
        </div>
      )}
    </div>
  );
}

function DetentionSummary({ tingkatKey, startDate, extended, pengecualianTahap = 0 }) {
  const r = useMemo(() => computeDetention(tingkatKey, startDate, extended, pengecualianTahap), [tingkatKey, startDate, extended, pengecualianTahap]);
  return (
    <div className="rounded-sm bg-slate-50 border border-slate-200 p-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">Batas akhir: <span className="font-mono text-slate-800">{fmt(r.finalEnd)}</span></p>
        <DetentionBadge remaining={r.remaining} />
      </div>
      <Timeline segments={r.segments} startDate={startDate} />
    </div>
  );
}

function TrackingPerkara({ perkara, persist }) {
  const [selectedId, setSelectedId] = useState(null);
  const selected = perkara.find(p => p.id === selectedId);
  function updateItem(updated) { persist(perkara.map(p => p.id === updated.id ? updated : p)); }
  function deleteItem(id) { persist(perkara.filter(p => p.id !== id)); setSelectedId(null); }

  if (selected) return <TrackingDetail item={selected} onChange={updateItem} onDelete={() => deleteItem(selected.id)} onBack={() => setSelectedId(null)} />;

  if (perkara.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-slate-300 py-12 text-center">
        <FileText className="mx-auto mb-2 text-slate-300" size={28} />
        <p className="text-sm text-slate-400">Belum ada laporan. Tambahkan lewat menu Input Laporan.</p>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {perkara.map(p => (
        <button key={p.id} onClick={() => setSelectedId(p.id)} className="flex w-full items-center justify-between gap-3 rounded-md border border-slate-200 bg-white p-4 text-left shadow-sm hover:border-slate-400">
          <div className="min-w-0">
            <p className="font-mono text-xs text-slate-500">{p.nomorLP}</p>
            <p className="truncate font-serif text-sm text-slate-900">{p.uraian || "(belum ada uraian)"}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <StatusPill status={p.status} />
            <ChevronRight size={16} className="text-slate-300" />
          </div>
        </button>
      ))}
    </div>
  );
}

function DaftarTahananAktif({ perkara }) {
  const aktif = perkara.filter(p => p.penahanan?.startDate && p.penahanan?.nama && p.status !== "P21" && p.status !== "Tahap 2");
  if (aktif.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-slate-300 py-12 text-center">
        <Users className="mx-auto mb-2 text-slate-300" size={28} />
        <p className="text-sm text-slate-400 max-w-sm mx-auto">Belum ada tahanan aktif. Begitu data penahanan (nama, tanggal mulai) diisi di halaman detail perkara — sejak tahap Sidik — orang tersebut otomatis muncul di sini dengan hitungan mundur batas waktu.</p>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {aktif.map(p => {
        const eligible107 = detectPasal107(p.penahanan?.pasal) || p.penahanan?.manual107;
        const r = computeDetention(p.penahanan.tingkatKey || "penyidik", p.penahanan.startDate, p.penahanan.extended, eligible107 ? (p.penahanan.pengecualianTahap || 0) : 0);
        return (
          <div key={p.id} className="flex items-stretch gap-0 rounded-md border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className={`w-1.5 ${r.remaining < 0 ? "bg-red-700" : r.remaining <= 5 ? "bg-amber-600" : "bg-emerald-700"}`} />
            <div className="flex-1 p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-serif text-base text-slate-900">{p.penahanan.nama}</p>
                  <p className="text-xs font-mono text-slate-500">{p.nomorLP} {p.penahanan.pasal && `· ${p.penahanan.pasal}`}</p>
                </div>
                <DetentionBadge remaining={r.remaining} />
              </div>
              <p className="mt-1 text-xs text-slate-500">{r.t.label} · <StatusPill status={p.status} /> · berakhir {fmt(r.finalEnd)}</p>
              <Timeline segments={r.segments} startDate={p.penahanan.startDate} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DaftarTahananRiwayat({ perkara }) {
  const riwayat = perkara.filter(p => p.penahanan?.startDate && p.penahanan?.nama && (p.status === "P21" || p.status === "Tahap 2"));
  if (riwayat.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-slate-300 py-12 text-center">
        <Users className="mx-auto mb-2 text-slate-300" size={28} />
        <p className="text-sm text-slate-400 max-w-sm mx-auto">Belum ada riwayat. Begitu status perkara di Tracking diubah ke <span className="font-semibold">P21</span> atau <span className="font-semibold">Tahap 2</span> (limpah ke Jaksa), tahanan otomatis pindah dari Tahanan Aktif ke sini sebagai catatan riwayat.</p>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {riwayat.map(p => (
        <div key={p.id} className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-serif text-base text-slate-900">{p.penahanan.nama}</p>
              <p className="text-xs font-mono text-slate-500">{p.nomorLP} {p.penahanan.pasal && `· ${p.penahanan.pasal}`}</p>
            </div>
            <StatusPill status={p.status} />
          </div>
          <p className="mt-1.5 text-xs text-slate-500">
            Ditahan sejak {fmt(new Date(p.penahanan.startDate + "T00:00:00"))} ({p.penahanan.tingkatKeyLabel || TINGKAT.find(t => t.key === p.penahanan.tingkatKey)?.label})
            {p.tanggalLimpah && ` · dilimpahkan ke Jaksa ${fmt(new Date(p.tanggalLimpah + "T00:00:00"))}`}
          </p>
          {p.uraian && <p className="mt-1 text-xs text-slate-400">{p.uraian}</p>}
        </div>
      ))}
    </div>
  );
}

const PASAL_SOURCES = [
  { key: "KUHP", label: "KUHP", db: kuhpDb },
  { key: "KUHAP", label: "KUHAP", db: kuhapDb },
  { key: "Penyesuaian Pidana", label: "Penyesuaian Pidana", db: penyesuaianDb },
];
const UU_LABEL = {
  KUHP: "UU No. 1 Tahun 2023 tentang KUHP",
  KUHAP: "UU No. 20 Tahun 2025 tentang KUHAP",
  "Penyesuaian Pidana": "UU No. 1 Tahun 2026 tentang Penyesuaian Pidana",
};
function searchPasalDb(db, query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const upper = q.toUpperCase();
  if (db[upper]) return [{ no: upper, ...db[upper] }];
  const noMatch = q.match(/^(\d+[a-z]?)$/i);
  if (noMatch) { const key = noMatch[1].toUpperCase(); if (db[key]) return [{ no: key, ...db[key] }]; }
  const hits = [];
  for (const [no, entry] of Object.entries(db)) {
    if (entry.isi && entry.isi.toLowerCase().includes(q)) { hits.push({ no, ...entry }); if (hits.length >= 15) break; }
  }
  return hits;
}
function PasalStempelBadge() {
  return (
    <div className="absolute -top-3 right-4 select-none" style={{ transform: "rotate(-4deg)" }} aria-hidden="true">
      <div className="px-3 py-1 text-[10px] tracking-[0.2em] font-semibold uppercase rounded" style={{ color: "#9A2B1E", border: "2px solid #9A2B1E", fontFamily: "'IBM Plex Mono', monospace", opacity: 0.85, background: "rgba(251,248,239,0.75)" }}>
        Teks Resmi &middot; Terverifikasi
      </div>
    </div>
  );
}
function PasalRawBadge() {
  return (
    <div className="inline-block px-2.5 py-1 text-[10px] tracking-[0.12em] font-semibold uppercase mb-4 rounded" style={{ color: "#8A6B1F", background: "#F4E9C8", border: "1px solid #D8BE7E", fontFamily: "'IBM Plex Mono', monospace" }}>
      ⚠ Belum diverifikasi manual — cek fisik ke halaman UU
    </div>
  );
}
function PasalStickyNote({ analisis }) {
  if (!analisis) return null;
  return (
    <div className="relative rounded-sm p-5 sm:p-6 mt-6 max-w-[92%] mx-auto sm:mx-0 sm:ml-6" style={{ background: "#F4E4B8", border: "1px solid #D8BE7E", borderLeft: "6px solid #C9A66B", transform: "rotate(0.6deg)", boxShadow: "0 6px 16px -8px rgba(107,74,23,0.35)" }}>
      <div className="text-[11px] tracking-[0.15em] uppercase font-semibold mb-3" style={{ color: "#6B4A17" }}>📌 Catatan Penyidik — asumsi, bukan sumber resmi</div>
      {analisis.unsur && <p className="text-[14px] leading-relaxed mb-4" style={{ color: "#4A3413" }}><span className="font-semibold">Unsur &amp; analisis: </span>{analisis.unsur}</p>}
      {analisis.catatanPenyidik && (
        <ul className="space-y-2 mb-4">
          {analisis.catatanPenyidik.map((c, i) => <li key={i} className="text-[14px] leading-relaxed flex gap-2" style={{ color: "#4A3413" }}><span>&bull;</span><span>{c}</span></li>)}
        </ul>
      )}
      {analisis.skenario && <p className="text-[13.5px] leading-relaxed italic" style={{ color: "#6B4A17" }}>{analisis.skenario}</p>}
    </div>
  );
}
function PasalResultCard({ sourceKey, entry }) {
  const analisis = verifiedDb[sourceKey]?.[entry.no];
  const isVerified = Boolean(analisis);
  return (
    <div className="mb-6">
      <div className="relative rounded-md p-6 sm:p-7" style={{ background: "#FBF8EF", border: "1px solid #D9CFB8", boxShadow: "0 1px 2px rgba(31,39,51,0.06), 0 8px 24px -12px rgba(31,39,51,0.15)" }}>
        {isVerified && <PasalStempelBadge />}
        <div className="text-xs tracking-[0.15em] uppercase mb-1" style={{ color: "#16324F", fontFamily: "'IBM Plex Mono', monospace" }}>{UU_LABEL[sourceKey]}</div>
        <h2 className="font-serif text-2xl mt-3 mb-4" style={{ color: "#16324F", fontWeight: 600 }}>Pasal {entry.no}</h2>
        {!isVerified && <PasalRawBadge />}
        <div className="whitespace-pre-line font-serif" style={{ color: "#1F2733", fontSize: "16px", lineHeight: 1.75 }}>{entry.isi}</div>
        {entry.penjelasan && (
          <div className="mt-6 pt-5" style={{ borderTop: "1px dashed #D9CFB8" }}>
            <div className="text-xs tracking-[0.15em] uppercase mb-3 font-semibold" style={{ color: "#16324F" }}>Penjelasan Resmi</div>
            <div className="whitespace-pre-line font-serif" style={{ color: "#3A3327", fontSize: "14.5px", lineHeight: 1.65 }}>{entry.penjelasan}</div>
          </div>
        )}
      </div>
      {isVerified && <PasalStickyNote analisis={analisis} />}
    </div>
  );
}
function CariPasal() {
  const [active, setActive] = useState("KUHAP");
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const activeSource = PASAL_SOURCES.find(s => s.key === active);
  const results = useMemo(() => searchPasalDb(activeSource.db, submitted), [activeSource, submitted]);
  function doSearch() { setSubmitted(query); }
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {PASAL_SOURCES.map(s => (
          <button key={s.key} onClick={() => { setActive(s.key); setSubmitted(""); setQuery(""); }} className="px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors" style={{ background: active === s.key ? "#16324F" : "transparent", color: active === s.key ? "#F6F1E4" : "#16324F", border: "1px solid #16324F" }}>{s.label}</button>
        ))}
      </div>
      <div className="flex gap-2 mb-2">
        <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => { if (e.key === "Enter") doSearch(); }} placeholder="Nomor pasal (mis. 235) atau keyword (mis. alat bukti)…" className="w-full rounded-sm border border-slate-300 px-3 py-2 text-sm focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600" />
        <button onClick={doSearch} className="flex items-center gap-1.5 rounded-sm bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 shrink-0"><Search size={14} /> Cari</button>
      </div>
      <p className="text-xs text-slate-400 mb-6">{activeSource.label}: {Object.keys(activeSource.db).length} pasal terindeks</p>
      {submitted && results.length === 0 && (
        <div className="rounded-md border border-dashed border-slate-300 py-10 text-center">
          <p className="text-sm text-slate-400">Tidak ketemu "{submitted}" di {activeSource.label}. Coba nomor pasal lain atau keyword berbeda.</p>
        </div>
      )}
      {results.map(r => <PasalResultCard key={r.no} sourceKey={active} entry={r} />)}
    </div>
  );
}

function CCCEmblem() {
  return (
    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full" style={{ border: "1.5px solid #f59e0b", background: "#0f172a" }} aria-hidden="true">
      <div className="absolute inset-1 rounded-full" style={{ border: "0.5px solid rgba(245,158,11,0.35)" }} />
      <span className="font-serif font-bold text-amber-400" style={{ fontSize: "21px", letterSpacing: "-0.01em" }}>C³</span>
    </div>
  );
}

function App() {
  const { perkara, persist, loading } = useStorage();
  const [page, setPage] = useState("beranda");
  const counts = {
    total: perkara.length,
    tahananAktif: perkara.filter(p => p.penahanan?.nama && p.penahanan?.startDate && p.status !== "P21" && p.status !== "Tahap 2").length,
    tahananRiwayat: perkara.filter(p => p.penahanan?.nama && p.penahanan?.startDate && (p.status === "P21" || p.status === "Tahap 2")).length,
  };
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="border-b border-slate-200 bg-slate-900">
        <div className="mx-auto max-w-3xl px-5 py-6">
          <div className="flex items-center gap-4">
            {page !== "beranda" && (<button onClick={() => setPage("beranda")} className="text-slate-400 hover:text-white shrink-0"><Home size={18} /></button>)}
            <CCCEmblem />
            <div>
              <p className="font-serif text-2xl leading-none text-white tracking-tight">Case Control Center</p>
              <p className="mt-1.5 text-[11px] font-mono uppercase tracking-[0.15em] text-amber-500/80">Register Perkara &amp; Penahanan</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-400 font-mono">alat monitoring pribadi · KUHAP UU 20/2025 · bukan pengganti EMP Polri</p>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-5 py-6 pb-16">
        {loading ? (
          <p className="py-12 text-center text-sm text-slate-400">Memuat data…</p>
        ) : page === "beranda" ? (
          <div className="space-y-3">
            <BerandaCard icon={FileText} title="Input Laporan" desc="Catat LP baru masuk" onClick={() => setPage("input")} />
            <BerandaCard icon={ListChecks} title="Tracking Perkara" desc="Status penanganan tiap LP" count={counts.total} onClick={() => setPage("tracking")} />
            <BerandaCard icon={Clock} title="Tahanan Aktif" desc="Penahanan berjalan — pantau batas waktu" count={counts.tahananAktif} onClick={() => setPage("tahananAktif")} />
            <BerandaCard icon={Users} title="Daftar Tahanan" desc="Riwayat tahanan yang sudah dilimpahkan ke Jaksa" count={counts.tahananRiwayat} onClick={() => setPage("tahananRiwayat")} />
            <BerandaCard icon={BookOpen} title="Cari Pasal" desc="KUHP, KUHAP, Penyesuaian Pidana" onClick={() => setPage("pasal")} />
          </div>
        ) : (
          <div>
            <div className="mb-4 flex items-center gap-2">
              <button onClick={() => setPage("beranda")} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800"><ChevronLeft size={16} /> Beranda</button>
              <span className="text-slate-300">/</span>
              <p className="font-serif text-base text-slate-900">
                {page === "input" && "Input Laporan"}
                {page === "tracking" && "Tracking Perkara"}
                {page === "tahananAktif" && "Tahanan Aktif"}
                {page === "tahananRiwayat" && "Daftar Tahanan (Riwayat)"}
                {page === "pasal" && "Cari Pasal"}
              </p>
            </div>
            {page === "input" && <InputLaporan perkara={perkara} persist={persist} onSaved={() => setPage("tracking")} />}
            {page === "tracking" && <TrackingPerkara perkara={perkara} persist={persist} />}
            {page === "tahananAktif" && <DaftarTahananAktif perkara={perkara} />}
            {page === "tahananRiwayat" && <DaftarTahananRiwayat perkara={perkara} />}
            {page === "pasal" && <CariPasal />}
          </div>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

