import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Rocket } from "lucide-react";
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
      localizacao: "Balneário Camboriú - SC",
      descricao: "Condomínio residencial de luxo com 120 apartamentos de 2 e 3 quartos.",
      preco: "A partir de R$ 450.000",
      unidades: 120,
      imagensPrincipais: "https://images.unsplash.com/photo-1545324418-cc1a9a6fded0?w=800&h=600&fit=crop,https://images.unsplash.com/photo-1512207736139-c3dc1d5d4f6e?w=800&h=600&fit=crop",
      diferenciais: "Piscina aquecida\nAcademia\nSalão de festas\nSegurança 24h",
    },
  ];

  const getDefaultConstrucao = () => [
    {
      id: 4,
      titulo: "Residencial Horizonte",
      localizacao: "Balneário Camboriú - SC",
      descricao: "Novo empreendimento com 80 apartamentos de 2 e 3 quartos.",
      preco: "A partir de R$ 380.000",
      progresso: 65,
      previsaoConclusao: "Dez/2024",
      imagensPrincipais: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop,https://images.unsplash.com/photo-1545324418-cc1a9a6fded0?w=800&h=600&fit=crop",
    },
  ];

  const getDefaultLancamentos = () => [
    {
      id: 7,
      titulo: "Residencial Sunset",
      localizacao: "Balneário Camboriú - SC",
      descricao: "Novo lançamento com 100 apartamentos com vista para o mar.",
      preco: "A partir de R$ 520.000",
      dataLancamento: "Jan/2024",
      imagensPrincipais: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop,https://images.unsplash.com/photo-1585399781437-d3a5e9b0e3f5?w=800&h=600&fit=crop",
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
        <div className="flex gap-4 mb-12 border-b">
          <button
            onClick={() => setActiveTab("prontos")}
            className={`pb-4 px-6 font-semibold flex items-center gap-2 border-b-2 transition-colors ${
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
            className={`pb-4 px-6 font-semibold flex items-center gap-2 border-b-2 transition-colors ${
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
            className={`pb-4 px-6 font-semibold flex items-center gap-2 border-b-2 transition-colors ${
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
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-2">{emp.titulo}</h2>
                  <p className="text-gray-600 text-lg">{emp.localizacao}</p>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">{emp.descricao}</p>

                {/* Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 pb-8 border-b">
                  <div>
                    <p className="text-gray-600 text-sm font-semibold mb-1">PREÇO</p>
                    <p className="text-2xl font-bold text-primary">{emp.preco}</p>
                  </div>

                  {emp.unidades && (
                    <div>
                      <p className="text-gray-600 text-sm font-semibold mb-1">UNIDADES</p>
                      <p className="text-2xl font-bold">{emp.unidades}</p>
                    </div>
                  )}

                  {emp.area && (
                    <div>
                      <p className="text-gray-600 text-sm font-semibold mb-1">ÁREA</p>
                      <p className="text-2xl font-bold">{emp.area} m²</p>
                    </div>
                  )}

                  {activeTab === "construcao" && emp.progresso !== undefined && (
                    <div>
                      <p className="text-gray-600 text-sm font-semibold mb-1">PROGRESSO</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${emp.progresso}%` }}
                          />
                        </div>
                        <span className="font-bold">{emp.progresso}%</span>
                      </div>
                    </div>
                  )}

                  {activeTab === "construcao" && emp.previsaoConclusao && (
                    <div>
                      <p className="text-gray-600 text-sm font-semibold mb-1">CONCLUSÃO</p>
                      <p className="text-lg font-bold">{emp.previsaoConclusao}</p>
                    </div>
                  )}

                  {activeTab === "lancamentos" && emp.dataLancamento && (
                    <div>
                      <p className="text-gray-600 text-sm font-semibold mb-1">LANÇAMENTO</p>
                      <p className="text-lg font-bold">{emp.dataLancamento}</p>
                    </div>
                  )}
                </div>

                {/* Diferenciais */}
                {emp.diferenciais && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold mb-4">Diferenciais</h3>
                    <ul className="grid grid-cols-2 gap-3">
                      {emp.diferenciais.split("\n").map((item: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-700">
                          <span className="w-2 h-2 bg-primary rounded-full" />
                          {item.trim()}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                <Button className="w-full md:w-auto" size="lg">
                  Solicitar Informações
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
