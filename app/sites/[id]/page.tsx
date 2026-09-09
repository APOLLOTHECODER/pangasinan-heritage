import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import HundredIslandsExplorer from '@/components/islands/HundredIslandsExplorer';

const sites = {
  'hundred-islands': {
    name: 'Hundred Islands National Park',
    location: 'Alaminos City, Pangasinan',
    description: 'A breathtaking archipelago of 124 islands scattered across the Lingayen Gulf.',
    longDescription: 'The Hundred Islands National Park is a protected area comprising 124 islands and islets. Each island offers unique geological formations, hidden lagoons, and pristine beaches. Popular activities include island hopping, snorkeling, kayaking, and cave exploration.',
    features: ['Island Hopping', 'Snorkeling', 'Kayaking', 'Cave Exploration'],
    image: '/images/hundred-islands.webp',
    emoji: '🏝️',
    gradient: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
  },
  'bolinao-lighthouse': {
    name: 'Cape Bolinao Lighthouse',
    location: 'Bolinao, Pangasinan',
    description: 'A historic lighthouse offering panoramic views of the West Philippine Sea.',
    longDescription: 'Built in 1905, the Cape Bolinao Lighthouse stands at 351 feet above sea level. It serves as a guiding beacon for ships navigating the treacherous waters of the South China Sea.',
    features: ['Historical Landmark', 'Scenic Viewpoint', 'Photography', 'Sunset Viewing'],
    image: '/images/bolinao-lighthouse.webp',
    emoji: '🗼',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
  },
  'balungao-hot-spring': {
    name: 'Balungao Hot Spring',
    location: 'Balungao, Pangasinan',
    description: 'Natural therapeutic hot springs nestled at the foot of Mount Balungao.',
    longDescription: 'The Balungao Hot Spring Resort features natural mineral-rich waters known for their therapeutic properties. The resort includes multiple pools of varying temperatures and beautifully landscaped gardens.',
    features: ['Hot Spring Pools', 'Water Slides', 'Picnic Areas', 'Accommodation'],
    image: '/images/balungao-hot-spring.webp',
    emoji: '♨️',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
  },
};

export function generateStaticParams() {
  return Object.keys(sites).map((id) => ({
    id,
  }));
}

export default function SitePage({ params }: { params: { id: string } }) {
  const site = sites[params.id as keyof typeof sites];

  if (!site) {
    notFound();
  }

  return (
    <>
      {/* Detail Hero */}
      <section className="detail-hero" style={{ position: 'relative', overflow: 'hidden', minHeight: '340px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src={site.image}
            alt={site.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="100vw"
            priority
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.65) 0%, rgba(15, 118, 110, 0.85) 100%)' }} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>{site.emoji}</div>
          <h1 className="detail-title">{site.name}</h1>
          <p className="detail-location">📍 {site.location}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container detail-content">
        <div className="detail-section">
          <h2>About This Site</h2>
          <p>{site.longDescription}</p>
        </div>

        <div className="detail-section">
          <h2>Features & Activities</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {site.features.map((feature, index) => (
              <li key={index} style={{ 
                padding: '12px 0', 
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ color: '#0f766e', fontSize: '1.2rem' }}>✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Interactive Archipelago Explorer for Hundred Islands */}
      {params.id === 'hundred-islands' && <HundredIslandsExplorer />}

      <div style={{ textAlign: 'center', margin: '40px 0 60px 0' }}>
        <Link href="/" className="btn btn-primary">← Back to Home</Link>
      </div>
    </>
  );
}