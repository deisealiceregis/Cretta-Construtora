import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Target, Eye, Users, Award, Zap } from "lucide-react";
import { Link } from "wouter";

export default function SobreNos() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre a CRETTA CONSTRUTORA E INCORPORADORA</h1>
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
              <p className="text-gray-600 mb-4">
                Fundada há mais de 15 anos, a CRETTA CONSTRUTORA E INCORPORADORA nasceu da visão de profissionais dedicados a transformar ideias em estruturas sólidas e sustentáveis.
              </p>
              <p className="text-gray-600 mb-4">
                Com uma trajetória marcada por excelência técnica e comprometimento com nossos clientes, realizamos mais de 100 projetos em diversas especialidades.
              </p>
              <p className="text-gray-600">
                Hoje, somos referência no mercado de construção civil, reformas e projetos de energia renovável, atendendo mais de 500 clientes satisfeitos.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <p className="text-gray-600">Anos de Experiência</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <p className="text-gray-600">Projetos Realizados</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <p className="text-gray-600">Clientes Satisfeitos</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <p className="text-gray-600">Comprometimento</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Missão e Visão */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Missão e Visão</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-l-4 border-primary">
              <div className="flex items-start gap-4">
                <Target className="text-primary flex-shrink-0 mt-1" size={32} />
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-3">Nossa Missão</h3>
                  <p className="text-gray-600">
                    Desenvolver projetos de construção, reformas e energia com excelência técnica, sustentabilidade e comprometimento total com a satisfação de nossos clientes.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-8 border-l-4 border-primary">
              <div className="flex items-start gap-4">
                <Eye className="text-primary flex-shrink-0 mt-1" size={32} />
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-3">Nossa Visão</h3>
                  <p className="text-gray-600">
                    Ser a construtora de referência no mercado, reconhecida pela qualidade, inovação e sustentabilidade em todos os nossos projetos.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Nossos Valores</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Award className="text-primary flex-shrink-0" size={28} />
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">Excelência Técnica</h3>
                  <p className="text-gray-600">
                    Executamos cada projeto com precisão, atenção aos detalhes e uso das melhores práticas de engenharia.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="text-primary flex-shrink-0" size={28} />
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">Comprometimento</h3>
                  <p className="text-gray-600">
                    Nos comprometemos com prazos, qualidade e satisfação total de nossos clientes em cada projeto.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Zap className="text-primary flex-shrink-0" size={28} />
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">Inovação</h3>
                  <p className="text-gray-600">
                    Buscamos constantemente novas tecnologias e metodologias para melhorar nossos processos.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Users className="text-primary flex-shrink-0" size={28} />
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">Transparência</h3>
                  <p className="text-gray-600">
                    Mantemos comunicação clara e honesta com nossos clientes em todas as etapas do projeto.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Por que escolher a CRETTA */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Por Que Escolher a CRETTA?</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Excelência em Engenharia Civil",
              "Qualidade e Atenção aos Detalhes",
              "Especialização em Geração de Energia",
              "Projetos Executivos e Estruturais",
              "Acompanhamento Completo das Obras",
              "Transparência e Comunicação Clara",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={24} />
                <p className="text-gray-700 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Nossa Equipe</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                nome: "Engenheiro Civil",
                cargo: "Diretor Técnico",
                descricao: "Responsável pela coordenação técnica de todos os projetos e obras.",
              },
              {
                nome: "Arquiteto",
                cargo: "Coordenador de Projetos",
                descricao: "Especialista em design e coordenação de projetos arquitetônicos.",
              },
              {
                nome: "Gestor de Obras",
                cargo: "Supervisor de Campo",
                descricao: "Acompanha a execução e garante a qualidade em todas as obras.",
              },
            ].map((membro, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-1">{membro.nome}</h3>
                <p className="text-sm text-primary font-semibold mb-3">{membro.cargo}</p>
                <p className="text-gray-600">{membro.descricao}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para começar seu projeto?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e vamos transformar sua visão em realidade.
          </p>
          <Link href="/contato">
            <Button size="lg" variant="secondary">
              Solicitar Orçamento
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
