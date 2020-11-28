import '../styles/globals.css';
import '../styles/custom.scss';
import '../styles/index.scss';
import '../styles/header.scss';
import '../styles/dishCard.scss';
import '../styles/dishTemplate.scss';
import '../styles/templateEntry.scss';
import '../styles/manage.scss';
import { Provider } from 'react-redux';
import Header from '../components/header';
import store from '../store'
import Head from 'next/head'

function MyApp({ Component, pageProps}) {
  return (
    <Provider store={store}>
      <div className="layout">
        <Head>
          <title>富美配菜系統</title>
          <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png"/>
          <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png"/>
          <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png"/>
          <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png"/>
          <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png"/>
          <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png"/>
          <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png"/>
          <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png"/>
          <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png"/>
          <link rel="icon" type="image/png" sizes="192x192"  href="/favicons/android-icon-192x192.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png"/>
          <link rel="manifest" href="/manifest.json"/>
        </Head>
        <Component {...pageProps} />
      </div>  
    </Provider>
    
  )
}


export default MyApp
