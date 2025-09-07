import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import { cn } from '@/lib/utils';

type CustomLinkProps = {
  /** Whether the link is external (opens in new tab) */
  external?: boolean;
  /** Whether to show an external link icon */
  showExternalIcon?: boolean;
  /** Whether to disable the link */
  disabled?: boolean;
  /** The variant of the link */
  variant?: 'default' | 'primary' | 'muted' | 'destructive';
  /** The size of the link */
  size?: 'sm' | 'md' | 'lg';
  /** The content of the link */
  children: React.ReactNode;
} & Omit<LinkProps, 'href' | 'className'> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'> & {
    href: string;
    className?: string;
  };

const linkVariants = {
  default: 'text-foreground hover:underline underline-offset-4',
  primary: 'text-primary hover:underline underline-offset-4',
  muted: 'text-muted-foreground hover:underline underline-offset-4',
  destructive: 'text-destructive hover:underline underline-offset-4',
};

const linkSizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const CustomLink = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  (
    {
      href,
      children,
      className = '',
      external = false,
      showExternalIcon = external,
      disabled,
      variant = 'default',
      size = 'md',
      ...props
    },
    ref
  ) => {
    const isExternal = external || href.toString().startsWith('http');
    const externalProps = isExternal
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};

    return (
      <Link
        href={disabled ? '#' : href}
        className={cn(
          'inline-flex items-center gap-1.5 transition-colors',
          linkVariants[variant],
          linkSizes[size],
          disabled && 'pointer-events-none opacity-50',
          className
        )}
        aria-disabled={disabled}
        {...externalProps}
        {...props}
        // @ts-ignore - La ref est correctement typée mais TypeScript a du mal avec le composant Link de Next.js
        ref={ref}
      >
        {children}
        {showExternalIcon && isExternal && (
          <span className="ml-1 inline-block h-3.5 w-3.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-full w-full"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </span>
        )}
      </Link>
    );
  }
);

CustomLink.displayName = 'CustomLink';

export { CustomLink };

export default CustomLink;

