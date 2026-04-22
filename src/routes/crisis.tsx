import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import lakeChadImg from "@/assets/lake-chad.jpg";
import hornAfricaImg from "@/assets/horn-africa-drought.jpg";
import southernAfricaImg from "@/assets/southern-africa-drought.jpg";

export const Route = createFileRoute("/crisis")({
  component: CrisisPage,
  head: () => ({
    meta: [
      { title: "Thực trạng khủng hoảng nước sạch tại Châu Phi — 2026" },
      { name: "description", content: "Dữ liệu thực tế 2025-2026 về tình hình nước sạch tại Châu Phi — UNICEF, WHO, World Bank, UN-Water." },
    ],
  }),
});

const stats = [
  { number: 411, suffix: "M", desc: "người thiếu nước sạch tại Châu Phi", source: "UNICEF/WHO JMP 2026" },
  { number: 1000, suffix: "+", desc: "trẻ em <5 tuổi chết mỗi ngày vì nước bẩn", source: "WHO 2026" },
  { number: 42, suffix: "%", desc: "dân Châu Phi đi bộ >30 phút lấy nước", source: "World Bank 2026" },
  { number: 80, suffix: "%", desc: "bệnh tật ở Châu Phi do nước ô nhiễm", source: "UN-Water 2026" },
  { number: 115, suffix: "M", desc: "trẻ em không có toilet an toàn", source: "UNICEF WASH 2026" },
  { number: 72, suffix: "%", desc: "nước ngầm Châu Phi chưa khai thác", source: "BGR/UNICEF 2026" },
  { number: 200, suffix: "M giờ", desc: "phụ nữ đi lấy nước mỗi ngày", source: "UN Women 2026" },
  { number: 90, suffix: "%", desc: "Hồ Chad đã biến mất trong 60 năm", source: "NASA Earth 2026" },
  { number: 36, suffix: "M", desc: "người Đông Phi đói vì hạn hán", source: "WFP 2026" },
];

const countries = [
  { flag: "🇸🇴", name: "Somalia", access: 23, deaths: "1/5", status: "Nguy cấp" },
  { flag: "🇪🇹", name: "Ethiopia", access: 31, deaths: "1/6", status: "Nguy cấp" },
  { flag: "🇪🇷", name: "Eritrea", access: 19, deaths: "1/4", status: "Khẩn cấp" },
  { flag: "🇸🇩", name: "Sudan", access: 27, deaths: "1/5", status: "Khẩn cấp" },
  { flag: "🇹🇩", name: "Chad", access: 28, deaths: "1/6", status: "Nguy cấp" },
  { flag: "🇳🇪", name: "Niger", access: 32, deaths: "1/7", status: "Cao" },
  { flag: "🇲🇿", name: "Mozambique", access: 38, deaths: "1/8", status: "Cao" },
  { flag: "🇲🇬", name: "Madagascar", access: 36, deaths: "1/7", status: "Cao" },
  { flag: "🇲🇼", name: "Malawi", access: 41, deaths: "1/9", status: "Trung bình" },
  { flag: "🇿🇼", name: "Zimbabwe", access: 44, deaths: "1/10", status: "Trung bình" },
  { flag: "🇺🇬", name: "Uganda", access: 48, deaths: "1/11", status: "Trung bình" },
  { flag: "🇰🇪", name: "Kenya", access: 56, deaths: "1/13", status: "Cảnh báo" },
];

