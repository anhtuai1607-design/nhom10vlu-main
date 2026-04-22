import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import posterImg from "@/assets/poster-nuoc-la-su-song.png";
import posterAction from "@/assets/poster-hay-hanh-dong.png";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Nước là Sự sống — Khủng hoảng nước Châu Phi 2026" },
      { name: "description", content: "Website tương tác về khủng hoảng nước sạch tại Châu Phi. Dự án môn Môi trường và Con người — Đại học Văn Lang." },
    ],
  }),
});

const heroStats = [
  { value: "2.2", unit: "tỷ", desc: "người thiếu nước sạch toàn cầu", source: "WHO/UNICEF JMP 2026" },
  { value: "411", unit: "triệu", desc: "người tại Châu Phi không có nước sạch", source: "UNICEF Africa 2026" },
  { value: "1,000", unit: "+", desc: "trẻ em chết mỗi ngày vì nước bẩn", source: "WHO 2026" },
  { value: "80", unit: "giây", desc: "một đứa trẻ ra đi vì nước ô nhiễm", source: "UN-Water 2026" },
];

const sections = [
  {
    to: "/crisis" as const,
    no: "01",
    tag: "Phần 01",
    title: "Thực trạng",
    subtitle: "411 triệu người đang sống trong khát",
    desc: "Dữ liệu thực tế 2026 — UNICEF, WHO, World Bank, UN-Water — về cuộc khủng hoảng nước sạch tồi tệ nhất 40 năm qua.",
    image: "https://images.unsplash.com/photo-1594398901394-4e34939a02eb?w=1200&q=85&auto=format",
    accent: "from-sky-500 to-blue-600",
  },
  {
    to: "/solutions" as const,
    no: "02",
    tag: "Phần 02",
    title: "Giải pháp",
    subtitle: "Công nghệ xanh đang cứu sống lục địa",
    desc: "Năng lượng mặt trời, thu hoạch nước mưa, lọc sinh học, Great Green Wall — 5 công nghệ thay đổi cuộc chơi.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=85&auto=format",
    accent: "from-emerald-500 to-teal-600",
  },
  {
    to: "/action" as const,
    no: "03",
    tag: "Phần 03",
    title: "Hành động",
    subtitle: "Từ nhận thức đến hành động thật",
    desc: "Máy tính nước, quiz nhận thức, thử thách 7 ngày, mô phỏng dòng đời, cam kết cộng đồng — 7 công cụ tương tác.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=85&auto=format",
    accent: "from-cyan-500 to-emerald-500",
  },
];

