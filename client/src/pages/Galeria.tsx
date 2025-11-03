import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, X } from "lucide-react";

export default function Galeria() {
  const { data: videos = [] } = trpc.videos.list.useQuery();
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [filtroTipo, setFiltroTipo] = useState<"construcao" | "projeto" | "reforma" | "todos">("todos");

  const videosFiltered = filtroTipo === "todos" 
    ? videos 
    : videos.filter(v => v.tipo === filtroTipo);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Galeria de Vídeos</h1>
          <p className="text-lg opacity-90">Acompanhe nossos projetos em construção e reformas realizadas</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-3">
            <Button
              variant={filtroTipo === "todos" ? "default" : "outline"}
              onClick={() => setFiltroTipo("todos")}
            >
              Todos
            </Button>
            <Button
              variant={filtroTipo === "construcao" ? "default" : "outline"}
              onClick={() => setFiltroTipo("construcao")}
            >
              Empreendimentos
            </Button>
            <Button
              variant={filtroTipo === "projeto" ? "default" : "outline"}
              onClick={() => setFiltroTipo("projeto")}
            >
              Projetos
            </Button>
            <Button
              variant={filtroTipo === "reforma" ? "default" : "outline"}
              onClick={() => setFiltroTipo("reforma")}
            >
              Reformas
            </Button>
          </div>
        </div>
      </div>

      {/* Galeria de Vídeos */}
      <div className="container mx-auto px-4 py-12">
        {videosFiltered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum vídeo disponível nesta categoria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videosFiltered.map((video) => (
              <Card
                key={video.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => setSelectedVideo(video)}
              >
                {/* Thumbnail */}
                <div className="relative bg-black aspect-video flex items-center justify-center overflow-hidden">
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <Play className="w-16 h-16 text-primary/40" />
                    </div>
                  )}
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
                    <div className="bg-primary rounded-full p-4 group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{video.titulo}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.descricao}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary capitalize">
                      {video.tipo === "construcao" ? "Empreendimento" : video.tipo === "projeto" ? "Projeto" : "Reforma"}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">
                      {video.status === "em_andamento" ? "Em Andamento" : video.status === "planejamento" ? "Planejamento" : "Concluído"}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Vídeo */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-black rounded-lg max-w-4xl w-full">
            {/* Header do Modal */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-white font-bold text-lg">{selectedVideo.titulo}</h2>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Vídeo */}
            <div className="aspect-video bg-black flex items-center justify-center">
              <iframe
                width="100%"
                height="100%"
                src={selectedVideo.url.includes("youtube.com") || selectedVideo.url.includes("youtu.be")
                  ? selectedVideo.url.replace("watch?v=", "embed/")
                  : selectedVideo.url}
                title={selectedVideo.titulo}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Descrição */}
            <div className="p-6 text-white">
              <p className="text-gray-300 mb-4">{selectedVideo.descricao}</p>
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Tipo: </span>
                  <span className="text-white capitalize">
                    {selectedVideo.tipo === "construcao" ? "Empreendimento" : selectedVideo.tipo === "projeto" ? "Projeto" : "Reforma"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Status: </span>
                  <span className="text-white capitalize">
                    {selectedVideo.status === "em_andamento" ? "Em Andamento" : selectedVideo.status === "planejamento" ? "Planejamento" : "Concluído"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
