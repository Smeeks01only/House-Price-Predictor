import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FlowLayout from '../layouts/FlowLayout';
import { Lightbulb, Database, Eye, MapPin, Calculator, AlertCircle, RefreshCw } from 'lucide-react';
import Card from '../components/ui/Card';
import { useFormContext } from '../context/FormContext';
import { usePrediction } from '../hooks/usePrediction';

export default function Analyzing() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const { formData, setPredictionResult } = useFormContext();
  const { executePrediction, error } = usePrediction();
  const apiPromiseRef = useRef(null);

  const messages = [
    "Analyzing property characteristics...",
    "Comparing neighborhood sales...",
    "Evaluating market trends...",
    "Estimating market value...",
    "Calculating confidence score...",
    "Generating insights..."
  ];

  useEffect(() => {
    let timer;
    const runAnalysis = async () => {
      // 1. Start the API call (only once across StrictMode mounts)
      if (!apiPromiseRef.current) {
        apiPromiseRef.current = executePrediction(formData);
      }
      const apiPromise = apiPromiseRef.current;
      
      // 2. Start the progress bar visual timer
      const totalTime = 6000;
      const intervalTime = 50;
      const steps = totalTime / intervalTime;
      let currentStep = 0;

      const timerPromise = new Promise(resolve => {
        timer = setInterval(() => {
          currentStep++;
          // If there is an error, stop incrementing progress
          if (error) {
            clearInterval(timer);
            return;
          }
          const currentProgress = Math.min(100, Math.floor((currentStep / steps) * 100));
          setProgress(currentProgress);
          
          if (currentStep >= steps) {
            clearInterval(timer);
            resolve();
          }
        }, intervalTime);
      });

      try {
        // Wait for both the API to return AND the minimum 6 seconds visual to finish
        const [result] = await Promise.all([apiPromise, timerPromise]);
        
        // Save the result to context
        setPredictionResult(result);
        
        // Slight delay before redirect for smooth transition
        setTimeout(() => navigate('/results'), 300);
      } catch (err) {
        // Error state handled by the UI via `error` state from the hook
        clearInterval(timer);
      }
    };

    runAnalysis();

    return () => {
      if (timer) clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, navigate]);

  // Message rotation logic
  useEffect(() => {
    if (error) return; // Stop rotating messages if error
    const timer = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [messages.length, error]);

  const handleRetry = () => {
    apiPromiseRef.current = null;
    setProgress(0);
    // Force a re-render to trigger useEffect again
    navigate(0); 
  };

  return (
    <FlowLayout>
      <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[70vh] py-12">
        
        {/* Header & Progress */}
        <div className="text-center w-full max-w-2xl mb-16 z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-[#111111] tracking-tight mb-4"
          >
            {error ? "Analysis Failed" : "Our model is analyzing your property..."}
          </motion.h1>
          
          {error ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
              <div className="flex flex-col items-center justify-center gap-6 p-6 bg-red-50 text-red-700 rounded-2xl border border-red-200">
                <AlertCircle size={48} className="text-red-500" />
                <p className="font-semibold text-lg text-center max-w-md">{error}</p>
                <div className="flex gap-4">
                  <Link to="/predict/1" className="px-6 py-3 bg-white border-2 border-red-200 text-red-700 font-bold rounded-full hover:bg-red-50 transition-colors">
                    Edit Details
                  </Link>
                  <button onClick={handleRetry} className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-md transition-colors">
                    <RefreshCw size={18} />
                    Try Again
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-500 font-medium mb-10"
              >
                This may take a few seconds. We're crunching the numbers!
              </motion.p>

              <div className="w-full">
                <div className="flex justify-between items-center mb-2">
                  <AnimatePresence mode="wait">
                    <motion.span 
                      key={messageIndex}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-sm font-bold text-gray-600"
                    >
                      {messages[messageIndex]}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-sm font-extrabold text-[#111111]">{progress}%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-black rounded-full transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Center Stage: Animated Wireframe House & Podium */}
        {!error && (
          <div className="relative w-full max-w-3xl h-[400px] flex items-center justify-center mb-16">
            
            {/* Soft floor shadow instead of harsh podium */}
            <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-64 h-8 bg-black/5 blur-xl rounded-full pointer-events-none" />

            {/* Glowing House SVG */}
            <div className="absolute top-[20%] z-10 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  d="M40 90V160H160V90" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" 
                />
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                  d="M20 90L100 30L180 90" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" 
                />
                <motion.path 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  d="M80 160V110H120V160" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" 
                />
                <motion.rect 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  x="60" y="110" width="16" height="24" stroke="#fbbf24" strokeWidth="2" rx="2" 
                />
                <motion.rect 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  x="124" y="110" width="16" height="24" stroke="#fbbf24" strokeWidth="2" rx="2" 
                />
              </svg>
            </div>

            {/* Floating Callouts */}
            <FloatingCallout 
              icon={Eye} 
              label="Feature Evaluation" 
              position="top-0 left-[10%]" 
              linePath="M50 40 L150 100" 
              delay={0}
            />
            <FloatingCallout 
              icon={Calculator} 
              label="Market Analysis" 
              position="bottom-[20%] left-0" 
              linePath="M50 0 L150 -60" 
              delay={0.5}
            />
            <FloatingCallout 
              icon={MapPin} 
              label="Location Scoring" 
              position="top-[10%] right-[10%]" 
              linePath="M0 40 L-100 100" 
              delay={1}
              isRight
            />
            <FloatingCallout 
              icon={Database} 
              label="Price Prediction" 
              position="bottom-[30%] right-0" 
              linePath="M0 0 L-100 -60" 
              delay={1.5}
              isRight
            />

          </div>
        )}

        {/* Footer Callout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="w-full max-w-2xl mt-auto"
        >
          <Card className="flex items-start gap-6 bg-gray-50 border-gray-200">
            <div className="p-4 bg-white border border-gray-200 rounded-full text-amber-500 shadow-sm flex-shrink-0">
              <Lightbulb size={32} />
            </div>
            <div>
              <h4 className="font-bold text-[#111111] text-lg mb-2">Did you know?</h4>
              <p className="text-gray-600 font-medium leading-relaxed">
                The Ames Housing Dataset contains 2,930 residential sales in Iowa, with 80+ features used to train our model.
              </p>
            </div>
          </Card>
        </motion.div>

      </div>
    </FlowLayout>
  );
}

function FloatingCallout({ icon: Icon, label, position, delay, linePath, isRight = false }) {
  return (
    <motion.div 
      className={`absolute ${position} z-0 hidden md:block`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: [0, -10, 0] }}
      transition={{ 
        opacity: { delay, duration: 1 }, 
        y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay } 
      }}
    >
      <div className={`relative flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-soft border border-gray-100 ${isRight ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="text-[#111111]">
          <Icon size={18} strokeWidth={2.5} />
        </div>
        <span className="text-sm font-bold text-gray-700">{label}</span>
        
        {/* Dotted connecting line */}
        <svg className="absolute w-[200px] h-[150px] pointer-events-none -z-10" style={{ top: isRight ? '50%' : '50%', [isRight ? 'right' : 'left']: '100%' }}>
          <path d={linePath} stroke="#d1d5db" strokeWidth="2" strokeDasharray="4 4" fill="none" />
        </svg>
      </div>
    </motion.div>
  );
}
