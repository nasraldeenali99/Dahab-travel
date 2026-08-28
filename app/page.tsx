"use client";

import { JSX, useState } from "react";
import { 
  CheckBadgeIcon, 
  SparklesIcon, 
  WifiIcon, 
  ChatBubbleOvalLeftEllipsisIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  UserIcon,
  PhoneIcon,
  UserGroupIcon
} from "@heroicons/react/24/solid";


const AGENCY_WHATSAPP_NUMBER = "+201034971059";


interface Trip {
  id: string;
  from: string;
  to: string;
  price: number;
  busType: string;
  availableSeats: number;
  features: string[];
}

const TRIPS_DATA: Trip[] = [
  { id: "1", from: "  القاهرة", to: "ارقين", price: 1200, busType: "سياحي مكيف", availableSeats: 8, features: ['تكييف', 'شاحن'] },
  { id: "2", from: " القاهرة", to: "دنقلا", price: 2300, busType: "VIP ممتاز", availableSeats: 6, features: ['WiFi', 'تكييف', 'شاحن'] },
  { id: "3", from: " القاهرة", to: "عطبره", price: 2900, busType: "VIP فخم", availableSeats: 5, features: ['WiFi', 'تكييف', 'قهوة', 'شاحن'] },
  { id: "4", from: " القاهرة", to: "امدرمان", price: 2900, busType: "VIP فخم", availableSeats: 4, features: ['WiFi', 'تكييف', 'شاحن'] },
  { id: "5", from: " القاهرة", to: "الخرطوم", price: 2900, busType: "VIP فخم", availableSeats: 4, features: ['WiFi', 'تكييف', 'شاحن'] },
  { id: "6", from: " القاهرة", to: "مدني", price: 3500, busType: "VIP فخم", availableSeats: 7, features: ['WiFi', 'تكييف', 'قهوة', 'شاحن'] },
  { id: "7", from: " القاهرة", to: "بورتسودان", price: 3800, busType: "VIP درجه أولي", availableSeats: 3, features: ['WiFi', 'تكييف', 'قهوة', 'شاحن', 'ماء'] },
  { id: "8", from: " القاهرة", to: "القضارف", price: 4200, busType: "VIP ممتاز", availableSeats: 5, features: ['WiFi', 'تكييف', 'شاحن'] },
  { id: "9", from: " القاهرة", to: "كسلا", price: 4000, busType: "VIP ممتاز", availableSeats: 6, features: ['WiFi', 'تكييف', 'شاحن'] },
  { id: "10", from: " القاهرة", to: "سنار", price: 4300, busType: "VIP ممتاز", availableSeats: 4, features: ['WiFi', 'تكييف', 'شاحن'] },
  { id: "11", from: " القاهرة", to: "سنجة", price: 4400, busType: "سياحي مكيف", availableSeats: 5, features: ['تكييف', 'شاحن'] },
  { id: "12", from: " القاهرة", to: "الابيض", price: 4400, busType: "سياحي مكيف", availableSeats: 6, features: ['تكييف', 'شاحن'] },
  { id: "13", from: " القاهرة", to: "الدمازين", price: 5200, busType: "VIP ممتاز", availableSeats: 3, features: ['WiFi', 'تكييف', 'قهوة', 'شاحن'] },
];

