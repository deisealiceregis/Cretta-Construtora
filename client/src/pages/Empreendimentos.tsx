import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building } from "lucide-react";

export default function Empreendimentos() {
  const [activeTab, setActiveTab] = useState<"prontos" | "construcao" | "lancamentos">("prontos");

  // Sample data for different categories
  const empreendimentosProntos = [
    {
      id: 1,
      title: "Residencial Praia Vista",
      location: "Balneário Camboriú - SC",
      description: "Condomínio residencial de luxo com 120 apartamentos de 2 e 3 quartos, área de lazer completa com piscina aquecida, academia, salão de festas e segurança 24h.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a9a6fded0?w=400&h=300&fit=crop",
      units: "120 unidades",
      price: "A partir de R$ 450.000",
      features: ["Piscina aquecida", "Academia", "Salão de festas", "Segurança 24h", "Estacionamento"],
    },
    {
      id: 2,
      title: "Centro Comercial Premium",
      location: "Balneário Camboriú - SC",
      description: "Prédio comercial de 8 andares com lojas de alto padrão, salas de escritório e espaços para consultórios. Localização privilegiada no centro da cidade.",
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=300&fit=crop",
      units: "45 lojas",
      price: "A partir de R$ 200.000",
      features: ["Localização central", "Estacionamento", "Segurança", "Climatização", "Acessibilidade"],
    },
    {
      id: 3,
      title: "Residencial Costa Mar",
      location: "Balneário Camboriú - SC",
      description: "Apartamentos com vista para o mar, varanda gourmet e acabamento premium. Projeto sustentável com energia solar.",
      image: "https://images.unsplash.com/photo-1512207736139-c3dc1d5d4f6e?w=400&h=300&fit=crop",
      units: "85 unidades",
      price: "A partir de R$ 600.000",
      features: ["Vista para o mar", "Varanda gourmet", "Energia solar", "Piscina", "Sauna"],
    },
  ];

  const empreendimentosEmConstrucao = [
    {
      id: 4,
      title: "Residencial Horizonte",
      location: "Balneário Camboriú - SC",
      description: "Novo empreendimento com 80 apartamentos de 2 e 3 quartos, ampla área de lazer com piscina, academia e salão de jogos.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
      progress: "65%",
      estimatedCompletion: "Dez/2024",
      price: "A partir de R$ 380.000",
    },
    {
      id: 5,
      title: "Comercial Downtown",
      location: "Balneário Camboriú - SC",
      description: "Edifício comercial moderno com 12 andares, garagem subterrânea e espaços flexíveis para lojas e escritórios.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      progress: "45%",
      estimatedCompletion: "Mar/2025",
      price: "A partir de R$ 250.000",
    },
    {
      id: 6,
      title: "Residencial Eco Park",
      location: "Balneário Camboriú - SC",
      description: "Empreendimento sustentável com 60 apartamentos, áreas verdes, horta comunitária e sistema de energia solar.",
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=300&fit=crop",
      progress: "35%",
      estimatedCompletion: "Abr/2025",
      price: "A partir de R$ 420.000",
    },
  ];

  const lancamentos = [
    {
      id: 7,
      title: "Residencial Sunset",
      location: "Balneário Camboriú - SC",
      description: "Novo lançamento com 100 apartamentos de 2 e 3 quartos com vista panorâmica para o mar. Acabamento de luxo com cozinha gourmet.",
      image: "https://images.unsplash.com/photo-1512207736139-c3dc1d5d4f6e?w=400&h=300&fit=crop",
      launchDate: "Fevereiro/2025",
      price: "A partir de R$ 550.000",
    },
    {
      id: 8,
      title: "Residencial Montanha Verde",
      location: "Balneário Camboriú - SC",
      description: "Empreendimento sustentável com 75 apartamentos, áreas verdes, horta comunitária, painéis solares e sistema de reuso de água.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      launchDate: "Março/2025",
      price: "A partir de R$ 480.000",
    },
    {
      id: 9,
      title: "Comercial Tech Hub",
      location: "Balneário Camboriú - SC",
      description: "Espaço inovador para startups e empresas de tecnologia com 20 salas de escritório, áreas de coworking e auditório.",
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=300&fit=crop",
      launchDate: "Abril/2025",
      price: "A partir de R$ 150.000",
    },
    {
      id: 10,
      title: "Residencial Praia Dourada",
      location: "Balneário Camboriú - SC",
      description: "Lançamento premium com apenas 40 apartamentos de 3 e 4 quartos, localização frente ao mar com acesso direto à praia.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a9a6fded0?w=400&h=300&fit=crop",
      launchDate: "Maio/2025",
      price: "A partir de R$ 800.000",
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

              {showProgress && !showCompletion && (
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Unidades:</strong> {item.units}
                </p>
              )}

              {item.price && (
                <p className="text-sm font-bold text-primary mb-4">
                  {item.price}
                </p>
              )}

              {showLaunch && (
                <div className="mb-4">
                  <p className="text-sm text-accent font-bold mb-2">
                    Lançamento: {item.launchDate}
                  </p>
                  {item.price && (
                    <p className="text-sm font-bold text-primary">
                      {item.price}
                    </p>
                  )}
                </div>
              )}

              {!showLaunch && !showProgress && item.features && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Diferenciais:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {item.features.map((feature: string, idx: number) => (
                      <li key={idx}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>
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
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-black text-white py-16 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 cretta-brand">Empreendimentos</h1>
          <p className="text-lg text-gray-200">
            Conheça nossos projetos em diferentes estágios de desenvolvimento
          </p>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12 px-4 bg-background">
        <div className="container max-w-6xl mx-auto">
          {/* Tab Buttons */}
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

          {/* Content */}
          {renderContent()}

          {/* CTA Section */}
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
