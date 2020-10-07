import '../styles/globals.css';
import '../styles/custom.scss';
import '../styles/index.scss';
import '../styles/header.scss';
import '../styles/dishCard.scss';
import '../styles/dishTemplate.scss';
import Header from '../components/header';

function MyApp({ Component, pageProps }) {
  return (
    <div className="layout">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
