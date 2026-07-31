import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import { 
  ArrowRight, Sparkles, Database, Cpu, 
  Target, Eye, MousePointer2, Shield, 
  CheckCircle2, TrendingUp, BarChart3, Home as HomeIcon
} from 'lucide-react';
import Badge from '../components/ui/Badge';
import FeatureTile from '../components/ui/FeatureTile';
import AvatarStack from '../components/ui/AvatarStack';

export default function Home() {
  const users = [
    { initials: 'JD', color: 'bg-emerald-100 text-emerald-700' },
    { initials: 'AS', color: 'bg-blue-100 text-blue-700' },
    { initials: 'MK', color: 'bg-purple-100 text-purple-700' },
  ];

  return (
    <MainLayout>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column (Text) */}
          <div className="flex flex-col items-start z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Badge icon={Sparkles} label="AI Powered Price Prediction" variant="default" />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold text-[#111111] tracking-tighter leading-[1.1] mb-6"
            >
              Discover Your Home's <br className="hidden md:block" />
              <span className="text-gray-400">Estimated Value</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-500 mb-8 max-w-xl leading-relaxed font-medium"
            >
              Our advanced machine learning model analyzes 80+ features from the Ames Housing Dataset to predict your home's price with remarkable accuracy and actionable insights.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              <Badge icon={Database} label="Based on Ames Housing Dataset" variant="default" />
              <Badge icon={Cpu} label="Machine Learning Powered" variant="default" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8"
            >
              <Link 
                to="/predict/1" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#111111] hover:bg-black text-white rounded-full font-bold text-lg shadow-premium hover:-translate-y-1 transition-all duration-300"
              >
                Start Prediction
                <ArrowRight size={20} />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <AvatarStack users={users} caption="Trusted by homeowners, real estate enthusiasts and data lovers" />
            </motion.div>
          </div>

          {/* Right Column (Illustration) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end z-10"
          >
            {/* Soft background blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-50 rounded-full blur-3xl -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-emerald-50/50 rounded-full blur-2xl -z-10" />
            
            {/* Clean SVG Line-art House Illustration */}
            <div className="bg-white p-8 rounded-[3rem] shadow-premium border border-gray-100 relative">
              <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Accent elements */}
                <circle cx="320" cy="80" r="40" fill="#fef3c7" /> {/* amber-100 */}
                <rect x="40" y="280" width="320" height="40" rx="8" fill="#ecfdf5" /> {/* emerald-50 */}
                
                {/* House Base */}
                <path d="M80 180v140h240V180" stroke="#111111" strokeWidth="8" strokeLinejoin="round" />
                {/* Roof */}
                <path d="M40 180L200 60l160 120" stroke="#111111" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                {/* Chimney */}
                <path d="M280 120v-40h40v70" stroke="#111111" strokeWidth="8" strokeLinejoin="round" />
                {/* Door */}
                <path d="M160 320V220h80v100" stroke="#111111" strokeWidth="8" strokeLinejoin="round" />
                {/* Door Knob */}
                <circle cx="220" cy="270" r="4" fill="#111111" />
                {/* Windows */}
                <rect x="100" y="200" width="40" height="60" rx="4" stroke="#111111" strokeWidth="8" />
                <rect x="260" y="200" width="40" height="60" rx="4" stroke="#111111" strokeWidth="8" />
                
                {/* Decorative Data Elements floating around */}
                <path d="M60 100h40M60 120h20" stroke="#9ca3af" strokeWidth="6" strokeLinecap="round" />
                <path d="M300 280v-40m20 40v-60m20 60v-30" stroke="#059669" strokeWidth="8" strokeLinecap="round" />
                
                {/* Floating Value Tag */}
                <g transform="translate(180, -20)">
                  <rect x="80" y="100" width="140" height="48" rx="24" fill="#111111" />
                  <text x="150" y="130" fill="white" fontSize="20" fontWeight="bold" textAnchor="middle">$285,000</text>
                </g>
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section className="border-y border-gray-200 bg-[#F7F7F8] py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <FeatureTile 
              icon={Target} 
              title="Accurate" 
              subtitle="Trained on real market data" 
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <FeatureTile 
              icon={Eye} 
              title="Transparent" 
              subtitle="See which factors affect the price" 
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <FeatureTile 
              icon={MousePointer2} 
              title="Easy to Use" 
              subtitle="Guided step-by-step experience" 
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <FeatureTile 
              icon={Shield} 
              title="Private" 
              subtitle="Your data never leaves your device" 
            />
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#111111] tracking-tight mb-6">How It Works</h2>
            <p className="text-lg text-gray-500 font-medium">Get a highly accurate prediction in three simple steps.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gray-100 -z-10" />
            
            {[
              { step: 1, title: 'Input Details', desc: 'Provide basic information about your property.' },
              { step: 2, title: 'AI Analysis', desc: 'Our model cross-references 80+ features instantly.' },
              { step: 3, title: 'View Results', desc: 'Get your estimated value and feature breakdown.' }
            ].map((item, i) => (
              <motion.div 
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full bg-white border-8 border-gray-50 shadow-soft flex items-center justify-center text-3xl font-extrabold text-[#111111] mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-[#111111] mb-3">{item.title}</h3>
                <p className="text-gray-500 font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI ADVANTAGES */}
      <section id="features" className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#111111] tracking-tight mb-6">Built on the robust Ames Housing Dataset</h2>
            <p className="text-lg text-gray-500 font-medium mb-8 leading-relaxed">
              We leverage one of the most comprehensive real estate datasets available. With over 80 specific variables recorded for thousands of homes, our model understands the nuanced relationships between features and market value.
            </p>
            <ul className="space-y-4">
              {[
                'Identifies non-linear price relationships',
                'Weighs categorical features like neighborhood',
                'Adjusts for historical building age trends',
                'Factors in specific quality metrics'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[#111111] font-semibold">
                  <CheckCircle2 size={20} className="text-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4 pt-12">
              <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
                <BarChart3 size={32} className="text-[#111111] mb-4" />
                <h4 className="font-bold text-xl mb-2">2,930+</h4>
                <p className="text-sm text-gray-500 font-medium">Verified Sales</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
                <TrendingUp size={32} className="text-emerald-600 mb-4" />
                <h4 className="font-bold text-xl mb-2">87%</h4>
                <p className="text-sm text-gray-500 font-medium">Confidence Avg</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-[#111111] text-white p-6 rounded-2xl shadow-premium">
                <Database size={32} className="mb-4 text-gray-300" />
                <h4 className="font-bold text-xl mb-2">80+</h4>
                <p className="text-sm text-gray-400 font-medium">Features Analyzed</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
                <HomeIcon size={32} className="text-[#111111] mb-4" />
                <h4 className="font-bold text-xl mb-2">1,000s</h4>
                <p className="text-sm text-gray-500 font-medium">Properties Scored</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-6 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-[#111111] tracking-tight mb-8">Ready to see what your home is worth?</h2>
          <Link 
            to="/predict/1" 
            className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-[#111111] hover:bg-black text-white rounded-full font-bold text-xl shadow-premium hover:-translate-y-1 transition-all duration-300"
          >
            Start Prediction
            <ArrowRight size={24} />
          </Link>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#111111] text-white rounded-lg">
              <HomeIcon size={16} strokeWidth={2.5} />
            </div>
            <span className="font-bold tracking-tight text-[#111111]">HomeValue AI</span>
          </div>
          <div className="text-sm font-medium text-gray-500">
            &copy; {new Date().getFullYear()} HomeValue AI. All rights reserved.
          </div>
        </div>
      </footer>
    </MainLayout>
  );
}
