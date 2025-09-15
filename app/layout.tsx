import './globals.css';
export const metadata = { title: 'Gertech — Tech, Automation & Handiwork' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"><body>{children}</body></html>
  );
}
