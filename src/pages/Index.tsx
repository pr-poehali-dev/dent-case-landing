import { useEffect, useRef, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

const pdsa_image = "https://cdn.poehali.dev/projects/36488d9f-93b6-44f5-ac99-05e84f17e097/files/5f33199a-ad3a-42bb-a486-47e2dfbff730.jpg";
const before_after_image = "https://cdn.poehali.dev/projects/36488d9f-93b6-44f5-ac99-05e84f17e097/files/5593215a-985a-43a0-a5fb-18113f2d322c.jpg";
const analytics_month = "https://cdn.poehali.dev/projects/36488d9f-93b6-44f5-ac99-05e84f17e097/bucket/864ce838-36d9-4b16-ac59-36ab8ccc0075.png";
const analytics_week = "https://cdn.poehali.dev/projects/36488d9f-93b6-44f5-ac99-05e84f17e097/bucket/04aff41b-99cb-4080-8007-65041f3bb810.png";

const useInView = (threshold = 0.12) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
};

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
};

const revenueData = [
  { month: "Янв", revenue: 3200, profit: 325 },
  { month: "Фев", revenue: 3350, profit: 370 },
  { month: "Мар", revenue: 3480, profit: 420 },
  { month: "Апр", revenue: 3600, profit: 470 },
  { month: "Май", revenue: 3820, profit: 560 },
  { month: "Июн", revenue: 4100, profit: 705 },
];

const reviewsData = [
  { month: "Янв", reviews: 18, patients: 220 },
  { month: "Фев", reviews: 26, patients: 225 },
  { month: "Мар", reviews: 38, patients: 228 },
  { month: "Апр", reviews: 52, patients: 231 },
  { month: "Май", reviews: 63, patients: 233 },
  { month: "Июн", reviews: 72, patients: 235 },
];

const conversionData = [
  { name: "До", conversion: 44, repeat: 48 },
  { name: "После", conversion: 61, repeat: 63 },
];

const C = {
  bg: "#f5f8fd",
  card: "#ffffff",
  navy: "#0a1e38",
  blue: "#0a4a9e",
  green: "#07924f",
  muted: "#6b86a0",
  border: "#e3eaf4",
  altBg: "#ddeaf8",
  red: "#cc2222",
};

const Tag = ({ text, color }: { text: string; color: string }) => (
  <span style={{ display: "inline-block", background: `${color}18`, color, border: `1px solid ${color}33`, borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>
    {text}
  </span>
);

const Card = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ background: C.card, borderRadius: 16, padding: "28px 32px", boxShadow: "0 2px 14px rgba(0,0,0,0.055)", border: `1px solid ${C.border}`, ...style }}>
    {children}
  </div>
);

const beforeRows = [
  { label: "Первичные пациенты", value: "220 / мес", after: "235 / мес" },
  { label: "Конверсия план → продажа", value: "44%", after: "61%" },
  { label: "Повторные визиты", value: "48%", after: "63%" },
  { label: "Средний чек", value: "14 500 ₽", after: "16 800 ₽" },
  { label: "Отзывов в месяц", value: "18", after: "72" },
  { label: "Общая выручка", value: "3 200 000 ₽", after: "4 100 000 ₽" },
  { label: "Чистая прибыль", value: "325 000 ₽", after: "705 000 ₽" },
];

const results = [
  { icon: "📈", label: "Выручка", delta: "+900 000 ₽/мес", sub: "3,2 → 4,1 млн" },
  { icon: "💰", label: "Прибыль", delta: "+380 000 ₽/мес", sub: "325 → 705 тыс." },
  { icon: "🔄", label: "Конверсия", delta: "+17 п.п.", sub: "44% → 61%" },
  { icon: "⭐", label: "Отзывы", delta: "×4", sub: "18 → 72 в мес" },
];

