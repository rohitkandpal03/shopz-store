// import { Metadata } from "next";

import Footer from "@/components/footer";
import Header from "@/components/shared/header";

// export const metadata: Metadata = { title: "Home" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 wrapper">{children}</main>
      <Footer />
    </div>
  );
}
