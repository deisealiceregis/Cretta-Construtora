import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Rocket, MapPin, DollarSign, Ruler, Home, Users, Car, Zap } from "lucide-react";
import ImageGallery from "@/components/ImageGallery";
import { trpc } from "@/lib/trpc";

export default function Empreendimentos() {
  const [activeTab, setActiveTab] = useState<"prontos" | "construcao" | "lancamentos">("prontos");

  const { data: prontos = [] } = trpc.empreendimentos.listByTipo.useQuery({ tipo: "pronto" });
  const { data: emConstrucao = [] } = trpc.empreendimentos.listByTipo.useQuery({ tipo: "construcao" });
  const { data: lancamentos = [] } = trpc.empreendimentos.listByTipo.useQuery({ tipo: "lancamento" });

  const getTabContent = () => {
    switch (activeTab) {
      case "prontos":
        return prontos.length > 0 ? prontos : getDefaultProntos();
      case "construcao":
        return emConstrucao.length > 0 ? emConstrucao : getDefaultConstrucao();
      case "lancamentos":
        return lancamentos.length > 0 ? lancamentos : getDefaultLancamentos();
    }
  };

  const getDefaultProntos = () => [
    {
      id: 1,
      titulo: "Residencial Praia Vista",
      descricao: "Condomínio residencial de luxo com apartamentos de 2 e 3 quartos, localizado na melhor região de Balneário Camboriú.",
      localizacao: "Balneário Camboriú - SC",
      preco: "A partir de R$ 450.000",
      metragem: "85 a 150",
      pavimentos: 15,
      quartos: "2 a 3",
      banheiros: "2 a 3",
      vagas: 2,
      unidades: 120,
      area: 45000,
      tipo: "pronto",
      progresso: 100,
      previsaoConclusao: "Concluído",
      dataLancamento: "Jan/2020",
      diferenciais: "Piscina aquecida\nAcademia completa\nSalão de festas\nSegurança 24h\nEnergia solar sustentável\nÁrea verde ampla",
      imagensPrincipais: "https://images.unsplash.com/photo-1545324418-cc1a9a6fded0?w=800&h=600&fit=crop,https://images.unsplash.com/photo-1512207736139-c3dc1d5d4f6e?w=800&h=600&fit=crop,https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    },
    {
      id: 2,
      titulo: "Centro Comercial Premium",
      descricao: "Empreendimento comercial de alto padrão com 45 lojas e salas comerciais, localizado no coração do centro.",
      localizacao: "Centro - Balneário Camboriú - SC",
      preco: "A partir de R$ 250.000",
      metragem: "50 a 200",
      pavimentos: 8,
      quartos: "Comercial",
      banheiros: "2 a 4",
      vagas: 1,
      unidades: 45,
      area: 12000,
      tipo: "pronto",
      progresso: 100,
      previsaoConclusao: "Concluído",
      dataLancamento: "Mar/2019",
      diferenciais: "Localização estratégica\nEstacionamento próprio\nSegurança 24h\nAr condicionado central\nElevadores de alta velocidade\nAcesso fácil para clientes",
      imagensPrincipais: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop,https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop",
    },
  ];

  const getDefaultConstrucao = () => [
    {
      id: 4,
      titulo: "Residencial Horizonte",
      descricao: "Novo empreendimento residencial com 80 apartamentos de 2 e 3 quartos, em construção avançada.",
      localizacao: "Balneário Camboriú - SC",
      preco: "A partir de R$ 380.000",
      metragem: "75 a 140",
      pavimentos: 12,
      quartos: "2 a 3",
      banheiros: "2 a 3",
      vagas: 2,
      unidades: 80,
      area: 38000,
      tipo: "construcao",
      progresso: 65,
      previsaoConclusao: "Dez/2024",
      dataLancamento: "Jun/2022",
      diferenciais: "Projeto moderno\nSustentabilidade\nPiscina aquecida\nAcademia\nSalão de festas\nSegurança 24h",
      imagensPrincipais: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop,https://images.unsplash.com/photo-1545324418-cc1a9a6fded0?w=800&h=600&fit=crop,https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop",
    },
    {
      id: 5,
      titulo: "Comercial Downtown",
      descricao: "Prédio comercial de 12 andares com salas de escritório e lojas, em construção.",
      localizacao: "Downtown - Balneário Camboriú - SC",
      preco: "A partir de R$ 300.000",
      metragem: "100 a 300",
      pavimentos: 12,
      quartos: "Comercial",
      banheiros: "3 a 6",
      vagas: 2,
      unidades: 60,
      area: 25000,
      tipo: "construcao",
      progresso: 45,
      previsaoConclusao: "Jun/2025",
      dataLancamento: "Ago/2023",
      diferenciais: "Localização privilegiada\nEstacionamento amplo\nElevadores modernos\nSegurança avançada\nAr condicionado\nAcesso fácil",
      imagensPrincipais: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop,https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop",
    },
  ];

  const getDefaultLancamentos = () => [
    {
      id: 7,
      titulo: "Residencial Sunset",
      descricao: "Novo lançamento com 100 apartamentos com vista para o mar, projeto de arquitetura contemporânea.",
      localizacao: "Praia - Balneário Camboriú - SC",
      preco: "A partir de R$ 520.000",
      metragem: "90 a 180",
      pavimentos: 18,
      quartos: "2 a 4",
      banheiros: "2 a 4",
      vagas: 2,
      unidades: 100,
      area: 55000,
      tipo: "lancamento",
      progresso: 0,
      previsaoConclusao: "Abr/2026",
      dataLancamento: "Jan/2024",
      diferenciais: "Vista para o mar\nPiscina infinita\nAcademia de luxo\nSpa e sauna\nSalão de festas\nSegurança premium",
      imagensPrincipais: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop,https://images.unsplash.com/photo-1585399781437-d3a5e9b0e3f5?w=800&h=600&fit=crop,https://images.unsplash.com/photo-1545324418-cc1a9a6fded0?w=800&h=600&fit=crop",
    },
    {
      id: 8,
      titulo: "Residencial Montanha Verde",
      descricao: "Lançamento de 75 apartamentos sustentáveis com tecnologia verde integrada.",
      localizacao: "Região de Montanha - Balneário Camboriú - SC",
      preco: "A partir de R$ 420.000",
      metragem: "80 a 160",
      pavimentos: 14,
      quartos: "2 a 3",
      banheiros: "2 a 3",
      vagas: 2,
      unidades: 75,
      area: 42000,
      tipo: "lancamento",
      progresso: 0,
      previsaoConclusao: "Set/2025",
      dataLancamento: "Fev/2024",
      diferenciais: "Sustentabilidade\nEnergia solar\nÁrea verde\nPiscina natural\nAcademia\nSegurança 24h",
      imagensPrincipais: "https://images.unsplash.com/photo-1512207736139-c3dc1d5d4f6e?w=800&h=600&fit=crop,https://images.unsplash.com/photo-1545324418-cc1a9a6fded0?w=800&h=600&fit=crop",
    },
  ];

  const getImages = (emp: any) => {
    if (emp.imagensPrincipais) {
      return emp.imagensPrincipais.split(",").map((url: string) => url.trim());
    }
    return [];
  };

  const content = getTabContent();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-black text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Nossos Empreendimentos</h1>
          <p className="text-lg opacity-90">
            Conheça nossos projetos de qualidade e inovação
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex gap-4 mb-12 border-b overflow-x-auto">
          <button
            onClick={() => setActiveTab("prontos")}
            className={`pb-4 px-6 font-semibold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "prontos"
                ? "border-primary text-primary"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <Building size={20} />
            Empreendimentos Prontos
          </button>
          <button
            onClick={() => setActiveTab("construcao")}
            className={`pb-4 px-6 font-semibold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "construcao"
                ? "border-primary text-primary"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <Rocket size={20} />
            Em Construção
          </button>
          <button
            onClick={() => setActiveTab("lancamentos")}
            className={`pb-4 px-6 font-semibold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "lancamentos"
                ? "border-primary text-primary"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <Rocket size={20} />
            Lançamentos
          </button>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {content.map((emp: any) => (
            <div key={emp.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Images */}
              {getImages(emp).length > 0 && (
                <div className="mb-6">
                  <ImageGallery images={getImages(emp)} title={emp.titulo} />
                </div>
              )}

              {/* Content */}
              <div className="p-8">
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-2">{emp.titulo}</h2>
                  <div className="flex items-center gap-2 text-gray-600 text-lg mb-4">
                    <MapPin size={20} />
                    {emp.localizacao}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{emp.descricao}</p>
                </div>

                {/* Price Section */}
                <div className="mb-8 pb-8 border-b">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="text-primary" size={24} />
                    <span className="text-gray-600 text-sm font-semibold">PREÇO</span>
                  </div>
                  <p className="text-3xl font-bold text-primary">{emp.preco}</p>
                </div>

                {/* Info Grid - Características Físicas */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4 text-gray-900">Características Físicas</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="flex items-start gap-3">
                      <Ruler className="text-primary mt-1" size={20} />
                      <div>
                        <p className="text-gray-600 text-sm font-semibold mb-1">METRAGEM</p>
                        <p className="text-lg font-bold">{emp.metragem} m²</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Home className="text-primary mt-1" size={20} />
                      <div>
                        <p className="text-gray-600 text-sm font-semibold mb-1">PAVIMENTOS</p>
                        <p className="text-lg font-bold">{emp.pavimentos}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="text-primary mt-1" size={20} />
                      <div>
                        <p className="text-gray-600 text-sm font-semibold mb-1">QUARTOS</p>
                        <p className="text-lg font-bold">{emp.quartos}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Home className="text-primary mt-1" size={20} />
                      <div>
                        <p className="text-gray-600 text-sm font-semibold mb-1">BANHEIROS</p>
                        <p className="text-lg font-bold">{emp.banheiros}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Car className="text-primary mt-1" size={20} />
                      <div>
                        <p className="text-gray-600 text-sm font-semibold mb-1">VAGAS</p>
                        <p className="text-lg font-bold">{emp.vagas}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Building className="text-primary mt-1" size={20} />
                      <div>
                        <p className="text-gray-600 text-sm font-semibold mb-1">UNIDADES</p>
                        <p className="text-lg font-bold">{emp.unidades}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Ruler className="text-primary mt-1" size={20} />
                      <div>
                        <p className="text-gray-600 text-sm font-semibold mb-1">ÁREA TOTAL</p>
                        <p className="text-lg font-bold">{emp.area} m²</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Zap className="text-primary mt-1" size={20} />
                      <div>
                        <p className="text-gray-600 text-sm font-semibold mb-1">TIPO</p>
                        <p className="text-lg font-bold capitalize">{emp.tipo === "pronto" ? "Pronto" : emp.tipo === "construcao" ? "Em Construção" : "Lançamento"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Section - Only for Em Construção */}
                {activeTab === "construcao" && emp.progresso !== undefined && (
                  <div className="mb-8 pb-8 border-b">
                    <h3 className="text-lg font-bold mb-4 text-gray-900">Andamento da Obra</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600 font-semibold">Progresso Geral</span>
                          <span className="text-2xl font-bold text-primary">{emp.progresso}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-primary to-accent h-4 rounded-full transition-all duration-500"
                            style={{ width: `${emp.progresso}%` }}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-gray-600 text-sm font-semibold mb-1">PREVISÃO DE CONCLUSÃO</p>
                          <p className="text-lg font-bold text-primary">{emp.previsaoConclusao}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-gray-600 text-sm font-semibold mb-1">LANÇAMENTO</p>
                          <p className="text-lg font-bold text-green-600">{emp.dataLancamento}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Lançamento Section - Only for Lançamentos */}
                {activeTab === "lancamentos" && (
                  <div className="mb-8 pb-8 border-b">
                    <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
                      <p className="text-gray-600 text-sm font-semibold mb-1">DATA DE LANÇAMENTO</p>
                      <p className="text-2xl font-bold text-yellow-600">{emp.dataLancamento}</p>
                      <p className="text-gray-600 mt-2">Previsão de conclusão: {emp.previsaoConclusao}</p>
                    </div>
                  </div>
                )}

                {/* Diferenciais */}
                {emp.diferenciais && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold mb-4 text-gray-900">Diferenciais</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {emp.diferenciais.split("\n").map((item: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                          <span className="w-3 h-3 bg-primary rounded-full flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{item.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                <div className="pt-4">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg flex items-center justify-center gap-2">
                    Solicitar Mais Informações <ArrowRight size={20} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