function HomePage() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  return (
    <div className="min-h-screen bg-background">
      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out"
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur transition"
            aria-label="Đóng"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
          <img src={lightbox} alt="Poster phóng to" className="max-h-[92vh] max-w-[92vw] rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
      {/* ============ HERO — BRIGHT, POSTER FRONT & CENTER ============ */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        {/* soft watercolor backdrop */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-emerald-50/50 to-background" />
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-sky-200/40 blur-3xl" />
          <div className="absolute -top-20 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-200/40 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-cyan-100/50 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-[1fr,auto] gap-10 lg:gap-16 items-center">
          {/* LEFT — Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200 bg-white/70 backdrop-blur text-emerald-700 text-[10px] tracking-[0.2em] uppercase mb-7 shadow-sm">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Văn Lang · Môi trường & Con người · 2026
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black leading-[1.1] tracking-tight">
              <span className="block text-slate-900 pb-1">NƯỚC LÀ</span>
              <span className="block bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-600 bg-clip-text text-transparent pb-2">
                SỰ SỐNG
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-600 mt-7 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              <span className="font-bold text-slate-800">411 triệu người</span> Châu Phi không có nước sạch.
              Mỗi <span className="font-bold text-sky-600">80 giây</span>, một đứa trẻ ra đi vì nước bẩn.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-3">
              <Link
                to="/crisis"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-slate-900 text-white font-bold text-sm rounded-full hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-slate-900/20"
              >
                Khám phá thực trạng
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link
                to="/action"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-slate-900 font-semibold text-sm rounded-full hover:bg-slate-50 transition-all border border-slate-200 shadow-sm"
              >
                Bắt đầu hành động
              </Link>
            </div>
          </motion.div>

          {/* RIGHT — Poster Gallery (2 posters) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 relative max-w-sm md:max-w-md mx-auto"
          >
            {/* decorative ring */}
            <div className="absolute -inset-4 bg-gradient-to-br from-emerald-400/30 via-cyan-400/20 to-sky-500/30 rounded-3xl blur-2xl" />

            <div className="relative grid grid-cols-2 gap-3">
              {/* Poster chính — lớn hơn, lệch lên */}
              <button
                onClick={() => setLightbox(posterImg)}
                className="group col-span-1 bg-white rounded-2xl p-2 shadow-2xl shadow-slate-900/15 border border-white/80 rotate-[-2deg] hover:rotate-0 hover:scale-[1.03] transition-all duration-500 -mt-2"
                aria-label="Xem poster Nước là Sự sống"
              >
                <img
                  src={posterImg}
                  alt="Poster Nước là Sự sống — Vì một tương lai xanh"
                  className="w-full h-auto rounded-lg"
                />
                <p className="text-[10px] font-bold text-slate-700 text-center pt-2 pb-1 tracking-wider uppercase">Nước là Sự sống</p>
              </button>

              {/* Poster phụ — nghiêng phải, lệch xuống */}
              <button
                onClick={() => setLightbox(posterAction)}
                className="group col-span-1 bg-white rounded-2xl p-2 shadow-2xl shadow-slate-900/15 border border-white/80 rotate-[2deg] hover:rotate-0 hover:scale-[1.03] transition-all duration-500 mt-6"
                aria-label="Xem poster Hãy hành động"
              >
                <img
                  src={posterAction}
                  alt="Poster Hãy Hành Động — Vì một Châu Phi xanh"
                  className="w-full h-auto rounded-lg"
                />
                <p className="text-[10px] font-bold text-slate-700 text-center pt-2 pb-1 tracking-wider uppercase">Hãy Hành Động</p>
              </button>
            </div>

            <p className="text-center text-[11px] text-slate-500 mt-5 italic">
              Click vào poster để xem chi tiết
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============ STATS BAND — BRIGHT ============ */}
      <section className="relative py-20 md:py-24 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-emerald-600 text-xs tracking-[0.3em] uppercase mb-3 font-bold">Số liệu thực tế · 2026</p>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight max-w-3xl mx-auto tracking-tight">
              Đằng sau những con số là{" "}
              <span className="bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                sinh mạng thật
              </span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {heroStats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-gradient-to-br from-sky-50 to-emerald-50/60 border border-sky-100 rounded-2xl p-5 md:p-7 text-center hover:shadow-xl hover:shadow-sky-200/40 hover:-translate-y-1 transition-all duration-500"
              >
                <div className="text-4xl md:text-6xl font-black counter-display tracking-tight bg-gradient-to-br from-sky-700 to-emerald-700 bg-clip-text text-transparent">
                  {s.value}
                  <span className="text-lg md:text-2xl ml-1">{s.unit}</span>
                </div>
                <p className="text-[11px] md:text-xs text-slate-600 mt-3 leading-relaxed font-medium">{s.desc}</p>
                <p className="text-[9px] text-slate-400 mt-3 pt-3 border-t border-slate-200">📎 {s.source}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ QUOTE ============ */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-white to-sky-50/40">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-7xl text-emerald-300 font-serif leading-none">"</span>
            <p className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold leading-snug tracking-tight -mt-6 text-slate-800">
              Nước là nguồn gốc của{" "}
              <span className="bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">mọi sự sống</span>.{" "}
              Không có nước, không có{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">tương lai</span>.
            </p>
            <div className="flex items-center justify-center gap-3 mt-8 text-sm text-slate-500">
              <span className="w-12 h-px bg-slate-300" />
              Liên Hợp Quốc — Thập kỷ Nước 2018–2028
              <span className="w-12 h-px bg-slate-300" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ SECTION CARDS — BRIGHT ============ */}
      <section className="max-w-6xl mx-auto px-5 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-12 h-[2px] bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full" />
          <p className="text-xs text-slate-500 uppercase tracking-[0.25em] font-bold">Khám phá dự án</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {sections.map((s, i) => (
            <motion.div
              key={s.to}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Link
                to={s.to}
                className="group block relative overflow-hidden rounded-3xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-tr ${s.accent} opacity-15 group-hover:opacity-25 transition-opacity`} />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur rounded-full text-[10px] font-black tracking-wider text-slate-900">
                    {s.tag}
                  </div>
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-500 shadow-lg">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[11px] tracking-[0.25em] uppercase font-bold text-slate-400 mb-2">{s.title}</p>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight tracking-tight">
                    {s.subtitle}
                  </h3>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">{s.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ URGENCY BANNER — Lighter ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=1920&q=85&auto=format"
            alt="Hạn hán Châu Phi"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/55 to-slate-900/30" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-5 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <p className="text-emerald-300 text-xs tracking-[0.3em] uppercase mb-4 font-bold">Bạn có biết?</p>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.05] tracking-tight">
              Mỗi ngày, phụ nữ Châu Phi đi bộ
              <br />
              <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">6 tiếng</span> để lấy nước
            </h2>
            <p className="text-white/85 mt-6 text-base leading-relaxed max-w-lg">
              200 triệu giờ mỗi ngày — tương đương toàn bộ lực lượng lao động của Pháp.
              Thời gian đó có thể dành cho giáo dục, kinh tế, và gia đình.
            </p>
            <p className="text-[10px] text-white/50 mt-4">📎 UNICEF/WHO JMP Report 2026</p>
            <Link
              to="/crisis"
              className="inline-flex items-center gap-2 mt-10 px-8 py-3.5 bg-white text-slate-900 font-bold text-sm rounded-full hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
            >
              Xem toàn bộ số liệu
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-slate-200 py-10 text-center bg-white">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-xs text-slate-500">© 2026 Nhóm 10 — Đại học Văn Lang | Môi trường và Con người</p>
        </div>
      </footer>
    </div>
  );
}
