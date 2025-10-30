import { COMPANY_INFO, SOCIAL_LINKS } from "@/const";
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from "lucide-react";

export default function Footer() {
  const getSocialIcon = (name: string) => {
    switch (name) {
      case "Facebook":
        return <Facebook size={20} className="text-gray-900" />;
      case "Instagram":
        return <Instagram size={20} className="text-gray-900" />;
      case "WhatsApp":
        return <MessageCircle size={20} className="text-gray-900" />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-accent mb-4">CRETTA Construtora</h3>
            <p className="text-gray-300 mb-6">{COMPANY_INFO.description}</p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-accent hover:bg-primary flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
                  title={link.name}
                  aria-label={`Visite nosso ${link.name}`}
                >
                  {getSocialIcon(link.name)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Contact */}
          <div>
            <h4 className="text-lg font-bold text-accent mb-4">Contato Rápido</h4>
            <div className="space-y-3">
              <a
                href={`tel:${COMPANY_INFO.phone1}`}
                className="flex items-center gap-3 text-gray-300 hover:text-accent transition"
              >
                <Phone size={18} />
                <span>{COMPANY_INFO.phone1}</span>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-3 text-gray-300 hover:text-accent transition"
              >
                <Mail size={18} />
                <span>Email</span>
              </a>
              <a
                href={`https://wa.me/55${COMPANY_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-accent transition"
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="text-lg font-bold text-accent mb-4">Localização</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex gap-3">
                <MapPin size={18} className="flex-shrink-0 mt-1" />
                <div>
                  <p>{COMPANY_INFO.address}</p>
                  <p>{COMPANY_INFO.neighborhood}</p>
                  <p>{COMPANY_INFO.city}</p>
                  <p>CEP: {COMPANY_INFO.cep}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © 2024 CRETTA Construtora e Incorporadora. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
