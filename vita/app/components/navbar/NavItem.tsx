// components/NavItem.tsx
import React from 'react';

interface NavItemProps {
  color: string;
  title: string;
}

const NavItem: React.FC<NavItemProps> = ({ color, title }) => {
  const className = `${color} text-lg font-bold`;
  return (
    <div className={className}>
      {title}
    </div>
  );
};

export default NavItem;