export default function Index() {
  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", background: C.bg, minHeight: "100vh", color: C.navy }}>

      {/* HERO */}
      <div style={{ background: `linear-gradient(140deg, ${C.navy} 0%, #1a4a80 100%)`, color: "#fff", padding: "72px 24px 64px" }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", borderRadius: 20, padding: "5px 16px", fontSize: 12, marginBottom: 22, letterSpacing: 1, fontWeight: 600 }}>
            КЕЙС · СТОМАТОЛОГИЯ
          </div>
          <h1 style={{ fontSize: "clamp(24px, 4.5vw, 46px)", fontWeight: 800, lineHeight: 1.18, marginBottom: 20, margin: "0 0 20px" }}>
            Как метод PDSA превратил гипотезы<br />в управляемый рост стоматологии
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", maxWidth: 580, lineHeight: 1.75, margin: "20px 0 0" }}>
            Большинство решений принимались «на ощущениях». Мы внедрили PDSA и сделали улучшения измеримыми.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 840, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* Проблема */}
        <section style={{ marginTop: 56 }}>
          <Reveal>
            <Card style={{ borderLeft: `4px solid ${C.red}` }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 18, color: C.navy }}>Проблема: управление по интуиции</h2>
              <div style={{ display: "grid", gap: 10 }}>
                {[
                  "«Кажется, средний чек вырос» — но цифр нет",
                  "«Вроде бы пациентов стало больше» — а может, меньше?",
                  "«Добавили отзывы — значит поток вырастет» — должен, но вырос ли?",
                ].map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ color: C.red, fontWeight: 700, marginTop: 1 }}>—</span>
                    <span style={{ color: C.muted, fontSize: 15, lineHeight: 1.6 }}>{t}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 22, padding: "14px 18px", background: "#fff5f5", borderRadius: 10, border: "1px solid #f5caca" }}>
                <p style={{ margin: 0, fontWeight: 700, color: C.navy }}> «Кажется» — это не стратегия. Нужны данные.</p>
              </div>
            </Card>
          </Reveal>
        </section>

        {/* Что такое PDSA */}
        <section style={{ marginTop: 48 }}>
          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Что такое PDSA</h2>
            <p style={{ color: C.muted, marginBottom: 24, fontSize: 15 }}>Простой цикл управляемых экспериментов</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 14 }}>
            {[
              { step: "P", title: "Plan", desc: "Ставим гипотезу", color: C.blue },
              { step: "D", title: "Do", desc: "Внедряем изменение", color: C.green },
              { step: "S", title: "Study", desc: "Измеряем результат", color: "#e6940a" },
              { step: "A", title: "Act", desc: "Масштабируем или корректируем", color: "#7c3aed" },
            ].map((item, i) => (
              <Reveal key={item.step} delay={i * 80}>
                <div style={{ background: C.card, borderRadius: 14, padding: "26px 18px", boxShadow: "0 2px 10px rgba(0,0,0,0.055)", textAlign: "center", border: `1px solid ${C.border}`, height: "100%" }}>
                  <div style={{ width: 50, height: 50, borderRadius: "50%", background: item.color, color: "#fff", fontSize: 22, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                    {item.step}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: item.color, marginBottom: 6 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div style={{ marginTop: 24, borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.09)" }}>
              <img src={pdsa_image} alt="PDSA" style={{ width: "100%", maxHeight: 320, objectFit: "cover", display: "block" }} />
            </div>
          </Reveal>
        </section>

        {/* Пример 1 */}
        <section style={{ marginTop: 60 }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 26 }}>
              <Tag text="ПРИМЕР 1" color={C.blue} />
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Гипотеза: увеличим средний чек</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gap: 14 }}>
            {[
              { tag: "Plan", color: C.blue, title: "Гипотеза", content: "Если увеличим средний чек за счёт комплексных планов лечения — вырастет общая выручка. Главное убедиться, что поток первичных не снизится, конверсия не упадёт." },
              { tag: "Do", color: C.green, title: "Что сделали", list: ["Усилили презентацию плана лечения", "Добавили структурированную упаковку", "Обучили администраторов проговаривать ценность"] },
              { tag: "Study", color: "#e6940a", title: "Что измеряли", list: ["Средний чек", "Количество первичных пациентов", "Конверсию «план → продажа»", "Повторные визиты", "Общий доход"] },
              { tag: "Act", color: "#7c3aed", title: "Решение", content: "Гипотеза подтвердилась: средний чек вырос, поток первичных не упал, конверсия осталась стабильной. Масштабируем на все кресла." },
            ].map((block, i) => (
              <Reveal key={block.tag} delay={i * 60}>
                <div style={{ background: C.card, borderRadius: 14, padding: "22px 26px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", borderLeft: `4px solid ${block.color}`, border: `1px solid ${C.border}`, borderLeftWidth: 4, borderLeftColor: block.color }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <Tag text={block.tag} color={block.color} />
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{block.title}</span>
                  </div>
                  {"content" in block && <p style={{ color: C.muted, lineHeight: 1.7, margin: 0, fontSize: 15 }}>{block.content}</p>}
                  {"list" in block && (
                    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 6 }}>
                      {block.list!.map((item, j) => (
                        <li key={j} style={{ display: "flex", gap: 10, color: C.muted, fontSize: 15 }}>
                          <span style={{ color: block.color, fontWeight: 700 }}>→</span> {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Скриншоты аналитики */}
        <section style={{ marginTop: 48 }}>
          <Reveal>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>Так выглядит аналитика в системе</h3>
            <p style={{ color: C.muted, fontSize: 14, marginBottom: 20 }}>Данные в разрезе месяцев и недель — видно отклонение от цели сразу</p>
          </Reveal>
          <div style={{ display: "grid", gap: 18 }}>
            {[analytics_month, analytics_week].map((src, i) => (
              <Reveal key={i} delay={i * 100}>
                <div style={{ borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.10)", border: `1px solid ${C.border}` }}>
                  <img src={src} alt={`Аналитика ${i + 1}`} style={{ width: "100%", display: "block" }} />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Пример 2 */}
        <section style={{ marginTop: 60 }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 26 }}>
              <Tag text="ПРИМЕР 2" color={C.green} />
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Как отзывы влияют на поток</h2>
            </div>
          </Reveal>

          <Reveal>
            <Card style={{ marginBottom: 20 }}>
              <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Гипотеза:</p>
              <p style={{ color: C.muted, lineHeight: 1.75, fontSize: 15, marginBottom: 20 }}>
                Если увеличить количество отзывов и рейтинг — вырастет поток первичных пациентов без роста рекламного бюджета.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  "Системный сбор отзывов",
                  "Follow-up через 2 ч после приёма",
                  "Мотивация оставлять отзывы на агрегаторах",
                  "Еженедельный мониторинг рейтинга",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ color: C.green, fontWeight: 700 }}>✓</span>
                    <span style={{ color: C.muted, fontSize: 14, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal delay={80}>
            <Card>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 20 }}>Динамика за 6 месяцев</h4>
              <ResponsiveContainer width="100%" height={230}>
                <LineChart data={reviewsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="right" type="monotone" dataKey="patients" stroke={C.blue} strokeWidth={2.5} dot={{ r: 4 }} name="Первичные пациенты" />
                  <Line yAxisId="left" type="monotone" dataKey="reviews" stroke={C.green} strokeWidth={2.5} dot={{ r: 4 }} name="Отзывов в месяц" />
                </LineChart>
              </ResponsiveContainer>
              <div style={{ marginTop: 16, padding: "12px 16px", background: "#f0faf5", borderRadius: 10, border: "1px solid #c0e8d4" }}>
                <p style={{ margin: 0, color: "#0a7a42", fontWeight: 600, fontSize: 14 }}>
                  Это не предположение. Это корреляция, подтверждённая цифрами.
                </p>
              </div>
            </Card>
          </Reveal>
        </section>

        {/* До и После — таблица */}
        <section style={{ marginTop: 60 }}>
          <Reveal>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Конкретный результат: до и после</h2>
            <p style={{ color: C.muted, marginBottom: 26, fontSize: 15 }}>Период: 6 месяцев · Клиника: 4 кресла</p>
          </Reveal>

          <Reveal>
            <div style={{ borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", marginBottom: 24, border: `1px solid ${C.border}` }}>
              <img src={before_after_image} alt="До и после" style={{ width: "100%", maxHeight: 300, objectFit: "cover", display: "block" }} />
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div style={{ background: C.card, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 14px rgba(0,0,0,0.055)", border: `1px solid ${C.border}` }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
                <div style={{ padding: "14px 20px", background: "#d0dff5", fontWeight: 700, fontSize: 13, color: "#0a1e38", textTransform: "uppercase", letterSpacing: 0.5 }}>Показатель</div>
                <div style={{ padding: "14px 20px", background: "#fbd4d4", fontWeight: 700, fontSize: 13, color: "#9a1010", borderLeft: `1px solid ${C.border}` }}>📌 ДО</div>
                <div style={{ padding: "14px 20px", background: "#b8f0d4", fontWeight: 700, fontSize: 13, color: "#065c30", borderLeft: `1px solid ${C.border}` }}>✅ ПОСЛЕ</div>
              </div>
              {beforeRows.map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: `1px solid ${C.border}` }}>
                  <div style={{ padding: "13px 20px", fontSize: 14, color: C.muted, background: i % 2 === 0 ? "#f5f8fd" : "#fff" }}>{row.label}</div>
                  <div style={{ padding: "13px 20px", fontSize: 14, fontWeight: 700, color: "#9a1010", background: i % 2 === 0 ? "#fde8e8" : "#fef4f4", borderLeft: `1px solid ${C.border}` }}>{row.value}</div>
                  <div style={{ padding: "13px 20px", fontSize: 14, fontWeight: 700, color: "#065c30", background: i % 2 === 0 ? "#d4f5e4" : "#e8faf2", borderLeft: `1px solid ${C.border}` }}>{row.after}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Карточки результатов */}
        <section style={{ marginTop: 32 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 14 }}>
            {results.map((r, i) => (
              <Reveal key={i} delay={i * 60}>
                <div style={{ background: C.card, borderRadius: 14, padding: "22px 18px", boxShadow: "0 2px 10px rgba(0,0,0,0.055)", textAlign: "center", border: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{r.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 4 }}>{r.label}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginBottom: 10 }}>{r.sub}</div>
                  <div style={{ display: "inline-block", background: "#e8faf2", color: "#0a7a42", borderRadius: 20, padding: "4px 12px", fontWeight: 800, fontSize: 14 }}>{r.delta}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Графики */}
        <section style={{ marginTop: 32 }}>
          <Reveal>
            <Card style={{ marginBottom: 16 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 20 }}>Динамика выручки и прибыли (тыс. ₽)</h4>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(v: number) => `${v.toLocaleString()} тыс. ₽`} />
                  <Legend />
                  <Bar dataKey="revenue" fill={C.blue} name="Выручка" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="profit" fill={C.green} name="Прибыль" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Reveal>

          <Reveal delay={60}>
            <Card>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 20 }}>Конверсия и повторные визиты: до vs после (%)</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={conversionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
                  <XAxis type="number" domain={[0, 80]} tick={{ fontSize: 12 }} unit="%" />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={50} />
                  <Tooltip formatter={(v: number) => `${v}%`} />
                  <Legend />
                  <Bar dataKey="conversion" fill={C.blue} name="Конверсия план→продажа" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="repeat" fill={C.green} name="Повторные визиты" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Reveal>
        </section>

        {/* Управленческий сдвиг */}
        <section style={{ marginTop: 48 }}>
          <Reveal>
            <Card>
              <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 22 }}>Что изменилось управленчески</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: C.red, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>❌ Раньше</div>
                  {["Гипотезы внедрялись вслепую", "Результат оценивался через 3–6 месяцев", "Непонятно, что именно повлияло на рост"].map((t, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, color: C.muted, fontSize: 14, lineHeight: 1.5 }}>
                      <span>—</span>{t}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: C.green, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>✅ Сейчас</div>
                  {["Ставим цель: например, +10% к повторным", "Внедряем изменение и смотрим графики", "Видим отклонение от цели сразу — неделя/месяц"].map((t, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, color: C.muted, fontSize: 14, lineHeight: 1.5 }}>
                      <span style={{ color: C.green }}>→</span>{t}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Reveal>
        </section>

        {/* Финальный вывод */}
        <section style={{ marginTop: 48 }}>
          <Reveal>
            <div style={{ background: `linear-gradient(140deg, ${C.navy} 0%, #1a4a80 100%)`, borderRadius: 20, padding: "48px 40px", color: "#fff", textAlign: "center" }}>
              <div style={{ fontSize: 38, marginBottom: 14 }}>🚀</div>
              <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 14 }}>Рост — это не случайность</h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.72)", maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.8 }}>
                Рост — это последовательность гипотез, проверенных цифрами. Метод PDSA позволил видеть влияние каждого изменения и управлять клиникой осознанно.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 14, maxWidth: 620, margin: "0 auto" }}>
                {["Видим влияние каждого изменения", "Управляем конверсиями", "Прогнозируем выручку", "Масштабируем осознанно"].map((t, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "14px 16px", fontSize: 14, fontWeight: 500 }}>
                    ✓ {t}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

      </div>
    </div>
  );
}