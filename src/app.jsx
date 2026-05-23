import React from "react";
const Icons = window.Icons;
const { Sidebar, TopBar, MobileNav, Banner, PushToast, HomeScreen, ExploreScreen, ProfileScreen, BookingScreen, ConfirmationScreen, BookingsScreen, HistoryScreen, NotificationsScreen, ChatScreen, MyProfileScreen, SettingsScreen, PersonalInfoScreen, Field, PrivacyScreen, TwoFactorScreen, LoggedOutScreen, ProDashboard, ProBookings, AgendaPlanner, BookingDetails, MemberDashboard, ProTeam, MemberDetails, AddMemberScreen, EditRole, EditServices, EditSchedule, BusinessSettings, BlacklistScreen, AdminAnnouncements, RichTextEditor, NewBookingScreen, NewClientScreen, ProClients, useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider, TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, __twkIsLight, TweakColor, TweakButton } = window;

// Main GroWork app
const { useState, useEffect, useMemo } = React;

  const DEFAULTS = /*EDITMODE-BEGIN*/{
  "variant": "vibrant",
  "accent": "#A88456",
  "lang": "pt"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = window.useTweaks ? window.useTweaks(DEFAULTS) : [DEFAULTS, () => {}];

  const [role, setRole] = useState("client");
  const [view, setView] = useState("home"); // home | profile | booking | confirmation | chat | notifications | bookings | pro-dashboard | settings | logged-out
  const [pickedPro, setPickedPro] = useState(null);
  const [bookingCtx, setBookingCtx] = useState({ proId: null, serviceId: null });
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [chatPro, setChatPro] = useState(null);
  const [lang, setLang] = useState(tweaks.lang || "pt");
  const [notifications, setNotifications] = useState(window.GW_DATA.notifications);
  const [toast, setToast] = useState(null);
  const [showBanner, setShowBanner] = useState(true);

  // Apply variant + accent to root
  useEffect(() => {
    document.body.setAttribute("data-variant", tweaks.variant || "vibrant");
    document.documentElement.style.setProperty("--accent", tweaks.accent || "#6D28D9");
  }, [tweaks.variant, tweaks.accent]);

  // Sync lang into tweak storage
  useEffect(() => { setTweak("lang", lang); }, [lang]);

  // Push the booking confirmation as a NEW notification (no auto popup)
  useEffect(() => {
    if (view !== "confirmation" || !confirmedBooking) return;
    const pro = window.GW_DATA.pros.find(p => p.id === confirmedBooking.proId);
    setNotifications(ns => {
      const newNotif = {
        id: "auto-" + Date.now(),
        icon: "📅",
        type: "booking",
        unread: true,
        title_pt: "Agendamento enviado",
        title_en: "Booking sent",
        text_pt: "Aguardando confirmação de " + pro.name,
        text_en: "Awaiting confirmation from " + pro.name,
        time_pt: "agora",
        time_en: "now"
      };
      return [newNotif, ...ns];
    });
  }, [view, confirmedBooking, lang]);

  // Simulated reply from Marina lands on the bell, no auto-popup
  useEffect(() => {
    if (view !== "home") return;
    const t1 = setTimeout(() => {
      setNotifications(ns => {
        // Avoid duplicating the simulated message on every home visit
        if (ns.some(n => n.id === "sim-reply")) return ns;
        return [{
          id: "sim-reply",
          icon: "💬",
          type: "message",
          unread: true,
          title_pt: "Nova mensagem de Marina",
          title_en: "New message from Marina",
          text_pt: "Marina: \"Sexta às 14h tá ótimo aqui — confirmado!\"",
          text_en: "Marina: \"Friday 2pm works perfectly — confirmed!\"",
          time_pt: "agora",
          time_en: "now"
        }, ...ns];
      });
    }, 1500);
    return () => clearTimeout(t1);
  }, [view, lang]);

  const tt = window.GW_T[lang];
  const unreadCount = notifications.filter(n => n.unread).length;

  function pickPro(proId) { setPickedPro(proId); setView("profile"); }
  function startBook(proId, serviceId) { setBookingCtx({ proId, serviceId }); setView("booking"); }
  function confirmBooking(b) { setConfirmedBooking(b); setView("confirmation"); }
  function openChat(proId) { setChatPro(proId); setView("chat"); }
  function markAllRead() { setNotifications(ns => ns.map(n => ({ ...n, unread: false }))); }

  let content = null;
  if (role === "client") {
    if (view === "home") content = <HomeScreen t={tt} lang={lang} onPickPro={pickPro} onSeeAll={() => setView("explore")} />;
    else if (view === "explore") content = <ExploreScreen t={tt} lang={lang} onPickPro={pickPro} onBack={() => setView("home")} />;
    else if (view === "profile") content = <ProfileScreen t={tt} lang={lang} proId={pickedPro} onBook={startBook} onMessage={openChat} onBack={() => setView("home")} />;
    else if (view === "booking") content = <BookingScreen t={tt} lang={lang} proId={bookingCtx.proId} presetServiceId={bookingCtx.serviceId} onConfirm={confirmBooking} onBack={() => setView("profile")} />;
    else if (view === "confirmation") content = <ConfirmationScreen t={tt} lang={lang} booking={confirmedBooking} onChat={openChat} onHome={() => setView("home")} />;
    else if (view === "chat") content = <ChatScreen t={tt} lang={lang} role={role} initialProId={chatPro} onPickPro={pickPro} />;
    else if (view === "bookings" || view === "history") content = <BookingsScreen t={tt} lang={lang} onPickPro={pickPro} onChat={openChat} onFindPro={() => setView("home")} />;
    else if (view === "notifications") content = <NotificationsScreen t={tt} lang={lang} notifications={notifications} onMarkAllRead={markAllRead} />;
  } else if (role === "member") {
    if (view === "member-dashboard" || view === "home" || view === "pro-dashboard") content = <MemberDashboard t={tt} lang={lang} onChat={openChat} memberId="tm2" onNav={(v) => setView(v)} />;
    else if (view === "member-bookings") content = <ProBookings t={tt} lang={lang} onChat={openChat} memberView memberId="tm2" onNav={(v) => setView(v)} />;
    else if (view === "pro-clients") content = <ProClients t={tt} lang={lang} onChat={openChat} onNav={(v) => setView(v)} />;
    else if (view === "pro-new-booking") content = <NewBookingScreen t={tt} lang={lang} onBack={() => setView("member-bookings")} />;
    else if (view === "pro-new-client") content = <NewClientScreen t={tt} lang={lang} onBack={() => setView("pro-clients")} />;
    else if (view === "pro-agenda") content = <AgendaPlanner t={tt} lang={lang} memberView memberId="tm2" onBack={() => setView("member-bookings")} />;
    else if (view === "chat") content = <ChatScreen t={tt} lang={lang} role={role} initialProId={chatPro} />;
    else if (view === "notifications") content = <AdminAnnouncements t={tt} lang={lang} />;
    else if (view === "settings") content = <SettingsScreen t={tt} lang={lang} role={role} tweaks={tweaks} setTweak={setTweak} setLang={setLang} onBack={() => setView("member-dashboard")} onNav={(v) => setView(v)} />;
    else if (view === "settings-personal") content = <PersonalInfoScreen t={tt} lang={lang} role={role} onBack={() => setView("settings")} />;
    else if (view === "settings-privacy") content = <PrivacyScreen t={tt} lang={lang} onBack={() => setView("settings")} onNav={(v) => setView(v)} />;
    else if (view === "settings-2fa") content = <TwoFactorScreen t={tt} lang={lang} onBack={() => setView("settings-privacy")} />;
    else if (view === "logged-out") content = <LoggedOutScreen t={tt} lang={lang} onSignIn={() => setView("member-dashboard")} />;
  } else {
    if (view === "pro-dashboard" || view === "home") content = <ProDashboard t={tt} lang={lang} onChat={openChat} onNav={(v) => setView(v)} />;
    else if (view === "pro-bookings") content = <ProBookings t={tt} lang={lang} onChat={openChat} onNav={(v) => setView(v)} />;
    else if (view === "pro-clients") content = <ProClients t={tt} lang={lang} onChat={openChat} onNav={(v) => setView(v)} />;
    else if (view === "pro-new-booking") content = <NewBookingScreen t={tt} lang={lang} onBack={() => setView("pro-bookings")} />;
    else if (view === "pro-new-client") content = <NewClientScreen t={tt} lang={lang} onBack={() => setView("pro-clients")} />;
    else if (view === "pro-agenda") content = <AgendaPlanner t={tt} lang={lang} onBack={() => setView("pro-bookings")} />;
    else if (view === "pro-team") content = <ProTeam t={tt} lang={lang} onChat={openChat} onOpenMember={(id, t2) => { setPickedPro(id); setBookingCtx({ proId: id, serviceId: t2 || "agenda" }); setView("pro-member"); }} onAddMember={() => setView("pro-add-member")} />;
    else if (view === "pro-member") content = <MemberDetails t={tt} lang={lang} memberId={pickedPro} initialTab={bookingCtx.serviceId} onBack={() => setView("pro-team")} onChat={openChat} />;
    else if (view === "pro-add-member") content = <AddMemberScreen t={tt} lang={lang} onBack={() => setView("pro-team")} />;
    else if (view === "chat") content = <ChatScreen t={tt} lang={lang} role={role} initialProId={chatPro} />;
    else if (view === "notifications") content = <AdminAnnouncements t={tt} lang={lang} />;
    else if (view === "settings") content = <BusinessSettings t={tt} lang={lang} onBack={() => setView("pro-dashboard")} onOpenBlacklist={() => setView("pro-blacklist")} />;
    else if (view === "pro-blacklist") content = <BlacklistScreen t={tt} lang={lang} onBack={() => setView("settings")} />;
    else if (view === "settings-personal") content = <PersonalInfoScreen t={tt} lang={lang} role={role} onBack={() => setView("settings")} />;
    else if (view === "settings-privacy") content = <PrivacyScreen t={tt} lang={lang} onBack={() => setView("settings")} onNav={(v) => setView(v)} />;
    else if (view === "settings-2fa") content = <TwoFactorScreen t={tt} lang={lang} onBack={() => setView("settings-privacy")} />;
    else if (view === "logged-out") content = <LoggedOutScreen t={tt} lang={lang} onSignIn={() => setView("pro-dashboard")} />;
  }

  // After role-agnostic views handled above, layer "settings" / "logged-out" on top for client too
  if (role === "client") {
    if (view === "settings") content = <SettingsScreen t={tt} lang={lang} role={role} tweaks={tweaks} setTweak={setTweak} setLang={setLang} onBack={() => setView("home")} onNav={(v) => setView(v)} />;
    else if (view === "settings-personal") content = <PersonalInfoScreen t={tt} lang={lang} role={role} onBack={() => setView("settings")} />;
    else if (view === "settings-privacy") content = <PrivacyScreen t={tt} lang={lang} onBack={() => setView("settings")} onNav={(v) => setView(v)} />;
    else if (view === "settings-2fa") content = <TwoFactorScreen t={tt} lang={lang} onBack={() => setView("settings-privacy")} />;
    else if (view === "logged-out") content = <LoggedOutScreen t={tt} lang={lang} onSignIn={() => setView("home")} />;
  }

  // Banner only on client home; pro dashboard has no banner
  const showBannerForView = (role === "client" && view === "home");

  // Logged-out mode: render an isolated sign-in screen
  if (view === "logged-out") {
    return (
      <div className="app logged-out-shell">
        <LoggedOutScreen t={tt} lang={lang} onSignIn={() => setView(role === "client" ? "home" : "pro-dashboard")} />
        <PushToast toast={toast} onClose={() => setToast(null)} />
      </div>
    );
  }

  return (
    <div className="app">
      <Sidebar role={role} setRole={setRole} view={view} setView={setView} t={tt} lang={lang} setLang={setLang} onLogout={() => setView("logged-out")} />
      <main className="main">
        <TopBar
          t={tt}
          onNotifClick={() => setView("notifications")}
          unreadCount={unreadCount}
          role={role}
          lang={lang}
          setLang={setLang}
          notifications={notifications}
          onPickPro={pickPro}
          onMarkAllRead={markAllRead}
          onNavProfile={() => setView("settings")}
          onNavSettings={() => setView("settings")}
          onLogout={() => setView("logged-out")}
          onToast={(t2) => { setToast(t2); setTimeout(() => setToast(null), 4500); }}
        />
        {showBannerForView && showBanner && (
          <Banner role={role} t={tt} onView={() => role === "client" ? setView("bookings") : setView("notifications")} onDismiss={() => setShowBanner(false)} />
        )}
        {content}
      </main>
      <MobileNav role={role} view={view} setView={setView} t={tt} />
      <PushToast toast={toast} onClose={() => setToast(null)} />

      {window.TweaksPanel && (
        <TweaksPanel title="Tweaks">
          <TweakSection label={lang === "pt" ? "Variante visual" : "Visual variant"}>
            <TweakRadio
              label={lang === "pt" ? "Estilo" : "Style"}
              value={tweaks.variant}
              onChange={v => setTweak("variant", v)}
              options={["vibrant", "editorial"]}
            />
          </TweakSection>
          <TweakSection label={lang === "pt" ? "Cor de destaque" : "Accent color"}>
            <TweakColor
              label={lang === "pt" ? "Accent" : "Accent"}
              value={tweaks.accent}
              onChange={v => setTweak("accent", v)}
              options={["#6D28D9", "#EC4899", "#10B981", "#0EA5E9", "#F59E0B", "#1A1230"]}
            />
          </TweakSection>
          <TweakSection label={lang === "pt" ? "Idioma" : "Language"}>
            <TweakRadio
              label={lang === "pt" ? "Idioma" : "Language"}
              value={lang}
              onChange={v => setLang(v)}
              options={["pt", "en"]}
            />
          </TweakSection>
          <TweakSection label={lang === "pt" ? "Função" : "Role"}>
            <TweakRadio
              label={lang === "pt" ? "Função ativa" : "Active role"}
              value={role}
              onChange={v => { setRole(v); setView(v === "client" ? "home" : "pro-dashboard"); }}
              options={["client", "pro"]}
            />
          </TweakSection>
          <TweakSection label={lang === "pt" ? "Demo" : "Demo"}>
            <TweakButton
              label={lang === "pt" ? "Simular notificação push" : "Simulate push notification"}
              onClick={() => setNotifications(ns => [{
                id: "demo-" + Date.now(),
                icon: "💬",
                type: "message",
                unread: true,
                title_pt: "Nova mensagem",
                title_en: "New message",
                text_pt: "Marina: \"Posso adiantar 15 min se preferir?\"",
                text_en: "Marina: \"Can I move it 15 min earlier?\"",
                time_pt: "agora",
                time_en: "now"
              }, ...ns])}
            />
          </TweakSection>
        </TweaksPanel>
      )}
    </div>
  );
}

window.App = App;
export default App;
