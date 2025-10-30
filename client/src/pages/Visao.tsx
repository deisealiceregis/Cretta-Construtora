import { CheckCircle } from "lucide-react";

export default function Visao() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary text-white py-12 px-4">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Visão e Valores</h1>
          <p className="text-lg text-gray-200">Os princípios que guiam nossa empresa.</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-primary">Nossa Visão</h2>
              <p className="text-lg text-gray-700">
                Ser reconhecida como uma empresa líder no mercado de construção e engenharia civil, conhecida pela excelência, inovação e compromisso com a sustentabilidade.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 text-primary">Nossa Missão</h2>
              <p className="text-lg text-gray-700">
                Desenvolver projetos de construção e reformas com qualidade, segurança e excelência, superando as expectativas de nossos clientes e contribuindo para o desenvolvimento da comunidade.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-primary">Nossos Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Excelência", description: "Comprometimento com a qualidade em tudo que fazemos." },
                { title: "Integridade", description: "Honestidade e transparência em todas as relações." },
                { title: "Inovação", description: "Busca constante por novas soluções e tecnologias." },
                { title: "Sustentabilidade", description: "Respeito ao meio ambiente e responsabilidade social." },
                { title: "Segurança", description: "Prioridade máxima na proteção de nossos colaboradores e clientes." },
                { title: "Compromisso", description: "Dedicação total ao sucesso de cada projeto." },
              ].map((valor) => (
                <div key={valor.title} className="bg-white rounded-lg shadow-md p-6 border border-border">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">{valor.title}</h3>
                      <p className="text-gray-700">{valor.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
