import React from 'react';

export default function AvatarStack({ users, caption }) {
  // users = [{ initials: 'JD', color: 'bg-blue-100 text-blue-700' }, ...]
  
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2 overflow-hidden">
        {users.map((user, i) => (
          <div 
            key={i} 
            className={`inline-block h-8 w-8 rounded-full ring-2 ring-white flex items-center justify-center text-xs font-bold ${user.color || 'bg-gray-100 text-gray-700'}`}
          >
            {user.initials}
          </div>
        ))}
      </div>
      {caption && <p className="text-sm font-medium text-gray-500">{caption}</p>}
    </div>
  );
}
