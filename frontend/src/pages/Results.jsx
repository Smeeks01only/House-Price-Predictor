import React from 'react';
import { motion } from 'framer-motion';
import { Info, MapPin, Home, Ruler, Calendar, TrendingUp, Sparkles, ArrowRight, Bed, Bath, Car, Star, ShieldCheck } from 'lucide-react';
import FlowLayout from '../layouts/FlowLayout';
import Card from '../components/ui/Card';
import CountUp from '../components/ui/CountUp';
import ConfidenceGauge from '../components/ui/ConfidenceGauge';
import PriceRangeBar from '../components/ui/PriceRangeBar';
import BarChartRow from '../components/ui/BarChartRow';

import { useFormContext } from '../context/FormContext';

export default function Results() {
  const { predictionResult, formData } = useFormContext();

  if (!predictionResult) {
    return (
      <FlowLayout variant="results">
        <div className="max-w-xl mx-auto w-full min-h-[60vh] flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-center mb-6">
            <Info size={40} className="text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-[#111111] mb-4">No Prediction Found</h2>
          <p className="text-gray-500 font-medium mb-8">
            Please complete the property details form to generate an AI price estimate.
          </p>
          <a 
            href="/predict/1" 
            className="px-8 py-4 bg-[#111111] hover:bg-black text-white rounded-full font-bold shadow-premium transition-all"
          >
            Start a Prediction
          </a>
        </div>
      </FlowLayout>
    );
  }

  // Strict mapping from API and local form state
  const data = {
    estimatedValue: predictionResult.predicted_price,
    confidenceScore: 87, // Currently mocked as backend doesn't return confidence score yet
    changeVsAverage: "+12.4%", // Mocked for design
    priceRange: { 
      low: predictionResult.predicted_price * 0.88, 
      high: predictionResult.predicted_price * 1.12 
    },
    location: formData?.neighborhood ? `${formData.neighborhood}, Ames, IA` : "Ames, IA",
    propertyType: formData?.houseStyle || "Single Family",
    livingArea: formData?.livingArea ? `${formData.livingArea} sqft` : "-",
    lotArea: formData?.lotArea ? `${formData.lotArea} sqft` : "-",
    bedrooms: formData?.bedrooms || "-",
    bathrooms: formData?.bathrooms || "-",
    garage: formData?.garageType || "Attached",
    yearBuilt: formData?.yearBuilt || "-",
    overallQuality: formData?.overallQuality ? `${formData.overallQuality}/10` : "-",
    overallCondition: formData?.overallCondition || "-",
    factors: [
      { name: "Overall Quality", percentage: 28, desc: "The material and finish of the house is the largest driver of value, heavily influencing buyer perception and overall market appeal." },
      { name: "Gr Liv Area", percentage: 22, desc: "Above-grade living area directly correlates to price, as spaciousness and usable square footage are premium commodities in this market." },
      { name: "Neighborhood", percentage: 16, desc: "Location within Ames accounts for a significant portion of the valuation, driven by school districts, proximity to amenities, and historical comps." },
      { name: "Year Built", percentage: 8, desc: "Newer homes command a premium due to modern building standards, while older homes may see a decrease in value without recent renovations." },
      { name: "Kitchen Quality", percentage: 5, desc: "A modern, high-quality kitchen is one of the most sought-after features for prospective buyers, offering high return on investment." },
      { name: "Lot Area", percentage: 3, desc: "Larger properties offer more privacy, outdoor living space, and expansion potential, adding incremental value to the total estimate." }
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <FlowLayout variant="results">
      <div id="results-dashboard" className="max-w-6xl mx-auto w-full pb-16">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          
          {/* CARD 1: Estimated Market Value */}
          <motion.div variants={cardVariants} className="md:col-span-2">
            <Card className="h-full flex flex-col justify-center p-8 lg:p-10 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-500 mb-4">
                <Info size={18} />
                <span className="font-bold text-sm uppercase tracking-wider">Estimated Market Value</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-[#111111] mb-2">
                <CountUp value={data.estimatedValue} prefix="$" />
              </h2>
              <p className="text-xl text-gray-400 font-medium mb-8">
                Two Hundred Eighty Five Thousand Dollars
              </p>
              <div className="mt-auto">
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full font-bold text-sm">
                  <TrendingUp size={16} />
                  {data.changeVsAverage} Above average for similar homes in Ames, IA
                </div>
              </div>
            </Card>
          </motion.div>

          {/* CARD 2: Confidence Score */}
          <motion.div variants={cardVariants} className="md:col-span-1">
            <Card className="h-full flex flex-col items-center justify-center p-8 text-center border border-gray-200">
              <ConfidenceGauge percent={data.confidenceScore} size={200} />
              <h3 className="text-2xl font-bold text-[#111111] mt-6 mb-2">High Confidence</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Our model is highly confident in this prediction.
              </p>
            </Card>
          </motion.div>

          {/* CARD 3: Key Details */}
          <motion.div variants={cardVariants} className="md:col-span-1">
            <Card className="h-full p-8 border border-gray-200 flex flex-col">
              <h3 className="text-xl font-bold text-[#111111] mb-6">Key Details</h3>
              <div className="space-y-4 flex-1">
                <DetailRow icon={MapPin} label="Location" value={data.location} />
                <DetailRow icon={Home} label="Property Type" value={data.propertyType} />
                <DetailRow icon={Ruler} label="Living Area" value={data.livingArea} />
                <DetailRow icon={Ruler} label="Lot Area" value={data.lotArea} />
                <DetailRow icon={Bed} label="Bedrooms" value={data.bedrooms} />
                <DetailRow icon={Bath} label="Bathrooms" value={data.bathrooms} />
                <DetailRow icon={Car} label="Garage" value={data.garage} />
                <DetailRow icon={Calendar} label="Year Built" value={data.yearBuilt} />
                <DetailRow icon={Star} label="Overall Quality" value={data.overallQuality} />
                <DetailRow icon={ShieldCheck} label="Overall Condition" value={data.overallCondition} />
              </div>
            </Card>
          </motion.div>

          {/* CARD 4: Top Factors Affecting Price */}
          <motion.div variants={cardVariants} className="md:col-span-2">
            <Card className="h-full p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-[#111111] mb-6">Top Factors Affecting Price</h3>
              <div className="space-y-4">
                {data.factors.map((factor, index) => (
                  <BarChartRow 
                    key={index}
                    label={factor.name}
                    percent={factor.percentage}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </Card>
          </motion.div>

          {/* CARD 5: Price Comparison */}
          <motion.div variants={cardVariants} className="md:col-span-2">
            <Card className="h-full p-8 border border-gray-200 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-[#111111] mb-8">Price Comparison</h3>
              <PriceRangeBar 
                low={data.priceRange.low} 
                predicted={data.estimatedValue} 
                high={data.priceRange.high} 
              />
            </Card>
          </motion.div>

          {/* CARD 6: AI Insights Summary */}
          <motion.div variants={cardVariants} className="md:col-span-1">
            <Card className="h-full p-8 border border-gray-200 bg-gray-50 flex flex-col">
              <div className="flex items-center gap-2 mb-4 text-[#111111]">
                <Sparkles size={20} className="text-amber-500" />
                <h3 className="text-xl font-bold">What does this mean?</h3>
              </div>
              <p className="text-gray-600 font-medium leading-relaxed mb-8 flex-1">
                This home is valued higher than 62% of similar properties, driven mainly by its excellent overall quality and spacious living area.
              </p>
              <button 
                onClick={() => document.getElementById('detailed-insights').scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-xl font-bold text-[#111111] hover:border-black transition-colors shadow-sm group"
              >
                View Detailed Insights
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </Card>
          </motion.div>

        </motion.div>

        {/* Detailed Insights Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          id="detailed-insights" 
          className="mt-16 pt-16 border-t border-gray-200"
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-[#111111] text-white rounded-xl shadow-premium">
                <Sparkles size={24} />
              </div>
              <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight">AI Insights Breakdown</h2>
            </div>
            <div className="space-y-6">
              {data.factors.map((factor, idx) => (
                <div key={idx} className="p-6 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0 w-24 flex flex-col">
                    <span className="text-3xl font-black text-[#111111]">{factor.percentage}%</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Impact</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#111111] mb-2">{factor.name}</h4>
                    <p className="text-gray-600 font-medium leading-relaxed">{factor.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </FlowLayout>
  );
}

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3 text-gray-500">
        <Icon size={16} />
        <span className="font-semibold text-sm">{label}</span>
      </div>
      <span className="font-bold text-[#111111]">{value}</span>
    </div>
  );
}
