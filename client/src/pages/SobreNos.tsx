import { Building2, Target, Heart, Users, Award, Zap } from "lucide-react";
import { Link } from "wouter";

export default function SobreNos() {
  const values = [
    {
      icon: Building2,
      title: "Excelência Técnica",
      description: "Projetos executados com precisão e atenção aos detalhes, seguindo as melhores práticas da engenharia civil.",
    },
    {
      icon: Heart,
      title: "Comprometimento",
      description: "Dedicação total ao sucesso de cada projeto, sempre buscando superar as expectativas dos clientes.",
    },
    {
      icon: Zap,
      title: "Inovação",
      description: "Implementação de tecnologias modernas e soluções sustentáveis em todos os nossos projetos.",
    },
    {
      icon: Users,
      title: "Transparência",
      description: "Comunicação clara e honesta com clientes, mantendo-os informados em todas as etapas.",
    },
  ];

  const team = [
    {
      name: "Engenheiro Civil",
      role: "Diretor Técnico",
      description: "Responsável pela coordenação técnica e qualidade dos projetos.",
    },
    {
      name: "Arquiteto",
      role: "Coordenador de Projetos",
      description: "Especialista em design e planejamento de edificações.",
    },
    {
      name: "Gestor de Obras",
      role: "Supervisor de Campo",
      description: "Acompanhamento diário da execução e qualidade das obras.",
    },
  ];

  const differentials = [
    "Experiência de mais de 15 anos no mercado",
    "Equipe altamente qualificada e certificada",
    "Projetos executivos e estruturais de qualidade",
    "Especialização em energia renovável",
    "Acompanhamento completo das obras",
    "Garantia de prazos e orçamentos",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold">Sobre a CRETTA CONSTRUTORA E INCORPORADORA</h1>
            <p className="text-lg md:text-xl text-white/90">
              Conheça a história, missão e valores que nos guiam na construção de projetos excepcionais.
            </p>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Nossa História</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                A CRETTA Construtora e Incorporadora nasceu da visão de profissionais apaixonados por construção civil e inovação. 
                Com mais de 15 anos de experiência, consolidamos nossa reputação através de projetos de qualidade, 
                transparência e compromisso com nossos clientes.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Começamos como uma pequena empresa e crescemos para nos tornar uma referência no mercado de construção, 
                reformas e projetos de energia renovável. Cada projeto realizado é um testemunho do nosso dedicação à excelência.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Hoje, somos reconhecidos não apenas pelos edifícios que construímos, mas pela forma como os construímos: 
                com responsabilidade, sustentabilidade e sempre pensando no bem-estar de nossos clientes e da comunidade.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8 border-l-4 border-primary">
              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">15+</div>
                  <p className="text-gray-700">Anos de Experiência</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">100+</div>
                  <p className="text-gray-700">Projetos Realizados</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <p className="text-gray-700">Clientes Satisfeitos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão e Visão */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Missão e Visão</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Missão */}
            <div className="bg-white rounded-lg p-8 shadow-md border-t-4 border-primary">
              <div className="flex items-center gap-4 mb-6">
                <Target className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-bold text-primary">Nossa Missão</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Desenvolver projetos de construção civil, reformas e energia renovável com excelência técnica, 
                sustentabilidade e transparência, superando as expectativas de nossos clientes e contribuindo 
                para o desenvolvimento sustentável da comunidade.
              </p>
            </div>

            {/* Visão */}
            <div className="bg-white rounded-lg p-8 shadow-md border-t-4 border-primary">
              <div className="flex items-center gap-4 mb-6">
                <Award className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-bold text-primary">Nossa Visão</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Ser reconhecida como a construtora de referência no mercado, conhecida pela qualidade de seus projetos, 
                inovação em soluções sustentáveis, excelência no atendimento e compromisso com a responsabilidade social 
                e ambiental.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Nossos Valores</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Por Que Escolher a CRETTA?</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {differentials.map((differential, index) => (
              <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-md">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">✓</span>
                </div>
                <p className="text-gray-700 font-medium">{differential}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Nossa Equipe</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Users className="w-16 h-16 text-primary/30" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{member.name}</h3>
                  <p className="text-primary font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para começar seu projeto?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e descubra como podemos transformar suas ideias em realidade.
          </p>
          <Link href="/contato">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
              Solicitar Orçamento
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
