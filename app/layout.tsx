import './globals.css'
import type { Metadata } from 'next'
import { Inter, Manrope, Exo_2, Gugi } from "next/font/google";
import { Header, Footer } from "./(layouts)";

const inter = Inter({
  weight: ["300", "400", "700", "500", "600"],
  subsets: ["cyrillic"],
});
const manrope = Manrope({
  weight: ["300", "400", "700", "500", "600"],
  subsets: ["cyrillic"],
});
const exo_2 = Exo_2({
  weight: ["300", "400", "700", "500", "600"],
  subsets: ["cyrillic"],
});
const gugi = Gugi({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FixLab - ремонт твоєї техніки",
  description: "FixLab - мережа студій ремонту твоєї техніки",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   <html
      lang="uk"
      className={`${inter.className}''${manrope.className}''${exo_2.className}''${gugi.className}`}
    >
      <body className={`${inter.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
