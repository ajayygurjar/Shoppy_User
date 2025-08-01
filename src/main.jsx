
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Provider } from 'react-redux';
import store from './store/index.jsx';
import './main.css'



createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
    <App />
    </Provider>
)
