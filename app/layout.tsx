import type { Metadata } from 'next';
import './globals.css';

// Add Open Graph and Twitter metadata here
export const metadata: Metadata = {
  title: 'Play PUBG with Us!', // Page title
  description: 'Join our PUBG community and explore exciting battles. Click to learn more!', // Page description
  openGraph: {
    title: 'Play PUBG with Us!',
    description: 'Join our PUBG community and explore exciting battles. Click to learn more!',
    url: 'https://irasheds.me/pubg',
    siteName: 'PUBG Community',
    images: [
      {
        url: 'https://irasheds.me/images/pubg-preview.jpg', // Image for preview
        width: 1200,
        height: 630,
        alt: 'PUBG Community Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Play PUBG with Us!',
    description: 'Join our PUBG community and explore exciting battles.',
    images: ['https://irasheds.me/images/pubg-preview.jpg'], // Image for Twitter
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
