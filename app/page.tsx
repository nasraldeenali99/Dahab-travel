"use client";

import { JSX, useState, useEffect } from "react";
import { 
  CheckBadgeIcon, 
  SparklesIcon, 
  WifiIcon, 
  ChatBubbleOvalLeftEllipsisIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  UserIcon,
  PhoneIcon,
  UserGroupIcon,
  StarIcon,
  ArrowUpIcon,
  MapPinIcon,
  ClockIcon,
  CreditCardIcon
} from "@heroicons/react/24/solid";


const AGENCY_WHATSAPP_NUMBERS = ["2001505717333", "201034971059"];
const VODAFONE_CASH_NUMBER = "01034971059";

const sendToWhatsApp = (bookingDetailsMessage: string) => {
  const randomIndex = Math.floor(Math.random() * AGENCY_WHATSAPP_NUMBERS.length);
  const selectedNumber = AGENCY_WHATSAPP_NUMBERS[randomIndex];
  const encodedMessage = encodeURIComponent(bookingDetailsMessage);
  window.open(`https://wa.me/${selectedNumber}?text=${encodedMessage}`, "_blank");
};


interface Trip {
  id: string;
  from: string;
  to: string;
  price: number;
  busType: string;
  availableSeats: number;
  features: string[];
  badge?: string;
}

const TRIPS_DATA: Trip[] = [
  { id: "1", from: "القاهرة", to: "أرقين", price: 1200, busType: "سياحي مكيف", availableSeats: 8, features: ['تكييف', 'شاحن'] },
  { id: "2", from: "القاهرة", to: "دنقلا", price: 2300, busType: "VIP ممتاز", availableSeats: 6, features: ['WiFi', 'تكييف', 'شاحن'], badge: "مميز" },
  { id: "3", from: "القاهرة", to: "عطبرة", price: 2900, busType: "VIP فخم", availableSeats: 5, features: ['WiFi', 'تكييف', 'قهوة', 'شاحن'] },
  { id: "4", from: "القاهرة", to: "أم درمان", price: 2900, busType: "VIP فخم", availableSeats: 4, features: ['WiFi', 'تكييف', 'شاحن'], badge: "الأكثر طلباً" },
  { id: "5", from: "القاهرة", to: "الخرطوم", price: 2900, busType: "VIP فخم", availableSeats: 4, features: ['WiFi', 'تكييف', 'شاحن'] },
  { id: "6", from: "القاهرة", to: "مدني", price: 3500, busType: "VIP فخم", availableSeats: 7, features: ['WiFi', 'تكييف', 'قهوة', 'شاحن'] },
  { id: "7", from: "القاهرة", to: "بورتسودان", price: 3800, busType: "VIP درجة أولى", availableSeats: 3, features: ['WiFi', 'تكييف', 'قهوة', 'شاحن', 'ماء'], badge: "الأكثر طلباً" },
  { id: "8", from: "القاهرة", to: "القضارف", price: 4200, busType: "VIP ممتاز", availableSeats: 5, features: ['WiFi', 'تكييف', 'شاحن'] },
  { id: "9", from: "القاهرة", to: "كسلا", price: 4000, busType: "VIP ممتاز", availableSeats: 6, features: ['WiFi', 'تكييف', 'شاحن'] },
  { id: "10", from: "القاهرة", to: "سنار", price: 4300, busType: "VIP ممتاز", availableSeats: 4, features: ['WiFi', 'تكييف', 'شاحن'], badge: "مميز" },
  { id: "11", from: "القاهرة", to: "سنجة", price: 4400, busType: "سياحي مكيف", availableSeats: 5, features: ['تكييف', 'شاحن'] },
  { id: "12", from: "القاهرة", to: "الأبيض", price: 4400, busType: "سياحي مكيف", availableSeats: 6, features: ['تكييف', 'شاحن'] },
  { id: "13", from: "القاهرة", to: "الدمازين", price: 5200, busType: "VIP ممتاز", availableSeats: 3, features: ['WiFi', 'تكييف', 'قهوة', 'شاحن'], badge: "الأكثر طلباً" },
];

