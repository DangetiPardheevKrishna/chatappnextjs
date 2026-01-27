// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import AuthProvider from "@/providers/AuthProvider";
// import { ThemeProvider } from "next-themes";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Ai Chat",
//   description: "chat with your personalities",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <AuthProvider>
//         <body
//           className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//         >
//           <ThemeProvider
//             attribute="class"
//             defaultTheme="system"
//             enableSystem
//             disableTransitionOnChange
//           >
//             {children}
//           </ThemeProvider>
//         </body>
//       </AuthProvider>
//     </html>
//   );
// }
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";

import { ThemeProvider } from "@/components/theme-provider";

import ParticlesWrapper from "@/components/particleWrapper";
import NavigationSection from "@/components/NavigationSection";

// Inter - Most popular modern sans-serif
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Roboto Mono - Clean monospace for chat/code
const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Personalities Chat",
  description: "Chat with unique AI personalities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${robotoMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {/* Background particles (GLOBAL) */}
           
            <main>{children}</main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
