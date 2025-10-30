import { COMPANY_INFO } from "@/const";
import { Phone, Mail, MapPin } from "lucide-react";
import OrcamentoForm from "@/components/OrcamentoForm";
import MapaLocalizacao from "@/components/MapaLocalizacao";

export default function Contato() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary text-white py-12 px-4">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Contato</h1>
          <p className="text-lg text-gray-200">Entre em contato conosco para mais informações ou solicite um orçamento detalhado.</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold mb-8 text-primary">Informações de Contato</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Phone className="text-accent flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Telefone</h3>
                    <a href={`tel:${COMPANY_INFO.phone1}`} className="text-gray-700 hover:text-accent transition">
                      {COMPANY_INFO.phone1}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="text-accent flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Email</h3>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-gray-700 hover:text-accent transition">
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="text-accent flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Localização</h3>
                    <p className="text-gray-700">{COMPANY_INFO.address}</p>
                    <p className="text-gray-700">{COMPANY_INFO.neighborhood}</p>
                    <p className="text-gray-700">{COMPANY_INFO.city}</p>
                    <p className="text-gray-700">CEP: {COMPANY_INFO.cep}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Orçamento Form */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-8 text-primary">Solicitar Orçamento</h2>
              <OrcamentoForm />
            </div>
          </div>

          {/* Mapa Interativo */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-primary">Localização no Mapa</h2>
            <MapaLocalizacao />
          </div>
        </div>
      </section>
    </div>
  );
}
