import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";
import img4 from "./assets/img4.jpg";
import img5 from "./assets/img5.png";
import img6 from "./assets/img6.jpg";
import hero1 from "./assets/hero1.jpg";
import hero2 from "./assets/hero2.jpg";
import hero3 from "./assets/hero3.jpg";
window.__resources = { img1, img2, img3, img4, img5, img6, hero1, hero2, hero3 };

// Mock data for GroWork
window.GW_DATA = {
  categories: [
    { id: "all",      pt: "Todos",        en: "All",         emoji: "✨", color: "var(--accent)" },
    { id: "hair",     pt: "Beleza",       en: "Beauty",      emoji: "💇‍♀️", color: "var(--c-pink)" },
    { id: "wellness", pt: "Bem-estar",    en: "Wellness",    emoji: "🌿", color: "var(--c-mint)" },
    { id: "fitness",  pt: "Fitness",      en: "Fitness",     emoji: "🏋️", color: "var(--c-coral)" },
    { id: "home",     pt: "Casa",         en: "Home",        emoji: "🔧", color: "var(--c-sky)" },
    { id: "lessons",  pt: "Aulas",        en: "Lessons",     emoji: "🎨", color: "var(--c-amber)" },
    { id: "petcare",  pt: "Pet care",     en: "Pet care",    emoji: "🐾", color: "var(--accent)" }
  ],
  pros: [
    { id: "p1", name: "Marina Costa",   role_pt: "Cabeleireira & Colorista", role_en: "Hair & Color Stylist", cat: "hair",     rating: 4.9, reviews: 218, distance: "1,2 km", priceFrom: 60, color: "linear-gradient(135deg, #FF6FB5, #7C3AED)", emoji: "💇‍♀️", image: window.__resources.img1,
      contact: { phone: "+351 912 345 678", email: "marina@growork.app", instagram: "@marina.studio", whatsapp: "+351912345678" },
      location: { name: "Studio Marina Costa", address_pt: "R. das Flores 24, Lisboa", address_en: "24 Flores St., Lisbon", city: "Lisboa", region: "Lisboa" },
      schedule: { mon: null, tue: "10:00 — 19:00", wed: "10:00 — 19:00", thu: "10:00 — 21:00", fri: "10:00 — 21:00", sat: "09:00 — 17:00", sun: null } },
    { id: "p2", name: "Rafael Oliveira", role_pt: "Personal Trainer",         role_en: "Personal Trainer",      cat: "fitness",  rating: 5.0, reviews: 142, distance: "Online",  priceFrom: 90, color: "linear-gradient(135deg, #FF7A66, #FFB547)", emoji: "🏋️", image: window.__resources.img2,
      contact: { phone: "+351 913 222 110", email: "rafa@growork.app", instagram: "@rafa.coach", whatsapp: "+351913222110" },
      location: { name: "Forma Studio · Online", address_pt: "Av. da Liberdade 102, Lisboa", address_en: "102 Liberdade Ave., Lisbon", city: "Lisboa", region: "Lisboa" },
      schedule: { mon: "06:00 — 21:00", tue: "06:00 — 21:00", wed: "06:00 — 21:00", thu: "06:00 — 21:00", fri: "06:00 — 21:00", sat: null, sun: null } },
    { id: "p3", name: "Beatriz Lima",    role_pt: "Massoterapeuta",           role_en: "Massage Therapist",     cat: "wellness", rating: 4.8, reviews: 96,  distance: "0,8 km", priceFrom: 120, color: "linear-gradient(135deg, #38D6A0, #5BB8FF)", emoji: "🌿", image: window.__resources.img3,
      contact: { phone: "+351 914 887 552", email: "beatriz@growork.app", instagram: "@beatriz.zen", whatsapp: "+351914887552" },
      location: { name: "Casa Zen", address_pt: "Tv. do Cabral 12, Porto", address_en: "12 Cabral Lane, Porto", city: "Porto", region: "Porto" },
      schedule: { mon: "09:00 — 20:00", tue: "09:00 — 20:00", wed: "09:00 — 20:00", thu: "09:00 — 20:00", fri: "09:00 — 20:00", sat: "10:00 — 16:00", sun: null } },
    { id: "p4", name: "Diego Almeida",   role_pt: "Eletricista Residencial",  role_en: "Residential Electrician", cat: "home",   rating: 4.9, reviews: 184, distance: "3,4 km", priceFrom: 80, color: "linear-gradient(135deg, #5BB8FF, #7C3AED)", emoji: "🔧", image: window.__resources.img4,
      contact: { phone: "+351 915 778 100", email: "diego@growork.app", instagram: "@diego.eletric", whatsapp: "+351915778100" },
      location: { name: "Atende a domicílio", address_pt: "Grande Lisboa", address_en: "Greater Lisbon", mobile: true, city: "Lisboa", region: "Lisboa" },
      schedule: { mon: "08:00 — 18:00", tue: "08:00 — 18:00", wed: "08:00 — 18:00", thu: "08:00 — 18:00", fri: "08:00 — 18:00", sat: null, sun: null } },
    { id: "p5", name: "Camila Souza",    role_pt: "Professora de Aquarela",   role_en: "Watercolor Instructor",   cat: "lessons", rating: 5.0, reviews: 64,  distance: "Online",  priceFrom: 75, color: "linear-gradient(135deg, #FFB547, #FF6FB5)", emoji: "🎨", image: window.__resources.img5,
      contact: { phone: "+351 916 442 901", email: "camila@growork.app", instagram: "@camila.aquarela", whatsapp: "+351916442901" },
      location: { name: "Atelier Aquarela · Online", address_pt: "R. Garrett 60, Lisboa", address_en: "60 Garrett St., Lisbon", city: "Lisboa", region: "Lisboa" },
      schedule: { mon: null, tue: null, wed: "10:00 — 18:00", thu: "10:00 — 18:00", fri: "14:00 — 20:00", sat: "10:00 — 18:00", sun: "10:00 — 16:00" } },
    { id: "p6", name: "Lucas Pereira",   role_pt: "Banhista para Pets",       role_en: "Pet Grooming",            cat: "petcare", rating: 4.7, reviews: 88,  distance: "2,1 km", priceFrom: 55, color: "linear-gradient(135deg, #FFB547, #38D6A0)", emoji: "🐾", image: window.__resources.img6,
      contact: { phone: "+351 917 330 244", email: "lucas@growork.app", instagram: "@lucas.petbath", whatsapp: "+351917330244" },
      location: { name: "Lucas Pet Studio", address_pt: "R. da Boavista 88, Lisboa", address_en: "88 Boavista St., Lisbon", city: "Lisboa", region: "Lisboa" },
      schedule: { mon: null, tue: "09:00 — 18:00", wed: "09:00 — 18:00", thu: "09:00 — 18:00", fri: "09:00 — 18:00", sat: "09:00 — 14:00", sun: null } }
  ],
  holidays: [
    { date: "2026-06-10", name_pt: "Dia de Portugal", name_en: "Portugal Day" },
    { date: "2026-08-15", name_pt: "Assunção de Nossa Senhora", name_en: "Assumption Day" },
    { date: "2026-12-25", name_pt: "Natal", name_en: "Christmas Day" }
  ],
  servicesByPro: {
    p1: [
      { id: "s1", name_pt: "Corte feminino",    name_en: "Women's haircut",  duration: 60, price: 90,  emoji: "✂️", bg: "var(--c-pink)" },
      { id: "s2", name_pt: "Coloração completa", name_en: "Full color",       duration: 120, price: 220, emoji: "🎨", bg: "var(--c-amber)" },
      { id: "s3", name_pt: "Hidratação profunda",name_en: "Deep conditioning", duration: 45, price: 80,  emoji: "💧", bg: "var(--c-sky)" },
      { id: "s4", name_pt: "Mechas / Luzes",     name_en: "Highlights",       duration: 180, price: 320, emoji: "✨", bg: "var(--accent)" }
    ],
    p2: [
      { id: "s5", name_pt: "Avaliação física",   name_en: "Fitness assessment", duration: 60, price: 90, emoji: "📋", bg: "var(--c-coral)" },
      { id: "s6", name_pt: "Treino personalizado", name_en: "Personal training", duration: 60, price: 120, emoji: "🏋️", bg: "var(--accent)" },
      { id: "s7", name_pt: "Sessão online",      name_en: "Online session",     duration: 45, price: 75, emoji: "💻", bg: "var(--c-sky)" }
    ],
    p3: [
      { id: "s8", name_pt: "Massagem relaxante", name_en: "Relaxing massage",   duration: 60, price: 140, emoji: "🌿", bg: "var(--c-mint)" },
      { id: "s9", name_pt: "Drenagem linfática", name_en: "Lymphatic drainage", duration: 90, price: 180, emoji: "💆", bg: "var(--c-sky)" },
      { id: "s10", name_pt: "Massagem desportiva", name_en: "Sports massage",   duration: 60, price: 160, emoji: "💪", bg: "var(--c-coral)" }
    ],
    p4: [
      { id: "s11", name_pt: "Diagnóstico elétrico", name_en: "Electrical diagnosis", duration: 60, price: 80, emoji: "🔍", bg: "var(--c-sky)" },
      { id: "s12", name_pt: "Instalação de tomadas",  name_en: "Outlet installation", duration: 45, price: 95, emoji: "🔌", bg: "var(--c-amber)" }
    ],
    p5: [
      { id: "s13", name_pt: "Aula introdutória", name_en: "Intro lesson",       duration: 60, price: 75, emoji: "🎨", bg: "var(--c-amber)" },
      { id: "s14", name_pt: "Aula avançada",     name_en: "Advanced lesson",    duration: 90, price: 120, emoji: "🖼️", bg: "var(--c-pink)" }
    ],
    p6: [
      { id: "s15", name_pt: "Banho completo",    name_en: "Full bath",          duration: 60, price: 55, emoji: "🐾", bg: "var(--c-mint)" },
      { id: "s16", name_pt: "Tosa higiênica",    name_en: "Hygiene grooming",   duration: 45, price: 70, emoji: "✂️", bg: "var(--c-amber)" }
    ]
  },
  appointments: [
    { id: "a1", proId: "p1", serviceId: "s1",  date: "2026-05-22", time: "14:00", status: "upcoming",  paid: false, location_pt: "Salão (Vila Madalena)", location_en: "Salon (Vila Madalena)", note_pt: "Levarei referências no celular." , note_en: "I'll bring references on my phone." },
    { id: "a5", proId: "p5", serviceId: "s13", date: "2026-05-26", time: "10:00", status: "upcoming",  paid: false, location_pt: "Aula online · Zoom", location_en: "Online · Zoom" },
    { id: "a6", proId: "p6", serviceId: "s15", date: "2026-06-02", time: "15:30", status: "upcoming",  paid: false, location_pt: "Em casa · Rua das Palmeiras, 84", location_en: "At home · 84 Palm St." },
    { id: "a2", proId: "p3", serviceId: "s8",  date: "2026-05-11", time: "10:30", status: "done",      paid: true,  rating: 5 },
    { id: "a3", proId: "p4", serviceId: "s11", date: "2026-04-29", time: "16:00", status: "done",      paid: true,  rating: 4 },
    { id: "a7", proId: "p1", serviceId: "s2",  date: "2026-03-15", time: "11:00", status: "done",      paid: true,  rating: 5 },
    { id: "a4", proId: "p2", serviceId: "s7",  date: "2026-04-15", time: "08:00", status: "cancelled", paid: false }
  ],
  proAgenda: [
    { time: "09:00", client: "Sofia Andrade", service_pt: "Corte feminino", service_en: "Women's haircut", status: "confirmed" },
    { time: "10:30", client: "Helena Rocha",  service_pt: "Hidratação profunda", service_en: "Deep conditioning", status: "confirmed" },
    { time: "12:00", client: "Almoço",        service_pt: "Pausa",  service_en: "Break", status: "break" },
    { time: "14:00", client: "Você (cliente)", service_pt: "Corte feminino", service_en: "Women's haircut", status: "confirmed" },
    { time: "15:30", client: "Júlia Mendes",  service_pt: "Mechas",  service_en: "Highlights", status: "pending" },
    { time: "18:00", client: "Bruna Cardoso", service_pt: "Coloração completa", service_en: "Full color", status: "confirmed" }
  ],
  proBookings: {
    upcoming: [
      { id: "pb1", client: "Sofia Andrade",  service_pt: "Corte feminino",       service_en: "Women's haircut",     date: "2026-05-19", time: "09:00", price: 60,  status: "confirmed", assignedTo: "tm1" },
      { id: "pb2", client: "Helena Rocha",   service_pt: "Hidratação profunda",  service_en: "Deep conditioning",   date: "2026-05-19", time: "10:30", price: 80,  status: "confirmed", assignedTo: "tm2" },
      { id: "pb3", client: "Júlia Mendes",   service_pt: "Mechas",               service_en: "Highlights",          date: "2026-05-19", time: "15:30", price: 150, status: "pending",   assignedTo: "tm1" },
      { id: "pb4", client: "Bruna Cardoso",  service_pt: "Coloração completa",   service_en: "Full color",          date: "2026-05-19", time: "18:00", price: 180, status: "confirmed", assignedTo: "tm1" },
      { id: "pb5", client: "Patrícia Antunes", service_pt: "Corte feminino",     service_en: "Women's haircut",     date: "2026-05-20", time: "09:30", price: 60,  status: "confirmed", assignedTo: "tm2" },
      { id: "pb6", client: "Camila Borges",  service_pt: "Hidratação profunda",  service_en: "Deep conditioning",   date: "2026-05-20", time: "11:00", price: 80,  status: "pending",   assignedTo: "tm2" },
      { id: "pb7", client: "Inês Cardoso",   service_pt: "Mechas",               service_en: "Highlights",          date: "2026-05-20", time: "14:30", price: 150, status: "confirmed", assignedTo: "tm1" },
      { id: "pb8", client: "Joana Pinto",    service_pt: "Coloração completa",   service_en: "Full color",          date: "2026-05-20", time: "17:00", price: 180, status: "confirmed", assignedTo: "tm1" },
      { id: "pb9", client: "Beatriz Faria",  service_pt: "Corte feminino",       service_en: "Women's haircut",     date: "2026-05-22", time: "14:00", price: 60,  status: "confirmed", assignedTo: "tm2" },
      { id: "pb14", client: "André Sousa",   service_pt: "Corte masculino",      service_en: "Men's haircut",       date: "2026-05-19", time: "11:30", price: 45,  status: "confirmed", assignedTo: "tm3" },
      { id: "pb15", client: "Tiago Reis",    service_pt: "Barba",                service_en: "Beard trim",          date: "2026-05-19", time: "14:00", price: 25,  status: "confirmed", assignedTo: "tm3" },
      { id: "pb16", client: "Rui Tavares",   service_pt: "Corte + Barba",        service_en: "Cut + Beard",         date: "2026-05-20", time: "10:00", price: 60,  status: "pending",   assignedTo: "tm3" }
    ],
    past: [
      { id: "pb10", client: "Mariana Costa", service_pt: "Mechas",               service_en: "Highlights",          date: "2026-05-15", time: "10:00", price: 150, status: "done", rating: 5, assignedTo: "tm1" },
      { id: "pb11", client: "Rita Pereira",  service_pt: "Corte feminino",       service_en: "Women's haircut",     date: "2026-05-12", time: "16:00", price: 60,  status: "done", rating: 5, assignedTo: "tm2" },
      { id: "pb12", client: "Lara Silva",    service_pt: "Hidratação profunda",  service_en: "Deep conditioning",   date: "2026-05-11", time: "11:30", price: 80,  status: "done", rating: 4, assignedTo: "tm2" },
      { id: "pb17", client: "Hugo Martins",  service_pt: "Corte masculino",      service_en: "Men's haircut",       date: "2026-05-14", time: "17:00", price: 45,  status: "done", rating: 5, assignedTo: "tm3" }
    ],
    cancelled: [
      { id: "pb13", client: "Diana Ramalho", service_pt: "Coloração completa",   service_en: "Full color",          date: "2026-05-08", time: "15:00", price: 180, status: "cancelled", assignedTo: "tm1" }
    ]
  },
  proTeam: [
    { id: "tm1", name: "Marina Costa",   role_pt: "Cabeleireira & Colorista", role_en: "Hair & Color Stylist", emoji: "💇‍♀️", color: "linear-gradient(135deg, #FF6FB5, #7C3AED)", isOwner: true, status: "available", bookingsWeek: 30, rating: 4.9, schedule_pt: "Ter — Sáb", schedule_en: "Tue — Sat", services: ["Corte feminino", "Coloração", "Mechas"], phone: "+351 912 345 678", email: "marina@growork.app" },
    { id: "tm2", name: "Sofia Andrade",  role_pt: "Cabeleireira",            role_en: "Hair Stylist",         emoji: "✂️",   color: "linear-gradient(135deg, #FFB547, #FF6FB5)", isOwner: false, status: "available", bookingsWeek: 18, rating: 4.8, schedule_pt: "Seg — Sex", schedule_en: "Mon — Fri", services: ["Corte feminino", "Penteados", "Escova"], phone: "+351 913 110 200", email: "sofia@growork.app" },
    { id: "tm3", name: "Bruno Lima",     role_pt: "Barbeiro",                role_en: "Barber",              emoji: "💈",   color: "linear-gradient(135deg, #5BB8FF, #7C3AED)", isOwner: false, status: "busy",      bookingsWeek: 22, rating: 4.7, schedule_pt: "Ter — Sáb", schedule_en: "Tue — Sat", services: ["Corte masculino", "Barba", "Tratamento capilar"], phone: "+351 914 221 778", email: "bruno@growork.app" },
    { id: "tm4", name: "Mariana Faria",  role_pt: "Manicure & Nail Art",     role_en: "Manicure & Nail Art",  emoji: "💅",   color: "linear-gradient(135deg, #38D6A0, #5BB8FF)", isOwner: false, status: "off",       bookingsWeek: 0,  rating: 5.0, schedule_pt: "Folga",     schedule_en: "Day off",   services: ["Manicure", "Pedicure", "Nail art"], phone: "+351 915 442 010", email: "mariana@growork.app" }
  ],
  teamRoles: [
    { id: "owner",   label_pt: "Proprietário", label_en: "Owner" },
    { id: "stylist", label_pt: "Estilista",    label_en: "Stylist" },
    { id: "barber",  label_pt: "Barbeiro",     label_en: "Barber" },
    { id: "manicure", label_pt: "Manicure",   label_en: "Manicure" }
  ],
  notifications: [
    { id: "n1", icon: "📅", type: "booking",  unread: true,
      title_pt: "Agendamento confirmado",
      title_en: "Booking confirmed",
      text_pt: "Marina Costa confirmou seu corte para sexta-feira às 14:00.",
      text_en: "Marina Costa confirmed your haircut for Friday at 14:00.",
      time_pt: "há 12 min", time_en: "12 min ago" },
    { id: "n2", icon: "💬", type: "message",  unread: true,
      title_pt: "Nova mensagem de Marina",
      title_en: "New message from Marina",
      text_pt: "“Oi! Posso adiantar 15 min se preferir 13:45?”",
      text_en: "“Hi! I can move it 15 min earlier to 13:45 if you prefer.”",
      time_pt: "há 1 h",   time_en: "1 h ago" },
    { id: "n3", icon: "⏰", type: "reminder", unread: false,
      title_pt: "Lembrete: agendamento amanhã",
      title_en: "Reminder: appointment tomorrow",
      text_pt: "Não esqueça — Marina Costa, sexta às 14:00.",
      text_en: "Don't forget — Marina Costa, Friday at 14:00.",
      time_pt: "ontem",    time_en: "yesterday" },
    { id: "n4", icon: "⭐", type: "review",   unread: false,
      title_pt: "Avalie sua última sessão",
      title_en: "Rate your last session",
      text_pt: "Como foi sua massagem com Beatriz Lima?",
      text_en: "How was your massage with Beatriz Lima?",
      time_pt: "há 2 dias", time_en: "2 days ago" }
  ],
  chats: {
    p1: [
      { from: "them", text_pt: "Olá! Vi seu pedido de agendamento ✨", text_en: "Hi! Saw your booking request ✨", time: "13:42" },
      { from: "them", text_pt: "Sexta às 14h tá ótimo aqui — confirmado!", text_en: "Friday 2pm works perfectly — confirmed!", time: "13:42" },
      { from: "me",   text_pt: "Perfeito 💜 quer que eu chegue um pouco antes?", text_en: "Perfect 💜 should I arrive a little earlier?", time: "13:55" },
      { from: "them", text_pt: "Pode chegar 10 min antes pra um cafezinho 😊", text_en: "Come 10 min earlier for a quick coffee 😊", time: "14:01" },
      { from: "me",   text_pt: "Combinado! Até sexta!", text_en: "Done deal! See you Friday!", time: "14:02" }
    ],
    p3: [
      { from: "them", text_pt: "Obrigada pela visita 🌿", text_en: "Thanks for the visit 🌿", time: "Mon" },
      { from: "me",   text_pt: "Foi maravilhoso, obrigada!", text_en: "It was wonderful, thank you!", time: "Mon" }
    ],
    p4: [
      { from: "them", text_pt: "Posso passar amanhã às 10?", text_en: "Can I come by tomorrow at 10?", time: "Sun" }
    ]
  }
};

