import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <MoralisProvider appId={process.env.NEXT_PUBLIC_APPID!} serverUrl={process.env.NEXT_PUBLIC_SURVERURL!}>
      <Component {...pageProps} />
    </MoralisProvider>
  )
}

export default MyApp
