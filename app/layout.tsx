"use client";

import React, { FC } from "react";
import "./globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import Fonts from "@/lib/fonts";
import { Toaster } from "react-hot-toast";

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
          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              className: "shadow-lg rounded-xl p-4",
              duration: 4000,
              style: {
                backgroundColor: "#1e1e2e",
                color: "#ffffff",
              },
              success: {
                style: { backgroundColor: "#22c55e", color: "#ffffff" },
              },
              error: {
                style: { backgroundColor: "#ef4444", color: "#ffffff" },
              },
              loading: {
                style: { backgroundColor: "#3b82f6", color: "#ffffff" },
              },
            }}
          />
          {children}
        </Provider>
      </body>
    </html>
    // </ErrorBoundler>
  );
};

export default Layout;