export default function Home() {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [passengers, setPassengers] = useState(1);

  const featureIcons: { [key: string]: JSX.Element } = {
    'WiFi': <WifiIcon className="w-4 h-4 text-sky-400" />,
    'تكييف': <span className="text-sm">❄️</span>,
    'قهوة': <span className="text-sm">☕️</span>,
    'شاحن': <span className="text-sm">🔌</span>,
    'ماء': <span className="text-sm">💧</span>,
  };

  const filteredTrips = TRIPS_DATA.filter(
    (trip) =>
      trip.from.includes(searchQuery) ||
      trip.to.includes(searchQuery)
  );

  const handleBooking = (e: React.FormEvent, number: string) => {
    e.preventDefault();
    if (!selectedTrip) return;

    const message = `أهلاً *وكالة ذهب للسفريات* 👋
حابب أأكد حجز رحلة جديدة:

📌 *الوجهة:* من ${selectedTrip.from} إلى ${selectedTrip.to}
👤 *الاسم:* ${name}
📞 *الواتساب:* ${phone}
👥 *عدد التذاكر:* ${passengers}
💰 *إجمالي التكلفة:* ${selectedTrip.price * passengers} جنيه مصري`;

    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank");
    setSelectedTrip(null);
    setName("");
    setPhone("");
    setPassengers(1);
  };

  return (
    <main className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans pb-20 dir-rtl" dir="rtl">
      
      {/* Header بدون لوجو صورة */}
      <header className="border-b border-slate-800/80 bg-[#0b0f19]/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-amber-500 to-yellow-600 w-10 h-10 rounded-2xl flex items-center justify-center font-black text-slate-950 text-lg shadow-lg shadow-amber-500/20">
              ذهب
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-wide text-white">
                وكالة <span className="text-amber-400">ذهب</span> للسفريات
              </h1>
              <p className="text-xs text-slate-400">رحلات يومية إلى مدن السودان المختلفة 🚌🇸🇩</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-xs text-slate-300">
            <CheckBadgeIcon className="w-4 h-4 text-emerald-400" />
            <span>عروض خاصة وحجز مباشر</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-10 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4">
          <SparklesIcon className="w-4 h-4" />
          <span>مواصلين في العروض 🔥</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
          احجز تذكرتك للسودان بأفضل الأسعار <br className="hidden sm:block"/>
          <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">مع وكالة ذهب للسفريات</span>
        </h2>
        
        {/* Search */}
        <div className="mt-8 relative max-w-lg mx-auto">
          <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ابحث عن المدينة (الخرطوم، بورتسودان، دنقلا...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-700/70 rounded-2xl py-3.5 pr-12 pl-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors shadow-xl"
          />
        </div>
      </section>

      {/* Trips Grid */}
      <section className="max-w-7xl mx-auto px-6 mt-4">
        <h3 className="text-xl font-bold text-slate-300 mb-6">جدول الرحلات والأسعار الحالية:</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <div 
              key={trip.id} 
              className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 group"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-slate-800 text-slate-300 text-xs font-semibold px-3 py-1 rounded-full border border-slate-700">
                    {trip.busType}
                  </span>
                  <div className="text-left">
                    <span className="text-2xl font-black text-emerald-400">{trip.price}</span>
                    <span className="text-xs text-slate-400 mr-1">ج.م</span>
                  </div>
                </div>

                <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-800/80 mb-4">
                  <div className="flex justify-between items-center text-white font-bold text-base mb-1">
                    <span>{trip.from}</span>
                    <span className="text-amber-400 text-xl font-light">↔️</span>
                    <span className="text-amber-400 font-extrabold">{trip.to}</span>
                  </div>
                  <p className="text-xs text-slate-400 text-center mt-2">رحلات يومية متوفرة</p>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div className="flex flex-wrap gap-2">
                    {trip.features.map((f) => (
                      <span key={f} className="flex items-center gap-1 bg-slate-800/50 px-2.5 py-1 rounded-lg text-xs text-slate-300 border border-slate-700/50">
                        {featureIcons[f]} {f}
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-amber-400/90 bg-amber-500/10 px-2 py-1 rounded-md border border-amber-500/20 whitespace-nowrap">
                    متبقي {trip.availableSeats} مقاعد
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedTrip(trip)}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black py-3.5 rounded-2xl transition shadow-lg shadow-amber-500/20 active:scale-95"
              >
                احجز الآن ✨
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Modal */}
      {selectedTrip && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#121827] border border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            
            <button
              onClick={() => setSelectedTrip(null)}
              className="absolute top-5 left-5 text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-full"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-white mb-1">تأكيد الحجز</h3>
            <p className="text-xs text-slate-400 mb-6">
              رحلة إلى <span className="text-amber-400 font-bold">{selectedTrip.to}</span> بسعر <span className="text-emerald-400 font-bold">{selectedTrip.price} ج.م</span>
            </p>

            <form onSubmit={(e) => handleBooking(e, AGENCY_WHATSAPP_NUMBER)} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">الاسم بالكامل</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pr-10 pl-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
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
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pr-10 pl-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    placeholder="01xxxxxxxxx"
                  />
                </div>
              </div>

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
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pr-10 pl-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex justify-between items-center my-4">
                <span className="text-xs text-slate-400">التكلفة الإجمالية:</span>
                <span className="text-xl font-black text-emerald-400">{selectedTrip.price * passengers} ج.م</span>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-emerald-600/20"
              >
                متابعة الحجز عبر الواتساب 💬
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${AGENCY_WHATSAPP_NUMBER}`}
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 transition transform hover:scale-105"
      >
        <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6" />
        <span className="text-xs font-bold hidden sm:inline">خدمة العملاء</span>
      </a>

    </main>
  );
}