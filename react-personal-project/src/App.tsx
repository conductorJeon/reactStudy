import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Main from "./pages/main/Main";

function App() {
  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
