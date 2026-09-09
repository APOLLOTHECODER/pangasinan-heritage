import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, href, className = '' }) => {
  const classes = `inline-flex items-center justify-center px-4 py-2 rounded-lg bg-teal-700 text-white hover:bg-teal-800 transition-colors ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
};

export default Button;