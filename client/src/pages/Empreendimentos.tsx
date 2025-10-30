'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Rocket, MapPin, DollarSign, Ruler, Home, Users, Car, Zap } from "lucide-react";
import ImageGallery from "@/components/ImageGallery";
import { trpc } from "@/lib/trpc";
import * as Icons from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Home: Icons.Home,
  Building: Icons.Building,
  Building2: Icons.Building2,
  Zap: Icons.Zap,
  Droplet: Icons.Droplet,
  Wind: Icons.Wind,
  Sun: Icons.Sun,
  Shield: Icons.Shield,
  Lock: Icons.Lock,
  Wifi: Icons.Wifi,
  Tv: Icons.Tv,
  Utensils: Icons.Utensils,
  Dumbbell: Icons.Dumbbell,
  Sofa: Icons.Sofa,
  Trees: Icons.Trees,
  Car: Icons.Car,
  Users: Icons.Users,
  Heart: Icons.Heart,
  Star: Icons.Star,
  CheckCircle: Icons.CheckCircle,
  AlertCircle: Icons.AlertCircle,
};

export default function Empreendimentos() {
  const [activeTab, setActiveTab] = useState<"prontos" | "construcao" | "lancamentos">("prontos");

  const { data: prontos = [] } = trpc.empreendimentos.listByTipo.useQuery({ tipo: "pronto" });
  const { data: emConstrucao = [] } = trpc.empreendimentos.listByTipo.useQuery({ tipo: "construcao" });
  const { data: lancamentos = [] } = trpc.empreendimentos.listByTipo.useQuery({ tipo: "lancamento" });

  const getTabContent = () => {
    switch (activeTab) {
      case "prontos":
        return prontos;
      case "construcao":
        return emConstrucao;
      case "lancamentos":
        return lancamentos;
    }
  };

  const getImages = (emp: any) => {
    if (emp.imagensPrincipais) {
      return emp.imagensPrincipais.split(",").map((url: string) => url.trim());
    }
    return [];
  };

  const parseDiferenciais = (diferencialString: string | null | undefined) => {
    if (!diferencialString) return [];
    return diferencialString.split("\n").map((item: string) => {
      const [texto, icone] = item.split("|");
      return {
        texto: texto?.trim() || "",
        icone: icone?.trim() || "Home",
      };
    }).filter(d => d.texto);
  };

  const getDiferencialIcon = (iconeName: string) => {
    const IconComponent = ICON_MAP[iconeName] || Icons.Home;
    return IconComponent;
  };

  const content = getTabContent();

  if (content.length === 0) {
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

          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Nenhum empreendimento cadastrado nesta categoria.</p>
          </div>
        </div>
      </div>
    );
  }

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
          {content.map((emp: any) => {
            const diferenciais = parseDiferenciais(emp.diferenciais);
            const images = getImages(emp);

            return (
              <div key={emp.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Images */}
                {images.length > 0 && (
                  <div className="mb-6">
                    <ImageGallery images={images} title={emp.titulo} />
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
                      {emp.metragem && (
                        <div className="flex items-start gap-3">
                          <Ruler className="text-primary mt-1" size={20} />
                          <div>
                            <p className="text-gray-600 text-sm font-semibold mb-1">METRAGEM</p>
                            <p className="text-lg font-bold">{emp.metragem} m²</p>
                          </div>
                        </div>
                      )}

                      {emp.pavimentos && (
                        <div className="flex items-start gap-3">
                          <Home className="text-primary mt-1" size={20} />
                          <div>
                            <p className="text-gray-600 text-sm font-semibold mb-1">PAVIMENTOS</p>
                            <p className="text-lg font-bold">{emp.pavimentos}</p>
                          </div>
                        </div>
                      )}

                      {emp.quartos && (
                        <div className="flex items-start gap-3">
                          <Users className="text-primary mt-1" size={20} />
                          <div>
                            <p className="text-gray-600 text-sm font-semibold mb-1">QUARTOS</p>
                            <p className="text-lg font-bold">{emp.quartos}</p>
                          </div>
                        </div>
                      )}

                      {emp.banheiros && (
                        <div className="flex items-start gap-3">
                          <Home className="text-primary mt-1" size={20} />
                          <div>
                            <p className="text-gray-600 text-sm font-semibold mb-1">BANHEIROS</p>
                            <p className="text-lg font-bold">{emp.banheiros}</p>
                          </div>
                        </div>
                      )}

                      {emp.vagas && (
                        <div className="flex items-start gap-3">
                          <Car className="text-primary mt-1" size={20} />
                          <div>
                            <p className="text-gray-600 text-sm font-semibold mb-1">VAGAS</p>
                            <p className="text-lg font-bold">{emp.vagas}</p>
                          </div>
                        </div>
                      )}

                      {emp.unidades && (
                        <div className="flex items-start gap-3">
                          <Building className="text-primary mt-1" size={20} />
                          <div>
                            <p className="text-gray-600 text-sm font-semibold mb-1">UNIDADES</p>
                            <p className="text-lg font-bold">{emp.unidades}</p>
                          </div>
                        </div>
                      )}

                      {emp.area && (
                        <div className="flex items-start gap-3">
                          <Ruler className="text-primary mt-1" size={20} />
                          <div>
                            <p className="text-gray-600 text-sm font-semibold mb-1">ÁREA TOTAL</p>
                            <p className="text-lg font-bold">{emp.area} m²</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-3">
                        <Zap className="text-primary mt-1" size={20} />
                        <div>
                          <p className="text-gray-600 text-sm font-semibold mb-1">TIPO</p>
                          <p className="text-lg font-bold capitalize">
                            {emp.tipo === "pronto" ? "Pronto" : emp.tipo === "construcao" ? "Em Construção" : "Lançamento"}
                          </p>
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
                          {emp.previsaoConclusao && (
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <p className="text-gray-600 text-sm font-semibold mb-1">PREVISÃO DE CONCLUSÃO</p>
                              <p className="text-lg font-bold text-primary">{emp.previsaoConclusao}</p>
                            </div>
                          )}
                          {emp.dataLancamento && (
                            <div className="bg-green-50 p-4 rounded-lg">
                              <p className="text-gray-600 text-sm font-semibold mb-1">LANÇAMENTO</p>
                              <p className="text-lg font-bold text-green-600">{emp.dataLancamento}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Lançamento Section - Only for Lançamentos */}
                  {activeTab === "lancamentos" && emp.dataLancamento && (
                    <div className="mb-8 pb-8 border-b">
                      <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
                        <p className="text-gray-600 text-sm font-semibold mb-1">DATA DE LANÇAMENTO</p>
                        <p className="text-2xl font-bold text-yellow-600">{emp.dataLancamento}</p>
                        {emp.previsaoConclusao && (
                          <p className="text-gray-600 mt-2">Previsão de conclusão: {emp.previsaoConclusao}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Diferenciais */}
                  {diferenciais.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-bold mb-4 text-gray-900">Diferenciais</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {diferenciais.map((item, idx) => {
                          const IconComponent = getDiferencialIcon(item.icone);
                          return (
                            <div key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                              <IconComponent className="text-primary flex-shrink-0" size={20} />
                              <span className="text-gray-700 font-medium">{item.texto}</span>
                            </div>
                          );
                        })}
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
