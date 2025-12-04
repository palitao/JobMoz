import React, { useState } from 'react';
import { Message, User } from '../types';
import { Send, User as UserIcon, MoreVertical, Phone, Video, Search } from 'lucide-react';
import { MOCK_MESSAGES } from '../constants';

interface ChatProps {
  currentUser: User;
}

export const Chat: React.FC<ChatProps> = ({ currentUser }) => {
  const [activeChat, setActiveChat] = useState<string | null>(MOCK_MESSAGES[0]?.senderId === currentUser.id ? MOCK_MESSAGES[0].receiverId : MOCK_MESSAGES[0].senderId);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);

  // Group messages
  const chats = Array.from(new Set(messages.map(m => m.senderId === currentUser.id ? m.receiverId : m.senderId)))
    .map(userId => {
      const userMessages = messages.filter(m => m.senderId === userId || m.receiverId === userId);
      const lastMsg = userMessages[userMessages.length - 1];
      const otherUserName = lastMsg.senderId === currentUser.id ? 'Recrutador / Candidato' : lastMsg.senderName;
      return {
        userId,
        name: otherUserName,
        lastMessage: lastMsg.content,
        timestamp: lastMsg.timestamp,
        unread: userMessages.some(m => m.receiverId === currentUser.id && !m.read)
      };
    });

  const activeMessages = messages.filter(m => 
    (m.senderId === currentUser.id && m.receiverId === activeChat) || 
    (m.senderId === activeChat && m.receiverId === currentUser.id)
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      receiverId: activeChat,
      senderName: currentUser.name,
      content: messageInput,
      timestamp: 'Agora',
      read: false
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row h-[650px]">
      {/* Sidebar List */}
      <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-100 bg-white flex flex-col">
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Buscar conversas..." className="w-full bg-slate-50 border-none rounded-xl pl-9 pr-4 py-2 text-sm focus:ring-1 focus:ring-emerald-500 placeholder-slate-400" />
          </div>
        </div>
        <div className="overflow-y-auto flex-1">
          {chats.map(chat => (
            <div 
              key={chat.userId}
              onClick={() => setActiveChat(chat.userId)}
              className={`p-4 cursor-pointer transition-all border-b border-slate-50 hover:bg-slate-50
                ${activeChat === chat.userId ? 'bg-emerald-50/50 border-l-4 border-l-emerald-500' : 'border-l-4 border-l-transparent'}
              `}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`font-bold text-sm truncate ${chat.unread ? 'text-slate-900' : 'text-slate-700'}`}>{chat.name}</span>
                <span className="text-[10px] text-slate-400 font-medium">{chat.timestamp}</span>
              </div>
              <p className={`text-xs truncate ${chat.unread ? 'text-slate-800 font-bold' : 'text-slate-500'}`}>
                {chat.lastMessage}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50/30">
        {activeChat ? (
          <>
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white shadow-sm z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  <UserIcon className="text-emerald-700" size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{chats.find(c => c.userId === activeChat)?.name || 'Usuário'}</h4>
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 uppercase tracking-wider">● Online</span>
                </div>
              </div>
              <div className="flex gap-1 text-slate-400">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><Phone size={18}/></button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><Video size={18}/></button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><MoreVertical size={18}/></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {activeMessages.map(msg => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-sm text-sm ${
                      isMe 
                        ? 'bg-emerald-600 text-white rounded-br-none' 
                        : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
                    }`}>
                      <p className="leading-relaxed">{msg.content}</p>
                      <span className={`text-[10px] block text-right mt-1 opacity-70`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100">
              <div className="flex gap-2 items-center bg-slate-50 border border-slate-200 rounded-full px-2 py-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Escreva sua mensagem..."
                  className="flex-1 bg-transparent px-4 text-sm focus:outline-none placeholder-slate-400 text-slate-700"
                />
                <button 
                  type="submit"
                  disabled={!messageInput.trim()}
                  className="bg-emerald-600 text-white p-2.5 rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:bg-slate-300 transition-all shadow-md"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-300 bg-slate-50">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-100">
               <Send size={32} className="opacity-50" />
            </div>
            <p className="font-medium text-slate-400">Selecione uma conversa para começar</p>
          </div>
        )}
      </div>
    </div>
  );
};