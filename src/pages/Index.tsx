import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const useInView = (threshold = 0.15) => {
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

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
};

export default function Index() {
  return (
    <div className="min-h-screen font-golos" style={{ background: "var(--bg)", color: "var(--text)" }}>

      {/* ───── HERO ───── */}
      <section className="relative overflow-hidden" style={{ background: "var(--bg)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(180,255,220,0.06) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "5%", left: "-8%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(100,180,255,0.05) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "var(--divider)" }} />
        </div>

        <div className="max-w-4xl mx-auto px-6 pt-20 pb-24 relative">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-8" style={{ background: "var(--tag-bg)", color: "var(--accent-green)", border: "1px solid var(--tag-border)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent-green)", display: "inline-block" }} />
              Кейс · Future Care 360
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-cormorant leading-[1.1] mb-6" style={{ fontSize: "clamp(2.4rem, 6vw, 4.2rem)", color: "var(--text)" }}>
              Как мы ускорили конверсию<br />
              <em style={{ color: "var(--accent-green)" }}>вторичных и лояльных пациентов</em><br />
              в два раза
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "var(--muted)" }}>
              С помощью интерактивных триггеров в Future Care 360 мы сократили путь от сообщения до записи с 12 до 6 месяцев — без скидочных войн и ручной работы.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="grid grid-cols-3 gap-4 mt-14 max-w-xl">
              {[
                { val: "×2", sub: "вовлечённость пациентов", color: "var(--accent-green)", glow: "rgba(45,216,130,0.12)" },
                { val: "6 мес", sub: "вместо 12 до конверсии", color: "var(--accent-blue)", glow: "rgba(74,168,255,0.12)" },
                { val: "+30–40%", sub: "ожидаемый рост за год", color: "var(--accent-navy)", glow: "rgba(107,140,255,0.12)" },
              ].map((m, i) => (
                <div key={i} className="rounded-2xl p-4 text-center" style={{ background: m.glow, border: `1.5px solid ${m.color}30` }}>
                  <div className="font-cormorant font-bold leading-none mb-1" style={{ fontSize: "2rem", color: m.color }}>{m.val}</div>
                  <div className="text-xs leading-snug" style={{ color: "var(--muted)" }}>{m.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───── СТАРЫЙ ПОДХОД ───── */}
      <section style={{ background: "var(--section-alt)", borderTop: "1px solid var(--divider)", borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-4xl mx-auto px-6 py-20">
          <Reveal>
            <div className="flex items-center gap-3 mb-10">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "rgba(255,100,80,0.12)", color: "#ff6450" }}>01</span>
              <h2 className="font-cormorant text-3xl font-semibold" style={{ color: "var(--text)" }}>Как было раньше</h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <Reveal delay={80}>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
                Через Future Care 360 мы выстраивали стандартные триггеры с напоминанием о профилактическом осмотре. Конверсия достигала хороших значений, но <strong style={{ color: "var(--text)" }}>путь занимал до года</strong>.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                Пациенты долго принимали решение и часто откладывали запись. Классические напоминания работали, но не давали нужной <strong style={{ color: "var(--text)" }}>скорости и глубины вовлечения</strong>.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <div className="rounded-2xl overflow-hidden" style={{ border: "1.5px solid rgba(255,100,80,0.25)", background: "var(--card)" }}>
                <div className="px-4 py-3 flex items-center gap-2 border-b" style={{ borderColor: "rgba(255,100,80,0.15)", background: "rgba(255,100,80,0.06)" }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "rgba(255,100,80,0.15)", color: "#ff6450" }}>FS</div>
                  <div>
                    <div className="text-xs font-semibold" style={{ color: "var(--text)" }}>Future Smile</div>
                    <div className="text-xs" style={{ color: "var(--muted)" }}>Стандартное напоминание</div>
                  </div>
                  <div className="ml-auto text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,100,80,0.15)", color: "#ff6450" }}>Старый формат</div>
                </div>
                <div className="p-5 text-sm leading-relaxed space-y-3" style={{ color: "var(--text)" }}>
                  <p>Здравствуйте, Евгения Сергеевна!</p>
                  <p style={{ color: "var(--muted)" }}>Пора немного позаботиться о себе — прошло больше 6 месяцев с последнего осмотра 🦷</p>
                  <p style={{ color: "var(--muted)" }}>Профилактическая гигиена помогает сохранить зубы и дёсны здоровыми, а улыбку — свежей ✨</p>
                  <div className="rounded-xl px-4 py-3 text-sm" style={{ background: "rgba(255,100,80,0.08)", border: "1px solid rgba(255,100,80,0.2)", color: "#ff7060" }}>
                    Только сейчас — дополнительная скидка 10% на профессиональную чистку в течение 15 дней.
                  </div>
                  <p style={{ color: "var(--muted)" }}>💬 Запишитесь на удобное время — ответьте на это сообщение</p>
                  <p className="text-xs" style={{ color: "var(--muted)", opacity: 0.5 }}>👉 futuresmile-clinic.ru/pamyatka-gigiena</p>
                </div>
                <div className="px-5 py-4 border-t" style={{ borderColor: "rgba(255,100,80,0.15)", background: "rgba(255,100,80,0.04)" }}>
                  <div className="flex gap-4 text-xs" style={{ color: "var(--muted)" }}>
                    <span>Вторичные: <strong style={{ color: "#ff6450" }}>40%</strong></span>
                    <span>Лояльные: <strong style={{ color: "#ff6450" }}>60%</strong></span>
                    <span style={{ marginLeft: "auto" }}>⏱ до 12 месяцев</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───── ГИПОТЕЗА ───── */}
      <section style={{ background: "var(--bg)", borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-4xl mx-auto px-6 py-20">
          <Reveal>
            <div className="flex items-center gap-3 mb-10">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "rgba(100,180,255,0.12)", color: "#64b4ff" }}>02</span>
              <h2 className="font-cormorant text-3xl font-semibold" style={{ color: "var(--text)" }}>Гипотеза</h2>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="rounded-2xl p-8 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(74,168,255,0.08) 0%, rgba(107,140,255,0.08) 100%)", border: "1.5px solid rgba(74,168,255,0.2)" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 240, height: 240, background: "radial-gradient(circle at top right, rgba(74,168,255,0.12), transparent 70%)", pointerEvents: "none" }} />
              <p className="font-cormorant text-2xl leading-relaxed mb-4" style={{ color: "var(--text)", fontStyle: "italic" }}>
                «Проблема не в самом предложении, а в формате коммуникации»
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                Если дать пациенту <strong style={{ color: "var(--accent-green)" }}>выбор</strong> и вовлечь его в диалог — решение будет приниматься быстрее. Пассивное чтение уступает место активному действию.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───── НОВЫЙ ФОРМАТ ───── */}
      <section style={{ background: "var(--section-alt)", borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-4xl mx-auto px-6 py-20">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "rgba(180,255,180,0.12)", color: "var(--accent-green)" }}>03</span>
              <h2 className="font-cormorant text-3xl font-semibold" style={{ color: "var(--text)" }}>Новый формат</h2>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <p className="text-base mb-10" style={{ color: "var(--muted)" }}>
              Интерактивный триггер предлагает пациенту готовые варианты — вместо пустого призыва «позвоните нам».
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {[
                { emoji: "🎁", label: "15% на профессиональную гигиену", bg: "linear-gradient(145deg, rgba(45,216,130,0.12) 0%, rgba(45,216,130,0.05) 100%)", border: "rgba(45,216,130,0.3)", accent: "var(--accent-green)", tag: "rgba(45,216,130,0.15)" },
                { emoji: "🦷", label: "15% на лечение", bg: "linear-gradient(145deg, rgba(74,168,255,0.12) 0%, rgba(74,168,255,0.05) 100%)", border: "rgba(74,168,255,0.3)", accent: "var(--accent-blue)", tag: "rgba(74,168,255,0.15)" },
                { emoji: "⭐️", label: "2 000 бонусов на счёт", bg: "linear-gradient(145deg, rgba(107,140,255,0.12) 0%, rgba(107,140,255,0.05) 100%)", border: "rgba(107,140,255,0.3)", accent: "var(--accent-navy)", tag: "rgba(107,140,255,0.15)" },
              ].map((o, i) => (
                <div key={i} className="rounded-2xl p-6 flex flex-col items-center text-center gap-3" style={{ background: o.bg, border: `1.5px solid ${o.border}` }}>
                  <span style={{ fontSize: "2rem" }}>{o.emoji}</span>
                  <span className="text-sm font-medium leading-snug" style={{ color: "var(--text)" }}>{o.label}</span>
                  <span className="text-xs px-3 py-1 rounded-full mt-auto font-medium" style={{ background: o.tag, color: o.accent, border: `1px solid ${o.border}` }}>Предложение</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { num: "1", title: "Выбор вместо давления", text: "Пациент чувствует контроль над решением, а не получает директиву.", color: "var(--accent-green)", glow: "rgba(45,216,130,0.1)" },
                { num: "2", title: "Мгновенное вовлечение", text: "Ответить на кнопку проще, чем обдумывать запись самостоятельно.", color: "var(--accent-blue)", glow: "rgba(74,168,255,0.1)" },
                { num: "3", title: "Меньше нагрузки", text: "Мы убрали необходимость «решать самому» что именно нужно.", color: "var(--accent-navy)", glow: "rgba(107,140,255,0.1)" },
              ].map((f, i) => (
                <div key={i} className="rounded-xl p-5 flex flex-col gap-3" style={{ background: f.glow, border: `1.5px solid ${f.color}30` }}>
                  <span className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold" style={{ background: f.color + "22", color: f.color }}>{f.num}</span>
                  <div>
                    <div className="font-semibold text-sm mb-1" style={{ color: "var(--text)" }}>{f.title}</div>
                    <div className="text-sm" style={{ color: "var(--muted)" }}>{f.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───── РЕЗУЛЬТАТЫ ───── */}
      <section style={{ background: "var(--bg)", borderBottom: "1px solid var(--divider)" }}>
        <div className="max-w-4xl mx-auto px-6 py-20">
          <Reveal>
            <div className="flex items-center gap-3 mb-10">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "rgba(255,180,60,0.12)", color: "#ffb43c" }}>04</span>
              <h2 className="font-cormorant text-3xl font-semibold" style={{ color: "var(--text)" }}>Результаты</h2>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="rounded-2xl overflow-hidden mb-10" style={{ border: "1.5px solid rgba(74,168,255,0.2)" }}>
              <div className="grid grid-cols-2">
                <div className="p-6" style={{ background: "rgba(255,100,80,0.06)", borderRight: "1px solid rgba(255,100,80,0.15)" }}>
                  <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#ff6450" }}>До</div>
                  <div className="space-y-3 text-sm" style={{ color: "var(--muted)" }}>
                    <div className="flex items-start gap-2">
                      <Icon name="Clock" size={14} style={{ color: "#ff6450", marginTop: 2, flexShrink: 0 }} />
                      <span>Конверсия 40/60% достигалась за <strong style={{ color: "var(--text)" }}>12 месяцев</strong></span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="TrendingDown" size={14} style={{ color: "#ff6450", marginTop: 2, flexShrink: 0 }} />
                      <span>Медленное принятие решений</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="MessageSquare" size={14} style={{ color: "#ff6450", marginTop: 2, flexShrink: 0 }} />
                      <span>Пассивная коммуникация</span>
                    </div>
                  </div>
                </div>
                <div className="p-6" style={{ background: "rgba(45,216,130,0.07)" }}>
                  <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--accent-green)" }}>После</div>
                  <div className="space-y-3 text-sm" style={{ color: "var(--muted)" }}>
                    <div className="flex items-start gap-2">
                      <Icon name="Zap" size={14} style={{ color: "var(--accent-green)", marginTop: 2, flexShrink: 0 }} />
                      <span>Та же конверсия за <strong style={{ color: "var(--text)" }}>6 месяцев</strong></span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="TrendingUp" size={14} style={{ color: "var(--accent-green)", marginTop: 2, flexShrink: 0 }} />
                      <span>Вовлечённость выросла в <strong style={{ color: "var(--text)" }}>2 раза</strong></span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="MousePointerClick" size={14} style={{ color: "var(--accent-green)", marginTop: 2, flexShrink: 0 }} />
                      <span>Пациент сам инициирует диалог</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-5" style={{ borderTop: "1px solid rgba(74,168,255,0.12)", background: "rgba(74,168,255,0.05)" }}>
                <div className="text-xs mb-3" style={{ color: "var(--muted)" }}>Скорость достижения конверсии 40% / 60%</div>
                <div className="flex items-center gap-3">
                  <span className="text-xs w-20 text-right" style={{ color: "var(--muted)" }}>Раньше</span>
                  <div className="flex-1 h-2 rounded-full" style={{ background: "var(--bar-bg)" }}>
                    <div className="h-2 rounded-full" style={{ width: "100%", background: "linear-gradient(90deg, #ff6450, #ff8070)" }} />
                  </div>
                  <span className="text-xs w-12" style={{ color: "#ff6450" }}>12 мес</span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs w-20 text-right" style={{ color: "var(--muted)" }}>Сейчас</span>
                  <div className="flex-1 h-2 rounded-full" style={{ background: "var(--bar-bg)" }}>
                    <div className="h-2 rounded-full" style={{ width: "50%", background: "linear-gradient(90deg, var(--accent-green), var(--accent-blue))" }} />
                  </div>
                  <span className="text-xs w-12" style={{ color: "var(--accent-green)" }}>6 мес</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="rounded-2xl p-6 flex items-start gap-5" style={{ background: "linear-gradient(135deg, rgba(107,140,255,0.1) 0%, rgba(74,168,255,0.08) 100%)", border: "1.5px solid rgba(107,140,255,0.25)" }}>
              <Icon name="TrendingUp" size={32} style={{ color: "var(--accent-navy)", flexShrink: 0, marginTop: 2 }} />
              <div>
                <div className="font-semibold text-base mb-1" style={{ color: "var(--text)" }}>Прогноз на годовом горизонте</div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  Наблюдение продолжается. По текущей динамике мы ожидаем рост конверсии ещё на <strong style={{ color: "var(--accent-navy)" }}>30–40%</strong> по сравнению с классическими триггерами.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───── ВЫВОД ───── */}
      <section style={{ background: "var(--section-alt)" }}>
        <div className="max-w-4xl mx-auto px-6 py-20">
          <Reveal>
            <div className="flex items-center gap-3 mb-10">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "rgba(120,220,140,0.12)", color: "var(--accent-green)" }}>05</span>
              <h2 className="font-cormorant text-3xl font-semibold" style={{ color: "var(--text)" }}>Вывод</h2>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className="font-cormorant text-2xl leading-relaxed mb-8" style={{ color: "var(--text)", fontStyle: "italic" }}>
              «Вторичные и лояльные пациенты — это не просто база, а аудитория, с которой важно{" "}
              <em style={{ color: "var(--accent-green)" }}>разговаривать</em>, а не рассылать напоминания»
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="grid sm:grid-cols-3 gap-4 mb-12">
              {[
                { icon: "Zap", text: "Ускорить принятие решения", color: "var(--accent-green)", glow: "rgba(45,216,130,0.1)" },
                { icon: "Users", text: "Повысить вовлечённость", color: "var(--accent-blue)", glow: "rgba(74,168,255,0.1)" },
                { icon: "TrendingUp", text: "Увеличить конверсию без скидочных войн", color: "var(--accent-navy)", glow: "rgba(107,140,255,0.1)" },
              ].map((item, i) => (
                <div key={i} className="rounded-xl p-5 flex flex-col items-start gap-3" style={{ background: item.glow, border: `1.5px solid ${item.color}35` }}>
                  <Icon name={item.icon} size={20} style={{ color: item.color }} />
                  <span className="text-sm leading-snug" style={{ color: "var(--text)" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-14 pt-8 flex items-center justify-between" style={{ borderTop: "1px solid var(--divider)" }}>
              <div className="font-cormorant text-lg font-semibold" style={{ color: "var(--text)" }}>Future Care 360</div>
              <div className="text-xs" style={{ color: "var(--muted)" }}>futuresmile-clinic.ru</div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}