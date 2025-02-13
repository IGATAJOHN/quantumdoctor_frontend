import React from 'react';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-medium text-[#3b392d]">{title}</h1>
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 bg-stone-100 rounded-full border border-[#d0cfcc] flex items-center justify-center">
          <BellIcon className="w-4 h-4 text-[#3b392d]" />
        </button>
        <div className="flex items-center gap-2">
          <img
            className="w-10 h-10 rounded-full border border-[#b0b0ab]"
            src="/images/doctor.png"
            alt="Dr Wilson"
          />
          <div className="px-2.5 py-1.5 bg-[#f2f7fe] rounded-lg border border-[#d0cfcc]">
            <span className="text-black text-sm font-normal">Dr Wilson</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import { BellIcon } from 'lucide-react';

