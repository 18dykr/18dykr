
import React from 'react';
import { Organelle } from '../types';
import { X, ZoomIn, Info, ImageIcon } from 'lucide-react';

interface OrganelleDetailProps {
  organelle: Organelle;
  onClose: () => void;
}

const OrganelleDetail: React.FC<OrganelleDetailProps> = ({ organelle, onClose }) => {
  return (
    <div className="h-full flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
      {/* Title Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group shrink-0">
         <div className={`absolute top-0 right-0 w-32 h-32 ${organelle.color} opacity-10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150`}></div>
         
         <div className="flex justify-between items-start relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{organelle.icon}</span>
                <h2 className="text-2xl font-bold text-slate-800">{organelle.name}</h2>
              </div>
              <p className="text-slate-500 font-medium">{organelle.shortDescription}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors md:hidden"
            >
              <X size={24} />
            </button>
         </div>
      </div>
      
      {/* Image Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden shrink-0">
        <div className="relative h-48 w-full bg-slate-100">
            {organelle.image ? (
                <img 
                    src={organelle.image} 
                    alt={organelle.name} 
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <ImageIcon size={32} />
                </div>
            )}
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">
                示意图
            </div>
        </div>
      </div>

      {/* Hint about the zoom */}
      <div className="bg-blue-50 text-blue-700 text-sm p-3 rounded-xl flex items-center gap-2 border border-blue-100 shrink-0">
         <ZoomIn size={16} />
         <span>左侧 3D 模型已对焦到 {organelle.name.split(' ')[0]}。</span>
      </div>

      {/* Structure Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 shrink-0">
        <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Info size={20} className="text-blue-500" />
          形态结构
        </h3>
        <p className="text-slate-600 leading-relaxed text-justify whitespace-pre-line">
          {organelle.structure}
        </p>
      </div>

      {/* Function Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 shrink-0">
        <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Info size={20} className="text-green-500" />
          主要功能
        </h3>
        <p className="text-slate-600 leading-relaxed text-justify whitespace-pre-line">
          {organelle.function}
        </p>
      </div>

    </div>
  );
};

export default OrganelleDetail;
