import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LegacyAppHost from './pages/LegacyAppHost';
import Song from './pages/Song';
import Hanbun from './pages/Hanbun';
import TypewriterIntro from './pages/Typewriter';
import ConceptGame from './pages/ConceptGame';
import Hunmin from './pages/Hunmin';
import Hak from './pages/Hak';
import Expand from './pages/Expand';
import Yu from './pages/Yu';
import SocietyGallery from './pages/SocietyGallery';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      {/* 
        추후 AnimatePresence를 통해 
        페이지 전환 시 트랜지션 효과를 아주 부드럽게 입힐 수 있습니다.
      */}
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<LegacyAppHost />} />
          <Route path="/song" element={<Song />} />
          <Route path="/hunmin" element={<Hunmin />} />
          <Route path="/hak" element={<Hak />} />
          <Route path="/expand" element={<Expand />} />
          <Route path="/yu" element={<Yu />} />
          <Route path="/society" element={<SocietyGallery />} />
          <Route path="/typewriter" element={<Navigate to="/" replace />} />
          <Route path="/game" element={<ConceptGame />} />
          <Route path="/hanbun" element={<Hanbun />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
