import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/reset.css';
import './styles/index.css';
import { HashRouter } from 'react-router-dom';
import './assets/fonts/poppins/Poppins-Regular.ttf';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<HashRouter><App /></HashRouter>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
if (process.env.REACT_APP_ENV === "DEVELOPMENT") {
  reportWebVitals(console.log);
}
