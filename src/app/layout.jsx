
import localFont from "next/font/local";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer/Footer";
// import { Inter } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "1000 9000",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} ${geistSans.variable}  antialiased`}>
        <Header />
        <ToastContainer theme="colored" position="top-center" />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

