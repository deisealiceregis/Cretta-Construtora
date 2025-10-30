import { useState } from "react";
import { X } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Portfolio() {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "construcoes" | "projetos" | "reformas">("all");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const construcoesQuery = trpc.construcoes.list.useQuery();
  const projetosQuery = trpc.projetos.list.useQuery();
  const reformasQuery = trpc.reformas.list.useQuery();

  const allProjects = [
    ...(construcoesQuery.data || []).map((p) => ({
      ...p,
      type: "construcoes",
      typeLabel: "Construção Civil",
      title: p.titulo,
      description: p.descricao,
      client: p.cliente,
      location: p.localizacao,
      area: p.area,
      imageUrl: p.fotoUrl,
      status: p.status === "em_andamento" ? "Em Andamento" : p.status === "concluida" ? "Concluída" : "Planejamento",
      progress: p.progresso,
    })),
    ...(projetosQuery.data || []).map((p) => ({
      ...p,
      type: "projetos",
      typeLabel: "Projeto de Energia",
      title: p.titulo,
      description: p.descricao,
      client: p.cliente,
      location: p.localizacao,
      area: p.area,
      imageUrl: p.fotoUrl,
      status: p.status === "em_andamento" ? "Em Andamento" : p.status === "concluida" ? "Concluída" : "Planejamento",
      progress: p.progresso,
    })),
    ...(reformasQuery.data || []).map((p) => ({
      ...p,
      type: "reformas",
      typeLabel: "Reforma",
      title: p.titulo,
      description: p.descricao,
      client: p.cliente,
      location: p.localizacao,
      area: p.area,
      imageUrl: p.fotoUrl,
      status: p.status === "em_andamento" ? "Em Andamento" : p.status === "concluida" ? "Concluída" : "Planejamento",
      progress: p.progresso,
    })),
  ];

  const filteredProjects =
    selectedFilter === "all"
      ? allProjects
      : allProjects.filter((p) => p.type === selectedFilter);

  const filters = [
    { id: "all", label: "Todos os Projetos" },
    { id: "construcoes", label: "Construção Civil" },
    { id: "projetos", label: "Projetos de Energia" },
    { id: "reformas", label: "Reformas" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-gray-900 text-white py-16 px-4">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nosso Portfólio</h1>
          <p className="text-lg text-gray-200">
            Conheça os projetos realizados pela CRETTA CONSTRUTORA E INCORPORADORA
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 border-b border-gray-200">
        <div className="container">
          <div className="flex flex-wrap gap-4 justify-center">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id as any)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedFilter === filter.id
                    ? "bg-primary text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 px-4">
        <div className="container">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhum projeto encontrado nesta categoria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Image Container */}
                  <div className="relative h-64 bg-gray-200 overflow-hidden">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                        <span className="text-gray-600 text-center px-4">Sem imagem</span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.typeLabel}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Project Info */}
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      {project.client && (
                        <p>
                          <span className="font-semibold">Cliente:</span> {project.client}
                        </p>
                      )}
                      {project.location && (
                        <p>
                          <span className="font-semibold">Localização:</span> {project.location}
                        </p>
                      )}
                      {project.area && (
                        <p>
                          <span className="font-semibold">Área:</span> {project.area} m²
                        </p>
                      )}
                    </div>

                    {/* Status Badge */}
                    {project.status && (
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            project.status === "Concluída"
                              ? "bg-green-500"
                              : project.status === "Em Andamento"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                          }`}
                        />
                        <span className="text-xs font-medium text-gray-600">
                          {project.status}
                        </span>
                      </div>
                    )}

                    {/* Progress Bar */}
                    {project.progress !== undefined && (
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-medium text-gray-600">Progresso</span>
                          <span className="text-xs font-bold text-primary">{Math.round(project.progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.round(project.progress)}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Click to View Button */}
                    <button className="w-full mt-4 bg-primary text-white py-2 rounded-lg font-medium hover:bg-opacity-90 transition">
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X size={24} />
            </button>

            {/* Modal Image */}
            {selectedProject.imageUrl && (
              <div className="w-full h-96 overflow-hidden">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Modal Content */}
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedProject.title}
                  </h2>
                  <p className="text-primary font-medium">{selectedProject.typeLabel}</p>
                </div>
              </div>

              <p className="text-gray-600 mb-6 text-lg">
                {selectedProject.description}
              </p>

              {/* Project Details Grid */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                {selectedProject.client && (
                  <div>
                    <p className="text-gray-600 text-sm font-semibold mb-1">Cliente</p>
                    <p className="text-gray-900 font-medium">{selectedProject.client}</p>
                  </div>
                )}
                {selectedProject.location && (
                  <div>
                    <p className="text-gray-600 text-sm font-semibold mb-1">Localização</p>
                    <p className="text-gray-900 font-medium">{selectedProject.location}</p>
                  </div>
                )}
                {selectedProject.area && (
                  <div>
                    <p className="text-gray-600 text-sm font-semibold mb-1">Área</p>
                    <p className="text-gray-900 font-medium">{selectedProject.area} m²</p>
                  </div>
                )}
                {selectedProject.status && (
                  <div>
                    <p className="text-gray-600 text-sm font-semibold mb-1">Status</p>
                    <p className="text-gray-900 font-medium">{selectedProject.status}</p>
                  </div>
                )}
              </div>

              {/* Progress */}
              {selectedProject.progress !== undefined && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-600 font-semibold">Progresso da Obra</p>
                    <p className="text-primary font-bold">{Math.round(selectedProject.progress)}%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all duration-300"
                      style={{ width: `${Math.round(selectedProject.progress)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
