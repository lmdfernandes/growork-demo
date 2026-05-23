import React from "react";
const Icons = window.Icons;
const { Sidebar, TopBar, MobileNav, Banner, PushToast, HomeScreen, ExploreScreen, ProfileScreen, BookingScreen, ConfirmationScreen, BookingsScreen, HistoryScreen, NotificationsScreen, ChatScreen, MyProfileScreen, SettingsScreen, PersonalInfoScreen, Field, PrivacyScreen, TwoFactorScreen, LoggedOutScreen, useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider, TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, __twkIsLight, TweakColor, TweakButton } = window;

// Pro-side screens
const { useState: useStateP } = React;

function ProDashboard({ t, lang, onChat, onNav }) {
  const data = window.GW_DATA;
  const [tab, setTab] = useStateP("today");

  // Demo agendas — today comes from data; tomorrow + week are simulated locally
  const tomorrowAgenda = [
    { time: "09:30", client: "Patrícia Antunes", service_pt: "Corte feminino", service_en: "Women's haircut", status: "confirmed" },
    { time: "11:00", client: "Camila Borges",    service_pt: "Hidratação profunda", service_en: "Deep conditioning", status: "pending" },
    { time: "13:00", client: "Almoço",           service_pt: "Pausa",          service_en: "Break", status: "break" },
    { time: "14:30", client: "Inês Cardoso",     service_pt: "Mechas",         service_en: "Highlights", status: "confirmed" },
    { time: "17:00", client: "Joana Pinto",      service_pt: "Coloração completa", service_en: "Full color", status: "confirmed" }
  ];
  const weekAgenda = [
    { day_pt: "Seg, 18 mai", day_en: "Mon, May 18", count: 4, revenue: 360, status: "done" },
    { day_pt: "Ter, 19 mai", day_en: "Tue, May 19", count: 5, revenue: 480, status: "today" },
    { day_pt: "Qua, 20 mai", day_en: "Wed, May 20", count: 5, revenue: 520, status: "upcoming" },
    { day_pt: "Qui, 21 mai", day_en: "Thu, May 21", count: 6, revenue: 640, status: "upcoming" },
    { day_pt: "Sex, 22 mai", day_en: "Fri, May 22", count: 7, revenue: 780, status: "upcoming" },
    { day_pt: "Sáb, 23 mai", day_en: "Sat, May 23", count: 3, revenue: 240, status: "upcoming" },
    { day_pt: "Dom, 24 mai", day_en: "Sun, May 24", count: 0, revenue: 0,   status: "closed" }
  ];

  const sectionTitle = tab === "today"    ? (lang === "pt" ? "Agenda de hoje" : "Today's agenda")
                     : tab === "tomorrow" ? (lang === "pt" ? "Agenda de amanhã" : "Tomorrow's agenda")
                     : (lang === "pt" ? "Resumo da semana" : "Week overview");

  const sectionDate = tab === "today"    ? (lang === "pt" ? "Terça, 19 de maio" : "Tuesday, May 19")
                    : tab === "tomorrow" ? (lang === "pt" ? "Quarta, 20 de maio" : "Wednesday, May 20")
                    : (lang === "pt" ? "18 — 24 de maio · 30 agendamentos" : "May 18 — 24 · 30 bookings");

  return (
    <div>
      <div className="spread mb-4">
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div className="avatar lg" style={{ background: "linear-gradient(135deg, #FF6FB5, var(--accent))", fontSize: 24, width: 56, height: 56 }}>💇‍♀️</div>
          <div>
            <h1 className="page-title" style={{ marginBottom: 2 }}>{t.pro_hello}</h1>
            <p className="page-sub" style={{ marginBottom: 0 }}>{t.pro_sub}</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-outline" onClick={() => onNav && onNav("pro-bookings")}>{Icons.calendar} {t.calendar}</button>
          <button className="btn btn-primary" onClick={() => onNav && onNav("pro-new-booking")}>{Icons.plus} {t.add_appt}</button>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi accent">
          <div className="kpi-label">{t.kpi_today}</div>
          <div className="kpi-val">5</div>
          <div className="kpi-delta">+2 {lang === "pt" ? "vs ontem" : "vs yesterday"}</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">{t.kpi_week}</div>
          <div className="kpi-val">30</div>
          <div className="kpi-delta">+14% {lang === "pt" ? "semana passada" : "last week"}</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">{t.kpi_revenue}</div>
          <div className="kpi-val">6.420€</div>
          <div className="kpi-delta">+18%</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">{t.kpi_rating}</div>
          <div className="kpi-val">4.9 <span style={{ color: "var(--c-amber)", fontSize: 22 }}>★</span></div>
          <div className="kpi-delta">218 {t.reviews}</div>
        </div>
      </div>

      <div className="two-col">
        <div className="agenda-day">
          <div className="spread mb-3">
            <div>
              <h2 className="section-title" style={{ marginBottom: 2 }}>{sectionTitle}</h2>
              <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>{sectionDate}</div>
            </div>
            <div className="tabs" style={{ marginBottom: 0 }}>
              <button className={"tab" + (tab === "today" ? " active" : "")} onClick={() => setTab("today")}>{lang === "pt" ? "Hoje" : "Today"}</button>
              <button className={"tab" + (tab === "tomorrow" ? " active" : "")} onClick={() => setTab("tomorrow")}>{lang === "pt" ? "Amanhã" : "Tomorrow"}</button>
              <button className={"tab" + (tab === "week" ? " active" : "")} onClick={() => setTab("week")}>{lang === "pt" ? "Semana" : "Week"}</button>
            </div>
          </div>

          {tab !== "week" && (
            <div className="agenda-list">
              {(tab === "today" ? data.proAgenda : tomorrowAgenda).map((a, i) => (
                <div key={i} className="agenda-item">
                  <div className="agenda-time">{a.time}</div>
                  <div className="agenda-body">
                    <div className="who">{a.client}</div>
                    <div className="what">{lang === "pt" ? a.service_pt : a.service_en}</div>
                  </div>
                  {a.status === "confirmed" && <span className="agenda-tag confirmed">{t.confirmed}</span>}
                  {a.status === "pending" && <span className="agenda-tag pending">{t.pending}</span>}
                  {a.status === "break" && <span className="agenda-tag">{t.brk}</span>}
                </div>
              ))}
            </div>
          )}

          {tab === "week" && (
            <div className="agenda-week">
              {weekAgenda.map((d, i) => {
                const maxCount = 7;
                const fill = d.count / maxCount;
                const isToday = d.status === "today";
                const isClosed = d.status === "closed";
                const isDone = d.status === "done";
                return (
                  <div key={i} className={"week-row" + (isToday ? " today" : "") + (isClosed ? " closed" : "") + (isDone ? " done" : "")}>
                    <div className="week-day">
                      <div className="week-day-name">{lang === "pt" ? d.day_pt : d.day_en}</div>
                      {isToday && <span className="week-day-tag">{lang === "pt" ? "Hoje" : "Today"}</span>}
                      {isClosed && <span className="week-day-tag closed">{lang === "pt" ? "Fechado" : "Closed"}</span>}
                    </div>
                    <div className="week-bar-wrap">
                      <div className="week-bar" style={{ width: (fill * 100) + "%" }} />
                    </div>
                    <div className="week-count">{d.count} <span>{lang === "pt" ? "agend." : "appt."}</span></div>
                    <div className="week-revenue">{d.revenue ? d.revenue + "€" : "—"}</div>
                  </div>
                );
              })}
              <div className="week-summary">
                <div>
                  <div className="ws-label">{lang === "pt" ? "Total da semana" : "Week total"}</div>
                  <div className="ws-val">{weekAgenda.reduce((s, d) => s + d.count, 0)} <span>{lang === "pt" ? "agendamentos" : "bookings"}</span></div>
                </div>
                <div>
                  <div className="ws-label">{lang === "pt" ? "Receita prevista" : "Projected revenue"}</div>
                  <div className="ws-val accent">{weekAgenda.reduce((s, d) => s + d.revenue, 0)}€</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="stack-12">
          <div className="card">
            <div className="spread mb-3">
              <h3 className="section-title" style={{ margin: 0 }}>{t.pending_requests}</h3>
              <button className="btn btn-ghost" style={{ padding: "4px 10px", fontSize: 12 }}>{lang === "pt" ? "Ver mais" : "View more"} {Icons.arrowR}</button>
            </div>
            <div className="stack-12">
              <div className="pending-item">
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div className="avatar" style={{ background: "linear-gradient(135deg, var(--c-pink), var(--accent))" }}>JM</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>Júlia Mendes</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{lang === "pt" ? "Mechas · 19/05 · 15:30" : "Highlights · May 19 · 3:30 pm"}</div>
                  </div>
                </div>
                <div className="pending-actions">
                  <button className="btn btn-primary" style={{ padding: "7px 10px", fontSize: 12 }}>{Icons.check} {t.confirm}</button>
                  <button className="btn btn-outline" style={{ padding: "7px 10px", fontSize: 12 }}>{t.decline}</button>
                  <button className="btn btn-ghost" style={{ padding: "7px 10px", fontSize: 12 }} title={lang === "pt" ? "Reagendar" : "Reschedule"}>{Icons.calendar}</button>
                  <button className="btn btn-ghost" style={{ padding: "7px 10px", fontSize: 12 }} onClick={() => onChat("p1")}>{Icons.chat}</button>
                </div>
              </div>

              <div style={{ height: 1, background: "var(--line)" }} />

              <div className="pending-item">
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div className="avatar" style={{ background: "linear-gradient(135deg, var(--c-mint), var(--c-sky))" }}>BC</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>Bruna Cardoso</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{lang === "pt" ? "Coloração · 20/05 · 09:00" : "Color · May 20 · 9:00 am"}</div>
                  </div>
                </div>
                <div className="pending-actions">
                  <button className="btn btn-primary" style={{ padding: "7px 10px", fontSize: 12 }}>{Icons.check} {t.confirm}</button>
                  <button className="btn btn-outline" style={{ padding: "7px 10px", fontSize: 12 }}>{t.decline}</button>
                  <button className="btn btn-ghost" style={{ padding: "7px 10px", fontSize: 12 }} title={lang === "pt" ? "Reagendar" : "Reschedule"}>{Icons.calendar}</button>
                  <button className="btn btn-ghost" style={{ padding: "7px 10px", fontSize: 12 }} onClick={() => onChat("p1")}>{Icons.chat}</button>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="section-title mb-3">{t.quick_actions}</h3>
            <div className="stack-8">
              <button className="btn btn-ghost btn-block" style={{ justifyContent: "flex-start" }} onClick={() => onNav && onNav("pro-new-booking")}>{Icons.plus} {lang === "pt" ? "Novo agendamento" : "New booking"}</button>
              <button className="btn btn-ghost btn-block" style={{ justifyContent: "flex-start" }} onClick={() => onNav && onNav("pro-new-client")}>{Icons.user} {lang === "pt" ? "Novo cliente" : "New client"}</button>
              <button className="btn btn-ghost btn-block" style={{ justifyContent: "flex-start" }} onClick={() => onNav && onNav("notifications")}>{Icons.bell} {lang === "pt" ? "Notificar cliente" : "Notify client"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ PRO BOOKINGS ============
function ProBookings({ t, lang, onChat, memberView, memberId, onNav }) {
  const data = window.GW_DATA;
  const [tab, setTab] = useStateP("upcoming");
  const [q, setQ] = useStateP("");
  const [memberFilter, setMemberFilter] = useStateP(memberView ? memberId : "all");
  const [openBooking, setOpenBooking] = useStateP(null);
  const [blacklist, setBlacklist] = useStateP(new Set());

  function toggleBlacklist(name) {
    const next = new Set(blacklist);
    if (next.has(name)) next.delete(name); else next.add(name);
    setBlacklist(next);
  }

  const team = data.proTeam;
  const memberById = team.reduce((m, x) => (m[x.id] = x, m), {});
  const currentMember = memberById[memberId] || memberById["tm2"];

  const months = lang === "pt"
    ? ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"]
    : ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];

  function buildItems(list) {
    return list.map(b => {
      const [y, m, d] = b.date.split("-").map(Number);
      const [hh, mm] = b.time.split(":").map(Number);
      const dt = new Date(y, m - 1, d, hh, mm);
      return { ...b, dt };
    })
    .filter(b => memberFilter === "all" || b.assignedTo === memberFilter)
    .filter(b => !q || b.client.toLowerCase().includes(q.toLowerCase()) || (lang === "pt" ? b.service_pt : b.service_en).toLowerCase().includes(q.toLowerCase()));
  }

  const upcoming  = buildItems(data.proBookings.upcoming).sort((a, b) => a.dt - b.dt);
  const past      = buildItems(data.proBookings.past).sort((a, b) => b.dt - a.dt);
  const cancelled = buildItems(data.proBookings.cancelled).sort((a, b) => b.dt - a.dt);

  const items = tab === "upcoming" ? upcoming : tab === "past" ? past : tab === "blocked" ? [] : cancelled;

  const pendingCount = upcoming.filter(b => b.status === "pending").length;
  const totalRevenue = past.reduce((s, b) => s + (b.price || 0), 0);
  const todayCount = upcoming.filter(b => b.date === "2026-05-19").length;

  const groups = [];
  const byKey = {};
  items.forEach(b => {
    const key = b.date;
    if (!byKey[key]) {
      const label = lang === "pt"
        ? `${b.dt.getDate()} ${months[b.dt.getMonth()]} de 2026`
        : `${months[b.dt.getMonth()]} ${b.dt.getDate()}, 2026`;
      byKey[key] = { key, label, items: [] };
      groups.push(byKey[key]);
    }
    byKey[key].items.push(b);
  });

  function clientInitials(name) {
    return name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  }

  const title = memberView
    ? (lang === "pt" ? "Agendamentos" : "Bookings")
    : t.bookings;
  const subtitle = memberView
    ? (lang === "pt" ? `Marcações atribuídas a você, ${currentMember.name.split(" ")[0]}.` : `Bookings assigned to you, ${currentMember.name.split(" ")[0]}.`)
    : (lang === "pt" ? "Gerencie as marcações da sua agenda." : "Manage all the bookings on your calendar.");

  return (
    <div>
      <div className="spread mb-4">
        <div>
          <h1 className="page-title">{title}</h1>
          <p className="page-sub" style={{ marginBottom: 0 }}>{subtitle}</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-outline" onClick={() => onNav && onNav("pro-agenda")}>{Icons.calendar} {lang === "pt" ? "Gerir agenda" : "Manage agenda"}</button>
          <button className="btn btn-primary" onClick={() => onNav && onNav("pro-new-booking")}>{Icons.plus} {t.add_appt}</button>
        </div>
      </div>

      <div className="booking-stats" style={{ marginBottom: 24 }}>
        <div className="bk-stat">
          <div className="bk-stat-icon" style={{ background: "color-mix(in oklch, var(--accent) 12%, var(--surface))", color: "var(--accent)" }}>{Icons.calendar}</div>
          <div>
            <div className="bk-stat-val">{todayCount}</div>
            <div className="bk-stat-label">{lang === "pt" ? "Hoje" : "Today"}</div>
          </div>
        </div>
        <div className="bk-stat">
          <div className="bk-stat-icon" style={{ background: "color-mix(in oklch, var(--c-amber) 22%, var(--surface))", color: "var(--c-amber)" }}>{Icons.clock}</div>
          <div>
            <div className="bk-stat-val">{pendingCount}</div>
            <div className="bk-stat-label">{t.pending}</div>
          </div>
        </div>
        <div className="bk-stat">
          <div className="bk-stat-icon" style={{ background: "color-mix(in oklch, var(--c-mint) 18%, var(--surface))", color: "var(--c-mint)" }}>{Icons.check}</div>
          <div>
            <div className="bk-stat-val">{past.length}</div>
            <div className="bk-stat-label">{t.stat_done}</div>
          </div>
        </div>
        <div className="bk-stat">
          <div className="bk-stat-icon" style={{ background: "color-mix(in oklch, var(--c-pink) 18%, var(--surface))", color: "var(--c-pink)" }}>{Icons.dollar}</div>
          <div>
            <div className="bk-stat-val">{totalRevenue}€</div>
            <div className="bk-stat-label">{lang === "pt" ? "Faturado" : "Earned"}</div>
          </div>
        </div>
      </div>

      <div className="pro-bookings-toolbar">
        <div className="topbar-search" style={{ height: 40, padding: "8px 14px", flex: 1 }}>
          {Icons.search}
          <input placeholder={lang === "pt" ? "Buscar cliente ou serviço..." : "Search client or service..."} value={q} onChange={e => setQ(e.target.value)} />
        </div>
        {!memberView && (
          <select className="pro-member-filter" value={memberFilter} onChange={e => setMemberFilter(e.target.value)}>
            <option value="all">{lang === "pt" ? "Toda a equipa" : "All team"}</option>
            {team.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        )}
        <div className="tabs" style={{ marginBottom: 0 }}>
          <button className={"tab" + (tab === "upcoming" ? " active" : "")} onClick={() => setTab("upcoming")}>{t.tab_upcoming} <span className="tab-count">{upcoming.length}</span></button>
          <button className={"tab" + (tab === "past" ? " active" : "")} onClick={() => setTab("past")}>{t.tab_past} <span className="tab-count">{past.length}</span></button>
          <button className={"tab" + (tab === "cancelled" ? " active" : "")} onClick={() => setTab("cancelled")}>{t.tab_cancelled} <span className="tab-count">{cancelled.length}</span></button>
          <button className={"tab" + (tab === "blocked" ? " active" : "")} onClick={() => setTab("blocked")}>{lang === "pt" ? "Bloqueados" : "Blocked"} <span className="tab-count">{blacklist.size + 3}</span></button>
        </div>
      </div>

      {tab === "blocked" && (
        <div className="team-table" style={{ marginTop: 18 }}>
          <div className="team-row team-row-head" style={{ gridTemplateColumns: "1.4fr 1.6fr 130px 140px" }}>
            <div>{lang === "pt" ? "Cliente" : "Client"}</div>
            <div>{lang === "pt" ? "Motivo" : "Reason"}</div>
            <div>{lang === "pt" ? "Bloqueado desde" : "Blocked since"}</div>
            <div style={{ textAlign: "right" }}>{lang === "pt" ? "Ações" : "Actions"}</div>
          </div>
          {[
            { name: "Diana Ramalho", reason_pt: "Múltiplos no-shows", reason_en: "Multiple no-shows", since: "2026-05-08" },
            { name: "Hugo Tavares",  reason_pt: "Comportamento abusivo no chat", reason_en: "Abusive behavior in chat", since: "2026-04-15" },
            { name: "Rui Costa",     reason_pt: "Falta de pagamento", reason_en: "Failed to pay", since: "2026-03-22" },
            ...[...blacklist].map(n => ({ name: n, reason_pt: "Bloqueio manual via detalhes do agendamento", reason_en: "Manual block from booking details", since: "2026-05-19" }))
          ].map(p => (
            <div key={p.name} className="team-row blacklist-row" style={{ gridTemplateColumns: "1.4fr 1.6fr 130px 140px", cursor: "default" }}>
              <div className="tr-member">
                <div className="avatar sm" style={{ background: "linear-gradient(135deg, var(--c-coral), var(--c-amber))", fontSize: 13 }}>{p.name.split(" ").map(w => w[0]).slice(0,2).join("")}</div>
                <div className="tr-name">{p.name}</div>
              </div>
              <div className="tr-role">{lang === "pt" ? p.reason_pt : p.reason_en}</div>
              <div className="tr-schedule">{p.since}</div>
              <div className="tr-actions">
                <button className="btn btn-outline" style={{ padding: "6px 10px", fontSize: 12 }} onClick={() => toggleBlacklist(p.name)}>
                  {Icons.check} {lang === "pt" ? "Desbloquear" : "Unblock"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {items.length === 0 && tab !== "blocked" && (
        <div className="bk-empty" style={{ marginTop: 18 }}>
          <div className="bk-empty-glyph">{Icons.calendar}</div>
          <div className="bk-empty-title">{lang === "pt" ? "Sem marcações por aqui" : "No bookings here"}</div>
          <div className="bk-empty-sub">{lang === "pt" ? "Quando algo aparecer na sua agenda, fica listado aqui." : "When something hits your calendar, it shows up here."}</div>
        </div>
      )}

      {groups.map(g => (
        <div key={g.key} className="bk-group" style={{ marginTop: 18 }}>
          <div className="bk-group-label">{g.label}</div>
          <div className="bk-list">
            {g.items.map(b => {
              const statusCls = b.status === "done" ? "done" : b.status === "cancelled" ? "cancel" : b.status === "pending" ? "pending" : "up";
              const statusLabel = b.status === "done" ? t.status_done : b.status === "cancelled" ? t.status_cancel : b.status === "pending" ? t.pending : t.confirmed;
              const m = memberById[b.assignedTo];
              return (
                <div key={b.id} className="pro-booking-card">
                  <div className="pbc-time">
                    <div className="pbc-hour">{b.time}</div>
                    <div className="pbc-dur">60 min</div>
                  </div>
                  <div className="pbc-divider" style={{ background: m ? m.color : "var(--accent)" }} />
                  <div className="pbc-body">
                    <div className="pbc-head">
                      <div className="pbc-client">
                        <div className="avatar sm">{clientInitials(b.client)}</div>
                        <div>
                          <div className="pbc-client-name">{b.client}</div>
                          <div className="pbc-service">{lang === "pt" ? b.service_pt : b.service_en}</div>
                        </div>
                      </div>
                      <div className="pbc-head-right">
                        <span className="pbc-price">{b.price}€</span>
                        <span className={"history-status " + statusCls}>{statusLabel}</span>
                        <div className="pbc-head-actions">
                          {b.status === "pending" && (
                            <>
                              <button className="btn btn-primary" style={{ padding: "6px 10px", fontSize: 12 }}>{Icons.check} {t.confirm}</button>
                              <button className="btn btn-outline" style={{ padding: "6px 10px", fontSize: 12 }}>{t.decline}</button>
                            </>
                          )}
                          <button className="btn btn-ghost tr-action" onClick={() => onChat && onChat("p1")} title={lang === "pt" ? "Mensagem" : "Message"}>{Icons.chat}</button>
                          <button className="btn btn-ghost tr-action" onClick={() => setOpenBooking(b)} title={lang === "pt" ? "Detalhes" : "Details"}>{Icons.arrowR}</button>
                        </div>
                      </div>
                    </div>
                    {m && (
                      <div className="pbc-assigned">
                        <span className="pbc-assigned-label">{lang === "pt" ? "Atendido por" : "Attended by"}</span>
                        <span className="pbc-assigned-chip">
                          <span className="pbc-assigned-avatar" style={{ background: m.color }}>{m.emoji}</span>
                          <span className="pbc-assigned-name">{m.name}</span>
                          {m.isOwner && <span className="pbc-assigned-owner">{lang === "pt" ? "Proprietário" : "Owner"}</span>}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {openBooking && (
        <BookingDetails t={t} lang={lang} booking={openBooking} onClose={() => setOpenBooking(null)}
          isBlacklisted={blacklist.has(openBooking.client)}
          onToggleBlacklist={() => toggleBlacklist(openBooking.client)}
          onChat={onChat}
        />
      )}
    </div>
  );
}

// ============ AGENDA PLANNER (slot generator + vacation) ============
function AgendaPlanner({ t, lang, memberView, memberId, onBack }) {
  const data = window.GW_DATA;
  const team = data.proTeam || [];
  const [step, setStep] = useStateP("slots"); // 'slots' or 'vacation'
  const [member, setMember] = useStateP(memberView ? memberId : "self");
  const [range, setRange] = useStateP("week"); // day, week, month, range
  const [start, setStart] = useStateP("2026-05-19");
  const [end, setEnd] = useStateP("2026-05-25");
  const [mode, setMode] = useStateP("interval"); // interval (every N min) or count (N per day)
  const [interval, setInterval] = useStateP(30);
  const [perDay, setPerDay] = useStateP(8);
  const [serviceMin, setServiceMin] = useStateP(60);
  const [dayStart, setDayStart] = useStateP("09:00");
  const [dayEnd, setDayEnd] = useStateP("19:00");
  const [excludeHolidays, setExcludeHolidays] = useStateP(true);
  const [excludeWeekends, setExcludeWeekends] = useStateP(true);
  const [excludeVacations, setExcludeVacations] = useStateP(true);
  const [vacStart, setVacStart] = useStateP("2026-08-01");
  const [vacEnd, setVacEnd] = useStateP("2026-08-15");
  const [vacReason, setVacReason] = useStateP(lang === "pt" ? "Férias de verão" : "Summer vacation");
  const [vacations, setVacations] = useStateP([
    { start: "2026-08-01", end: "2026-08-15", reason_pt: "Férias de verão", reason_en: "Summer vacation" }
  ]);
  const [generated, setGenerated] = useStateP(null);

  function Toggle({ value, onChange }) {
    return (
      <button className={"um-switch" + (value ? " on" : "")} onClick={() => onChange(!value)}><span className="um-switch-knob" /></button>
    );
  }
  function parseISO(s) {
    const [y, m, d] = s.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  function isoOf(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }
  function generate() {
    let s = parseISO(start);
    let e = parseISO(end);
    if (range === "day") e = new Date(s);
    if (range === "week") { e = new Date(s); e.setDate(s.getDate() + 6); }
    if (range === "month") { e = new Date(s); e.setMonth(s.getMonth() + 1); e.setDate(s.getDate() - 1); }
    const holidays = new Set((data.holidays || []).map(h => h.date));
    const days = [];
    for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
      const iso = isoOf(d);
      const dow = d.getDay();
      const isWeekend = dow === 0 || dow === 6;
      const isHol = holidays.has(iso);
      const inVac = vacations.some(v => iso >= v.start && iso <= v.end);
      let skipReason = null;
      if (excludeWeekends && isWeekend) skipReason = lang === "pt" ? "Fim de semana" : "Weekend";
      else if (excludeHolidays && isHol) skipReason = lang === "pt" ? "Feriado" : "Holiday";
      else if (excludeVacations && inVac) skipReason = lang === "pt" ? "Férias" : "Vacation";
      let slots = [];
      if (!skipReason) {
        const [sh, sm] = dayStart.split(":").map(Number);
        const [eh, em] = dayEnd.split(":").map(Number);
        const totalMin = (eh * 60 + em) - (sh * 60 + sm);
        const step = mode === "interval" ? interval : Math.max(15, Math.floor(totalMin / perDay));
        for (let m = sh * 60 + sm; m + serviceMin <= eh * 60 + em; m += step) {
          slots.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
        }
      }
      days.push({ iso, dow, skip: skipReason, slots });
    }
    setGenerated(days);
  }
  function addVacation() {
    setVacations(v => [...v, { start: vacStart, end: vacEnd, reason_pt: vacReason, reason_en: vacReason }]);
  }

  const totalSlots = generated ? generated.reduce((s, d) => s + d.slots.length, 0) : 0;
  const totalDays = generated ? generated.filter(d => !d.skip).length : 0;
  const wd = lang === "pt" ? ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"] : ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  return (
    <div>
      <button className="btn btn-ghost mb-4" onClick={onBack} style={{ padding: "8px 14px", fontSize: 13 }}>
        {Icons.arrowL}<span>{t.bookings}</span>
      </button>
      <h1 className="page-title">{lang === "pt" ? "Gerir agenda & slots" : "Manage agenda & slots"}</h1>
      <p className="page-sub">{lang === "pt" ? "Crie slots automaticamente e gerencie períodos de férias." : "Auto-create slots and manage vacation periods."}</p>

      <div className="tabs" style={{ marginBottom: 16 }}>
        <button className={"tab" + (step === "slots" ? " active" : "")} onClick={() => setStep("slots")}>{lang === "pt" ? "Criar slots" : "Generate slots"}</button>
        <button className={"tab" + (step === "vacation" ? " active" : "")} onClick={() => setStep("vacation")}>{lang === "pt" ? "Férias & folgas" : "Vacation & time off"}</button>
      </div>

      <div className="settings-grid">
        {step === "slots" && (
          <>
            {!memberView && (
              <div className="settings-card">
                <div className="settings-card-title">{lang === "pt" ? "Para quem" : "For whom"}</div>
                <select value={member} onChange={e => setMember(e.target.value)} className="ag-select">
                  <option value="self">{lang === "pt" ? "Eu (toda a equipa)" : "Me (whole team)"}</option>
                  {team.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>
            )}

            <div className="settings-card">
              <div className="settings-card-title">{lang === "pt" ? "Período" : "Period"}</div>
              <div className="ag-range">
                {[
                  { id: "day", pt: "Dia", en: "Day" },
                  { id: "week", pt: "Semana", en: "Week" },
                  { id: "month", pt: "Mês", en: "Month" },
                  { id: "range", pt: "Intervalo", en: "Range" }
                ].map(r => (
                  <button key={r.id} className={"ag-range-btn" + (range === r.id ? " selected" : "")} onClick={() => setRange(r.id)}>
                    {lang === "pt" ? r.pt : r.en}
                  </button>
                ))}
              </div>
              <div className="form-grid" style={{ marginTop: 12 }}>
                <Field label={lang === "pt" ? "Início" : "Start"}><input type="date" value={start} onChange={e => setStart(e.target.value)} /></Field>
                {(range === "range" || range === "month") && (
                  <Field label={lang === "pt" ? "Fim" : "End"}><input type="date" value={end} onChange={e => setEnd(e.target.value)} /></Field>
                )}
              </div>
            </div>

            <div className="settings-card">
              <div className="settings-card-title">{lang === "pt" ? "Horário diário" : "Daily window"}</div>
              <div className="form-grid">
                <Field label={lang === "pt" ? "Abre às" : "Opens at"}><input type="time" value={dayStart} onChange={e => setDayStart(e.target.value)} /></Field>
                <Field label={lang === "pt" ? "Fecha às" : "Closes at"}><input type="time" value={dayEnd} onChange={e => setDayEnd(e.target.value)} /></Field>
                <Field label={lang === "pt" ? "Duração do serviço (min)" : "Service duration (min)"} full><input type="number" min="15" step="15" value={serviceMin} onChange={e => setServiceMin(+e.target.value)} /></Field>
              </div>
            </div>

            <div className="settings-card">
              <div className="settings-card-title">{lang === "pt" ? "Regra de criação" : "Auto-create rule"}</div>
              <div className="ag-range" style={{ marginTop: 6 }}>
                <button className={"ag-range-btn" + (mode === "interval" ? " selected" : "")} onClick={() => setMode("interval")}>{lang === "pt" ? "De X em X min" : "Every X min"}</button>
                <button className={"ag-range-btn" + (mode === "count" ? " selected" : "")} onClick={() => setMode("count")}>{lang === "pt" ? "N por dia" : "N per day"}</button>
              </div>
              <div className="form-grid" style={{ marginTop: 12 }}>
                {mode === "interval" ? (
                  <Field label={lang === "pt" ? "Intervalo (min)" : "Interval (min)"} full>
                    <select value={interval} onChange={e => setInterval(+e.target.value)}>
                      <option value={15}>15 min</option>
                      <option value={30}>30 min</option>
                      <option value={45}>45 min</option>
                      <option value={60}>{lang === "pt" ? "1 hora" : "1 hour"}</option>
                      <option value={90}>{lang === "pt" ? "1h30" : "1h30"}</option>
                      <option value={120}>{lang === "pt" ? "2 horas" : "2 hours"}</option>
                      <option value={1440}>{lang === "pt" ? "1 dia" : "1 day"}</option>
                    </select>
                  </Field>
                ) : (
                  <Field label={lang === "pt" ? "Serviços por dia" : "Services per day"} full><input type="number" min="1" max="40" value={perDay} onChange={e => setPerDay(+e.target.value)} /></Field>
                )}
              </div>
            </div>

            <div className="settings-card">
              <div className="settings-card-title">{lang === "pt" ? "Excluir automaticamente" : "Auto-skip"}</div>
              <div className="ag-exclude">
                <label><Toggle value={excludeHolidays} onChange={setExcludeHolidays} /><span>{lang === "pt" ? "Feriados nacionais" : "National holidays"}</span></label>
                <label><Toggle value={excludeWeekends} onChange={setExcludeWeekends} /><span>{lang === "pt" ? "Fins de semana" : "Weekends"}</span></label>
                <label><Toggle value={excludeVacations} onChange={setExcludeVacations} /><span>{lang === "pt" ? "Períodos de férias" : "Vacation periods"}</span></label>
              </div>
            </div>

            <div className="settings-card" style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button className="btn btn-outline" onClick={() => { setGenerated(null); }}>{lang === "pt" ? "Limpar" : "Clear"}</button>
              <button className="btn btn-primary btn-lg" onClick={generate}>{Icons.sparkle} {lang === "pt" ? "Gerar slots" : "Generate slots"}</button>
            </div>

            {generated && (
              <div className="settings-card">
                <div className="spread mb-3">
                  <div className="settings-card-title" style={{ margin: 0 }}>{lang === "pt" ? "Pré-visualização" : "Preview"}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>
                    <strong style={{ color: "var(--accent)" }}>{totalSlots}</strong> {lang === "pt" ? "slots em" : "slots in"} {totalDays} {lang === "pt" ? "dias" : "days"}
                  </div>
                </div>
                <div className="ag-preview" style={{ maxHeight: 360 }}>
                  {generated.map(d => (
                    <div key={d.iso} className={"ag-day" + (d.skip ? " skipped" : "")}>
                      <div className="ag-day-head">
                        <span className="ag-day-wd">{wd[d.dow]}</span>
                        <span className="ag-day-iso">{d.iso.slice(5).replace("-", "/")}</span>
                        {d.skip && <span className="ag-day-skip">{d.skip}</span>}
                      </div>
                      {!d.skip && (
                        <div className="ag-slots">
                          {d.slots.slice(0, 12).map(s => <span key={s} className="ag-slot">{s}</span>)}
                          {d.slots.length > 12 && <span className="ag-slot ag-slot-more">+{d.slots.length - 12}</span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 14 }}>
                  <button className="btn btn-primary" onClick={onBack}>{Icons.check} {lang === "pt" ? "Aplicar à agenda" : "Apply to agenda"}</button>
                </div>
              </div>
            )}
          </>
        )}

        {step === "vacation" && (
          <>
            <div className="settings-card">
              <div className="settings-card-title">{lang === "pt" ? "Marcar período" : "Mark period"}</div>
              <div className="form-grid">
                <Field label={lang === "pt" ? "Início" : "Start"}><input type="date" value={vacStart} onChange={e => setVacStart(e.target.value)} /></Field>
                <Field label={lang === "pt" ? "Fim" : "End"}><input type="date" value={vacEnd} onChange={e => setVacEnd(e.target.value)} /></Field>
                <Field label={lang === "pt" ? "Motivo" : "Reason"} full><input value={vacReason} onChange={e => setVacReason(e.target.value)} placeholder={lang === "pt" ? "Ex: Férias de verão" : "e.g. Summer vacation"} /></Field>
              </div>
              <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end" }}>
                <button className="btn btn-primary" onClick={addVacation}>{Icons.plus} {lang === "pt" ? "Adicionar" : "Add"}</button>
              </div>
            </div>

            <div className="settings-card">
              <div className="settings-card-title">{lang === "pt" ? "Períodos marcados" : "Marked periods"}</div>
              {vacations.length === 0 && <div style={{ color: "var(--muted)", fontSize: 13 }}>{lang === "pt" ? "Nenhum período marcado." : "No periods marked."}</div>}
              <div className="stack-8">
                {vacations.map((v, i) => (
                  <div key={i} className="ag-vacation-row">
                    <div className="ag-vacation-ico">{Icons.calendar}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{lang === "pt" ? v.reason_pt : v.reason_en}</div>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>{v.start} → {v.end}</div>
                    </div>
                    <button className="btn btn-ghost tr-action" onClick={() => setVacations(vs => vs.filter((_, k) => k !== i))}>{Icons.x}</button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ============ BOOKING DETAILS DRAWER ============
function BookingDetails({ t, lang, booking, onClose, isBlacklisted, onToggleBlacklist, onChat }) {
  const b = booking;
  const data = window.GW_DATA;
  const m = data.proTeam.find(x => x.id === b.assignedTo);

  // Demo enrichment
  const clientPrefs = {
    notes_pt: "Cabelo sensível, evitar produtos com sulfato. Prefere conversa baixa durante o atendimento.",
    notes_en: "Sensitive scalp, avoid sulfate products. Prefers quiet during the appointment.",
    bookingNote_pt: "Vou trazer fotos das mechas que quero. Pode adiantar 15 min?",
    bookingNote_en: "I'll bring photos of the highlights I want. Can we start 15 min earlier?",
    visits: 7,
    lastVisit: "2026-04-22",
    allergies_pt: "Henna, amónia",
    allergies_en: "Henna, ammonia"
  };

  const history = [
    { date: "2026-04-22", service_pt: "Mechas", service_en: "Highlights", note_pt: "Ficou ótima. Cliente gostou do tom mais quente.", note_en: "Turned out great. Client loved the warmer tone." },
    { date: "2026-03-10", service_pt: "Corte feminino", service_en: "Women's haircut", note_pt: "Comprimento médio, franja lateral.", note_en: "Mid length, side fringe." },
    { date: "2026-01-28", service_pt: "Coloração completa", service_en: "Full color", note_pt: "Castanho chocolate. Ajustar o tom para próximas vezes.", note_en: "Chocolate brown. Tweak the tone next time." }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="drawer" onClick={e => e.stopPropagation()}>
        <div className="drawer-head">
          <button className="btn btn-ghost tr-action" onClick={onClose} title={lang === "pt" ? "Voltar" : "Back"}>{Icons.arrowL}</button>
          <div className="drawer-title">{lang === "pt" ? "Detalhes do agendamento" : "Booking details"}</div>
          <button className="btn btn-ghost tr-action" onClick={onClose}>{Icons.x}</button>
        </div>
        <div className="drawer-body">
          {/* Booking summary */}
          <div className="card">
            <div className="spread">
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)" }}>{lang === "pt" ? b.service_pt : b.service_en}</div>
                <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{b.date} · {b.time} · 60 min</div>
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "var(--accent)" }}>{b.price}€</div>
            </div>
            {m && (
              <div className="pbc-assigned" style={{ marginTop: 12 }}>
                <span className="pbc-assigned-label">{lang === "pt" ? "Atendido por" : "Attended by"}</span>
                <span className="pbc-assigned-chip">
                  <span className="pbc-assigned-avatar" style={{ background: m.color }}>{m.emoji}</span>
                  <span className="pbc-assigned-name">{m.name}</span>
                </span>
              </div>
            )}
          </div>

          {/* Client card */}
          <div className="card">
            <div className="spread">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className="avatar" style={{ background: "linear-gradient(135deg, var(--c-pink), var(--accent))" }}>{b.client.split(" ").map(w => w[0]).slice(0,2).join("")}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{b.client}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>
                    {clientPrefs.visits} {lang === "pt" ? "visitas" : "visits"} · {lang === "pt" ? "última" : "last"} {clientPrefs.lastVisit}
                  </div>
                </div>
                {isBlacklisted && <span className="blacklist-tag">{lang === "pt" ? "Bloqueado" : "Blocked"}</span>}
              </div>
              <button className="btn btn-outline" style={{ padding: "8px 12px", fontSize: 12 }} onClick={() => onChat && onChat("p1")}>{Icons.chat} {lang === "pt" ? "Mensagem" : "Message"}</button>
            </div>
          </div>

          {/* Booking note (from client) */}
          <div className="card">
            <div className="card-label">{lang === "pt" ? "Nota deixada pelo cliente" : "Note from client"}</div>
            <p style={{ margin: "8px 0 0", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55 }}>"{lang === "pt" ? clientPrefs.bookingNote_pt : clientPrefs.bookingNote_en}"</p>
          </div>

          {/* Preferences */}
          <div className="card">
            <div className="card-label">{lang === "pt" ? "Preferências & cuidados" : "Preferences & care"}</div>
            <p style={{ margin: "8px 0 12px", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55 }}>{lang === "pt" ? clientPrefs.notes_pt : clientPrefs.notes_en}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span className="team-service-chip" style={{ background: "color-mix(in oklch, var(--c-coral) 14%, var(--surface))", color: "var(--c-coral)", borderColor: "color-mix(in oklch, var(--c-coral) 30%, var(--line))" }}>⚠️ {lang === "pt" ? "Alergias" : "Allergies"}: {lang === "pt" ? clientPrefs.allergies_pt : clientPrefs.allergies_en}</span>
            </div>
          </div>

          {/* History */}
          <div className="card">
            <div className="card-label">{lang === "pt" ? "Histórico de atendimentos" : "Past sessions"}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
              {history.map((h, i) => (
                <div key={i} className="bd-history-row">
                  <div className="bd-history-date">{h.date.slice(5).replace("-", "/")}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{lang === "pt" ? h.service_pt : h.service_en}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>"{lang === "pt" ? h.note_pt : h.note_en}"</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Blacklist */}
          <div className={"card" + (isBlacklisted ? " danger" : "")}>
            <div className="spread">
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: isBlacklisted ? "var(--c-coral)" : "var(--ink)" }}>
                  {isBlacklisted ? (lang === "pt" ? "Cliente bloqueado" : "Client blocked") : (lang === "pt" ? "Bloquear este cliente" : "Block this client")}
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4, maxWidth: 380, lineHeight: 1.5 }}>
                  {isBlacklisted
                    ? (lang === "pt" ? "Não recebe agendamentos, mensagens ou notificações até desbloquear." : "Cannot book, message or receive notifications until unblocked.")
                    : (lang === "pt" ? "Impede que o cliente faça novos agendamentos, envie mensagens ou receba notificações." : "Prevents the client from booking, messaging or getting notifications.")}
                </div>
              </div>
              <button className="btn btn-outline" style={{ color: "var(--c-coral)", borderColor: "color-mix(in oklch, var(--c-coral) 30%, var(--line))" }} onClick={onToggleBlacklist}>
                {Icons.x} {isBlacklisted ? (lang === "pt" ? "Desbloquear" : "Unblock") : (lang === "pt" ? "Bloquear" : "Block")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ MEMBER DASHBOARD ============
function MemberDashboard({ t, lang, onChat, memberId, onNav }) {
  const data = window.GW_DATA;
  const me = data.proTeam.find(m => m.id === memberId) || data.proTeam[1];
  const [tab, setTab] = useStateP("today");

  // My-only agendas
  const myUpcoming = data.proBookings.upcoming.filter(b => b.assignedTo === me.id);
  const myPast = data.proBookings.past.filter(b => b.assignedTo === me.id);

  const todayBookings  = myUpcoming.filter(b => b.date === "2026-05-19");
  const tomorrowBookings = myUpcoming.filter(b => b.date === "2026-05-20");
  const weekBookings = myUpcoming;
  const pending = myUpcoming.filter(b => b.status === "pending").length;
  const done = myPast.length;

  // Week summary (per-day)
  const weekAgenda = [
    { key: "2026-05-18", day_pt: "Seg, 18 mai", day_en: "Mon, May 18", status: "done" },
    { key: "2026-05-19", day_pt: "Ter, 19 mai", day_en: "Tue, May 19", status: "today" },
    { key: "2026-05-20", day_pt: "Qua, 20 mai", day_en: "Wed, May 20", status: "upcoming" },
    { key: "2026-05-21", day_pt: "Qui, 21 mai", day_en: "Thu, May 21", status: "upcoming" },
    { key: "2026-05-22", day_pt: "Sex, 22 mai", day_en: "Fri, May 22", status: "upcoming" },
    { key: "2026-05-23", day_pt: "Sáb, 23 mai", day_en: "Sat, May 23", status: "upcoming" },
    { key: "2026-05-24", day_pt: "Dom, 24 mai", day_en: "Sun, May 24", status: "closed" }
  ].map(d => {
    const count = d.status === "done"
      ? myPast.filter(b => b.date === d.key).length
      : myUpcoming.filter(b => b.date === d.key).length;
    return { ...d, count };
  });

  const sectionTitle = tab === "today"    ? (lang === "pt" ? "Agenda de hoje" : "Today's agenda")
                     : tab === "tomorrow" ? (lang === "pt" ? "Agenda de amanhã" : "Tomorrow's agenda")
                     : (lang === "pt" ? "Resumo da semana" : "Week overview");

  const sectionDate = tab === "today"    ? (lang === "pt" ? "Terça, 19 de maio" : "Tuesday, May 19")
                    : tab === "tomorrow" ? (lang === "pt" ? "Quarta, 20 de maio" : "Wednesday, May 20")
                    : (lang === "pt" ? `18 — 24 de maio · ${weekBookings.length} marcações` : `May 18 — 24 · ${weekBookings.length} bookings`);

  const listForTab = tab === "today" ? todayBookings : tab === "tomorrow" ? tomorrowBookings : [];

  return (
    <div>
      <div className="spread mb-4">
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div className="avatar lg" style={{ background: me.color, fontSize: 24, width: 56, height: 56 }}>{me.emoji}</div>
          <div>
            <h1 className="page-title" style={{ marginBottom: 2 }}>{lang === "pt" ? `Olá, ${me.name.split(" ")[0]} 👋` : `Hi, ${me.name.split(" ")[0]} 👋`}</h1>
            <p className="page-sub" style={{ marginBottom: 0 }}>
              {lang === "pt" ? `Você tem ${todayBookings.length} marcaç${todayBookings.length === 1 ? "ão" : "ões"} hoje.` : `You have ${todayBookings.length} booking${todayBookings.length === 1 ? "" : "s"} today.`}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-outline" onClick={() => onNav && onNav("member-bookings")}>{Icons.calendar} {t.calendar}</button>
          <button className="btn btn-primary" onClick={() => onNav && onNav("pro-new-booking")}>{Icons.plus} {t.add_appt}</button>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi accent">
          <div className="kpi-label">{lang === "pt" ? "Hoje" : "Today"}</div>
          <div className="kpi-val">{todayBookings.length}</div>
          <div className="kpi-delta">{lang === "pt" ? "marcações atribuídas" : "assigned bookings"}</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">{lang === "pt" ? "Esta semana" : "This week"}</div>
          <div className="kpi-val">{weekBookings.length}</div>
          <div className="kpi-delta">+3 {lang === "pt" ? "vs semana passada" : "vs last week"}</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">{lang === "pt" ? "Pendente" : "Pending"}</div>
          <div className="kpi-val">{pending}</div>
          <div className="kpi-delta">{lang === "pt" ? "aguardando confirmação" : "awaiting confirmation"}</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">{lang === "pt" ? "Avaliação" : "Rating"}</div>
          <div className="kpi-val">{me.rating.toFixed(1)} <span style={{ color: "var(--c-amber)", fontSize: 22 }}>★</span></div>
          <div className="kpi-delta">{done} {lang === "pt" ? "concluídas" : "completed"}</div>
        </div>
      </div>

      <div className="two-col">
        <div className="agenda-day">
          <div className="spread mb-3">
            <div>
              <h2 className="section-title" style={{ marginBottom: 2 }}>{sectionTitle}</h2>
              <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>{sectionDate}</div>
            </div>
            <div className="tabs" style={{ marginBottom: 0 }}>
              <button className={"tab" + (tab === "today" ? " active" : "")} onClick={() => setTab("today")}>{lang === "pt" ? "Hoje" : "Today"}</button>
              <button className={"tab" + (tab === "tomorrow" ? " active" : "")} onClick={() => setTab("tomorrow")}>{lang === "pt" ? "Amanhã" : "Tomorrow"}</button>
              <button className={"tab" + (tab === "week" ? " active" : "")} onClick={() => setTab("week")}>{lang === "pt" ? "Semana" : "Week"}</button>
            </div>
          </div>

          {tab !== "week" && (
            <div className="agenda-list">
              {listForTab.length === 0 && (
                <div className="card" style={{ textAlign: "center", color: "var(--muted)" }}>
                  {lang === "pt" ? "Sem marcações neste dia. Aproveite!" : "No bookings on this day. Enjoy!"}
                </div>
              )}
              {listForTab.map(a => (
                <div key={a.id} className="agenda-item">
                  <div className="agenda-time">{a.time}</div>
                  <div className="agenda-body">
                    <div className="who">{a.client}</div>
                    <div className="what">{lang === "pt" ? a.service_pt : a.service_en}</div>
                  </div>
                  <span className={"agenda-tag " + (a.status === "pending" ? "pending" : "confirmed")}>
                    {a.status === "pending" ? t.pending : t.confirmed}
                  </span>
                </div>
              ))}
            </div>
          )}

          {tab === "week" && (
            <div className="agenda-week">
              {weekAgenda.map((d, i) => {
                const maxCount = 5;
                const fill = Math.min(d.count / maxCount, 1);
                const isToday = d.status === "today";
                const isClosed = d.status === "closed";
                const isDone = d.status === "done";
                return (
                  <div key={i} className={"week-row" + (isToday ? " today" : "") + (isClosed ? " closed" : "") + (isDone ? " done" : "")}>
                    <div className="week-day">
                      <div className="week-day-name">{lang === "pt" ? d.day_pt : d.day_en}</div>
                      {isToday && <span className="week-day-tag">{lang === "pt" ? "Hoje" : "Today"}</span>}
                      {isClosed && <span className="week-day-tag closed">{lang === "pt" ? "Fechado" : "Closed"}</span>}
                    </div>
                    <div className="week-bar-wrap">
                      <div className="week-bar" style={{ width: (fill * 100) + "%" }} />
                    </div>
                    <div className="week-count">{d.count} <span>{lang === "pt" ? "agend." : "appt."}</span></div>
                    <div className="week-revenue">—</div>
                  </div>
                );
              })}
              <div className="week-summary">
                <div>
                  <div className="ws-label">{lang === "pt" ? "Total da semana" : "Week total"}</div>
                  <div className="ws-val">{weekAgenda.reduce((s, d) => s + d.count, 0)} <span>{lang === "pt" ? "marcações" : "bookings"}</span></div>
                </div>
                <div>
                  <div className="ws-label">{lang === "pt" ? "Concluídas" : "Completed"}</div>
                  <div className="ws-val accent">{done}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="stack-12">
          <div className="card">
            <div className="spread mb-3">
              <h3 className="section-title" style={{ margin: 0 }}>{lang === "pt" ? "Pedidos pendentes" : "Pending requests"}</h3>
              <button className="btn btn-ghost" style={{ padding: "4px 10px", fontSize: 12 }}>{lang === "pt" ? "Ver mais" : "View more"} {Icons.arrowR}</button>
            </div>
            <div className="stack-12">
              {myUpcoming.filter(b => b.status === "pending").slice(0, 2).map(b => (
                <div key={b.id} className="pending-item">
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div className="avatar" style={{ background: "linear-gradient(135deg, var(--c-pink), var(--accent))" }}>{b.client.split(" ").map(w => w[0]).slice(0,2).join("")}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{b.client}</div>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>{lang === "pt" ? b.service_pt : b.service_en} · {b.date.slice(5).replace("-", "/")} · {b.time}</div>
                    </div>
                  </div>
                  <div className="pending-actions">
                    <button className="btn btn-primary" style={{ padding: "7px 10px", fontSize: 12 }}>{Icons.check} {t.confirm}</button>
                    <button className="btn btn-outline" style={{ padding: "7px 10px", fontSize: 12 }}>{t.decline}</button>
                    <button className="btn btn-ghost" style={{ padding: "7px 10px", fontSize: 12 }} title={lang === "pt" ? "Reagendar" : "Reschedule"}>{Icons.calendar}</button>
                    <button className="btn btn-ghost" style={{ padding: "7px 10px", fontSize: 12 }} onClick={() => onChat("p1")}>{Icons.chat}</button>
                  </div>
                </div>
              ))}
              {myUpcoming.filter(b => b.status === "pending").length === 0 && (
                <div style={{ textAlign: "center", color: "var(--muted)", fontSize: 13, padding: 14 }}>
                  {lang === "pt" ? "Sem pedidos pendentes." : "No pending requests."}
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <h3 className="section-title mb-3">{lang === "pt" ? "Ações rápidas" : "Quick actions"}</h3>
            <div className="stack-8">
              <button className="btn btn-ghost btn-block" style={{ justifyContent: "flex-start" }} onClick={() => onNav && onNav("pro-new-booking")}>{Icons.plus} {lang === "pt" ? "Novo agendamento" : "New booking"}</button>
              <button className="btn btn-ghost btn-block" style={{ justifyContent: "flex-start" }} onClick={() => onNav && onNav("pro-new-client")}>{Icons.user} {lang === "pt" ? "Novo cliente" : "New client"}</button>
              <button className="btn btn-ghost btn-block" style={{ justifyContent: "flex-start" }} onClick={() => onNav && onNav("notifications")}>{Icons.bell} {lang === "pt" ? "Notificar cliente" : "Notify client"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




// ============ PRO TEAM ============
function ProTeam({ t, lang, onChat, onOpenMember, onAddMember }) {
  const data = window.GW_DATA;
  const team = data.proTeam;
  const totalWeek = team.reduce((s, m) => s + m.bookingsWeek, 0);
  const available = team.filter(m => m.status === "available").length;
  const off = team.filter(m => m.status === "off").length;

  const statusLabels = {
    available: lang === "pt" ? "Disponível" : "Available",
    busy:      lang === "pt" ? "Ocupado"    : "Busy",
    off:       lang === "pt" ? "Folga"      : "Off"
  };

  return (
    <div>
      <div className="spread mb-4">
        <div>
          <h1 className="page-title">{lang === "pt" ? "Equipa" : "Team"}</h1>
          <p className="page-sub" style={{ marginBottom: 0 }}>
            {lang === "pt" ? "Gerencie quem trabalha consigo, horários e permissões." : "Manage who works with you, schedules and permissions."}
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => onAddMember && onAddMember()}>{Icons.plus} {lang === "pt" ? "Adicionar Membro" : "Add Member"}</button>
      </div>

      <div className="booking-stats" style={{ marginBottom: 22 }}>
        <div className="bk-stat">
          <div className="bk-stat-icon" style={{ background: "color-mix(in oklch, var(--accent) 12%, var(--surface))", color: "var(--accent)" }}>{Icons.users}</div>
          <div>
            <div className="bk-stat-val">{team.length}</div>
            <div className="bk-stat-label">{lang === "pt" ? "Membros" : "Members"}</div>
          </div>
        </div>
        <div className="bk-stat">
          <div className="bk-stat-icon" style={{ background: "color-mix(in oklch, var(--c-mint) 18%, var(--surface))", color: "var(--c-mint)" }}>{Icons.check}</div>
          <div>
            <div className="bk-stat-val">{available}</div>
            <div className="bk-stat-label">{statusLabels.available}</div>
          </div>
        </div>
        <div className="bk-stat">
          <div className="bk-stat-icon" style={{ background: "color-mix(in oklch, var(--c-amber) 22%, var(--surface))", color: "var(--c-amber)" }}>{Icons.clock}</div>
          <div>
            <div className="bk-stat-val">{off}</div>
            <div className="bk-stat-label">{statusLabels.off}</div>
          </div>
        </div>
        <div className="bk-stat">
          <div className="bk-stat-icon" style={{ background: "color-mix(in oklch, var(--c-pink) 18%, var(--surface))", color: "var(--c-pink)" }}>{Icons.calendar}</div>
          <div>
            <div className="bk-stat-val">{totalWeek}</div>
            <div className="bk-stat-label">{lang === "pt" ? "Marcações na semana" : "Bookings this week"}</div>
          </div>
        </div>
      </div>

      <h2 className="section-title mb-3">{lang === "pt" ? "Membros da equipa" : "Team members"}</h2>
      <div className="team-table">
        <div className="team-row team-row-head">
          <div>{lang === "pt" ? "Membro" : "Member"}</div>
          <div>{lang === "pt" ? "Função" : "Role"}</div>
          <div>{lang === "pt" ? "Estado" : "Status"}</div>
          <div>{lang === "pt" ? "Horário" : "Schedule"}</div>
          <div style={{ textAlign: "center" }}>{lang === "pt" ? "Semana" : "Week"}</div>
          <div>{lang === "pt" ? "Avaliação" : "Rating"}</div>
          <div style={{ textAlign: "right" }}>{lang === "pt" ? "Ações" : "Actions"}</div>
        </div>

        {team.map(m => (
          <div key={m.id} className="team-row" onClick={() => onOpenMember && onOpenMember(m.id)}>
            <div className="tr-member">
              <div className="avatar sm" style={{ background: m.color, fontSize: 18 }}>{m.emoji}</div>
              <div className="tr-name-wrap">
                <div className="tr-name">{m.name}</div>
                {m.isOwner && <span className="tr-owner-tag">{lang === "pt" ? "Proprietário" : "Owner"}</span>}
              </div>
            </div>
            <div className="tr-role">{lang === "pt" ? m.role_pt : m.role_en}</div>
            <div>
              <span className={"team-status " + m.status}>
                <span className="team-status-dot" />
                {statusLabels[m.status]}
              </span>
            </div>
            <div className="tr-schedule">{lang === "pt" ? m.schedule_pt : m.schedule_en}</div>
            <div className="tr-count">{m.bookingsWeek}</div>
            <div className="tr-rating">{m.rating.toFixed(1)} <span style={{ color: "var(--c-amber)" }}>★</span></div>
            <div className="tr-actions">
              <button className="btn btn-ghost tr-action" onClick={(e) => { e.stopPropagation(); onOpenMember && onOpenMember(m.id, "agenda"); }} title={lang === "pt" ? "Ver agenda" : "View agenda"}>
                {Icons.calendar}
              </button>
              <button className="btn btn-ghost tr-action" onClick={(e) => { e.stopPropagation(); onChat && onChat("p1"); }} title={lang === "pt" ? "Mensagem" : "Message"}>
                {Icons.chat}
              </button>
              <button className="btn btn-ghost tr-action" onClick={(e) => { e.stopPropagation(); onOpenMember && onOpenMember(m.id, "settings"); }} title={lang === "pt" ? "Configurações" : "Settings"}>
                {Icons.settings}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ MEMBER DETAILS (admin perspective) ============
function MemberDetails({ t, lang, memberId, initialTab, onBack, onChat }) {
  const data = window.GW_DATA;
  const m = data.proTeam.find(x => x.id === memberId) || data.proTeam[1];
  const [tab, setTab] = useStateP(initialTab || "agenda");
  const [canManageTeam, setCanManageTeam] = useStateP(m.isOwner);
  const [canManageBookings, setCanManageBookings] = useStateP(true);
  const [canManageNotifications, setCanManageNotifications] = useStateP(m.isOwner);
  const [canViewRevenue, setCanViewRevenue] = useStateP(m.isOwner);
  const [canInvite, setCanInvite] = useStateP(m.isOwner);
  const [showRemove, setShowRemove] = useStateP(false);

  const upcoming = data.proBookings.upcoming.filter(b => b.assignedTo === m.id);
  const past = data.proBookings.past.filter(b => b.assignedTo === m.id);

  function Toggle({ value, onChange, disabled }) {
    return (
      <button className={"um-switch" + (value ? " on" : "")} disabled={disabled} onClick={() => !disabled && onChange(!value)} style={{ opacity: disabled ? .5 : 1 }}>
        <span className="um-switch-knob" />
      </button>
    );
  }

  function Row({ icon, title, sub, control, danger, last }) {
    return (
      <div className={"settings-row" + (last ? " last" : "") + (danger ? " danger" : "")}>
        <div className="settings-row-ico">{icon}</div>
        <div className="settings-row-body">
          <div className="settings-row-title">{title}</div>
          {sub && <div className="settings-row-sub">{sub}</div>}
        </div>
        <div className="settings-row-control">{control}</div>
      </div>
    );
  }

  return (
    <div>
      <button className="btn btn-ghost mb-4" onClick={onBack} style={{ padding: "8px 14px", fontSize: 13 }}>
        {Icons.arrowL}<span>{lang === "pt" ? "Equipa" : "Team"}</span>
      </button>

      <div className="member-hero">
        <div className="member-hero-cover" style={{ background: m.color }} />
        <div className="member-hero-body">
          <div className="avatar lg" style={{ background: m.color, fontSize: 28, border: "4px solid var(--surface)", width: 80, height: 80, marginTop: -40 }}>{m.emoji}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 className="page-title" style={{ marginBottom: 4 }}>{m.name}</h1>
            <p className="page-sub" style={{ marginBottom: 0 }}>{lang === "pt" ? m.role_pt : m.role_en} · {m.email}</p>
          </div>
          <span className="member-role-tag">{m.isOwner ? (lang === "pt" ? "Proprietário" : "Owner") : (lang === "pt" ? "Membro" : "Member")}</span>
        </div>
      </div>

      <div className="tabs" style={{ marginTop: 22 }}>
        <button className={"tab" + (tab === "agenda" ? " active" : "")} onClick={() => setTab("agenda")}>{lang === "pt" ? "Agenda" : "Agenda"}</button>
        <button className={"tab" + (tab === "settings" ? " active" : "")} onClick={() => setTab("settings")}>{lang === "pt" ? "Configurações & permissões" : "Settings & permissions"}</button>
      </div>

      {tab === "agenda" && (
        <div className="agenda-day">
          <div className="spread mb-3">
            <h2 className="section-title">{lang === "pt" ? `Próximas marcações de ${m.name.split(" ")[0]}` : `${m.name.split(" ")[0]}'s upcoming bookings`}</h2>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>{upcoming.length} {lang === "pt" ? "marcações" : "bookings"} · {past.length} {lang === "pt" ? "concluídas" : "completed"}</span>
          </div>
          <div className="agenda-list">
            {upcoming.length === 0 && (
              <div className="card" style={{ textAlign: "center", color: "var(--muted)" }}>
                {lang === "pt" ? "Sem marcações próximas." : "No upcoming bookings."}
              </div>
            )}
            {upcoming.map(a => (
              <div key={a.id} className="agenda-item">
                <div className="agenda-time">{a.time}<br /><span style={{ fontSize: 10, opacity: .7 }}>{a.date.slice(5).replace("-", "/")}</span></div>
                <div className="agenda-body">
                  <div className="who">{a.client}</div>
                  <div className="what">{lang === "pt" ? a.service_pt : a.service_en}</div>
                </div>
                <span className={"agenda-tag " + (a.status === "pending" ? "pending" : "confirmed")}>
                  {a.status === "pending" ? t.pending : t.confirmed}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "settings" && (
        <div className="settings-grid">
          <div className="settings-card">
            <div className="settings-card-title">{lang === "pt" ? "Permissões" : "Permissions"}</div>
            <Row icon={Icons.users}    title={lang === "pt" ? "Gerir equipa" : "Manage team"}             sub={lang === "pt" ? "Adicionar, editar e remover membros da equipa." : "Add, edit and remove team members."} control={<Toggle value={canManageTeam} onChange={setCanManageTeam} disabled={m.isOwner} />} />
            <Row icon={Icons.send}     title={lang === "pt" ? "Convidar novos membros" : "Invite new members"} sub={lang === "pt" ? "Enviar convites por e-mail." : "Send invites by email."}                        control={<Toggle value={canInvite} onChange={setCanInvite} disabled={m.isOwner} />} />
            <Row icon={Icons.calendar} title={lang === "pt" ? "Gerir agendamentos" : "Manage bookings"}    sub={lang === "pt" ? "Aceitar, recusar ou reagendar marcações dos colegas." : "Accept, reject or reschedule colleagues' bookings."} control={<Toggle value={canManageBookings} onChange={setCanManageBookings} />} />
            <Row icon={Icons.bell}     title={lang === "pt" ? "Gerir notificações" : "Manage notifications"} sub={lang === "pt" ? "Enviar notificações e e-mails para clientes do negócio." : "Send notifications and emails to clients of the business."} control={<Toggle value={canManageNotifications} onChange={setCanManageNotifications} />} />
            <Row icon={Icons.dollar}   title={lang === "pt" ? "Ver receita do negócio" : "View business revenue"} sub={lang === "pt" ? "Acesso aos números globais e relatórios." : "Access to global numbers and reports."} control={<Toggle value={canViewRevenue} onChange={setCanViewRevenue} disabled={m.isOwner} />} last />
          </div>

          <div className="settings-card">
            <div className="settings-card-title">{lang === "pt" ? "Função e área" : "Role and area"}</div>
            <Row icon={Icons.user}     title={lang === "pt" ? "Função" : "Role"} sub={lang === "pt" ? m.role_pt : m.role_en} control={
              <button className="btn btn-ghost tr-action" onClick={() => setTab("edit-role")}>{Icons.arrowR}</button>
            } />
            <Row icon={Icons.sparkle}  title={lang === "pt" ? "Serviços" : "Services"} sub={m.services.join(" · ")} control={
              <button className="btn btn-ghost tr-action" onClick={() => setTab("edit-services")}>{Icons.arrowR}</button>
            } />
            <Row icon={Icons.clock}    title={lang === "pt" ? "Horário semanal" : "Weekly schedule"} sub={lang === "pt" ? m.schedule_pt : m.schedule_en} control={
              <button className="btn btn-ghost tr-action" onClick={() => setTab("edit-schedule")}>{Icons.arrowR}</button>
            } last />
          </div>

          {!m.isOwner && (
            <div className="settings-card danger">
              <div className="settings-card-title">{lang === "pt" ? "Zona de risco" : "Danger zone"}</div>
              <Row icon={Icons.x}
                   title={lang === "pt" ? "Remover da equipa" : "Remove from team"}
                   sub={lang === "pt" ? `Remove ${m.name} da equipa. Marcações futuras precisarão de ser reatribuídas.` : `Removes ${m.name} from the team. Future bookings will need to be reassigned.`}
                   control={
                     <button className="btn btn-outline" style={{ color: "var(--c-coral)", borderColor: "color-mix(in oklch, var(--c-coral) 30%, var(--line))", padding: "8px 14px", fontSize: 13 }} onClick={() => setShowRemove(true)}>
                       {lang === "pt" ? "Remover" : "Remove"}
                     </button>
                   }
                   last />
            </div>
          )}
        </div>
      )}

      {tab === "edit-role" && (
        <EditRole t={t} lang={lang} member={m} onBack={() => setTab("settings")} />
      )}
      {tab === "edit-services" && (
        <EditServices t={t} lang={lang} member={m} onBack={() => setTab("settings")} />
      )}
      {tab === "edit-schedule" && (
        <EditSchedule t={t} lang={lang} member={m} onBack={() => setTab("settings")} />
      )}

      {showRemove && (
        <div className="modal-backdrop" onClick={() => setShowRemove(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-icon" style={{ background: "color-mix(in oklch, var(--c-coral) 18%, var(--surface))", color: "var(--c-coral)" }}>{Icons.x}</div>
            <h3 className="modal-title">{lang === "pt" ? "Remover este membro?" : "Remove this member?"}</h3>
            <p className="modal-text">
              {lang === "pt"
                ? `Esta ação remove ${m.name} da equipa imediatamente. Marcações futuras precisarão de ser reatribuídas.`
                : `This removes ${m.name} from the team immediately. Future bookings will need to be reassigned.`}
            </p>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setShowRemove(false)}>{lang === "pt" ? "Cancelar" : "Cancel"}</button>
              <button className="btn btn-primary" style={{ background: "var(--c-coral)" }} onClick={() => { setShowRemove(false); onBack && onBack(); }}>
                {Icons.x} {lang === "pt" ? "Remover" : "Remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============ ADD MEMBER ============
function AddMemberScreen({ t, lang, onBack }) {
  const [form, setForm] = useStateP({
    name: "",
    email: "",
    phone: "",
    role: "stylist",
    canManageTeam: false,
    canManageBookings: true,
    canManageNotifications: false,
    canInvite: false
  });
  const [sent, setSent] = useStateP(false);

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }
  function send() { setSent(true); }

  return (
    <div>
      <button className="btn btn-ghost mb-4" onClick={onBack} style={{ padding: "8px 14px", fontSize: 13 }}>
        {Icons.arrowL}<span>{lang === "pt" ? "Equipa" : "Team"}</span>
      </button>
      <h1 className="page-title">{lang === "pt" ? "Adicionar Membro" : "Add Member"}</h1>
      <p className="page-sub">{lang === "pt" ? "Envie um convite e atribua função e permissões." : "Send an invite and assign role and permissions."}</p>

      {sent && (
        <div className="twofa-banner success" style={{ marginBottom: 18 }}>
          <div className="twofa-banner-ico">{Icons.check}</div>
          <div>
            <div className="twofa-banner-title">{lang === "pt" ? "Convite enviado!" : "Invite sent!"}</div>
            <div className="twofa-banner-text">
              {lang === "pt" ? `Enviamos um link de acesso para ${form.email || "o e-mail indicado"}.` : `We've sent an access link to ${form.email || "the email provided"}.`}
            </div>
          </div>
        </div>
      )}

      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-title">{lang === "pt" ? "Dados do membro" : "Member details"}</div>
          <div className="form-grid">
            <Field label={lang === "pt" ? "Nome completo" : "Full name"} full><input value={form.name} onChange={e => set("name", e.target.value)} placeholder={lang === "pt" ? "Ex: Sofia Andrade" : "e.g. Sofia Andrade"} /></Field>
            <Field label={lang === "pt" ? "E-mail" : "Email"}><input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="sofia@email.com" /></Field>
            <Field label={lang === "pt" ? "Telefone" : "Phone"}><input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+351 ..." /></Field>
            <Field label={lang === "pt" ? "Função" : "Role"} full>
              <select value={form.role} onChange={e => set("role", e.target.value)}>
                <option value="stylist">{lang === "pt" ? "Estilista" : "Stylist"}</option>
                <option value="barber">{lang === "pt" ? "Barbeiro" : "Barber"}</option>
                <option value="manicure">{lang === "pt" ? "Manicure" : "Manicure"}</option>
                <option value="masseuse">{lang === "pt" ? "Massagista" : "Masseuse"}</option>
                <option value="other">{lang === "pt" ? "Outro" : "Other"}</option>
              </select>
            </Field>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-title">{lang === "pt" ? "Permissões iniciais" : "Initial permissions"}</div>
          <div className="settings-row">
            <div className="settings-row-ico">{Icons.users}</div>
            <div className="settings-row-body">
              <div className="settings-row-title">{lang === "pt" ? "Gerir equipa" : "Manage team"}</div>
              <div className="settings-row-sub">{lang === "pt" ? "Adicionar, editar e remover outros membros." : "Add, edit and remove other members."}</div>
            </div>
            <div className="settings-row-control">
              <button className={"um-switch" + (form.canManageTeam ? " on" : "")} onClick={() => set("canManageTeam", !form.canManageTeam)}><span className="um-switch-knob" /></button>
            </div>
          </div>
          <div className="settings-row">
            <div className="settings-row-ico">{Icons.calendar}</div>
            <div className="settings-row-body">
              <div className="settings-row-title">{lang === "pt" ? "Gerir agendamentos" : "Manage bookings"}</div>
              <div className="settings-row-sub">{lang === "pt" ? "Aceitar, recusar ou reagendar marcações dos colegas." : "Accept, decline or reschedule teammates' bookings."}</div>
            </div>
            <div className="settings-row-control">
              <button className={"um-switch" + (form.canManageBookings ? " on" : "")} onClick={() => set("canManageBookings", !form.canManageBookings)}><span className="um-switch-knob" /></button>
            </div>
          </div>
          <div className="settings-row">
            <div className="settings-row-ico">{Icons.bell}</div>
            <div className="settings-row-body">
              <div className="settings-row-title">{lang === "pt" ? "Gerir notificações" : "Manage notifications"}</div>
              <div className="settings-row-sub">{lang === "pt" ? "Enviar notificações e e-mails para clientes do negócio." : "Send notifications and emails to clients of the business."}</div>
            </div>
            <div className="settings-row-control">
              <button className={"um-switch" + (form.canManageNotifications ? " on" : "")} onClick={() => set("canManageNotifications", !form.canManageNotifications)}><span className="um-switch-knob" /></button>
            </div>
          </div>
          <div className="settings-row last">
            <div className="settings-row-ico">{Icons.send}</div>
            <div className="settings-row-body">
              <div className="settings-row-title">{lang === "pt" ? "Convidar novos membros" : "Invite new members"}</div>
              <div className="settings-row-sub">{lang === "pt" ? "Pode enviar convites por e-mail." : "Can send invites by email."}</div>
            </div>
            <div className="settings-row-control">
              <button className={"um-switch" + (form.canInvite ? " on" : "")} onClick={() => set("canInvite", !form.canInvite)}><span className="um-switch-knob" /></button>
            </div>
          </div>
        </div>

        <div className="settings-card" style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button className="btn btn-outline" onClick={onBack}>{lang === "pt" ? "Cancelar" : "Cancel"}</button>
          <button className="btn btn-primary btn-lg" onClick={send} disabled={!form.email}>
            {Icons.send} {lang === "pt" ? "Enviar convite" : "Send invite"}
          </button>
        </div>
      </div>
    </div>
  );
}





// ============ EDIT SUB-PAGES (Role / Services / Schedule) ============
function EditRole({ t, lang, member, onBack }) {
  const [role, setRole] = useStateP(member.role_pt || "");
  const [roleEn, setRoleEn] = useStateP(member.role_en || "");
  const [saved, setSaved] = useStateP(false);
  return (
    <div>
      <button className="btn btn-ghost mb-4" onClick={onBack} style={{ padding: "8px 14px", fontSize: 13 }}>
        {Icons.arrowL}<span>{lang === "pt" ? "Configurações" : "Settings"}</span>
      </button>
      <h2 className="section-title mb-3">{lang === "pt" ? `Editar função · ${member.name}` : `Edit role · ${member.name}`}</h2>
      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-title">{lang === "pt" ? "Função apresentada" : "Public role"}</div>
          <div className="form-grid">
            <Field label={lang === "pt" ? "Título (PT)" : "Title (PT)"}><input value={role} onChange={e => { setRole(e.target.value); setSaved(false); }} /></Field>
            <Field label={lang === "pt" ? "Título (EN)" : "Title (EN)"}><input value={roleEn} onChange={e => { setRoleEn(e.target.value); setSaved(false); }} /></Field>
            <Field label={lang === "pt" ? "Tipo de função" : "Role type"} full>
              <select defaultValue="stylist">
                <option value="owner">{lang === "pt" ? "Proprietário" : "Owner"}</option>
                <option value="stylist">{lang === "pt" ? "Estilista" : "Stylist"}</option>
                <option value="barber">{lang === "pt" ? "Barbeiro" : "Barber"}</option>
                <option value="manicure">{lang === "pt" ? "Manicure" : "Manicure"}</option>
                <option value="masseuse">{lang === "pt" ? "Massagista" : "Masseuse"}</option>
                <option value="receptionist">{lang === "pt" ? "Recepção" : "Reception"}</option>
              </select>
            </Field>
            <Field label={lang === "pt" ? "Anos de experiência" : "Years of experience"}><input type="number" min="0" defaultValue="5" /></Field>
            <Field label={lang === "pt" ? "Bio curta" : "Short bio"} full><textarea rows="3" defaultValue={lang === "pt" ? "Profissional dedicada com paixão pelo trabalho." : "Dedicated pro with a passion for the craft."} /></Field>
          </div>
        </div>
        <div className="settings-card" style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button className="btn btn-outline" onClick={onBack}>{lang === "pt" ? "Cancelar" : "Cancel"}</button>
          <button className="btn btn-primary btn-lg" onClick={() => setSaved(true)}>
            {saved ? Icons.check : Icons.send} {saved ? (lang === "pt" ? "Guardado" : "Saved") : (lang === "pt" ? "Guardar" : "Save")}
          </button>
        </div>
      </div>
    </div>
  );
}

function EditServices({ t, lang, member, onBack }) {
  const all = [
    "Corte feminino", "Corte masculino", "Coloração", "Mechas", "Hidratação profunda",
    "Penteados", "Escova", "Barba", "Tratamento capilar", "Manicure", "Pedicure", "Nail art"
  ];
  const [selected, setSel] = useStateP(new Set(member.services));
  const [newService, setNewService] = useStateP("");
  const [saved, setSaved] = useStateP(false);

  function toggle(s) {
    const next = new Set(selected);
    if (next.has(s)) next.delete(s); else next.add(s);
    setSel(next); setSaved(false);
  }
  function addCustom() {
    if (!newService.trim()) return;
    const next = new Set(selected);
    next.add(newService.trim());
    setSel(next); setNewService(""); setSaved(false);
  }

  return (
    <div>
      <button className="btn btn-ghost mb-4" onClick={onBack} style={{ padding: "8px 14px", fontSize: 13 }}>
        {Icons.arrowL}<span>{lang === "pt" ? "Configurações" : "Settings"}</span>
      </button>
      <h2 className="section-title mb-3">{lang === "pt" ? `Serviços · ${member.name}` : `Services · ${member.name}`}</h2>
      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-title">{lang === "pt" ? "Selecionar serviços oferecidos" : "Pick services offered"}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {all.map(s => (
              <button key={s} className={"team-service-chip" + (selected.has(s) ? " selected" : "")} onClick={() => toggle(s)} style={{ cursor: "pointer", border: selected.has(s) ? "1px solid var(--accent)" : "" }}>
                {selected.has(s) && <span style={{ marginRight: 4 }}>✓</span>}{s}
              </button>
            ))}
          </div>
        </div>
        <div className="settings-card">
          <div className="settings-card-title">{lang === "pt" ? "Adicionar serviço personalizado" : "Add a custom service"}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={newService} onChange={e => setNewService(e.target.value)} placeholder={lang === "pt" ? "Nome do serviço..." : "Service name..."} style={{ flex: 1, padding: "10px 12px", background: "var(--surface-2)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", fontSize: 14, color: "var(--ink)" }} />
            <button className="btn btn-primary" onClick={addCustom}>{Icons.plus} {lang === "pt" ? "Adicionar" : "Add"}</button>
          </div>
        </div>
        <div className="settings-card">
          <div className="settings-card-title">{lang === "pt" ? "Selecionados" : "Selected"} · {selected.size}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {[...selected].map(s => (
              <span key={s} className="team-service-chip" style={{ paddingRight: 4 }}>
                {s}
                <button onClick={() => toggle(s)} style={{ marginLeft: 6, color: "var(--c-coral)", fontWeight: 700 }}>×</button>
              </span>
            ))}
            {selected.size === 0 && <span style={{ color: "var(--muted)", fontSize: 13 }}>{lang === "pt" ? "Nenhum serviço selecionado." : "No services selected."}</span>}
          </div>
        </div>
        <div className="settings-card" style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button className="btn btn-outline" onClick={onBack}>{lang === "pt" ? "Cancelar" : "Cancel"}</button>
          <button className="btn btn-primary btn-lg" onClick={() => setSaved(true)}>
            {saved ? Icons.check : Icons.send} {saved ? (lang === "pt" ? "Guardado" : "Saved") : (lang === "pt" ? "Guardar" : "Save")}
          </button>
        </div>
      </div>
    </div>
  );
}

function EditSchedule({ t, lang, member, onBack }) {
  const initial = (member.schedule && typeof member.schedule === "object" && !member.schedule.days_pt) ? member.schedule : {
    mon: "09:00 — 18:00", tue: "09:00 — 18:00", wed: "09:00 — 18:00", thu: "09:00 — 18:00", fri: "09:00 — 18:00", sat: null, sun: null
  };
  const [sched, setSched] = useStateP(initial);
  const [saved, setSaved] = useStateP(false);
  const days = [
    { key: "mon", pt: "Segunda", en: "Monday" },
    { key: "tue", pt: "Terça",   en: "Tuesday" },
    { key: "wed", pt: "Quarta",  en: "Wednesday" },
    { key: "thu", pt: "Quinta",  en: "Thursday" },
    { key: "fri", pt: "Sexta",   en: "Friday" },
    { key: "sat", pt: "Sábado",  en: "Saturday" },
    { key: "sun", pt: "Domingo", en: "Sunday" }
  ];

  function parseHours(s) {
    if (!s) return ["", ""];
    const parts = s.split("—").map(x => x.trim());
    return [parts[0] || "", parts[1] || ""];
  }
  function setHours(key, idx, value) {
    const [from, to] = parseHours(sched[key]);
    const next = idx === 0 ? `${value} — ${to}` : `${from} — ${value}`;
    setSched({ ...sched, [key]: next.trim() === "—" ? null : next });
    setSaved(false);
  }
  function toggleClosed(key) {
    if (sched[key]) setSched({ ...sched, [key]: null });
    else setSched({ ...sched, [key]: "09:00 — 18:00" });
    setSaved(false);
  }

  return (
    <div>
      <button className="btn btn-ghost mb-4" onClick={onBack} style={{ padding: "8px 14px", fontSize: 13 }}>
        {Icons.arrowL}<span>{lang === "pt" ? "Configurações" : "Settings"}</span>
      </button>
      <h2 className="section-title mb-3">{lang === "pt" ? `Horário semanal · ${member.name}` : `Weekly schedule · ${member.name}`}</h2>
      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-title">{lang === "pt" ? "Horário por dia" : "Hours by day"}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {days.map(d => {
              const closed = !sched[d.key];
              const [from, to] = parseHours(sched[d.key]);
              return (
                <div key={d.key} className="schedule-edit-row">
                  <div className="schedule-edit-day">{lang === "pt" ? d.pt : d.en}</div>
                  <button className={"um-switch" + (!closed ? " on" : "")} onClick={() => toggleClosed(d.key)}><span className="um-switch-knob" /></button>
                  <input type="time" value={from} disabled={closed} onChange={e => setHours(d.key, 0, e.target.value)} />
                  <span style={{ color: "var(--muted)" }}>—</span>
                  <input type="time" value={to} disabled={closed} onChange={e => setHours(d.key, 1, e.target.value)} />
                  <span className="schedule-edit-status">{closed ? (lang === "pt" ? "Fechado" : "Closed") : (lang === "pt" ? "Aberto" : "Open")}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="settings-card" style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button className="btn btn-outline" onClick={onBack}>{lang === "pt" ? "Cancelar" : "Cancel"}</button>
          <button className="btn btn-primary btn-lg" onClick={() => setSaved(true)}>
            {saved ? Icons.check : Icons.send} {saved ? (lang === "pt" ? "Guardado" : "Saved") : (lang === "pt" ? "Guardar" : "Save")}
          </button>
        </div>
      </div>
    </div>
  );
}



// ============ BUSINESS SETTINGS (admin "Meu perfil") ============
function BusinessSettings({ t, lang, onBack, onOpenBlacklist }) {
  const [form, setForm] = useStateP({
    name: "Marina Costa Studio",
    description_pt: "Salão de cabelo e coloração no coração de Lisboa. Especialistas em mechas e tratamentos premium.",
    description_en: "Hair & color salon in the heart of Lisbon. Experts in highlights and premium treatments.",
    phone: "+351 912 345 678",
    email: "studio@marinacosta.app",
    address: "R. das Flores 24, 1200-194 Lisboa",
    instagram: "@marina.studio",
    facebook: "marinacostastudio",
    website: "https://marinacosta.app",
    cancelPolicy: "24h",
    cancelFee: "50",
    bookingMode: "self"   // 'self' = self-service, 'approval' = needs approval
  });
  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }

  return (
    <div>
      <button className="btn btn-ghost mb-4" onClick={onBack} style={{ padding: "8px 14px", fontSize: 13 }}>
        {Icons.arrowL}<span>{lang === "pt" ? "Voltar" : "Back"}</span>
      </button>
      <h1 className="page-title">{lang === "pt" ? "Configurações do negócio" : "Business settings"}</h1>
      <p className="page-sub">{lang === "pt" ? "Tudo sobre o seu negócio num só lugar." : "Everything about your business in one place."}</p>

      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-title">{lang === "pt" ? "Identidade" : "Identity"}</div>
          <div className="form-grid">
            <Field label={lang === "pt" ? "Nome do negócio" : "Business name"} full><input value={form.name} onChange={e => set("name", e.target.value)} /></Field>
            <Field label={lang === "pt" ? "Descrição (PT)" : "Description (PT)"} full><textarea rows="3" value={form.description_pt} onChange={e => set("description_pt", e.target.value)} /></Field>
            <Field label={lang === "pt" ? "Descrição (EN)" : "Description (EN)"} full><textarea rows="3" value={form.description_en} onChange={e => set("description_en", e.target.value)} /></Field>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-title">{lang === "pt" ? "Contato" : "Contact"}</div>
          <div className="form-grid">
            <Field label={lang === "pt" ? "Telefone" : "Phone"}><input value={form.phone} onChange={e => set("phone", e.target.value)} /></Field>
            <Field label="E-mail"><input value={form.email} onChange={e => set("email", e.target.value)} /></Field>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-title">{lang === "pt" ? "Localização" : "Location"}</div>
          <div className="form-grid">
            <Field label={lang === "pt" ? "Morada completa" : "Full address"} full><input value={form.address} onChange={e => set("address", e.target.value)} /></Field>
          </div>
          <div className="business-map">
            <div className="business-map-pin">{Icons.mapPin}</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{form.address}</div>
              <a href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(form.address)} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600 }}>
                {lang === "pt" ? "Abrir no Google Maps" : "Open in Google Maps"} →
              </a>
            </div>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-title">{lang === "pt" ? "Redes sociais" : "Social media"}</div>
          <div className="form-grid">
            <Field label="Instagram"><input value={form.instagram} onChange={e => set("instagram", e.target.value)} /></Field>
            <Field label="Facebook"><input value={form.facebook} onChange={e => set("facebook", e.target.value)} /></Field>
            <Field label={lang === "pt" ? "Website" : "Website"} full><input value={form.website} onChange={e => set("website", e.target.value)} /></Field>
          </div>
        </div>

        <div className="settings-card disabled">
          <div className="spread">
            <div>
              <div className="settings-card-title" style={{ marginBottom: 4 }}>{lang === "pt" ? "Pagamentos" : "Payments"}</div>
              <div className="settings-row-sub">{lang === "pt" ? "Stripe, MB Way, transferência. Receba diretamente no seu IBAN." : "Stripe, MB Way, transfer. Get paid directly to your IBAN."}</div>
            </div>
            <span className="settings-soon">{lang === "pt" ? "Em breve" : "Soon"}</span>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-title">{lang === "pt" ? "Modo de agendamento" : "Booking mode"}</div>
          <div className="booking-mode-grid">
            <label className={"booking-mode-card" + (form.bookingMode === "self" ? " selected" : "")}>
              <input type="radio" name="bm" checked={form.bookingMode === "self"} onChange={() => set("bookingMode", "self")} />
              <div className="bm-ico" style={{ background: "linear-gradient(135deg, var(--c-mint), var(--c-sky))" }}>{Icons.sparkle}</div>
              <div>
                <div className="bm-name">{lang === "pt" ? "Self-service" : "Self-service"}</div>
                <div className="bm-sub">{lang === "pt" ? "Cliente reserva diretamente nos slots disponíveis. Confirmação automática." : "Client books directly on open slots. Auto-confirmed."}</div>
                <div className="bm-tag">{lang === "pt" ? "Mais rápido" : "Fastest"}</div>
              </div>
            </label>
            <label className={"booking-mode-card" + (form.bookingMode === "approval" ? " selected" : "")}>
              <input type="radio" name="bm" checked={form.bookingMode === "approval"} onChange={() => set("bookingMode", "approval")} />
              <div className="bm-ico" style={{ background: "linear-gradient(135deg, var(--c-amber), var(--c-coral))" }}>{Icons.check}</div>
              <div>
                <div className="bm-name">{lang === "pt" ? "Aprovação manual" : "Manual approval"}</div>
                <div className="bm-sub">{lang === "pt" ? "Cada pedido fica pendente até admin ou equipa aprovar." : "Each request stays pending until admin or team approves."}</div>
                <div className="bm-tag">{lang === "pt" ? "Mais controle" : "More control"}</div>
              </div>
            </label>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-title">{lang === "pt" ? "Agendamentos" : "Bookings"}</div>
          <div className="form-grid">
            <Field label={lang === "pt" ? "Política de cancelamento" : "Cancellation policy"}>
              <select value={form.cancelPolicy} onChange={e => set("cancelPolicy", e.target.value)}>
                <option value="flex">{lang === "pt" ? "Flexível (até 1h antes)" : "Flexible (up to 1h before)"}</option>
                <option value="12h">{lang === "pt" ? "Moderada (12h antes)" : "Moderate (12h before)"}</option>
                <option value="24h">{lang === "pt" ? "Restrita (24h antes)" : "Strict (24h before)"}</option>
                <option value="48h">{lang === "pt" ? "Muito restrita (48h antes)" : "Very strict (48h before)"}</option>
              </select>
            </Field>
            <Field label={lang === "pt" ? "Taxa por no-show (%)" : "No-show fee (%)"}><input type="number" min="0" max="100" value={form.cancelFee} onChange={e => set("cancelFee", e.target.value)} /></Field>
          </div>
        </div>

        <div className="settings-card" style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button className="btn btn-outline" onClick={onBack}>{lang === "pt" ? "Cancelar" : "Cancel"}</button>
          <button className="btn btn-primary btn-lg" onClick={onBack}>{Icons.check} {lang === "pt" ? "Guardar alterações" : "Save changes"}</button>
        </div>
      </div>
    </div>
  );
}

// ============ BLACKLIST PAGE (admin) ============
function BlacklistScreen({ t, lang, onBack }) {
  const [list, setList] = useStateP([
    { name: "Diana Ramalho", reason_pt: "Múltiplos no-shows", reason_en: "Multiple no-shows", since: "2026-05-08" },
    { name: "Hugo Tavares",  reason_pt: "Comportamento abusivo no chat", reason_en: "Abusive behavior in chat", since: "2026-04-15" },
    { name: "Rui Costa",     reason_pt: "Falta de pagamento", reason_en: "Failed to pay", since: "2026-03-22" }
  ]);
  function remove(name) { setList(l => l.filter(x => x.name !== name)); }

  return (
    <div>
      <button className="btn btn-ghost mb-4" onClick={onBack} style={{ padding: "8px 14px", fontSize: 13 }}>
        {Icons.arrowL}<span>{lang === "pt" ? "Configurações do negócio" : "Business settings"}</span>
      </button>
      <h1 className="page-title">{lang === "pt" ? "Lista de bloqueados" : "Blacklist"}</h1>
      <p className="page-sub">{lang === "pt" ? "Clientes que não podem reservar, enviar mensagens ou receber notificações." : "Clients who cannot book, send messages or receive notifications."}</p>

      <div className="team-table">
        <div className="team-row team-row-head">
          <div>{lang === "pt" ? "Cliente" : "Client"}</div>
          <div>{lang === "pt" ? "Motivo" : "Reason"}</div>
          <div>{lang === "pt" ? "Bloqueado desde" : "Blocked since"}</div>
          <div style={{ textAlign: "right" }}>{lang === "pt" ? "Ações" : "Actions"}</div>
        </div>
        {list.length === 0 && (
          <div className="bk-empty" style={{ borderRadius: 0, border: "none" }}>
            <div className="bk-empty-glyph">{Icons.users}</div>
            <div className="bk-empty-title">{lang === "pt" ? "Lista vazia" : "Empty list"}</div>
            <div className="bk-empty-sub">{lang === "pt" ? "Nenhum cliente bloqueado." : "No clients blocked."}</div>
          </div>
        )}
        {list.map(p => (
          <div key={p.name} className="team-row blacklist-row" style={{ gridTemplateColumns: "1.4fr 1.6fr 130px 120px", cursor: "default" }}>
            <div className="tr-member">
              <div className="avatar sm" style={{ background: "linear-gradient(135deg, var(--c-coral), var(--c-amber))", fontSize: 13 }}>{p.name.split(" ").map(w => w[0]).slice(0,2).join("")}</div>
              <div className="tr-name">{p.name}</div>
            </div>
            <div className="tr-role">{lang === "pt" ? p.reason_pt : p.reason_en}</div>
            <div className="tr-schedule">{p.since}</div>
            <div className="tr-actions">
              <button className="btn btn-outline" style={{ padding: "6px 10px", fontSize: 12 }} onClick={() => remove(p.name)}>
                {Icons.check} {lang === "pt" ? "Desbloquear" : "Unblock"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ ADMIN ANNOUNCEMENTS (broadcast panel) ============
function AdminAnnouncements({ t, lang }) {
  const data = window.GW_DATA;
  const [audience, setAudience] = useStateP("all");
  const [channel, setChannel] = useStateP("push");
  const [title, setTitle] = useStateP("");
  const [message, setMessage] = useStateP("");
  const [picked, setPicked] = useStateP(new Set());
  const [clientQ, setClientQ] = useStateP("");
  const [sent, setSent] = useStateP([
    { id: "a1", title_pt: "Promoção de inverno", title_en: "Winter promo", text_pt: "15% em todos os serviços de coloração esta semana.", text_en: "15% off all color services this week.", audience: "all", channel: "push", date: "2026-05-12", reach: 318 },
    { id: "a2", title_pt: "Pedido de avaliação", title_en: "Review request", text_pt: "Como foi a sua última sessão? A sua opinião conta!", text_en: "How was your last session? We'd love your feedback!", audience: "recent", channel: "email", date: "2026-05-05", reach: 142 }
  ]);

  // Build client list from bookings (like ProClients)
  const clientNames = (() => {
    const seen = new Set();
    [...data.proBookings.past, ...data.proBookings.upcoming, ...(data.proBookings.cancelled || [])].forEach(b => seen.add(b.client));
    return [...seen].sort();
  })();
  const filteredClients = clientQ ? clientNames.filter(n => n.toLowerCase().includes(clientQ.toLowerCase())) : clientNames;

  function togglePick(name) {
    setPicked(prev => { const n = new Set(prev); if (n.has(name)) n.delete(name); else n.add(name); return n; });
  }
  function pickAll() { setPicked(new Set(filteredClients)); }
  function clearPicked() { setPicked(new Set()); }

  const audienceReach = audience === "all" ? 318
    : audience === "recent" ? 142
    : audience === "loyal" ? 84
    : audience === "inactive" ? 47
    : picked.size;

  function send() {
    if (!title || !message) return;
    setSent(s => [{ id: "n" + Date.now(), title_pt: title, title_en: title, text_pt: message, text_en: message, audience, channel, date: "2026-05-19", reach: audienceReach }, ...s]);
    setTitle(""); setMessage(""); setPicked(new Set());
  }

  const templates = [
    { id: "promo",  label_pt: "Promoção / Desconto",  label_en: "Promo / Discount", title_pt: "Esta semana, 15% em todos os serviços", title_en: "This week, 15% off all services", text_pt: "Aproveite a promoção até domingo. Reserve já o seu lugar!", text_en: "Catch the deal until Sunday. Book your slot!" },
    { id: "review", label_pt: "Pedido de avaliação", label_en: "Review request",   title_pt: "Como foi a sua última sessão?",        title_en: "How was your last session?",         text_pt: "Adoraríamos saber a sua opinião. Avalie em 30 segundos.", text_en: "We'd love your feedback. Rate it in 30 seconds." },
    { id: "new",    label_pt: "Novo serviço",        label_en: "New service",      title_pt: "Novidade no studio: massagem capilar", title_en: "New at the studio: scalp massage",   text_pt: "Já pode reservar! 30 minutos de pura tranquilidade.",     text_en: "Now bookable! 30 minutes of pure calm." }
  ];

  return (
    <div>
      <h1 className="page-title">{lang === "pt" ? "Comunicar com clientes" : "Reach clients"}</h1>
      <p className="page-sub">{lang === "pt" ? "Envie promoções, pedidos de avaliação ou novidades. Aparece no sino do cliente e/ou no e-mail dele." : "Send promos, review requests or news. Shows up in your client's bell and/or inbox."}</p>

      <div className="ann-grid">
        <div className="settings-card">
          <div className="settings-card-title">{lang === "pt" ? "Nova mensagem" : "New message"}</div>

          <div className="ann-templates">
            <div className="settings-row-sub" style={{ marginBottom: 6 }}>{lang === "pt" ? "Modelos rápidos" : "Quick templates"}</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {templates.map(tp => (
                <button key={tp.id} className="team-service-chip" style={{ cursor: "pointer" }} onClick={() => { setTitle(lang === "pt" ? tp.title_pt : tp.title_en); setMessage(lang === "pt" ? tp.text_pt : tp.text_en); }}>
                  {lang === "pt" ? tp.label_pt : tp.label_en}
                </button>
              ))}
            </div>
          </div>

          <div className="form-grid" style={{ marginTop: 12 }}>
            <Field label={lang === "pt" ? "Para quem" : "Audience"} full>
              <select value={audience} onChange={e => setAudience(e.target.value)}>
                <option value="all">{lang === "pt" ? "Todos os clientes (318)" : "All clients (318)"}</option>
                <option value="recent">{lang === "pt" ? "Clientes recentes (142)" : "Recent clients (142)"}</option>
                <option value="loyal">{lang === "pt" ? "Clientes frequentes (84)" : "Loyal clients (84)"}</option>
                <option value="inactive">{lang === "pt" ? "Sem visita há 3+ meses (47)" : "Inactive 3+ months (47)"}</option>
                <option value="picked">{lang === "pt" ? "Selecionar clientes específicos…" : "Pick specific clients…"}</option>
              </select>
            </Field>

            {audience === "picked" && (
              <div className="form-field full">
                <div className="spread" style={{ marginBottom: 8 }}>
                  <span className="form-label" style={{ margin: 0 }}>{lang === "pt" ? "Selecionar destinatários" : "Pick recipients"}</span>
                  <span style={{ fontSize: 12, color: picked.size ? "var(--accent)" : "var(--muted)", fontWeight: 700 }}>
                    {picked.size} {lang === "pt" ? "selecionado(s)" : "selected"}
                  </span>
                </div>
                <div className="client-picker">
                  <div className="topbar-search" style={{ height: 36, padding: "6px 12px" }}>
                    {Icons.search}
                    <input placeholder={lang === "pt" ? "Buscar cliente..." : "Search client..."} value={clientQ} onChange={e => setClientQ(e.target.value)} />
                  </div>
                  <div style={{ display: "flex", gap: 6, padding: "8px 0", borderBottom: "1px solid var(--line)" }}>
                    <button className="btn btn-ghost" style={{ padding: "6px 10px", fontSize: 12 }} onClick={pickAll}>{lang === "pt" ? "Selecionar visíveis" : "Select visible"}</button>
                    <button className="btn btn-ghost" style={{ padding: "6px 10px", fontSize: 12 }} onClick={clearPicked}>{lang === "pt" ? "Limpar" : "Clear"}</button>
                  </div>
                  <div className="client-picker-list">
                    {filteredClients.map(n => (
                      <label key={n} className={"client-pick-row" + (picked.has(n) ? " picked" : "")}>
                        <input type="checkbox" checked={picked.has(n)} onChange={() => togglePick(n)} />
                        <div className="avatar sm" style={{ background: "linear-gradient(135deg, var(--c-pink), var(--accent))", fontSize: 11 }}>{n.split(" ").map(w => w[0]).slice(0,2).join("")}</div>
                        <span className="client-pick-name">{n}</span>
                      </label>
                    ))}
                    {filteredClients.length === 0 && <div style={{ padding: 14, textAlign: "center", color: "var(--muted)", fontSize: 13 }}>{lang === "pt" ? "Nenhum cliente." : "No clients."}</div>}
                  </div>
                  {picked.size > 0 && (
                    <div className="client-picker-chips">
                      {[...picked].slice(0, 8).map(n => (
                        <span key={n} className="team-service-chip" style={{ paddingRight: 4 }}>
                          {n}
                          <button onClick={() => togglePick(n)} style={{ marginLeft: 6, color: "var(--c-coral)", fontWeight: 700 }}>×</button>
                        </span>
                      ))}
                      {picked.size > 8 && <span className="team-service-chip">+{picked.size - 8}</span>}
                    </div>
                  )}
                </div>
              </div>
            )}

            <Field label={lang === "pt" ? "Canal" : "Channel"} full>
              <select value={channel} onChange={e => setChannel(e.target.value)}>
                <option value="push">{lang === "pt" ? "Notificação push" : "Push notification"}</option>
                <option value="email">E-mail</option>
                <option value="both">{lang === "pt" ? "Push + E-mail" : "Push + Email"}</option>
              </select>
            </Field>
            <Field label={lang === "pt" ? "Título" : "Title"} full><input value={title} onChange={e => setTitle(e.target.value)} placeholder={lang === "pt" ? "Ex: 15% em mechas esta semana" : "e.g. 15% off highlights this week"} /></Field>
            {(channel === "email" || channel === "both") ? (
              <div className="form-field full">
                <span className="form-label">{lang === "pt" ? "Mensagem (e-mail)" : "Message (email)"}</span>
                <RichTextEditor value={message} onChange={setMessage} lang={lang} />
              </div>
            ) : (
              <Field label={lang === "pt" ? "Mensagem" : "Message"} full><textarea rows="4" value={message} onChange={e => setMessage(e.target.value)} placeholder={lang === "pt" ? "Escreva a sua mensagem..." : "Write your message..."} /></Field>
            )}
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 14, justifyContent: "flex-end" }}>
            <button className="btn btn-outline" disabled={!title || !message}>{lang === "pt" ? "Pré-visualizar" : "Preview"}</button>
            <button className="btn btn-primary btn-lg" onClick={send} disabled={!title || !message || (audience === "picked" && picked.size === 0)}>
              {Icons.send} {lang === "pt" ? `Enviar para ${audienceReach}` : `Send to ${audienceReach}`}
            </button>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-title">{lang === "pt" ? "Histórico" : "History"}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {sent.map(s => (
              <div key={s.id} className="ann-row">
                <div className="ann-row-ico">{s.channel === "email" ? Icons.email : Icons.bell}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{lang === "pt" ? s.title_pt : s.title_en}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{lang === "pt" ? s.text_pt : s.text_en}</div>
                  <div className="ann-row-meta">
                    <span>{s.date}</span>
                    <span>·</span>
                    <span>{s.reach} {lang === "pt" ? "destinatários" : "recipients"}</span>
                    <span>·</span>
                    <span className="ann-channel">{s.channel === "email" ? "E-mail" : (s.channel === "both" ? "Push + Email" : "Push")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



// ============ RICH TEXT EDITOR (for email composer) ============
function RichTextEditor({ value, onChange, lang }) {
  const editorRef = React.useRef(null);
  const [active, setActive] = React.useState({ bold: false, italic: false, underline: false });

  React.useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== (value || "")) {
      editorRef.current.innerHTML = value || "";
    }
  }, []);

  function exec(cmd, arg) {
    document.execCommand(cmd, false, arg);
    editorRef.current && editorRef.current.focus();
    updateActive();
    if (onChange) onChange(editorRef.current.innerHTML);
  }
  function updateActive() {
    try {
      setActive({
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline")
      });
    } catch (e) {}
  }
  function handleInput() {
    if (onChange) onChange(editorRef.current.innerHTML);
  }
  function insertLink() {
    const url = prompt(lang === "pt" ? "URL do link:" : "Link URL:", "https://");
    if (url) exec("createLink", url);
  }
  function insertVariable(v) {
    document.execCommand("insertHTML", false, `<span class="rte-var">{{${v}}}</span>&nbsp;`);
    if (onChange) onChange(editorRef.current.innerHTML);
  }

  const Btn = ({ cmd, arg, icon, label, isActive, onClick }) => (
    <button type="button" className={"rte-btn" + (isActive ? " on" : "")} onMouseDown={e => e.preventDefault()} onClick={onClick || (() => exec(cmd, arg))} title={label}>
      {icon}
    </button>
  );

  return (
    <div className="rte">
      <div className="rte-toolbar">
        <Btn cmd="bold"      icon={<b>B</b>}  isActive={active.bold}      label={lang === "pt" ? "Negrito" : "Bold"} />
        <Btn cmd="italic"    icon={<i>I</i>}  isActive={active.italic}    label={lang === "pt" ? "Itálico" : "Italic"} />
        <Btn cmd="underline" icon={<u>U</u>}  isActive={active.underline} label={lang === "pt" ? "Sublinhado" : "Underline"} />
        <span className="rte-sep" />
        <Btn cmd="formatBlock" arg="<h2>" icon={<span style={{ fontWeight: 700, fontSize: 13 }}>H1</span>} label={lang === "pt" ? "Título" : "Heading"} />
        <Btn cmd="formatBlock" arg="<h3>" icon={<span style={{ fontWeight: 700, fontSize: 12 }}>H2</span>} label={lang === "pt" ? "Subtítulo" : "Subheading"} />
        <Btn cmd="formatBlock" arg="<p>"  icon={<span style={{ fontSize: 12 }}>P</span>} label={lang === "pt" ? "Parágrafo" : "Paragraph"} />
        <span className="rte-sep" />
        <Btn cmd="insertUnorderedList" icon={<span>•</span>} label={lang === "pt" ? "Lista" : "List"} />
        <Btn cmd="insertOrderedList"   icon={<span style={{ fontSize: 11 }}>1.</span>} label={lang === "pt" ? "Lista numerada" : "Ordered list"} />
        <span className="rte-sep" />
        <Btn onClick={insertLink} icon={<span>🔗</span>} label={lang === "pt" ? "Inserir link" : "Insert link"} />
        <Btn cmd="justifyLeft"   icon={<span>≡</span>} label={lang === "pt" ? "Esquerda" : "Align left"} />
        <Btn cmd="justifyCenter" icon={<span style={{ fontSize: 11 }}>≡</span>} label={lang === "pt" ? "Centro" : "Center"} />
        <span className="rte-sep" />
        <div className="rte-var-menu">
          <button type="button" className="rte-btn" onMouseDown={e => e.preventDefault()} onClick={() => insertVariable("nome")}>{lang === "pt" ? "{nome}" : "{name}"}</button>
          <button type="button" className="rte-btn" onMouseDown={e => e.preventDefault()} onClick={() => insertVariable("servico")}>{lang === "pt" ? "{serviço}" : "{service}"}</button>
          <button type="button" className="rte-btn" onMouseDown={e => e.preventDefault()} onClick={() => insertVariable("data")}>{lang === "pt" ? "{data}" : "{date}"}</button>
        </div>
      </div>
      <div
        ref={editorRef}
        className="rte-editor"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onMouseUp={updateActive}
        onKeyUp={updateActive}
        onBlur={handleInput}
        data-placeholder={lang === "pt" ? "Olá {nome}, esta semana temos uma promoção especial para si..." : "Hi {name}, this week we have a special offer for you..."}
      />
      <div className="rte-hint">
        {lang === "pt" ? "Dica: use as variáveis para personalizar para cada cliente." : "Tip: use variables to personalize for each client."}
      </div>
    </div>
  );
}

// ============ NEW BOOKING (admin/team) ============
function NewBookingScreen({ t, lang, onBack }) {
  const data = window.GW_DATA;
  const [step, setStep] = useStateP("client"); // client | service | date | confirm
  const [client, setClient] = useStateP("");
  const [clientQ, setClientQ] = useStateP("");
  const [service, setService] = useStateP(null);
  const [member, setMember] = useStateP("any");
  const [date, setDate] = useStateP("2026-05-22");
  const [time, setTime] = useStateP("");
  const [note, setNote] = useStateP("");
  const [saved, setSaved] = useStateP(false);

  const clientNames = (() => {
    const s = new Set();
    [...data.proBookings.past, ...data.proBookings.upcoming, ...(data.proBookings.cancelled || [])].forEach(b => s.add(b.client));
    return [...s].sort();
  })();
  const filtered = clientQ ? clientNames.filter(n => n.toLowerCase().includes(clientQ.toLowerCase())) : clientNames;

  const allServices = data.servicesByPro["p1"] || [];
  const team = data.proTeam || [];

  const slots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];
  const months = lang === "pt" ? ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"] : ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
  const [y, m, d] = date.split("-").map(Number);
  const dateLabel = `${d} ${months[m - 1]} 2026`;

  if (saved) {
    return (
      <div>
        <button className="btn btn-ghost mb-4" onClick={onBack} style={{ padding: "8px 14px", fontSize: 13 }}>
          {Icons.arrowL}<span>{t.bookings}</span>
        </button>
        <div className="confirm-hero">
          <div className="confirm-check">✓</div>
          <div className="confirm-title">{lang === "pt" ? "Agendamento criado!" : "Booking created!"}</div>
          <div className="confirm-sub">{lang === "pt" ? `Cliente ${client} reservado em ${dateLabel} às ${time}.` : `Booked ${client} on ${dateLabel} at ${time}.`}</div>
          <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
            <button className="btn btn-primary btn-lg" onClick={() => { setSaved(false); setStep("client"); setClient(""); setService(null); setTime(""); setNote(""); }}>{Icons.plus} {lang === "pt" ? "Novo agendamento" : "New booking"}</button>
            <button className="btn btn-outline btn-lg" onClick={onBack}>{lang === "pt" ? "Voltar à agenda" : "Back to agenda"}</button>
          </div>
        </div>
      </div>
    );
  }

  const stepIndex = { client: 1, service: 2, date: 3, confirm: 4 }[step];

  return (
    <div>
      <button className="btn btn-ghost mb-4" onClick={onBack} style={{ padding: "8px 14px", fontSize: 13 }}>
        {Icons.arrowL}<span>{t.bookings}</span>
      </button>
      <h1 className="page-title">{lang === "pt" ? "Novo agendamento" : "New booking"}</h1>
      <p className="page-sub">{lang === "pt" ? "Crie uma marcação manualmente — para um cliente existente ou novo." : "Create a booking manually — for an existing or new client."}</p>

      <div className="step-rail">
        {[
          { id: "client",  l_pt: "Cliente",  l_en: "Client" },
          { id: "service", l_pt: "Serviço",  l_en: "Service" },
          { id: "date",    l_pt: "Data & hora", l_en: "Date & time" },
          { id: "confirm", l_pt: "Confirmar", l_en: "Confirm" }
        ].map((s, i) => (
          <React.Fragment key={s.id}>
            {i > 0 && <div className="step-sep" />}
            <div className={"step " + (step === s.id ? "active" : stepIndex > i + 1 ? "done" : "")}>
              <div className="step-num">{stepIndex > i + 1 ? "✓" : i + 1}</div>
              <span className="step-label">{lang === "pt" ? s.l_pt : s.l_en}</span>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="settings-grid">
        {step === "client" && (
          <div className="settings-card">
            <div className="settings-card-title">{lang === "pt" ? "Escolha o cliente" : "Choose the client"}</div>
            <div className="topbar-search" style={{ height: 40, marginBottom: 10 }}>
              {Icons.search}
              <input placeholder={lang === "pt" ? "Buscar cliente..." : "Search client..."} value={clientQ} onChange={e => setClientQ(e.target.value)} />
            </div>
            <div className="client-picker-list" style={{ maxHeight: 280 }}>
              {filtered.map(n => (
                <button key={n} className={"client-pick-row" + (client === n ? " picked" : "")} onClick={() => setClient(n)} style={{ background: "transparent", border: "none", width: "100%", textAlign: "left" }}>
                  <div className="avatar sm" style={{ background: "linear-gradient(135deg, var(--c-pink), var(--accent))", fontSize: 11 }}>{n.split(" ").map(w => w[0]).slice(0,2).join("")}</div>
                  <span className="client-pick-name">{n}</span>
                  {client === n && <span style={{ color: "var(--accent)" }}>{Icons.check}</span>}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="btn btn-outline btn-block" onClick={() => { setClient(clientQ); setStep("service"); }} disabled={!clientQ}>{Icons.plus} {lang === "pt" ? `Adicionar "${clientQ || "novo cliente"}"` : `Add "${clientQ || "new client"}"`}</button>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
              <button className="btn btn-primary btn-lg" disabled={!client} onClick={() => setStep("service")}>{lang === "pt" ? "Continuar" : "Continue"} {Icons.arrowR}</button>
            </div>
          </div>
        )}

        {step === "service" && (
          <>
            <div className="settings-card">
              <div className="settings-card-title">{lang === "pt" ? "Serviço" : "Service"}</div>
              <div className="service-list">
                {allServices.map(s => (
                  <div key={s.id} className={"service-row" + (service && service.id === s.id ? " selected" : "")} onClick={() => setService(s)}>
                    <div className="swatch" style={{ background: s.bg, color: "white" }}>{s.emoji}</div>
                    <div className="body">
                      <div className="name">{lang === "pt" ? s.name_pt : s.name_en}</div>
                      <div className="meta">{s.duration} min</div>
                    </div>
                    <div className="price">{s.price}€</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="settings-card">
              <div className="settings-card-title">{lang === "pt" ? "Atribuir a" : "Assign to"}</div>
              <div className="member-pick-grid">
                <button className={"member-pick-card" + (member === "any" ? " selected" : "")} onClick={() => setMember("any")}>
                  <div className="member-pick-avatar" style={{ background: "linear-gradient(135deg, var(--accent), var(--c-pink))" }}>✨</div>
                  <div style={{ flex: 1, textAlign: "left" }}>
                    <div className="member-pick-name">{lang === "pt" ? "Qualquer membro disponível" : "Any available member"}</div>
                    <div className="member-pick-role">{lang === "pt" ? "Atribuição automática" : "Auto-assign"}</div>
                  </div>
                </button>
                {team.map(m => (
                  <button key={m.id} className={"member-pick-card" + (member === m.id ? " selected" : "")} onClick={() => setMember(m.id)}>
                    <div className="member-pick-avatar" style={{ background: m.color }}>{m.emoji}</div>
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <div className="member-pick-name">{m.name}{m.isOwner && <span className="tr-owner-tag" style={{ marginLeft: 8 }}>{lang === "pt" ? "Proprietário" : "Owner"}</span>}</div>
                      <div className="member-pick-role">{lang === "pt" ? m.role_pt : m.role_en}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="settings-card" style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
              <button className="btn btn-outline" onClick={() => setStep("client")}>{Icons.arrowL} {lang === "pt" ? "Voltar" : "Back"}</button>
              <button className="btn btn-primary btn-lg" disabled={!service} onClick={() => setStep("date")}>{lang === "pt" ? "Continuar" : "Continue"} {Icons.arrowR}</button>
            </div>
          </>
        )}

        {step === "date" && (
          <>
            <div className="settings-card">
              <div className="settings-card-title">{lang === "pt" ? "Data" : "Date"}</div>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} min="2026-05-19" style={{ background: "var(--surface-2)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "10px 14px", fontSize: 14, color: "var(--ink)", width: "100%", maxWidth: 240 }} />
              <div style={{ marginTop: 16, fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)" }}>{lang === "pt" ? "Horários disponíveis" : "Available times"}</div>
              <div className="slots" style={{ marginTop: 10 }}>
                {slots.map(s => (
                  <button key={s} className={"slot" + (time === s ? " selected" : "")} onClick={() => setTime(s)}>{s}</button>
                ))}
              </div>
            </div>

            <div className="settings-card">
              <div className="settings-card-title">{lang === "pt" ? "Nota interna" : "Internal note"}</div>
              <textarea rows="3" value={note} onChange={e => setNote(e.target.value)} placeholder={lang === "pt" ? "Anotações sobre este agendamento..." : "Notes about this booking..."} style={{ background: "var(--surface-2)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "10px 12px", fontSize: 14, color: "var(--ink)", width: "100%", fontFamily: "inherit" }} />
            </div>

            <div className="settings-card" style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
              <button className="btn btn-outline" onClick={() => setStep("service")}>{Icons.arrowL} {lang === "pt" ? "Voltar" : "Back"}</button>
              <button className="btn btn-primary btn-lg" disabled={!time} onClick={() => setStep("confirm")}>{lang === "pt" ? "Continuar" : "Continue"} {Icons.arrowR}</button>
            </div>
          </>
        )}

        {step === "confirm" && (
          <div className="settings-card">
            <div className="settings-card-title">{lang === "pt" ? "Resumo" : "Summary"}</div>
            <div className="appt-detail">
              <div className="appt-detail-row">
                <div className="ico">{Icons.user}</div>
                <div style={{ flex: 1 }}><div className="label">{lang === "pt" ? "Cliente" : "Client"}</div><div className="val">{client}</div></div>
              </div>
              <div className="appt-detail-row">
                <div className="ico">{Icons.sparkle}</div>
                <div style={{ flex: 1 }}><div className="label">{lang === "pt" ? "Serviço" : "Service"}</div><div className="val">{lang === "pt" ? service?.name_pt : service?.name_en}</div></div>
              </div>
              <div className="appt-detail-row">
                <div className="ico">{Icons.users}</div>
                <div style={{ flex: 1 }}><div className="label">{lang === "pt" ? "Atribuído a" : "Assigned to"}</div><div className="val">{member === "any" ? (lang === "pt" ? "Qualquer membro" : "Any member") : (team.find(m => m.id === member)?.name || "—")}</div></div>
              </div>
              <div className="appt-detail-row">
                <div className="ico">{Icons.calendar}</div>
                <div style={{ flex: 1 }}><div className="label">{lang === "pt" ? "Data e hora" : "Date and time"}</div><div className="val">{dateLabel} · {time}</div></div>
              </div>
              <div className="appt-detail-row">
                <div className="ico">{Icons.dollar}</div>
                <div style={{ flex: 1 }}><div className="label">{lang === "pt" ? "Valor" : "Price"}</div><div className="val">{service?.price}€</div></div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "space-between", marginTop: 18 }}>
              <button className="btn btn-outline" onClick={() => setStep("date")}>{Icons.arrowL} {lang === "pt" ? "Voltar" : "Back"}</button>
              <button className="btn btn-primary btn-lg" onClick={() => setSaved(true)}>{Icons.check} {lang === "pt" ? "Confirmar agendamento" : "Confirm booking"}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ NEW CLIENT (admin/team) ============
function NewClientScreen({ t, lang, onBack }) {
  const [form, setForm] = useStateP({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nif: "",
    address: "",
    bday: "",
    tag: "regular",
    notes: "",
    notify: true
  });
  const [saved, setSaved] = useStateP(false);
  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }

  if (saved) {
    return (
      <div>
        <button className="btn btn-ghost mb-4" onClick={onBack} style={{ padding: "8px 14px", fontSize: 13 }}>
          {Icons.arrowL}<span>{lang === "pt" ? "Clientes" : "Clients"}</span>
        </button>
        <div className="confirm-hero">
          <div className="confirm-check">✓</div>
          <div className="confirm-title">{lang === "pt" ? "Cliente adicionado!" : "Client added!"}</div>
          <div className="confirm-sub">{lang === "pt" ? `${form.firstName} ${form.lastName} já faz parte da sua base.` : `${form.firstName} ${form.lastName} is now in your base.`}</div>
          <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
            <button className="btn btn-primary btn-lg" onClick={() => { setSaved(false); setForm({ firstName: "", lastName: "", email: "", phone: "", nif: "", address: "", bday: "", tag: "regular", notes: "", notify: true }); }}>{Icons.plus} {lang === "pt" ? "Novo cliente" : "New client"}</button>
            <button className="btn btn-outline btn-lg" onClick={onBack}>{lang === "pt" ? "Voltar à lista" : "Back to list"}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button className="btn btn-ghost mb-4" onClick={onBack} style={{ padding: "8px 14px", fontSize: 13 }}>
        {Icons.arrowL}<span>{lang === "pt" ? "Clientes" : "Clients"}</span>
      </button>
      <h1 className="page-title">{lang === "pt" ? "Novo cliente" : "New client"}</h1>
      <p className="page-sub">{lang === "pt" ? "Adicione manualmente um cliente à sua base." : "Manually add a client to your base."}</p>

      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-title">{lang === "pt" ? "Dados pessoais" : "Personal info"}</div>
          <div className="form-grid">
            <Field label={lang === "pt" ? "Nome" : "First name"}><input value={form.firstName} onChange={e => set("firstName", e.target.value)} placeholder={lang === "pt" ? "Ex: Sofia" : "e.g. Sofia"} /></Field>
            <Field label={lang === "pt" ? "Sobrenome" : "Last name"}><input value={form.lastName} onChange={e => set("lastName", e.target.value)} placeholder={lang === "pt" ? "Ex: Andrade" : "e.g. Andrade"} /></Field>
            <Field label={lang === "pt" ? "E-mail" : "Email"}><input type="email" value={form.email} onChange={e => set("email", e.target.value)} /></Field>
            <Field label={lang === "pt" ? "Telefone" : "Phone"}><input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+351 …" /></Field>
            <Field label={lang === "pt" ? "Data de nascimento" : "Date of birth"}><input type="date" value={form.bday} onChange={e => set("bday", e.target.value)} /></Field>
            <Field label="NIF"><input value={form.nif} onChange={e => set("nif", e.target.value)} /></Field>
            <Field label={lang === "pt" ? "Endereço" : "Address"} full><input value={form.address} onChange={e => set("address", e.target.value)} /></Field>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-title">{lang === "pt" ? "Categoria & notas" : "Tag & notes"}</div>
          <div className="form-grid">
            <Field label={lang === "pt" ? "Categoria" : "Tag"} full>
              <select value={form.tag} onChange={e => set("tag", e.target.value)}>
                <option value="regular">{lang === "pt" ? "Regular" : "Regular"}</option>
                <option value="new">{lang === "pt" ? "Novo" : "New"}</option>
                <option value="loyal">{lang === "pt" ? "Fiel" : "Loyal"}</option>
                <option value="vip">VIP</option>
              </select>
            </Field>
            <Field label={lang === "pt" ? "Notas internas" : "Internal notes"} full>
              <textarea rows="3" value={form.notes} onChange={e => set("notes", e.target.value)} placeholder={lang === "pt" ? "Preferências, alergias, observações..." : "Preferences, allergies, notes..."} />
            </Field>
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
            <input type="checkbox" checked={form.notify} onChange={e => set("notify", e.target.checked)} style={{ accentColor: "var(--accent)", width: 18, height: 18 }} />
            <span style={{ fontSize: 13 }}>{lang === "pt" ? "Enviar e-mail de boas-vindas com convite para a app" : "Send welcome email with app invite"}</span>
          </label>
        </div>

        <div className="settings-card" style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
          <button className="btn btn-outline" onClick={onBack}>{lang === "pt" ? "Cancelar" : "Cancel"}</button>
          <button className="btn btn-primary btn-lg" disabled={!form.firstName || !form.email} onClick={() => setSaved(true)}>
            {Icons.check} {lang === "pt" ? "Adicionar cliente" : "Add client"}
          </button>
        </div>
      </div>
    </div>
  );
}



// ============ CLIENTS PAGE (admin/team) ============
function ProClients({ t, lang, onChat, onNav }) {
  const data = window.GW_DATA;
  const [tab, setTab] = useStateP("all");
  const [q, setQ] = useStateP("");
  const [blocked, setBlocked] = useStateP(new Set(["Diana Ramalho", "Hugo Tavares", "Rui Costa"]));
  const [removed, setRemoved] = useStateP(new Set());
  const [toRemove, setToRemove] = useStateP(null);

  function toggleBlock(name) {
    setBlocked(prev => { const n = new Set(prev); if (n.has(name)) n.delete(name); else n.add(name); return n; });
  }
  function confirmRemove() {
    if (!toRemove) return;
    setRemoved(prev => { const n = new Set(prev); n.add(toRemove); return n; });
    setBlocked(prev => { const n = new Set(prev); n.delete(toRemove); return n; });
    setToRemove(null);
  }

  // Build clients from past + upcoming bookings (anyone who booked becomes a client)
  const all = new Map();
  [...data.proBookings.past, ...data.proBookings.upcoming, ...(data.proBookings.cancelled || [])].forEach(b => {
    if (removed.has(b.client)) return;
    if (!all.has(b.client)) all.set(b.client, { name: b.client, bookings: 0, lastService_pt: "", lastService_en: "", lastDate: "", totalSpent: 0, ratingAvg: 0, ratingCount: 0, noShows: 0 });
    const c = all.get(b.client);
    c.bookings += 1;
    if (b.status === "done") { c.totalSpent += (b.price || 0); if (b.rating) { c.ratingAvg += b.rating; c.ratingCount += 1; } }
    if (!c.lastDate || b.date > c.lastDate) { c.lastDate = b.date; c.lastService_pt = b.service_pt; c.lastService_en = b.service_en; }
  });

  // Demo enrichment
  const enrich = {
    "Sofia Andrade":   { tag: "vip", phone: "+351 916 110 200", email: "sofia.a@email.com", since: "2024-03" },
    "Helena Rocha":    { tag: "vip", phone: "+351 914 887 113", email: "helena.r@email.com", since: "2023-11" },
    "Júlia Mendes":    { tag: "new", phone: "+351 917 220 901", email: "julia.m@email.com", since: "2026-05" },
    "Bruna Cardoso":   { tag: "loyal", phone: "+351 919 442 008", email: "bruna.c@email.com", since: "2024-08" },
    "Mariana Costa":   { tag: "loyal", phone: "+351 911 220 014", email: "mariana.c@email.com", since: "2024-01" },
    "Patrícia Antunes":{ tag: "new", phone: "+351 912 110 553", email: "patricia.a@email.com", since: "2026-04" }
  };

  let list = [...all.values()].map(c => ({ ...c, ...(enrich[c.name] || { tag: "regular", phone: "+351 9XX XXX XXX", email: "client@email.com", since: "2025" }), blocked: blocked.has(c.name), avgRating: c.ratingCount ? c.ratingAvg / c.ratingCount : null }));

  if (tab === "vip") list = list.filter(c => c.tag === "vip" || c.tag === "loyal");
  else if (tab === "new") list = list.filter(c => c.tag === "new");
  else if (tab === "blocked") list = list.filter(c => c.blocked);

  if (q) list = list.filter(c => c.name.toLowerCase().includes(q.toLowerCase()) || c.email.toLowerCase().includes(q.toLowerCase()));

  list.sort((a, b) => b.bookings - a.bookings);

  const totals = {
    all: [...all.values()].length,
    vip: [...all.values()].filter(c => (enrich[c.name]?.tag === "vip" || enrich[c.name]?.tag === "loyal")).length,
    new: [...all.values()].filter(c => enrich[c.name]?.tag === "new").length,
    blocked: [...all.values()].filter(c => blocked.has(c.name)).length
  };
  const totalSpent = [...all.values()].reduce((s, c) => s + c.totalSpent, 0);

  return (
    <div>
      <div className="spread mb-4">
        <div>
          <h1 className="page-title">{lang === "pt" ? "Clientes" : "Clients"}</h1>
          <p className="page-sub" style={{ marginBottom: 0 }}>{lang === "pt" ? "Quem agendou consigo até hoje. Inclui histórico, preferências e bloqueios." : "Anyone who booked with you so far. Includes history, preferences and blocks."}</p>
        </div>
        <button className="btn btn-primary" onClick={() => onNav && onNav("pro-new-client")}>{Icons.plus} {lang === "pt" ? "Novo Cliente" : "New Client"}</button>
      </div>

      <div className="booking-stats" style={{ marginBottom: 22 }}>
        <div className="bk-stat"><div className="bk-stat-icon" style={{ background: "color-mix(in oklch, var(--accent) 12%, var(--surface))", color: "var(--accent)" }}>{Icons.users}</div><div><div className="bk-stat-val">{totals.all}</div><div className="bk-stat-label">{lang === "pt" ? "Clientes ativos" : "Active clients"}</div></div></div>
        <div className="bk-stat"><div className="bk-stat-icon" style={{ background: "color-mix(in oklch, var(--c-amber) 22%, var(--surface))", color: "var(--c-amber)" }}>{Icons.star}</div><div><div className="bk-stat-val">{totals.vip}</div><div className="bk-stat-label">VIP & Fiéis</div></div></div>
        <div className="bk-stat"><div className="bk-stat-icon" style={{ background: "color-mix(in oklch, var(--c-pink) 18%, var(--surface))", color: "var(--c-pink)" }}>{Icons.sparkle}</div><div><div className="bk-stat-val">{totals.new}</div><div className="bk-stat-label">{lang === "pt" ? "Novos" : "New"}</div></div></div>
        <div className="bk-stat"><div className="bk-stat-icon" style={{ background: "color-mix(in oklch, var(--c-mint) 18%, var(--surface))", color: "var(--c-mint)" }}>{Icons.dollar}</div><div><div className="bk-stat-val">{totalSpent}€</div><div className="bk-stat-label">{lang === "pt" ? "Faturado" : "Earned"}</div></div></div>
      </div>

      <div className="pro-bookings-toolbar">
        <div className="topbar-search" style={{ height: 40, padding: "8px 14px", flex: 1 }}>
          {Icons.search}
          <input placeholder={lang === "pt" ? "Buscar cliente..." : "Search client..."} value={q} onChange={e => setQ(e.target.value)} />
        </div>
        <div className="tabs" style={{ marginBottom: 0 }}>
          <button className={"tab" + (tab === "all" ? " active" : "")} onClick={() => setTab("all")}>{lang === "pt" ? "Todos" : "All"} <span className="tab-count">{totals.all}</span></button>
          <button className={"tab" + (tab === "vip" ? " active" : "")} onClick={() => setTab("vip")}>VIP <span className="tab-count">{totals.vip}</span></button>
          <button className={"tab" + (tab === "new" ? " active" : "")} onClick={() => setTab("new")}>{lang === "pt" ? "Novos" : "New"} <span className="tab-count">{totals.new}</span></button>
          <button className={"tab" + (tab === "blocked" ? " active" : "")} onClick={() => setTab("blocked")}>{lang === "pt" ? "Bloqueados" : "Blocked"} <span className="tab-count">{totals.blocked}</span></button>
        </div>
      </div>

      <div className="team-table" style={{ marginTop: 18 }}>
        <div className="team-row team-row-head" style={{ gridTemplateColumns: "1.4fr 1fr 100px 90px 110px 110px 160px" }}>
          <div>{lang === "pt" ? "Cliente" : "Client"}</div>
          <div>{lang === "pt" ? "Último serviço" : "Last service"}</div>
          <div style={{ textAlign: "center" }}>{lang === "pt" ? "Marcações" : "Bookings"}</div>
          <div>{lang === "pt" ? "Gasto" : "Spent"}</div>
          <div>{lang === "pt" ? "Última interação" : "Last contact"}</div>
          <div>{lang === "pt" ? "Desde" : "Since"}</div>
          <div style={{ textAlign: "right" }}>{lang === "pt" ? "Ações" : "Actions"}</div>
        </div>

        {list.length === 0 && (
          <div className="bk-empty" style={{ borderRadius: 0, border: "none" }}>
            <div className="bk-empty-glyph">{Icons.users}</div>
            <div className="bk-empty-title">{lang === "pt" ? "Sem clientes nesta vista" : "No clients in this view"}</div>
            <div className="bk-empty-sub">{lang === "pt" ? "Experimente outro filtro ou pesquisa." : "Try a different filter or search."}</div>
          </div>
        )}

        {list.map(c => {
          // Demo: derive "last contact" from lastDate + a relative label
          const lastContacts = {
            "Sofia Andrade": { date: "2026-05-18", type_pt: "Chat", type_en: "Chat" },
            "Helena Rocha": { date: "2026-05-17", type_pt: "Email", type_en: "Email" },
            "Júlia Mendes": { date: "2026-05-15", type_pt: "Marcação", type_en: "Booking" },
            "Bruna Cardoso": { date: "2026-05-12", type_pt: "Chat", type_en: "Chat" },
            "Mariana Costa": { date: "2026-05-10", type_pt: "Avaliação", type_en: "Review" },
            "Patrícia Antunes": { date: "2026-05-08", type_pt: "Marcação", type_en: "Booking" },
            "Diana Ramalho": { date: "2026-05-08", type_pt: "No-show", type_en: "No-show" },
            "Hugo Tavares": { date: "2026-04-15", type_pt: "Chat", type_en: "Chat" },
            "Rui Costa": { date: "2026-03-22", type_pt: "Marcação", type_en: "Booking" }
          };
          const lc = lastContacts[c.name] || { date: c.lastDate, type_pt: "Marcação", type_en: "Booking" };
          return (
          <div key={c.name} className={"team-row" + (c.blocked ? " blacklist-row" : "")} style={{ gridTemplateColumns: "1.4fr 1fr 100px 90px 110px 110px 160px" }}>
            <div className="tr-member">
              <div className="avatar sm" style={{ background: c.blocked ? "linear-gradient(135deg, var(--c-coral), var(--c-amber))" : "linear-gradient(135deg, var(--c-pink), var(--accent))", fontSize: 13 }}>{c.name.split(" ").map(w => w[0]).slice(0,2).join("")}</div>
              <div className="tr-name-wrap">
                <div className="tr-name">{c.name}</div>
                <div style={{ display: "flex", gap: 4, marginTop: 2 }}>
                  {c.tag === "vip"   && <span className="client-tag vip">VIP</span>}
                  {c.tag === "loyal" && <span className="client-tag loyal">{lang === "pt" ? "Fiel" : "Loyal"}</span>}
                  {c.tag === "new"   && <span className="client-tag new">{lang === "pt" ? "Novo" : "New"}</span>}
                  {c.blocked && <span className="client-tag blocked">{lang === "pt" ? "Bloqueado" : "Blocked"}</span>}
                </div>
              </div>
            </div>
            <div className="tr-role">
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{lang === "pt" ? c.lastService_pt : c.lastService_en}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{c.lastDate}</div>
            </div>
            <div className="tr-count">{c.bookings}</div>
            <div className="tr-rating" style={{ color: "var(--accent)" }}>{c.totalSpent}€</div>
            <div className="tr-schedule">
              <div style={{ fontSize: 13, color: "var(--ink)", fontWeight: 600 }}>{lang === "pt" ? lc.type_pt : lc.type_en}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{lc.date}</div>
            </div>
            <div className="tr-schedule">{c.since}</div>
            <div className="tr-actions">
              <button className="btn btn-ghost tr-action" onClick={() => onChat && onChat("p1")} title={lang === "pt" ? "Mensagem" : "Message"}>{Icons.chat}</button>
              <button className="btn btn-ghost tr-action" style={{ color: c.blocked ? "var(--c-mint)" : "var(--c-coral)" }} onClick={() => toggleBlock(c.name)} title={c.blocked ? (lang === "pt" ? "Desbloquear" : "Unblock") : (lang === "pt" ? "Bloquear" : "Block")}>
                {c.blocked ? Icons.check : Icons.x}
              </button>
              <button className="btn btn-ghost tr-action" style={{ color: "var(--c-coral)" }} onClick={() => setToRemove(c.name)} title={lang === "pt" ? "Remover" : "Remove"}>{Icons.trash || Icons.x}</button>
            </div>
          </div>
        );})}
      </div>

      {toRemove && (
        <div className="modal-backdrop" onClick={() => setToRemove(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-icon" style={{ background: "color-mix(in oklch, var(--c-coral) 18%, var(--surface))", color: "var(--c-coral)" }}>{Icons.x}</div>
            <h3 className="modal-title">{lang === "pt" ? "Remover este cliente?" : "Remove this client?"}</h3>
            <p className="modal-text">{lang === "pt" ? `${toRemove} será removido(a) da sua lista de clientes. O histórico de marcações fica preservado nos registos.` : `${toRemove} will be removed from your client list. Booking history stays in your records.`}</p>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setToRemove(null)}>{lang === "pt" ? "Cancelar" : "Cancel"}</button>
              <button className="btn btn-primary" style={{ background: "var(--c-coral)" }} onClick={confirmRemove}>{Icons.x} {lang === "pt" ? "Remover" : "Remove"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { ProDashboard, ProBookings, AgendaPlanner, BookingDetails, MemberDashboard, ProTeam, MemberDetails, AddMemberScreen, EditRole, EditServices, EditSchedule, BusinessSettings, BlacklistScreen, AdminAnnouncements, RichTextEditor, NewBookingScreen, NewClientScreen, ProClients });
