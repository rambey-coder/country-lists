import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CountryDetails from "./pages/CountryDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country-details/:name" element={<CountryDetails />} />
    </Routes>
  );
}

export default App;
