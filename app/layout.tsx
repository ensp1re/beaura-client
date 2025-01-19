"use client";

import React, { FC } from "react";
import "./globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import Fonts from "@/lib/fonts";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }): React.ReactElement => {
  return (
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
      <body className={`bg-slate-50 ${Fonts.raleway.className} custom-scroll`}>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
    // </ErrorBoundler>
  );
};

export default Layout;
