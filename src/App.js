import './App.css';
import { BrowserRouter } from "react-router";
import AppRoute from './appRoute.js';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </div>
  );
}

export default App;
