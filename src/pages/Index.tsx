import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";


const steps = [
  {
    num: "01",
    color: "#00B8D9",
    title: "Подтверждение записи",
    desc: "Заранее подтверждаем запись — родители уверены в дате, времени и специалисте. Снижает процент неявок и позволяет планировать расписание без потерь времени врача.",
    icon: "CalendarCheck",
    tag: "Меньше неявок",
  },
  {
    num: "02",
    color: "#FF6B2B",
    title: "Презентация врача",
    desc: "Родителям важно знать, кто будет работать с их ребёнком. Снижает страх, усиливает доверие и повышает вероятность явки и продолжения лечения.",
    icon: "UserCheck",
    tag: "Доверие к врачу",
  },
  {
    num: "03",
    color: "#00C27C",
    title: "Информационный триггер",
    desc: "Заранее информируем родителей о необходимости наблюдения у смежного специалиста (ортодонта). Создаём потребность и загружаем смежные направления.",
    icon: "Bell",
    tag: "+30% ортодонтия",
  },
  {
    num: "04",
    color: "#00B8D9",
    title: "Подготовительный триггер",
    desc: "Отправляем брендированные мультфильмы с героями клиники. Снижает страх, сокращает время адаптации в кресле и повышает конверсию в успешный первый приём.",
    icon: "Play",
    tag: "Меньше страха",
  },
  {
    num: "05",
    color: "#FF6B2B",
    title: "Приём и вовлечение",
    desc: "Игровая механика во время приёма: ребёнок рисует рисунок и получает подарок. Возможность приносить рисунки формирует долгосрочную вовлечённость.",
    icon: "Palette",
    tag: "Повторные визиты",
  },
  {
    num: "06",
    color: "#00C27C",
    title: "Грамота за смелость",
    desc: "После лечения ребёнок получает грамоту и похвалу от врача. Закрепляет положительный опыт — ребёнок уходит с гордостью, а не со страхом.",
    icon: "Award",
    tag: "Позитивный опыт",
  },
  {
    num: "07",
    color: "#00B8D9",
    title: "Фотозона",
    desc: "После приёма — шуточная фотозона. Родители делятся снимками в соцсетях и становятся амбассадорами клиники. Усиливает доверие и формирует естественный поток.",
    icon: "Camera",
    tag: "Соцсети бесплатно",
  },
  {
    num: "08",
    color: "#FF6B2B",
    title: "Опрос после приёма",
    desc: "Через 2 часа — автоматический опрос качества. Негатив перехватывается сразу. Позитив — направляется на агрегаторы для роста рейтинга.",
    icon: "MessageSquare",
    tag: "Контроль качества",
  },
  {
    num: "09",
    color: "#00C27C",
    title: "Опрос самочувствия",
    desc: "На следующий день в 12:00 — вопрос о самочувствии ребёнка. Жалобы → мгновенное уведомление администрации. Контролируем восстановление и повышаем доверие.",
    icon: "HeartPulse",
    tag: "Забота после",
  },
  {
    num: "10",
    color: "#00B8D9",
    title: "День рождения",
    desc: "В день рождения — интерактивный триггер с выбором подарка. Усиливает вовлечённость семьи, создаёт эмоциональную связь и формирует повод для повторного визита.",
    icon: "Gift",
    tag: "Эмоциональная связь",
  },
];

