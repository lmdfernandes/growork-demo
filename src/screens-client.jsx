import React from "react";
const Icons = window.Icons;
const { Sidebar, TopBar, MobileNav, Banner, PushToast, ProDashboard, ProBookings, AgendaPlanner, BookingDetails, MemberDashboard, ProTeam, MemberDetails, AddMemberScreen, EditRole, EditServices, EditSchedule, BusinessSettings, BlacklistScreen, AdminAnnouncements, RichTextEditor, NewBookingScreen, NewClientScreen, ProClients, useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider, TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, __twkIsLight, TweakColor, TweakButton } = window;

// Client-facing screens
const { useState: useStateC, useMemo: useMemoC, useEffect: useEffectC, useRef: useRefC } = React;

// ============ HOME ============
function HomeScreen({ t, lang, onPickPro, onSeeAll }) {
  const data = window.GW_DATA;
  const [cat, setCat] = useStateC("all");
  const filtered = cat === "all" ? data.pros : data.pros.filter(p => p.cat === cat);

  return (
    <div>
      <h1 className="page-title">{t.hello}</h1>
      <p className="page-sub">{t.home_sub}</p>

      <div className="featured">
        <div className="featured-hero">
          <img className="featured-img" src={window.__resources.hero1} alt="" />
          <div className="featured-overlay" />
          <div className="featured-content">
            <div className="featured-tag">{t.featured_hero_tag}</div>
            <div className="featured-title">{t.featured_hero_title}</div>
            <div className="featured-sub">{t.featured_hero_sub}</div>
            <div className="featured-cta">{t.featured_cta} →</div>
          </div>
        </div>
        <div className="featured-side coral">
          <img className="featured-img" src={window.__resources.hero2} alt="" />
          <div className="featured-overlay" />
          <div className="featured-content">
            <div className="featured-tag">{t.featured_2_tag}</div>
            <div className="featured-title">{t.featured_2_title}</div>
            <div className="featured-sub">{t.featured_2_sub}</div>
          </div>
        </div>
        <div className="featured-side mint">
          <img className="featured-img" src={window.__resources.hero3} alt="" />
          <div className="featured-overlay" />
          <div className="featured-content">
            <div className="featured-tag">{t.featured_3_tag}</div>
            <div className="featured-title">{t.featured_3_title}</div>
            <div className="featured-sub">{t.featured_3_sub}</div>
          </div>
        </div>
      </div>

      <div className="cat-row">
        {data.categories.map(c => (
          <button key={c.id} className={"cat-chip" + (cat === c.id ? " active" : "")} onClick={() => setCat(c.id)}>
            <span style={{ fontSize: 14 }}>{c.emoji}</span>
            <span>{lang === "pt" ? c.pt : c.en}</span>
          </button>
        ))}
      </div>

      <div className="spread mb-4">
        <h2 className="section-title">{t.near_you}</h2>
        <button className="btn btn-ghost" style={{ padding: "8px 14px", fontSize: 13 }} onClick={onSeeAll}>{t.see_all}</button>
      </div>

      <div className="pro-grid">
        {filtered.map(p => (
          <div key={p.id} className="pro-card" onClick={() => onPickPro(p.id)}>
            <div className="pro-card-cover" style={{ background: p.color }}>
              {p.image && <img className="pro-card-img" src={p.image} alt="" />}
              <div className="pro-card-cover-overlay" />
              <span className="cover-emoji">{p.emoji}</span>
            </div>
            <div className="pro-card-body">
              <div className="pro-card-head">
                <div className="pro-card-name">{p.name}</div>
                <div className="pro-card-rating"><span style={{ color: "var(--c-amber)" }}>★</span> {p.rating.toFixed(1)}</div>
              </div>
              <div className="pro-card-role">{lang === "pt" ? p.role_pt : p.role_en}</div>
              <div className="pro-card-meta">
                <span>{Icons.mapPin} {p.distance}</span>
                <span>{Icons.star} {p.reviews} {t.reviews}</span>
              </div>
              <div className="pro-card-price">
                <div>
                  <div className="pro-card-price-from">{t.starting_at}</div>
                  <div className="pro-card-price-val">{p.priceFrom}€</div>
                </div>
                <button className="btn btn-primary" style={{ padding: "8px 14px", fontSize: 12 }}>{t.book_now}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ EXPLORE (Ver tudo) ============
function ExploreScreen({ t, lang, onPickPro, onBack }) {
  const data = window.GW_DATA;

  // Build region & service options from data
  const regions = Array.from(new Set(data.pros.map(p => p.location?.region).filter(Boolean)));
  const serviceOptions = data.categories;

  const [region, setRegion] = useStateC("all");
  const [service, setService] = useStateC("all");
  const [date, setDate] = useStateC("2026-05-22"); // a Friday in the demo window

  const dowMap = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const holidaySet = new Set((data.holidays || []).map(h => h.date));

  function parseDate(s) {
    const [y, m, d] = s.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  function dayKey(s) {
    return dowMap[parseDate(s).getDay()];
  }
  function fmtDateLong(s) {
    const dt = parseDate(s);
    const months = lang === "pt"
      ? ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"]
      : ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const wd = lang === "pt"
      ? ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"]
      : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return `${wd[dt.getDay()]}, ${dt.getDate()} ${lang === "pt" ? "de " : ""}${months[dt.getMonth()]}`;
  }

  const isHoliday = holidaySet.has(date);
  const holiday = isHoliday
    ? data.holidays.find(h => h.date === date)
    : null;

  // Build quick-pick date chips: today + next 7 days
  const today = new Date(2026, 4, 19);
  const dateChips = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    return { iso, d };
  });

  function proIsOpen(p) {
    if (isHoliday) return false;
    const hours = p.schedule?.[dayKey(date)];
    return !!hours;
  }

  const filtered = data.pros.filter(p => {
    if (region !== "all" && p.location?.region !== region) return false;
    if (service !== "all" && p.cat !== service) return false;
    return true;
  });

  const openOnDate = filtered.filter(proIsOpen);
  const closedOnDate = filtered.filter(p => !proIsOpen(p));

  function clearAll() {
    setRegion("all");
    setService("all");
    setDate("2026-05-22");
  }

  const activeCount = (region !== "all" ? 1 : 0) + (service !== "all" ? 1 : 0);

  return (
    <div>
      <button className="btn btn-ghost mb-4" onClick={onBack} style={{ padding: "8px 14px", fontSize: 13 }}>
        {Icons.arrowL}<span>{t.back || (lang === "pt" ? "Voltar" : "Back")}</span>
      </button>

      <h1 className="page-title">{t.explore_title}</h1>
      <p className="page-sub">{t.explore_sub}</p>

      {/* Filter bar */}
      <div className="explore-filters">
        <div className="ef-group">
          <label className="ef-label">{Icons.mapPin}<span>{t.filter_region}</span></label>
          <select value={region} onChange={e => setRegion(e.target.value)}>
            <option value="all">{t.filter_all}</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="ef-group">
          <label className="ef-label">{Icons.sparkle}<span>{t.filter_service}</span></label>
          <select value={service} onChange={e => setService(e.target.value)}>
            <option value="all">{t.filter_all}</option>
            {serviceOptions.filter(c => c.id !== "all").map(c => (
              <option key={c.id} value={c.id}>{lang === "pt" ? c.pt : c.en}</option>
            ))}
          </select>
        </div>
        <div className="ef-group">
          <label className="ef-label">{Icons.calendar}<span>{t.filter_date}</span></label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} min="2026-05-19" max="2026-12-31" />
        </div>
        {(activeCount > 0 || date !== "2026-05-22") && (
          <button className="btn btn-ghost ef-clear" onClick={clearAll}>
            {Icons.x}<span>{t.filter_clear}</span>
          </button>
        )}
      </div>

      {/* Date quick chips — show weekday + short date only when relevant via aria title */}
      <div className="ef-date-strip">
        {dateChips.map(({ iso, d }) => {
          const isSelected = iso === date;
          const isHol = holidaySet.has(iso);
          const wd = lang === "pt" ? ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"] : ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
          const months = lang === "pt" ? ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"] : ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
          return (
            <button
              key={iso}
              className={"ef-date-chip" + (isSelected ? " selected" : "") + (isHol ? " holiday" : "")}
              onClick={() => setDate(iso)}
              title={isHol ? (data.holidays.find(h => h.date === iso)[lang === "pt" ? "name_pt" : "name_en"]) : undefined}
            >
              <span className="ef-date-wd">{wd[d.getDay()]}</span>
              <span className="ef-date-mon">{months[d.getMonth()]}</span>
              {isHol && <span className="ef-date-tag">{lang === "pt" ? "Feriado" : "Hol."}</span>}
            </button>
          );
        })}
      </div>

      {/* Holiday banner */}
      {isHoliday && holiday && (
        <div className="holiday-alert" style={{ marginTop: 16 }}>
          <div className="holiday-alert-ico">{Icons.calendar}</div>
          <div className="holiday-alert-body">
            <div className="holiday-alert-title">
              {t.holiday_alert_title} · {lang === "pt" ? holiday.name_pt : holiday.name_en}
            </div>
            <div className="holiday-alert-text">
              {lang === "pt"
                ? "Os profissionais aparecem como fechados nesta data. Escolha outro dia para reservar."
                : "Pros are shown as closed on this date. Pick another day to book."}
            </div>
          </div>
        </div>
      )}

      {/* Results header */}
      <div className="spread" style={{ margin: "22px 0 14px" }}>
        <div>
          <div className="ef-results-count">
            {openOnDate.length} <span>{t.explore_results}</span>
          </div>
          <div className="ef-results-sub">
            {fmtDateLong(date)}
            {region !== "all" && <> · <strong>{region}</strong></>}
          </div>
        </div>
      </div>

      {/* Open list */}
      {openOnDate.length === 0 && (
        <div className="bk-empty">
          <div className="bk-empty-glyph">{Icons.search}</div>
          <div className="bk-empty-title">{t.explore_no_results_title}</div>
          <div className="bk-empty-sub">{t.explore_no_results_sub}</div>
        </div>
      )}

      <div className="pro-grid">
        {openOnDate.map(p => {
          const dayHours = p.schedule[dayKey(date)];
          return (
            <div key={p.id} className="pro-card" onClick={() => onPickPro(p.id)}>
              <div className="pro-card-cover" style={{ background: p.color }}>
                {p.image && <img className="pro-card-img" src={p.image} alt="" />}
                <div className="pro-card-cover-overlay" />
                <span className="cover-emoji">{p.emoji}</span>
                <span className="pro-open-tag">{Icons.clock} {t.open_on_date} · {dayHours}</span>
              </div>
              <div className="pro-card-body">
                <div className="pro-card-head">
                  <div className="pro-card-name">{p.name}</div>
                  <div className="pro-card-rating"><span style={{ color: "var(--c-amber)" }}>★</span> {p.rating.toFixed(1)}</div>
                </div>
                <div className="pro-card-role">{lang === "pt" ? p.role_pt : p.role_en}</div>
                <div className="pro-card-meta">
                  <span>{Icons.mapPin} {p.location?.region || p.distance}</span>
                  <span>{Icons.star} {p.reviews} {t.reviews}</span>
                </div>
                <div className="pro-card-price">
                  <div>
                    <div className="pro-card-price-from">{t.starting_at}</div>
                    <div className="pro-card-price-val">{p.priceFrom}€</div>
                  </div>
                  <button className="btn btn-primary" style={{ padding: "8px 14px", fontSize: 12 }}>{t.book_now}</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Closed list (when filters exclude only by date) */}
      {closedOnDate.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <h2 className="section-title mb-3" style={{ color: "var(--muted)" }}>
            {t.closed_on_date} · {closedOnDate.length}
          </h2>
          <div className="pro-grid">
            {closedOnDate.map(p => (
              <div key={p.id} className="pro-card pro-card-closed" onClick={() => onPickPro(p.id)}>
                <div className="pro-card-cover" style={{ background: p.color }}>
                  {p.image && <img className="pro-card-img" src={p.image} alt="" />}
                  <div className="pro-card-cover-overlay" />
                  <span className="cover-emoji">{p.emoji}</span>
                  <span className="pro-closed-tag">{Icons.x} {t.closed_on_date}</span>
                </div>
                <div className="pro-card-body">
                  <div className="pro-card-head">
                    <div className="pro-card-name">{p.name}</div>
                    <div className="pro-card-rating"><span style={{ color: "var(--c-amber)" }}>★</span> {p.rating.toFixed(1)}</div>
                  </div>
                  <div className="pro-card-role">{lang === "pt" ? p.role_pt : p.role_en}</div>
                  <div className="pro-card-meta">
                    <span>{Icons.mapPin} {p.location?.region || p.distance}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============ PROFILE ============
function ProfileScreen({ t, lang, proId, onBook, onMessage, onBack }) {
  const data = window.GW_DATA;
  const pro = data.pros.find(p => p.id === proId);
  const services = data.servicesByPro[proId] || [];
  const c = pro.contact || {};
  const loc = pro.location || {};
  const sch = pro.schedule || {};

  return (
    <div>
      <button className="btn btn-ghost mb-4" onClick={onBack} style={{ padding: "8px 14px", fontSize: 13 }}>
        {Icons.arrowL}<span>{t.back}</span>
      </button>

      <div className="profile-hero">
        <div className="profile-cover" style={{ background: pro.color }}>
          {pro.image && <img className="profile-cover-img" src={pro.image} alt="" />}
          <div className="profile-cover-overlay" />
        </div>

        <div className="profile-id">
          <div className="avatar profile-avatar" style={{ background: pro.color, fontSize: 36 }}>{pro.emoji}</div>

          <div className="profile-id-text">
            <div className="profile-id-head">
              <h1>{pro.name}</h1>
              <span className="profile-id-rating" title={t.rating_label}>
                <span style={{ color: "var(--c-amber)" }}>★</span> {pro.rating.toFixed(1)}
                <span className="profile-id-rating-count">({pro.reviews})</span>
              </span>
            </div>
            <div className="role">{lang === "pt" ? pro.role_pt : pro.role_en}</div>
            <div className="profile-id-loc">
              {Icons.mapPin}<span>{loc.name} · {lang === "pt" ? loc.address_pt : loc.address_en}{!loc.mobile && <> · <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.name + " " + (lang === "pt" ? loc.address_pt : loc.address_en))}`} target="_blank" rel="noopener noreferrer" className="loc-link">{lang === "pt" ? "Ver no Google Maps" : "View on Google Maps"}</a></>}</span>
            </div>
          </div>

          <div className="profile-id-right">
            <div className="profile-id-actions">
              <button className="btn btn-primary" onClick={() => onBook(proId)}>{t.book_now}</button>
              <button className="btn btn-outline" onClick={() => onMessage(proId)}>{Icons.chat} {t.message}</button>
            </div>
          </div>
        </div>

        <div className="profile-inline-stats" style={{ display: "none" }} />
      </div>

      {/* Holiday alert banner */}
      {(() => {
        const upcomingHoliday = (data.holidays || []).find(h => {
          const [y, m, d] = h.date.split("-").map(Number);
          const dt = new Date(y, m - 1, d);
          const today = new Date(2026, 4, 19);
          const diff = (dt - today) / (1000 * 60 * 60 * 24);
          return diff > 0 && diff < 60;
        });
        if (!upcomingHoliday) return null;
        const [yy, mm, dd] = upcomingHoliday.date.split("-").map(Number);
        const months = lang === "pt"
          ? ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"]
          : ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const dateLabel = lang === "pt" ? `${dd} de ${months[mm - 1]}` : `${months[mm - 1]} ${dd}`;
        return (
          <div className="holiday-alert">
            <div className="holiday-alert-ico">{Icons.calendar}</div>
            <div className="holiday-alert-body">
              <div className="holiday-alert-title">
                {t.holiday_alert_title} · {lang === "pt" ? upcomingHoliday.name_pt : upcomingHoliday.name_en}
              </div>
              <div className="holiday-alert-text">
                {t.holiday_alert_text} <strong>{dateLabel}</strong>.
              </div>
            </div>
          </div>
        );
      })()}

      {/* (Old "profile-inline-info" 3-column row removed — its content now lives in the hero) */}

      <div className="profile-header" style={{ marginTop: 12 }}>
        <div>
          <h2 className="section-title mb-3">{t.about}</h2>
          <div className="card" style={{ marginBottom: 22 }}>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--ink-2)" }}>{t.about_text}</p>
          </div>

          <h2 className="section-title mb-3">{t.services}</h2>
          <div className="service-list">
            {services.map(s => (
              <div key={s.id} className="service-row" onClick={() => onBook(proId, s.id)}>
                <div className="swatch" style={{ background: s.bg, color: "white" }}>{s.emoji}</div>
                <div className="body">
                  <div className="name">{lang === "pt" ? s.name_pt : s.name_en}</div>
                  <div className="meta">{s.duration} min · {lang === "pt" ? "no salão / domicílio" : "salon / home"}</div>
                </div>
                <div className="price">{s.price}€</div>
                <button className="btn btn-outline" style={{ padding: "8px 12px", fontSize: 12 }}>{t.book_now}</button>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-side">
          <div className="info-card">
            <div className="info-card-title">{t.hours_label}</div>
            <div className="weekly-hours">
              {[
                { key: "mon", pt: "Segunda", en: "Monday" },
                { key: "tue", pt: "Terça",   en: "Tuesday" },
                { key: "wed", pt: "Quarta",  en: "Wednesday" },
                { key: "thu", pt: "Quinta",  en: "Thursday" },
                { key: "fri", pt: "Sexta",   en: "Friday" },
                { key: "sat", pt: "Sábado",  en: "Saturday" },
                { key: "sun", pt: "Domingo", en: "Sunday" }
              ].map(day => {
                const hours = sch[day.key];
                const todayDow = new Date(2026, 4, 19).getDay(); // 0=Sun
                const dowMap = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
                const isToday = dowMap[day.key] === todayDow;
                return (
                  <div key={day.key} className={"wh-row" + (isToday ? " today" : "") + (!hours ? " closed" : "")}>
                    <span className="wh-day">{lang === "pt" ? day.pt : day.en}</span>
                    <span className="wh-hours">{hours || t.closed_label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-title">{t.contact_label}</div>
            <a className="ic-contact" href={"tel:" + (c.phone || "").replace(/\s/g, "")}>
              {Icons.phone}<span>{c.phone}</span>
            </a>
            <a className="ic-contact" href={"mailto:" + c.email}>
              {Icons.email}<span>{c.email}</span>
            </a>

            <div className="ic-sep" />
            <div className="info-card-sublabel">{t.socials_label}</div>
            <div className="socials-row">
              <a className="social-btn variant" href="#" title={c.instagram}>{Icons.instagram}</a>
              <a className="social-btn variant" href="#" title="Facebook">{Icons.facebook}</a>
              <a className="social-btn variant" href="#" title="Website">{Icons.globe}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ BOOKING ============
function BookingScreen({ t, lang, proId, presetServiceId, onConfirm, onBack }) {
  const data = window.GW_DATA;
  const pro = data.pros.find(p => p.id === proId);
  const services = data.servicesByPro[proId] || [];
  // Eligible team members for this pro/business: filter team by which can do the service category
  const team = (data.proTeam || []).filter(m => {
    // Demo mapping: for Marina's biz (p1), use full team; otherwise just the owner
    return proId === "p1";
  });
  const hasTeam = team.length > 1;
  const [step, setStep] = useStateC(presetServiceId ? (hasTeam ? 2 : 3) : 1);
  const [serviceId, setServiceId] = useStateC(presetServiceId || null);
  const [memberId, setMemberId] = useStateC(hasTeam ? "any" : (team[0]?.id || null));
  const [date, setDate] = useStateC(22);
  const [time, setTime] = useStateC(null);

  const service = services.find(s => s.id === serviceId);

  const days = [];
  // June 2026 — June 1 is Monday => dow index 1 (Sun=0); 30 days
  const monthStart = 1;
  for (let i = 0; i < monthStart; i++) days.push(null);
  for (let i = 1; i <= 30; i++) days.push(i);
  while (days.length % 7) days.push(null);

  const todayDate = 0; // viewing future month, no "today" in the grid
  const monthLabel = lang === "pt" ? "Junho 2026" : "June 2026";
  const monthIso = "2026-06";
  const holidaySet = new Set((data.holidays || []).filter(h => h.date.startsWith(monthIso)).map(h => parseInt(h.date.split("-")[2], 10)));
  const holidayMeta = (data.holidays || []).reduce((acc, h) => {
    const d = parseInt(h.date.split("-")[2], 10);
    acc[d] = h;
    return acc;
  }, {});
  const slotsByDay = {
    2:  ["09:00", "10:30", "14:00", "15:30"],
    3:  ["09:00", "11:00", "16:00"],
    4:  ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"],
    5:  ["09:00", "11:00"],
    8:  ["14:00", "15:30", "17:00"],
    9:  ["09:00", "10:30", "14:00"],
    11: ["09:00", "10:30", "12:00", "15:30"],
    12: ["09:00", "11:00", "14:00", "16:00"],
    15: ["09:00", "10:30", "14:00", "15:30"],
    16: ["09:00", "11:00", "16:00"]
  };
  const slotsToday = slotsByDay[date] || [];
  const disabledSlots = { 11: ["12:00"] }; // sample

  function go(n) {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      <button className="btn btn-ghost mb-4" onClick={onBack} style={{ padding: "8px 14px", fontSize: 13 }}>
        {Icons.arrowL}<span>{t.back}</span>
      </button>
      <h1 className="page-title">{t.book_title}</h1>
      <p className="page-sub">{pro.name} · {lang === "pt" ? pro.role_pt : pro.role_en}</p>

      <div className="step-rail">
        <div className={"step " + (step === 1 ? "active" : step > 1 ? "done" : "")}>
          <div className="step-num">{step > 1 ? "✓" : "1"}</div>
          <span className="step-label">{t.step_service}</span>
        </div>
        <div className="step-sep" />
        {hasTeam && (
          <>
            <div className={"step " + (step === 2 ? "active" : step > 2 ? "done" : "")}>
              <div className="step-num">{step > 2 ? "✓" : "2"}</div>
              <span className="step-label">{lang === "pt" ? "Profissional" : "Professional"}</span>
            </div>
            <div className="step-sep" />
          </>
        )}
        <div className={"step " + (step === 3 ? "active" : step > 3 ? "done" : "")}>
          <div className="step-num">{step > 3 ? "✓" : (hasTeam ? "3" : "2")}</div>
          <span className="step-label">{t.step_date}</span>
        </div>
        <div className="step-sep" />
        <div className={"step " + (step === 4 ? "active" : "")}>
          <div className="step-num">{hasTeam ? "4" : "3"}</div>
          <span className="step-label">{t.step_confirm}</span>
        </div>
      </div>

      <div className="booking-grid">
        <div>
          {step === 1 && (
            <div>
              <h2 className="section-title mb-3">{t.choose_service}</h2>
              <div className="service-list">
                {services.map(s => (
                  <div key={s.id} className={"service-row" + (serviceId === s.id ? " selected" : "")} onClick={() => setServiceId(s.id)}>
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
          )}

          {step === 2 && hasTeam && (
            <div>
              <h2 className="section-title mb-3">{lang === "pt" ? "Escolha o profissional" : "Choose the professional"}</h2>
              <div className="member-pick-grid">
                <button className={"member-pick-card" + (memberId === "any" ? " selected" : "")} onClick={() => setMemberId("any")}>
                  <div className="member-pick-avatar" style={{ background: "linear-gradient(135deg, var(--accent), var(--c-pink))" }}>✨</div>
                  <div style={{ flex: 1, textAlign: "left" }}>
                    <div className="member-pick-name">{lang === "pt" ? "Qualquer profissional" : "Any professional"}</div>
                    <div className="member-pick-role">{lang === "pt" ? "Atribuímos automaticamente quem tiver disponibilidade." : "We auto-assign whoever is available."}</div>
                  </div>
                </button>
                {team.map(m => (
                  <button key={m.id} className={"member-pick-card" + (memberId === m.id ? " selected" : "")} onClick={() => setMemberId(m.id)}>
                    <div className="member-pick-avatar" style={{ background: m.color }}>{m.emoji}</div>
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <div className="member-pick-name">
                        {m.name}
                        {m.isOwner && <span className="tr-owner-tag" style={{ marginLeft: 8 }}>{lang === "pt" ? "Proprietário" : "Owner"}</span>}
                      </div>
                      <div className="member-pick-role">{lang === "pt" ? m.role_pt : m.role_en} · ★ {m.rating.toFixed(1)}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="section-title mb-3">{t.choose_date}</h2>
              <div className="calendar mb-6">
                <div className="cal-head">
                  <div className="cal-month">{monthLabel}</div>
                  <div className="cal-nav">
                    <button>{Icons.arrowL}</button>
                    <button>{Icons.arrowR}</button>
                  </div>
                </div>
                <div className="cal-grid">
                  {(lang === "pt" ? ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"] : ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]).map(d => (
                    <div key={d} className="cal-dow">{d}</div>
                  ))}
                  {days.map((d, i) => {
                    if (d === null) return <div key={i} />;
                    const hasSlots = slotsByDay[d];
                    const isPast = d < todayDate;
                    const isHoliday = holidaySet.has(d);
                    const isSelected = d === date;
                    const isToday = d === todayDate;
                    const isDisabled = isPast || isHoliday;
                    const holiday = holidayMeta[d];
                    return (
                      <button
                        key={i}
                        className={
                          "cal-day" +
                          (isSelected ? " selected" : "") +
                          (isDisabled ? " disabled" : "") +
                          (isHoliday ? " holiday" : "") +
                          (hasSlots && !isDisabled ? " has-slots" : "") +
                          (isToday ? " today" : "")
                        }
                        disabled={isDisabled}
                        title={isHoliday ? (lang === "pt" ? holiday.name_pt : holiday.name_en) : undefined}
                        onClick={() => !isDisabled && setDate(d)}
                      >
                        {d}
                        {isHoliday && <span className="cal-day-tag">{lang === "pt" ? "Feriado" : "Holiday"}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <h2 className="section-title mb-3">{t.choose_time}</h2>
              {slotsToday.length === 0 ? (
                <div className="card" style={{ textAlign: "center", color: "var(--muted)", fontSize: 14 }}>
                  {lang === "pt" ? "Sem horários disponíveis nesta data" : "No available times for this date"}
                </div>
              ) : (
                <div className="slots">
                  {slotsToday.map(s => {
                    const isDisabled = (disabledSlots[date] || []).includes(s);
                    return (
                      <button
                        key={s}
                        className={"slot" + (time === s ? " selected" : "") + (isDisabled ? " disabled" : "")}
                        disabled={isDisabled}
                        onClick={() => !isDisabled && setTime(s)}
                      >{s}</button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="section-title mb-3">{lang === "pt" ? "Revise e confirme" : "Review and confirm"}</h2>
              <div className="appt-detail">
                <div className="appt-detail-row">
                  <div className="ico">{Icons.user}</div>
                  <div style={{ flex: 1 }}>
                    <div className="label">{t.pro_label}</div>
                    <div className="val">{pro.name} · {lang === "pt" ? pro.role_pt : pro.role_en}</div>
                  </div>
                </div>
                <div className="appt-detail-row">
                  <div className="ico">{Icons.sparkle}</div>
                  <div style={{ flex: 1 }}>
                    <div className="label">{t.service_label}</div>
                    <div className="val">{service ? (lang === "pt" ? service.name_pt : service.name_en) : "—"}</div>
                  </div>
                </div>
                <div className="appt-detail-row">
                  <div className="ico">{Icons.calendar}</div>
                  <div style={{ flex: 1 }}>
                    <div className="label">{t.date_label}</div>
                    <div className="val">{date} {lang === "pt" ? "de maio · 2026" : "May · 2026"}</div>
                  </div>
                </div>
                <div className="appt-detail-row">
                  <div className="ico">{Icons.clock}</div>
                  <div style={{ flex: 1 }}>
                    <div className="label">{t.time_label}</div>
                    <div className="val">{time || "—"} · {service?.duration} min</div>
                  </div>
                </div>
                <div className="appt-detail-row">
                  <div className="ico">{Icons.mapPin}</div>
                  <div style={{ flex: 1 }}>
                    <div className="label">{lang === "pt" ? "Local" : "Location"}</div>
                    <div className="val">{lang === "pt" ? "Salão Studio M — R. das Acácias, 142" : "Studio M Salon — 142 Acacia St."}</div>
                  </div>
                </div>
                <div className="appt-detail-row">
                  <div className="ico">{Icons.dollar}</div>
                  <div style={{ flex: 1 }}>
                    <div className="label">{t.pay_at_place}</div>
                    <div className="val">{service?.price}€</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="summary">
            <h3 className="section-title" style={{ marginBottom: 4 }}>{t.summary}</h3>
            <div className="summary-row"><span className="l">{t.pro_label}</span><span className="v">{pro.name}</span></div>
            <div className="summary-row"><span className="l">{t.service_label}</span><span className="v">{service ? (lang === "pt" ? service.name_pt : service.name_en) : "—"}</span></div>
            <div className="summary-row"><span className="l">{t.duration}</span><span className="v">{service?.duration || "—"} min</span></div>
            <div className="summary-row"><span className="l">{t.date_label}</span><span className="v">{date}/05/2026</span></div>
            <div className="summary-row"><span className="l">{t.time_label}</span><span className="v">{time || "—"}</span></div>
            <div className="summary-row summary-total"><span className="l">{t.total}</span><span className="v">{service?.price || 0}€</span></div>

            {step === 1 && (
              <button className="btn btn-primary btn-block btn-lg" disabled={!serviceId} onClick={() => go(hasTeam ? 2 : 3)} style={{ opacity: serviceId ? 1 : 0.5 }}>{t.continue} {Icons.arrowR}</button>
            )}
            {step === 2 && hasTeam && (
              <>
                <button className="btn btn-primary btn-block btn-lg" disabled={!memberId} onClick={() => go(3)} style={{ opacity: memberId ? 1 : 0.5 }}>{t.continue} {Icons.arrowR}</button>
                <button className="btn btn-outline btn-block" onClick={() => go(1)}>{t.back}</button>
              </>
            )}
            {step === 3 && (
              <>
                <button className="btn btn-primary btn-block btn-lg" disabled={!time} onClick={() => go(4)} style={{ opacity: time ? 1 : 0.5 }}>{t.continue} {Icons.arrowR}</button>
                <button className="btn btn-outline btn-block" onClick={() => go(hasTeam ? 2 : 1)}>{t.back}</button>
              </>
            )}
            {step === 4 && (
              <>
                <button className="btn btn-primary btn-block btn-lg" onClick={() => onConfirm({ proId, serviceId, date, time, memberId })}>{Icons.check} {t.confirm_booking}</button>
                <button className="btn btn-outline btn-block" onClick={() => go(3)}>{t.back}</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ CONFIRMATION ============
function ConfirmationScreen({ t, lang, booking, onChat, onHome }) {
  const data = window.GW_DATA;
  const pro = data.pros.find(p => p.id === booking.proId);
  const service = (data.servicesByPro[booking.proId] || []).find(s => s.id === booking.serviceId);
  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <div className="confirm-hero mb-6">
        <div className="confirm-check">✓</div>
        <div className="confirm-title">{t.confirmed_title}</div>
        <div className="confirm-sub">{t.confirmed_sub}</div>
      </div>

      <div className="appt-detail mb-6">
        <div className="appt-detail-row">
          <div className="ico">{Icons.user}</div>
          <div style={{ flex: 1 }}>
            <div className="label">{t.pro_label}</div>
            <div className="val">{pro.name}</div>
          </div>
          <div className="avatar sm" style={{ background: pro.color }}>{pro.emoji}</div>
        </div>
        <div className="appt-detail-row">
          <div className="ico">{Icons.sparkle}</div>
          <div style={{ flex: 1 }}>
            <div className="label">{t.service_label}</div>
            <div className="val">{service ? (lang === "pt" ? service.name_pt : service.name_en) : "—"}</div>
          </div>
        </div>
        <div className="appt-detail-row">
          <div className="ico">{Icons.calendar}</div>
          <div style={{ flex: 1 }}>
            <div className="label">{t.date_label}</div>
            <div className="val">{booking.date} {lang === "pt" ? "de maio · 2026" : "May · 2026"} · {booking.time}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button className="btn btn-primary btn-lg" onClick={() => onChat(booking.proId)}>{Icons.chat} {t.open_chat}</button>
        <button className="btn btn-outline btn-lg">{Icons.calendar} {t.add_calendar}</button>
        <button className="btn btn-ghost btn-lg" onClick={onHome}>{t.back_home}</button>
      </div>
    </div>
  );
}

// ============ BOOKINGS (rich appointments + history view) ============
function BookingsScreen({ t, lang, onPickPro, onChat, onFindPro }) {
  const data = window.GW_DATA;
  const [tab, setTab] = useStateC("upcoming");
  const months = {
    pt: ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"],
    en: ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
  };
  const monthsLong = {
    pt: ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],
    en: ["January","February","March","April","May","June","July","August","September","October","November","December"]
  };
  const weekdays = {
    pt: ["DOM","SEG","TER","QUA","QUI","SEX","SÁB"],
    en: ["SUN","MON","TUE","WED","THU","FRI","SAT"]
  };

  // "Today" anchor (matches the demo dates: late May 2026)
  const NOW = new Date(2026, 4, 19, 10, 0, 0); // May 19, 2026 10:00

  function parseAppt(a) {
    const [y, m, d] = a.date.split("-").map(Number);
    const [hh, mm] = a.time.split(":").map(Number);
    return new Date(y, m - 1, d, hh, mm);
  }
  function fmtUntil(date) {
    const ms = date - NOW;
    if (ms <= 0) return null;
    const mins = Math.round(ms / 60000);
    const hours = Math.round(mins / 60);
    const days  = Math.round(hours / 24);
    if (days >= 2) return `${t.in_label} ${days} ${t.days_short}`;
    if (days === 1) return t.tomorrow;
    if (hours >= 1) return `${t.in_label} ${hours} ${t.hours_short}`;
    return `${t.in_label} ${mins} ${t.minutes_short}`;
  }

  // Build derived lists, sorted
  const enriched = data.appointments.map(a => {
    const dt = parseAppt(a);
    const pro = data.pros.find(p => p.id === a.proId);
    const service = (data.servicesByPro[a.proId] || []).find(s => s.id === a.serviceId);
    return { ...a, dt, pro, service };
  });
  const upcoming  = enriched.filter(a => a.status === "upcoming").sort((x, y) => x.dt - y.dt);
  const past      = enriched.filter(a => a.status === "done").sort((x, y) => y.dt - x.dt);
  const cancelled = enriched.filter(a => a.status === "cancelled").sort((x, y) => y.dt - x.dt);
  const all       = enriched.slice().sort((x, y) => y.dt - x.dt);

  const next = upcoming[0];

  // Stats
  const thisMonth = NOW.getMonth(), thisYear = NOW.getFullYear();
  const totalSpent = enriched
    .filter(a => a.status === "done" && a.dt.getMonth() === thisMonth && a.dt.getFullYear() === thisYear && a.service)
    .reduce((s, a) => s + (a.service?.price || 0), 0);
  const allTimeSpent = enriched
    .filter(a => a.status === "done" && a.service)
    .reduce((s, a) => s + (a.service?.price || 0), 0);
  const uniquePros = new Set(enriched.filter(a => a.status !== "cancelled").map(a => a.proId)).size;

  // Pick the active list
  let items = [];
  if (tab === "upcoming") items = upcoming;
  else if (tab === "past") items = past;
  else if (tab === "cancelled") items = cancelled;
  else items = all;

  // Group by month-year
  const groups = [];
  const byKey = {};
  items.forEach(a => {
    const key = a.dt.getFullYear() + "-" + a.dt.getMonth();
    if (!byKey[key]) {
      byKey[key] = { key, label: monthsLong[lang][a.dt.getMonth()] + " " + a.dt.getFullYear(), items: [] };
      groups.push(byKey[key]);
    }
    byKey[key].items.push(a);
  });

  const emptyStates = {
    upcoming:  { title: t.empty_upcoming_title,  sub: t.empty_upcoming_sub,  cta: t.find_pro },
    past:      { title: t.empty_past_title,      sub: t.empty_past_sub,      cta: null },
    cancelled: { title: t.empty_cancelled_title, sub: t.empty_cancelled_sub, cta: null },
    all:       { title: t.empty_upcoming_title,  sub: t.empty_upcoming_sub,  cta: t.find_pro }
  };

  return (
    <div>
      <h1 className="page-title">{t.bookings_title}</h1>
      <p className="page-sub">{t.bookings_sub}</p>

      {/* Next-up hero */}
      {next && (
        <div className="next-up" style={{ background: next.pro.color || "linear-gradient(135deg, var(--c-pink), var(--accent))" }}>
          {next.pro.image && <img className="next-up-img" src={next.pro.image} alt="" />}
          <div className="next-up-shapes" aria-hidden="true">
            <span className="nu-shape s1" />
            <span className="nu-shape s2" />
            <span className="nu-shape s3" />
          </div>

          <div className="next-up-body">
            <div className="next-up-tag">{Icons.sparkle} <span>{t.next_up}</span></div>

            <div className="next-up-main">
              <div className="next-up-date">
                <div className="nu-weekday">{weekdays[lang][next.dt.getDay()]}</div>
                <div className="nu-day">{next.dt.getDate()}</div>
                <div className="nu-month">{months[lang][next.dt.getMonth()]}</div>
              </div>

              <div className="next-up-text">
                <div className="nu-service">
                  {next.service ? (lang === "pt" ? next.service.name_pt : next.service.name_en) : "—"}
                </div>
                <div className="nu-pro-row">
                  <div className="avatar sm" style={{ background: "rgba(255,255,255,.22)", color: "#fff" }}>{next.pro.emoji}</div>
                  <div>
                    <div className="nu-pro-name">{next.pro.name}</div>
                    <div className="nu-pro-role">{lang === "pt" ? next.pro.role_pt : next.pro.role_en}</div>
                  </div>
                </div>
                <div className="nu-meta-row">
                  <span className="nu-pill">{Icons.clock}<span>{next.time} · {next.service?.duration} min</span></span>
                  {(next.location_pt || next.location_en) && (
                    <span className="nu-pill">{Icons.mapPin}<span>{lang === "pt" ? next.location_pt : next.location_en}</span></span>
                  )}
                  <span className="nu-pill">{Icons.dollar}<span>{next.service?.price}€</span></span>
                </div>
              </div>

              <div className="next-up-aside">
                <div className="nu-countdown">
                  <div className="nu-countdown-num">{fmtUntil(next.dt)}</div>
                  <span className="nu-confirmed">{Icons.check}<span>{t.confirmed_badge}</span></span>
                </div>
              </div>
            </div>

            <div className="next-up-actions">
              <button className="nu-btn primary" onClick={() => onChat(next.proId)}>{Icons.chat}<span>{t.open_chat}</span></button>
              <button className="nu-btn" onClick={() => onPickPro(next.proId)}>{Icons.calendar}<span>{t.reschedule}</span></button>
              <button className="nu-btn">{Icons.mapPin}<span>{t.directions}</span></button>
              <button className="nu-btn">{Icons.plus}<span>{t.add_calendar}</span></button>
              <button className="nu-btn danger">{Icons.x}<span>{t.cancel}</span></button>
            </div>
          </div>
        </div>
      )}

      {/* Stat strip */}
      <div className="booking-stats">
        <div className="bk-stat">
          <div className="bk-stat-icon" style={{ background: "color-mix(in oklch, var(--accent) 12%, var(--surface))", color: "var(--accent)" }}>{Icons.calendar}</div>
          <div>
            <div className="bk-stat-val">{upcoming.length}</div>
            <div className="bk-stat-label">{t.stat_upcoming}</div>
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
          <div className="bk-stat-icon" style={{ background: "color-mix(in oklch, var(--c-pink) 18%, var(--surface))", color: "var(--c-pink)" }}>{Icons.user}</div>
          <div>
            <div className="bk-stat-val">{uniquePros}</div>
            <div className="bk-stat-label">{t.stat_pros}</div>
          </div>
        </div>
        <div className="bk-stat">
          <div className="bk-stat-icon" style={{ background: "color-mix(in oklch, var(--c-amber) 22%, var(--surface))", color: "var(--c-amber)" }}>{Icons.dollar}</div>
          <div>
            <div className="bk-stat-val">{allTimeSpent}€</div>
            <div className="bk-stat-label">{t.stat_spent}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={"tab" + (tab === "upcoming" ? " active" : "")} onClick={() => setTab("upcoming")}>
          {t.tab_upcoming} <span className="tab-count">{upcoming.length}</span>
        </button>
        <button className={"tab" + (tab === "past" ? " active" : "")} onClick={() => setTab("past")}>
          {t.tab_past} <span className="tab-count">{past.length}</span>
        </button>
        <button className={"tab" + (tab === "cancelled" ? " active" : "")} onClick={() => setTab("cancelled")}>
          {t.tab_cancelled} <span className="tab-count">{cancelled.length}</span>
        </button>
        <button className={"tab" + (tab === "all" ? " active" : "")} onClick={() => setTab("all")}>
          {t.tab_all} <span className="tab-count">{all.length}</span>
        </button>
      </div>

      {/* List grouped by month */}
      {items.length === 0 && (
        <div className="bk-empty">
          <div className="bk-empty-glyph">{Icons.calendar}</div>
          <div className="bk-empty-title">{emptyStates[tab].title}</div>
          <div className="bk-empty-sub">{emptyStates[tab].sub}</div>
          {emptyStates[tab].cta && (
            <button className="btn btn-primary btn-lg" onClick={onFindPro}>{emptyStates[tab].cta} {Icons.arrowR}</button>
          )}
        </div>
      )}

      {groups.map(g => (
        <div key={g.key} className="bk-group">
          <div className="bk-group-label">{g.label}</div>
          <div className="bk-list">
            {g.items.map(a => {
              const statusCls = a.status === "done" ? "done" : a.status === "upcoming" ? "up" : "cancel";
              const statusLabel = a.status === "done" ? t.status_done : a.status === "upcoming" ? t.status_upcoming : t.status_cancel;
              const until = a.status === "upcoming" ? fmtUntil(a.dt) : null;
              return (
                <div key={a.id} className={"booking-card " + statusCls}>
                  <div className="bc-date">
                    <div className="bc-weekday">{weekdays[lang][a.dt.getDay()]}</div>
                    <div className="bc-day">{a.dt.getDate()}</div>
                    <div className="bc-month">{months[lang][a.dt.getMonth()]}</div>
                  </div>

                  <div className="bc-divider" style={{ background: a.pro.color }} />

                  <div className="bc-body">
                    <div className="bc-head">
                      <div>
                        <div className="bc-service">
                          {a.service ? (lang === "pt" ? a.service.name_pt : a.service.name_en) : "—"}
                        </div>
                        <div className="bc-pro">
                          <div className="avatar sm" style={{ background: a.pro.color }}>{a.pro.emoji}</div>
                          <span className="bc-pro-name">{a.pro.name}</span>
                          <span className="bc-pro-role">· {lang === "pt" ? a.pro.role_pt : a.pro.role_en}</span>
                        </div>
                      </div>
                      <span className={"history-status " + statusCls}>{statusLabel}</span>
                    </div>

                    <div className="bc-meta">
                      <span>{Icons.clock}<span>{a.time} · {a.service?.duration} min</span></span>
                      {(a.location_pt || a.location_en) && (
                        <span>{Icons.mapPin}<span>{lang === "pt" ? a.location_pt : a.location_en}</span></span>
                      )}
                      <span>{Icons.dollar}<span>{a.service?.price}€</span></span>
                      {until && <span className="bc-until">{until}</span>}
                      {a.status === "done" && a.rating && (
                        <span className="bc-rating">{[0,1,2,3,4].map(i => (
                          <span key={i} style={{ color: i < a.rating ? "var(--c-amber)" : "var(--line)" }}>★</span>
                        ))}</span>
                      )}
                    </div>

                    {a.note_pt && a.status === "upcoming" && (
                      <div className="bc-note">
                        <span className="bc-note-label">{t.notes_label}</span>
                        <span>{lang === "pt" ? a.note_pt : a.note_en}</span>
                      </div>
                    )}
                  </div>

                  <div className="bc-actions">
                    {a.status === "upcoming" && (
                      <>
                        <button className="btn btn-ghost bc-btn" onClick={() => onChat(a.proId)}>{Icons.chat}<span>{t.open_chat}</span></button>
                        <button className="btn btn-outline bc-btn" onClick={() => onPickPro(a.proId)}>{t.reschedule}</button>
                        <button className="btn btn-ghost bc-btn bc-btn-danger">{t.cancel}</button>
                      </>
                    )}
                    {a.status === "done" && (
                      <>
                        <button className="btn btn-ghost bc-btn">{Icons.star}<span>{t.review_again}</span></button>
                        <button className="btn btn-outline bc-btn">{t.receipt}</button>
                        <button className="btn btn-primary bc-btn" onClick={() => onPickPro(a.proId)}>{t.rebook}</button>
                      </>
                    )}
                    {a.status === "cancelled" && (
                      <button className="btn btn-outline bc-btn" onClick={() => onPickPro(a.proId)}>{t.rebook}</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============ HISTORY (legacy — kept for backward compatibility) ============
function HistoryScreen({ t, lang, onPickPro, onChat }) {
  const data = window.GW_DATA;
  const [tab, setTab] = useStateC("upcoming");
  const months = { pt: ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"], en: ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"] };
  const items = data.appointments.filter(a => {
    if (tab === "upcoming") return a.status === "upcoming";
    if (tab === "past") return a.status === "done";
    return true;
  });
  return (
    <div>
      <h1 className="page-title">{t.history_title}</h1>
      <p className="page-sub">{t.history_sub}</p>

      <div className="tabs">
        <button className={"tab" + (tab === "upcoming" ? " active" : "")} onClick={() => setTab("upcoming")}>{t.tab_upcoming}</button>
        <button className={"tab" + (tab === "past" ? " active" : "")} onClick={() => setTab("past")}>{t.tab_past}</button>
        <button className={"tab" + (tab === "all" ? " active" : "")} onClick={() => setTab("all")}>{t.tab_all}</button>
      </div>

      <div className="history-list">
        {items.length === 0 && (
          <div className="card" style={{ textAlign: "center", color: "var(--muted)" }}>
            {lang === "pt" ? "Nada por aqui ainda." : "Nothing here yet."}
          </div>
        )}
        {items.map(a => {
          const pro = data.pros.find(p => p.id === a.proId);
          const service = data.servicesByPro[a.proId].find(s => s.id === a.serviceId);
          const [y, m, d] = a.date.split("-").map(Number);
          const statusCls = a.status === "done" ? "done" : a.status === "upcoming" ? "up" : "cancel";
          const statusLabel = a.status === "done" ? t.status_done : a.status === "upcoming" ? t.status_upcoming : t.status_cancel;
          return (
            <div key={a.id} className="history-row">
              <div className="date-block">
                <div className="d">{d}</div>
                <div className="m">{months[lang][m - 1]}</div>
              </div>
              <div className="history-body">
                <div className="name">{service ? (lang === "pt" ? service.name_pt : service.name_en) : "—"} · {pro.name}</div>
                <div className="meta">{a.time} · {service?.duration} min · {service?.price}€</div>
                <div style={{ marginTop: 6 }}>
                  <span className={"history-status " + statusCls}>{statusLabel}</span>
                </div>
              </div>
              <div className="history-price">{service?.price}€</div>
              <div className="history-actions">
                {a.status === "upcoming" && (
                  <>
                    <button className="btn btn-ghost" style={{ padding: "8px 12px", fontSize: 12 }} onClick={() => onChat(a.proId)}>{Icons.chat}</button>
                    <button className="btn btn-outline" style={{ padding: "8px 12px", fontSize: 12 }}>{t.details}</button>
                  </>
                )}
                {a.status === "done" && (
                  <>
                    <button className="btn btn-ghost" style={{ padding: "8px 12px", fontSize: 12 }}>{Icons.star} {t.review_again}</button>
                    <button className="btn btn-primary" style={{ padding: "8px 12px", fontSize: 12 }} onClick={() => onPickPro(a.proId)}>{t.rebook}</button>
                  </>
                )}
                {a.status === "cancelled" && (
                  <button className="btn btn-outline" style={{ padding: "8px 12px", fontSize: 12 }} onClick={() => onPickPro(a.proId)}>{t.rebook}</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ NOTIFICATIONS ============
function NotificationsScreen({ t, lang, onMarkAllRead, notifications }) {
  return (
    <div>
      <div className="spread mb-3">
        <div>
          <h1 className="page-title">{t.notif_title}</h1>
          <p className="page-sub" style={{ marginBottom: 0 }}>{t.notif_sub}</p>
        </div>
        <button className="btn btn-ghost" onClick={onMarkAllRead}>{Icons.check} {t.mark_all_read}</button>
      </div>
      <div className="notif-list">
        {notifications.map(n => (
          <div key={n.id} className={"notif" + (n.unread ? " unread" : "")}>
            <div className="notif-icon" style={{ background: "var(--accent-soft)" }}>{n.icon}</div>
            <div className="notif-body">
              <div className="notif-title">{lang === "pt" ? n.title_pt : n.title_en}</div>
              <div className="notif-text">{lang === "pt" ? n.text_pt : n.text_en}</div>
              <div className="notif-time">{lang === "pt" ? n.time_pt : n.time_en}</div>
            </div>
            <button className="icon-btn" style={{ width: 32, height: 32, border: "none", background: "transparent" }}>{Icons.more}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ CHAT ============
function ChatScreen({ t, lang, role, initialProId, onPickPro }) {
  const data = window.GW_DATA;
  const allChats = Object.keys(data.chats).map(pid => {
    const pro = data.pros.find(p => p.id === pid);
    const msgs = data.chats[pid];
    return { pid, pro, last: msgs[msgs.length - 1] };
  });
  const [active, setActive] = useStateC(initialProId || allChats[0]?.pid);
  const [draft, setDraft] = useStateC("");
  const [messages, setMessages] = useStateC(() => {
    const copy = {};
    for (const k of Object.keys(data.chats)) copy[k] = [...data.chats[k]];
    return copy;
  });
  const bodyRef = useRefC(null);

  const activePro = data.pros.find(p => p.id === active);
  const thread = messages[active] || [];

  useEffectC(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [active, thread.length]);

  function send() {
    if (!draft.trim()) return;
    const now = new Date();
    const time = now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");
    setMessages(m => ({ ...m, [active]: [...m[active], { from: "me", text_pt: draft, text_en: draft, time }] }));
    setDraft("");
    setTimeout(() => {
      const replies_pt = ["Anotado! 💜", "Pode deixar comigo!", "Combinado 😊", "Te aviso assim que confirmar."];
      const replies_en = ["Got it! 💜", "Leave it with me!", "Deal 😊", "I'll let you know once confirmed."];
      const idx = Math.floor(Math.random() * replies_pt.length);
      setMessages(m => ({ ...m, [active]: [...m[active], { from: "them", text_pt: replies_pt[idx], text_en: replies_en[idx], time }] }));
    }, 1200);
  }

  return (
    <div>
      <h1 className="page-title" style={{ marginBottom: 16 }}>{t.chat_title}</h1>
      <div className="chat">
        <div className="chat-list">
          {allChats.map(c => (
            <div key={c.pid} className={"chat-item" + (active === c.pid ? " active" : "")} onClick={() => setActive(c.pid)}>
              <div className="avatar sm" style={{ background: c.pro.color }}>{c.pro.emoji}</div>
              <div className="chat-item-body">
                <div className="chat-item-name"><span>{c.pro.name}</span><span className="chat-item-time">{c.last.time}</span></div>
                <div className="chat-item-preview">{lang === "pt" ? c.last.text_pt : c.last.text_en}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="chat-thread">
          <div className="chat-head">
            <div className="avatar sm" style={{ background: activePro.color }}>{activePro.emoji}</div>
            <div style={{ flex: 1 }}>
              <div className="chat-head-name">{activePro.name}</div>
              <div className="chat-head-status">{t.online}</div>
            </div>
            <button className="icon-btn" onClick={() => onPickPro && onPickPro(active)}>{Icons.user}</button>
            <button className="icon-btn">{Icons.phone}</button>
          </div>
          <div className="chat-body" ref={bodyRef}>
            <div className="chat-day">{t.today}</div>
            {thread.map((m, i) => (
              <div key={i} className={"bubble " + m.from}>
                {lang === "pt" ? m.text_pt : m.text_en}
                <div className="bubble-time">{m.time}</div>
              </div>
            ))}
          </div>
          <div className="chat-compose">
            <button className="icon-btn" style={{ border: "none" }}>{Icons.plus}</button>
            <input
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder={t.chat_send_placeholder}
            />
            <button className="send-btn" onClick={send}>{Icons.send}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ MY PROFILE ============
function MyProfileScreen({ t, lang, role, onEdit, onChat, onPickPro, onBookings }) {
  const data = window.GW_DATA;
  const isClient = role === "client";
  const user = isClient
    ? {
        name: "Ana Costa",
        email: "ana.costa@email.com",
        phone: "+351 919 222 555",
        location_pt: "Lisboa, Portugal",
        location_en: "Lisbon, Portugal",
        initials: "AC",
        memberSince_pt: "Março 2024",
        memberSince_en: "March 2024",
        id: "GW-09241",
        bio_pt: "Sempre em busca de profissionais incríveis para tornar a rotina mais leve. Adoro descobrir lugares novos.",
        bio_en: "Always on the lookout for great pros to make life lighter. I love discovering new places.",
        cover: "linear-gradient(135deg, #FF6FB5, #7C3AED)"
      }
    : {
        name: "Marina Costa",
        email: "marina@growork.app",
        phone: "+351 912 345 678",
        location_pt: "Lisboa, Portugal",
        location_en: "Lisbon, Portugal",
        initials: "MC",
        memberSince_pt: "Julho 2022",
        memberSince_en: "July 2022",
        id: "GW-PRO-014",
        bio_pt: "Especialista em coloração com 8 anos de experiência. Atendo no salão e a domicílio.",
        bio_en: "Color specialist with 8 years of experience. I work in the salon and at home.",
        cover: "linear-gradient(135deg, #7C3AED, #5BB8FF)"
      };

  // Pull demo stats from the user's data
  const userAppts = data.appointments;
  const upcoming = userAppts.filter(a => a.status === "upcoming").length;
  const done = userAppts.filter(a => a.status === "done").length;
  const favPros = data.pros.slice(0, 3);

  return (
    <div>
      <h1 className="page-title">{t.my_profile_title}</h1>
      <p className="page-sub">{t.my_profile_sub}</p>

      {/* Hero card */}
      <div className="my-profile-hero">
        <div className="my-profile-cover" style={{ background: user.cover }} />
        <div className="my-profile-body">
          <div className="avatar profile-avatar" style={{ background: user.cover, fontSize: 36 }}>{user.initials}</div>
          <div className="my-profile-info">
            <div className="my-profile-name-row">
              <h2>{user.name}</h2>
              <span className="my-profile-verified" title={t.verified}>{Icons.check} {t.verified}</span>
            </div>
            <div className="my-profile-meta">
              <span>{Icons.mapPin}<span>{lang === "pt" ? user.location_pt : user.location_en}</span></span>
              <span>{Icons.calendar}<span>{t.member_since} {lang === "pt" ? user.memberSince_pt : user.memberSince_en}</span></span>
              <span className="my-profile-id">#{user.id}</span>
            </div>
            <p className="my-profile-bio">{lang === "pt" ? user.bio_pt : user.bio_en}</p>

            <div className="my-profile-contacts">
              <a className="pil-contact" href={"tel:" + user.phone.replace(/\s/g, "")}>{Icons.phone}<span>{user.phone}</span></a>
              <span className="pil-divider" />
              <a className="pil-contact" href={"mailto:" + user.email}>{Icons.email}<span>{user.email}</span></a>
            </div>
          </div>
          <div className="my-profile-actions">
            <button className="btn btn-primary" onClick={onEdit}>{Icons.settings} {t.edit_profile}</button>
            <button className="btn btn-outline" onClick={onBookings}>{Icons.calendar} {t.view_bookings}</button>
          </div>
        </div>
      </div>

      {/* Stat strip */}
      <div className="booking-stats" style={{ marginTop: 22 }}>
        <div className="bk-stat">
          <div className="bk-stat-icon" style={{ background: "color-mix(in oklch, var(--accent) 12%, var(--surface))", color: "var(--accent)" }}>{Icons.calendar}</div>
          <div>
            <div className="bk-stat-val">{upcoming}</div>
            <div className="bk-stat-label">{t.stat_upcoming}</div>
          </div>
        </div>
        <div className="bk-stat">
          <div className="bk-stat-icon" style={{ background: "color-mix(in oklch, var(--c-mint) 18%, var(--surface))", color: "var(--c-mint)" }}>{Icons.check}</div>
          <div>
            <div className="bk-stat-val">{done}</div>
            <div className="bk-stat-label">{t.stat_done}</div>
          </div>
        </div>
        <div className="bk-stat">
          <div className="bk-stat-icon" style={{ background: "color-mix(in oklch, var(--c-pink) 18%, var(--surface))", color: "var(--c-pink)" }}>{Icons.heart}</div>
          <div>
            <div className="bk-stat-val">{favPros.length}</div>
            <div className="bk-stat-label">{t.favorites}</div>
          </div>
        </div>
        <div className="bk-stat">
          <div className="bk-stat-icon" style={{ background: "color-mix(in oklch, var(--c-amber) 22%, var(--surface))", color: "var(--c-amber)" }}>{Icons.star}</div>
          <div>
            <div className="bk-stat-val">4.9</div>
            <div className="bk-stat-label">{t.rating_label}</div>
          </div>
        </div>
      </div>

      <div className="my-profile-grid">
        {/* Favorites */}
        <div className="info-card">
          <div className="info-card-title">{t.favorites}</div>
          <div className="fav-list">
            {favPros.map(p => (
              <div key={p.id} className="fav-row" onClick={() => onPickPro(p.id)}>
                <div className="fav-thumb" style={{ background: p.color }}>
                  {p.image && <img src={p.image} alt="" />}
                  <span>{p.emoji}</span>
                </div>
                <div className="fav-body">
                  <div className="fav-name">{p.name}</div>
                  <div className="fav-meta">{lang === "pt" ? p.role_pt : p.role_en} · ★ {p.rating.toFixed(1)}</div>
                </div>
                <button className="btn btn-ghost" style={{ padding: "6px 10px", fontSize: 12 }} onClick={(e) => { e.stopPropagation(); onChat(p.id); }}>{Icons.chat}</button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="info-card">
          <div className="info-card-title">{t.recent_activity}</div>
          <div className="activity-list">
            {userAppts.slice(0, 4).map(a => {
              const pro = data.pros.find(p => p.id === a.proId);
              const service = (data.servicesByPro[a.proId] || []).find(s => s.id === a.serviceId);
              const [y, m, d] = a.date.split("-").map(Number);
              const months = lang === "pt" ? ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"] : ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
              const statusCls = a.status === "done" ? "done" : a.status === "upcoming" ? "up" : "cancel";
              return (
                <div key={a.id} className="activity-row">
                  <div className="activity-date">
                    <div className="activity-day">{d}</div>
                    <div className="activity-month">{months[m - 1]}</div>
                  </div>
                  <div className="activity-body">
                    <div className="activity-title">{service ? (lang === "pt" ? service.name_pt : service.name_en) : "—"}</div>
                    <div className="activity-meta">{pro.name} · {a.time}</div>
                  </div>
                  <span className={"history-status " + statusCls}>
                    {a.status === "done" ? t.status_done : a.status === "upcoming" ? t.status_upcoming : t.status_cancel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badges */}
        <div className="info-card">
          <div className="info-card-title">{t.badges_label}</div>
          <div className="badges-row">
            <div className="badge-chip" style={{ background: "color-mix(in oklch, var(--accent) 14%, var(--surface))", color: "var(--accent)" }}>
              <span className="badge-ico">✨</span>
              <div>
                <div className="badge-name">{t.badge_explorer}</div>
                <div className="badge-sub">{lang === "pt" ? "5+ categorias" : "5+ categories"}</div>
              </div>
            </div>
            <div className="badge-chip" style={{ background: "color-mix(in oklch, var(--c-mint) 18%, var(--surface))", color: "color-mix(in oklch, var(--c-mint) 80%, black)" }}>
              <span className="badge-ico">🏆</span>
              <div>
                <div className="badge-name">{t.badge_loyal}</div>
                <div className="badge-sub">{lang === "pt" ? "10+ sessões" : "10+ sessions"}</div>
              </div>
            </div>
            <div className="badge-chip" style={{ background: "color-mix(in oklch, var(--c-pink) 16%, var(--surface))", color: "color-mix(in oklch, var(--c-pink) 80%, black)" }}>
              <span className="badge-ico">💌</span>
              <div>
                <div className="badge-name">{t.badge_promoter}</div>
                <div className="badge-sub">{lang === "pt" ? "3 amigos" : "3 friends"}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="info-card">
          <div className="info-card-title">{t.quick_actions}</div>
          <div className="qa-list">
            <button className="qa-row" onClick={onEdit}>
              <div className="qa-ico">{Icons.user}</div>
              <span>{t.edit_profile}</span>
              {Icons.arrowR}
            </button>
            <button className="qa-row" onClick={onBookings}>
              <div className="qa-ico">{Icons.calendar}</div>
              <span>{t.view_bookings}</span>
              {Icons.arrowR}
            </button>
            <button className="qa-row" onClick={onEdit}>
              <div className="qa-ico">{Icons.settings}</div>
              <span>{t.open_settings}</span>
              {Icons.arrowR}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ SETTINGS ============
function SettingsScreen({ t, lang, role, tweaks, setTweak, setLang, onBack, onNav }) {
  const [emailNotif, setEmailNotif] = useStateC(true);
  const [pushNotif, setPushNotif] = useStateC(true);
  const [smsNotif, setSmsNotif] = useStateC(false);
  const [marketing, setMarketing] = useStateC(false);
  const userName = role === "client" ? "Ana Costa" : "Marina Costa";
  const userMail = role === "client" ? "ana.costa@email.com" : "marina@growork.app";

  function Row({ icon, title, sub, control, last, onClick, disabled }) {
    const Element = onClick && !disabled ? "button" : "div";
    return (
      <Element
        className={"settings-row" + (last ? " last" : "") + (onClick && !disabled ? " clickable" : "") + (disabled ? " disabled" : "")}
        onClick={onClick && !disabled ? onClick : undefined}
      >
        <div className="settings-row-ico">{icon}</div>
        <div className="settings-row-body">
          <div className="settings-row-title">
            {title}
            {disabled && <span className="settings-soon">{lang === "pt" ? "Em breve" : "Soon"}</span>}
          </div>
          {sub && <div className="settings-row-sub">{sub}</div>}
        </div>
        <div className="settings-row-control">{control}</div>
      </Element>
    );
  }
  function Toggle({ value, onChange }) {
    return (
      <button className={"um-switch" + (value ? " on" : "")} onClick={() => onChange(!value)}>
        <span className="um-switch-knob" />
      </button>
    );
  }

  return (
    <div>
      <button className="btn btn-ghost mb-4" onClick={onBack} style={{ padding: "8px 14px", fontSize: 13 }}>
        {Icons.arrowL}<span>{t.back}</span>
      </button>
      <h1 className="page-title">{t.menu_settings}</h1>
      <p className="page-sub">{lang === "pt" ? "Ajuste preferências, notificações e aparência da sua conta." : "Adjust preferences, notifications and the look of your account."}</p>

      <div className="settings-grid">
        {/* Account */}
        <div className="settings-card">
          <div className="settings-card-title">{lang === "pt" ? "Conta" : "Account"}</div>
          <Row icon={Icons.user}    title={lang === "pt" ? "Informações pessoais" : "Personal info"}  sub={lang === "pt" ? "Nome, telefone, endereço" : "Name, phone, address"} control={Icons.arrowR} onClick={() => onNav && onNav("settings-personal")} />
          <Row icon={Icons.dollar}  title={lang === "pt" ? "Pagamentos" : "Payments"}                 sub={lang === "pt" ? "Cartões e recibos" : "Cards and receipts"}            control={Icons.arrowR} disabled />
          <Row icon={Icons.settings} title={lang === "pt" ? "Privacidade & dados" : "Privacy & data"} sub={lang === "pt" ? "Quem vê suas reservas" : "Who can see your bookings"} control={Icons.arrowR} onClick={() => onNav && onNav("settings-privacy")} last />
        </div>

        {/* Notifications */}
        <div className="settings-card">
          <div className="settings-card-title">{lang === "pt" ? "Notificações" : "Notifications"}</div>
          <Row icon={Icons.bell}  title={lang === "pt" ? "Push" : "Push"}     sub={lang === "pt" ? "Avisos em tempo real" : "Real-time alerts"}   control={<Toggle value={pushNotif} onChange={setPushNotif} />} />
          <Row icon={Icons.chat}  title={lang === "pt" ? "E-mail" : "Email"}  sub={lang === "pt" ? "Resumo semanal e confirmações" : "Weekly digest and confirmations"} control={<Toggle value={emailNotif} onChange={setEmailNotif} />} />
          <Row icon={Icons.phone} title={lang === "pt" ? "SMS" : "SMS"}       sub={lang === "pt" ? "Apenas para lembretes urgentes" : "Urgent reminders only"} control={<Toggle value={smsNotif} onChange={setSmsNotif} />} last />
        </div>

        {/* Preferences */}
        <div className="settings-card">
          <div className="settings-card-title">{lang === "pt" ? "Preferências" : "Preferences"}</div>
          <Row icon={Icons.compass} title={lang === "pt" ? "Idioma" : "Language"} sub={lang === "pt" ? "Português / English" : "English / Português"} control={
            <div className="lang-toggle">
              <button className={lang === "pt" ? "active" : ""} onClick={() => setLang("pt")}>PT</button>
              <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
            </div>
          } last />
        </div>

        {/* Danger zone */}
        <div className="settings-card danger">
          <div className="settings-card-title">{lang === "pt" ? "Zona de risco" : "Danger zone"}</div>
          <Row icon={Icons.x} title={lang === "pt" ? "Excluir conta" : "Delete account"} sub={lang === "pt" ? "Apaga todos os seus dados em 30 dias." : "Deletes all your data in 30 days."} control={
            <button className="btn btn-outline" style={{ color: "var(--c-coral)", borderColor: "color-mix(in oklch, var(--c-coral) 30%, var(--line))", padding: "8px 14px", fontSize: 13 }}>{lang === "pt" ? "Excluir" : "Delete"}</button>
          } last />
        </div>
      </div>
    </div>
  );
}

// ============ PERSONAL INFO ============
function PersonalInfoScreen({ t, lang, role, onBack }) {
  const isClient = role === "client";
  const [form, setForm] = useStateC({
    firstName: isClient ? "Ana" : "Marina",
    lastName: isClient ? "Costa" : "Costa",
    email: isClient ? "ana.costa@email.com" : "marina@growork.app",
    phone: isClient ? "+351 919 222 555" : "+351 912 345 678",
    dob: "1992-08-14",
    address: isClient ? "R. da Boavista 88, Lisboa" : "R. das Flores 24, Lisboa",
    nif: "284 712 990",
    language: lang,
    gender: lang === "pt" ? "Prefere não dizer" : "Prefer not to say"
  });
  const [saved, setSaved] = useStateC(false);

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); setSaved(false); }
  function save() { setSaved(true); setTimeout(() => setSaved(false), 2500); }

  return (
    <div>
      <button className="btn btn-ghost mb-4" onClick={onBack} style={{ padding: "8px 14px", fontSize: 13 }}>
        {Icons.arrowL}<span>{lang === "pt" ? "Configurações" : "Settings"}</span>
      </button>
      <h1 className="page-title">{lang === "pt" ? "Informações pessoais" : "Personal info"}</h1>
      <p className="page-sub">{lang === "pt" ? "Mantenha seus dados atualizados para uma experiência sem fricção." : "Keep your details up to date for a smooth experience."}</p>

      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-title">{lang === "pt" ? "Dados pessoais" : "Personal data"}</div>
          <div className="form-grid">
            <Field label={lang === "pt" ? "Nome" : "First name"}><input value={form.firstName} onChange={e => set("firstName", e.target.value)} /></Field>
            <Field label={lang === "pt" ? "Sobrenome" : "Last name"}><input value={form.lastName} onChange={e => set("lastName", e.target.value)} /></Field>
            <Field label={lang === "pt" ? "Data de nascimento" : "Date of birth"}><input type="date" value={form.dob} onChange={e => set("dob", e.target.value)} /></Field>
            <Field label={lang === "pt" ? "Género" : "Gender"}>
              <select value={form.gender} onChange={e => set("gender", e.target.value)}>
                <option>{lang === "pt" ? "Feminino" : "Female"}</option>
                <option>{lang === "pt" ? "Masculino" : "Male"}</option>
                <option>{lang === "pt" ? "Não-binário" : "Non-binary"}</option>
                <option>{lang === "pt" ? "Prefere não dizer" : "Prefer not to say"}</option>
              </select>
            </Field>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-title">{lang === "pt" ? "Contato" : "Contact"}</div>
          <div className="form-grid">
            <Field label={lang === "pt" ? "E-mail" : "Email"}><input type="email" value={form.email} onChange={e => set("email", e.target.value)} /></Field>
            <Field label={lang === "pt" ? "Telefone" : "Phone"}><input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} /></Field>
            <Field label={lang === "pt" ? "Endereço" : "Address"} full><input value={form.address} onChange={e => set("address", e.target.value)} /></Field>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-title">{lang === "pt" ? "Fiscal" : "Tax"}</div>
          <div className="form-grid">
            <Field label={lang === "pt" ? "NIF" : "Tax ID"}><input value={form.nif} onChange={e => set("nif", e.target.value)} /></Field>
            <Field label={lang === "pt" ? "Idioma da conta" : "Account language"}>
              <select value={form.language} onChange={e => set("language", e.target.value)}>
                <option value="pt">Português</option>
                <option value="en">English</option>
              </select>
            </Field>
          </div>
        </div>

        <div className="settings-card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div className="settings-row-title">{lang === "pt" ? "Salvar alterações" : "Save changes"}</div>
            <div className="settings-row-sub">
              {saved
                ? (lang === "pt" ? "Alterações salvas com sucesso." : "Changes saved successfully.")
                : (lang === "pt" ? "As alterações se aplicam imediatamente em todos os seus dispositivos." : "Changes apply immediately on all your devices.")}
            </div>
          </div>
          <button className="btn btn-primary btn-lg" onClick={save}>
            {saved ? Icons.check : Icons.send} {saved ? (lang === "pt" ? "Salvo" : "Saved") : (lang === "pt" ? "Salvar" : "Save")}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, full, children }) {
  return (
    <label className={"form-field" + (full ? " full" : "")}>
      <span className="form-label">{label}</span>
      {children}
    </label>
  );
}

// ============ PRIVACY & DATA ============
function PrivacyScreen({ t, lang, onBack, onNav }) {
  const [shareWithPros, setShareWithPros] = useStateC(true);
  const [analytics, setAnalytics] = useStateC(true);
  const [marketing, setMarketing] = useStateC(false);
  const [twoFA, setTwoFA] = useStateC(false);
  const [loginAlerts, setLoginAlerts] = useStateC(true);

  function Toggle({ value, onChange }) {
    return (
      <button className={"um-switch" + (value ? " on" : "")} onClick={() => onChange(!value)}>
        <span className="um-switch-knob" />
      </button>
    );
  }
  function Row({ icon, title, sub, control, last, danger, onClick }) {
    const Element = onClick ? "button" : "div";
    return (
      <Element
        className={"settings-row" + (last ? " last" : "") + (danger ? " danger" : "") + (onClick ? " clickable" : "")}
        onClick={onClick}
      >
        <div className="settings-row-ico">{icon}</div>
        <div className="settings-row-body">
          <div className="settings-row-title">{title}</div>
          {sub && <div className="settings-row-sub">{sub}</div>}
        </div>
        <div className="settings-row-control">{control}</div>
      </Element>
    );
  }

  return (
    <div>
      <button className="btn btn-ghost mb-4" onClick={onBack} style={{ padding: "8px 14px", fontSize: 13 }}>
        {Icons.arrowL}<span>{lang === "pt" ? "Configurações" : "Settings"}</span>
      </button>
      <h1 className="page-title">{lang === "pt" ? "Privacidade & dados" : "Privacy & data"}</h1>
      <p className="page-sub">{lang === "pt" ? "Controle como seus dados são usados e proteja a sua conta." : "Control how your data is used and protect your account."}</p>

      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-title">{lang === "pt" ? "Compartilhamento" : "Sharing"}</div>
          <Row icon={Icons.chat}    title={lang === "pt" ? "Compartilhar histórico" : "Share booking history"} sub={lang === "pt" ? "Permite que profissionais vejam suas sessões anteriores" : "Lets pros see your previous sessions"} control={<Toggle value={shareWithPros} onChange={setShareWithPros} />} last />
        </div>

        <div className="settings-card">
          <div className="settings-card-title">{lang === "pt" ? "Uso de dados" : "Data usage"}</div>
          <Row icon={Icons.chart}   title={lang === "pt" ? "Métricas e melhorias" : "Analytics & improvements"} sub={lang === "pt" ? "Ajuda a GroWork a evoluir — dados anonimizados" : "Helps GroWork improve — anonymized data"} control={<Toggle value={analytics} onChange={setAnalytics} />} />
          <Row icon={Icons.sparkle} title={lang === "pt" ? "Promoções e novidades" : "Offers and updates"} sub={lang === "pt" ? "Receba dicas, descontos e recomendações personalizadas" : "Tips, discounts and personalized recommendations"} control={<Toggle value={marketing} onChange={setMarketing} />} last />
        </div>

        <div className="settings-card">
          <div className="settings-card-title">{lang === "pt" ? "Segurança" : "Security"}</div>
          <Row icon={Icons.check} title={lang === "pt" ? "Verificação em duas etapas" : "Two-factor authentication"} sub={twoFA ? (lang === "pt" ? "Ativada — gerenciar método" : "Enabled — manage method") : (lang === "pt" ? "Configurar Magic Link ou MFA" : "Set up Magic Link or MFA")} control={
            <span className={"twofa-status " + (twoFA ? "on" : "off")}>{twoFA ? (lang === "pt" ? "Ativa" : "On") : (lang === "pt" ? "Inativa" : "Off")} {Icons.arrowR}</span>
          } onClick={() => onNav && onNav("settings-2fa")} />
          <Row icon={Icons.bell}  title={lang === "pt" ? "Alertas de novo login" : "New login alerts"}      sub={lang === "pt" ? "Avisar quando um novo dispositivo acessar sua conta" : "Notify when a new device signs in"} control={<Toggle value={loginAlerts} onChange={setLoginAlerts} />} last />
        </div>

        <div className="settings-card danger">
          <div className="settings-card-title">{lang === "pt" ? "Zona de risco" : "Danger zone"}</div>
          <Row icon={Icons.x} title={lang === "pt" ? "Excluir conta" : "Delete account"} sub={lang === "pt" ? "Apaga permanentemente sua conta e todos os dados em 30 dias." : "Permanently deletes your account and all data in 30 days."} control={
            <button className="btn btn-outline" style={{ color: "var(--c-coral)", borderColor: "color-mix(in oklch, var(--c-coral) 30%, var(--line))", padding: "8px 14px", fontSize: 13 }}>{lang === "pt" ? "Excluir" : "Delete"}</button>
          } last />
        </div>
      </div>
    </div>
  );
}

// ============ TWO-FACTOR ============
function TwoFactorScreen({ t, lang, onBack }) {
  const [method, setMethod] = useStateC("magic"); // 'magic' | 'mfa' | 'sms' | null
  const [enabled, setEnabled] = useStateC(false);
  const [step, setStep] = useStateC("choose"); // choose | setup-mfa | setup-magic | done
  const [code, setCode] = useStateC(["", "", "", "", "", ""]);
  const codeRefs = React.useRef([]);

  function setDigit(i, val) {
    const v = val.replace(/\D/g, "").slice(0, 1);
    setCode(c => {
      const next = c.slice();
      next[i] = v;
      return next;
    });
    if (v && codeRefs.current[i + 1]) codeRefs.current[i + 1].focus();
  }
  function verify() {
    if (code.every(d => d.length === 1)) {
      setEnabled(true);
      setStep("done");
    }
  }

  return (
    <div>
      <button className="btn btn-ghost mb-4" onClick={onBack} style={{ padding: "8px 14px", fontSize: 13 }}>
        {Icons.arrowL}<span>{lang === "pt" ? "Privacidade & dados" : "Privacy & data"}</span>
      </button>
      <h1 className="page-title">{lang === "pt" ? "Verificação em duas etapas" : "Two-factor authentication"}</h1>
      <p className="page-sub">{lang === "pt" ? "Adicione uma camada extra de proteção ao entrar na sua conta." : "Add an extra layer of security when signing in."}</p>

      {enabled && step === "done" && (
        <div className="twofa-banner success">
          <div className="twofa-banner-ico">{Icons.check}</div>
          <div>
            <div className="twofa-banner-title">{lang === "pt" ? "Verificação ativada" : "Two-factor enabled"}</div>
            <div className="twofa-banner-text">
              {method === "magic" && (lang === "pt" ? "Você receberá um Magic Link no e-mail a cada novo login." : "You'll receive a Magic Link by email on every new sign-in.")}
              {method === "mfa"   && (lang === "pt" ? "Use o código gerado pelo app autenticador no próximo login." : "Use the code from your authenticator app on the next sign-in.")}
              {method === "sms"   && (lang === "pt" ? "Enviaremos um código por SMS sempre que você entrar." : "We'll text you a code on every sign-in.")}
            </div>
          </div>
          <button className="btn btn-ghost" onClick={() => { setEnabled(false); setStep("choose"); setCode(["","","","","",""]); }}>
            {lang === "pt" ? "Desativar" : "Disable"}
          </button>
        </div>
      )}

      <div className="settings-grid">
        {step === "choose" && (
          <>
            <div className="settings-card">
              <div className="settings-card-title">{lang === "pt" ? "Escolha um método" : "Choose a method"}</div>

              <div className="twofa-methods">
                <label className={"twofa-method" + (method === "magic" ? " selected" : "")}>
                  <input type="radio" name="m" checked={method === "magic"} onChange={() => setMethod("magic")} />
                  <div className="twofa-method-ico magic">{Icons.email}</div>
                  <div className="twofa-method-body">
                    <div className="twofa-method-name">Magic Link</div>
                    <div className="twofa-method-sub">{lang === "pt" ? "Receba um link único por e-mail. Sem códigos para digitar." : "Get a one-time link by email. No codes to type."}</div>
                    <div className="twofa-method-tag">{lang === "pt" ? "Recomendado" : "Recommended"}</div>
                  </div>
                </label>

                <label className={"twofa-method" + (method === "mfa" ? " selected" : "")}>
                  <input type="radio" name="m" checked={method === "mfa"} onChange={() => setMethod("mfa")} />
                  <div className="twofa-method-ico mfa">{Icons.settings}</div>
                  <div className="twofa-method-body">
                    <div className="twofa-method-name">{lang === "pt" ? "App autenticador (MFA)" : "Authenticator app (MFA)"}</div>
                    <div className="twofa-method-sub">{lang === "pt" ? "Use Google Authenticator, 1Password ou Authy para gerar códigos de 6 dígitos." : "Use Google Authenticator, 1Password or Authy to generate 6-digit codes."}</div>
                    <div className="twofa-method-tag mfa">{lang === "pt" ? "Mais seguro" : "Strongest"}</div>
                  </div>
                </label>

                <label className={"twofa-method" + (method === "sms" ? " selected" : "")}>
                  <input type="radio" name="m" checked={method === "sms"} onChange={() => setMethod("sms")} />
                  <div className="twofa-method-ico sms">{Icons.phone}</div>
                  <div className="twofa-method-body">
                    <div className="twofa-method-name">SMS</div>
                    <div className="twofa-method-sub">{lang === "pt" ? "Receba um código de 6 dígitos por mensagem de texto." : "Get a 6-digit code by text message."}</div>
                  </div>
                </label>
              </div>

              <div className="twofa-actions">
                <button className="btn btn-primary btn-lg" onClick={() => setStep(method === "mfa" ? "setup-mfa" : "setup-magic")}>
                  {lang === "pt" ? "Continuar" : "Continue"} {Icons.arrowR}
                </button>
              </div>
            </div>

            <div className="settings-card twofa-info">
              <div className="settings-card-title">{lang === "pt" ? "Como funciona" : "How it works"}</div>
              <div className="twofa-info-grid">
                <div>
                  <div className="twofa-info-step">1</div>
                  <div className="twofa-info-title">{lang === "pt" ? "Você entra com a sua senha" : "You sign in with your password"}</div>
                  <div className="twofa-info-text">{lang === "pt" ? "Como hoje, com e-mail e senha." : "As you do today, with email and password."}</div>
                </div>
                <div>
                  <div className="twofa-info-step">2</div>
                  <div className="twofa-info-title">{lang === "pt" ? "Confirmação extra" : "Extra confirmation"}</div>
                  <div className="twofa-info-text">{lang === "pt" ? "Aprovamos pelo método escolhido (link, código MFA ou SMS)." : "We confirm via the method you chose (link, MFA code or SMS)."}</div>
                </div>
                <div>
                  <div className="twofa-info-step">3</div>
                  <div className="twofa-info-title">{lang === "pt" ? "Pronto!" : "All set!"}</div>
                  <div className="twofa-info-text">{lang === "pt" ? "Sua sessão fica segura por 30 dias neste dispositivo." : "Your session stays trusted for 30 days on this device."}</div>
                </div>
              </div>
            </div>
          </>
        )}

        {step === "setup-magic" && (
          <div className="settings-card">
            <div className="settings-card-title">Magic Link · {lang === "pt" ? "Configuração" : "Setup"}</div>
            <div className="twofa-magic">
              <div className="twofa-magic-ico">{Icons.email}</div>
              <h3 className="twofa-magic-title">{lang === "pt" ? "Enviamos um link para" : "We sent a link to"}</h3>
              <div className="twofa-magic-email">ana.costa@email.com</div>
              <div className="twofa-magic-text">
                {lang === "pt"
                  ? "Abra a mensagem no seu celular ou desktop e clique em \"Confirmar acesso\". O link expira em 10 minutos."
                  : "Open the message on your phone or desktop and tap \"Confirm access\". The link expires in 10 minutes."}
              </div>
              <div className="twofa-actions">
                <button className="btn btn-primary btn-lg" onClick={() => { setMethod("magic"); setEnabled(true); setStep("done"); }}>
                  {Icons.check} {lang === "pt" ? "Confirmei o link" : "I confirmed the link"}
                </button>
                <button className="btn btn-outline" onClick={() => setStep("choose")}>
                  {lang === "pt" ? "Voltar" : "Back"}
                </button>
              </div>
              <div className="twofa-magic-resend">
                {lang === "pt" ? "Não recebeu? " : "Didn't get it? "}
                <a href="#" onClick={(e) => e.preventDefault()}>{lang === "pt" ? "Reenviar em 0:45" : "Resend in 0:45"}</a>
              </div>
            </div>
          </div>
        )}

        {step === "setup-mfa" && (
          <div className="settings-card">
            <div className="settings-card-title">{lang === "pt" ? "App autenticador" : "Authenticator app"} · {lang === "pt" ? "Configuração" : "Setup"}</div>
            <div className="twofa-mfa">
              <div className="twofa-mfa-step">
                <div className="twofa-mfa-step-num">1</div>
                <div>
                  <div className="twofa-mfa-step-title">{lang === "pt" ? "Escaneie o QR code" : "Scan the QR code"}</div>
                  <div className="twofa-mfa-step-text">{lang === "pt" ? "Abra o seu app autenticador (Google Authenticator, 1Password, Authy)." : "Open your authenticator app (Google Authenticator, 1Password, Authy)."}</div>
                </div>
              </div>
              <div className="twofa-qr">
                <div className="twofa-qr-box" aria-label="QR code">
                  {/* Faux QR pattern */}
                  {Array.from({ length: 64 }).map((_, i) => {
                    const on = ((i * 37 + 11) % 7) > 3;
                    return <span key={i} className={"qr-cell" + (on ? " on" : "")} />;
                  })}
                  <div className="qr-corner tl" />
                  <div className="qr-corner tr" />
                  <div className="qr-corner bl" />
                </div>
                <div className="twofa-secret">
                  <div className="twofa-secret-label">{lang === "pt" ? "Ou digite a chave manualmente" : "Or enter the key manually"}</div>
                  <div className="twofa-secret-code">JBSWY3DPEHPK3PXP</div>
                  <button className="btn btn-outline" style={{ padding: "6px 12px", fontSize: 12, marginTop: 8 }}>{lang === "pt" ? "Copiar" : "Copy"}</button>
                </div>
              </div>

              <div className="twofa-mfa-step">
                <div className="twofa-mfa-step-num">2</div>
                <div style={{ flex: 1 }}>
                  <div className="twofa-mfa-step-title">{lang === "pt" ? "Digite o código de 6 dígitos" : "Enter the 6-digit code"}</div>
                  <div className="twofa-mfa-step-text">{lang === "pt" ? "O código muda a cada 30 segundos." : "The code changes every 30 seconds."}</div>
                  <div className="twofa-code">
                    {code.map((d, i) => (
                      <input
                        key={i}
                        ref={el => codeRefs.current[i] = el}
                        className="twofa-code-cell"
                        inputMode="numeric"
                        maxLength={1}
                        value={d}
                        onChange={e => setDigit(i, e.target.value)}
                        onKeyDown={e => {
                          if (e.key === "Backspace" && !d && codeRefs.current[i - 1]) codeRefs.current[i - 1].focus();
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="twofa-actions">
                <button className="btn btn-primary btn-lg" disabled={!code.every(d => d.length === 1)} onClick={() => { setMethod("mfa"); verify(); }} style={{ opacity: code.every(d => d.length === 1) ? 1 : 0.5 }}>
                  {Icons.check} {lang === "pt" ? "Verificar e ativar" : "Verify & enable"}
                </button>
                <button className="btn btn-outline" onClick={() => { setStep("choose"); setCode(["","","","","",""]); }}>
                  {lang === "pt" ? "Voltar" : "Back"}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === "done" && (
          <div className="settings-card">
            <div className="settings-card-title">{lang === "pt" ? "Códigos de recuperação" : "Recovery codes"}</div>
            <p className="settings-row-sub" style={{ marginBottom: 14 }}>
              {lang === "pt"
                ? "Guarde estes códigos num lugar seguro. Cada um pode ser usado uma única vez se você perder acesso ao seu método principal."
                : "Save these codes in a safe place. Each one can be used once if you lose access to your main method."}
            </p>
            <div className="twofa-recovery">
              {["A39F-7C2B", "E1D4-9A88", "K8M2-3PWL", "R5Y9-6XQH", "T2B7-FN1Z", "V4C8-J0KS"].map(c => (
                <code key={c}>{c}</code>
              ))}
            </div>
            <div className="twofa-actions">
              <button className="btn btn-outline">{lang === "pt" ? "Baixar como PDF" : "Download as PDF"}</button>
              <button className="btn btn-outline">{lang === "pt" ? "Copiar todos" : "Copy all"}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ LOGGED OUT ============
function LoggedOutScreen({ t, lang, onSignIn }) {
  return (
    <div className="logout-screen">
      <div className="logout-card">
        <div className="logout-brand">
          <div className="brand-mark">G</div>
          <div className="logout-brand-name">GroWork</div>
        </div>
        <div className="logout-icon">{Icons.check}</div>
        <div className="logout-title">{lang === "pt" ? "Você saiu da sua conta" : "You've been signed out"}</div>
        <div className="logout-sub">
          {lang === "pt"
            ? "Volte sempre — seus agendamentos e profissionais favoritos continuam aqui esperando por você."
            : "Come back anytime — your bookings and favourite pros are waiting for you here."}
        </div>
        <button className="btn btn-primary btn-lg" onClick={onSignIn}>
          {lang === "pt" ? "Entrar novamente" : "Sign in again"} {Icons.arrowR}
        </button>
        <button className="btn btn-ghost" onClick={onSignIn} style={{ marginTop: 4 }}>
          {lang === "pt" ? "Voltar para a demo" : "Back to the demo"}
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen, ExploreScreen, ProfileScreen, BookingScreen, ConfirmationScreen, BookingsScreen, HistoryScreen, NotificationsScreen, ChatScreen, MyProfileScreen, SettingsScreen, PersonalInfoScreen, Field, PrivacyScreen, TwoFactorScreen, LoggedOutScreen });
