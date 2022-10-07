import React from "react";
import Signup from "./Pages/Sign-up"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from "./Pages/Sing-in";

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/register" element = {<Signup/>}/>
        <Route path="/login" element = {<SignIn/>}/>

      </Routes>
    </BrowserRouter>  );
}

export default App;