import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import HeaderServer from "@/components/globals/header/Server";
import { GoogleOAuthProvider } from "@react-oauth/google";
import FooterServer from "@/components/globals/footer/Server";
import GlobalLoader from "../utils/GlobalLoader";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";

export const metadata = {
  title: "College Booking App",
  description: "A place to book college",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Preconnect to Google and Stripe domains */}
        <link rel="preconnect" href="https://accounts.google.com" />
        <link rel="preconnect" href="https://js.stripe.com" />
      </Head>
      <body className={""}>
        <Providers>
          <AuthProvider>
            <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
              <GlobalLoader>
                <div className="font-visbyRegular flex flex-col min-h-screen">
                  <HeaderServer />
                  <main className="flex-grow">{children}</main>
                  <FooterServer />
                </div>
              </GlobalLoader>
            </GoogleOAuthProvider>
          </AuthProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
