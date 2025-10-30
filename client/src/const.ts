export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const APP_TITLE = import.meta.env.VITE_APP_TITLE || "CRETTA CONSTRUTORA E INCORPORADORA";

export const APP_LOGO =
  import.meta.env.VITE_APP_LOGO ||
  "https://placehold.co/128x128/2D5F4F/F5F1E8?text=CRETTA";

export const COMPANY_INFO = {
  name: "CRETTA CONSTRUTORA E INCORPORADORA",
  phone1: "(47) 31700163",
  phone2: "(47) 9611-1205",
  email: "crettaconstrutora@gmail.com",
  whatsapp: "47996111205",
  address: "Rua Tailândia, 491",
  neighborhood: "Bairro Nações",
  city: "Balneário Camboriú - SC",
  cep: "88338-150",
  description: "Especializada em Geração de Energia e Construção de Edificações. Desenvolvemos projetos executivos, estruturais e acompanhamos a implantação das obras com qualidade e excelência.",
  tagline: "Excelência em Engenharia Civil",
};

export const NAVIGATION_ITEMS = [
  { label: "Página Inicial", href: "/" },
  { label: "Construção", href: "/construcoes" },
  { label: "Projetos", href: "/projetos" },
  { label: "Reformas", href: "/reformas" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Visão", href: "/visao" },
  { label: "Contato", href: "/contato" },
];

export const SOCIAL_LINKS = [
  { name: "Facebook", url: "https://facebook.com", icon: "facebook" },
  { name: "Instagram", url: "https://instagram.com", icon: "instagram" },
  { name: "WhatsApp", url: "https://wa.me/5547996111205", icon: "whatsapp" },
];

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};