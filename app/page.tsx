import React from 'react';
import Link from 'next/link';
import HeritageCard from '@/components/ui/HeritageCard';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1>Discover Pangasinan's Heritage</h1>
          <p>Explore centuries of history, natural wonders, and cultural treasures in one of the Philippines' most beautiful provinces.</p>
          <div style={{ marginTop: '32px' }}>
            <Link href="#sites" className="btn btn-secondary" style={{ marginRight: '12px' }}>
              Explore Sites
            </Link>
            <Link href="#sites" className="btn btn-primary" style={{ background: 'white', color: '#0f766e' }}>
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ background: '#0f766e', color: 'white', padding: '40px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>124</div>
              <div style={{ opacity: 0.9 }}>Islands</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>3+</div>
              <div style={{ opacity: 0.9 }}>Heritage Sites</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>100+</div>
              <div style={{ opacity: 0.9 }}>Years of History</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>∞</div>
              <div style={{ opacity: 0.9 }}>Memories to Make</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sites */}
      <section id="sites" className="container" style={{ padding: '60px 0' }}>
        <h2 style={{ fontSize: '2rem', color: '#0f766e', textAlign: 'center', marginBottom: '40px' }}>
          Featured Heritage Sites
        </h2>
        
        <div className="card-grid">
          <HeritageCard
            href="/sites/hundred-islands"
            title="Hundred Islands National Park"
            location="Alaminos City, Pangasinan"
            description="A breathtaking archipelago of 124 islands scattered across the Lingayen Gulf."
            image="/images/hundred-islands.webp"
          />

          <HeritageCard
            href="/sites/bolinao-lighthouse"
            title="Cape Bolinao Lighthouse"
            location="Bolinao, Pangasinan"
            description="A historic lighthouse offering panoramic views of the West Philippine Sea."
            image="/images/bolinao-lighthouse.webp"
          />

          <HeritageCard
            href="/sites/balungao-hot-spring"
            title="Balungao Hot Spring"
            location="Balungao, Pangasinan"
            description="Natural therapeutic hot springs nestled at the foot of Mount Balungao."
            image="/images/balungao-hot-spring.webp"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: '#1e293b', color: 'white', padding: '60px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Plan Your Visit Today</h2>
          <p style={{ color: '#94a3b8', marginBottom: '32px', fontSize: '1.1rem' }}>
            Experience the beauty and heritage of Pangasinan. Get travel tips and recommendations.
          </p>
          <Link href="#sites" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '16px 32px' }}>
            Start Planning
          </Link>
        </div>
      </section>
    </>
  );
}