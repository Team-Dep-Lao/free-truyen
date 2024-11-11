import { cn } from '@/lib/utils';
import * as React from 'react';

export default function PageProvider({ children, className }: { children: React.ReactNode; className?: string; }) {
  return (
    <div className={cn(["web-container bg-white shadow-md min-h-screen p-2", className])}>
      {children}
    </div>
  );
}