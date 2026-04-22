import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const Route = createFileRoute("/solutions")({
  component: SolutionsPage,
  head: () => ({
    meta: [
      { title: "Giải pháp xanh — Nước là Sự sống 2026" },
      { name: "description", content: "5 công nghệ xanh đang mang nước sạch đến hàng triệu người Châu Phi — Solar, Rain, Filter, Forest, Desal." },
    ],
  }),
});

const solutions = [
  {
    id: "solar",
    icon: "☀️",
    label: "Năng lượng mặt trời",
    title: "Bơm nước năng lượng mặt trời",
    desc: "Hệ thống bơm nước sử dụng pin mặt trời để bơm nước ngầm lên mặt đất. Công nghệ này đã được triển khai tại 35 quốc gia Châu Phi, phục vụ hơn 7 triệu người.",
    impact: "Giảm 95% chi phí nhiên liệu so với bơm diesel. Mỗi hệ thống hoạt động 20-25 năm với bảo trì tối thiểu.",
    stats: [
      { label: "Chi phí", value: "$3,000-5,000" },
      { label: "Phục vụ", value: "500-1,000 người" },
      { label: "Tuổi thọ", value: "20-25 năm" },
      { label: "CO₂ tiết kiệm", value: "4 tấn/năm" },
    ],
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80&auto=format",
    source: "Solar Aid / World Bank 2026",
    countries: "Kenya, Ethiopia, Tanzania, Uganda, Rwanda",
  },
  {
    id: "rain",
    icon: "🌧️",
    label: "Thu hoạch nước mưa",
    title: "Hệ thống thu gom nước mưa",
    desc: "Thu gom và lưu trữ nước mưa bằng bể chứa. Mái nhà 50m² thu 50,000 lít/năm — đủ cho gia đình 5 người trong 6 tháng mùa khô.",
    impact: "Chi phí thấp nhất trong các giải pháp. Cộng đồng tự xây dựng và bảo trì, tạo việc làm địa phương.",
    stats: [
      { label: "Thu hoạch", value: "50,000L/năm" },
      { label: "Chi phí", value: "$200-500" },
      { label: "Lắp đặt", value: "1-2 ngày" },
      { label: "Hoàn vốn", value: "< 6 tháng" },
    ],
    image: "https://images.unsplash.com/photo-1468421870903-4df1664ac249?w=800&q=80&auto=format",
    source: "Rain Foundation / UNEP 2026",
    countries: "Nigeria, Ghana, Cameroon, Senegal",
  },
  {
    id: "filter",
    icon: "🔬",
    label: "Lọc nước sinh học",
    title: "Công nghệ lọc nước chi phí thấp",
    desc: "LifeStraw và BioSand Filter — thiết bị lọc giá rẻ loại bỏ 99.9% vi khuẩn, ký sinh trùng mà không cần điện hay hóa chất.",
    impact: "LifeStraw: $20/chiếc, lọc 4,000L. BioSand Filter: $50, dùng 10+ năm. Đã cứu ước tính 2 triệu mạng sống.",
    stats: [
      { label: "LifeStraw", value: "4,000L / $20" },
      { label: "BioSand", value: "10+ năm / $50" },
      { label: "Hiệu suất", value: "99.9% vi khuẩn" },
      { label: "Không cần điện", value: "✓" },
    ],
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&q=80&auto=format",
    source: "LifeStraw / WHO / Vestergaard 2026",
    countries: "Kenya, Sudan, Congo, Ethiopia, Mozambique",
  },
  {
    id: "forest",
    icon: "🌱",
    label: "Trồng rừng phục hồi",
    title: "Great Green Wall — Bức tường xanh vĩ đại",
    desc: "Dự án trồng 8 tỷ cây xuyên Sahara dài 8,000km — bức tường xanh chặn sa mạc hóa và phục hồi nguồn nước ngầm cho 100 triệu người.",
    impact: "Đã phục hồi 18 triệu ha đất. Tạo 350,000 việc làm. Mỗi cây hấp thụ 100L nước/ngày vào đất.",
    stats: [
      { label: "Chiều dài", value: "8,000km" },
      { label: "Mục tiêu", value: "8 tỷ cây" },
      { label: "Phục hồi", value: "18 triệu ha" },
      { label: "Việc làm", value: "350,000" },
    ],
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80&auto=format",
    source: "UNCCD / African Union 2026",
    countries: "Senegal → Djibouti (11 quốc gia)",
  },
  {
    id: "desal",
    icon: "🏭",
    label: "Khử mặn nước biển",
    title: "Nhà máy khử mặn năng lượng tái tạo",
    desc: "Kết hợp năng lượng mặt trời + khử mặn để biến nước biển thành nước ngọt. Dự án tại Kenya và Morocco đang cung cấp nước cho 500,000+ người.",
    impact: "Công nghệ mới giảm 60% chi phí so với khử mặn truyền thống. Giải pháp dài hạn cho các vùng ven biển.",
    stats: [
      { label: "Sản lượng", value: "10,000m³/ngày" },
      { label: "Chi phí", value: "$0.5/m³" },
      { label: "Giảm so với cũ", value: "60%" },
      { label: "Năng lượng", value: "100% tái tạo" },
    ],
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80&auto=format",
    source: "IRENA / IDA 2026",
    countries: "Morocco, Kenya, Namibia, South Africa",
  },
];

