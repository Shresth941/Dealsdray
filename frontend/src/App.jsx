import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useContext } from 'react';

import Login from './Components/login/login';
import FormUI from './Components/subusercreeationform/form ';
import Center from './Components/Center/Center';
import Botchecker from './Components/Botchecker/Botchecker';
import BotApproval from './Components/Botapproval/Botapproval';
import Dashboard from './Components/Dashboard/Dashboard';
import EditFormUI from './Components/editform/editform';
import { Storecontext } from './Components/Context/storecontext';




function App() {
  const context = useContext(Storecontext);

  if (!context) {
    return <div>Loading...</div>;
  }


  

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/form" element={<FormUI />} />
        <Route path="/botchecker" element={<Botchecker />} />
        <Route path="/botapproval" element={<BotApproval />} />
        <Route path="/center" element={<Center />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editform/:id" element={<EditFormUI />} />
 
        
  
      </Routes>
    </Router>
  );
}

export default App;
