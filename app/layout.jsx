import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SHREE NATH EXPORTS — CRM & ERP",
  description: "Shree Nath Exports CRM and ERP System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
