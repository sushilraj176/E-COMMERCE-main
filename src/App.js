import * as React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Homepage from "./component/Utilis/Pages/Homepage";
import CartPages from "./component/Utilis/Pages/cartpages";

export default function MyApp() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="cart" element={<CartPages />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
