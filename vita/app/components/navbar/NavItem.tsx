import Link from 'next/link';
import React from 'react';

interface NavItemProps {
  color: string;
  title: string;
  href?: string;
}

const NavItem: React.FC<NavItemProps> = ({ color, title, href = '#' }) => {
  const isActive = typeof window !== 'undefined' && window.location.pathname === href;

  const className = `${color} text-lg font-bold font-nats ${isActive ? 'active' : ''}`;
  
  return (
    <Link href={href} passHref className={className}>
        {title}
    </Link>
  );
};

export default NavItem;
