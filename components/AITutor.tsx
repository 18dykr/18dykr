
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Organelle, ChatMessage } from '../types';
import { generateExplanation } from '../services/geminiService';
import { Send, Bot, User, Loader2, Sparkles, HelpCircle } from 'lucide-react';

interface AITutorProps {
  organelle: Organelle;
}

const AITutor: React.FC<AITutorProps> = ({ organelle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generate dynamic suggestions based on organelle type
  const suggestions = useMemo(() => {
    const name = organelle.name.split(' ')[0];
    const base = [
      `用简单的比喻解释一下${name}`,
      `告诉我一个关于${name}的小知识`,
      `给我出一道选择题`
    ];
    
    // Specific suggestions
    if (organelle.id === 'chloroplast' || organelle.id === 'mitochondria') {
      base.push(`它为什么被称为能量转换器？`);
    }
    if (organelle.id === 'vacuole') {
      base.push(`为什么枯萎的植物浇水后会挺立？`);
    }
    if (organelle.id === 'nucleus') {
      base.push(`如果没有它，细胞会怎么样？`);
    }
    
    return base;
  }, [organelle.id]);

  useEffect(() => {
    setMessages([{
      role: 'model',
      text: `你好！我是 AI 生物助教。关于 **${organelle.name.split(' ')[0]}**，你想深入了解哪方面？点击下方的“灵感卡片”或直接问我吧！`
    }]);
  }, [organelle.id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (customInput?: string) => {
    const textToSend = customInput || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    if (!customInput) setInput('');
    setLoading(true);

    const responseText = await generateExplanation(organelle.name, textToSend);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          <h3 className="font-bold text-lg">AI 互动微课堂</h3>
        </div>
        <div className="bg-white/20 px-2 py-1 rounded text-[10px] uppercase tracking-wider font-bold">
          Gemini 2.5
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`
              max-w-[90%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm
              ${msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-br-none' 
                : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'}
            `}>
              <div className="flex items-center gap-2 mb-1 opacity-70 text-[10px] font-bold">
                 {msg.role === 'user' ? <User size={10}/> : <Bot size={10}/>}
                 {msg.role === 'user' ? '提问者' : 'AI 助教'}
              </div>
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-slate-200 flex items-center gap-2 text-slate-500 text-sm shadow-sm">
              <Loader2 className="animate-spin w-4 h-4 text-indigo-500" />
              老师正在查阅资料...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Persistent Quick Actions */}
      <div className="bg-white px-4 py-3 border-t border-slate-100">
        <div className="flex items-center gap-2 mb-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
           <HelpCircle size={12} />
           <span>你可以这样问</span>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {suggestions.map((action, idx) => (
            <button
              key={`${organelle.id}-${idx}`}
              onClick={() => handleSend(action)}
              disabled={loading}
              className="whitespace-nowrap px-3 py-1.5 bg-slate-50 text-slate-600 text-xs rounded-lg border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all active:scale-95 disabled:opacity-50"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="flex gap-2 p-1.5 bg-slate-100 rounded-xl focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`在此输入您的疑问...`}
            className="flex-1 px-2 py-1.5 bg-transparent border-0 outline-none text-slate-700 text-sm"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors shadow-md shadow-indigo-200"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
