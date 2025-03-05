import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Wizkid Manager 2000",
  description:
    "An application that is focused on managing the wizkids of OWOW.",
};

export const dynamic = "force-dynamic";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="mt-[var(--header-height)]">

            {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
