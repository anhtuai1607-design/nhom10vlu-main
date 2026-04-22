import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

export const Route = createFileRoute("/action")({
  component: ActionPage,
  head: () => ({
    meta: [
      { title: "Hành động — Nước là Sự sống" },
      { name: "description", content: "7 công cụ tương tác — máy tính nước cá nhân, quiz nhận thức, thử thách 14 ngày, mô phỏng dòng đời, sorting game, cam kết cộng đồng. Dữ liệu thực tế UNICEF/WHO 2026." },
    ],
  }),
});

/* ============ DỮ LIỆU THỰC TẾ — Nguồn: WHO/UNICEF/EPA/Bộ TNMT VN 2026 ============ */
// Toilet hiện đại: 6L (single) / 3-4.5L (dual-flush) — EPA WaterSense 2024
// Tắm vòi sen: 9.5L/phút trung bình (EPA 2024) — vòi tiết kiệm: 6L/phút
// Rửa tay: 1.5L/lần (10 giây vòi mở) — WHO 2025
// Đánh răng vòi mở: 6L/phút — Bộ TNMT VN 2024
// Giặt máy: 50L (cửa trước hiện đại) - 90L (cửa trên cũ) — Energy Star 2025
// Rửa bát vòi mở: 9L/phút — UC Davis Water Study 2024
const WATER_PER = {
  showerPerMinute: 9.5,   // EPA 2024 — vòi sen tiêu chuẩn
  handWash: 1.5,           // 10 giây vòi mở
  toiletFlush: 6,          // toilet hiện đại
  laundryLoad: 60,         // máy giặt cửa trước
  dishWashPerMinute: 9,    // vòi mở rửa bát
  brushTeethPerMinute: 6,  // vòi mở đánh răng
};

/* ============ QUIZ — 12 câu, đa cấp độ ============ */
const quizQuestions = [
  { q: "1 người Châu Phi cận Sahara trung bình dùng bao nhiêu lít nước/ngày?", options: ["20 lít", "5 lít", "50 lít", "150 lít"], correct: 1, explain: "Chỉ ~5 lít — bằng 1 lần xả toilet hiện đại ở Việt Nam. Người Mỹ dùng ~340L/ngày. (UNICEF JMP 2026)" },
  { q: "Mỗi ngày trên thế giới có bao nhiêu trẻ em dưới 5 tuổi tử vong vì bệnh liên quan đến nước bẩn?", options: ["~100", "~500", "~1,000", "~3,000"], correct: 2, explain: "~1,000 trẻ/ngày (≈365,000/năm) — chủ yếu do tiêu chảy. Nhiều hơn tổng số tử vong do sởi + sốt rét trẻ em. (WHO 2026)" },
  { q: "Phụ nữ và trẻ em gái Châu Phi mất bao nhiêu giờ MỖI NGÀY để đi lấy nước?", options: ["1 giờ", "3 giờ", "6 giờ", "10 giờ"], correct: 2, explain: "Trung bình ~6 giờ — tổng cộng 200 triệu giờ/ngày toàn lục địa, tương đương lực lượng lao động cả nước Pháp. (UNICEF 2026)" },
  { q: "Châu Phi sở hữu bao nhiêu % nước ngầm chưa được khai thác hiệu quả?", options: ["20%", "45%", "72%", "95%"], correct: 2, explain: "~72% — Châu Phi có 660,000 km³ nước ngầm (gấp 100 lần lượng nước mặt) nhưng chỉ khai thác 28%. (BGR/UNESCO 2026)" },
  { q: "Dự án Bức tường Xanh Vĩ đại (Great Green Wall) chạy dài bao nhiêu km?", options: ["2,000km", "5,000km", "8,000km", "15,000km"], correct: 2, explain: "8,000km từ Senegal đến Djibouti, băng qua 11 quốc gia. Mục tiêu phục hồi 100 triệu ha đất khô cằn vào 2030. (UNCCD 2026)" },
  { q: "Hồ Chad đã mất bao nhiêu % diện tích trong 60 năm qua?", options: ["30%", "50%", "70%", "90%"], correct: 3, explain: "90% — từ 25,000 km² (1963) xuống chỉ còn ~2,500 km². 30 triệu người 4 nước phụ thuộc vào hồ này. (NASA Earth Observatory 2026)" },
  { q: "Khủng hoảng nước khiến Châu Phi mất bao nhiêu % GDP mỗi năm?", options: ["1%", "5%", "12%", "20%"], correct: 1, explain: "~5% GDP (~$260 tỷ/năm) — tương đương toàn bộ GDP của Phần Lan. Đây không chỉ là khủng hoảng nhân đạo mà còn kinh tế. (World Bank 2026)" },
  { q: "Để sản xuất 1kg thịt bò cần bao nhiêu lít nước?", options: ["500L", "2,500L", "8,000L", "15,000L"], correct: 3, explain: "~15,000L — bao gồm nước cho cỏ, ngô, vận hành trang trại. So với 1kg gạo: 2,500L; 1kg cà chua: 200L. (Water Footprint Network 2024)" },
  { q: "Tỷ lệ dân số Châu Phi cận Sahara tiếp cận nước uống an toàn (2026)?", options: ["35%", "55%", "75%", "92%"], correct: 1, explain: "~55% — nghĩa là ~411 triệu người vẫn không có nước sạch. Khu vực này chiếm 70% dân số thiếu nước toàn cầu. (UNICEF/WHO JMP 2026)" },
  { q: "1 chai nước nhựa 500ml cần bao nhiêu lít nước để sản xuất + đóng gói?", options: ["1L", "3L", "7L", "20L"], correct: 1, explain: "~3L (gấp 6 lần lượng nước trong chai) — bao gồm sản xuất chai PET, vận chuyển, làm mát. (Pacific Institute 2024)" },
  { q: "Vùng Sừng Châu Phi (Somalia, Ethiopia, Kenya) đang trải qua hạn hán tồi tệ nhất bao nhiêu năm?", options: ["20 năm", "40 năm", "70 năm", "100 năm"], correct: 1, explain: "Tồi tệ nhất 40 năm — 6 mùa mưa thất bại liên tiếp (2020-2025). 23 triệu người đang đối mặt nạn đói cấp tính. (UN-OCHA 2026)" },
  { q: "Một người trưởng thành cần TỐI THIỂU bao nhiêu lít nước sạch/ngày để sống cơ bản?", options: ["2L", "10L", "20L", "50L"], correct: 2, explain: "~20L (uống + vệ sinh tối thiểu) theo WHO. Mức 'cơ bản đủ': 50L. Ở Châu Phi nhiều nơi chỉ có 5-15L. (WHO 2025)" },
];

