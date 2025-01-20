import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/custom/navbar";
import Footer from "../components/custom/footer";
import { GoogleOAuthProvider } from "@react-oauth/google";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Wolfie's Social",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
        <GoogleOAuthProvider clientId="879500142223-iimqo0lppe032d9aaablb0fpbtmrn7sg.apps.googleusercontent.com">
            <html lang="en">
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased ` 
                    + 'relative min-h-screen flex flex-col p-1 sm:p-3'
                }
                >
                    <Navbar />
                    <div className="py-4">
                        {children}
                    </div>
                    <Footer />
            </body>
            </html>
        </GoogleOAuthProvider>
    );
}
