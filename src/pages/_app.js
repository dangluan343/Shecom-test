import '@/styles/globals.css'

import {supabase} from '../utils/supabase'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} supabase={supabase}/>
}
