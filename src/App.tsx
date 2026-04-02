import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, Mic, ArrowRight, TrendingUp, CheckCircle2, 
  Factory, Package, Truck, Globe, Users, DollarSign,
  ChevronRight, Sparkles, Sprout, BarChart3, MapPin,
  Scale, ShieldCheck, ShoppingCart, Settings, Play,
  RefreshCcw, ArrowUpRight, Clock, Box, Store,
  Zap, Droplets
} from 'lucide-react';

type Screen =
  | 'home'
  | 'input'
  | 'understanding'
  | 'suggestion'
  | 'comparison'
  | 'decision'
  | 'raw_flow'
  | 'process_flow'
  | 'branding'
  | 'smart_selling'
  | 'logistics'
  | 'export'
  | 'group_fpo'
  | 'dashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [crop, setCrop] = useState('Tomato');
  const [quantity, setQuantity] = useState('500');
  const [location, setLocation] = useState('Maharashtra');
  const [decision, setDecision] = useState<'raw' | 'process' | null>(null);

  // Helper to transition screens
  const goTo = (screen: Screen) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-green-200">
      {/* Top Navigation Bar - Simple */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => goTo('home')}>
          <div className="bg-green-600 p-1.5 rounded-lg">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="font-heading font-bold text-xl text-green-900 tracking-tight">Agri2Valuse</span>
        </div>
        {currentScreen !== 'home' && (
          <button onClick={() => goTo('home')} className="text-sm text-gray-500 hover:text-green-600 font-medium transition-colors">
            Restart
          </button>
        )}
      </header>

      <main className="max-w-md mx-auto w-full min-h-[calc(100vh-60px)] relative overflow-hidden">
        <AnimatePresence mode="wait">
          {currentScreen === 'home' && <HomeScreen key="home" onNext={() => goTo('input')} />}
          {currentScreen === 'input' && <InputScreen key="input" crop={crop} setCrop={setCrop} quantity={quantity} setQuantity={setQuantity} location={location} setLocation={setLocation} onNext={() => goTo('understanding')} />}
          {currentScreen === 'understanding' && <UnderstandingScreen key="understanding" crop={crop} onNext={() => goTo('suggestion')} />}
          {currentScreen === 'suggestion' && <SuggestionScreen key="suggestion" crop={crop} onNext={() => goTo('comparison')} />}
          {currentScreen === 'comparison' && <ComparisonScreen key="comparison" crop={crop} onNext={() => goTo('decision')} />}
          {currentScreen === 'decision' && <DecisionScreen key="decision" onNextRaw={() => { setDecision('raw'); goTo('raw_flow'); }} onNextProcess={() => { setDecision('process'); goTo('process_flow'); }} />}
          
          {/* Raw Flow Branch */}
          {currentScreen === 'raw_flow' && <RawFlowScreen key="raw_flow" onNext={() => goTo('smart_selling')} />}
          
          {/* Process Flow Branch */}
          {currentScreen === 'process_flow' && <ProcessFlowScreen key="process_flow" onNext={() => goTo('branding')} />}
          {currentScreen === 'branding' && <BrandingScreen key="branding" onNext={() => goTo('smart_selling')} />}
          
          {/* Rejoin Flow */}
          {currentScreen === 'smart_selling' && <SmartSellingScreen key="smart_selling" onNext={() => goTo('logistics')} />}
          {currentScreen === 'logistics' && <LogisticsScreen key="logistics" onNext={() => goTo('export')} />}
          {currentScreen === 'export' && <ExportScreen key="export" onNext={() => goTo('group_fpo')} />}
          {currentScreen === 'group_fpo' && <GroupFPOScreen key="group_fpo" onNext={() => goTo('dashboard')} />}
          {currentScreen === 'dashboard' && <DashboardScreen key="dashboard" decision={decision} onRestart={() => goTo('home')} />}
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- Screen Components ---

