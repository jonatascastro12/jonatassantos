"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
    interface Window {
        dataLayer?: Record<string, unknown>[];
        siteLastPageView?: string;
    }
}

export function GoogleTagManager() {
    const pathname = usePathname();

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            const location = window.location.href;
            if (window.siteLastPageView === location) return;
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "site_page_view",
                page_location: location,
                page_title: document.title,
                page_referrer: window.siteLastPageView || document.referrer,
            });
            window.siteLastPageView = location;
        });
        return () => cancelAnimationFrame(frame);
    }, [pathname]);

    return (
        <Script id="google-tag-manager" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5HQWTBB8');`}
        </Script>
    );
}
