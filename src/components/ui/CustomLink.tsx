import Link from 'next/link';
import { ReactNode } from 'react';

interface CustomLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

const CustomLink = ({ href, children, className = '', ...props }: CustomLinkProps) => {
  return (
    <Link href={href} {...props}>
      <span className={className}>
        {children}
      </span>
    </Link>
  );
};

export default CustomLink;
