// Déclarations de type pour les modules Next.js
declare module 'next' {
  export * from 'next/types';
  export { default } from 'next/types';
}

declare module 'next/head' {
  import { FC, ReactNode } from 'react';
  interface HeadProps {
    children: ReactNode;
  }
  const Head: FC<HeadProps>;
  export default Head;
}

declare module 'next/link' {
  import { LinkProps as NextLinkProps } from 'next/dist/client/link';
  import { PropsWithChildren } from 'react';
  
  export interface LinkProps extends Omit<NextLinkProps, 'passHref'> {
    children?: React.ReactNode;
  }
  
  declare const Link: React.FC<PropsWithChildren<LinkProps>>;
  export default Link;
}

declare module 'next/navigation' {
  export function useRouter(): {
    push: (url: string) => void;
    replace: (url: string) => void;
    back: () => void;
    prefetch: (url: string) => void;
    refresh: () => void;
  };
  
  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
}

declare module 'next/font/google' {
  interface GoogleFontOptions {
    subsets?: string[];
    display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
    weight?: string | number | Array<string | number>;
    style?: 'normal' | 'italic' | Array<'normal' | 'italic'>;
    preload?: boolean;
    variable?: string;
    adjustFontFallback?: boolean | string;
  }
  
  export function Inter(options?: GoogleFontOptions): any;
}
