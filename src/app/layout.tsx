import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Lora } from "next/font/google";
import Footer from "./Footer";
import "./globals.css";
import Navbar from "./Navbar";
import ReactQueryProvider from "./ReactQueryProvider";

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Flow Shop",
    absolute: "Flow Shop",
  },
  description: "A full-stack e-commerce application built with Next.js 15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lora.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <Navbar />
            <div className="min-h-[50vh]">{children}</div>
            <Footer />
          </ReactQueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
