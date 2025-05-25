import type { Metadata } from "next";
import "@/styles/globals.scss";
import { Providers } from '@/app/providers';

export const metadata: Metadata = {
  title: "Login - Novus Calculator",
  description: "Login to Novus Calculator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