/* ============ THỬ THÁCH 14 NGÀY ============ */
const challenges = [
  { day: 1, title: "Tắm dưới 5 phút", save: "45L", icon: "🚿", tip: "Đặt timer điện thoại — 1 phút tắm = ~10L" },
  { day: 2, title: "Tắt vòi khi đánh răng", save: "12L", icon: "🪥", tip: "Dùng cốc súc miệng — tiết kiệm 80% nước" },
  { day: 3, title: "Giặt đủ tải máy", save: "60L", icon: "👕", tip: "Gom đồ 3-4 ngày/lần — máy cửa trước tiết kiệm hơn" },
  { day: 4, title: "Rửa rau bằng chậu", save: "15L", icon: "🥬", tip: "Nước rửa rau cuối có thể tưới cây" },
  { day: 5, title: "Kiểm tra rò rỉ vòi", save: "100L", icon: "🔧", tip: "1 giọt/giây = ~30L/ngày bay hơi" },
  { day: 6, title: "Tái sử dụng nước vo gạo", save: "20L", icon: "🍚", tip: "Tưới cây — giàu vitamin B1 cho rau" },
  { day: 7, title: "Hứng nước mưa tưới cây", save: "50L", icon: "🌧️", tip: "1 cơn mưa 30 phút = ~200L từ mái nhà nhỏ" },
  { day: 8, title: "Bỏ 1 bữa thịt đỏ/tuần", save: "1,500L", icon: "🥗", tip: "1kg thịt bò = 15,000L nước ảo" },
  { day: 9, title: "Tái sử dụng nước máy lạnh", save: "5L", icon: "❄️", tip: "Hứng nước ngưng tụ — tưới cây sạch" },
  { day: 10, title: "Rửa bát theo lô", save: "30L", icon: "🍽️", tip: "Ngâm xà phòng rồi xả 1 lần — không xả vòi liên tục" },
  { day: 11, title: "Lắp vòi tiết kiệm (aerator)", save: "40L", icon: "🚰", tip: "Đầu vòi sục khí giảm 30-50% lưu lượng" },
  { day: 12, title: "Rửa xe bằng xô + khăn", save: "200L", icon: "🚗", tip: "Vòi xịt = 200-300L/lần, xô = 30L" },
  { day: 13, title: "Nói KHÔNG với chai nhựa", save: "3L", icon: "🍶", tip: "Mỗi chai = 3L nước ảo. Mang bình cá nhân" },
  { day: 14, title: "Chia sẻ thử thách", save: "∞", icon: "📢", tip: "Lan tỏa cho 5 bạn — nhân rộng tác động" },
];

const pledgeActions = [
  { emoji: "🚿", label: "Tắm dưới 5 phút", save: "45L/ngày" },
  { emoji: "🪥", label: "Tắt vòi khi đánh răng", save: "12L/ngày" },
  { emoji: "👕", label: "Giặt đủ tải máy", save: "60L/lần" },
  { emoji: "🍽️", label: "Rửa bát theo lô", save: "30L/lần" },
  { emoji: "🥗", label: "Giảm thịt đỏ 1 bữa/tuần", save: "1,500L/tuần" },
  { emoji: "🍶", label: "Mang bình nước cá nhân", save: "3L/chai" },
  { emoji: "🌧️", label: "Hứng nước mưa", save: "50L/cơn" },
  { emoji: "📢", label: "Chia sẻ cho 5 người", save: "∞" },
];

/* ============ SORTING GAME — 10 hành động ============ */
const sortingItems = [
  { id: 1, label: "Tắm bồn 30 phút", waste: true, save: 250, fact: "1 lần tắm bồn = nước cả tuần của 1 người Châu Phi" },
  { id: 2, label: "Hứng nước mưa tưới cây", waste: false, save: 50, fact: "Nước mưa miễn phí — đủ cho cả vườn 1 tuần" },
  { id: 3, label: "Để vòi chảy khi đánh răng", waste: true, save: 12, fact: "2 phút x 6L/phút = 12L/lần x 2 lần/ngày = 24L" },
  { id: 4, label: "Sửa vòi rò rỉ ngay", waste: false, save: 30, fact: "1 giọt/giây = 30L/ngày = 11,000L/năm" },
  { id: 5, label: "Giặt 1 chiếc áo riêng lẻ", waste: true, save: 60, fact: "Máy giặt cần lượng nước cố định — đủ tải hay không" },
  { id: 6, label: "Rửa xe bằng xô + khăn", waste: false, save: 200, fact: "Xô: ~30L vs Vòi xịt: ~250L/lần" },
  { id: 7, label: "Xả toilet rác như giấy ăn", waste: true, save: 6, fact: "Mỗi lần xả = 6L. Đặt thùng rác cạnh toilet" },
  { id: 8, label: "Tái sử dụng nước rửa rau", waste: false, save: 15, fact: "Tưới cây hoặc lau sàn — giảm 15-20L/ngày" },
  { id: 9, label: "Mua nước đóng chai mỗi ngày", waste: true, save: 3, fact: "Mỗi chai 500ml = 3L nước ảo + 0.5kg CO₂" },
  { id: 10, label: "Lắp đầu vòi tiết kiệm", waste: false, save: 40, fact: "Vòi aerator giảm 30-50% nước, vẫn đủ áp lực" },
];

