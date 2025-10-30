import { Button } from "@/components/ui/button";
import { COMPANY_INFO } from "@/const";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    setFormData({ nome: "", email: "", telefone: "", assunto: "", mensagem: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary text-white py-12 px-4">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Contato</h1>
          <p className="text-lg text-gray-200">Entre em contato conosco para mais informações.</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-primary">Informações de Contato</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Phone className="text-accent flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Telefone</h3>
                    <a href={`tel:${COMPANY_INFO.phone1}`} className="text-gray-700 hover:text-accent transition">
                      {COMPANY_INFO.phone1}
                    </a>
                    <br />
                    <a href={`tel:${COMPANY_INFO.phone2}`} className="text-gray-700 hover:text-accent transition">
                      {COMPANY_INFO.phone2}
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

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-primary">Envie uma Mensagem</h2>
              <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md border border-border">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="(47) 9999-9999"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assunto</label>
                  <input
                    type="text"
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Assunto da mensagem"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mensagem</label>
                  <textarea
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Sua mensagem..."
                  />
                </div>

                <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90 flex items-center justify-center gap-2">
                  <Send size={20} />
                  Enviar Mensagem
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
