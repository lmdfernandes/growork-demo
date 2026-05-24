import React from "react";
const Icons = window.Icons;
const { HomeScreen, ExploreScreen, ProfileScreen, BookingScreen, ConfirmationScreen, BookingsScreen, HistoryScreen, NotificationsScreen, ChatScreen, MyProfileScreen, SettingsScreen, PersonalInfoScreen, Field, PrivacyScreen, TwoFactorScreen, LoggedOutScreen, ProDashboard, ProBookings, AgendaPlanner, BookingDetails, MemberDashboard, ProTeam, MemberDetails, AddMemberScreen, EditRole, EditServices, EditSchedule, BusinessSettings, BlacklistScreen, AdminAnnouncements, RichTextEditor, NewBookingScreen, NewClientScreen, ProClients, useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider, TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, __twkIsLight, TweakColor, TweakButton } = window;

// Shell: sidebar, topbar, mobile nav, banner, push toast
const { useState, useEffect, useRef, useMemo } = React;

// Shared nav model so the desktop sidebar and the mobile drawer stay in sync
function buildNav(role, t, lang) {
  const clientNav = [
    { id: "home", label: t.home, icon: Icons.home },
    { id: "bookings", label: t.bookings, icon: Icons.calendar },
    { id: "chat", label: t.chat, icon: Icons.chat },
    { id: "notifications", label: t.notif, icon: Icons.bell },
    { id: "settings", label: t.menu_profile, icon: Icons.user }
  ];
  const proNav = [
    { id: "pro-dashboard", label: t.dashboard, icon: Icons.chart },
    { id: "pro-bookings", label: t.bookings, icon: Icons.calendar },
    { id: "pro-clients", label: lang === "pt" ? "Clientes" : "Clients", icon: Icons.user },
    { id: "pro-team", label: lang === "pt" ? "Equipa" : "Team", icon: Icons.users },
    { id: "chat", label: t.chat, icon: Icons.chat },
    { id: "notifications", label: t.notif, icon: Icons.bell },
    { id: "settings", label: t.menu_profile, icon: Icons.user }
  ];
  const memberNav = [
    { id: "member-dashboard", label: t.dashboard, icon: Icons.chart },
    { id: "member-bookings", label: lang === "pt" ? "Agendamentos" : "Bookings", icon: Icons.calendar },
    { id: "pro-clients", label: lang === "pt" ? "Clientes" : "Clients", icon: Icons.user },
    { id: "chat", label: t.chat, icon: Icons.chat },
    { id: "notifications", label: t.notif, icon: Icons.bell },
    { id: "settings", label: t.menu_profile, icon: Icons.user }
  ];
  return role === "client" ? clientNav : role === "member" ? memberNav : proNav;
}

const __navActive = (view, id) =>
  view === id || (id === "settings" && (view === "settings-personal" || view === "settings-privacy" || view === "settings-2fa"));

function Sidebar({ role, setRole, view, setView, t, lang, setLang, onLogout }) {
  const nav = buildNav(role, t, lang);

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">G</div>
        <div className="brand-name">GroWork</div>
      </div>

      <div className="nav-section-label">Menu</div>
      <div className="nav">
        {nav.map(n => (
          <button key={n.id} className={"nav-item" + (__navActive(view, n.id) ? " active" : "")} onClick={() => setView(n.id)}>
            {n.icon}<span>{n.label}</span>
          </button>
        ))}
      </div>

      <div className="role-switch">
        <div className="spread">
          <div className="role-switch-label">{lang === "pt" ? "Idioma" : "Language"}</div>
          <div className="lang-toggle">
            <button className={lang === "pt" ? "active" : ""} onClick={() => setLang("pt")}>PT</button>
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
          </div>
        </div>
        <button className="sidebar-logout" onClick={onLogout}>
          {Icons.logout}<span>{t.menu_logout}</span>
        </button>
      </div>
    </aside>
  );
}

