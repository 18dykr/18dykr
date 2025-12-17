import React, { useState } from 'react';
import CellMap from './components/CellMap';
import OrganelleDetail from './components/OrganelleDetail';
import AITutor from './components/AITutor';
import { Organelle } from './types';
import { Microscope, ArrowLeft } from 'lucide-react';

const App: React.FC = () => {
  const [selectedOrganelle, setSelectedOrganelle] = useState<Organelle | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-lime-500 p-2 rounded-lg text-white">
            <Microscope size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">细胞微观世界</h1>
            <p className="text-xs text-slate-500 font-medium">Structure and Function of Organelles</p>
          </div>
        </div>
        {selectedOrganelle && (
          <button 
            onClick={() => setSelectedOrganelle(null)}
            className="md:hidden flex items-center gap-1 text-sm font-bold text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={16} /> 返回全景
          </button>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1600px] mx-auto w-full p-4 md:p-6 lg:p-8 flex flex-col md:flex-row gap-6 lg:gap-8 overflow-hidden">
        
        {/* Left Column: Cell Map */}
        <div className={`
          flex-1 flex flex-col bg-white rounded-3xl shadow-sm border border-slate-200 p-4 relative transition-all duration-500
          ${selectedOrganelle ? 'hidden md:flex md:w-1/2 lg:w-5/12' : 'w-full h-[80vh]'}
        `}>
          <div className="absolute top-6 left-6 z-10">
            <h2 className="text-2xl font-bold text-slate-800">植物细胞模型</h2>
            <p className="text-slate-500">点击细胞器查看详情</p>
          </div>
          <CellMap 
            selectedId={selectedOrganelle?.id || null} 
            onSelect={setSelectedOrganelle} 
          />
        </div>

        {/* Right Column: Detail View & AI */}
        {selectedOrganelle && (
          <div className="flex-1 md:w-1/2 lg:w-7/12 flex flex-col lg:flex-row gap-6 animate-in slide-in-from-right duration-500 fade-in">
            
            {/* Middle: Static Info */}
            <div className="lg:w-1/2 flex-1 h-[calc(100vh-140px)]">
               <OrganelleDetail 
                 organelle={selectedOrganelle} 
                 onClose={() => setSelectedOrganelle(null)}
               />
            </div>

            {/* Right: AI Chat */}
            <div className="lg:w-1/2 h-[50vh] lg:h-[calc(100vh-140px)]">
              <AITutor organelle={selectedOrganelle} />
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

export default App;