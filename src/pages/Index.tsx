import { useEffect, useRef, useState } from "react";

const img_payments_month = "https://cdn.poehali.dev/projects/36488d9f-93b6-44f5-ac99-05e84f17e097/bucket/32c8422a-0e60-4488-95b4-6beeb3f4e81f.jpeg";
const img_payments_week = "https://cdn.poehali.dev/projects/36488d9f-93b6-44f5-ac99-05e84f17e097/bucket/2ddfa63c-cb74-4b67-bfa2-8e54f8a78a28.jpeg";
const img_profit = "https://cdn.poehali.dev/projects/36488d9f-93b6-44f5-ac99-05e84f17e097/bucket/1f27b8b0-34bc-4551-8618-b8d7117d3ca5.jpeg";
const img_salary = "https://cdn.poehali.dev/projects/36488d9f-93b6-44f5-ac99-05e84f17e097/bucket/81f18b15-c32d-454b-ad32-724383ee55ba.jpeg";

const useInView = (threshold = 0.1) => {
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
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms` }}>
      {children}
    </div>
  );
};

const C = {
  bg: "#f5f8fd",
  card: "#ffffff",
  navy: "#0a1e38",
  blue: "#0a4a9e",
  green: "#07924f",
  muted: "#6b86a0",
  border: "#e3eaf4",
  red: "#cc2222",
};

const Card = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ background: C.card, borderRadius: 16, padding: "28px 24px", boxShadow: "0 2px 14px rgba(0,0,0,0.055)", border: `1px solid ${C.border}`, ...style }}>
    {children}
  </div>
);

const Tag = ({ text, color }: { text: string; color: string }) => (
  <span style={{ display: "inline-block", background: `${color}18`, color, border: `1px solid ${color}33`, borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700, letterSpacing: 0.8 }}>
    {text}
  </span>
);

const CheckIcon = ({ color = "currentColor", size = 14 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const XIcon = ({ color = "currentColor", size = 14 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const ArrowIcon = ({ color = "currentColor", size = 14 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);


const beforeRows = [
  { label: "Первичные приёмы", before: "130 / мес", after: "164 / мес", change: "+26,2%" },
  { label: "Повторные приёмы", before: "55%", after: "65%", change: "+10 п.п." },
  { label: "Средний чек", before: "11 800 ₽", after: "13 727 ₽", change: "+16,3%" },
  { label: "Отзывы в месяц", before: "3", after: "12", change: "×4" },
  { label: "Выручка", before: "5 124 843 ₽", after: "7 765 702 ₽", change: "+51,5%" },
  { label: "Валовая прибыль", before: "1 732 949 ₽", after: "3 356 403 ₽", change: "+93,7%" },
  { label: "Валовая маржа", before: "~30–34%", after: "43%", change: "↑" },
];

const results = [
  { icon: "revenue", color: C.blue, label: "Выручка", delta: "+51,5%", sub: "5,1 → 7,8 млн ₽" },
  { icon: "profit", color: C.green, label: "Прибыль", delta: "+93,7%", sub: "1,7 → 3,4 млн ₽" },
  { icon: "primary", color: "#7c3aed", label: "Первичные", delta: "+26,2%", sub: "130 → 164 / мес" },
  { icon: "plan", color: "#e6940a", label: "Перевыполнение плана", delta: "+29%", sub: "цель 6 → факт 7,8 млн" },
];

const ResultIcon = ({ type, color }: { type: string; color: string }) => {
  const s: React.CSSProperties = { width: 28, height: 28, display: "block" };
  if (type === "revenue") return <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
  if (type === "profit") return <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8"/><line x1="12" y1="6" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="18"/></svg>;
  if (type === "primary") return <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
  if (type === "plan") return <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
  return null;
};

export default function Index() {
  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", background: C.bg, minHeight: "100vh", color: C.navy }}>

      {/* HERO */}
      <div style={{ background: `linear-gradient(140deg, ${C.navy} 0%, #1a4a80 100%)`, color: "#fff", padding: "clamp(48px, 8vw, 80px) 20px clamp(40px, 6vw, 64px)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
            <Tag text="КЕЙС" color="#7eb8ff" />
            <Tag text="СТОМАТОЛОГИЯ" color="#7eb8ff" />
            <Tag text="PDSA" color="#7eb8ff" />
          </div>
          <h1 style={{ fontSize: "clamp(22px, 4.5vw, 44px)", fontWeight: 800, lineHeight: 1.2, margin: "0 0 20px", maxWidth: 720 }}>
            Как клиника увеличила выручку на 51,5% за 3 месяца, изменив расписание врачей и работу администраторов
          </h1>
          <p style={{ fontSize: "clamp(14px, 2vw, 17px)", color: "rgba(255,255,255,0.7)", maxWidth: 580, lineHeight: 1.75, margin: 0 }}>
            Реальный кейс стоматологической клиники: от обнаружения точки потери до перевыполнения финансового плана на 29%.
          </p>

          {/* Hero-метрики */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginTop: 36 }}>
            {[
              { label: "Рост выручки", value: "+51,5%" },
              { label: "Рост прибыли", value: "+93,7%" },
              { label: "Перевыполнение плана", value: "+29%" },
              { label: "Срок эксперимента", value: "3 мес." },
            ].map((m, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "16px 14px", backdropFilter: "blur(4px)" }}>
                <div style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 800 }}>{m.value}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 20px 80px" }}>

        {/* Проблема */}
        <section style={{ marginTop: 52 }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 4, height: 28, background: C.red, borderRadius: 2, flexShrink: 0 }} />
              <h2 style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 800, margin: 0 }}>Проблема</h2>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <Card>
              <p style={{ color: C.muted, lineHeight: 1.8, fontSize: 15, margin: "0 0 20px" }}>
                В стоматологической клинике начали разбирать причины отказов пациентов после обращения. Анализ проводили в программе для стоматологии <strong style={{ color: C.navy }}>Future IT Dent</strong>: смотрели путь пациента от обращения и записи до первичного приёма, повторных визитов, выручки и валовой прибыли.
              </p>
              <p style={{ color: C.muted, lineHeight: 1.8, fontSize: 15, margin: "0 0 20px" }}>
                На первом этапе казалось, что пациенты отказываются из-за цены, конкуренции или недостаточной готовности. После анализа стало понятно, что одна из причин находилась внутри самой клиники.
              </p>
              <div style={{ background: "#fff5f5", border: `1px solid #f5caca`, borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
                <p style={{ margin: 0, fontWeight: 700, color: "#9a1010", fontSize: 15, lineHeight: 1.6 }}>
                  Часть пациентов хотела попасть на приём в ближайшее время, но подходящих слотов не было: запись была заполнена, нужный врач отсутствовал или ближайшее окно было слишком далеко.
                </p>
              </div>
              <p style={{ color: C.muted, lineHeight: 1.8, fontSize: 15, margin: "0 0 12px" }}>
                Пациенты с высокой вовлечённостью могли подождать. Но пациенты с низкой вовлечённостью уходили искать другой вариант.
              </p>
              <div style={{ background: `${C.navy}08`, borderRadius: 12, padding: "14px 18px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                <ArrowIcon color={C.blue} size={18} />
                <p style={{ margin: 0, fontWeight: 700, color: C.navy, fontSize: 15, lineHeight: 1.6 }}>
                  Так клиника обнаружила точку потери: часть денег терялась ещё до консультации — на этапе записи пациента.
                </p>
              </div>
            </Card>
          </Reveal>
        </section>

        {/* Гипотеза */}
        <section style={{ marginTop: 48 }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 4, height: 28, background: C.blue, borderRadius: 2, flexShrink: 0 }} />
              <h2 style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 800, margin: 0 }}>Гипотеза</h2>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <Card>
              <div style={{ background: `${C.blue}08`, borderRadius: 12, padding: "16px 20px", marginBottom: 20, borderLeft: `3px solid ${C.blue}` }}>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: C.navy }}>
                  Если нанять новых врачей, закрыть свободные дни в расписании и обучить администраторов быстрее доводить пациента до записи — количество отказов снизится.
                </p>
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {[
                  "Рост первичных приёмов",
                  "Увеличение общего количества визитов",
                  "Рост выручки без раздувания затрат",
                ].map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <CheckIcon color={C.green} size={15} />
                    <span style={{ color: C.muted, fontSize: 15 }}>{t}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, padding: "12px 16px", background: "#f0faf5", borderRadius: 10, border: `1px solid #c0e8d4` }}>
                <p style={{ margin: 0, fontWeight: 700, color: C.green, fontSize: 14 }}>
                  Цель на период теста — выйти на выручку 6 000 000 ₽
                </p>
              </div>
            </Card>
          </Reveal>
        </section>

        {/* Что сделали */}
        <section style={{ marginTop: 48 }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 4, height: 28, background: "#7c3aed", borderRadius: 2, flexShrink: 0 }} />
              <h2 style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 800, margin: 0 }}>Что сделали</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gap: 14 }}>
            {[
              { num: "01", color: C.blue, title: "Наняли новых врачей", desc: "Закрыли свободные дни и увеличили доступность записи для пациентов." },
              { num: "02", color: C.green, title: "Пересмотрели систему оплаты", desc: "Для новых специалистов: 20% от стоимости услуги и 3 000 ₽ за смену." },
              { num: "03", color: "#7c3aed", title: "Обучили администраторов", desc: "Акцент на быстрой реакции: если пациент хочет попасть в ближайшее время — сразу предложить варианты, не отпускать в «подумаю»." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <Card style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${item.color}15`, color: item.color, fontWeight: 800, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {item.num}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: C.navy, marginBottom: 6 }}>{item.title}</div>
                    <div style={{ color: C.muted, fontSize: 14, lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Что измеряли */}
        <section style={{ marginTop: 48 }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 4, height: 28, background: "#e6940a", borderRadius: 2, flexShrink: 0 }} />
              <h2 style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 800, margin: 0 }}>Что измеряли</h2>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <Card>
              <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
                На протяжении трёх месяцев отслеживали не только выручку, но и несколько связанных показателей:
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 8 }}>
                {[
                  "Увеличится ли количество первичных приёмов",
                  "Вырастет ли общее количество приёмов",
                  "Изменится ли доля повторных приёмов",
                  "Изменится ли средний чек",
                  "Сохранится ли конверсия в продажу планов лечения",
                  "Насколько увеличатся расходы на зарплату врачей",
                  "Как изменится валовая прибыль",
                ].map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 0", borderBottom: i < 6 ? `1px solid ${C.border}` : "none" }}>
                    <ArrowIcon color={C.blue} size={14} />
                    <span style={{ color: C.muted, fontSize: 14, lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        </section>

        {/* Скриншоты из системы */}
        <section style={{ marginTop: 48 }}>
          <Reveal>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>Данные из системы Future IT Dent</h3>
            <p style={{ color: C.muted, fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
              Динамика оплат по месяцам и неделям — отклонение от цели видно сразу
            </p>
          </Reveal>
          <div style={{ display: "grid", gap: 16 }}>
            {[
              { src: img_payments_month, caption: "Оплаты: динамика по месяцам. Факт 7 765 702 ₽ при цели 6 000 000 ₽ — перевыполнение на 29%" },
              { src: img_payments_week, caption: "Оплаты: разбивка по неделям апреля 2026" },
              { src: img_profit, caption: "Прибыль клиники: оплаты, затраты и валовая прибыль по месяцам" },
              { src: img_salary, caption: "Оплаты и зарплаты врачей — контроль доли ФОТ в выручке" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div style={{ borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.10)", border: `1px solid ${C.border}` }}>
                  <img src={item.src} alt={item.caption} style={{ width: "100%", display: "block" }} />
                  <div style={{ padding: "10px 16px", background: C.card, fontSize: 12, color: C.muted, borderTop: `1px solid ${C.border}` }}>
                    {item.caption}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Результат — таблица */}
        <section style={{ marginTop: 60 }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 4, height: 28, background: C.green, borderRadius: 2, flexShrink: 0 }} />
              <h2 style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 800, margin: 0 }}>Результат за 3 месяца</h2>
            </div>
            <p style={{ color: C.muted, marginBottom: 24, fontSize: 15 }}>Гипотеза подтвердилась. Цель по выручке была не просто достигнута, а перевыполнена на 29%.</p>
          </Reveal>

          {/* Карточки результатов */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 24 }}>
            {results.map((r, i) => (
              <Reveal key={i} delay={i * 60}>
                <div style={{ background: C.card, borderRadius: 14, padding: "22px 16px", boxShadow: "0 2px 10px rgba(0,0,0,0.055)", textAlign: "center", border: `1px solid ${C.border}` }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                    <ResultIcon type={r.icon} color={r.color} />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: C.navy, marginBottom: 4 }}>{r.label}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 10 }}>{r.sub}</div>
                  <div style={{ display: "inline-block", background: "#e8faf2", color: "#0a7a42", borderRadius: 20, padding: "4px 12px", fontWeight: 800, fontSize: 15 }}>{r.delta}</div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Таблица до/после */}
          <Reveal delay={80}>
            <div style={{ background: C.card, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 14px rgba(0,0,0,0.055)", border: `1px solid ${C.border}` }}>
              {/* Шапка */}
              <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 0.8fr" }}>
                <div style={{ padding: "13px 16px", background: "#d0dff5", fontWeight: 700, fontSize: 12, color: C.navy, textTransform: "uppercase", letterSpacing: 0.5 }}>Показатель</div>
                <div style={{ padding: "13px 12px", background: "#fbd4d4", fontWeight: 700, fontSize: 12, color: "#9a1010", borderLeft: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 5 }}>
                  <XIcon color="#9a1010" size={12} />Было
                </div>
                <div style={{ padding: "13px 12px", background: "#b8f0d4", fontWeight: 700, fontSize: 12, color: "#065c30", borderLeft: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 5 }}>
                  <CheckIcon color="#065c30" size={12} />Стало
                </div>
                <div style={{ padding: "13px 12px", background: "#d0dff5", fontWeight: 700, fontSize: 12, color: C.blue, borderLeft: `1px solid ${C.border}` }}>Рост</div>
              </div>
              {beforeRows.map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 0.8fr", borderTop: `1px solid ${C.border}` }}>
                  <div style={{ padding: "12px 16px", fontSize: 13, color: C.muted, background: i % 2 === 0 ? "#f5f8fd" : "#fff", lineHeight: 1.4 }}>{row.label}</div>
                  <div style={{ padding: "12px 12px", fontSize: 13, fontWeight: 600, color: "#9a1010", background: i % 2 === 0 ? "#fde8e8" : "#fef4f4", borderLeft: `1px solid ${C.border}` }}>{row.before}</div>
                  <div style={{ padding: "12px 12px", fontSize: 13, fontWeight: 600, color: "#065c30", background: i % 2 === 0 ? "#d4f5e4" : "#e8faf2", borderLeft: `1px solid ${C.border}` }}>{row.after}</div>
                  <div style={{ padding: "12px 12px", fontSize: 13, fontWeight: 800, color: C.blue, background: i % 2 === 0 ? "#e8f0fc" : "#f0f4fd", borderLeft: `1px solid ${C.border}` }}>{row.change}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>



        {/* Вывод */}
        <section style={{ marginTop: 48 }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 4, height: 28, background: C.navy, borderRadius: 2, flexShrink: 0 }} />
              <h2 style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 800, margin: 0 }}>Вывод</h2>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <Card style={{ marginBottom: 16 }}>
              <p style={{ color: C.muted, lineHeight: 1.8, fontSize: 15, margin: "0 0 16px" }}>
                Проблема была не только в количестве заявок, а в доступности приёма в момент, когда пациент готов записаться.
              </p>
              <p style={{ color: C.muted, lineHeight: 1.8, fontSize: 15, margin: "0 0 16px" }}>
                Когда клиника увеличила количество доступных слотов, усилила расписание врачами и обучила администраторов работать с пациентами «здесь и сейчас» — это повлияло сразу на несколько метрик.
              </p>
              <div style={{ background: `${C.navy}06`, borderRadius: 12, padding: "16px 20px", borderLeft: `3px solid ${C.navy}` }}>
                <p style={{ margin: 0, fontWeight: 700, color: C.navy, fontSize: 15, lineHeight: 1.7 }}>
                  Иногда рост клиники начинается не с увеличения рекламного бюджета, а с анализа точки потери внутри пациентского пути. Если пациент готов прийти, но клиника не может принять его в удобное время — деньги теряются ещё до консультации.
                </p>
              </div>
            </Card>
          </Reveal>
          <Reveal delay={100}>
            <Card style={{ background: `${C.blue}08`, border: `1px solid ${C.blue}22` }}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: C.blue, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: C.blue, fontSize: 15, marginBottom: 6 }}>Future IT Dent</div>
                  <div style={{ color: C.muted, fontSize: 14, lineHeight: 1.65 }}>
                    Анализ в программе Future IT Dent помог увидеть точку потери на этапе записи и проверить управленческую гипотезу на цифрах. Расширение врачебного расписания и обучение администраторов дали прирост выручки на <strong style={{ color: C.navy }}>51,5%</strong> и позволили перевыполнить план на <strong style={{ color: C.navy }}>29%</strong>.
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>
        </section>

        {/* Финальный блок */}
        <section style={{ marginTop: 48 }}>
          <Reveal>
            <div style={{ background: `linear-gradient(140deg, ${C.navy} 0%, #1a4a80 100%)`, borderRadius: 20, padding: "clamp(32px, 5vw, 52px) clamp(20px, 4vw, 44px)", color: "#fff", textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
              </div>
              <h2 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 800, marginBottom: 14 }}>Управленческая гипотеза подтвердилась</h2>
              <p style={{ fontSize: "clamp(13px, 2vw, 16px)", color: "rgba(255,255,255,0.72)", maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.8 }}>
                Расширение врачебного расписания и обучение администраторов дали прирост выручки на 51,5% и позволили перевыполнить план на 29%.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, maxWidth: 560, margin: "0 auto" }}>
                {[
                  "Видим точку потери в пациентском пути",
                  "Тестируем гипотезы на цифрах",
                  "Контролируем долю ФОТ в выручке",
                  "Перевыполняем финансовый план",
                ].map((t, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "13px 18px", fontSize: "clamp(12px, 2vw, 14px)", fontWeight: 500, width: "calc(50% - 6px)", boxSizing: "border-box", display: "flex", alignItems: "center", gap: 8, textAlign: "left" }}>
                    <CheckIcon color="rgba(255,255,255,0.8)" size={14} />
                    {t}
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