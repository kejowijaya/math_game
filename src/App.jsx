import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from "./Quiz";
import GreaterNumber from "./Compare";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/greaterNumber" element={<GreaterNumber />} />
      </Routes>
    </Router>
  );
}

export default App;