const filterSteps = [
  { label: "Nước bẩn", emoji: "🟤", desc: "Vi khuẩn, ký sinh trùng, phân, kim loại nặng", color: "bg-earth" },
  { label: "Lọc cát thô", emoji: "⬛", desc: "Loại bỏ đất, cát, tạp chất lớn", color: "bg-muted-foreground" },
  { label: "Than hoạt tính", emoji: "⚫", desc: "Hấp thụ hóa chất, mùi, kim loại nặng", color: "bg-foreground" },
  { label: "Khử trùng UV", emoji: "💜", desc: "Tia UV tiêu diệt 99.99% vi khuẩn & virus", color: "bg-accent" },
  { label: "Nước sạch!", emoji: "💧", desc: "An toàn để uống trực tiếp", color: "bg-water" },
];

const successStories = [
  { country: "🇰🇪 Kenya", title: "Kitui Solar Water", result: "15,000 người có nước sạch", year: "2024" },
  { country: "🇪🇹 Ethiopia", title: "WaterAid Tigray", result: "50 trường học có nước", year: "2025" },
  { country: "🇳🇬 Nigeria", title: "Rain Harvest Lagos", result: "Giảm 40% bệnh tiêu chảy", year: "2025" },
  { country: "🇸🇳 Senegal", title: "Great Green Wall", result: "2 triệu ha phục hồi", year: "2026" },
  { country: "🇲🇦 Morocco", title: "Solar Desalination", result: "300,000 người có nước", year: "2026" },
  { country: "🇷🇼 Rwanda", title: "WASH in Schools", result: "100% trường có nước", year: "2025" },
];