/* ============ MỘT NGÀY TRONG ĐỜI AMINA — 6 cảnh ============ */
const dayChoices = [
  {
    scene: "🌅 5:00 sáng — Bình minh Sahel",
    bg: "from-sky-400 via-cyan-500 to-teal-600",
    desc: "Bạn thức dậy trong căn phòng có vòi nước. Cùng lúc đó, Amina (8 tuổi, Somalia) đeo can 20L lên lưng và bắt đầu đi 6km tìm nước. Bạn quyết định:",
    options: [
      { label: "Tắm 15 phút nước nóng thoải mái", impact: -150, msg: "150L bay đi — đủ cho gia đình Amina dùng trong 6 ngày." },
      { label: "Tắm nhanh 5 phút", impact: -50, msg: "Tốt! Tiết kiệm 100L so với tắm dài." },
      { label: "Lau người bằng khăn ướt + 2L nước", impact: -2, msg: "Tuyệt vời! Gần như Amina — cô chỉ có 5L cho cả ngày." },
    ],
  },
  {
    scene: "☕ 7:00 sáng — Bữa sáng",
    bg: "from-emerald-500 via-teal-500 to-sky-600",
    desc: "Bạn uống cà phê, đánh răng, rửa mặt. Amina vẫn đang đi — giếng làng cạn, cô phải đến giếng cách 8km. Nhiệt độ ngoài trời: 38°C. Bạn:",
    options: [
      { label: "Đánh răng để vòi chảy 3 phút", impact: -18, msg: "18L lãng phí — bằng 3.6 ngày uống của Amina." },
      { label: "Đánh răng + dùng cốc súc miệng", impact: -1, msg: "Xuất sắc! Chỉ 1L thay vì 18L." },
      { label: "Rửa mặt bằng vòi mở 2 phút", impact: -15, msg: "Khá lãng phí — nên dùng chậu nhỏ." },
    ],
  },
  {
    scene: "🍽️ 12:00 trưa — Bữa trưa",
    bg: "from-teal-500 via-cyan-500 to-blue-600",
    desc: "Bạn ăn bún bò (mỗi tô ~3,000L nước ảo cho thịt bò). Amina đáng lẽ ở trường — nhưng cô đang trên đường về nhà với 20L nước trên lưng. Bữa trưa cô ấy chỉ có cháo loãng. Bạn:",
    options: [
      { label: "Mua nước đóng chai 500ml", impact: -3, msg: "1 chai = 3L nước ảo. Tệ hơn cho môi trường." },
      { label: "Dùng bình cá nhân + nước lọc", impact: 0, msg: "Tốt! Không thêm nước ảo, không rác nhựa." },
      { label: "Chọn bữa chay (rau củ)", impact: 50, msg: "Tuyệt! Tiết kiệm ~2,500L so với bữa thịt bò." },
    ],
  },
  {
    scene: "🚗 17:00 chiều — Sau giờ làm",
    bg: "from-cyan-500 via-blue-500 to-indigo-600",
    desc: "Bạn về nhà. Amina đã về đến nơi — cả gia đình 6 người sẽ chia 20L cho cả ngày mai. Bạn quyết định rửa xe vì cuối tuần:",
    options: [
      { label: "Dùng vòi xịt áp lực cao 15 phút", impact: -250, msg: "250L — bằng nhu cầu cả tuần của gia đình Amina!" },
      { label: "Dùng xô + khăn (~30L)", impact: -30, msg: "Tốt! Giảm ~90% so với vòi xịt." },
      { label: "Để xe bụi, đợi mưa", impact: 0, msg: "Sáng tạo! Chờ mưa rửa miễn phí." },
    ],
  },
  {
    scene: "🍳 19:00 tối — Bữa tối + dọn dẹp",
    bg: "from-blue-600 via-indigo-600 to-purple-700",
    desc: "Bạn nấu ăn cho 4 người. Amina đang nhóm bếp củi — gia đình cô sẽ ăn injera khô vì không đủ nước nấu canh. Bạn:",
    options: [
      { label: "Rửa bát dưới vòi chảy liên tục", impact: -45, msg: "5 phút x 9L = 45L. Cách lãng phí nhất." },
      { label: "Ngâm xà phòng rồi xả 1 lần", impact: -15, msg: "Tốt! Giảm 60-70% lượng nước." },
      { label: "Tái sử dụng nước rửa cho lau sàn", impact: -5, msg: "Xuất sắc! Tận dụng triệt để mọi giọt." },
    ],
  },
  {
    scene: "🌙 22:00 đêm — Trước khi ngủ",
    bg: "from-indigo-700 via-blue-800 to-slate-900",
    desc: "Bạn chuẩn bị đi ngủ. Amina cũng vậy — cô đi ngủ với cái bụng không no, lo lắng cho ngày mai phải đi tiếp. Hành động cuối cùng của bạn:",
    options: [
      { label: "Xả toilet 2 lần + xả vòi rửa mặt", impact: -25, msg: "25L — bằng 5 ngày nước uống của Amina." },
      { label: "Kiểm tra & sửa vòi rò rỉ", impact: 100, msg: "Tuyệt! Cứu 30-100L/ngày trong nhiều tháng tới." },
      { label: "Đặt báo thức để chia sẻ bài học này", impact: 50, msg: "Tuyệt vời! Nhân rộng nhận thức = nhân rộng tác động." },
    ],
  },
];

/* ============ ĐÚNG/SAI — 10 câu ============ */
const tfQuestions = [
  { q: "Châu Phi có nhiều nước ngầm hơn cả Châu Âu cộng lại.", answer: true, explain: "Đúng — Châu Phi có ~660,000 km³ nước ngầm (UNESCO 2024). Vấn đề là thiếu hạ tầng khai thác, không phải thiếu nước." },
  { q: "Trồng cây làm tăng nguồn nước ngầm và độ ẩm đất.", answer: true, explain: "Đúng — rễ cây giữ nước, lá tạo bóng giảm bay hơi. 1 cây trưởng thành lọc & giữ ~150L nước/ngày." },
  { q: "Thiếu nước chỉ là vấn đề của các nước nghèo.", answer: false, explain: "Sai — Cape Town (Nam Phi) suýt cạn nước 2018 (Day Zero). Las Vegas, Sao Paulo, Chennai (Ấn Độ) đều khủng hoảng. California cấm tưới cỏ 2024." },
  { q: "1 chai nước nhựa 500ml cần ~3L nước để sản xuất.", answer: true, explain: "Đúng — gấp 6 lần lượng nước trong chai. Bao gồm sản xuất nhựa PET, vận chuyển, làm mát. (Pacific Institute)" },
  { q: "Vùng Sừng Châu Phi đang trải qua hạn hán tồi tệ nhất 100 năm.", answer: false, explain: "Sai — tồi tệ nhất 40 NĂM (1984-2026). 6 mùa mưa thất bại liên tiếp, 23 triệu người đói. (UN-OCHA 2026)" },
  { q: "Sản xuất 1kg thịt bò tốn nhiều nước hơn 1kg gạo.", answer: true, explain: "Đúng — 15,000L (bò) vs 2,500L (gạo). Thịt = chăn nuôi cần cỏ + ngũ cốc. Ăn chay 1 ngày = tiết kiệm ~3,000L." },
  { q: "Toilet hiện đại xả 1 lần tốn 12 lít nước.", answer: false, explain: "Sai — toilet hiện đại EPA WaterSense: 4.8L (single-flush) hoặc 3-4.5L (dual-flush). Toilet cũ 1990s mới ~12L." },
  { q: "Nước biển có thể uống được sau khi đun sôi.", answer: false, explain: "Sai — đun sôi không loại muối. Cần khử mặn (desalination) bằng RO hoặc chưng cất. Tốn năng lượng cao." },
  { q: "Hồ Chad đã mất hơn 90% diện tích trong 60 năm.", answer: true, explain: "Đúng — từ 25,000 km² (1963) còn ~2,500 km² (2026). 30 triệu người 4 nước (Chad, Niger, Nigeria, Cameroon) bị ảnh hưởng." },
  { q: "Lắp đầu vòi sục khí (aerator) có thể giảm 50% nước.", answer: true, explain: "Đúng — aerator trộn không khí vào dòng nước, giảm 30-50% lưu lượng nhưng vẫn đủ áp lực sử dụng. Giá chỉ 20-50K VNĐ." },
];

