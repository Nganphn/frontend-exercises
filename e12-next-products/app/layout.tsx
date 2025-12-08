import "./globals.css";
import Link from 'next/link';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="site-header">
          <div className="site-header-inner">
            <div className="brand">
              <span className="brand-badge">The Fake Store</span>
              <h1 className="brand-title">A Random Market</h1>
              <p className="brand-tagline">
                Everyday goods, carefully picked.
              </p>
            </div>

            <nav className="main-nav">
              <Link href="/" className="nav-link">
                Home
              </Link>
              <Link href="/products" className="nav-link">
                Products
              </Link>
              <Link href="/about" className="nav-link">
                About
              </Link>
            </nav>
          </div>
        </div>

        <div className="page-wrapper">{children}</div>
      </body>
    </html>
  );
}
