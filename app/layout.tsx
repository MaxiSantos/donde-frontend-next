import { dir } from 'i18next';
import type { Metadata, ResolvingMetadata } from 'next';
import { Roboto } from 'next/font/google';
import { Scroll } from "./common/components/elements/Scroll";
import DefaultLayout from "./common/components/layouts/defaultLayout";
import { languages } from './i18n/settings';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: 'Donde lo busco',
    ...(process.env.NEXT_PUBLIC_APP_STAGE !== 'PRODUCTION' && {
      robots: {
        index: false,
        follow: false,
      }
    })
  }
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
  params: {
    lng
  },
  pageTitle,
  top
}: {
  children: React.ReactNode,
    params: {
      lng: string
    },
  pageTitle: string,
  top: React.ReactNode
  }) {
  return (
    <html lang={lng} dir={dir(lng)} className={roboto.className}>
      <head />
      <body>
        <DefaultLayout>
          {children}          
        </DefaultLayout>
        <Scroll showBelow={500} />          
      </body>
    </html>
  )
}