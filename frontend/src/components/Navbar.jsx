import { Link } from 'react-router-dom';
import { Home, RefreshCw, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import Stepper from './ui/Stepper';
import { downloadPdf } from '../utils/downloadPdf';

export default function Navbar({ variant = 'main', currentStep }) {
  const STEPS = ['About Your Home', 'Interior Details', 'Exterior Features', 'Neighborhood', 'Prediction'];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full glass px-6 py-4 flex items-center justify-between"
    >
      <div className="flex-shrink-0 w-auto md:w-[250px]">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-[#111111] text-white rounded-xl group-hover:bg-gray-800 transition-colors shadow-sm">
            <Home size={20} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-lg tracking-tight text-[#111111] hidden sm:block">HomeValue AI</span>
        </Link>
      </div>

      {variant === 'main' && (
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-500">
          <Link to="#how-it-works" className="hover:text-[#111111] transition-colors">How it works</Link>
          <Link to="#about-dataset" className="hover:text-[#111111] transition-colors">About Dataset</Link>
          <Link to="#features" className="hover:text-[#111111] transition-colors">Features</Link>
          <Link to="#faq" className="hover:text-[#111111] transition-colors">FAQ</Link>
        </div>
      )}

      {variant === 'flow' && (
        <div className="hidden lg:block flex-1 max-w-3xl">
          {currentStep && <Stepper steps={STEPS} currentStep={currentStep} />}
        </div>
      )}

      <div className="flex-shrink-0 flex items-center justify-end gap-3 w-auto md:w-[250px]">
        {variant === 'main' && (
          <Link 
            to="/predict/1" 
            className="px-5 py-2.5 bg-[#111111] hover:bg-black text-white text-sm font-semibold rounded-full shadow-soft transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Start Prediction
          </Link>
        )}
        
        {variant === 'flow' && (
          <Link 
            to="/" 
            className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-[#111111] transition-colors"
          >
            Save & Exit
          </Link>
        )}

        {variant === 'results' && (
          <>
            <Link 
              to="/predict/1"
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#111111] bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-full transition-colors"
            >
              <RefreshCw size={16} />
              <span className="hidden sm:block">Recalculate</span>
            </Link>
            <button 
              onClick={downloadPdf}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#111111] hover:bg-black rounded-full shadow-soft transition-colors"
            >
              <Download size={16} />
              <span className="hidden sm:block">Download Report</span>
            </button>
          </>
        )}
      </div>
    </motion.nav>
  );
}