const regions = [
  {
    name: "Vùng Sừng Châu Phi",
    countries: "Ethiopia, Somalia, Kenya, Djibouti, Eritrea",
    population: "130 triệu người bị ảnh hưởng",
    waterAccess: "26%",
    crisis: "Đợt hạn hán kéo dài 6 mùa liên tiếp — tồi tệ nhất trong 40 năm. 23 triệu người đối mặt nạn đói cực độ. UN cảnh báo \"thảm hoạ chưa từng có\".",
    childDeath: "1/6 trẻ em tử vong trước 5 tuổi",
    image: hornAfricaImg,
    source: "UNICEF East Africa 2026",
    temp: "Nhiệt độ tăng 1.5°C so với trung bình 30 năm",
    extra: "Sông Awash khô cạn lần đầu tiên. 13.2 triệu trẻ em cần hỗ trợ nhân đạo khẩn cấp.",
  },
  {
    name: "Hồ Chad & Tây Phi",
    countries: "Nigeria, Niger, Chad, Cameroon, Mali",
    population: "164 triệu người bị ảnh hưởng",
    waterAccess: "35%",
    crisis: "Hồ Chad mất 90% diện tích trong 60 năm (25,000km² → 2,500km²). 10 triệu người mất nguồn sinh kế. Boko Haram lợi dụng khủng hoảng nước.",
    childDeath: "1/8 trẻ em tử vong trước 5 tuổi",
    image: lakeChadImg,
    source: "WHO West Africa 2026",
    temp: "Sahara mở rộng 10% kể từ 1920",
    extra: "Lũ lụt Nigeria 2024 phá huỷ 1.5 triệu nhà. Mùa mưa thất thường, hạn hán & lũ xen kẽ.",
  },
  {
    name: "Miền Nam Châu Phi",
    countries: "Mozambique, Zimbabwe, Zambia, Malawi, Madagascar",
    population: "89 triệu người bị ảnh hưởng",
    waterAccess: "41%",
    crisis: "Cape Town suýt cạn nước (Day Zero 2018). Mozambique hứng 5 siêu bão trong 4 năm phá hủy hạ tầng nước. Madagascar: nạn đói khí hậu đầu tiên thế giới.",
    childDeath: "1/12 trẻ em tử vong trước 5 tuổi",
    image: southernAfricaImg,
    source: "World Bank Southern Africa 2026",
    temp: "Lượng mưa giảm 30% trong 30 năm qua",
    extra: "Cyclone Idai 2019 phá huỷ hạ tầng nước cho 3 triệu người. El Niño 2024 gây hạn hán nặng nhất 100 năm.",
  },
];

const timeline = [
  { year: "1960", event: "Hồ Chad rộng 25,000km² — nguồn sống của 30 triệu người", type: "neutral" },
  { year: "1984", event: "Nạn đói Ethiopia — 1.2 triệu người chết, thế giới lần đầu nhìn thấy khủng hoảng nước Châu Phi", type: "danger" },
  { year: "1990", event: "WHO cảnh báo khủng hoảng nước Châu Phi lần đầu — 280M người không có nước sạch", type: "warning" },
  { year: "2000", event: "Mục tiêu Phát triển Thiên niên kỷ — cam kết giảm 50% người thiếu nước vào 2015", type: "neutral" },
  { year: "2010", event: "Hồ Chad chỉ còn 2,500km² — mất 90% diện tích. LHQ tuyên bố 'thập kỷ nước'", type: "danger" },
  { year: "2015", event: "LHQ đặt Mục tiêu Nước sạch SDG 6 — hạn chót 2030 cho mọi người có nước sạch", type: "neutral" },
  { year: "2018", event: "Cape Town gần Day Zero — thành phố lớn đầu tiên suýt cạn nước hoàn toàn", type: "danger" },
  { year: "2019", event: "Cyclone Idai phá huỷ hạ tầng nước Mozambique — 3 triệu người không có nước", type: "danger" },
  { year: "2021", event: "Madagascar — nạn đói đầu tiên trên thế giới do biến đổi khí hậu (theo WFP)", type: "danger" },
  { year: "2022", event: "Đông Phi: Hạn hán tồi tệ nhất 40 năm — 36 triệu người đói, 1.4M trẻ em suy dinh dưỡng cấp tính", type: "danger" },
  { year: "2024", event: "Sudan: Chiến tranh phá hủy 70% hạ tầng nước — 25 triệu người khủng hoảng", type: "danger" },
  { year: "2025", event: "Đợt hạn hán thứ 6 liên tiếp tại Sừng Châu Phi — kỷ lục mới của khí hậu", type: "danger" },
  { year: "2026", event: "411 triệu người Châu Phi vẫn chưa có nước sạch — không kịp đạt SDG 6 năm 2030", type: "danger" },
];

