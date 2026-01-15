import { useState } from 'react'
import './App.css'
import { SidebarProvider, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Home, MoreHorizontal, Settings, Users, FileText, Bell } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <SidebarProvider className='w-full'>
      <div className="flex bg-gray-50 w-full h-screen w-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-900 text-white shadow-lg overflow-y-auto">
          <div className="p-6 border-b border-blue-800">
            <h2 className="text-lg font-bold">HealDoc</h2>
          </div>
          
          <nav className="p-2 space-y-2">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button 
                  onClick={() => setActiveTab('home')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === 'home' ? 'bg-blue-700' : 'hover:bg-blue-800'
                  }`}
                >
                  <Home size={20} />
                  <span>Overview</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>

             <SidebarMenuItem>
              <SidebarMenuButton asChild>
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
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 ${
                    activeTab === 'settings' ? 'bg-blue-700' : 'hover:bg-blue-800'
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
              {activeTab === 'home' && 'Todo List'}
            
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
            {activeTab === 'home' && (
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                 
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                 
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                
                </div>
              </div>
            )}
            
            {activeTab === 'users' && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Liste des utilisateurs</h2>
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