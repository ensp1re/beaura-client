"use client";

import React, { FC } from "react";
import { Raleway } from "next/font/google";
import "./globals.css";
// import ErrorBoundler from "@/components/shared/error/ErrorBoundler";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
// import { Provider } from "react-redux";
// import { store } from "@/lib/store";

interface LayoutProps {
  children: React.ReactNode;
}

const raleway = Raleway({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const Layout: FC<LayoutProps> = ({ children }): React.ReactElement => {
  return (
    // <ErrorBoundler
    //   fallback={<div>Something went wrong. Please try again later.</div>}
    // >
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>BeAura</title>

        <meta
          name="description"
          content="BeauraAI - An AI-Powered tool to help find the best haircut for you."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <body className={`bg-slate-50 ${raleway.className} custom-scroll`}>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
    // </ErrorBoundler>
  );
};

export default Layout;
