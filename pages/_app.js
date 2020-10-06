import '../styles/globals.css';
import '../styles/custom.scss';
import '../styles/index.scss';
import '../styles/header.scss';
import Header from '../components/header';

function MyApp({ Component, pageProps }) {
  return (
    <div className="layout">
      <Header />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
