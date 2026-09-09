'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  hundredIslandsList,
  islandCategories,
  IslandCategory,
  IslandItem,
} from '@/data/hundred-islands-data';

export default function HundredIslandsExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<IslandCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIsland, setActiveIsland] = useState<IslandItem | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIsland(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredIslands = useMemo(() => {
    return hundredIslandsList.filter((island) => {
      const matchesCategory =
        selectedCategory === 'All' || island.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesQuery =
        island.name.toLowerCase().includes(query) ||
        island.tagline.toLowerCase().includes(query) ||
        island.description.toLowerCase().includes(query) ||
        island.activities.some((act) => act.toLowerCase().includes(query)) ||
        island.highlights.some((h) => h.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="container" style={{ padding: '40px 0 80px 0' }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <span
          style={{
            display: 'inline-block',
            background: 'rgba(15, 118, 110, 0.1)',
            color: '#0f766e',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '600',
            marginBottom: '12px',
          }}
        >
          Archipelago Directory
        </span>
        <h2 style={{ fontSize: '2.2rem', color: '#0f766e', marginBottom: '12px' }}>
          Explore the Famous Islands of Hundred Islands
        </h2>
        <p style={{ color: '#475569', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          Discover the unique charm of the park’s most celebrated islands. From dramatic sea caves and 360-degree viewpoints to tranquil family beaches and giant clam sanctuaries.
        </p>
      </div>

      {/* Quick Facts Banner */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
          border: '1px solid #e2e8f0',
          marginBottom: '36px',
        }}
      >
        <div style={{ textAlign: 'center', padding: '8px' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0f766e' }}>124 / 123</div>
          <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Islands (Low / High Tide)</div>
        </div>
        <div style={{ textAlign: 'center', padding: '8px', borderLeft: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0f766e' }}>1,844 ha</div>
          <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Protected Marine Sanctuary</div>
        </div>
        <div style={{ textAlign: 'center', padding: '8px', borderLeft: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0f766e' }}>Lucap Wharf</div>
          <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Primary Boat Jump-Off Port</div>
        </div>
        <div style={{ textAlign: 'center', padding: '8px', borderLeft: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0f766e' }}>1940</div>
          <div style={{ fontSize: '0.9rem', color: '#64748b' }}>First Philippine National Park</div>
        </div>
      </div>

      {/* Controls: Search & Filters */}
      <div style={{ marginBottom: '32px' }}>
        {/* Search Bar */}
        <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto 24px auto' }}>
          <span
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '1.2rem',
              color: '#94a3b8',
              pointerEvents: 'none',
            }}
          >
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search islands by name, activity (e.g. zipline, cave, snorkeling)..."
            style={{
              width: '100%',
              padding: '14px 44px 14px 46px',
              borderRadius: '12px',
              border: '2px solid #e2e8f0',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s',
              background: 'white',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#0f766e')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: '#e2e8f0',
                border: 'none',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                cursor: 'pointer',
                color: '#475569',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
              }}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center',
          }}
        >
          {islandCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '24px',
                  border: isSelected ? '2px solid #0f766e' : '2px solid #e2e8f0',
                  background: isSelected ? '#0f766e' : 'white',
                  color: isSelected ? 'white' : '#475569',
                  fontWeight: isSelected ? '600' : '500',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 2px 8px rgba(15, 118, 110, 0.25)' : 'none',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Count */}
      <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px', textAlign: 'right' }}>
        Showing <strong>{filteredIslands.length}</strong> of {hundredIslandsList.length} highlighted islands
      </div>

      {/* Islands Grid */}
      {filteredIslands.length === 0 ? (
        <div
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: '48px 24px',
            textAlign: 'center',
            color: '#64748b',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🏝️</div>
          <h3 style={{ fontSize: '1.3rem', color: '#1e293b', marginBottom: '8px' }}>
            No islands found matching "{searchQuery}"
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Try searching for a different keyword like "cliff", "zipline", "beach", or clear the filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="btn btn-primary"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredIslands.map((island) => (
            <div
              key={island.id}
              onClick={() => setActiveIsland(island)}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.06)',
                border: '1px solid #e2e8f0',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(15, 118, 110, 0.18)';
                e.currentTarget.style.borderColor = '#0f766e';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.06)';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              <div>
                {/* Header row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '14px',
                  }}
                >
                  <span style={{ fontSize: '2.4rem' }}>{island.emoji}</span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      background: 'rgba(15, 118, 110, 0.1)',
                      color: '#0f766e',
                    }}
                  >
                    {island.category}
                  </span>
                </div>

                {/* Title and Tagline */}
                <h3 style={{ fontSize: '1.3rem', color: '#0f766e', marginBottom: '8px' }}>
                  {island.name}
                </h3>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: '#64748b',
                    lineHeight: '1.4',
                    marginBottom: '16px',
                    fontStyle: 'italic',
                  }}
                >
                  "{island.tagline}"
                </p>

                {/* Description snippet */}
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: '#475569',
                    lineHeight: '1.6',
                    marginBottom: '16px',
                  }}
                >
                  {island.description}
                </p>

                {/* Activity Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {island.activities.slice(0, 3).map((act, i) => (
                    <span
                      key={i}
                      style={{
                        background: '#f1f5f9',
                        color: '#334155',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: '500',
                      }}
                    >
                      • {act}
                    </span>
                  ))}
                  {island.activities.length > 3 && (
                    <span
                      style={{
                        background: 'rgba(15, 118, 110, 0.08)',
                        color: '#0f766e',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: '600',
                      }}
                    >
                      +{island.activities.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  color: '#0f766e',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                }}
              >
                View Island Guide & Tips →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Island Detail Modal */}
      {activeIsland && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveIsland(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '20px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              position: 'relative',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, #0f766e 0%, #115e59 100%)',
                color: 'white',
                padding: '32px',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
                position: 'relative',
              }}
            >
              <button
                onClick={() => setActiveIsland(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: 'white',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s',
                }}
                title="Close"
              >
                ✕
              </button>
              <div style={{ fontSize: '3rem', marginBottom: '8px' }}>{activeIsland.emoji}</div>
              <span
                style={{
                  display: 'inline-block',
                  background: 'rgba(255,255,255,0.2)',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}
              >
                {activeIsland.category}
              </span>
              <h2 style={{ fontSize: '2rem', margin: '4px 0 8px 0' }}>{activeIsland.name}</h2>
              <p style={{ opacity: 0.9, fontSize: '1rem', fontStyle: 'italic' }}>
                "{activeIsland.tagline}"
              </p>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '32px' }}>
              {/* Overview */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '1.1rem', color: '#0f766e', marginBottom: '8px' }}>
                  About this Island
                </h4>
                <p style={{ color: '#334155', lineHeight: '1.7', fontSize: '0.98rem' }}>
                  {activeIsland.description}
                </p>
              </div>

              {/* Highlights */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '1.1rem', color: '#0f766e', marginBottom: '10px' }}>
                  ⭐ Top Highlights
                </h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {activeIsland.highlights.map((h, idx) => (
                    <li
                      key={idx}
                      style={{
                        padding: '6px 0',
                        color: '#334155',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '0.95rem',
                      }}
                    >
                      <span style={{ color: '#0f766e', fontWeight: 'bold' }}>✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Activities */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '1.1rem', color: '#0f766e', marginBottom: '10px' }}>
                  🎯 Activities & Experiences
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {activeIsland.activities.map((act, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: '#f1f5f9',
                        color: '#1e293b',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '0.88rem',
                        fontWeight: '500',
                        border: '1px solid #e2e8f0',
                      }}
                    >
                      {act}
                    </span>
                  ))}
                </div>
              </div>

              {/* Best For */}
              <div
                style={{
                  background: '#f8fafc',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '20px',
                }}
              >
                <strong style={{ color: '#0f766e' }}>Ideal For:</strong>{' '}
                <span style={{ color: '#334155' }}>{activeIsland.bestFor}</span>
              </div>

              {/* Pro Tip */}
              <div
                style={{
                  background: '#fef3c7',
                  borderLeft: '4px solid #f59e0b',
                  padding: '14px 18px',
                  borderRadius: '8px',
                  color: '#92400e',
                  fontSize: '0.92rem',
                  lineHeight: '1.5',
                  marginBottom: '28px',
                }}
              >
                <strong>💡 Visitor Tip:</strong> {activeIsland.tip}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setActiveIsland(null)}
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px' }}
              >
                Close Island Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

