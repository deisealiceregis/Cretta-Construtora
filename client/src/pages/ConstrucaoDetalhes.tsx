import { useRoute } from 'wouter';
import { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, Users, Ruler, Building2 } from 'lucide-react';
import { Link } from 'wouter';
import { trpc } from '@/lib/trpc';

export default function ConstrucaoDetalhes() {
  const [route, params] = useRoute('/construcoes/:id');
  const [construcao, setConstrucao] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const id = params?.id ? parseInt(params.id) : null;

  // Buscar detalhes da construção
  const query = trpc.construcoes.getById.useQuery(
    { id: id || 0 },
    { enabled: !!id }
  );

  useEffect(() => {
    if (query.data) {
      setConstrucao(query.data);
      setIsLoading(false);
    }
  }, [query.data]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando detalhes do projeto...</p>
        </div>
      </div>
    );
  }

  if (!construcao) {
    return (
      <div className="min-h-screen bg-background">
        <section className="bg-primary text-white py-12 px-4">
          <div className="container">
            <Link href="/portfolio">
              <a className="flex items-center gap-2 mb-4 hover:opacity-80 transition">
                <ArrowLeft size={20} />
                Voltar
              </a>
            </Link>
            <h1 className="text-4xl font-bold">Projeto não encontrado</h1>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-white py-12 px-4">
        <div className="container">
          <Link href="/portfolio">
            <a className="flex items-center gap-2 mb-4 hover:opacity-80 transition">
              <ArrowLeft size={20} />
              Voltar
            </a>
          </Link>
          <h1 className="text-4xl font-bold mb-4">{construcao.titulo}</h1>
          <p className="text-lg text-gray-200">{construcao.descricao}</p>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-16 px-4">
        <div className="container max-w-4xl">
          {/* Imagem Principal */}
          {construcao.fotoUrl && (
            <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
              <img
                src={construcao.fotoUrl}
                alt={construcao.titulo}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          {/* Grid de Informações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Informações do Projeto */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Informações do Projeto</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <MapPin className="text-accent flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-700">Localização</h3>
                    <p className="text-gray-600">{construcao.localizacao}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Building2 className="text-accent flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-700">Pavimentos</h3>
                    <p className="text-gray-600">{construcao.pavimentos || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Users className="text-accent flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-700">Apartamentos</h3>
                    <p className="text-gray-600">{construcao.apartamentos || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Ruler className="text-accent flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-700">Área Total</h3>
                    <p className="text-gray-600">{construcao.area ? `${construcao.area} m²` : 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status e Progresso */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Status do Projeto</h2>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">Cliente</h3>
                  <p className="text-gray-600">{construcao.cliente}</p>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">Status</h3>
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                    construcao.status === 'concluida'
                      ? 'bg-green-100 text-green-800'
                      : construcao.status === 'em_andamento'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {construcao.status === 'concluida'
                      ? 'Concluída'
                      : construcao.status === 'em_andamento'
                      ? 'Em Andamento'
                      : 'Planejamento'}
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Progresso</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex-grow">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-300"
                          style={{ width: `${construcao.progresso}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xl font-bold text-primary">{construcao.progresso}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-primary text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Interessado neste projeto?</h2>
            <p className="mb-6 text-gray-100">Entre em contato conosco para mais informações ou solicite um orçamento.</p>
            <Link href="/contato">
              <a className="inline-block bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition">
                Solicitar Orçamento
              </a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
