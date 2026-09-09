import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SkipLink from '../components/accessibility/SkipLink';

export const metadata: Metadata = {
  title: 'Pangasinan Heritage Digital Showcase',
  description: 'Explore the rich cultural heritage and iconic landmarks of Pangasinan Province, Philippines.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SkipLink />
        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}