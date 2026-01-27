import { Route, Routes } from "react-router-dom";
import FruitCount from "./pages/fruitCount";

export default function RoutePage() {
  return (
    <>
      <Routes>
        <Route path="/" element={<FruitCount></FruitCount>}></Route>
      </Routes>
    </>
  );
}