const results = [
  { num: "+2", label: "детских стоматолога\nв штате", color: "#FF6B2B", icon: "UserPlus" },
  { num: "+30%", label: "загрузка\nортодонта", color: "#00C27C", icon: "TrendingUp" },
  { num: "+1", label: "ортодонт\nв клинике", color: "#00B8D9", icon: "Star" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [formData, setFormData] = useState({ name: "", phone: "", clinic: "" });
  const [sent, setSent] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = 30;
    let start = 0;
    const step = () => {
      start += 1;
      setCount(start);
      if (start < target) setTimeout(step, 40);
    };
    setTimeout(step, 800);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="font-golos bg-[#0A1628] min-h-screen overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 py-20">
        {/* bg blobs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#00B8D9] opacity-10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#FF6B2B] opacity-10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-[#00C27C] opacity-5 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        {/* grid lines */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#00B8D9 1px, transparent 1px), linear-gradient(90deg, #00B8D9 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-8 animate-[fadeSlide_0.6s_ease_forwards]">
            <div className="h-px w-12 bg-[#FF6B2B]" />
            <span className="font-oswald text-[#FF6B2B] tracking-[0.3em] text-sm uppercase">Future IT Dent</span>
          </div>

          <h1 className="font-oswald text-white leading-none mb-6 animate-[fadeSlide_0.8s_ease_forwards]">
            <span className="block text-5xl md:text-7xl lg:text-8xl font-bold">Как мы увеличили</span>
            <span className="block text-5xl md:text-7xl lg:text-8xl font-bold text-[#00B8D9]">поток пациентов</span>
            <span className="block text-5xl md:text-7xl lg:text-8xl font-bold">в детскую</span>
            <span className="block text-5xl md:text-7xl lg:text-8xl font-bold text-[#FF6B2B]">стоматологию</span>
          </h1>

          <p className="text-[#8EA5C0] text-xl md:text-2xl max-w-2xl mb-12 leading-relaxed animate-[fadeSlide_1s_ease_forwards]">
            Без увеличения рекламного бюджета — только за счёт правильно выстроенной системы коммуникаций с семьёй пациента
          </p>

          <div className="flex flex-wrap gap-6 animate-[fadeSlide_1.2s_ease_forwards]">
            {results.map((r, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-sm hover:border-white/20 transition-all">
                <span className="font-oswald text-4xl font-bold" style={{ color: r.color }}>{r.num}</span>
                <span className="text-white/70 text-sm whitespace-pre-line leading-tight">{r.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-16 flex items-center gap-4 animate-[fadeSlide_1.4s_ease_forwards]">
            <a href="#stages"
              className="group flex items-center gap-3 bg-[#FF6B2B] text-white font-oswald font-semibold px-8 py-4 rounded-full tracking-wide uppercase hover:bg-[#FF8A4F] transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,107,43,0.4)]">
              Смотреть кейс
              <Icon name="ArrowDown" size={18} className="group-hover:translate-y-1 transition-transform" />
            </a>
            <a href="#form"
              className="flex items-center gap-3 border border-white/20 text-white font-oswald font-semibold px-8 py-4 rounded-full tracking-wide uppercase hover:border-[#00B8D9] hover:text-[#00B8D9] transition-all">
              Обсудить проект
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-white text-xs tracking-widest uppercase font-golos">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent animate-pulse" />
        </div>
      </section>

      {/* ПРОБЛЕМА */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-8 bg-[#00C27C]" />
                  <span className="font-oswald text-[#00C27C] tracking-[0.2em] text-sm uppercase">Проблема</span>
                </div>
                <h2 className="font-oswald text-white text-4xl md:text-5xl font-bold leading-tight mb-6">
                  В детской стоматологии<br />
                  <span className="text-[#00B8D9]">рост зависит не</span><br />
                  от рекламы
                </h2>
                <p className="text-[#8EA5C0] text-lg leading-relaxed">
                  Рост зависит от правильно выстроенного пути пациента. Мы выстроили систему коммуникаций, которая изменила экономику направления — без увеличения рекламного бюджета.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Heart", text: "Доверие родителей", color: "#FF6B2B" },
                  { icon: "Smile", text: "Эмоции ребёнка", color: "#00B8D9" },
                  { icon: "Star", text: "Первый опыт", color: "#00C27C" },
                  { icon: "RefreshCw", text: "Повторные визиты", color: "#FF6B2B" },
                ].map((item, i) => (
                  <div key={i}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3 hover:bg-white/8 transition-all hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: item.color + "20" }}>
                      <Icon name={item.icon} size={22} style={{ color: item.color }} />
                    </div>
                    <span className="text-white font-golos font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ФОТО / ПРИМЕРЫ */}
      <section className="py-24 px-6 bg-white/[0.02]" id="photos">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#FF6B2B]" />
                <span className="font-oswald text-[#FF6B2B] tracking-[0.2em] text-sm uppercase">Атмосфера клиники</span>
                <div className="h-px w-8 bg-[#FF6B2B]" />
              </div>
              <h2 className="font-oswald text-white text-4xl md:text-5xl font-bold">
                Среда, которая<br /><span className="text-[#00B8D9]">создаёт доверие</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "Приём с рисунком", color: "#00B8D9", icon: "Palette", aspect: "row-span-2" },
              { label: "Грамота за смелость", color: "#FF6B2B", icon: "Award", aspect: "" },
              { label: "Подарок от клиники", color: "#00C27C", icon: "Gift", aspect: "" },
              { label: "Фотозона", color: "#FF6B2B", icon: "Camera", aspect: "" },
              { label: "Игровая зона", color: "#00B8D9", icon: "Gamepad2", aspect: "" },
            ].map((item, i) => (
              <AnimatedSection key={i}>
                <div className={`relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 transition-all hover:-translate-y-1 cursor-pointer group ${item.aspect}`}
                  style={{ background: `linear-gradient(135deg, ${item.color}15, ${item.color}05)`, minHeight: i === 0 ? "320px" : "150px" }}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: item.color + "25" }}>
                      <Icon name={item.icon} size={32} style={{ color: item.color }} />
                    </div>
                    <span className="text-white/60 text-sm font-golos text-center px-4">{item.label}</span>
                    <span className="text-white/30 text-xs">Фото появится здесь</span>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ЭТАПЫ */}
      <section className="py-24 px-6" id="stages">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-20">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#00C27C]" />
                <span className="font-oswald text-[#00C27C] tracking-[0.2em] text-sm uppercase">Система</span>
                <div className="h-px w-8 bg-[#00C27C]" />
              </div>
              <h2 className="font-oswald text-white text-4xl md:text-5xl font-bold mb-4">
                10 этапов<br /><span className="text-[#FF6B2B]">сопровождения пациента</span>
              </h2>
              <p className="text-[#8EA5C0] text-lg max-w-xl mx-auto">
                Управляем не визитом — а всем сценарием взаимодействия с семьёй пациента
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <AnimatedSection key={i}>
                <div
                  className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                  style={{ transitionDelay: `${(i % 2) * 80}ms` }}
                >
                  <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl" style={{ backgroundColor: step.color }} />
                  <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10 blur-xl pointer-events-none"
                    style={{ backgroundColor: step.color }} />

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <span className="font-oswald text-5xl font-bold opacity-15 leading-none" style={{ color: step.color }}>
                        {step.num}
                      </span>
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: step.color + "20" }}>
                          <Icon name={step.icon} size={16} style={{ color: step.color }} />
                        </div>
                        <span className="text-xs font-golos font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: step.color + "20", color: step.color }}>
                          {step.tag}
                        </span>
                      </div>
                      <h3 className="font-oswald text-white text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-[#8EA5C0] text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ИТОГ */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#00B8D9] opacity-8 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#FF6B2B] opacity-8 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#FF6B2B]" />
                <span className="font-oswald text-[#FF6B2B] tracking-[0.2em] text-sm uppercase">Итог Future IT Dent</span>
                <div className="h-px w-8 bg-[#FF6B2B]" />
              </div>
              <h2 className="font-oswald text-white text-4xl md:text-5xl font-bold mb-6">
                Правильная коммуникация —<br /><span className="text-[#00C27C]">это рост клиники</span>
              </h2>
              <p className="text-[#8EA5C0] text-lg max-w-2xl mx-auto">
                Комплексная система триггеров и вовлечения позволила значительно увеличить поток на детский приём без увеличения рекламного бюджета
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {results.map((r, i) => (
              <AnimatedSection key={i}>
                <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 text-center hover:border-white/20 transition-all hover:-translate-y-2 group overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"
                    style={{ background: `radial-gradient(circle at center, ${r.color}10, transparent 70%)` }} />
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: r.color + "20" }}>
                      <Icon name={r.icon} size={28} style={{ color: r.color }} />
                    </div>
                    <div className="font-oswald text-6xl font-bold mb-3" style={{ color: r.color }}>{r.num}</div>
                    <div className="text-white/70 font-golos whitespace-pre-line leading-snug">{r.label}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="bg-gradient-to-r from-[#00B8D9]/10 via-white/5 to-[#FF6B2B]/10 border border-white/10 rounded-3xl p-8 md:p-12 text-center">
              <p className="font-oswald text-white text-2xl md:text-3xl font-semibold leading-relaxed">
                Таким образом, правильно выстроенная коммуникация и сценарий сопровождения пациента{" "}
                <span className="text-[#00C27C]">напрямую повлияли на рост клиники</span> и расширение команды
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ФОРМА */}
      <section className="py-24 px-6 bg-white/[0.02]" id="form">
        <div className="max-w-xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#00B8D9]" />
                <span className="font-oswald text-[#00B8D9] tracking-[0.2em] text-sm uppercase">Начать</span>
                <div className="h-px w-8 bg-[#00B8D9]" />
              </div>
              <h2 className="font-oswald text-white text-4xl md:text-5xl font-bold mb-4">
                Хотите такой же<br /><span className="text-[#FF6B2B]">результат?</span>
              </h2>
              <p className="text-[#8EA5C0] text-lg">
                Оставьте заявку — разберём вашу клинику и предложим систему коммуникаций
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            {!sent ? (
              <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-white/60 text-sm font-golos">Ваше имя</label>
                  <input
                    type="text"
                    required
                    placeholder="Иван Иванов"
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    className="bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 font-golos focus:outline-none focus:border-[#00B8D9] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/60 text-sm font-golos">Телефон</label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (999) 000-00-00"
                    value={formData.phone}
                    onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                    className="bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 font-golos focus:outline-none focus:border-[#00B8D9] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/60 text-sm font-golos">Название клиники</label>
                  <input
                    type="text"
                    required
                    placeholder="Клиника Улыбка"
                    value={formData.clinic}
                    onChange={e => setFormData(p => ({ ...p, clinic: e.target.value }))}
                    className="bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 font-golos focus:outline-none focus:border-[#00B8D9] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#FF6B2B] text-white font-oswald font-semibold py-4 rounded-xl tracking-wide uppercase hover:bg-[#FF8A4F] transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(255,107,43,0.35)] mt-2"
                >
                  Получить консультацию
                </button>
                <p className="text-white/30 text-xs text-center font-golos">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </form>
            ) : (
              <div className="bg-white/5 border border-[#00C27C]/30 rounded-3xl p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-[#00C27C]/20 flex items-center justify-center mx-auto mb-6">
                  <Icon name="CheckCircle" size={40} style={{ color: "#00C27C" }} />
                </div>
                <h3 className="font-oswald text-white text-3xl font-bold mb-3">Заявка принята!</h3>
                <p className="text-[#8EA5C0] font-golos">Мы свяжемся с вами в течение рабочего дня</p>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-oswald text-white/40 text-sm tracking-widest uppercase">Future IT Dent</span>
          <span className="text-white/20 text-sm font-golos">© 2026 Все права защищены</span>
        </div>
      </footer>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .font-oswald { font-family: 'Oswald', sans-serif; }
        .font-golos { font-family: 'Golos Text', sans-serif; }
      `}</style>
    </div>
  );
}