function HomeScreen({ onNext }: { onNext: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] p-6 text-center relative"
    >
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-40 right-10 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <motion.div className="bg-green-100 p-4 rounded-full mb-6 relative z-10" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
        <Sprout className="w-12 h-12 text-green-600" />
      </motion.div>
      
      <h1 className="heading-1 mb-4 relative z-10">
        Turn Your Crops Into <span className="text-green-600">High-Value</span> Products
      </h1>
      
      <p className="text-gray-600 mb-12 text-lg max-w-sm relative z-10">
        AI-powered insights to help you process, brand, and sell for maximum profit.
      </p>
      
      <button onClick={onNext} className="btn-primary w-full max-w-xs animate-float relative z-10">
        Start Analysis <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

function InputScreen({ crop, setCrop, quantity, setQuantity, location, setLocation, onNext }: any) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6">
      <div className="mb-8">
        <h2 className="heading-2 mb-2">Tell us about your crop</h2>
        <p className="text-gray-500">We'll analyze the best options for you.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="label">What are you growing?</label>
          <div className="relative">
            <input type="text" value={crop} onChange={(e) => setCrop(e.target.value)} className="input-field pl-10" placeholder="e.g., Tomato, Wheat" />
            <Leaf className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
          </div>
        </div>

        <div>
          <label className="label">Quantity (in kg)</label>
          <div className="relative">
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="input-field pl-10" placeholder="e.g., 500" />
            <Scale className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
          </div>
        </div>

        <div>
          <label className="label">Location</label>
          <div className="relative">
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="input-field pl-10" placeholder="e.g., Maharashtra" />
            <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
          </div>
        </div>
      </div>

      <div className="mt-10 space-y-4">
        <button className="btn-secondary w-full">
          <Mic className="w-5 h-5" /> Speak Details
        </button>
        <button onClick={onNext} className="btn-primary w-full">
          <Sparkles className="w-5 h-5" /> Analyze with AI
        </button>
      </div>
    </motion.div>
  );
}

