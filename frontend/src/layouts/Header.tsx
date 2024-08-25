import React from 'react';

const Header: React.FC = () => {
  return <header className="header p-4 w-100">
    <nav className="flex items-center justif-between flex-wrap w-100">
      {/* LOGO */}
      <div className="flex items-center flex-shrink-0">
        <span className="font-semibold text-5xl tracking-tight left-0">Golpo</span>
      </div>
    </nav>
  </header>
}

export default Header;
