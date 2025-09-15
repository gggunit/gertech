import './globals.css';
export const metadata = { 
  title: 'Gertech — Tech, Automation & Handiwork',
  robots: { index: false, follow: false },
  description: 'Private tech services, automation, and handiwork by German Gladkov'
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body>{children}</body>
    </html>
  );
}
