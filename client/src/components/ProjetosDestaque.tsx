import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { trpc } from '@/lib/trpc';

export default function ProjetosDestaque() {
  const [projetos, setProjetos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Buscar dados de construções, reformas e projetos
  const construcoesQuery = trpc.construcoes.list.useQuery();
  const reformasQuery = trpc.reformas.list.useQuery();
  const projetosQuery = trpc.projetos.list.useQuery();

  useEffect(() => {
    // Combinar dados de todas as categorias
    const todosProjetos: any[] = [];

    // Adicionar construções
    if (construcoesQuery.data) {
      todosProjetos.push(
        ...construcoesQuery.data.slice(0, 2).map((c: any) => ({
          ...c,
          tipo: 'construcao',
        }))
      );
    }

    // Adicionar reformas
    if (reformasQuery.data) {
      todosProjetos.push(
        ...reformasQuery.data.slice(0, 2).map((r: any) => ({
          ...r,
          tipo: 'reforma',
        }))
      );
    }

    // Adicionar projetos
    if (projetosQuery.data) {
      todosProjetos.push(
        ...projetosQuery.data.slice(0, 2).map((p: any) => ({
          ...p,
          tipo: 'projeto',
        }))
      );
    }

    setProjetos(todosProjetos);
    setIsLoading(false);
  }, [construcoesQuery.data, reformasQuery.data, projetosQuery.data]);

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Projetos em Destaque</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Conheça alguns dos nossos melhores projetos realizados
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg h-80 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Projetos em Destaque</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Conheça alguns dos nossos melhores projetos realizados em Construção Civil, Reformas e Projetos Estruturais
          </p>
        </div>

        {/* Grid de Projetos */}
        {projetos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {projetos.map((projeto) => (
                <ProjectCard
                  key={`${projeto.tipo}-${projeto.id}`}
                  id={projeto.id}
                  titulo={projeto.titulo}
                  descricao={projeto.descricao}
                  fotoUrl={projeto.fotoUrl}
                  tipo={projeto.tipo}
                  status={projeto.status}
                  progresso={projeto.progresso}
                />
              ))}
            </div>

            {/* CTA para Ver Mais */}
            <div className="text-center">
              <Link href="/portfolio">
                <a className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Ver Todos os Projetos
                  <ArrowRight size={20} />
                </a>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum projeto disponível no momento. Volte em breve!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
