import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import AddAdvertisementPage from './Pages/AddAdvertisementPage';
import MainPage from './Pages/MainPage';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/add" component={AddAdvertisementPage} />
        <Route path="/" component={MainPage} />
      </Switch>
    </Router>
  );
}
