import React, { FC, ReactNode } from "react";
import Head from "next/head";

export interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export const Layout: FC<LayoutProps> = ({
  children,
  title = "Playlolly Stripe Playground",
}) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    
    <div className="container">{children}</div>
  </>
);