function TopBar({ t, onNotifClick, unreadCount, role, lang, setLang, onPickPro, notifications, onLogout, onNavSettings, onNavProfile, onToast, onMarkAllRead, onOpenMenu }) {
  const [q, setQ] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("gw-dark");
    if (saved !== null) return saved === "1";
    return false;
  });

  // Apply dark class on mount + whenever it changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try { localStorage.setItem("gw-dark", dark ? "1" : "0"); } catch (e) {}
  }, [dark]);

  // Toggle .scrolled on the topbar when the page scrolls so we can add a subtle border
  useEffect(() => {
    function onScroll() {
      const tb = document.querySelector(".topbar");
      if (!tb) return;
      tb.classList.toggle("scrolled", window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const searchRef = useRef(null);
  const bellRef = useRef(null);
  const menuRef = useRef(null);

  // Outside click → close any dropdown
  useEffect(() => {
    function onDoc(e) {
      if (searchOpen && searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
      if (bellOpen   && bellRef.current   && !bellRef.current.contains(e.target))   setBellOpen(false);
      if (menuOpen   && menuRef.current   && !menuRef.current.contains(e.target))   setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [searchOpen, bellOpen, menuOpen]);

  // Build search results live
  const data = window.GW_DATA;
  const query = q.trim().toLowerCase();
  const proResults = !query ? [] : data.pros.filter(p =>
    p.name.toLowerCase().includes(query) ||
    (lang === "pt" ? p.role_pt : p.role_en).toLowerCase().includes(query)
  ).slice(0, 4);
  const serviceResults = !query ? [] : Object.entries(data.servicesByPro).flatMap(([pid, list]) =>
    list.map(s => ({ ...s, proId: pid }))
  ).filter(s =>
    (lang === "pt" ? s.name_pt : s.name_en).toLowerCase().includes(query)
  ).slice(0, 4);
  const catResults = !query ? [] : data.categories.filter(c =>
    (lang === "pt" ? c.pt : c.en).toLowerCase().includes(query)
  ).slice(0, 4);
  const noResults = query && proResults.length === 0 && serviceResults.length === 0 && catResults.length === 0;

  // Recent notifications preview
  const recentNotifs = (notifications || []).slice(0, 3);

  // Avatar / user
  const userName = role === "client" ? "Ana Costa" : "Marina Costa";
  const userMail = role === "client" ? "ana.costa@email.com" : "marina@growork.app";
  const userInit = role === "client" ? "AC" : "MC";

  function pickProAndClose(pid) {
    setSearchOpen(false);
    setQ("");
    onPickPro && onPickPro(pid);
  }

  function toggleDark(next) {
    const nv = typeof next === "boolean" ? next : !dark;
    setDark(nv); // useEffect applies the class + persists
  }

  return (
    <div className="topbar">
      <div className="mob-header" style={{ flex: 1, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button className="mob-menu-btn" onClick={() => onOpenMenu && onOpenMenu()} aria-label={t.menu || "Menu"}>
            {Icons.menu}
          </button>
          <div className="brand">
            <div className="brand-mark">G</div>
            <div className="brand-name">GroWork</div>
          </div>
        </div>
        {/* Language lives in the hamburger drawer on mobile to keep the bar from overflowing */}
      </div>

      {/* Search with dropdown */}
      <div className="topbar-search-wrap" ref={searchRef} style={{ display: window.innerWidth < 920 ? "none" : "flex" }}>
        <div className={"topbar-search" + (searchOpen ? " focus" : "")}>
          {Icons.search}
          <input
            value={q}
            onChange={e => { setQ(e.target.value); setSearchOpen(true); }}
            onFocus={() => setSearchOpen(true)}
            placeholder={t.search_placeholder}
          />
          {q && (
            <button className="search-clear" onClick={() => { setQ(""); setSearchOpen(false); }} title="Limpar">{Icons.x}</button>
          )}
        </div>
        {searchOpen && (
          <div className="search-dropdown">
            {!query && (
              <div className="sd-hint">{Icons.sparkle}<span>{t.search_hint}</span></div>
            )}
            {noResults && (
              <div className="sd-empty">
                {Icons.search}
                <div><strong>{t.search_no_results}</strong> "{q}"</div>
              </div>
            )}
            {proResults.length > 0 && (
              <div className="sd-group">
                <div className="sd-group-label">{t.search_group_pros}</div>
                {proResults.map(p => (
                  <button key={p.id} className="sd-item" onClick={() => pickProAndClose(p.id)}>
                    <div className="sd-thumb" style={{ background: p.color }}>{p.emoji}</div>
                    <div className="sd-text">
                      <div className="sd-name">{p.name}</div>
                      <div className="sd-meta">{lang === "pt" ? p.role_pt : p.role_en} · {p.distance}</div>
                    </div>
                    <div className="sd-aside">★ {p.rating.toFixed(1)}</div>
                  </button>
                ))}
              </div>
            )}
            {serviceResults.length > 0 && (
              <div className="sd-group">
                <div className="sd-group-label">{t.search_group_services}</div>
                {serviceResults.map(s => (
                  <button key={s.id} className="sd-item" onClick={() => pickProAndClose(s.proId)}>
                    <div className="sd-thumb" style={{ background: s.bg, color: "white" }}>{s.emoji}</div>
                    <div className="sd-text">
                      <div className="sd-name">{lang === "pt" ? s.name_pt : s.name_en}</div>
                      <div className="sd-meta">{s.duration} min · {s.price}€</div>
                    </div>
                    <div className="sd-aside">{Icons.arrowR}</div>
                  </button>
                ))}
              </div>
            )}
            {catResults.length > 0 && (
              <div className="sd-group">
                <div className="sd-group-label">{t.search_group_cats}</div>
                <div className="sd-chips">
                  {catResults.map(c => (
                    <button key={c.id} className="sd-chip" onClick={() => setSearchOpen(false)}>
                      <span>{c.emoji}</span><span>{lang === "pt" ? c.pt : c.en}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {query && !noResults && (
              <button className="sd-footer" onClick={() => setSearchOpen(false)}>
                {t.search_view_all} {Icons.arrowR}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bell with dropdown */}
      <div className="icon-btn-wrap" ref={bellRef}>
        <button className="icon-btn" title={t.notif} onClick={() => {
          const next = !bellOpen;
          setBellOpen(next);
          // Opening the bell marks everything as read
          if (next && onMarkAllRead) onMarkAllRead();
        }}>
          {Icons.bell}
          {unreadCount > 0 && <span className="badge">{unreadCount > 9 ? "9+" : unreadCount}</span>}
        </button>
        {bellOpen && (
          <div className="dropdown bell-dropdown">
            <div className="dd-header">
              <div>
                <div className="dd-title">{t.notif_title}</div>
                <div className="dd-sub">{unreadCount} {lang === "pt" ? "novas" : "new"}</div>
              </div>
              {unreadCount > 0 && <span className="dd-pill">{unreadCount}</span>}
            </div>
            <div className="dd-section-label">{t.notif_recent}</div>
            {recentNotifs.length === 0 && (
              <div className="dd-empty">{Icons.bell}<span>{t.notif_empty}</span></div>
            )}
            {recentNotifs.map(n => (
              <button key={n.id} className={"dd-notif" + (n.unread ? " unread" : "")} onClick={() => { setBellOpen(false); onNotifClick(); }}>
                <div className="dd-notif-ico">{n.icon}</div>
                <div className="dd-notif-body">
                  <div className="dd-notif-title">{lang === "pt" ? n.title_pt : n.title_en}</div>
                  <div className="dd-notif-text">{lang === "pt" ? n.text_pt : n.text_en}</div>
                  <div className="dd-notif-time">{lang === "pt" ? n.time_pt : n.time_en}</div>
                </div>
              </button>
            ))}
            <button className="dd-footer" onClick={() => { setBellOpen(false); onNotifClick(); }}>
              {t.notif_view_all} {Icons.arrowR}
            </button>
          </div>
        )}
      </div>

      {/* Theme toggle pinned to top-right (replaces the old avatar menu) */}
      <div className="icon-btn-wrap" ref={menuRef}>
        <button className="icon-btn" title={t.menu_theme} onClick={() => toggleDark()} aria-pressed={dark}>
          {Icons.moon}
        </button>
      </div>
    </div>
  );
}

function MobileNav({ role, view, setView, t }) {
  const tabs = role === "client" ? [
    { id: "home", label: t.home, icon: Icons.home },
    { id: "bookings", label: t.bookings, icon: Icons.calendar },
    { id: "chat", label: t.chat, icon: Icons.chat },
    { id: "notifications", label: t.notif, icon: Icons.bell }
  ] : [
    { id: "pro-dashboard", label: t.dashboard, icon: Icons.chart },
    { id: "chat", label: t.chat, icon: Icons.chat },
    { id: "notifications", label: t.notif, icon: Icons.bell }
  ];
  return (
    <div className="mob-nav">
      {tabs.map(tab => (
        <button key={tab.id} className={"mob-tab" + (view === tab.id ? " active" : "")} onClick={() => setView(tab.id)}>
          {tab.icon}<span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

function Banner({ role, t, onView, onDismiss }) {
  const isClient = role === "client";
  return (
    <div className="banner">
      <div className="banner-icon">{isClient ? Icons.clock : Icons.bell}</div>
      <div className="banner-body">
        <div className="banner-title">{isClient ? t.banner_title : t.banner_title_pro}</div>
        <div className="banner-text">{isClient ? t.banner_text : t.banner_text_pro}</div>
      </div>
      <div className="banner-actions">
        <button className="banner-btn primary" onClick={onView}>{isClient ? t.banner_view : t.banner_view_pro}</button>
        {isClient && <button className="banner-btn" onClick={onDismiss}>{t.banner_remind}</button>}
      </div>
    </div>
  );
}

function PushToast({ toast, onClose }) {
  if (!toast) return null;
  return (
    <div className="push-toast">
      <div className="ico">{toast.icon || Icons.bell}</div>
      <div className="body">
        <div className="t1">{toast.title}</div>
        <div className="t2">{toast.text}</div>
      </div>
      <button className="close" onClick={onClose}>{Icons.x}</button>
    </div>
  );
}

// Floating role/view switcher — always visible across desktop, tablet and mobile
// so the demo's three perspectives (Cliente / Admin / Equipa) are one tap away.
function RoleSwitcher({ role, setRole, setView, t }) {
  const go = (r, v) => { setRole(r); setView(v); };
  const roles = [
    { id: "client", label: t.role_client, view: "home" },
    { id: "pro", label: t.role_pro, view: "pro-dashboard" },
    { id: "member", label: t.role_member, view: "member-dashboard" },
  ];
  return (
    <div className="role-fab" role="group" aria-label="Switch view" data-noncommentable="">
      {roles.map(r => (
        <button
          key={r.id}
          className={"role-fab-btn" + (role === r.id ? " active" : "")}
          aria-pressed={role === r.id}
          onClick={() => go(r.id, r.view)}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}

// Slide-in drawer that mirrors the full sidebar navigation on mobile/tablet
function MobileMenu({ open, onClose, role, view, setView, t, lang, setLang, onLogout }) {
  const nav = buildNav(role, t, lang);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  function go(id) { setView(id); onClose && onClose(); }

  return (
    <div className={"mob-menu-root" + (open ? " open" : "")} aria-hidden={!open}>
      <div className="mob-menu-scrim" onClick={onClose} />
      <aside className="mob-menu-panel" role="dialog" aria-modal="true" aria-label="Menu">
        <div className="mob-menu-head">
          <div className="brand">
            <div className="brand-mark">G</div>
            <div className="brand-name">GroWork</div>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label={t.close || "Close"}>{Icons.x}</button>
        </div>

        <div className="nav-section-label">Menu</div>
        <div className="nav">
          {nav.map(n => (
            <button key={n.id} className={"nav-item" + (__navActive(view, n.id) ? " active" : "")} onClick={() => go(n.id)}>
              {n.icon}<span>{n.label}</span>
            </button>
          ))}
        </div>

        <div className="role-switch">
          <div className="spread">
            <div className="role-switch-label">{lang === "pt" ? "Idioma" : "Language"}</div>
            <div className="lang-toggle">
              <button className={lang === "pt" ? "active" : ""} onClick={() => setLang("pt")}>PT</button>
              <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
            </div>
          </div>
          <button className="sidebar-logout" onClick={() => { onClose && onClose(); onLogout && onLogout(); }}>
            {Icons.logout}<span>{t.menu_logout}</span>
          </button>
        </div>
      </aside>
    </div>
  );
}

Object.assign(window, { Sidebar, TopBar, MobileNav, Banner, PushToast, RoleSwitcher, MobileMenu });
