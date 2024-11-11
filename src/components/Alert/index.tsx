'use client';

import * as React from 'react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CustomAlertProps {
  variant?: 'info' | 'warning' | 'success' | 'destructive';
}

export default function CustomAlert({ variant = 'info' }: CustomAlertProps) {
  return (
    <Alert className={cn(["text-red-500 border-red-500"])}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  );
}