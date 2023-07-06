import "./globals.css";
import { Inter, Manrope, Exo_2, Gugi } from "next/font/google";
import { Header, Footer } from "./components";

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

export const metadata = {
  title: "FixLab - ремонт твоєї техніки",
  description: "FixLab - мережа студій ремонту твоєї техніки",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.className}''${manrope.className}''${exo_2.className}''${gugi.className}`}
    >
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
