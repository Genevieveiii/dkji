/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ReactNode, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Car, 
  TrainFront, 
  ChevronRight, 
  MapPin, 
  Info, 
  Map as MapIcon, 
  Bus,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  Smartphone,
  Navigation
} from 'lucide-react';

// --- Constants & Assets ---
const BRAND_RED = '#bf1a20';
const INK_PRIMARY = '#1d1d1f';
const INK_SECONDARY = '#86868b';

const IMAGES = {
  LOGO: 'input_file_7.png',
  CAMPUS_MODEL: 'input_file_0.png',
  BASEMENT_ENTRY: 'input_file_1.png',
  SHUTTLE_BUS: 'input_file_2.png',
  SUBWAY_EXIT: 'input_file_3.png',
  SHUTTLE_SCHEDULE: 'input_file_4.png',
  QR_CODE: 'input_file_6.png',
  PRODUCT_SHOW: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=1000', 
};

type Screen = 'landing' | 'selection' | 'driving' | 'subway' | 'ridehailing' | 'ending';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1,
      delayChildren: 0.1,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: { duration: 0.5, ease: "easeInOut" }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] 
    }
  }
};

const fadeScaleVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
  }
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [showSchedule, setShowSchedule] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentScreen]);

  const navTo = (screen: Screen) => setCurrentScreen(screen);

  return (
    <div className="min-h-screen bg-white text-[#333333] font-sans overflow-x-hidden selection:bg-brand selection:text-white">
      {/* Apple-style Persistent Top Nav */}
      <nav className="sticky top-0 z-[100] w-full bg-white/80 backdrop-blur-xl">
        <div className="max-w-[1060px] mx-auto px-6 h-12 flex items-center justify-center">
          <motion.button 
            onClick={() => navTo('landing')}
            className="text-sm font-bold tracking-tight hover:opacity-70 transition-opacity flex items-center gap-2"
          >
            <img src={IMAGES.LOGO} alt="XR" className="h-4" />
            <span className="hidden sm:inline border-l border-black/10 pl-2 ml-1 text-[10px] uppercase tracking-widest text-[#333333]">XRAZOR TECH GUIDE</span>
          </motion.button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {currentScreen === 'landing' && (
          <motion.div 
            key="landing" 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center justify-center min-h-[calc(100dvh-3rem)] py-16 px-6 text-center bg-white"
          >
            <div className="flex-1 flex flex-col items-center justify-center max-w-5xl w-full">
              <motion.div 
                variants={fadeScaleVariants} 
                className="w-full mb-12 cursor-pointer"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.6 }}
              >
                 <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] bg-gray-50">
                    <img 
                      src={IMAGES.PRODUCT_SHOW} 
                      alt="Product Closeup" 
                      className="w-full h-full object-cover transition-transform duration-[10s] ease-linear scale-110 hover:scale-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                 </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4 max-w-3xl">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1] text-[#333333]">
                  玄刃科技
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-[#666666] font-medium tracking-[0.2em] uppercase">
                  欢迎莅临
                </p>
                <p className="text-base sm:text-lg md:text-xl text-[#666666] font-light leading-relaxed tracking-tight max-w-2xl mx-auto pt-2">
                  您身边的实验室智慧自动化平台合作伙伴
                </p>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="mt-20">
              <button 
                onClick={() => navTo('selection')}
                className="group relative inline-flex items-center gap-6 px-20 py-7 bg-black text-white rounded-full text-xl md:text-2xl font-bold hover:bg-brand transition-all duration-500 shadow-2xl active:scale-95"
              >
                立即开始探索
                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        )}

        {currentScreen === 'selection' && (
          <motion.div 
            key="selection" 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-[calc(100dvh-3rem)] flex flex-col p-6 md:p-12 bg-white"
          >
            <div className="flex-1 apple-container pt-12">
              <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-16 md:mb-24 tracking-tighter text-center text-reveal">
                選擇您的參訪方式
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-20">
                {[
                  { id: 'driving', icon: Car, label: '駕駛自駕', sub: 'Driving', desc: '規劃路徑與停車指引' },
                  { id: 'subway', icon: TrainFront, label: '地鐵/接駁車', sub: 'Subway & Shuttle', desc: '便捷的大型交通中轉' },
                  { id: 'ridehailing', icon: Smartphone, label: '網約計程車', sub: 'Ride-Hailing', desc: '點對點精確落地服務' },
                ].map((item, idx) => (
                  <motion.button 
                    key={item.id}
                    variants={itemVariants}
                    onClick={() => navTo(item.id as Screen)}
                    className="group relative flex flex-col items-center text-center p-12 bg-gray-50 rounded-[2.5rem] border border-black/[0.03] hover:bg-white hover:border-brand/20 transition-all duration-700 shadow-sm hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
                  >
                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-10 bg-white shadow-sm group-hover:scale-110 transition-transform duration-700 group-hover:rotate-6">
                      <item.icon className="w-8 h-8 text-brand" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-[#999999] mb-4 font-mono font-bold">{item.sub}</div>
                      <div className="text-2xl font-bold mb-4 text-[#333333]">{item.label}</div>
                      <div className="text-sm text-[#666666] leading-relaxed font-light">{item.desc}</div>
                    </div>
                    
                    <div className="mt-10 flex items-center gap-2 text-xs font-bold text-brand group-hover:gap-4 transition-all opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-500">
                      查看指引 <ArrowRight className="w-4 h-4" />
                    </div>
                    
                    {/* Apple-style subtle light sweep on hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 -z-0"></div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {['driving', 'subway', 'ridehailing'].includes(currentScreen) && (
          <DetailsScreen 
            type={currentScreen as any} 
            onBack={() => navTo('selection')} 
            onNext={() => navTo('ending')}
            onShowSchedule={() => setShowSchedule(true)}
          />
        )}

        {currentScreen === 'ending' && (
          <motion.div 
            key="ending" 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-[100dvh] flex flex-col p-6 md:p-12 bg-white"
          >
            <motion.header variants={itemVariants} className="flex justify-between items-center mb-24 max-w-7xl mx-auto w-full">
              <img src={IMAGES.LOGO} alt="Xrazor" className="h-4 md:h-8" />
              <button 
                onClick={() => navTo('selection')}
                className="text-[11px] font-bold tracking-widest uppercase text-brand border border-brand/20 px-4 py-2 rounded-full hover:bg-brand hover:text-white transition-all"
              >
                更改出行
              </button>
            </motion.header>

            <main className="flex-1 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center justify-center">
              <div className="space-y-12">
                <motion.div variants={itemVariants}>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4">您已成功抵達</h2>
                  <div className="text-xl sm:text-2xl text-brand font-medium tracking-tight">玄刃科技智慧園區</div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-8 text-lg sm:text-xl text-[#666666] font-light leading-relaxed">
                  <p>
                    玄刃科技成立於 2020 年，在上海、無錫、南京設有研發和精益生產中心。
                  </p>
                  <p>
                    憑藉多年機器人、人工智慧技術開發和生物醫藥產業經驗，致力於生命科學、合成生物學等細分領域的自動化解決方案。
                  </p>
                </motion.div>

                <motion.div variants={itemVariants}>
                   <a 
                    href="http://www.xr-techs.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 px-10 py-5 bg-ink text-white rounded-full font-medium hover:bg-brand transition-all shadow-xl shadow-ink/10"
                  >
                    訪問官方網站 <ExternalLink className="w-5 h-5" />
                  </a>
                </motion.div>
              </div>

              <motion.div variants={fadeScaleVariants} className="lg:justify-self-end w-full max-w-md">
                 <div className="bg-[#fcfcfc] p-12 rounded-2xl border border-gray-100 space-y-10">
                    <div className="bg-white p-6 rounded-xl shadow-sm inline-block mx-auto flex items-center justify-center">
                       <img src={IMAGES.QR_CODE} alt="WeChat" className="w-56 h-56" />
                    </div>
                    <div className="text-center space-y-3">
                       <h4 className="text-2xl font-bold text-[#333333]">加入我們的智慧實驗室</h4>
                       <p className="text-[#999999] text-sm uppercase tracking-widest font-mono">Transform your workflow with AI</p>
                    </div>
                 </div>
              </motion.div>
            </main>

            <footer className="mt-24 pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between gap-6 text-[10px] uppercase tracking-widest text-ink-secondary font-mono max-w-7xl mx-auto w-full">
              <div>© 2024 XRAZOR TECHNOLOGY. ALL RIGHTS RESERVED.</div>
              <div className="flex gap-8">
                <span>Innovation</span>
                <span>Precision</span>
                <span>Future</span>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schedule Modal */}
      <AnimatePresence>
        {showSchedule && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setShowSchedule(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[3rem] overflow-hidden max-w-3xl w-full relative group"
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="absolute top-6 right-6 z-10 bg-black/10 hover:bg-black/80 transition-colors p-3 rounded-full text-white"
                onClick={() => setShowSchedule(false)}
              >
                <ChevronLeft className="w-6 h-6 rotate-180" />
              </button>
              <div className="p-1 text-center bg-surface">
                 <img src={IMAGES.SHUTTLE_SCHEDULE} alt="Schedule" className="w-full h-auto rounded-2xl" />
              </div>
              <div className="py-8 px-10 flex justify-between items-center bg-white">
                <div>
                   <h5 className="text-xl font-bold mb-1">班車時刻表</h5>
                   <p className="text-xs text-ink-secondary">SHUTTLE SERVICE TIMETABLE</p>
                </div>
                <div className="text-sm font-medium bg-surface px-4 py-2 rounded-full">工作日有效</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Helper Components ---

function DetailsScreen({ type, onBack, onNext, onShowSchedule }: { type: 'driving'|'subway'|'ridehailing', onBack:()=>void, onNext:()=>void, onShowSchedule:()=>void }) {
const handleStartNavigation = () => {
    // Xuanren Tech coordinates (approximate for Pudong Changfei Rd 186)
    // Destination address: 上海市浦東新區昌飛路186號
    const destination = encodeURIComponent("上海市浦東新區昌飛路186號玄刃科技");
    
    // Attempt to use Geolocation API to confirm permission first, 
    // although map apps handle "current location" well.
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // Success getting permission - open Baidu or Amap
          // We use a universal direct link to Amap/Baidu for the region
          window.open(`https://uri.amap.com/navigation?to=,,${destination}&mode=car&policy=1&src=web&callnative=1`, '_blank');
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Fallback to just opening map with destination even if geolocation fails
          window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank');
        }
      );
    } else {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank');
    }
  };

  const content = {
    driving: {
       title: "駕駛自駕",
       steps: [
         {
           tag: "DESTINATION",
           title: "浦東新區昌飛路 186 號",
           desc: "請導航至「3 號樓裙樓」，建議從「城市網鄰北門」進入地下室。",
           img: IMAGES.CAMPUS_MODEL,
           button: { label: "啟動地圖導航", onClick: handleStartNavigation }
         },
         {
           tag: "PARKING",
           title: "B2 層專屬停車位",
           desc: "入庫後請沿指引停放。收費標準：10 元 / 小時。",
           img: IMAGES.BASEMENT_ENTRY,
           highlight: true
         }
       ]
    },
    subway: {
       title: "地鐵接駁",
       steps: [
         {
           tag: "METRO STATION",
           title: "13 號線 中科路站",
           desc: "到達終點站後請由 4 號口出站。出站即可見接駁車站牌。",
           img: IMAGES.SUBWAY_EXIT
         },
         {
           tag: "SHUTTLE BUS",
           title: "城市網鄰專屬接駁車",
           desc: "認準「浦東公車」與「城市網鄰」字樣。車次約每 15 分鐘一班。",
           custom: (
             <div className="grid grid-cols-2 gap-4 h-full aspect-video">
                <div className="bg-surface rounded-3xl overflow-hidden flex items-center justify-center p-4">
                  <img src={IMAGES.SHUTTLE_BUS} alt="Bus" className="h-full object-contain" />
                </div>
                <div className="bg-surface rounded-3xl overflow-hidden">
                  <img src={IMAGES.SUBWAY_EXIT} alt="Stop" className="w-full h-full object-cover" />
                </div>
             </div>
           ),
           button: { label: "查看班車時刻表", onClick: onShowSchedule }
         }
       ]
    },
    ridehailing: {
       title: "網約計程車",
       steps: [
         {
           tag: "LOCATION",
           title: "上海浦東新區張江規劃八路",
           desc: "搜尋上述地址或「上海玄刃智能科技」可直接定點至大門。",
           button: { label: "在地圖中定位", onClick: handleStartNavigation }
         },
         {
           tag: "RECOGNITION",
           title: "白色精神堡壘 Logo",
           desc: "車輛可直達入口。下車後認準白色精神堡壘地標即可進入大廳。"
         }
       ]
    }
  }[type];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white pb-60"
    >
      <div className="apple-container pt-32 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-32 text-center"
        >
          <div className="text-[12px] font-bold text-brand uppercase tracking-[0.4em] mb-4">Visit Guide</div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#333333] mb-6">{content.title}</h2>
          <div className="h-1 w-12 bg-brand mx-auto rounded-full opacity-60"></div>
        </motion.div>
        {content.steps.map((step, i) => (
          <motion.section 
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col ${i % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 lg:gap-32 items-center`}
          >
            <div className="flex-1 space-y-10 text-center lg:text-left">
               <div className="inline-block px-4 py-1.5 bg-surface rounded-full text-[10px] font-bold tracking-[0.2em] text-ink-secondary mb-2">{step.tag}</div>
               <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">{step.title}</h3>
               <p className="text-base sm:text-lg md:text-xl text-ink-secondary font-light leading-relaxed max-w-xl mx-auto lg:mx-0">{step.desc}</p>
               {step.button && (
                 <button 
                  onClick={step.button.onClick}
                  className="flex items-center gap-2 text-brand font-semibold border-b-2 border-brand/20 pb-1 hover:border-brand transition-all mx-auto lg:mx-0"
                 >
                   {step.button.label} <ArrowRight className="w-4 h-4" />
                 </button>
               )}
            </div>

            <div className="flex-1 w-full max-w-xl">
               {step.custom ? (
                 <div className="w-full">{step.custom}</div>
               ) : step.img ? (
                 <div className="relative rounded-[3rem] overflow-hidden shadow-2xl bg-black">
                   <img src={step.img} alt="guide" className="w-full aspect-[4/3] object-cover opacity-90 transition-transform duration-[2s] hover:scale-105" />
                   {step.highlight && (
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1/3 aspect-square border-2 border-white/40 rounded-full animate-ping"></div>
                     </div>
                   )}
                 </div>
               ) : (
                 <div className="w-full aspect-square bg-surface rounded-[3rem] flex items-center justify-center border border-black/[0.02]">
                    <Navigation className="w-20 h-20 text-brand/20" />
                 </div>
               )}
            </div>
          </motion.section>
        ))}
      </div>

      <footer className="fixed bottom-12 left-0 right-0 flex justify-center z-40 px-6">
        <button 
          onClick={onNext}
          className="group px-16 py-6 bg-ink text-white rounded-full font-bold tracking-tight text-lg hover:bg-brand transition-all shadow-2xl active:scale-95 flex items-center gap-4"
        >
          我已到達 <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
        </button>
      </footer>
    </motion.div>
  );
}