function UnderstandingScreen({ crop, onNext }: { crop: string, onNext: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-green-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-green-600 animate-pulse" />
        </div>
      </div>
      
      <h2 className="heading-2 text-center mb-4">AI is analyzing...</h2>
      
      <div className="w-full max-w-sm space-y-4">
        <div className="card bg-gray-50 border-none overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Crop Identified</div>
              <div className="font-semibold">{crop}</div>
            </div>
          </div>
        </div>
        
        <div className="card bg-gray-50 border-none overflow-hidden relative opacity-70">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" style={{ animationDelay: '0.2s' }}></div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Market Trends</div>
              <div className="font-semibold">Fetching live data...</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SuggestionScreen({ crop, onNext }: { crop: string, onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6">
      <div className="mb-6">
        <h2 className="heading-2 mb-2">Product Suggestions</h2>
        <p className="text-gray-500">Here is what you can make from your {crop}.</p>
      </div>

      <div className="space-y-4 mb-8">
        {/* Option 1: Raw */}
        <div className="card opacity-70">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg">Sell Raw {crop}</h3>
            <span className="badge-blue">Standard</span>
          </div>
          <div className="flex gap-2 mt-3">
            <span className="badge-yellow">Demand: Medium</span>
            <span className="badge-blue">Profit: Low</span>
          </div>
        </div>

        {/* Option 2: Processed (Highlighted) */}
        <div className="card border-green-500 shadow-green-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
            AI Recommended
          </div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-green-900">{crop} Puree</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">Longer shelf life, high urban demand.</p>
          <div className="flex gap-2">
            <span className="badge-green">Demand: High</span>
            <span className="badge-green">Profit: High</span>
          </div>
        </div>

        {/* Option 3: Premium */}
        <div className="card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg">Sun-dried {crop}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">Premium product for export markets.</p>
          <div className="flex gap-2">
            <span className="badge-yellow">Demand: Medium</span>
            <span className="badge-green">Profit: Very High</span>
          </div>
        </div>
      </div>

      <button onClick={onNext} className="btn-primary w-full">
        Compare Profits <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

function ComparisonScreen({ crop, onNext }: { crop: string, onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6">
      <div className="mb-6">
        <h2 className="heading-2 mb-2">Profit Comparison</h2>
        <p className="text-gray-500">See the difference processing makes.</p>
      </div>

      <div className="space-y-4 mb-8">
        {/* Raw Card */}
        <div className="card border-l-4 border-l-yellow-400">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-yellow-100 p-2 rounded-lg"><Leaf className="w-5 h-5 text-yellow-600" /></div>
            <h3 className="font-bold text-lg">Selling Raw</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Market Price</span><span className="font-medium">₹15 / kg</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Total Quantity</span><span className="font-medium">500 kg</span></div>
            <div className="h-px bg-gray-100 my-2"></div>
            <div className="flex justify-between text-base"><span className="font-semibold">Basic Earning</span><span className="font-bold">₹7,500</span></div>
          </div>
        </div>

        {/* Processed Card */}
        <div className="card border-l-4 border-l-green-500 bg-green-50/30">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-green-100 p-2 rounded-lg"><Factory className="w-5 h-5 text-green-600" /></div>
            <h3 className="font-bold text-lg text-green-900">{crop} Puree</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Selling Price</span><span className="font-medium">₹120 / kg</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Processing Cost</span><span className="font-medium text-red-500">- ₹5,000</span></div>
            <div className="h-px bg-gray-100 my-2"></div>
            <div className="flex justify-between text-base"><span className="font-semibold text-green-800">Final Profit</span><span className="font-bold text-green-700">₹45,000</span></div>
          </div>
        </div>
      </div>

      <div className="bg-green-100 rounded-2xl p-4 mb-8 flex items-center justify-between animate-pulse">
        <div>
          <div className="text-sm text-green-800 font-medium">Extra Profit</div>
          <div className="text-2xl font-bold text-green-700">+ ₹37,500</div>
        </div>
        <TrendingUp className="w-8 h-8 text-green-600" />
      </div>

      <button onClick={onNext} className="btn-primary w-full">
        See AI Decision <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

function DecisionScreen({ onNextRaw, onNextProcess }: { onNextRaw: () => void, onNextProcess: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="p-6 flex flex-col min-h-[calc(100vh-100px)]">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="heading-2 mb-4">AI Recommended</h2>
        <div className="glass-card w-full mb-8 border-green-200">
          <h3 className="text-2xl font-bold text-green-800 mb-2">Process into Puree</h3>
          <p className="text-gray-600">Based on current market demand, processing will yield 5x more profit than selling raw.</p>
        </div>
      </div>

      <div className="space-y-4 mt-auto">
        <button onClick={onNextProcess} className="btn-primary w-full py-4 text-lg">
          <Factory className="w-5 h-5" /> Continue with Processing
        </button>
        <button onClick={onNextRaw} className="btn-ghost w-full">
          Continue with Raw Selling
        </button>
      </div>
    </motion.div>
  );
}

function RawFlowScreen({ onNext }: { onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6">
      <div className="mb-6">
        <h2 className="heading-2 mb-2">Marketplace</h2>
        <p className="text-gray-500">Live offers for your raw crop.</p>
      </div>

      <div className="space-y-4 mb-8">
        {[
          { name: "FreshMart Ltd", price: "₹16/kg", dist: "12 km", tag: "Best Price" },
          { name: "Local Mandi", price: "₹15/kg", dist: "5 km", tag: "Nearest" },
          { name: "Agro Foods", price: "₹14.5/kg", dist: "20 km", tag: "" },
        ].map((buyer, i) => (
          <div key={i} className="card flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold">{buyer.name}</h3>
                {buyer.tag && <span className="badge-green text-[10px] px-1.5 py-0.5">{buyer.tag}</span>}
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" /> {buyer.dist}
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-green-700">{buyer.price}</div>
              <button className="text-sm text-green-600 font-medium hover:underline mt-1">Accept</button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={onNext} className="btn-primary w-full">
        Proceed to Sell <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

function ProcessFlowScreen({ onNext }: { onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6 pb-24">
      <div className="mb-6">
        <h2 className="heading-2 mb-2">Processing Plan</h2>
        <p className="text-gray-500">Detailed resources and step-by-step guide.</p>
      </div>

      {/* Resources Required */}
      <h3 className="font-bold mb-3 text-gray-700 flex items-center gap-2"><Settings className="w-5 h-5 text-blue-600" /> Resources Required</h3>
      
      {/* Machine List */}
      <div className="space-y-3 mb-4">
        <div className="card p-4 border-blue-100 bg-blue-50/30 flex items-center gap-4">
          <div className="bg-blue-100 p-2 rounded-lg shrink-0">
            <Factory className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Industrial Pulper</h4>
            <p className="text-xs text-gray-500">Capacity: 100kg/hr</p>
          </div>
        </div>
        
        <div className="card p-4 border-orange-100 bg-orange-50/30 flex items-center gap-4">
          <div className="bg-orange-100 p-2 rounded-lg shrink-0">
            <Zap className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Boiler Unit</h4>
            <p className="text-xs text-gray-500">Stainless Steel • 90°C</p>
          </div>
        </div>
        
        <div className="card p-4 border-purple-100 bg-purple-50/30 flex items-center gap-4">
          <div className="bg-purple-100 p-2 rounded-lg shrink-0">
            <Package className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Vacuum Sealer</h4>
            <p className="text-xs text-gray-500">For Jars & Pouches</p>
          </div>
        </div>
      </div>

      {/* Other Resources */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="card p-3 text-center bg-gray-50 border-gray-100">
          <Users className="w-6 h-6 mx-auto text-gray-500 mb-1" />
          <div className="text-xs font-semibold text-gray-700">Labor</div>
          <div className="text-[10px] text-gray-500">2 Workers</div>
        </div>
        <div className="card p-3 text-center bg-gray-50 border-gray-100">
          <Zap className="w-6 h-6 mx-auto text-yellow-500 mb-1" />
          <div className="text-xs font-semibold text-gray-700">Power</div>
          <div className="text-[10px] text-gray-500">5kW/hr</div>
        </div>
        <div className="card p-3 text-center bg-gray-50 border-gray-100">
          <Droplets className="w-6 h-6 mx-auto text-blue-400 mb-1" />
          <div className="text-xs font-semibold text-gray-700">Water</div>
          <div className="text-[10px] text-gray-500">500 Liters</div>
        </div>
      </div>

      {/* Detailed Steps */}
      <h3 className="font-bold mb-4 text-gray-700 flex items-center gap-2"><Factory className="w-5 h-5 text-green-600" /> Detailed Processing Steps</h3>
      <div className="space-y-4 mb-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-green-200 before:via-gray-200 before:to-transparent">
        {[
          { step: 1, title: "Sorting & Washing", time: "2 hrs", desc: "Remove defective crops and wash thoroughly with 500L clean water.", icon: <Droplets className="w-4 h-4" /> },
          { step: 2, title: "Pulping & Crushing", time: "3 hrs", desc: "Extract pulp using the Industrial Pulper machine at 100kg/hr.", icon: <Settings className="w-4 h-4" /> },
          { step: 3, title: "Boiling & Pasteurization", time: "2 hrs", desc: "Boil pulp at 90°C to eliminate bacteria and increase shelf life.", icon: <Zap className="w-4 h-4" /> },
          { step: 4, title: "Packaging & Sealing", time: "3 hrs", desc: "Vacuum seal the puree into sterile glass jars or pouches.", icon: <Package className="w-4 h-4" /> },
        ].map((s, i) => (
          <div key={i} className="relative flex items-start group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white bg-green-100 text-green-600 shadow-sm shrink-0 z-10 mt-1">
              {s.icon}
            </div>
            <div className="card p-4 ml-4 flex-1 border-gray-100 shadow-sm hover:border-green-200 transition-colors">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-sm text-gray-900">Step {s.step}: {s.title}</span>
                <span className="text-xs text-green-600 font-medium flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full"><Clock className="w-3 h-3" /> {s.time}</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mt-2">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={onNext} className="btn-primary w-full">
        Next: Branding <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

function BrandingScreen({ onNext }: { onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6">
      <div className="mb-6">
        <h2 className="heading-2 mb-2">AI Branding</h2>
        <p className="text-gray-500">Stand out with a professional brand.</p>
      </div>

      <div className="card mb-8 text-center py-8 bg-gradient-to-br from-green-50 to-emerald-50 border-green-100 relative overflow-hidden">
        <div className="absolute top-4 right-4 inline-flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full shadow-sm font-medium">
          <Sparkles className="w-3 h-3 text-yellow-500" /> AI Generated
        </div>
        
        {/* 3D-like Jar Mockup */}
        <div className="relative w-40 h-56 mx-auto mt-4 mb-8 drop-shadow-xl">
          {/* Lid */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 rounded-t-md border-b border-gray-400 z-20 shadow-sm"></div>
          {/* Jar Neck */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-4 bg-gradient-to-r from-red-700 via-red-500 to-red-800 z-10"></div>
          {/* Jar Body */}
          <div className="absolute top-10 inset-x-0 bottom-0 bg-gradient-to-r from-red-700 via-red-600 to-red-800 rounded-3xl rounded-t-2xl shadow-inner overflow-hidden border-2 border-white/20">
            {/* Glass Highlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent w-full h-full z-10 pointer-events-none"></div>
            <div className="absolute top-0 left-4 w-3 h-full bg-white/20 blur-sm z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-6 w-1 h-full bg-white/10 blur-[1px] z-10 pointer-events-none"></div>
            
            {/* Applied Label */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 bg-white h-28 shadow-lg z-20 flex flex-col items-center justify-center border-y border-gray-200">
              <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mb-1">
                <Leaf className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-heading text-lg font-bold text-green-900 leading-tight">PureRed</h3>
              <p className="text-[9px] text-green-700 font-medium uppercase tracking-wider">Farms</p>
              <div className="w-12 h-px bg-green-200 my-1.5"></div>
              <p className="text-[8px] text-gray-500 font-semibold">100% NATURAL PUREE</p>
            </div>
          </div>
        </div>

        <h3 className="font-heading text-2xl font-bold text-gray-900 mb-1">PureRed Farms</h3>
        <p className="text-sm text-gray-600 font-medium">Premium Tomato Puree</p>
      </div>

      <h3 className="font-bold mb-4 text-gray-700">Packaging Options</h3>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="card p-4 text-center border-2 border-green-500 relative overflow-hidden bg-green-50/30">
          <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">Selected</div>
          <Box className="w-8 h-8 mx-auto text-green-600 mb-2" />
          <div className="font-semibold text-sm">Glass Jar</div>
          <div className="text-xs text-gray-500">Premium feel</div>
        </div>
        <div className="card p-4 text-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
          <Package className="w-8 h-8 mx-auto text-gray-400 mb-2" />
          <div className="font-semibold text-sm">Stand-up Pouch</div>
          <div className="text-xs text-gray-500">Cost effective</div>
        </div>
      </div>

      <button onClick={onNext} className="btn-primary w-full">
        Next: Smart Selling <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

function SmartSellingScreen({ onNext }: { onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6 pb-24">
      <div className="mb-6">
        <h2 className="heading-2 mb-2">Smart Selling</h2>
        <p className="text-gray-500">Where to sell for maximum profit.</p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="card border-green-500 shadow-green-lg relative">
          <div className="absolute -top-3 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            AI Top Pick
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-xl"><Store className="w-6 h-6 text-green-600" /></div>
            <div>
              <h3 className="font-bold text-lg">App Marketplace</h3>
              <p className="text-sm text-gray-500">Direct to urban consumers</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-sm text-gray-600">Expected Price</span>
            <span className="font-bold text-green-700 text-lg">₹120/kg</span>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl"><Factory className="w-6 h-6 text-blue-600" /></div>
            <div>
              <h3 className="font-bold text-lg">Sell to Companies</h3>
              <p className="text-sm text-gray-500">B2B bulk orders (FMCG, Retail)</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-sm text-gray-600">Expected Price</span>
            <span className="font-bold text-gray-700 text-lg">₹95/kg (Bulk)</span>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-xl"><Globe className="w-6 h-6 text-purple-600" /></div>
            <div>
              <h3 className="font-bold text-lg">Export Globally</h3>
              <p className="text-sm text-gray-500">International markets (Requires certs)</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-sm text-gray-600">Expected Price</span>
            <span className="font-bold text-gray-700 text-lg">₹180/kg</span>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-xl"><Users className="w-6 h-6 text-orange-600" /></div>
            <div>
              <h3 className="font-bold text-lg">WhatsApp Groups</h3>
              <p className="text-sm text-gray-500">Local community selling</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-sm text-gray-600">Expected Price</span>
            <span className="font-bold text-gray-700 text-lg">₹100/kg</span>
          </div>
        </div>
      </div>

      <button onClick={onNext} className="btn-primary w-full">
        Next: Logistics <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

function LogisticsScreen({ onNext }: { onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6">
      <div className="mb-6">
        <h2 className="heading-2 mb-2">Logistics</h2>
        <p className="text-gray-500">Deliver your products efficiently.</p>
      </div>

      <div className="card bg-gray-900 text-white mb-6 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-400">Optimized Route</span>
            <span className="badge-green bg-green-500/20 text-green-400 border-green-500/30">Fastest</span>
          </div>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="flex-1 h-px bg-gray-700 border border-dashed border-gray-600"></div>
            <Truck className="w-5 h-5 text-gray-400" />
            <div className="flex-1 h-px bg-gray-700 border border-dashed border-gray-600"></div>
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Farm</span>
            <span>City Hub (45km)</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <label className="card flex items-center p-4 cursor-pointer border-green-500 bg-green-50/30">
          <input type="radio" name="transport" className="w-5 h-5 text-green-600 focus:ring-green-500" defaultChecked />
          <div className="ml-4 flex-1">
            <div className="font-bold">Platform Transport</div>
            <div className="text-sm text-gray-500">Pickup tomorrow, 9 AM</div>
          </div>
          <div className="font-bold text-green-700">₹800</div>
        </label>

        <label className="card flex items-center p-4 cursor-pointer">
          <input type="radio" name="transport" className="w-5 h-5 text-green-600 focus:ring-green-500" />
          <div className="ml-4 flex-1">
            <div className="font-bold">Self Transport</div>
            <div className="text-sm text-gray-500">Use own vehicle</div>
          </div>
          <div className="font-bold text-gray-700">₹0</div>
        </label>
      </div>

      <button onClick={onNext} className="btn-primary w-full">
        Next: Export Options <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

function ExportScreen({ onNext }: { onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6">
      <div className="mb-6">
        <h2 className="heading-2 mb-2">Global Export</h2>
        <p className="text-gray-500">Unlock international markets.</p>
      </div>

      <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 mb-8">
        <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-sm mb-4 mx-auto">
          <Globe className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-center font-bold text-xl mb-6">Market Comparison</h3>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm">
            <div>
              <div className="text-sm text-gray-500">Local Market</div>
              <div className="font-bold">India</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">₹120/kg</div>
              <div className="text-xs text-gray-400">Standard Demand</div>
            </div>
          </div>
          
          <div className="bg-blue-600 text-white p-4 rounded-xl flex justify-between items-center shadow-md relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-10">
              <Globe className="w-24 h-24 -mt-4 -mr-4" />
            </div>
            <div className="relative z-10">
              <div className="text-sm text-blue-200">Export Market</div>
              <div className="font-bold">UAE / Europe</div>
            </div>
            <div className="text-right relative z-10">
              <div className="font-bold text-xl">₹280/kg</div>
              <div className="text-xs text-blue-200 flex items-center gap-1"><ArrowUpRight className="w-3 h-3" /> High Demand</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex items-start gap-3 bg-white/60 p-3 rounded-lg text-sm text-blue-900">
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p>Export requires FSSAI & GlobalGAP certification. We can help you get certified.</p>
        </div>
      </div>

      <button onClick={onNext} className="btn-primary w-full">
        Next: Group / FPO <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

function GroupFPOScreen({ onNext }: { onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6">
      <div className="mb-6">
        <h2 className="heading-2 mb-2">Join an FPO</h2>
        <p className="text-gray-500">Farmer Producer Organizations near you.</p>
      </div>

      <div className="glass-card bg-green-600 text-white mb-8 border-none">
        <h3 className="font-bold text-xl mb-2">Why join a group?</h3>
        <ul className="space-y-2 text-green-50">
          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-300" /> Share machine costs</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-300" /> Bulk transport discounts</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-300" /> Easier export certification</li>
        </ul>
      </div>

      <h3 className="font-bold mb-4 text-gray-700">Recommended Groups</h3>
      <div className="space-y-4 mb-8">
        <div className="card border-green-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">Best Match</div>
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-lg">MahaAgri FPO</h4>
            <span className="badge-blue">12 km away</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">45 members • Focuses on processed vegetables.</p>
          <button className="text-sm font-semibold text-green-600 hover:text-green-700">Request to Join →</button>
        </div>
        
        <div className="card opacity-70">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-lg">GreenValley Co-op</h4>
            <span className="badge-blue">25 km away</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">120 members • Mixed farming.</p>
          <button className="text-sm font-semibold text-gray-600 hover:text-gray-900">View Details →</button>
        </div>
      </div>

      <button onClick={onNext} className="btn-primary w-full">
        View Final Dashboard <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

function DashboardScreen({ decision, onRestart }: { decision: 'raw' | 'process' | null, onRestart: () => void }) {
  const isProcess = decision === 'process';
  
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="p-6 pb-24">
      <div className="mb-6">
        <h2 className="heading-2 mb-2">Profit Dashboard</h2>
        <p className="text-gray-500">Your final execution summary.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="card bg-gray-50 border-none p-4">
          <div className="text-gray-500 text-sm mb-1">Total Revenue</div>
          <div className="font-bold text-xl">{isProcess ? '₹60,000' : '₹7,500'}</div>
        </div>
        <div className="card bg-gray-50 border-none p-4">
          <div className="text-gray-500 text-sm mb-1">Total Costs</div>
          <div className="font-bold text-xl text-red-500">{isProcess ? '- ₹7,800' : '- ₹500'}</div>
        </div>
      </div>

      <div className="card bg-green-600 text-white border-none shadow-green-lg mb-8 relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 opacity-20">
          <DollarSign className="w-32 h-32" />
        </div>
        <div className="relative z-10">
          <div className="text-green-100 text-sm mb-1 font-medium">Estimated Net Profit</div>
          <div className="font-heading text-4xl font-bold mb-2">{isProcess ? '₹52,200' : '₹7,000'}</div>
          {isProcess && (
            <div className="inline-flex items-center gap-1 bg-white/20 px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">
              <TrendingUp className="w-3 h-3" /> 7.4x more than raw selling
            </div>
          )}
        </div>
      </div>

      <h3 className="font-bold mb-4 text-gray-700">Execution Summary</h3>
      <div className="space-y-3 mb-8">
        <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg"><Package className="w-4 h-4 text-blue-600" /></div>
            <span className="font-medium text-sm">Product</span>
          </div>
          <span className="text-sm text-gray-600">{isProcess ? 'Tomato Puree (Branded)' : 'Raw Tomato'}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg"><Store className="w-4 h-4 text-purple-600" /></div>
            <span className="font-medium text-sm">Market</span>
          </div>
          <span className="text-sm text-gray-600">{isProcess ? 'App Marketplace' : 'FreshMart Ltd'}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-lg"><Truck className="w-4 h-4 text-orange-600" /></div>
            <span className="font-medium text-sm">Logistics</span>
          </div>
          <span className="text-sm text-gray-600">Platform Transport</span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500 mb-6 italic">"Agri2Valuse — From Crop to Value, Powered by AI"</p>
        <button onClick={onRestart} className="btn-secondary w-full max-w-xs mx-auto">
          Start New Analysis
        </button>
      </div>
    </motion.div>
  );
}

