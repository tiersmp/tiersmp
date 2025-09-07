'use client';

import * as React from 'react';
import { useToast as useToastPrimitive } from '@/components/ui/toaster';

type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  type?: ToastType;
}

type ToastFunction = (options: Omit<ToastOptions, 'type'>) => string;

type ToastUpdate = {
  title?: string;
  description?: string;
  duration?: number;
  type?: ToastType;
};

interface UseToastReturn {
  (options: ToastOptions): string;
  success: ToastFunction;
  error: ToastFunction;
  warning: ToastFunction;
  info: ToastFunction;
  dismiss: (id: string) => void;
  update: (id: string, updates: ToastUpdate) => void;
}

export function useToast(): UseToastReturn {
  const { addToast, dismissToast, updateToast } = useToastPrimitive();

  const toast = React.useCallback(({ title, description, duration = 5000, type = 'default' }: ToastOptions) => {
    return addToast({
      title,
      description,
      duration,
      type,
    });
  }, [addToast]);

  // Créer un objet avec les méthodes de type
  const toastWithTypes = Object.assign(
    toast,
    {
      success: (options: Omit<ToastOptions, 'type'>) => toast({ ...options, type: 'success' }),
      error: (options: Omit<ToastOptions, 'type'>) => toast({ ...options, type: 'error' }),
      warning: (options: Omit<ToastOptions, 'type'>) => toast({ ...options, type: 'warning' }),
      info: (options: Omit<ToastOptions, 'type'>) => toast({ ...options, type: 'info' }),
      dismiss: dismissToast,
      update: updateToast as (id: string, updates: ToastUpdate) => void
    } as Omit<UseToastReturn, 'dismiss' | 'update'>
  );

  return toastWithTypes as UseToastReturn;
}
