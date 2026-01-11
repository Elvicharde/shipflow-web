import React from 'react';

export const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <header className="flex items-center justify-between px-8 py-6 bg-white border-b">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      {/* Add more header actions here if needed */}
    </header>
  );
};
