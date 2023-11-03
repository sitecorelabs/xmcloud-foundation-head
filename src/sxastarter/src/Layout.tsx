/**
 * This Layout is needed for Starter Kit.
 */
import React from 'react';
import Head from 'next/head';
import { Placeholder, LayoutServiceData, Field, HTMLLink } from '@sitecore-jss/sitecore-jss-nextjs';
import { getPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs/utils';
import Scripts from 'src/Scripts';
import { useRouter } from 'next/router';
import Script from 'next/script';
import Cookie from 'components/Espire/Header/Cookie';
import GoogleTranslate from 'components/GoogleTranslate';
// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = getPublicUrl();

interface LayoutProps {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
}

interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
  MetaDescription: Field;
  MetaKeywords?: Field;
}

const Layout = ({ layoutData, headLinks }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;
  const fields = route?.fields as RouteFields;
  const isPageEditing = layoutData.sitecore.context.pageEditing;
  const mainClassPageEditing = isPageEditing ? 'editing-mode' : 'prod-mode';
  const { asPath } = useRouter();
  const sitecoreSend = `!function(t,n,e,o,a){function d(t){var n=~~(Date.now()/3e5),o=document.createElement(e);o.async=!0,o.src=t+"?ts="+n;var a=document.getElementsByTagName(e)[0];a.parentNode.insertBefore(o,a)}t.MooTrackerObject=a,t[a]=t[a]||function(){return t[a].q?void t[a].q.push(arguments):void(t[a].q=[arguments])},window.attachEvent?window.attachEvent("onload",d.bind(this,o)):window.addEventListener("load",d.bind(this,o),!1)}(window,document,"script","https://cdn.stat-track.com/statics/moosend-tracking.min.js","mootrack");
  mootrack('init', '7b502c96-d8a8-4089-b8c5-bdc2266e24eb');
  mootrack('trackPageView');
  
  `;

  return (
    <>
      <Scripts />
      <Head>
        <title>{fields?.Title?.value?.toString() || 'Page'}</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={
            fields?.MetaDescription?.value?.toString() ||
            'Global IT Services Company Specializing in Digital &amp; Total Experience, Applications Management, Automation, Cloud, Analytics &amp; IT Infrastructure Management'
          }
        />
        <meta
          name="keywords"
          content={
            fields?.MetaKeywords?.value?.toString() ||
            'Digital &amp; Total Experience, Digital Customer Experience Management, Customer Experience Solutions Company, Applications and IT Management'
          }
        />
        <meta name="googlebot" content="noodp" />
        <meta name="robots" content="index,follow" />
        <meta name="author" content="Espire Infolabs" />
        <link rel="canonical" href={process.env.PUBLIC_URL + asPath} />
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
        {headLinks.map((headLink) => (
          <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
        ))}
        <link rel="icon" href={`${publicUrl}/spriteuse.svg`} />
      </Head>
      {/* root placeholder for the app, which we add components to using route data */}
      <div className={mainClassPageEditing}>
        <GoogleTranslate />
        <header>
          <div id="header">{route && <Placeholder name="headless-header" rendering={route} />}</div>
        </header>
        <main>
          <div id="content">{route && <Placeholder name="headless-main" rendering={route} />}</div>
        </main>
        <footer>
          <div id="footer">{route && <Placeholder name="headless-footer" rendering={route} />}</div>
        </footer>
      </div>
      {/* This is Civic UK */}
      <Script
        src="https://cc.cdn.civiccomputing.com/9/cookieControl-9.x.min.js"
        strategy={'beforeInteractive'}
      ></Script>
      <Cookie />
      {/* Uncomment this and change URL's for Cookiebot */}
      {/* <Script
         id="Cookiebot"
         src="https://consent.cookiebot.com/uc.js"
         data-cbid="c0371d7c-31e2-4caf-92a3-173569d47c4a"
         strategy={'beforeInteractive'}
       ></Script>
       <Script
         id="CookieDeclaration"
         src="https://consent.cookiebot.com/c0371d7c-31e2-4caf-92a3-173569d47c4a/cd.js"
         strategy={'beforeInteractive'}
       ></Script> */}

      <Script
        id="sitecore-send"
        strategy={'beforeInteractive'}
        dangerouslySetInnerHTML={{ __html: sitecoreSend }}
      ></Script>
    </>
  );
};

export default Layout;
