import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyMap from './map/MyMap.js';
import PointStatistic from './statistic/PointStatistic.js'; 
import NotFoundPage from './error/NotFoundPage.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyMap/>} />
        <Route path="/point-statistic" element={<PointStatistic />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
