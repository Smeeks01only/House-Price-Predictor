import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Calendar, Square, MapPin, Box, Wind, Home } from 'lucide-react';

import FlowLayout from '../layouts/FlowLayout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Dropdown from '../components/ui/Dropdown';
import Slider from '../components/ui/Slider';
import Badge from '../components/ui/Badge';
import { useFormContext } from '../context/FormContext';

export default function PredictFlow() {
  const { step } = useParams();
  const navigate = useNavigate();
  const currentStep = parseInt(step) || 1;
  const { formData, updateFormData } = useFormContext();

  const handleNext = () => {
    if (currentStep < 5) {
      navigate(`/predict/${currentStep + 1}`);
    } else {
      navigate('/analyzing');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      navigate(`/predict/${currentStep - 1}`);
    } else {
      navigate('/');
    }
  };

  // Step config for the left column
  const stepMeta = {
    1: {
      badge: "Step 1 of 5",
      title: "About Your Home",
      desc: "Provide the basic structural details of the property to establish a baseline.",
      icon: Home
    },
    2: {
      badge: "Step 2 of 5",
      title: "Interior Details",
      desc: "Tell us about the space inside the home, including rooms and living area.",
      icon: Box
    },
    3: {
      badge: "Step 3 of 5",
      title: "Exterior Features",
      desc: "Details about the garage, fireplaces, and air conditioning amenities.",
      icon: Wind
    },
    4: {
      badge: "Step 4 of 5",
      title: "Neighborhood",
      desc: "Where is the property located? Location is a key driver of value.",
      icon: MapPin
    },
    5: {
      badge: "Step 5 of 5",
      title: "Prediction",
      desc: "Verify the information you've entered before we run the prediction model.",
      icon: Calendar // using as a generic check icon
    }
  };

  const currentMeta = stepMeta[currentStep];
  const StepIcon = currentMeta?.icon || Home;

  return (
    <FlowLayout currentStep={currentStep}>
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start relative min-h-[60vh]">
        
        {/* Left Column (Contextual) */}
        <div className="lg:col-span-4 sticky top-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-center mb-6">
                <StepIcon size={32} className="text-[#111111]" />
              </div>
              <div className="mb-4">
                <Badge label={currentMeta.badge} variant="default" />
              </div>
              <h1 className="text-4xl font-extrabold text-[#111111] tracking-tight mb-4">
                {currentMeta.title}
              </h1>
              <p className="text-gray-500 font-medium text-lg leading-relaxed">
                {currentMeta.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column (Form Card) */}
        <div className="lg:col-span-8 w-full flex flex-col h-full">
          <Card className="flex-1 w-full relative min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {/* STEP 1 */}
                {currentStep === 1 && (
                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-bold text-[#111111] mb-2">Overall Quality</label>
                      <Slider 
                        min={1} max={10} 
                        value={formData.overallQuality} 
                        onChange={(val) => updateFormData('overallQuality', val)}
                        labelMin="1 - Very Poor" labelMax="10 - Excellent"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-[#111111] mb-2">Year Built</label>
                        <Input 
                          type="number" 
                          icon={Calendar} 
                          placeholder="e.g. 2005"
                          value={formData.yearBuilt} 
                          onChange={(val) => updateFormData('yearBuilt', val)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-[#111111] mb-2">Overall Condition</label>
                        <Dropdown 
                          placeholder="Select condition"
                          value={formData.overallCondition}
                          onChange={(val) => updateFormData('overallCondition', val)}
                          options={[
                            { value: '3', label: '3 - Fair' },
                            { value: '5', label: '5 - Average' },
                            { value: '7', label: '7 - Good' },
                            { value: '9', label: '9 - Excellent' }
                          ]}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-[#111111] mb-2">House Style</label>
                        <Dropdown 
                          placeholder="Select style"
                          value={formData.houseStyle}
                          onChange={(val) => updateFormData('houseStyle', val)}
                          options={[
                            { value: '1Story', label: '1 Story' },
                            { value: '2Story', label: '2 Story' },
                            { value: '1.5Fin', label: '1.5 Story Finished' },
                            { value: 'SplitFoyer', label: 'Split Foyer' }
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {currentStep === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-bold text-[#111111] mb-2">Living Area (sqft)</label>
                      <Input 
                        type="number" icon={Square} placeholder="e.g. 2000"
                        value={formData.livingArea} onChange={(val) => updateFormData('livingArea', val)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#111111] mb-2">Lot Area (sqft)</label>
                      <Input 
                        type="number" icon={Square} placeholder="e.g. 5000"
                        value={formData.lotArea} onChange={(val) => updateFormData('lotArea', val)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#111111] mb-2">Bedrooms</label>
                      <Input 
                        type="number" placeholder="e.g. 3"
                        value={formData.bedrooms} onChange={(val) => updateFormData('bedrooms', val)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#111111] mb-2">Bathrooms</label>
                      <Input 
                        type="number" placeholder="e.g. 2"
                        value={formData.bathrooms} onChange={(val) => updateFormData('bathrooms', val)}
                      />
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {currentStep === 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-bold text-[#111111] mb-2">Garage Type</label>
                      <Dropdown 
                        placeholder="Select type"
                        value={formData.garageType}
                        onChange={(val) => updateFormData('garageType', val)}
                        options={[
                          { value: 'Attchd', label: 'Attached' },
                          { value: 'Detchd', label: 'Detached' },
                          { value: 'BuiltIn', label: 'Built-In' },
                          { value: 'None', label: 'No Garage' }
                        ]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#111111] mb-2">Garage Area (sqft)</label>
                      <Input 
                        type="number" placeholder="e.g. 400"
                        value={formData.garageArea} onChange={(val) => updateFormData('garageArea', val)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#111111] mb-2">Fireplaces</label>
                      <Input 
                        type="number" placeholder="e.g. 1"
                        value={formData.fireplaces} onChange={(val) => updateFormData('fireplaces', val)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#111111] mb-2">Central Air</label>
                      <Dropdown 
                        placeholder="Yes / No"
                        value={formData.centralAir}
                        onChange={(val) => updateFormData('centralAir', val)}
                        options={[
                          { value: 'Y', label: 'Yes' },
                          { value: 'N', label: 'No' }
                        ]}
                      />
                    </div>
                  </div>
                )}

                {/* STEP 4 */}
                {currentStep === 4 && (
                  <div>
                    <label className="block text-sm font-bold text-[#111111] mb-2">Neighborhood</label>
                    <Dropdown 
                      placeholder="Select a neighborhood in Ames"
                      value={formData.neighborhood}
                      onChange={(val) => updateFormData('neighborhood', val)}
                      options={[
                        { value: 'NAmes', label: 'North Ames' },
                        { value: 'CollgCr', label: 'College Creek' },
                        { value: 'OldTown', label: 'Old Town' },
                        { value: 'Edwards', label: 'Edwards' },
                        { value: 'Somerst', label: 'Somerset' },
                        { value: 'NridgHt', label: 'Northridge Heights' }
                      ]}
                    />
                  </div>
                )}

                {/* STEP 5 */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                      <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-b border-gray-200">
                        <h4 className="font-bold text-[#111111]">About Your Home</h4>
                        <Link to="/predict/1" className="text-sm font-semibold text-gray-500 hover:text-black">Edit</Link>
                      </div>
                      <div className="px-6 py-4 grid grid-cols-2 gap-4 text-sm">
                        <div><span className="text-gray-500">Quality:</span> {formData.overallQuality}/10</div>
                        <div><span className="text-gray-500">Year Built:</span> {formData.yearBuilt || '-'}</div>
                        <div><span className="text-gray-500">Condition:</span> {formData.overallCondition || '-'}</div>
                        <div><span className="text-gray-500">Style:</span> {formData.houseStyle || '-'}</div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                      <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-b border-gray-200">
                        <h4 className="font-bold text-[#111111]">Interior Details</h4>
                        <Link to="/predict/2" className="text-sm font-semibold text-gray-500 hover:text-black">Edit</Link>
                      </div>
                      <div className="px-6 py-4 grid grid-cols-2 gap-4 text-sm">
                        <div><span className="text-gray-500">Living Area:</span> {formData.livingArea || '-'} sqft</div>
                        <div><span className="text-gray-500">Lot Area:</span> {formData.lotArea || '-'} sqft</div>
                        <div><span className="text-gray-500">Bedrooms:</span> {formData.bedrooms || '-'}</div>
                        <div><span className="text-gray-500">Bathrooms:</span> {formData.bathrooms || '-'}</div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                      <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-b border-gray-200">
                        <h4 className="font-bold text-[#111111]">Exterior & Neighborhood</h4>
                        <Link to="/predict/3" className="text-sm font-semibold text-gray-500 hover:text-black">Edit</Link>
                      </div>
                      <div className="px-6 py-4 grid grid-cols-2 gap-4 text-sm">
                        <div><span className="text-gray-500">Garage:</span> {formData.garageType || '-'}</div>
                        <div><span className="text-gray-500">Central Air:</span> {formData.centralAir || '-'}</div>
                        <div className="col-span-2"><span className="text-gray-500">Neighborhood:</span> {formData.neighborhood || '-'}</div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            
            {/* FOOTER */}
            <div className="mt-12 pt-6 border-t border-gray-200 flex items-center justify-between">
              <button 
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-3 font-semibold transition-colors rounded-full border-2 ${
                  currentStep === 1 
                    ? 'border-gray-100 text-gray-300 cursor-not-allowed opacity-0' 
                    : 'border-gray-300 text-gray-600 hover:border-black hover:text-black'
                }`}
              >
                <ArrowLeft size={18} />
                Back
              </button>
              <button 
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-[#111111] hover:bg-black text-white font-bold rounded-full shadow-premium transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {currentStep === 5 ? 'Predict' : 'Next'}
                <ArrowRight size={18} />
              </button>
            </div>
          </Card>
        </div>
      </div>
    </FlowLayout>
  );
}
