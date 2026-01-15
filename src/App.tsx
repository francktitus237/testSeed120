import { useState, useEffect } from 'react'
import './App.css'
import { SidebarProvider, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Home, MoreHorizontal, Settings, Users, FileText, Bell } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  interface Todo {
    id: number
    todo: string
    completed: boolean
    userId: number
  }

  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true)
      try {
        const res = await fetch('https://dummyjson.com/todos')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setTodos(data.todos || [])
      } catch (err: any) {
        setError(err.message || 'Fetch error')
      } finally {
        setLoading(false)
      }
    }

    fetchTodos()
  }, [])

  return (
    <SidebarProvider className='w-full'>
      <div className="flex bg-gray-50/50 w-full h-screen w-screen">

        {/* Sidebar */}
        <aside className="w-64 bg-blue-900/50 shadow-lg overflow-y-auto">
          <div className="p-6 border-b border-blue-800/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                  <rect width="24" height="24" rx="5" fill="url(#g)" />
                  <path d="M11 7h2v4h4v2h-4v4h-2v-4H7v-2h4V7z" fill="white" />
                  <defs>
                    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#3b82f6" />
                      <stop offset="1" stopColor="#1e40af" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h2 className="text-lg font-bold">HealDocs</h2>
            </div>
          </div>
          
          <nav className="p-2 space-y-2">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button 
                  onClick={() => setActiveTab('Overview')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                    activeTab === 'home' ? 'bg-blue-700' : 'hover:bg-blue-800'
                  }`}
                >
                  <Home size={20} />
                  <span>Overview</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>

             <SidebarMenuItem>
              <SidebarMenuButton asChild >
                <button 
                  onClick={() => setActiveTab('team')}
                  className={`w-full flex items-center gap-3 px-4 py-3 ${
                    activeTab === 'team' ? 'bg-blue-700' : 'hover:bg-blue-800'
                  }`}
                >
                  <Users size={20} />
                  <span>Team mate</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button 
                  onClick={() => setActiveTab('Todo Liste')}
                  className={`w-full flex items-center gap-3 px-4 py-3 ${
                    activeTab === 'todo liste' ? 'bg-blue-700' : 'hover:bg-blue-800'
                  }`}
                >
                  <FileText size={20} />
                  <span>Todo List</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col w-full">
          {/* Top Header */}
          <header className="bg-white shadow p-6 flex justify-between items-center h-20">
            <h1 className="text-2xl font-bold text-gray-800">
              {activeTab === 'Overview' && 'Overview'} 
            </h1>
            
            <div className="flex items-center gap-6">
              {/* Notification Bell */}
              <button className="relative p-2 rounded-lg ">
                <Bell size={24} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Dropdown Menu with Avatar */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 p-2 rounded-lg ">
                    {/* Avatar Circle */}
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      JD
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="left" align="end" className="bg-white text-black rounded shadow-lg">
                  <DropdownMenuItem className="p-3 hover:bg-gray-100 cursor-pointer">
                    <span>Profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 hover:bg-gray-100 cursor-pointer border-t">
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Content Area */}
          <div className="flex-1 overflow-auto p-6">
            {activeTab === 'Todo Liste' && (
              <div>
                {loading && <div className="text-gray-600">Chargement...</div>}
                {error && <div className="text-red-500">Erreur: {error}</div>}

                {!loading && !error && (
                  <div className="grid grid-cols-3 gap-6">
                    {todos.slice(0, 9).map((t) => (
                      <div key={t.id} className={` p-6 rounded-lg shadow text-sm ${t.completed ? 'bg-green-600/30' : 'bg-gray-500/30'}`}>
                        <h3 className="font-semibold mb-2">{t.todo}</h3>
                        <p className={`text-sm ${t.completed ? 'text-green-600' : 'text-gray-500'}`}>
                          {t.completed ? 'Terminé' : 'En cours'}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'team' && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Liste des utilisateurs</h2>
                <p>lister des todo liste du tableau </p>
                <p className="text-gray-600">Contenu des utilisateurs ici...</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default App