window.GW_T = {
  pt: {
    // nav
    home: "Início", explore: "Explorar", bookings: "Agendamentos", chat: "Mensagens", notif: "Notificações", history: "Histórico", profile: "Perfil",
    dashboard: "Painel", clients: "Clientes", calendar: "Agenda",
    role_client: "Cliente", role_pro: "Admin", role_member: "Equipa",
    search_placeholder: "Buscar serviços, profissionais...",
    // home
    hello: "Olá, Ana 👋", home_sub: "O que você precisa hoje?",
    featured: "Promoções da semana", featured_hero_tag: "Destaque",
    featured_hero_title: "Sua agenda mais leve, em poucos toques",
    featured_hero_sub: "Encontre profissionais perto de você e reserve em 30s.",
    featured_cta: "Explorar agora",
    featured_2_tag: "Novo", featured_2_title: "Aulas online já disponíveis", featured_2_sub: "Música, pintura, idiomas",
    featured_3_tag: "Indicação", featured_3_title: "Convide um amigo e ganhe 20€", featured_3_sub: "No próximo serviço",
    near_you: "Perto de você", see_all: "Ver tudo",
    explore_title: "Explorar profissionais", explore_sub: "Encontre quem está disponível onde você está e quando você precisa.",
    filter_region: "Região", filter_service: "Serviço", filter_date: "Disponível em", filter_all: "Todas", filter_clear: "Limpar filtros",
    explore_results: "resultados", explore_no_results_title: "Nada por aqui", explore_no_results_sub: "Tente outra data, região ou serviço.",
    closed_on_date: "Fechado neste dia", open_on_date: "Aberto",
    starting_at: "a partir de",
    // categories
    cats_title: "Categorias",
    // profile
    book_now: "Agendar agora",
    message: "Mensagem",
    save: "Salvar",
    next_avail: "Próxima disponibilidade",
    services: "Serviços",
    about: "Sobre",
    about_text: "Especialista em coloração com 8 anos de experiência. Atendo no salão e a domicílio. Adoro entender seu estilo antes de qualquer transformação.",
    reviews: "avaliações",
    completed: "atendimentos",
    response: "resposta",
    response_val: "< 30 min",
    rating_label: "Avaliação média",
    // booking
    book_title: "Agendar serviço",
    step_service: "Serviço", step_date: "Data e hora", step_confirm: "Confirmar",
    choose_service: "Escolha um serviço",
    choose_date: "Escolha a data", choose_time: "Horários disponíveis",
    summary: "Resumo", total: "Total", continue: "Continuar", back: "Voltar",
    pro_label: "Profissional", service_label: "Serviço", date_label: "Data", time_label: "Horário", duration: "Duração",
    confirm_booking: "Confirmar agendamento",
    pay_at_place: "Pagamento no local",
    // confirmation
    confirmed_title: "Tudo certo!",
    confirmed_sub: "Seu agendamento foi enviado para Marina. Você vai receber a confirmação por mensagem em instantes.",
    add_calendar: "Adicionar à agenda", open_chat: "Abrir conversa", back_home: "Voltar ao início",
    // bookings / history
    bookings_title: "Agendamentos", bookings_sub: "Seus próximos compromissos e o histórico — tudo num lugar só.",
    history_title: "Histórico", history_sub: "Suas sessões e agendamentos",
    tab_upcoming: "Próximos", tab_past: "Concluídos", tab_cancelled: "Cancelados", tab_all: "Todos",
    status_upcoming: "Agendado", status_done: "Concluído", status_cancel: "Cancelado",
    review_again: "Avaliar", rebook: "Reagendar", reschedule: "Reagendar", cancel: "Cancelar", details: "Detalhes", directions: "Como chegar",
    // next-up hero
    next_up: "Próximo agendamento", in_label: "em", days_short: "dias", hours_short: "h", minutes_short: "min", tomorrow: "Amanhã", confirmed_badge: "Confirmado", awaiting_badge: "Aguardando",
    // stats
    stat_upcoming: "Próximos", stat_done: "Concluídos", stat_pros: "Profissionais", stat_spent: "Total investido", stat_this_month: "este mês",
    // empty states
    empty_upcoming_title: "Nada na agenda ainda", empty_upcoming_sub: "Reserve com um profissional e ele aparece aqui.", empty_past_title: "Sem sessões concluídas", empty_past_sub: "Quando você terminar um serviço, ele entra no seu histórico.", empty_cancelled_title: "Nenhum cancelamento", empty_cancelled_sub: "Por aqui tá tudo certo.",
    find_pro: "Encontrar profissional",
    notes_label: "Suas notas",
    where_label: "Local",
    receipt: "Recibo",
    // my profile
    my_profile_title: "Meu perfil", my_profile_sub: "Sua identidade e preferências na GroWork.",
    member_since: "Membro desde", account_id: "ID da conta", verified: "Verificado",
    quick_actions: "Ações rápidas", edit_profile: "Editar perfil", view_bookings: "Ver agendamentos", open_settings: "Configurações",
    favorites: "Profissionais favoritos", recent_activity: "Atividade recente",
    badge_explorer: "Explorador", badge_loyal: "Cliente fiel", badge_promoter: "Indica amigos",
    badges_label: "Conquistas",
    // notifications
    notif_title: "Notificações", notif_sub: "Tudo o que aconteceu na sua conta",
    mark_all_read: "Marcar tudo como lido",
    // chat
    chat_title: "Mensagens", chat_send_placeholder: "Escreva uma mensagem...", online: "online",
    today: "Hoje", yesterday: "Ontem",
    // pro dashboard
    pro_hello: "Bom dia, Marina ☀️",
    pro_sub: "Você tem 5 agendamentos hoje. Bora começar!",
    kpi_today: "Hoje", kpi_week: "Esta semana", kpi_revenue: "Receita do mês", kpi_rating: "Avaliação",
    todays_agenda: "Agenda de hoje", quick_actions: "Ações rápidas",
    add_appt: "Novo agendamento", add_service: "Adicionar serviço", block_time: "Bloquear horário", broadcast: "Avisar clientes",
    pending_requests: "Pedidos pendentes", confirm: "Confirmar", decline: "Recusar",
    confirmed: "Confirmado", pending: "Pendente", brk: "Pausa",
    // profile extras
    contact_label: "Contato", location_label: "Local de atendimento", hours_label: "Horário semanal", socials_label: "Redes sociais", call: "Ligar", whatsapp: "WhatsApp", email_send: "Enviar e-mail", get_directions: "Ver no mapa",
    closed_label: "Fechado", holiday_alert_title: "Feriado nacional — fechado", holiday_alert_text: "Sem atendimentos no dia",
    weekdays_short_pt: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    // banner
    banner_title: "Lembrete: amanhã às 14:00",
    banner_text: "Corte feminino com Marina Costa — 1,2 km de você",
    banner_view: "Ver detalhes", banner_remind: "Lembrar depois",
    banner_title_pro: "Você tem 2 pedidos pendentes",
    banner_text_pro: "Confirme antes do fim do dia para manter sua taxa de resposta acima de 95%.",
    banner_view_pro: "Ver pedidos",
    // user menu / topbar
    user_signed_in_as: "Sessão iniciada como",
    menu_profile: "Meu perfil", menu_settings: "Configurações", menu_payment: "Pagamentos", menu_help: "Ajuda & suporte", menu_theme: "Modo escuro", menu_logout: "Sair",
    // search
    search_no_results: "Nenhum resultado para",
    search_group_pros: "Profissionais", search_group_services: "Serviços", search_group_cats: "Categorias",
    search_hint: "Comece a digitar para buscar…", search_view_all: "Ver todos os resultados",
    // notifications dropdown
    notif_recent: "Recentes", notif_view_all: "Ver todas", notif_empty: "Sem novidades por aqui"
  },
  en: {
    home: "Home", explore: "Explore", bookings: "Bookings", chat: "Messages", notif: "Notifications", history: "History", profile: "Profile",
    dashboard: "Dashboard", clients: "Clients", calendar: "Calendar",
    role_client: "Client", role_pro: "Admin", role_member: "Team",
    search_placeholder: "Search services, professionals...",
    hello: "Hi, Ana 👋", home_sub: "What do you need today?",
    featured: "This week's picks", featured_hero_tag: "Featured",
    featured_hero_title: "Your schedule, lighter — in a few taps",
    featured_hero_sub: "Find pros near you and book in 30s.",
    featured_cta: "Browse now",
    featured_2_tag: "New", featured_2_title: "Online lessons now available", featured_2_sub: "Music, painting, languages",
    featured_3_tag: "Referral", featured_3_title: "Invite a friend, get $5", featured_3_sub: "On your next service",
    near_you: "Near you", see_all: "See all",
    explore_title: "Explore professionals", explore_sub: "Find who's available where you are and when you need them.",
    filter_region: "Region", filter_service: "Service", filter_date: "Available on", filter_all: "All", filter_clear: "Clear filters",
    explore_results: "results", explore_no_results_title: "Nothing matches", explore_no_results_sub: "Try another date, region or service.",
    closed_on_date: "Closed on this day", open_on_date: "Open",
    starting_at: "from",
    cats_title: "Categories",
    book_now: "Book now",
    message: "Message",
    save: "Save",
    next_avail: "Next availability",
    services: "Services",
    about: "About",
    about_text: "Color specialist with 8 years of experience. I work in the salon and at home. I love understanding your style before any transformation.",
    reviews: "reviews",
    completed: "completed",
    response: "response",
    response_val: "< 30 min",
    rating_label: "Average rating",
    book_title: "Book a service",
    step_service: "Service", step_date: "Date & time", step_confirm: "Confirm",
    choose_service: "Choose a service",
    choose_date: "Pick a date", choose_time: "Available times",
    summary: "Summary", total: "Total", continue: "Continue", back: "Back",
    pro_label: "Professional", service_label: "Service", date_label: "Date", time_label: "Time", duration: "Duration",
    confirm_booking: "Confirm booking",
    pay_at_place: "Pay on location",
    confirmed_title: "You're all set!",
    confirmed_sub: "Your request was sent to Marina. You'll get a confirmation message in a moment.",
    add_calendar: "Add to calendar", open_chat: "Open chat", back_home: "Back home",
    bookings_title: "Bookings", bookings_sub: "Your upcoming appointments and history — all in one place.",
    history_title: "History", history_sub: "Your sessions and bookings",
    tab_upcoming: "Upcoming", tab_past: "Completed", tab_cancelled: "Cancelled", tab_all: "All",
    status_upcoming: "Scheduled", status_done: "Completed", status_cancel: "Cancelled",
    review_again: "Rate it", rebook: "Rebook", reschedule: "Reschedule", cancel: "Cancel", details: "Details", directions: "Directions",
    next_up: "Next appointment", in_label: "in", days_short: "days", hours_short: "h", minutes_short: "min", tomorrow: "Tomorrow", confirmed_badge: "Confirmed", awaiting_badge: "Awaiting",
    stat_upcoming: "Upcoming", stat_done: "Completed", stat_pros: "Pros", stat_spent: "Total spent", stat_this_month: "this month",
    empty_upcoming_title: "Nothing on your calendar yet", empty_upcoming_sub: "Book a pro and your appointment shows up here.", empty_past_title: "No completed sessions", empty_past_sub: "When you finish a service, it joins your history.", empty_cancelled_title: "No cancellations", empty_cancelled_sub: "All clear here.",
    find_pro: "Find a pro",
    notes_label: "Your notes",
    where_label: "Location",
    receipt: "Receipt",
    my_profile_title: "My profile", my_profile_sub: "Your identity and preferences on GroWork.",
    member_since: "Member since", account_id: "Account ID", verified: "Verified",
    quick_actions: "Quick actions", edit_profile: "Edit profile", view_bookings: "View bookings", open_settings: "Settings",
    favorites: "Favorite pros", recent_activity: "Recent activity",
    badge_explorer: "Explorer", badge_loyal: "Loyal client", badge_promoter: "Referrer",
    badges_label: "Achievements",
    notif_title: "Notifications", notif_sub: "Everything happening on your account",
    mark_all_read: "Mark all read",
    chat_title: "Messages", chat_send_placeholder: "Write a message...", online: "online",
    today: "Today", yesterday: "Yesterday",
    pro_hello: "Good morning, Marina ☀️",
    pro_sub: "You have 5 appointments today. Let's roll!",
    kpi_today: "Today", kpi_week: "This week", kpi_revenue: "Monthly revenue", kpi_rating: "Rating",
    todays_agenda: "Today's agenda", quick_actions: "Quick actions",
    add_appt: "New booking", add_service: "Add service", block_time: "Block time", broadcast: "Notify clients",
    pending_requests: "Pending requests", confirm: "Confirm", decline: "Decline",
    confirmed: "Confirmed", pending: "Pending", brk: "Break",
    contact_label: "Contact", location_label: "Where to find", hours_label: "Weekly hours", socials_label: "Social", call: "Call", whatsapp: "WhatsApp", email_send: "Send email", get_directions: "View on map",
    closed_label: "Closed", holiday_alert_title: "National holiday — closed", holiday_alert_text: "No appointments on",
    banner_title: "Reminder: tomorrow at 14:00",
    banner_text: "Women's haircut with Marina Costa — 0.7 mi away",
    banner_view: "View details", banner_remind: "Remind later",
    banner_title_pro: "You have 2 pending requests",
    banner_text_pro: "Confirm before end of day to keep your response rate above 95%.",
    banner_view_pro: "View requests",
    user_signed_in_as: "Signed in as",
    menu_profile: "My profile", menu_settings: "Settings", menu_payment: "Payments", menu_help: "Help & support", menu_theme: "Dark mode", menu_logout: "Log out",
    search_no_results: "No results for",
    search_group_pros: "Pros", search_group_services: "Services", search_group_cats: "Categories",
    search_hint: "Start typing to search…", search_view_all: "View all results",
    notif_recent: "Recent", notif_view_all: "View all", notif_empty: "All caught up"
  }
};