type GameId = "day" | "sort" | "quiz" | "tf" | "calc" | "challenge" | "pledge" | null;

function ActionPage() {
  const [openGame, setOpenGame] = useState<GameId>(null);
  const closeGame = () => setOpenGame(null);

  // calc
  const [usage, setUsage] = useState({ showerMinutes: 8, handWashes: 8, toiletFlushes: 5, laundryLoads: 1, dishWashMinutes: 5, brushMinutes: 2 });
  const [calculated, setCalculated] = useState(false);

  // quiz
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(-1);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  // challenge
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  // pledge
  const [pledges, setPledges] = useState<number[]>([]);
  const [commitCount, setCommitCount] = useState(1247);
  const [drops, setDrops] = useState<{ id: number; x: number }[]>([]);

  // day in life
  const [dayStep, setDayStep] = useState(0);
  const [dayWater, setDayWater] = useState(300);
  const [dayMessages, setDayMessages] = useState<string[]>([]);

  // T/F
  const [tfStep, setTfStep] = useState(0);
  const [tfAnswer, setTfAnswer] = useState<boolean | null>(null);
  const [tfScore, setTfScore] = useState(0);

  // Sorting
  const [sortedSave, setSortedSave] = useState<number[]>([]);
  const [sortedWaste, setSortedWaste] = useState<number[]>([]);
  const [sortFeedback, setSortFeedback] = useState<{ id: number; correct: boolean; fact: string } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) setCommitCount((c) => c + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const totalWater = Math.round(
    usage.showerMinutes * WATER_PER.showerPerMinute +
    usage.handWashes * WATER_PER.handWash +
    usage.toiletFlushes * WATER_PER.toiletFlush +
    usage.laundryLoads * WATER_PER.laundryLoad +
    usage.dishWashMinutes * WATER_PER.dishWashPerMinute +
    usage.brushMinutes * WATER_PER.brushTeethPerMinute
  );
  const africaEquivalent = Math.round(totalWater / 5);

  const answerQuiz = (idx: number) => {
    setQuizAnswer(idx);
    if (idx === quizQuestions[quizIndex].correct) setQuizScore((s) => s + 1);
    setTimeout(() => {
      if (quizIndex < quizQuestions.length - 1) {
        setQuizIndex((i) => i + 1);
        setQuizAnswer(-1);
      } else setQuizDone(true);
    }, 2500);
  };
  const resetQuiz = () => { setQuizIndex(0); setQuizAnswer(-1); setQuizScore(0); setQuizDone(false); };

  const handleCommit = () => {
    if (pledges.length === 0) return;
    setCommitCount((c) => c + 1);
    const newDrops = Array.from({ length: 6 }, (_, i) => ({ id: Date.now() + i, x: Math.random() * 80 + 10 }));
    setDrops((d) => [...d, ...newDrops]);
    setTimeout(() => setDrops((d) => d.filter((dr) => !newDrops.find((n) => n.id === dr.id))), 2000);
  };

  const chooseDayOption = (impact: number, msg: string) => {
    setDayWater((w) => Math.max(0, w + impact));
    setDayMessages((m) => [...m, msg]);
    setTimeout(() => setDayStep((s) => s + 1), 1800);
  };
  const resetDay = () => { setDayStep(0); setDayWater(300); setDayMessages([]); };

  const answerTF = (ans: boolean) => {
    setTfAnswer(ans);
    if (ans === tfQuestions[tfStep].answer) setTfScore((s) => s + 1);
    setTimeout(() => {
      if (tfStep < tfQuestions.length - 1) { setTfStep((s) => s + 1); setTfAnswer(null); }
    }, 2500);
  };
  const resetTF = () => { setTfStep(0); setTfAnswer(null); setTfScore(0); };

  const sortItem = (item: typeof sortingItems[0], asWaste: boolean) => {
    const correct = item.waste === asWaste;
    setSortFeedback({ id: item.id, correct, fact: item.fact });
    setTimeout(() => {
      if (asWaste) setSortedWaste((arr) => [...arr, item.id]);
      else setSortedSave((arr) => [...arr, item.id]);
      setSortFeedback(null);
    }, 1800);
  };
  const remainingItems = sortingItems.filter((i) => !sortedSave.includes(i.id) && !sortedWaste.includes(i.id));
  const sortCorrect = sortingItems.filter((i) => (i.waste && sortedWaste.includes(i.id)) || (!i.waste && sortedSave.includes(i.id))).length;
  const resetSort = () => { setSortedSave([]); setSortedWaste([]); setSortFeedback(null); };

  const sliders = [
    { label: "🚿 Tắm vòi sen", unit: "phút", key: "showerMinutes" as const, max: 30, per: WATER_PER.showerPerMinute, hint: "EPA: 9.5L/phút" },
    { label: "🧼 Rửa tay", unit: "lần", key: "handWashes" as const, max: 25, per: WATER_PER.handWash, hint: "WHO: 1.5L/lần (10s)" },
    { label: "🚽 Xả toilet", unit: "lần", key: "toiletFlushes" as const, max: 15, per: WATER_PER.toiletFlush, hint: "Toilet hiện đại: 6L/lần" },
    { label: "👕 Giặt máy", unit: "lần", key: "laundryLoads" as const, max: 5, per: WATER_PER.laundryLoad, hint: "Cửa trước: 60L/tải" },
    { label: "🍽️ Rửa bát (vòi mở)", unit: "phút", key: "dishWashMinutes" as const, max: 20, per: WATER_PER.dishWashPerMinute, hint: "9L/phút" },
    { label: "🪥 Đánh răng (vòi mở)", unit: "phút", key: "brushMinutes" as const, max: 10, per: WATER_PER.brushTeethPerMinute, hint: "6L/phút" },
  ];

  const tools = [
    { id: "day" as const, icon: "🎭", title: "Một ngày trong đời Amina", subtitle: "6 cảnh — Đặt mình vào vị trí cô bé 8 tuổi ở Somalia", badge: "Game", color: "from-sky-500 to-blue-600" },
    { id: "sort" as const, icon: "🎯", title: "Phân loại hành động", subtitle: "10 tình huống — Đâu là tiết kiệm, đâu là lãng phí?", badge: "Game", color: "from-emerald-500 to-teal-600" },
    { id: "quiz" as const, icon: "❓", title: "Quiz nhận thức", subtitle: "12 câu hỏi đa cấp độ — Bạn hiểu bao nhiêu về nước?", badge: "Game", color: "from-blue-500 to-cyan-600" },
    { id: "tf" as const, icon: "⚖️", title: "Đúng hay Sai?", subtitle: "10 câu hỏi nhanh — Phá vỡ những hiểu lầm phổ biến", badge: "Game", color: "from-teal-500 to-emerald-600" },
    { id: "calc" as const, icon: "🧮", title: "Máy tính nước cá nhân", subtitle: "Đo lượng nước bạn dùng — Theo chuẩn EPA/WHO 2026", badge: "Tool", color: "from-cyan-500 to-blue-600" },
    { id: "challenge" as const, icon: "📅", title: "Thử thách 14 ngày", subtitle: "Mỗi ngày 1 hành động cụ thể — Tiết kiệm 2,000L", badge: "Tool", color: "from-emerald-500 to-green-600" },
    { id: "pledge" as const, icon: "✋", title: "Cam kết cộng đồng", subtitle: "Tham gia phong trào sinh viên VLU — Live counter", badge: "Live", color: "from-blue-600 to-emerald-600" },
  ];

  return (
    <main className="pt-14 min-h-screen bg-gradient-to-b from-sky-50/30 via-white to-emerald-50/30">
      {/* HERO */}
      <div className="relative h-[70vh] min-h-[480px] flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=90&auto=format" alt="Hành động vì nước sạch" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-transparent to-emerald-900/30" />
        <div className="relative z-10 max-w-6xl mx-auto px-5 pb-16 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/" className="inline-flex items-center gap-1.5 text-white/80 text-xs mb-6 hover:text-white transition-colors font-semibold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Trang chủ
            </Link>
            <p className="text-cyan-300 text-[11px] tracking-[0.35em] uppercase mb-4 font-bold">Phần 03 · Hành động</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight drop-shadow-lg">
              HÀNH ĐỘNG NGAY
            </h1>
            <p className="text-white/90 text-sm md:text-base mt-6 max-w-xl leading-relaxed">
              7 công cụ tương tác — đặt mình vào vị trí một đứa trẻ Châu Phi.
              Từ nhận thức đến hành động cụ thể, từ cá nhân đến cộng đồng.
            </p>
          </motion.div>
        </div>
      </div>

      {/* TOOLS GRID */}
      <div className="max-w-6xl mx-auto px-5 py-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-[2px] bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full" />
          <p className="text-xs text-slate-500 uppercase tracking-[0.25em] font-bold">7 công cụ tương tác · Click để mở</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((t, i) => (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setOpenGame(t.id)}
              className="group relative text-left bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${t.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>
                    {t.icon}
                  </div>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                    t.badge === "Live" ? "bg-emerald-100 text-emerald-700" :
                    t.badge === "Game" ? "bg-blue-100 text-blue-700" :
                    "bg-cyan-100 text-cyan-700"
                  }`}>{t.badge}</span>
                </div>
                <h3 className="font-black text-base text-slate-900">{t.title}</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{t.subtitle}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                  Mở công cụ
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Final Quote */}
        <div className="pt-20 text-center">
          <p className="text-2xl md:text-4xl font-serif font-bold leading-snug max-w-3xl mx-auto text-slate-800">
            Không có hành động nhỏ.
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Chỉ có những hành động chưa được làm.</span>
          </p>
          <p className="text-xs text-slate-500 mt-6">— Liên Hợp Quốc, Thập kỷ Nước 2018-2028</p>
        </div>
      </div>

      <footer className="border-t border-slate-200 py-10 text-center bg-white">
        <p className="text-xs text-slate-500">© 2026 Nhóm 10 — Đại học Văn Lang | Môi trường và Con người</p>
      </footer>

      {/* ============ GAME MODALS ============ */}

      {/* DAY IN LIFE */}
      <Dialog open={openGame === "day"} onOpenChange={(o) => !o && closeGame()}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-0 bg-transparent shadow-none max-h-[92vh] overflow-y-auto">
          <div className={`relative bg-gradient-to-br ${dayStep < dayChoices.length ? dayChoices[dayStep].bg : "from-blue-700 to-emerald-700"} rounded-3xl overflow-hidden transition-all duration-700`}>
            <button onClick={closeGame} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur hover:bg-white/30 flex items-center justify-center text-white transition">
              <X className="w-4 h-4" />
            </button>
            <div className="p-8 md:p-10 text-white">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🎭</span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-bold">Game · Mô phỏng nhập vai</p>
                  <h2 className="text-xl font-black">Một ngày trong đời Amina</h2>
                </div>
              </div>

              {dayStep < dayChoices.length ? (
                <div className="space-y-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/80">Cảnh {dayStep + 1}/{dayChoices.length}</span>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur">
                      <span>💧</span>
                      <span className="font-black">{dayWater}L</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div animate={{ width: `${Math.min(100, (dayWater / 300) * 100)}%` }} className="h-full rounded-full bg-white" />
                  </div>

                  <motion.div key={dayStep} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <p className="text-xl font-black mb-3">{dayChoices[dayStep].scene}</p>
                    <p className="text-sm text-white/95 leading-relaxed">{dayChoices[dayStep].desc}</p>
                  </motion.div>

                  <div className="grid gap-2">
                    {dayChoices[dayStep].options.map((opt, i) => (
                      <button key={i} onClick={() => chooseDayOption(opt.impact, opt.msg)}
                        className="text-left p-4 rounded-xl bg-white/10 hover:bg-white/25 backdrop-blur border border-white/20 hover:border-white/40 transition-all flex items-center justify-between group">
                        <span className="text-sm font-semibold pr-3">{opt.label}</span>
                        <span className={`text-xs font-black px-2.5 py-1 rounded-full whitespace-nowrap ${opt.impact > 0 ? "bg-emerald-300 text-emerald-900" : Math.abs(opt.impact) > 30 ? "bg-rose-300 text-rose-900" : "bg-amber-200 text-amber-900"}`}>
                          {opt.impact > 0 ? `+${opt.impact}` : opt.impact}L
                        </span>
                      </button>
                    ))}
                  </div>
                  {dayMessages.length > 0 && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-white/85 italic bg-white/5 backdrop-blur rounded-xl p-3 border border-white/10">
                      💭 {dayMessages[dayMessages.length - 1]}
                    </motion.p>
                  )}
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                  <div className="text-7xl mb-4">{dayWater > 200 ? "💚" : dayWater > 80 ? "💛" : "💔"}</div>
                  <h3 className="text-3xl font-black">Còn lại {dayWater}L</h3>
                  <p className="text-sm text-white/90 mt-3 max-w-md mx-auto leading-relaxed">
                    {dayWater > 200 ? "Tuyệt vời! Bạn đã sống có ý thức — đủ nước cho gia đình Amina dùng trong 40 ngày."
                      : dayWater > 80 ? "Khá tốt — nhưng vẫn còn nhiều cơ hội tiết kiệm. Amina sẽ vẫn phải đi 6km mỗi ngày."
                      : "Đáng buồn. Bạn đã dùng quá nhiều. Amina và 411 triệu người Châu Phi vẫn đang khát."}
                  </p>
                  <button onClick={resetDay} className="mt-6 px-6 py-3 bg-white text-slate-900 rounded-full text-sm font-bold hover:scale-105 transition shadow-xl">
                    Chơi lại
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* SORTING GAME */}
      <Dialog open={openGame === "sort"} onOpenChange={(o) => !o && closeGame()}>
        <DialogContent className="max-w-xl p-0 overflow-hidden border-0 bg-transparent shadow-none max-h-[92vh] overflow-y-auto">
          <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-8 md:p-10 text-white">
            <button onClick={closeGame} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur hover:bg-white/30 flex items-center justify-center text-white"><X className="w-4 h-4" /></button>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🎯</span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-bold">Game · 10 tình huống</p>
                <h2 className="text-xl font-black">Lãng phí hay Tiết kiệm?</h2>
              </div>
            </div>

            {remainingItems.length > 0 ? (
              <div className="space-y-5">
                <div className="flex justify-between text-xs text-white/80">
                  <span>Còn {remainingItems.length}/{sortingItems.length} hành động</span>
                  <span>Đúng: <span className="font-black text-base">{sortCorrect}</span></span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div key={remainingItems[0].id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
                    className={`p-8 rounded-2xl text-center backdrop-blur-md border-2 transition-colors ${
                      sortFeedback?.id === remainingItems[0].id
                        ? sortFeedback.correct ? "bg-emerald-300/30 border-emerald-200" : "bg-rose-400/30 border-rose-200"
                        : "bg-white/15 border-white/30"
                    }`}>
                    <p className="text-2xl md:text-3xl font-black">{remainingItems[0].label}</p>
                    {sortFeedback?.id === remainingItems[0].id && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-2">
                        <p className="text-base font-bold">{sortFeedback.correct ? "✓ Chính xác!" : "✗ Sai rồi!"}</p>
                        <p className="text-xs text-white/95 leading-relaxed bg-white/10 backdrop-blur rounded-lg p-3 border border-white/20">
                          📊 {sortFeedback.fact}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => sortItem(remainingItems[0], true)} disabled={!!sortFeedback}
                    className="p-5 rounded-2xl bg-rose-500/40 hover:bg-rose-500/60 border-2 border-rose-300/50 hover:border-rose-200 backdrop-blur transition-all font-black text-lg disabled:opacity-50">
                    🚫 LÃNG PHÍ
                  </button>
                  <button onClick={() => sortItem(remainingItems[0], false)} disabled={!!sortFeedback}
                    className="p-5 rounded-2xl bg-emerald-400/40 hover:bg-emerald-400/60 border-2 border-emerald-200/60 hover:border-emerald-100 backdrop-blur transition-all font-black text-lg disabled:opacity-50">
                    ✓ TIẾT KIỆM
                  </button>
                </div>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                <div className="text-7xl mb-3">{sortCorrect === sortingItems.length ? "🏆" : sortCorrect >= 7 ? "🥈" : "📚"}</div>
                <h3 className="text-5xl font-black">{sortCorrect}/{sortingItems.length}</h3>
                <p className="text-sm mt-2 text-white/90">{sortCorrect === sortingItems.length ? "Hoàn hảo! Bạn là chuyên gia tiết kiệm nước." : sortCorrect >= 7 ? "Khá tốt — vẫn còn cơ hội học thêm." : "Hãy thử lại để hiểu rõ hơn."}</p>
                <button onClick={resetSort} className="mt-5 px-6 py-3 bg-white text-emerald-700 rounded-full text-sm font-bold hover:scale-105 transition shadow-xl">Chơi lại</button>
              </motion.div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* QUIZ */}
      <Dialog open={openGame === "quiz"} onOpenChange={(o) => !o && closeGame()}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-0 bg-transparent shadow-none max-h-[92vh] overflow-y-auto">
          <div className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-700 rounded-3xl p-8 md:p-10 text-white">
            <button onClick={closeGame} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur hover:bg-white/30 flex items-center justify-center text-white"><X className="w-4 h-4" /></button>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">❓</span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-bold">Quiz · 12 câu hỏi đa cấp</p>
                <h2 className="text-xl font-black">Bạn hiểu bao nhiêu về nước?</h2>
              </div>
            </div>

            {!quizDone ? (
              <div>
                <div className="flex justify-between mb-4 text-sm">
                  <span className="text-white/80">Câu {quizIndex + 1}/{quizQuestions.length}</span>
                  <span className="font-black">⭐ {quizScore} điểm</span>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full mb-6 overflow-hidden">
                  <motion.div animate={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }} className="h-full bg-gradient-to-r from-emerald-300 to-cyan-300 rounded-full" />
                </div>
                <p className="text-lg md:text-xl font-bold mb-5 leading-snug">{quizQuestions[quizIndex].q}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {quizQuestions[quizIndex].options.map((opt, i) => {
                    const answered = quizAnswer !== -1;
                    const isCorrect = i === quizQuestions[quizIndex].correct;
                    const isSelected = i === quizAnswer;
                    return (
                      <button key={i} onClick={() => !answered && answerQuiz(i)} disabled={answered}
                        className={`p-4 rounded-xl text-sm font-bold border-2 backdrop-blur transition-all text-left ${
                          answered
                            ? isCorrect ? "bg-emerald-400/40 border-emerald-200" : isSelected ? "bg-rose-400/40 border-rose-200" : "border-white/20 opacity-40"
                            : "bg-white/10 border-white/30 hover:bg-white/25 hover:border-white"
                        }`}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {quizAnswer !== -1 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 bg-white/15 backdrop-blur rounded-xl p-4 border border-white/20">
                    <p className="text-sm leading-relaxed">{quizQuestions[quizIndex].explain}</p>
                  </motion.div>
                )}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                <div className="text-7xl mb-3">{quizScore >= 10 ? "🏆" : quizScore >= 7 ? "🥈" : quizScore >= 4 ? "🥉" : "📚"}</div>
                <div className="text-5xl font-black">{quizScore}/{quizQuestions.length}</div>
                <p className="text-sm mt-3 text-white/90 max-w-md mx-auto">
                  {quizScore >= 10 ? "Xuất sắc! Bạn là chuyên gia về nước sạch — hãy chia sẻ kiến thức này."
                    : quizScore >= 7 ? "Khá tốt! Bạn đã có nhận thức vững về vấn đề nước."
                    : quizScore >= 4 ? "Mức trung bình — hãy quay lại trang Thực trạng để tìm hiểu thêm."
                    : "Còn nhiều điều để khám phá. Hãy bắt đầu từ trang Thực trạng."}
                </p>
                <button onClick={resetQuiz} className="mt-5 px-6 py-3 bg-white text-blue-700 rounded-full text-sm font-bold hover:scale-105 transition shadow-xl">Làm lại</button>
              </motion.div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* T/F */}
      <Dialog open={openGame === "tf"} onOpenChange={(o) => !o && closeGame()}>
        <DialogContent className="max-w-xl p-0 overflow-hidden border-0 bg-transparent shadow-none max-h-[92vh] overflow-y-auto">
          <div className="relative bg-gradient-to-br from-teal-600 via-emerald-600 to-green-700 rounded-3xl p-8 md:p-10 text-white">
            <button onClick={closeGame} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur hover:bg-white/30 flex items-center justify-center text-white"><X className="w-4 h-4" /></button>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">⚖️</span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-bold">Game · 10 câu Đúng/Sai</p>
                <h2 className="text-xl font-black">Phá vỡ hiểu lầm</h2>
              </div>
            </div>

            {tfStep < tfQuestions.length ? (
              <div className="space-y-5">
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">Câu {tfStep + 1}/{tfQuestions.length}</span>
                  <span className="font-black">⭐ {tfScore}</span>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div animate={{ width: `${((tfStep + 1) / tfQuestions.length) * 100}%` }} className="h-full bg-cyan-300 rounded-full" />
                </div>
                <motion.div key={tfStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/15 backdrop-blur rounded-2xl p-6 text-center border border-white/20 min-h-[120px] flex items-center justify-center">
                  <p className="text-lg md:text-xl font-bold leading-snug">{tfQuestions[tfStep].q}</p>
                </motion.div>
                {tfAnswer === null ? (
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => answerTF(true)} className="p-5 rounded-2xl bg-emerald-400/40 hover:bg-emerald-400/60 border-2 border-emerald-200/50 hover:border-emerald-100 transition-all font-black text-lg">✓ ĐÚNG</button>
                    <button onClick={() => answerTF(false)} className="p-5 rounded-2xl bg-blue-500/40 hover:bg-blue-500/60 border-2 border-blue-300/50 hover:border-blue-200 transition-all font-black text-lg">✗ SAI</button>
                  </div>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-5 rounded-xl border-2 backdrop-blur ${tfAnswer === tfQuestions[tfStep].answer ? "bg-emerald-400/30 border-emerald-200" : "bg-rose-400/30 border-rose-200"}`}>
                    <p className="text-base font-black">{tfAnswer === tfQuestions[tfStep].answer ? "✓ Chính xác!" : "✗ Sai rồi"}</p>
                    <p className="text-sm mt-2 text-white/95 leading-relaxed">{tfQuestions[tfStep].explain}</p>
                  </motion.div>
                )}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                <div className="text-7xl mb-3">{tfScore >= 8 ? "🎯" : tfScore >= 5 ? "👍" : "📚"}</div>
                <div className="text-5xl font-black">{tfScore}/{tfQuestions.length}</div>
                <p className="text-sm mt-3 text-white/90">{tfScore >= 8 ? "Tuyệt vời! Bạn nắm rõ sự thật về nước." : "Hãy quay lại các câu sai để học thêm."}</p>
                <button onClick={resetTF} className="mt-5 px-6 py-3 bg-white text-emerald-700 rounded-full text-sm font-bold hover:scale-105 transition shadow-xl">Làm lại</button>
              </motion.div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* CALC */}
      <Dialog open={openGame === "calc"} onOpenChange={(o) => !o && closeGame()}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-0 bg-transparent shadow-none max-h-[92vh] overflow-y-auto">
          <div className="relative bg-white rounded-3xl p-8 md:p-10">
            <button onClick={closeGame} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700"><X className="w-4 h-4" /></button>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-2xl">🧮</div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">Tool · Theo chuẩn EPA/WHO 2026</p>
                <h2 className="text-xl font-black text-slate-900">Máy tính nước cá nhân</h2>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-3 mb-5 text-[11px] text-slate-600 leading-relaxed">
              💡 <strong>Số liệu chuẩn:</strong> Toilet hiện đại 6L/lần · Vòi sen 9.5L/phút · Đánh răng vòi mở 6L/phút · Rửa tay 1.5L/lần (10s) · Giặt máy cửa trước 60L/tải · Rửa bát vòi mở 9L/phút.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sliders.map((item) => (
                <div key={item.key}>
                  <div className="flex justify-between items-baseline mb-2">
                    <label className="text-sm font-semibold text-slate-700">{item.label}</label>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-black text-blue-600">{usage[item.key]}</span>
                      <span className="text-[10px] text-slate-500">{item.unit} = {Math.round(usage[item.key] * item.per)}L</span>
                    </div>
                  </div>
                  <input type="range" min="0" max={item.max} value={usage[item.key]} step={item.key === "laundryLoads" ? 1 : 1}
                    onChange={(e) => setUsage((u) => ({ ...u, [item.key]: parseFloat(e.target.value) }))}
                    className="w-full accent-blue-600" />
                  <p className="text-[9px] text-slate-400 mt-1">{item.hint}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setCalculated(true)} className="w-full mt-5 py-3.5 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-xl font-bold text-sm hover:opacity-90 transition shadow-lg">
              💧 Tính toán ngay!
            </button>
            <AnimatePresence>
              {calculated && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 pt-5 border-t border-slate-200 space-y-3">
                  <div className="text-center">
                    <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                      {totalWater}L
                    </motion.div>
                    <p className="text-xs text-slate-500 mt-1">lượng nước bạn dùng mỗi ngày · Trung bình VN: ~150L/ngày</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
                      <p className="text-xl font-black text-blue-600">{africaEquivalent}</p>
                      <p className="text-[9px] text-slate-600 mt-1">ngày nước cho 1 người Châu Phi (5L/ngày)</p>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
                      <p className="text-xl font-black text-emerald-600">{Math.round(totalWater * 365 / 1000)}m³</p>
                      <p className="text-[9px] text-slate-600 mt-1">mỗi năm</p>
                    </div>
                    <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-3 text-center">
                      <p className="text-xl font-black text-cyan-600">{Math.round(totalWater * 365 * 0.0003)}kg</p>
                      <p className="text-[9px] text-slate-600 mt-1">CO₂/năm (từ xử lý nước)</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-blue-50 border border-emerald-200 rounded-xl p-4">
                    <p className="text-xs font-black text-emerald-700 mb-2">💡 3 mẹo tiết kiệm hiệu quả nhất:</p>
                    <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                      <li>Giảm tắm 3 phút = <strong>tiết kiệm 28L/ngày = 10,300L/năm</strong></li>
                      <li>Lắp đầu vòi aerator (~30K VNĐ) = <strong>giảm 30-50% nước rửa tay/đánh răng</strong></li>
                      <li>Đổi sang toilet dual-flush = <strong>tiết kiệm ~30L/ngày</strong></li>
                    </ul>
                  </div>
                  <p className="text-[9px] text-slate-400 text-center pt-2">📎 Nguồn: EPA WaterSense 2024 · WHO Water Guidelines 2025 · Bộ TNMT VN 2024</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>

      {/* CHALLENGE */}
      <Dialog open={openGame === "challenge"} onOpenChange={(o) => !o && closeGame()}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden border-0 bg-transparent shadow-none max-h-[92vh] overflow-y-auto">
          <div className="relative bg-white rounded-3xl p-8 md:p-10">
            <button onClick={closeGame} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700"><X className="w-4 h-4" /></button>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-2xl">📅</div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">Tool · Thử thách 14 ngày</p>
                <h2 className="text-xl font-black text-slate-900">Mỗi ngày 1 hành động</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {challenges.map((ch) => {
                const done = completedDays.includes(ch.day);
                return (
                  <motion.button key={ch.day} whileTap={{ scale: 0.95 }}
                    onClick={() => setCompletedDays((d) => done ? d.filter((x) => x !== ch.day) : [...d, ch.day])}
                    className={`text-left rounded-xl p-4 border-2 transition-all ${done ? "bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-300 shadow-md shadow-emerald-200/50" : "bg-white border-slate-200 hover:border-blue-300"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{ch.icon}</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${done ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600"}`}>Ngày {ch.day}</span>
                    </div>
                    <p className="text-sm font-black text-slate-900">{ch.title}</p>
                    <p className="text-xs text-emerald-600 font-bold mt-1">Tiết kiệm: {ch.save}</p>
                    <p className="text-[10px] text-slate-500 mt-1">💡 {ch.tip}</p>
                  </motion.button>
                );
              })}
            </div>
            <div className="mt-5 pt-5 border-t border-slate-200">
              <div className="text-center">
                <p className="text-base font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  {completedDays.length === 14 ? "🎉 Hoàn thành! Bạn đã tiết kiệm ~2,000L/14 ngày = nước cho 1 người Châu Phi 1 năm!" : `${completedDays.length}/14 ngày hoàn thành`}
                </p>
                <div className="w-full h-2 bg-slate-100 rounded-full mt-3 overflow-hidden">
                  <motion.div animate={{ width: `${(completedDays.length / 14) * 100}%` }} className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* PLEDGE */}
      <Dialog open={openGame === "pledge"} onOpenChange={(o) => !o && closeGame()}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-0 bg-transparent shadow-none max-h-[92vh] overflow-y-auto">
          <div className="relative bg-white rounded-3xl overflow-hidden">
            <button onClick={closeGame} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-slate-700 shadow-md"><X className="w-4 h-4" /></button>
            <div className="p-8 md:p-10 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-600 flex items-center justify-center text-2xl">✋</div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">Live · Cộng đồng VLU</p>
                  <h2 className="text-xl font-black text-slate-900">Cam kết hành động</h2>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-bold">Chọn cam kết của bạn (8 lựa chọn)</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {pledgeActions.map((p, i) => {
                    const selected = pledges.includes(i);
                    return (
                      <button key={i}
                        onClick={() => setPledges((prev) => selected ? prev.filter((x) => x !== i) : [...prev, i])}
                        className={`text-left rounded-xl p-3 border-2 transition-all ${selected ? "bg-gradient-to-br from-blue-50 to-emerald-50 border-blue-400 shadow-md" : "border-slate-200 hover:border-blue-300"}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{p.emoji}</span>
                          {selected && <span className="text-xs text-blue-600 font-black">✓</span>}
                        </div>
                        <p className="text-xs font-bold text-slate-900 leading-tight">{p.label}</p>
                        <p className="text-[10px] text-emerald-600 font-bold mt-0.5">{p.save}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-emerald-600 rounded-3xl p-8 text-center overflow-hidden">
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur border border-white/20">
                  <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse" />
                  <span className="text-[10px] text-white font-black tracking-wider">LIVE</span>
                </div>
                {drops.map((drop) => (
                  <motion.span key={drop.id} initial={{ y: 0, opacity: 1, scale: 1 }} animate={{ y: -200, opacity: 0, scale: 1.8 }} transition={{ duration: 1.8, ease: "easeOut" }}
                    className="absolute text-3xl pointer-events-none" style={{ left: `${drop.x}%`, bottom: "30%" }}>💧</motion.span>
                ))}
                <p className="text-[10px] text-white/70 uppercase tracking-[0.3em] mb-3 font-bold">🏫 Sinh viên VLU đã cam kết</p>
                <motion.div key={commitCount} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="text-6xl md:text-7xl font-black text-white">
                  {commitCount.toLocaleString("vi-VN")}
                </motion.div>
                <p className="text-sm text-white/85 mt-2 mb-6">đã hành động vì nước sạch Châu Phi</p>
                <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-6 text-white">
                  <div><p className="text-xl font-black">{(commitCount * 50).toLocaleString("vi-VN")}L</p><p className="text-[9px] text-white/70 uppercase">Đã tiết kiệm</p></div>
                  <div><p className="text-xl font-black">{Math.round(commitCount * 50 / 5).toLocaleString("vi-VN")}</p><p className="text-[9px] text-white/70 uppercase">Ngày Châu Phi</p></div>
                  <div><p className="text-xl font-black">{Math.round(commitCount / 100).toLocaleString("vi-VN")}</p><p className="text-[9px] text-white/70 uppercase">Trẻ em được giúp</p></div>
                </div>
                <button onClick={handleCommit} disabled={pledges.length === 0}
                  className={`px-8 py-3.5 rounded-full font-black text-sm transition-all ${pledges.length > 0 ? "bg-white text-blue-700 hover:scale-105 active:scale-95 shadow-xl" : "bg-white/10 text-white/40 cursor-not-allowed"}`}>
                  {pledges.length > 0 ? `✋ CAM KẾT ${pledges.length} HÀNH ĐỘNG` : "Chọn ít nhất 1 cam kết"}
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