const TESTIMONIALS = [
  {
    name: "أحمد محمد",
    location: "الخرطوم",
    text: "رحلة ممتازة من القاهرة للخرطوم. الباص نظيف والتكييف ممتاز والسائق محترم جداً. السعر أفضل من أي وكالة تانية جربتها.",
    rating: 5,
    avatar: "أ"
  },
  {
    name: "سارة عبدالله",
    location: "بورتسودان",
    text: "حجزت VIP لعيلتي وكان تجربة رائعة. الواي فاي شغال ممتاز والقهوة اللي قدموها كانت لذيذة. شكراً وكالة ذهب!",
    rating: 5,
    avatar: "س"
  },
  {
    name: "محمد الطيب",
    location: "وادي حلفا",
    text: "خدمة العملاء سريعة جداً ومحترمة. حجزت تذكرتي في دقايق ووصلتني التفاصيل على واتساب فوراً. أنصح الجميع بالتعامل معاهم.",
    rating: 4,
    avatar: "م"
  }
];

const FEATURES = [
  { icon: "❄️", title: "تكييف ممتاز", desc: "أحدث أنظمة التكييف لرحلة مريحة في كل الأوقات" },
  { icon: "📶", title: "واي فاي مجاني", desc: "اتصال إنترنت عالي السرعة طوال الرحلة" },
  { icon: "🔌", title: "شواحن USB", desc: "منافذ شحن لكل راكب حتى لا تنقطع بطاريتك" },
  { icon: "☕", title: "ضيافة متميزة", desc: "مشروبات ساخنة وباردة وماء معدني مجاناً" },
  { icon: "🛡️", title: "أمان تام", desc: "سائقون محترفون وباصات مجهزة بأنظمة السلامة" },
  { icon: "💰", title: "أفضل الأسعار", desc: "أسعار تنافسية مع عروض خاصة للمجموعات" },
];

