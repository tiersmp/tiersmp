declare module '@/lib/utils' {
  export function cn(...inputs: any[]): string;
  export function formatDate(date: Date | string | number, options?: Intl.DateTimeFormatOptions): string;
  export function absoluteUrl(path: string): string;
  export function isActiveRoute(currentPath: string, route: string): boolean;
  export function formatNumber(num: number, options?: Intl.NumberFormatOptions): string;
  export function truncate(str: string, length: number, ellipsis?: string): string;
  export function capitalize(str: string): string;
  export function getInitials(name: string): string;
  export function isClientSide(): boolean;
  export function getFromLocalStorage<T>(key: string, defaultValue: T): T;
  export function setToLocalStorage<T>(key: string, value: T): void;
  export function removeFromLocalStorage(key: string): void;
  export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void;
  export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void;
  export function generateId(prefix?: string): string;
  export function isObjectEmpty(obj: Record<string, any>): boolean;
  export function sleep(ms: number): Promise<void>;
  export function getRandomInt(min: number, max: number): number;
}
