export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const APP_TITLE = import.meta.env.VITE_APP_TITLE || "CRETTA CONSTRUTORA E INCORPORADORA";

export const APP_LOGO =
  import.meta.env.VITE_APP_LOGO ||
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663162808444/IgSzrNJuAVFKHkzg.png";

export const COMPANY_INFO = {
  name: "CRETTA CONSTRUTORA E INCORPORADORA",
  phone1: "(47) 3170-0160",
  phone2: "",
  email: "crettaconstrutora@gmail.com",
  whatsapp: "47317000160",
  address: "Rua Tailândia, 491",
  neighborhood: "Bairro Nações",
  city: "Balneário Camboriú - SC",
  cep: "88338-150",
  description: "Especializada em Construção Civil, Reformas e Projetos. Transformamos ideias em realidade através de soluções inovadoras, qualidade excepcional e compromisso com a excelência em cada projeto.",
  tagline: "Excelência em Construção Civil",
};

export const NAVIGATION_ITEMS = [
  { label: "Página Inicial", href: "/" },
  { label: "Empreendimentos", href: "#", submenu: [
    { label: "Empreendimentos Prontos", href: "/empreendimentos" },
    { label: "Em Construção", href: "/empreendimentos" },
    { label: "Lançamentos", href: "/empreendimentos" },
  ] },
  { label: "Reformas", href: "/reformas" },
  { label: "Projetos", href: "#", submenu: [
    { label: "Projetos Estruturais", href: "/projetos" },
    { label: "Projetos de Energia", href: "/projetos" },
  ] },
  { label: "Depoimentos", href: "/depoimentos" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Contato", href: "/contato" },
];

export const SOCIAL_LINKS = [
  { name: "Facebook", url: "https://www.facebook.com/crettaconstrutorae eincorporadora", icon: "facebook" },
  { name: "Instagram", url: "https://www.instagram.com/crettaconstrutora", icon: "instagram" },
  { name: "WhatsApp", url: "https://wa.me/5547317000160", icon: "whatsapp" },
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