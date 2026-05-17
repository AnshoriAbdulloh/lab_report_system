import { ClipboardList, Plus } from "lucide-react";

type Role = "User" | "Teknisi";

export default function Navbar() {
  const [role, setRole] = useState<Role>("User");

  return (
    <nav className='sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 h-16'>
      <div className='max-w-6xl mx-auto flex items-center justify-between h-full'>
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center'>
            <ClipboardList className='text-white' size={18} />
          </div>
          <span className='font-bold text-lg tracking-tight'>LabCare</span>
        </div>

        <div className='flex items-center gap-6'>
          <div className='hidden sm:flex bg-gray-100 p-1 rounded-full'>
            {(["User", "Teknisi"] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${role === r ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
              >
                {r}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className='bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 hover:bg-black transition-all'
          >
            <Plus size={16} />
            Buat Laporan
          </button>
        </div>
      </div>
    </nav>
  );
}
