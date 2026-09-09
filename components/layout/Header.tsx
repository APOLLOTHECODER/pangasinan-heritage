import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container header-content">
        <Link href="/" className="logo">
          <Image
            src="/images/pangasinan-seal.webp"
            alt="Pangasinan Provincial Seal"
            width={40}
            height={40}
            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
          />
          <span>Pangasinan Heritage</span>
        </Link>
        
        <nav className="nav-links">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/#sites" className="nav-link">Heritage Sites</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;