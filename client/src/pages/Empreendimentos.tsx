import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building } from "lucide-react";
import ImageGallery from "@/components/ImageGallery";

export default function Empreendimentos() {
  const [activeTab, setActiveTab] = useState<"prontos" | "construcao" | "lancamentos">("prontos");

  const empreendimentosProntos = [
    {
      id: 1,
      title: "Residencial Praia Vista",
      location: "Balneário Camboriú - SC",
      description: "Condomínio residencial de luxo com 120 apartamentos de 2 e 3 quartos.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a9a6fded0?w=400&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a9a6fded0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1512207736139-c3dc1d5d4f6e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1585399781437-d3a5e9b0e3f5?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1576070881002-0b4e2b3e4e3f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1594622532400-817d507e5878?w=800&h=600&fit=crop",
      ],
      units: "120 unidades",
      price: "A partir de R$ 450.000",
      features: ["Piscina aquecida", "Academia", "Salão de festas", "Segurança 24h", "Estacionamento"],
    },
  ];

  const empreendimentosEmConstrucao = [
    {
      id: 4,
      title: "Residencial Horizonte",
      location: "Balneário Camboriú - SC",
      description: "Novo empreendimento com 80 apartamentos de 2 e 3 quartos.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1545324418-cc1a9a6fded0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1512207736139-c3dc1d5d4f6e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      ],
      progress: "65%",
      estimatedCompletion: "Dez/2024",
      price: "A partir de R$ 380.000",
    },
  ];

  const lancamentos = [
    {
      id: 7,
      title: "Residencial Sunset",
      location: "Balneário Camboriú - SC",
      description: "Novo lançamento com 100 apartamentos com vista para o mar.",
      image: "https://images.unsplash.com/photo-1512207736139-c3dc1d5d4f6e?w=400&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1512207736139-c3dc1d5d4f6e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1545324418-cc1a9a6fded0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1585399781437-d3a5e9b0e3f5?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1576070881002-0b4e2b3e4e3f?w=800&h=600&fit=crop",
      ],
      launchDate: "Fevereiro/2025",
      price: "A partir de R$ 550.000",
    },
  ];

  const renderContent = () => {
    let data = [];
    let showProgress = false;
    let showCompletion = false;
    let showLaunch = false;

    if (activeTab === "prontos") {
      data = empreendimentosProntos;
    } else if (activeTab === "construcao") {
      data = empreendimentosEmConstrucao;
      showProgress = true;
      showCompletion = true;
    } else {
      data = lancamentos;
      showLaunch = true;
    }

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item: any) => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="relative h-48 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                  <Building size={16} />
                  {item.location}
                </p>
                <p className="text-gray-600 mb-4">{item.description}</p>

                {showProgress && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Progresso</span>
                      <span className="text-sm font-bold text-primary">{item.progress}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: item.progress }}
                      ></div>
                    </div>
                  </div>
                )}

                {showCompletion && (
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Previsão:</strong> {item.estimatedCompletion}
                  </p>
                )}

                {item.price && (
                  <p className="text-sm font-bold text-primary mb-4">
                    {item.price}
                  </p>
                )}

                {showLaunch && (
                  <p className="text-sm text-accent font-bold mb-4">
                    Lançamento: {item.launchDate}
                  </p>
                )}

                <Link href="/contato">
                  <Button className="w-full bg-primary text-white hover:bg-primary/90 flex items-center justify-center gap-2">
                    Solicitar Informações <ArrowRight size={18} />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Section */}
        {data.length > 0 && data[0].images && (
          <div className="mt-16 border-t pt-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Galeria de Imagens</h3>
            <div className="space-y-12">
              {data.map((item: any) => (
                item.images && (
                  <div key={item.id}>
                    <h4 className="text-xl font-bold mb-6">{item.title}</h4>
                    <ImageGallery images={item.images} title={item.title} />
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-r from-primary to-black text-white py-16 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 cretta-brand">Empreendimentos</h1>
          <p className="text-lg text-gray-200">
            Conheça nossos projetos em diferentes estágios de desenvolvimento
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-background">
        <div className="container max-w-6xl mx-auto">
          <div className="flex gap-4 mb-12 justify-center flex-wrap">
            <button
              onClick={() => setActiveTab("prontos")}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                activeTab === "prontos"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-foreground hover:bg-gray-300"
              }`}
            >
              Empreendimentos Prontos
            </button>
            <button
              onClick={() => setActiveTab("construcao")}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                activeTab === "construcao"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-foreground hover:bg-gray-300"
              }`}
            >
              Em Construção
            </button>
            <button
              onClick={() => setActiveTab("lancamentos")}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                activeTab === "lancamentos"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-foreground hover:bg-gray-300"
              }`}
            >
              Lançamentos
            </button>
          </div>

          {renderContent()}

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Interessado em algum empreendimento?</h2>
            <p className="text-gray-600 mb-6">
              Entre em contato conosco para mais informações e agendamento de visitas.
            </p>
            <Link href="/contato">
              <Button className="bg-primary text-white hover:bg-primary/90 flex items-center gap-2 mx-auto">
                Fale Conosco <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
