import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO } from "@/const";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-black text-white py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{COMPANY_INFO.name}</h1>
          <p className="text-2xl text-accent mb-6">{COMPANY_INFO.tagline}</p>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            {COMPANY_INFO.description}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/construcoes">
              <Button className="bg-accent text-primary hover:bg-opacity-90 flex items-center gap-2">
                Ver Construções <ArrowRight size={20} />
              </Button>
            </Link>
            <Link href="/contato">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Entrar em Contato
              </Button>
            </Link>
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

      {/* Services Section */}
      <section className="py-16 px-4">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center text-primary">Nossos Serviços</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Construção",
                description: "Projetos executivos e estruturais com qualidade e excelência.",
                href: "/construcoes",
              },
              {
                title: "Projetos",
                description: "Acompanhamento completo da implantação das obras.",
                href: "/projetos",
              },
              {
                title: "Reformas",
                description: "Especialização em geração de energia e construção de edificações.",
                href: "/reformas",
              },
            ].map((service) => (
              <Link key={service.title} href={service.href}>
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer border border-border">
                  <h3 className="text-2xl font-bold mb-4 text-primary">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <div className="flex items-center gap-2 text-accent font-semibold">
                    Saiba mais <ArrowRight size={20} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center text-primary">Por que escolher a CRETTA?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "Excelência em Engenharia Civil",
              "Projetos Executivos e Estruturais",
              "Qualidade e Atenção aos Detalhes",
              "Acompanhamento Completo das Obras",
              "Especialização em Geração de Energia",
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
