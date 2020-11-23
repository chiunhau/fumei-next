import '../styles/globals.css';
import '../styles/custom.scss';
import '../styles/index.scss';
import '../styles/header.scss';
import '../styles/dishCard.scss';
import '../styles/dishTemplate.scss';
import '../styles/templateEntry.scss';
import { Provider } from 'react-redux';
import Header from '../components/header';
import store from '../store'

function MyApp({ Component, pageProps}) {
  return (
    <Provider store={store}>
      <div className="layout">
        <Component {...pageProps} />
      </div>  
    </Provider>
    
  )
}


export default MyApp
