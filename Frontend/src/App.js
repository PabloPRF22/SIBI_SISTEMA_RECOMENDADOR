import React from "react";
import Signup from "./Pages/Sign-up"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from "./Pages/Sing-in";
import MainPage from "./Pages/MainPage";
import MasGustan from "./Pages/MasGustan";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<MainPage/>}/>
        <Route path="/masGustan" element = {<MasGustan/>}/>

        <Route path="/register" element = {<Signup/>}/>
        <Route path="/login" element = {<SignIn/>}/>

      </Routes>
    </BrowserRouter>  );
}

export default App;