function SolutionsPage() {
  const [activeSolution, setActiveSolution] = useState(-1);
  const [showFilter, setShowFilter] = useState(false);
  const [filterStep, setFilterStep] = useState(-1);
  const [showStories, setShowStories] = useState(false);

  const startFilter = () => {
    setFilterStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= filterSteps.length) clearInterval(interval);
      else setFilterStep(step);
    }, 700);
  };

  return (
    <main className="pt-14 min-h-screen bg-background">
      {/* HERO — Bright, clear, professional */}
      <div className="relative h-[70vh] min-h-[480px] flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=90&auto=format" alt="Năng lượng mặt trời Châu Phi" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-900/35" />
        <div className="relative z-10 max-w-6xl mx-auto px-5 pb-16 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/" className="inline-flex items-center gap-1.5 text-white/70 text-xs mb-6 hover:text-white transition-colors font-semibold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Trang chủ
            </Link>
            <p className="text-emerald-300 text-[11px] tracking-[0.35em] uppercase mb-4 font-bold">Phần 02 · Giải pháp</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight">
              SÁNG TẠO XANH
            </h1>
            <p className="text-white/85 text-sm md:text-base mt-6 max-w-xl leading-relaxed">5 công nghệ thực tiễn đang thay đổi cuộc sống hàng triệu người Châu Phi.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-20 space-y-16">
        {/* Solutions */}
        <section>
          <h2 className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-8 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-leaf rounded-full" /> 5 giải pháp đang cứu sống hàng triệu người
          </h2>
          <div className="space-y-3">
            {solutions.map((s, i) => (
              <div key={s.id}>
                <button
                  onClick={() => setActiveSolution(activeSolution === i ? -1 : i)}
                  className="w-full text-left bg-card border border-border rounded-2xl p-5 flex items-center justify-between hover:border-leaf/40 hover:shadow-[var(--shadow-glow-leaf)] transition-all duration-500 group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl group-hover:scale-110 transition-transform">{s.icon}</span>
                    <div>
                      <h3 className="font-bold">{s.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{s.countries}</p>
                    </div>
                  </div>
                  <motion.div animate={{ rotate: activeSolution === i ? 180 : 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground"><path d="M6 9l6 6 6-6"/></svg>
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeSolution === i && (
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
                            <img src={s.image} alt={s.title} loading="lazy" className="w-full h-full object-cover" />
                          </div>
                          <div className="p-6 space-y-4">
                            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                            <div className="bg-leaf/5 border border-leaf/20 rounded-lg p-3">
                              <p className="text-xs font-semibold text-leaf mb-1">💡 Tác động thực tế</p>
                              <p className="text-xs text-muted-foreground leading-relaxed">{s.impact}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {s.stats.map((stat, j) => (
                                <div key={j} className="bg-secondary/50 rounded-lg p-3">
                                  <div className="text-[10px] text-muted-foreground uppercase">{stat.label}</div>
                                  <div className="text-sm font-bold mt-0.5">{stat.value}</div>
                                </div>
                              ))}
                            </div>
                            <p className="text-[10px] text-water/60">📎 {s.source}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Filter simulation */}
        <section>
          <button
            onClick={() => { setShowFilter(!showFilter); if (!showFilter) startFilter(); }}
            className="w-full text-left bg-card border border-border rounded-2xl p-5 flex items-center justify-between hover:border-water/40 transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔬</span>
              <div>
                <h3 className="font-bold">Mô phỏng quy trình lọc nước</h3>
                <p className="text-xs text-muted-foreground mt-0.5">5 bước biến nước bẩn thành nước uống an toàn</p>
              </div>
            </div>
            <motion.div animate={{ rotate: showFilter ? 180 : 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground"><path d="M6 9l6 6 6-6"/></svg>
            </motion.div>
          </button>

          <AnimatePresence>
            {showFilter && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="bg-card border border-border border-t-0 rounded-b-2xl p-6">
                  <div className="flex items-center justify-between gap-2 md:gap-4">
                    {filterSteps.map((step, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <motion.div
                          animate={{ opacity: filterStep >= i ? 1 : 0.2, scale: filterStep === i ? 1.15 : 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="text-center"
                        >
                          <div className="text-2xl md:text-4xl mb-2">{step.emoji}</div>
                          <div className="text-[10px] md:text-xs font-bold">{step.label}</div>
                          <div className="text-[9px] text-muted-foreground mt-1 hidden md:block leading-tight">{step.desc}</div>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-6 pt-4 border-t border-border">
                    <button onClick={startFilter} className="px-6 py-2.5 bg-gradient-to-r from-water to-teal text-white rounded-full text-xs font-bold hover:opacity-90 transition-opacity">
                      ▶️ Chạy lại mô phỏng
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Success stories */}
        <section>
          <button
            onClick={() => setShowStories(!showStories)}
            className="w-full text-left bg-card border border-border rounded-2xl p-5 flex items-center justify-between hover:border-leaf/40 transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏆</span>
              <div>
                <h3 className="font-bold">Câu chuyện thành công thực tế</h3>
                <p className="text-xs text-muted-foreground mt-0.5">6 dự án đang tạo ra sự khác biệt</p>
              </div>
            </div>
            <motion.span animate={{ rotate: showStories ? 180 : 0 }} className="text-muted-foreground">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </motion.span>
          </button>

          <AnimatePresence>
            {showStories && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="bg-card border border-border border-t-0 rounded-b-2xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {successStories.map((story, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-leaf/5 border border-leaf/20 rounded-xl p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold">{story.country}</span>
                          <span className="text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{story.year}</span>
                        </div>
                        <p className="text-xs font-semibold">{story.title}</p>
                        <p className="text-xs text-leaf font-bold mt-1">✅ {story.result}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* CTA */}
        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground mb-4">Giải pháp đã có. Bạn sẽ hành động như thế nào?</p>
          <Link
            to="/action"
            className="inline-flex items-center gap-2 px-9 py-4 bg-gradient-to-r from-water to-teal text-white rounded-full font-bold text-sm hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-[var(--shadow-glow-water)]"
          >
            Hành động ngay
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>

      <footer className="border-t border-border py-10 text-center bg-secondary/20">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-xs text-muted-foreground">© 2026 Nhóm 10 — Đại học Văn Lang | Môi trường và Con người</p>
        </div>
      </footer>
    </main>
  );
}
