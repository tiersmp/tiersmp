'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info';

interface Toast extends Omit<ToastProps, 'id' | 'onOpenChange'> {
  id: string;
  type?: ToastType;
  title?: string;
  description?: string;
  duration?: number;
  onDismiss?: () => void;
}

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  duration?: number;
  type?: ToastType;
  title?: string;
  description?: string;
  onDismiss?: () => void;
  className?: string;
  children?: React.ReactNode;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  dismissToast: (id: string) => void;
  updateToast: (id: string, updates: Partial<Toast>) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

const toastVariants = {
  default: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700',
  success: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800',
  error: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800',
  warning: 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800',
  info: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
};

const toastIcons = {
  default: null,
  success: (
    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = React.useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id, open: true };
    
    setToasts((prevToasts) => [...prevToasts, newToast]);
    
    // Auto-dismiss after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        dismissToast(id);
      }, toast.duration || 5000);
    }
    
    return id;
  }, []);

  const dismissToast = React.useCallback((id: string) => {
    setToasts((prevToasts) =>
      prevToasts.map((toast) =>
        toast.id === id ? { ...toast, open: false } : toast
      )
    );
    
    // Remove from DOM after animation
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 300);
  }, []);

  const updateToast = React.useCallback((id: string, updates: Partial<Toast>) => {
    setToasts((prevToasts) =>
      prevToasts.map((toast) =>
        toast.id === id ? { ...toast, ...updates } : toast
      )
    );
  }, []);

  const value = React.useMemo(
    () => ({
      toasts,
      addToast,
      dismissToast,
      updateToast,
    }),
    [toasts, addToast, dismissToast, updateToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function Toaster() {
  const { toasts, dismissToast } = useToast();
  
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 w-full max-w-xs">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          open={toast.open}
          onOpenChange={(open) => !open && dismissToast(toast.id)}
          className={cn(
            'relative w-full p-4 pr-10 rounded-lg border shadow-lg overflow-hidden',
            'transition-all duration-300 ease-in-out',
            'transform',
            toast.open ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full',
            toast.className,
            toast.type ? toastVariants[toast.type] : toastVariants.default
          )}
          onDismiss={() => dismissToast(toast.id)}
        >
          <div className="flex items-start gap-3">
            {toast.type && toast.type !== 'default' && (
              <div className="flex-shrink-0 mt-0.5">
                {toastIcons[toast.type]}
              </div>
            )}
            <div className="flex-1">
              {toast.title && (
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                  {toast.title}
                </h3>
              )}
              {toast.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {toast.description}
                </p>
              )}
              {toast.children}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="absolute top-2 right-2 p-1 text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {toast.duration !== 0 && (
            <div 
              className="absolute bottom-0 left-0 h-1 bg-gray-200 dark:bg-gray-700"
              style={{
                width: '100%',
                transform: 'scaleX(1)',
                transformOrigin: 'left',
                animation: `progress ${toast.duration || 5000}ms linear forwards`,
              }}
            />
          )}
          <style jsx global>{`
            @keyframes progress {
              from { transform: scaleX(1); }
              to { transform: scaleX(0); }
            }
          `}</style>
        </Toast>
      ))}
    </div>
  );
}

export function Toast({
  open = true,
  onOpenChange,
  duration = 3000,
  className,
  children,
  ...props
}: ToastProps) {
  const [isOpen, setIsOpen] = React.useState(open);

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  React.useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        setIsOpen(false);
        onOpenChange?.(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onOpenChange]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'relative flex items-center justify-between w-full max-w-sm p-4 mb-2 text-gray-700 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-200',
        'animate-in fade-in slide-in-from-right-8',
        className
      )}
      {...props}
    >
      {children}
      <button
        onClick={() => {
          setIsOpen(false);
          onOpenChange?.(false);
        }}
        className="absolute top-2 right-2 p-1 text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export function ToastTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('font-semibold', className)} {...props} />;
}

export function ToastDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('text-sm opacity-90', className)} {...props} />;
}