export default function Home() {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [copied, setCopied] = useState(false);
  const [travelDate, setTravelDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(VODAFONE_CASH_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const featureIcons: { [key: string]: JSX.Element } = {
    'WiFi': <WifiIcon className="w-3.5 h-3.5 text-sky-400" />,
    'تكييف': <span className="text-sm">❄️</span>,
    'قهوة': <span className="text-sm">☕️</span>,
    'شاحن': <span className="text-sm">🔌</span>,
    'ماء': <span className="text-sm">💧</span>,
  };

  const filteredTrips = TRIPS_DATA.filter((trip) => {
    const matchesSearch = trip.to.includes(searchQuery) || trip.from.includes(searchQuery);
    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "vip") return matchesSearch && trip.busType.includes("VIP");
    if (activeFilter === "economy") return matchesSearch && trip.busType.includes("سياحي");
    if (activeFilter === "hot") return matchesSearch && trip.badge === "الأكثر طلباً";
    return matchesSearch;
  });

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTrip) return;

    const message = `أهلاً *وكالة ذهب للسفريات* 👋\nحابب أأكد حجز رحلة جديدة:\n\n📌 *الوجهة:* من ${selectedTrip.from} إلى ${selectedTrip.to}\n📅 *تاريخ السفر:* ${travelDate}\n👤 *الاسم:* ${name}\n📞 *الواتساب:* ${phone}\n👥 *عدد التذاكر:* ${passengers}\n💰 *إجمالي التكلفة:* ${selectedTrip.price * passengers} جنيه مصري\n💳 *تم الدفع عبر:* فودافون كاش`;

    sendToWhatsApp(message);
    setSelectedTrip(null);
    setName("");
    setPhone("");
    setPassengers(1);
    setTravelDate(new Date().toISOString().split("T")[0]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans dir-rtl" dir="rtl">

      {/* Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0b0f19]/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-slate-800/60' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <div className="bg-gradient-to-tr from-amber-500 to-yellow-600 w-10 h-10 rounded-2xl flex items-center justify-center font-black text-slate-950 text-lg shadow-lg shadow-amber-500/20">
              ذهب
            </div>
            <div>
              <h1 className="text-xl font-black tracking-wide text-white">
                وكالة <span className="text-amber-400">ذهب</span>
              </h1>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: "الرئيسية", id: "home" },
              { label: "مميزاتنا", id: "features" },
              { label: "الرحلات", id: "trips" },
              { label: "آراء العملاء", id: "testimonials" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-semibold text-slate-400 hover:text-amber-400 transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <button 
            onClick={() => scrollToSection("trips")}
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-bold px-5 py-2 rounded-xl transition shadow-lg shadow-amber-500/20 text-sm"
          >
            <SparklesIcon className="w-4 h-4" />
            احجز الآن
          </button>
        </div>
      </header>

      {/* Hero Section with Real Bus Image */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-14 px-6 text-center overflow-hidden">
        {/* Real Bus Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-bg.png')" }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f19]/70 via-[#0b0f19]/80 to-[#0b0f19] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(201,162,39,0.06),transparent_50%)] z-10" />

        <div className="relative z-20 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold px-4 py-1.5 rounded-full mb-6 animate-fade-in">
            <StarIcon className="w-3.5 h-3.5" />
            <span>وكالة موثوقة منذ 2018</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 animate-fade-in-up">
            رحلات يومية إلى <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">السودان</span><br/>
            بأفضل الأسعار
          </h2>

          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            حجز تذاكر باصات مكيفة وVIP من القاهرة إلى جميع مدن السودان. راحة وأمان وخدمة متميزة على مدار الساعة.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <button 
              onClick={() => scrollToSection("trips")}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black py-3.5 px-8 rounded-2xl transition shadow-xl shadow-amber-500/25 text-base"
            >
              🎫 استعرض الرحلات
            </button>
            <a 
              href={`https://wa.me/${AGENCY_WHATSAPP_NUMBERS[0]}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-white font-bold py-3.5 px-8 rounded-2xl transition border border-slate-700 text-base"
            >
              📞 اتصل بنا
            </a>
          </div>

          {/* Search */}
          <div className="relative max-w-xl mx-auto mb-12 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <MagnifyingGlassIcon className="w-5 h-5 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ابحث عن المدينة (الخرطوم، بورتسودان، دنقلا...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/70 rounded-2xl py-4 pr-12 pl-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors shadow-2xl"
            />
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 justify-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            {[
              { num: "+50K", label: "راكب سعيد" },
              { num: "+500", label: "رحلة شهرياً" },
              { num: "4.9", label: "تقييم العملاء" },
              { num: "24/7", label: "خدمة العملاء" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-amber-400">{stat.num}</div>
                <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-[#0f1525]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              لماذا <span className="text-amber-400">وكالة ذهب</span>؟
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              نحن نقدم تجربة سفر فريدة تجمع بين الراحة والأمان وبأفضل الأسعار
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div 
                key={i}
                className="group bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-400 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trips Section */}
      <section id="trips" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              جدول <span className="text-amber-400">الرحلات</span> والأسعار
            </h2>
            <p className="text-slate-400">اختر الرحلة المناسبة لك واحجز مقعدك الآن</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {[
              { key: "all", label: "الكل" },
              { key: "vip", label: "VIP" },
              { key: "economy", label: "سياحي مكيف" },
              { key: "hot", label: "🔥 الأكثر طلباً" },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeFilter === filter.key
                    ? "bg-amber-500/15 text-amber-400 border border-amber-500 shadow-lg shadow-amber-500/10"
                    : "bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-600"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Trips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => (
              <div 
                key={trip.id} 
                className="group bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 hover:-translate-y-2"
              >
                {/* Trip Image Area */}
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src="/images/bus-vip.png" 
                    alt={trip.busType}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  {trip.badge && (
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-lg text-[11px] font-black z-10 ${
                      trip.badge === "الأكثر طلباً" 
                        ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30" 
                        : "bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 shadow-lg shadow-amber-500/30"
                    }`}>
                      {trip.badge === "الأكثر طلباً" ? "🔥 " : "⭐ "}{trip.badge}
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-slate-800 text-slate-300 text-xs font-bold px-3 py-1 rounded-full border border-slate-700">
                      {trip.busType}
                    </span>
                    <div className="text-left">
                      <span className="text-2xl font-black text-amber-400">{trip.price.toLocaleString()}</span>
                      <span className="text-xs text-slate-400 mr-1">ج.م</span>
                    </div>
                  </div>

                  <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/80 mb-4">
                    <div className="flex justify-between items-center text-white font-bold text-sm">
                      <span className="text-slate-300">{trip.from}</span>
                      <span className="text-amber-400 text-lg mx-2">↔️</span>
                      <span className="text-amber-400">{trip.to}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 text-center mt-1">رحلات يومية متوفرة</p>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {trip.features.map((f) => (
                        <span key={f} className="flex items-center gap-1 bg-slate-800/50 px-2 py-1 rounded-lg text-[11px] text-slate-300 border border-slate-700/50">
                          {featureIcons[f]} {f}
                        </span>
                      ))}
                    </div>
                    <span className={`text-[11px] font-bold px-2 py-1 rounded-md whitespace-nowrap ${
                      trip.availableSeats <= 3 
                        ? "text-red-400 bg-red-500/10 border border-red-500/20" 
                        : "text-amber-400/90 bg-amber-500/10 border border-amber-500/20"
                    }`}>
                      🪑 متبقي {trip.availableSeats}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedTrip(trip)}
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black py-3 rounded-2xl transition shadow-lg shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <SparklesIcon className="w-4 h-4" />
                    احجز الآن
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredTrips.length === 0 && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-slate-300 mb-2">لا توجد رحلات مطابقة</h3>
              <p className="text-slate-500">جرب البحث بكلمة مختلفة أو غيّر الفلتر</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-[#0f1525]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              ماذا يقول <span className="text-amber-400">عملاؤنا</span>؟
            </h2>
            <p className="text-slate-400">ثقة آلاف الركاب تدفعنا للتميز كل يوم</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 relative hover:border-amber-500/20 transition-all duration-300">
                <div className="absolute top-4 right-4 text-5xl text-amber-500/10 font-black leading-none">"</div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <StarIcon key={j} className={`w-4 h-4 ${j < t.rating ? "text-amber-400" : "text-slate-700"}`} />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 relative z-10">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center font-black text-slate-950 text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    <span className="text-xs text-slate-500">{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,162,39,0.05),transparent_70%)]" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            جاهز لـ <span className="text-amber-400">رحلتك</span> القادمة؟
          </h2>
          <p className="text-slate-400 mb-8">
            احجز مقعدك الآن واستمتع بتجربة سفر فريدة مع وكالة ذهب للسفريات
          </p>
          <button 
            onClick={() => scrollToSection("trips")}
            className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black py-4 px-10 rounded-2xl transition shadow-xl shadow-amber-500/25 text-lg"
          >
            📅 احجز تذكرتك الآن
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080c14] border-t border-slate-800/60 pt-16 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-tr from-amber-500 to-yellow-600 w-10 h-10 rounded-2xl flex items-center justify-center font-black text-slate-950 text-lg">
                  ذهب
                </div>
                <h3 className="text-xl font-black text-white">وكالة ذهب</h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                رحلات يومية مريحة وآمنة من القاهرة إلى جميع مدن السودان. نسعى دائماً لتقديم أفضل تجربة سفر.
              </p>
              <div className="flex gap-2">
                {["facebook", "whatsapp", "instagram"].map((social) => (
                  <a 
                    key={social}
                    href={`https://wa.me/${AGENCY_WHATSAPP_NUMBERS[0]}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500 transition-all"
                  >
                    {social === "facebook" && <span className="text-sm">📘</span>}
                    {social === "whatsapp" && <span className="text-sm">💬</span>}
                    {social === "instagram" && <span className="text-sm">📷</span>}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-amber-400 font-bold text-sm mb-4">روابط سريعة</h4>
              <ul className="space-y-2.5">
                {["الرئيسية", "مميزاتنا", "الرحلات", "آراء العملاء"].map((link) => (
                  <li key={link}>
                    <button onClick={() => scrollToSection(link === "الرئيسية" ? "home" : link === "مميزاتنا" ? "features" : link === "الرحلات" ? "trips" : "testimonials")} className="text-sm text-slate-500 hover:text-amber-400 transition-colors">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-amber-400 font-bold text-sm mb-4">الوجهات</h4>
              <ul className="space-y-2.5">
                {["القاهرة ↔ الخرطوم", "القاهرة ↔ بورتسودان", "القاهرة ↔ كسلا", "القاهرة ↔ دنقلا"].map((route) => (
                  <li key={route} className="text-sm text-slate-500">{route}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-amber-400 font-bold text-sm mb-4">تواصل معنا</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-slate-500">
                  <PhoneIcon className="w-4 h-4 text-amber-500/60" />
                  01034971059
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-500">
                  <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4 text-amber-500/60" />
                  واتساب متاح 24/7
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPinIcon className="w-4 h-4 text-amber-500/60" />
                  القاهرة، مصر
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800/60 pt-6 text-center">
            <p className="text-xs text-slate-600">
              © 2026 وكالة ذهب للسفريات — جميع الحقوق محفوظة | تصميم وتطوير <span className="text-amber-500/60">نصر الدين</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      {selectedTrip && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-[#121827] border border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-modal-in">

            <button
              onClick={() => setSelectedTrip(null)}
              className="absolute top-5 left-5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-1.5 rounded-full transition"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h3 className="text-xl font-black text-white mb-1">تأكيد الحجز</h3>
              <p className="text-xs text-slate-400">
                رحلة إلى <span className="text-amber-400 font-bold">{selectedTrip.to}</span> بسعر <span className="text-emerald-400 font-bold">{selectedTrip.price.toLocaleString()} ج.م</span>
              </p>
            </div>

            {/* Trip Summary Card */}
            <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-500">الوجهة</span>
                <span className="text-sm font-bold text-white">{selectedTrip.from} ↔ {selectedTrip.to}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-500">نوع الباص</span>
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">{selectedTrip.busType}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedTrip.features.map((f) => (
                  <span key={f} className="flex items-center gap-1 bg-slate-800/50 px-2 py-0.5 rounded text-[10px] text-slate-400">
                    {featureIcons[f]} {f}
                  </span>
                ))}
              </div>
            </div>

            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">الاسم بالكامل</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pr-10 pl-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition"
                    placeholder="اسمك الثلاثي"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">رقم التواصل / الواتساب</label>
                <div className="relative">
                  <PhoneIcon className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pr-10 pl-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition"
                    placeholder="01xxxxxxxxx"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">عدد التذاكر</label>
                  <div className="relative">
                    <UserGroupIcon className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={passengers}
                      onChange={(e) => setPassengers(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pr-10 pl-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">تاريخ السفر</label>
                  <input
                    type="date"
                    required
                    value={travelDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Schedule */}
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <ClockIcon className="w-4 h-4 text-amber-400" />
                  <h4 className="text-xs font-black text-amber-400 uppercase tracking-wide">مواعيد الرحلة</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#0b0f19] border border-slate-700 rounded-xl p-3 text-center">
                    <p className="text-xs text-slate-400 mb-1">الحضور</p>
                    <p className="text-lg font-black text-amber-400">3:00 م</p>
                  </div>
                  <div className="bg-[#0b0f19] border border-slate-700 rounded-xl p-3 text-center">
                    <p className="text-xs text-slate-400 mb-1">القيام</p>
                    <p className="text-lg font-black text-emerald-400">6:00 م</p>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">التكلفة الإجمالية:</span>
                <span className="text-xl font-black text-emerald-400">{(selectedTrip.price * passengers).toLocaleString()} ج.م</span>
              </div>

              {/* Vodafone Cash */}
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <CreditCardIcon className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-black text-amber-400">الدفع عبر فودافون كاش</h4>
                </div>

                <div className="flex items-center justify-between bg-[#0b0f19] border border-amber-500/40 rounded-xl px-4 py-3">
                  <span className="font-mono font-black text-white tracking-widest text-base">
                    {VODAFONE_CASH_NUMBER}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyNumber}
                    className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                      copied
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20"
                    }`}
                  >
                    {copied ? (
                      <>
                        <CheckBadgeIcon className="w-3.5 h-3.5" />
                        تم النسخ
                      </>
                    ) : (
                      <>
                        <span className="text-sm">📋</span>
                        نسخ الرقم
                      </>
                    )}
                  </button>
                </div>

                <ol className="space-y-1.5 text-xs text-slate-300 list-none">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-black">١.</span>
                    <span>حوّل المبلغ على الرقم أعلاه عبر <span className="text-amber-400 font-bold">فودافون كاش</span></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-black">٢.</span>
                    <span>التقط صورة لإيصال التحويل</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-black">٣.</span>
                    <span>أرسل الصورة عبر <span className="text-emerald-400 font-bold">الواتساب</span> لتأكيد الحجز</span>
                  </li>
                </ol>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" />
                متابعة الحجز عبر الواتساب
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating WhatsApp */}
      <a 
        href={`https://wa.me/${AGENCY_WHATSAPP_NUMBERS[0]}`}
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 transition transform hover:scale-105"
      >
        <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6" />
        <span className="text-xs font-bold hidden sm:inline">خدمة العملاء</span>
      </a>

      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <ArrowUpIcon className="w-5 h-5" />
      </button>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes modal-in {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease forwards;
        }
        .animate-modal-in {
          animation: modal-in 0.4s ease forwards;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </main>
  );
}
