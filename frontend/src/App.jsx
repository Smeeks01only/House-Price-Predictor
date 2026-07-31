import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PredictFlow from './pages/PredictFlow';
import Analyzing from './pages/Analyzing';
import Results from './pages/Results';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/predict/:step" element={<PredictFlow />} />
      <Route path="/analyzing" element={<Analyzing />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
}

export default App;
