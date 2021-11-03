import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import Head from "next/head"
import { IdProvider } from '@radix-ui/react-id'


function MyApp({ Component, pageProps }) {
  return (
  <>
  <IdProvider>
  <Head>
    <link rel="icon" type="image/svg+xml" href="/Asset 3.svg" />
  </Head>
  <Component {...pageProps} />
  </IdProvider>
  </>
  )
}

export default MyApp
