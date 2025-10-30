import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Construcoes() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    cliente: "",
    localizacao: "",
    pavimentos: "",
    apartamentos: "",
    area: "",
    fotoUrl: "",
  });

  const { data: construcoes = [], isLoading, refetch } = trpc.construcoes.list.useQuery();
  const createMutation = trpc.construcoes.create.useMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync({
        titulo: formData.titulo,
        descricao: formData.descricao,
        cliente: formData.cliente,
        localizacao: formData.localizacao,
        pavimentos: formData.pavimentos ? parseInt(formData.pavimentos) : undefined,
        apartamentos: formData.apartamentos ? parseInt(formData.apartamentos) : undefined,
        area: formData.area ? parseInt(formData.area) : undefined,
        fotoUrl: formData.fotoUrl || undefined,
      });
      toast.success("Construção adicionada com sucesso!");
      setFormData({
        titulo: "",
        descricao: "",
        cliente: "",
        localizacao: "",
        pavimentos: "",
        apartamentos: "",
        area: "",
        fotoUrl: "",
      });
      setShowForm(false);
      refetch();
    } catch (error) {
      toast.error("Erro ao adicionar construção");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary text-white py-12 px-4">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Construções</h1>
          <p className="text-lg text-gray-200">
            Acompanhe o progresso de nossas construções em tempo real. Adicione novas construções com fotos e informações detalhadas.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container">
          <div className="bg-white rounded-lg shadow-md p-8 mb-8 border border-border">
            <h2 className="text-3xl font-bold mb-4 text-primary">Construções</h2>
            <p className="text-gray-600 mb-6">
              Conheça nossos projetos em desenvolvimento. Cada projeto é executado com precisão e atenção aos detalhes.
            </p>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
            >
              <Plus size={20} />
              Adicionar Nova Construção
            </Button>
          </div>

          {showForm && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-8 border border-border">
              <h3 className="text-2xl font-bold mb-6 text-primary">Adicionar Nova Construção</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título da Construção
                  </label>
                  <input
                    type="text"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Ex: Edifício Residencial Centro"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Descreva o projeto..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cliente
                    </label>
                    <input
                      type="text"
                      name="cliente"
                      value={formData.cliente}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Nome do cliente"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Localização
                    </label>
                    <input
                      type="text"
                      name="localizacao"
                      value={formData.localizacao}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Endereço do projeto"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pavimentos
                    </label>
                    <input
                      type="number"
                      name="pavimentos"
                      value={formData.pavimentos}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Número de pavimentos"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apartamentos
                    </label>
                    <input
                      type="number"
                      name="apartamentos"
                      value={formData.apartamentos}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Número de apartamentos"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Área (m²)
                    </label>
                    <input
                      type="number"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Área em metros quadrados"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL da Foto
                  </label>
                  <input
                    type="url"
                    name="fotoUrl"
                    value={formData.fotoUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://exemplo.com/foto.jpg"
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="bg-primary text-white hover:bg-primary/90">
                    Salvar Construção
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Carregando construções...</p>
            </div>
          ) : construcoes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {construcoes.map((construcao) => (
                <div
                  key={construcao.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-border hover:shadow-lg transition"
                >
                  {construcao.fotoUrl && (
                    <img
                      src={construcao.fotoUrl}
                      alt={construcao.titulo}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-primary">{construcao.titulo}</h3>
                    <p className="text-gray-600 mb-4">{construcao.descricao}</p>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        <strong>Cliente:</strong> {construcao.cliente}
                      </p>
                      <p>
                        <strong>Localização:</strong> {construcao.localizacao}
                      </p>
                      {construcao.pavimentos && (
                        <p>
                          <strong>Pavimentos:</strong> {construcao.pavimentos}
                        </p>
                      )}
                      {construcao.apartamentos && (
                        <p>
                          <strong>Apartamentos:</strong> {construcao.apartamentos}
                        </p>
                      )}
                      {construcao.area && (
                        <p>
                          <strong>Área:</strong> {construcao.area} m²
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center border border-border">
              <p className="text-gray-600 text-lg">
                Nenhuma construção cadastrada ainda. Adicione uma para começar!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
