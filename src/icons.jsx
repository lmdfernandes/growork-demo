import React from "react";

// Inline SVG icons — each one is a full SVG element returned by a function
const _svg = (children, sw = 2) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const Icons = {
  home: _svg(<path d="M3 11l9-8 9 8M5 10v10h14V10" />),
  compass: _svg(<><circle cx="12" cy="12" r="9" /><polygon points="16,8 13,15 8,16 11,9" fill="currentColor" stroke="none" /></>),
  calendar: _svg(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>),
  chat: _svg(<path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12Z" />),
  bell: _svg(<path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8M10 21a2 2 0 0 0 4 0" />),
  clock: _svg(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
  user: _svg(<><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>),
  search: _svg(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>),
  arrowR: _svg(<path d="M5 12h14M13 5l7 7-7 7" />),
  arrowL: _svg(<path d="M19 12H5M11 19l-7-7 7-7" />),
  plus: _svg(<path d="M12 5v14M5 12h14" />),
  check: _svg(<path d="M5 12l5 5 9-12" />, 2.4),
  x: _svg(<path d="M18 6 6 18M6 6l12 12" />),
  send: _svg(<path d="m22 2-11 11M22 2l-7 20-4-9-9-4 20-7Z" />),
  star: _svg(<path d="M12 3l2.7 5.7 6.3.7-4.7 4.3 1.3 6.3-5.6-3-5.6 3 1.3-6.3L3 9.4l6.3-.7Z" />),
  mapPin: _svg(<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0Z" /><circle cx="12" cy="10" r="3" /></>),
  briefcase: _svg(<><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>),
  dollar: _svg(<path d="M12 1v22M17 5H9a3 3 0 0 0 0 6h6a3 3 0 0 1 0 6H7" />),
  chart: _svg(<path d="M3 20V10M9 20V4M15 20v-7M21 20V8" />),
  settings: _svg(<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z" /></>),
  heart: _svg(<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6Z" />),
  filter: _svg(<path d="M4 4h16l-6 8v6l-4 2v-8L4 4Z" />),
  phone: _svg(<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2.1Z" />),
  more: _svg(<><circle cx="12" cy="12" r="1.5" fill="currentColor" /><circle cx="19" cy="12" r="1.5" fill="currentColor" /><circle cx="5" cy="12" r="1.5" fill="currentColor" /></>),
  instagram: _svg(<><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>),
  whatsapp: _svg(<path d="M20.5 12a8.5 8.5 0 1 1-15.7 4.5L3 21l4.6-1.7A8.5 8.5 0 0 0 20.5 12Zm-12.7-1c0 3.3 2.7 6 6 6 .6 0 1.1-.1 1.6-.3l.4 1c-.6.2-1.3.3-2 .3a7 7 0 0 1-7-7c0-.7.1-1.4.3-2l1 .4c-.2.5-.3 1-.3 1.6Z" />),
  facebook: _svg(<path d="M16 6h-2a2 2 0 0 0-2 2v3h-3v3h3v6h3v-6h2.5l.5-3H15V9a1 1 0 0 1 1-1h2V6Z" />),
  email: _svg(<><rect x="3" y="6" width="18" height="14" rx="2" /><path d="m3 8 9 6 9-6" /></>),
  globe: _svg(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>),
  sparkle: _svg(<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />),
  history: _svg(<><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l3 2" /></>),
  users: _svg(<><circle cx="9" cy="9" r="3.5" /><circle cx="17" cy="10" r="2.5" /><path d="M3 21a6 6 0 0 1 12 0M14 21a5 5 0 0 1 7 0" /></>),
  logout: _svg(<><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><path d="M10 17l5-5-5-5M15 12H3" /></>),
  moon: _svg(<path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10Z" />),
  help: _svg(<><circle cx="12" cy="12" r="9" /><path d="M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2-3 4" /><path d="M12 17h.01" /></>)
};

window.Icons = Icons;

export { Icons };
