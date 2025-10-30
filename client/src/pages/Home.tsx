import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO, APP_LOGO } from "@/const";
import { ArrowRight, CheckCircle, Zap, Building, Hammer, Rocket } from "lucide-react";
import ImageCarousel from "@/components/ImageCarousel";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";

export default function Home() {
  const [reformasImages, setReformasImages] = useState<Array<{ url: string; title: string }>>([]);
  const { data: reformas = [] } = trpc.reformas.list.useQuery();

  // Update reformas images when data loads
  useEffect(() => {
    if (reformas && reformas.length > 0) {
      const images = reformas
        .filter(r => r.fotoUrl)
        .map(r => ({
          url: r.fotoUrl || 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
          title: r.titulo,
        }))
        .slice(0, 4);
      
      // If less than 4 images, add placeholder
      if (images.length < 4) {
        while (images.length < 4) {
          images.push({
            url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
            title: 'Reforma Personalizada',
          });
        }
      }
      setReformasImages(images);
    } else {
      // Default images if no reformas
      setReformasImages([
        {
          url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop",
          title: "Reforma Residencial",
        },
        {
          url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop&q=80",
          title: "Reforma Comercial",
        },
        {
          url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop&q=60",
          title: "Modernização",
        },
        {
          url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop&q=40",
          title: "Personalização",
        },
      ]);
    }
  }, [reformas]);

  // Sample images for the carousel
  const bannerImages = [
    {
      url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop",
      title: "Energia Solar Sustentável",
    },
    {
      url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop&q=80",
      title: "Painéis Fotovoltaicos",
    },
    {
      url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop&q=60",
      title: "Inovação em Energia",
    },
    {
      url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop&q=40",
      title: "Futuro Sustentável",
    },
  ];

  // Specialties data
  const specialties = [
    {
      id: 1,
      title: "Empreendimentos",
      subtitle: "",
      description: "Excelência em construir — de grandes edifícios e espaços comerciais a lares que inspiram.",
      features: [
        "Edifícios Residenciais de Qualidade",
        "Espaços Comerciais Modernos",
        "Projetos Estruturais Robustos",
        "Acabamentos Sofisticados",
        "Gestão Profissional de Obras",
        "Prazos Cumpridos com Precisão",
      ],
      icon: Building,
      color: "from-blue-500 to-blue-600",
      href: "/empreendimentos",
    },
    {
      id: 2,
      title: "Reformas",
      subtitle: "",
      description: "Transformamos espaços com reformas completas e personalizadas. Desde reformas residenciais até comerciais, sempre com qualidade e atenção aos detalhes.",
      features: [
        "Reformas Residenciais",
        "Reformas Comerciais",
        "Modernização de Espaços",
        "Adequação de Ambientes",
        "Projetos Personalizados",
        "Execução Eficiente",
      ],
      icon: Hammer,
      color: "from-orange-500 to-orange-600",
      href: "/reformas",
    },
    {
      id: 3,
      title: "Projetos",
      subtitle: "",
      description: "Desenvolvemos projetos estruturais e de energia com excelência técnica. Soluções inovadoras em energia renovável e projetos executivos completos.",
      features: [
        "Projetos Estruturais",
        "Energia Solar Fotovoltaica",
        "Sistemas de Energia Renovável",
        "Projetos de Eficiência Energética",
        "Consultoria Técnica",
        "Soluções Personalizadas",
      ],
      icon: Rocket,
      color: "from-yellow-500 to-yellow-600",
      href: "/projetos",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-black text-white py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-6 mb-6">
            <img src={APP_LOGO} alt="CRETTA Logo" className="w-32 h-32 rounded-lg" />
            <h1 className="text-3xl md:text-4xl font-extralight cretta-brand text-white tracking-widest">{COMPANY_INFO.name}</h1>
          </div>
          <p className="text-2xl text-accent mb-6">{COMPANY_INFO.tagline}</p>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            Construímos seu futuro com eficiência, solidez e propósito de mudar a sua história de vida.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/empreendimentos?tab=construcao">
              <Button className="bg-accent text-primary hover:bg-opacity-90 flex items-center gap-2">
                Empreendimentos em Construção <ArrowRight size={20} />
              </Button>
            </Link>
            <Link href="/empreendimentos?tab=prontos">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Empreendimentos Prontos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Banners Section - Reformas e Em Construção */}
      <section className="py-0 px-0">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Banner 1 - Reformas */}
            <div className="overflow-hidden h-96">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full">
              {/* Banner Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-primary to-black text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Hammer size={28} className="text-accent" />
                  <span className="text-sm font-bold text-accent uppercase tracking-widest">Especialidade</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Reformas</h2>
                <p className="text-lg text-gray-200 mb-6">
                  Transformamos espaços com reformas completas e personalizadas. Desde reformas residenciais até comerciais, sempre com qualidade e atenção aos detalhes.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Link href="/reformas">
                    <Button className="bg-accent text-primary hover:bg-opacity-90 flex items-center gap-2">
                      Ver Detalhes <ArrowRight size={20} />
                    </Button>
                  </Link>
                  <Link href="/contato">
                    <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                      Solicitar Orçamento
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Banner Image Carousel */}
              <div className="relative w-full h-96 md:h-auto bg-gray-900">
                <ImageCarousel
                  images={reformasImages}
                  autoPlayInterval={4000}
                  showControls={true}
                  showDots={true}
                />
              </div>
            </div>
            </div>

            {/* Banner 2 - Em Construção & Lançamentos */}
            <div className="overflow-hidden h-96">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full">
              {/* Banner Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-primary to-black text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Rocket size={28} className="text-accent" />
                  <span className="text-sm font-bold text-accent uppercase tracking-widest">Novidades</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Em Construção & Lançamentos</h2>
                <p className="text-lg text-gray-200 mb-6">
                  Acompanhe nossos projetos em desenvolvimento e conheça os novos lançamentos com as melhores soluções.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Link href="/empreendimentos?tab=construcao">
                    <Button className="bg-accent text-primary hover:bg-opacity-90 flex items-center gap-2">
                      Ver Detalhes <ArrowRight size={20} />
                    </Button>
                  </Link>
                  <Link href="/contato">
                    <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                      Solicitar Orçamento
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Banner Image Carousel */}
              <div className="relative w-full h-96 md:h-auto bg-gray-900">
                <ImageCarousel
                  images={bannerImages}
                  autoPlayInterval={4000}
                  showControls={true}
                  showDots={true}
                />
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container">
          <h2 className="text-4xl font-bold mb-4 text-primary">Bem-vindo ao nosso site interativo</h2>
          <p className="text-lg text-gray-600 mb-8">
            Conheça nossos projetos em desenvolvimento. Cada projeto é executado com precisão e atenção aos detalhes.
          </p>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Nossas Especialidades</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Três áreas de expertise que definem a excelência da CRETTA Construtora
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialties.map((specialty) => {
              const IconComponent = specialty.icon;
              return (
                <Link key={specialty.id} href={specialty.href}>
                  <div className="group h-full bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-200">
                    {/* Header with gradient background */}
                    <div className={`bg-gradient-to-r ${specialty.color} text-white p-8 relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                      <div className="relative z-10">
                        <div className="mb-4 inline-block p-3 bg-white/20 rounded-lg">
                          <IconComponent size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{specialty.title}</h3>
                        <p className="text-sm font-semibold opacity-90">{specialty.subtitle}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {specialty.description}
                      </p>

                      {/* Features list */}
                      <div className="space-y-3 mb-8">
                        {specialty.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle size={20} className="text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group">
                        Saiba Mais
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>



      {/* Values Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center text-primary">Por que escolher a CRETTA?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "Excelencia em Construcao Civil",
              "Reformas e Renovações Criativas",
              "Projetos Estruturais e Executivos",
              "Qualidade e Atenção aos Detalhes",
              "Acompanhamento Completo das Obras",
              "Transparência e Comunicação Clara com Clientes",
            ].map((value) => (
              <div key={value} className="flex items-start gap-4">
                <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                <p className="text-lg text-gray-700">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Pronto para começar seu projeto?</h2>
          <p className="text-lg mb-8 text-gray-200">
            Entre em contato conosco e vamos transformar suas ideias em realidade.
          </p>
          <Link href="/contato">
            <Button className="bg-accent text-primary hover:bg-opacity-90 text-lg px-8 py-6">
              Fale Conosco Agora
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
