import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface HeritageCardProps {
  href: string;
  title: string;
  location: string;
  description: string;
  image: string;
}

export default function HeritageCard({
  href,
  title,
  location,
  description,
  image,
}: HeritageCardProps) {
  return (
    <Link href={href} className="card" prefetch={false}>
      <div className="card-image" style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 420px"
        />
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-location">📍 {location}</p>
        <p className="card-description">{description}</p>
      </div>
    </Link>
  );
}