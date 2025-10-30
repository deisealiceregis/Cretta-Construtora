import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  id: number;
  titulo: string;
  descricao: string;
  fotoUrl?: string;
  tipo: 'construcao' | 'reforma' | 'projeto';
  status: string;
  progresso: number;
}

export default function ProjectCard({
  id,
  titulo,
  descricao,
  fotoUrl,
  tipo,
  status,
  progresso,
}: ProjectCardProps) {
  // Determinar a rota baseada no tipo
  const getRoute = () => {
    switch (tipo) {
      case 'construcao':
        return `/construcoes/${id}`;
      case 'reforma':
        return `/reformas/${id}`;
      case 'projeto':
        return `/projetos/${id}`;
      default:
        return '/portfolio';
    }
  };

  // Determinar a cor do badge baseado no status
  const getStatusColor = () => {
    switch (status) {
      case 'planejamento':
        return 'bg-blue-100 text-blue-800';
      case 'em_andamento':
        return 'bg-yellow-100 text-yellow-800';
      case 'concluida':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Traduzir status
  const getStatusLabel = () => {
    switch (status) {
      case 'planejamento':
        return 'Planejamento';
      case 'em_andamento':
        return 'Em Andamento';
      case 'concluida':
        return 'Concluída';
      default:
        return status;
    }
  };

  return (
    <Link href={getRoute()}>
      <a className="group block h-full">
        <div className="h-full bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col">
          {/* Imagem */}
          <div className="relative overflow-hidden bg-gray-200 h-48">
            {fotoUrl ? (
              <img
                src={fotoUrl}
                alt={titulo}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-accent">
                <span className="text-white text-4xl">📐</span>
              </div>
            )}
            {/* Badge de Status */}
            <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor()}`}>
              {getStatusLabel()}
            </div>
          </div>

          {/* Conteúdo */}
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-lg font-bold text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors">
              {titulo}
            </h3>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
              {descricao}
            </p>

            {/* Barra de Progresso */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-gray-700">Progresso</span>
                <span className="text-xs font-bold text-primary">{progresso}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progresso}%` }}
                />
              </div>
            </div>

            {/* Link */}
            <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:text-accent transition-colors">
              Ver Detalhes
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
