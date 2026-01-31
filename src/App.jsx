import React, { useState, useEffect } from 'react';
import { 
  Wind, 
  Thermometer, 
  Droplets, 
  ShieldCheck, 
  Activity, 
  Moon, 
  Flame, 
  User, 
  Check, 
  Menu, 
  X, 
  ArrowRight,
  Zap
} from 'lucide-react';
import { supabase } from './supabaseClient';
import AuthModal from './components/AuthModal';
import ProductsComingSoon from './components/ProductsComingSoon';

// --- Components ---

const Navbar = ({ onOpenAuth, user, onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Wind className="text-white w-5 h-5" />
          </div>
          <span className={`text-2xl font-bold tracking-tight ${scrolled ? 'text-gray-900' : 'text-slate-800'}`}>
            NASPIRO
          </span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['Problem', 'Solution', 'Technology', 'Who Is It For'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              {item}
            </a>
          ))}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {user.user_metadata?.name || user.email?.split('@')[0]}
              </span>
              <button 
                onClick={onSignOut}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-medium hover:bg-gray-300 transition-all"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg shadow-blue-600/20"
            >
              Get Naspiro
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 p-6 flex flex-col gap-4">
          {['Problem', 'Solution', 'Technology', 'Who Is It For'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
              className="text-lg font-medium text-gray-800"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
          {user ? (
            <>
              <span className="text-sm text-gray-600">
                {user.user_metadata?.name || user.email?.split('@')[0]}
              </span>
              <button 
                onClick={() => {
                  onSignOut();
                  setIsOpen(false);
                }}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium w-full"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button 
              onClick={() => {
                onOpenAuth();
                setIsOpen(false);
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium w-full"
            >
              Get Naspiro
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

const Hero = ({ onOpenAuth }) => {
  return (
    <header className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-white pt-20">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-75"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold tracking-wide uppercase">
            <ShieldCheck size={16} />
            Guard 24/7
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1]">
            Care for every <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              breath you take.
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
            Every day, you breathe 22 pounds of air. Naspiro filters, warms, and moisturizes every single breath. The ultimate ergonomic nasal cap for modern lung protection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onOpenAuth}
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20"
            >
              Pre-Order Now <ArrowRight size={20} />
            </button>
            <button className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              How it Works
            </button>
          </div>
          <p className="text-sm text-gray-400 italic">
            *Complementary to medical masks, not a replacement.
          </p>
        </div>

        {/* Abstract Product Visualization */}
        <div className="relative h-[500px] w-full flex items-center justify-center group">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-white rounded-[3rem] transform rotate-3 transition-transform group-hover:rotate-6 duration-500 shadow-2xl border border-white/50"></div>
          <div className="relative z-10 text-center">
             {/* Simulated Product Image/Graphic */}
             <div className="w-64 h-80 mx-auto bg-gradient-to-b from-white to-blue-50 rounded-[2rem] shadow-inner border border-blue-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="w-32 h-20 border-4 border-blue-200 rounded-full mb-4 relative flex items-center justify-center">
                    <div className="w-full h-full absolute animate-ping opacity-20 bg-blue-400 rounded-full"></div>
                    <Wind className="text-blue-500" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Naspiro™</h3>
                <p className="text-sm text-gray-500">Advanced Nasal Filtration</p>
                
                <div className="mt-8 flex gap-4">
                    <div className="text-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-1 text-blue-600"><Thermometer size={14}/></div>
                        <span className="text-[10px] font-bold text-gray-600">TEMP</span>
                    </div>
                     <div className="text-center">
                        <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-1 text-cyan-600"><Droplets size={14}/></div>
                        <span className="text-[10px] font-bold text-gray-600">MOIST</span>
                    </div>
                </div>
             </div>
             <div className="mt-8 bg-white/80 backdrop-blur px-6 py-3 rounded-xl shadow-lg inline-flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-gray-700">Medical Grade Seal</span>
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const StatCard = ({ number, text, source, color = "blue" }) => (
  <div className="p-8 bg-slate-800 rounded-2xl border border-slate-700 hover:border-slate-500 transition-colors">
    <h3 className={`text-4xl md:text-5xl font-bold text-${color}-400 mb-4`}>{number}</h3>
    <p className="text-slate-300 text-lg mb-4 leading-relaxed">{text}</p>
    {source && <p className="text-slate-500 text-xs uppercase tracking-wider">{source}</p>}
  </div>
);

const ProblemSection = () => {
  return (
    <section id="problem" className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">The Invisible Enemy</h2>
          <p className="text-xl text-slate-400">
            We are careful about the water we drink and the food we eat. But what about the 7,000 pounds of air we breathe every year?
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <StatCard 
            number="90%" 
            text="of people globally live in unhealthy air conditions." 
            source="WHO Global Report"
            color="red"
          />
          <StatCard 
            number="8.1M" 
            text="Deaths contributed to air pollution in 2021 alone." 
            source="Global Health Data"
            color="orange"
          />
          <StatCard 
            number="+46%" 
            text="Increase in heart attacks following major fire incidents." 
            source="Cedars-Sinai Medical Center"
            color="red"
          />
        </div>
        
        <div className="mt-12 p-6 bg-red-900/20 border border-red-900/50 rounded-xl flex items-start gap-4 max-w-4xl mx-auto">
            <Flame className="text-red-500 flex-shrink-0 mt-1" />
            <p className="text-red-200">
                <strong>Fire Season Risk:</strong> Studies show wildland firefighters face a 40% increased risk of lung cancer. Smoke exposure affects everyone, not just those on the front lines.
            </p>
        </div>
      </div>
    </section>
  );
};

const Feature = ({ icon: Icon, title, desc }) => (
  <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
      <Icon size={32} />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

const SolutionSection = () => {
  return (
    <section id="solution" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">The Naspiro Technology</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">More Than Just a Filter</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Naspiro attaches comfortably to your nose using a medical-grade adhesive seal, creating a personal micro-climate for your lungs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Feature 
            icon={ShieldCheck} 
            title="Advanced Filtration" 
            desc="Blocks pollutants, smoke particles, viruses, and allergens before they enter your nasal cavity." 
          />
          <Feature 
            icon={Thermometer} 
            title="Temp Control" 
            desc="Warms freezing air by up to 30 degrees, protecting lungs from cold shock during winter." 
          />
          <Feature 
            icon={Droplets} 
            title="Moisture Lock" 
            desc="Maintains optimal humidity levels to prevent dry nose, nosebleeds, and respiratory irritation." 
          />
           <Feature 
            icon={Activity} 
            title="Oxygen Flow" 
            desc="Optimized airflow design allows athletes to inhale oxygen-enriched air without resistance." 
          />
        </div>

        <div className="mt-20 bg-blue-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">Medical-Grade Comfort</h3>
                <ul className="space-y-4">
                    {[
                        "Sealed with hypoallergenic medical adhesive.",
                        "Ergonomic cap design fits naturally.",
                        "Works alongside your trifold mask.",
                        "Prevents dry breathing insomnia."
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center text-blue-700">
                                <Check size={14} />
                            </div>
                            <span className="text-gray-700 font-medium">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex-1 w-full relative h-64 bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden flex items-center justify-center">
                 {/* Visual Representation of the Seal */}
                 <div className="text-center space-y-2">
                    <div className="w-24 h-24 border-4 border-blue-500/20 rounded-full mx-auto flex items-center justify-center relative">
                        <div className="absolute inset-0 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                        <div className="w-16 h-16 bg-blue-600 rounded-full"></div>
                    </div>
                    <p className="text-sm font-bold text-blue-900">Sure-Seal™ Technology</p>
                    <p className="text-xs text-gray-500">Leak-proof & Skin Safe</p>
                 </div>
            </div>
        </div>
      </div>
    </section>
  );
};

const AudienceCard = ({ icon: Icon, title, desc, tags }) => (
  <div className="group bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
    <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors text-gray-600">
            <Icon size={24} />
        </div>
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-500 mb-6 min-h-[60px]">{desc}</p>
    <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
            <span key={tag} className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                {tag}
            </span>
        ))}
    </div>
  </div>
);

const AudienceSection = () => {
    return (
        <section id="who-is-it-for" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900">Who Needs Naspiro?</h2>
                    <p className="text-lg text-gray-600 mt-4">From the front lines to the finish line.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AudienceCard 
                        icon={Flame}
                        title="Firefighters & First Responders"
                        desc="Essential protection against smoke particulates and extreme conditions during fire seasons."
                        tags={['Wildfire', 'Smoke', 'Heat']}
                    />
                    <AudienceCard 
                        icon={Activity}
                        title="Athletes"
                        desc="Enhanced oxygen intake and temperature regulation for runners and cyclists in any weather."
                        tags={['Running', 'Training', 'Endurance']}
                    />
                    <AudienceCard 
                        icon={User}
                        title="Respiratory Patients"
                        desc="Critical support for COPD, asthma, and immunosuppressed individuals requiring sterile air."
                        tags={['COPD', 'Asthma', 'Immunity']}
                    />
                    <AudienceCard 
                        icon={Moon}
                        title="Better Sleepers"
                        desc="Combats dry nose syndrome that leads to insomnia, ensuring restful, humidified breathing."
                        tags={['Insomnia', 'Dry Nose', 'Comfort']}
                    />
                     <AudienceCard 
                        icon={Wind}
                        title="Urban Commuters"
                        desc="Daily protection for those living in industrial areas or cities with high pollution indices."
                        tags={['Pollution', 'Smog', 'Commute']}
                    />
                     <AudienceCard 
                        icon={Zap}
                        title="Service Workers"
                        desc="Restaurant workers and laborers exposed to chemical odors, grease, and strong fumes."
                        tags={['Chefs', 'Labor', 'Chemicals']}
                    />
                </div>
            </div>
        </section>
    )
}

const Footer = () => (
  <footer className="bg-slate-900 text-slate-300 py-16">
    <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Wind className="text-white w-5 h-5" />
          </div>
          <span className="text-2xl font-bold text-white">NASPIRO</span>
        </div>
        <p className="max-w-sm mb-6 text-slate-400">
          A life breather designed to increase your lifespan. Guarding you 24/7 because you breathe 24/7.
        </p>
        <div className="flex gap-4">
           {/* Social placeholders */}
           {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 transition-colors cursor-pointer"></div>)}
        </div>
      </div>
      
      <div>
        <h4 className="text-white font-bold mb-6">Product</h4>
        <ul className="space-y-4">
          <li><a href="#" className="hover:text-white transition-colors">Technology</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Safety Data</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Reviews</a></li>
          <li><a href="#" className="hover:text-white transition-colors">For Hospitals</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-bold mb-6">Contact</h4>
        <ul className="space-y-4">
          <li>support@naspiro.com</li>
          <li>1-800-BREATHE</li>
          <li>Los Angeles, CA</li>
        </ul>
      </div>
    </div>
    <div className="container mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-sm text-slate-500 text-center">
      © {new Date().getFullYear()} Naspiro. All rights reserved. Not a medical device replacement for prescribed ventilators.
    </div>
  </footer>
);

// --- Main App Component ---

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Show "Coming Soon" page if user is logged in
  if (user) {
    return <ProductsComingSoon user={user} onSignOut={handleSignOut} />;
  }

  return (
    <div className="font-sans antialiased text-gray-900 bg-white selection:bg-blue-100 selection:text-blue-900">
      <Navbar onOpenAuth={() => setShowAuthModal(true)} user={user} onSignOut={handleSignOut} />
      <Hero onOpenAuth={() => setShowAuthModal(true)} />
      <ProblemSection />
      <SolutionSection />
      <AudienceSection />
      
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Your Lungs Deserve Better.</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join the revolution in respiratory health. Get Naspiro and transform the air you breathe into a source of vitality.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => setShowAuthModal(true)}
              className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
                Order Naspiro Now
            </button>
             <button className="bg-blue-700 text-white border border-blue-400 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-800 transition-all">
                Contact Sales
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={(user) => setUser(user)}
      />
    </div>
  );
};

export default App;