const waterComparison = [
  { label: "1 người Châu Phi/ngày", value: 5, color: "var(--urgent)", emoji: "🏚️" },
  { label: "1 lần xả toilet (VN)", value: 9, color: "var(--water)", emoji: "🚽" },
  { label: "1 lần tắm (VN)", value: 60, color: "var(--water-light)", emoji: "🚿" },
  { label: "1 lần giặt máy", value: 80, color: "var(--water-deep)", emoji: "👕" },
  { label: "1 người VN/ngày", value: 165, color: "var(--teal)", emoji: "🇻🇳" },
  { label: "1 người Mỹ/ngày", value: 300, color: "var(--ocean)", emoji: "🇺🇸" },
];

const climateImpact = [
  { icon: "🌡️", title: "Nhiệt độ Châu Phi", value: "+1.5°C", desc: "Tăng nhanh hơn mức trung bình toàn cầu 1.4 lần", source: "IPCC AR6 2026" },
  { icon: "🏜️", title: "Sa mạc hoá", value: "65%", desc: "diện tích đất Châu Phi đang bị suy thoái", source: "UNCCD 2026" },
  { icon: "🌊", title: "Mực nước biển dâng", value: "4mm/năm", desc: "ven biển Tây Phi — nhanh gấp đôi trung bình", source: "NASA 2026" },
  { icon: "🌧️", title: "Mưa giảm", value: "-20%", desc: "lượng mưa Đông Phi 30 năm qua", source: "WMO 2026" },
];

const economicImpact = [
  { stat: "$260 tỷ/năm", desc: "Châu Phi mất do thiếu nước sạch & vệ sinh", source: "WHO Economic Impact 2026" },
  { stat: "5%", desc: "GDP Châu Phi mất hàng năm vì khủng hoảng nước", source: "World Bank 2026" },
  { stat: "443M ngày", desc: "ngày học bị mất mỗi năm vì bệnh liên quan nước", source: "UNICEF Education 2026" },
  { stat: "21 quốc gia", desc: "Châu Phi sẽ gặp 'stress nước' nghiêm trọng vào 2030", source: "WRI Aqueduct 2026" },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    tick();
  }, [started, target]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return <span ref={ref}>{display.toLocaleString("vi-VN")}{suffix}</span>;
}

function CrisisPage() {
  const [activeRegion, setActiveRegion] = useState(-1);
  const [showCompare, setShowCompare] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showImpact, setShowImpact] = useState(false);
  const [showCountries, setShowCountries] = useState(false);
  const [showClimate, setShowClimate] = useState(false);
  const [showEconomic, setShowEconomic] = useState(false);

  return (
    <main className="pt-14 min-h-screen bg-background">
      {/* HERO — Bright, clear, professional */}
      <div className="relative h-[70vh] min-h-[480px] flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=1920&q=90&auto=format" alt="Hạn hán Châu Phi" className="absolute inset-0 w-full h-full object-cover" />
        {/* darker, sharper overlay so text reads crisp */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/40" />
        <div className="relative z-10 max-w-6xl mx-auto px-5 pb-16 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/" className="inline-flex items-center gap-1.5 text-white/70 text-xs mb-6 hover:text-white transition-colors font-semibold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Trang chủ
            </Link>
            <p className="text-cyan-300 text-[11px] tracking-[0.35em] uppercase mb-4 font-bold">Phần 01 · Thực trạng</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight">
              KHỦNG HOẢNG NƯỚC SẠCH
            </h1>
            <p className="text-white/85 text-sm md:text-base mt-6 max-w-xl leading-relaxed">
              411 triệu người Châu Phi đang sống trong khát.
              Dữ liệu thực tế 2025-2026 từ UNICEF, WHO, World Bank, UN-Water.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-20 space-y-20">
        {/* Stats grid — 9 stats */}
        <section>
          <h2 className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-8 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-water rounded-full" /> 9 Số liệu chấn động
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-card border border-border rounded-2xl p-5 md:p-6 hover:border-water/40 hover:shadow-[var(--shadow-glow-water)] transition-all duration-500 group"
              >
                <div className="text-3xl md:text-5xl font-black counter-display gradient-text-water tracking-tight">
                  <AnimatedNumber target={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{stat.desc}</p>
                <p className="text-[10px] text-water/60 mt-3 pt-3 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity">📎 {stat.source}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Regions */}
        <section>
          <h2 className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-8 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-destructive rounded-full" /> 3 Vùng nguy cấp nhất
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {regions.map((region, i) => (
              <div key={i}>
                <button onClick={() => setActiveRegion(activeRegion === i ? -1 : i)} className="w-full text-left group">
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/5]">
                    <img src={region.image} alt={region.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute inset-0 p-5 flex flex-col justify-end">
                      <div className="inline-flex items-center gap-2 mb-2 self-start px-2.5 py-1 rounded-full bg-destructive/20 backdrop-blur border border-destructive/40 text-destructive-foreground text-[10px] font-bold">
                        ⚠ Khẩn cấp
                      </div>
                      <h3 className="text-white font-black text-xl leading-tight">{region.name}</h3>
                      <p className="text-white/50 text-xs mt-1">{region.countries}</p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <motion.div
                        animate={{ rotate: activeRegion === i ? 45 : 0 }}
                        className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white text-base font-bold"
                      >
                        +
                      </motion.div>
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {activeRegion === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden mt-2"
                    >
                      <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
                        <div className="grid grid-cols-2 gap-2.5">
                          <div className="bg-secondary/50 rounded-xl p-3">
                            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Dân số</div>
                            <div className="text-sm font-bold mt-0.5 text-water">{region.population}</div>
                          </div>
                          <div className="bg-secondary/50 rounded-xl p-3">
                            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Nước sạch</div>
                            <div className="text-sm font-bold mt-0.5 text-destructive">{region.waterAccess}</div>
                          </div>
                          <div className="bg-secondary/50 rounded-xl p-3">
                            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Tử vong trẻ</div>
                            <div className="text-sm font-bold mt-0.5 text-destructive">{region.childDeath}</div>
                          </div>
                          <div className="bg-secondary/50 rounded-xl p-3">
                            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Khí hậu</div>
                            <div className="text-sm font-bold mt-0.5 text-earth">{region.temp}</div>
                          </div>
                        </div>
                        <div className="pt-3 border-t border-border">
                          <p className="text-sm leading-relaxed">{region.crisis}</p>
                          <p className="text-xs text-muted-foreground mt-3 italic">{region.extra}</p>
                          <p className="text-[10px] text-water/60 mt-3">📎 {region.source}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Countries leaderboard */}
        <section>
          <button
            onClick={() => setShowCountries(!showCountries)}
            className="w-full text-left bg-card border border-border rounded-2xl p-5 flex items-center justify-between hover:border-water/40 transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌍</span>
              <div>
                <h3 className="font-bold">12 quốc gia khủng hoảng nhất Châu Phi</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Bảng xếp hạng tiếp cận nước sạch — UNICEF 2026</p>
              </div>
            </div>
            <motion.span animate={{ rotate: showCountries ? 180 : 0 }} className="text-muted-foreground">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </motion.span>
          </button>

          <AnimatePresence>
            {showCountries && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="bg-card border border-border border-t-0 rounded-b-2xl p-6">
                  <div className="space-y-2">
                    {countries.map((c, i) => (
                      <motion.div
                        key={c.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/60 transition-colors"
                      >
                        <span className="text-xs font-mono text-muted-foreground w-6">{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-2xl">{c.flag}</span>
                        <div className="flex-1">
                          <p className="text-sm font-bold">{c.name}</p>
                          <div className="w-full h-1.5 bg-secondary rounded-full mt-1.5 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${c.access}%` }}
                              transition={{ duration: 0.8, delay: 0.2 + i * 0.04 }}
                              className="h-full bg-gradient-to-r from-destructive via-earth to-water rounded-full"
                            />
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-black gradient-text-water">{c.access}%</p>
                          <p className="text-[9px] text-destructive">{c.deaths} chết</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-center text-[10px] text-muted-foreground mt-5 pt-4 border-t border-border">
                    📎 UNICEF/WHO Joint Monitoring Programme 2026 · % dân số có nước sạch · Tỷ lệ tử vong trẻ &lt;5 tuổi
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Climate impact */}
        <section>
          <button
            onClick={() => setShowClimate(!showClimate)}
            className="w-full text-left bg-card border border-border rounded-2xl p-5 flex items-center justify-between hover:border-water/40 transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌡️</span>
              <div>
                <h3 className="font-bold">Tác động biến đổi khí hậu</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Châu Phi nóng nhanh hơn mức trung bình toàn cầu</p>
              </div>
            </div>
            <motion.span animate={{ rotate: showClimate ? 180 : 0 }} className="text-muted-foreground">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </motion.span>
          </button>
          <AnimatePresence>
            {showClimate && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="bg-card border border-border border-t-0 rounded-b-2xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {climateImpact.map((c, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="bg-gradient-to-br from-destructive/5 to-earth/5 border border-destructive/20 rounded-xl p-5"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-3xl">{c.icon}</span>
                          <div className="flex-1">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">{c.title}</p>
                            <p className="text-2xl font-black text-destructive mt-1">{c.value}</p>
                            <p className="text-xs text-muted-foreground mt-2">{c.desc}</p>
                            <p className="text-[10px] text-water/60 mt-2">📎 {c.source}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Economic impact */}
        <section>
          <button
            onClick={() => setShowEconomic(!showEconomic)}
            className="w-full text-left bg-card border border-border rounded-2xl p-5 flex items-center justify-between hover:border-water/40 transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">💰</span>
              <div>
                <h3 className="font-bold">Thiệt hại kinh tế</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Châu Phi mất 5% GDP/năm vì khủng hoảng nước</p>
              </div>
            </div>
            <motion.span animate={{ rotate: showEconomic ? 180 : 0 }} className="text-muted-foreground">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </motion.span>
          </button>
          <AnimatePresence>
            {showEconomic && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="bg-card border border-border border-t-0 rounded-b-2xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {economicImpact.map((c, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="bg-secondary/40 border border-border rounded-xl p-5"
                      >
                        <p className="text-3xl font-black gradient-text-mixed">{c.stat}</p>
                        <p className="text-xs text-muted-foreground mt-2">{c.desc}</p>
                        <p className="text-[10px] text-water/60 mt-3 pt-3 border-t border-border">📎 {c.source}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Timeline */}
        <section>
          <button
            onClick={() => setShowTimeline(!showTimeline)}
            className="w-full text-left bg-card border border-border rounded-2xl p-5 flex items-center justify-between hover:border-water/40 transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">⏳</span>
              <div>
                <h3 className="font-bold">Dòng thời gian khủng hoảng — 66 năm sụp đổ</h3>
                <p className="text-xs text-muted-foreground mt-0.5">13 cột mốc từ 1960 đến 2026</p>
              </div>
            </div>
            <motion.span animate={{ rotate: showTimeline ? 180 : 0 }} className="text-muted-foreground">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </motion.span>
          </button>

          <AnimatePresence>
            {showTimeline && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="bg-card border border-border border-t-0 rounded-b-2xl p-6">
                  <div className="relative">
                    <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-water via-destructive to-destructive/50" />
                    <div className="space-y-5">
                      {timeline.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="flex gap-4 items-start"
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-lg ${
                            item.type === "danger" ? "bg-destructive shadow-destructive/30" : item.type === "warning" ? "bg-earth shadow-earth/30" : "bg-water shadow-water/30"
                          }`}>
                            {item.year.slice(2)}
                          </div>
                          <div className="pt-2 flex-1">
                            <span className="text-xs font-bold text-muted-foreground">{item.year}</span>
                            <p className="text-sm mt-0.5 leading-relaxed">{item.event}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Water comparison */}
        <section>
          <button
            onClick={() => setShowCompare(!showCompare)}
            className="w-full text-left bg-card border border-border rounded-2xl p-5 flex items-center justify-between hover:border-water/40 transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚖️</span>
              <div>
                <h3 className="font-bold">So sánh lượng nước: Châu Phi vs Thế giới</h3>
                <p className="text-xs text-muted-foreground mt-0.5">5 lít/ngày vs 300 lít/ngày — chênh lệch 60 lần</p>
              </div>
            </div>
            <motion.span animate={{ rotate: showCompare ? 180 : 0 }} className="text-muted-foreground">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </motion.span>
          </button>

          <AnimatePresence>
            {showCompare && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="bg-card border border-border border-t-0 rounded-b-2xl p-6">
                  <div className="space-y-3">
                    {waterComparison.map((item, i) => {
                      const pct = (item.value / 300) * 100;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="flex items-center gap-3"
                        >
                          <span className="text-lg w-8 text-center">{item.emoji}</span>
                          <div className="flex-1">
                            <div className="flex justify-between items-baseline mb-1">
                              <span className="text-xs">{item.label}</span>
                              <span className="text-sm font-bold counter-display" style={{ color: item.color }}>{item.value}L</span>
                            </div>
                            <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 0.8, delay: 0.2 + i * 0.08, type: "spring" }}
                                className="h-full rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                  <p className="text-center text-[10px] text-muted-foreground mt-6 pt-4 border-t border-border">
                    📎 UN-Water / World Bank / UNICEF 2026
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Impact on children */}
        <section>
          <button
            onClick={() => setShowImpact(!showImpact)}
            className="w-full text-left bg-card border border-border rounded-2xl p-5 flex items-center justify-between hover:border-destructive/40 transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">👶</span>
              <div>
                <h3 className="font-bold">Tác động lên trẻ em & phụ nữ</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Những nạn nhân thầm lặng của cuộc khủng hoảng</p>
              </div>
            </div>
            <motion.span animate={{ rotate: showImpact ? 180 : 0 }} className="text-muted-foreground">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </motion.span>
          </button>

          <AnimatePresence>
            {showImpact && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="bg-card border border-border border-t-0 rounded-b-2xl overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="aspect-[4/3] md:aspect-auto">
                      <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80&auto=format" alt="Trẻ em Châu Phi" loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 space-y-4">
                      {[
                        { icon: "💀", stat: "1,000+ trẻ/ngày", text: "tử vong vì tiêu chảy do nước bẩn — nhiều hơn sốt rét, AIDS, sởi cộng lại" },
                        { icon: "🚶‍♀️", stat: "200 triệu giờ/ngày", text: "phụ nữ & trẻ em gái đi bộ lấy nước thay vì đến trường" },
                        { icon: "📚", stat: "443 triệu ngày học", text: "bị mất mỗi năm vì bệnh liên quan nước và thiếu toilet ở trường" },
                        { icon: "⚠️", stat: "50% bệnh nhân", text: "nằm viện tại Châu Phi là do bệnh liên quan đến nước ô nhiễm" },
                        { icon: "👧", stat: "1/3 nữ sinh", text: "bỏ học khi đến tuổi dậy thì vì thiếu nước & toilet riêng" },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex gap-3"
                        >
                          <span className="text-xl">{item.icon}</span>
                          <div>
                            <span className="text-sm font-bold text-destructive">{item.stat}</span>
                            <p className="text-xs text-muted-foreground mt-0.5">{item.text}</p>
                          </div>
                        </motion.div>
                      ))}
                      <p className="text-[10px] text-water/60 pt-3 border-t border-border">📎 UNICEF/WHO/World Bank 2026</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Quote cinema */}
        <section>
          <div className="relative rounded-3xl overflow-hidden aspect-[21/9] shadow-[var(--shadow-cinema)]">
            <img src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1600&q=85&auto=format" alt="Trẻ em uống nước" loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-14 max-w-2xl">
              <span className="text-5xl text-cyan-300/40 font-serif leading-none">"</span>
              <p className="text-white font-serif font-bold text-xl md:text-3xl leading-snug italic -mt-4">
                Mỗi 80 giây, một đứa trẻ ra đi vì các bệnh liên quan đến nước bẩn. Đây không phải số liệu — đây là sinh mạng.
              </p>
              <p className="text-white/40 text-xs mt-6">— UNICEF Water Crisis Report 2026</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center pt-8">
          <p className="text-sm text-muted-foreground mb-5">Thực trạng đã rõ. Giải pháp nào cho Châu Phi?</p>
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 px-9 py-4 bg-gradient-to-r from-leaf to-teal text-white rounded-full font-bold text-sm hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-[var(--shadow-glow-leaf)]"
          >
            Khám phá giải pháp
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-border py-10 text-center bg-secondary/20">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-xs text-muted-foreground">© 2026 Nhóm 10 — Đại học Văn Lang | Môi trường và Con người</p>
        </div>
      </footer>
    </main>
  );
}
