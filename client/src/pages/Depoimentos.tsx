import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Depoimentos() {
  const { data: depoimentos = [], isLoading, refetch } = trpc.depoimentos.list.useQuery();
  const createMutation = trpc.depoimentos.create.useMutation();
  const updateMutation = trpc.depoimentos.update.useMutation();
  const deleteMutation = trpc.depoimentos.delete.useMutation();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    cargo: "",
    empresa: "",
    texto: "",
    avaliacao: 5,
    fotoUrl: "",
  });

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % depoimentos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + depoimentos.length) % depoimentos.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, ...formData });
        toast.success("Depoimento atualizado com sucesso!");
      } else {
        await createMutation.mutateAsync(formData);
        toast.success("Depoimento adicionado com sucesso!");
      }
      setFormData({ nome: "", cargo: "", empresa: "", texto: "", avaliacao: 5, fotoUrl: "" });
      setShowForm(false);
      setEditingId(null);
      refetch();
    } catch (error) {
      toast.error("Erro ao salvar depoimento");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Depoimento removido com sucesso!");
      refetch();
    } catch (error) {
      toast.error("Erro ao remover depoimento");
    }
  };

  const handleEdit = (depoimento: typeof depoimentos[0]) => {
    setFormData({
      nome: depoimento.nome,
      cargo: depoimento.cargo,
      empresa: depoimento.empresa,
      texto: depoimento.texto,
      avaliacao: depoimento.avaliacao,
      fotoUrl: depoimento.fotoUrl || "",
    });
    setEditingId(depoimento.id);
    setShowForm(true);
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  const currentDepoimento = depoimentos[currentIndex];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Depoimentos de Clientes</h1>
            <p className="text-lg md:text-xl text-white/90">
              Veja o que nossos clientes satisfeitos dizem sobre nossos serviços.
            </p>
          </div>
        </div>
      </section>

      {/* Depoimentos Carousel */}
      <section className="py-16 md:py-24">
        <div className="container">
          {depoimentos.length > 0 ? (
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 md:p-12 relative">
                {/* Avaliação em Estrelas */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={24}
                      className={i < currentDepoimento.avaliacao ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>

                {/* Texto do Depoimento */}
                <p className="text-xl text-gray-700 mb-8 italic">
                  "{currentDepoimento.texto}"
                </p>

                {/* Informações do Cliente */}
                <div className="flex items-center gap-4 mb-8">
                  {currentDepoimento.fotoUrl && (
                    <img
                      src={currentDepoimento.fotoUrl}
                      alt={currentDepoimento.nome}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-primary">{currentDepoimento.nome}</h3>
                    <p className="text-gray-600">{currentDepoimento.cargo}</p>
                    <p className="text-sm text-gray-500">{currentDepoimento.empresa}</p>
                  </div>
                </div>

                {/* Controles de Navegação */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrev}
                    disabled={depoimentos.length <= 1}
                  >
                    <ChevronLeft size={20} />
                  </Button>

                  <div className="flex gap-2">
                    {depoimentos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentIndex ? "bg-primary" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNext}
                    disabled={depoimentos.length <= 1}
                  >
                    <ChevronRight size={20} />
                  </Button>
                </div>

                {/* Contador */}
                <p className="text-center text-sm text-gray-500 mt-4">
                  {currentIndex + 1} de {depoimentos.length}
                </p>
              </Card>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-6">Nenhum depoimento cadastrado ainda.</p>
              <Button onClick={() => setShowForm(true)}>
                <Plus size={20} className="mr-2" />
                Adicionar Depoimento
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Formulário de Depoimento */}
      {showForm && (
        <section className="py-16 bg-gray-50">
          <div className="container max-w-2xl">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">
                {editingId ? "Editar Depoimento" : "Adicionar Novo Depoimento"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                    <input
                      type="text"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cargo</label>
                    <input
                      type="text"
                      value={formData.cargo}
                      onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
                  <input
                    type="text"
                    value={formData.empresa}
                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Depoimento</label>
                  <textarea
                    value={formData.texto}
                    onChange={(e) => setFormData({ ...formData, texto: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent h-32"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Avaliação (1-5)</label>
                    <select
                      value={formData.avaliacao}
                      onChange={(e) => setFormData({ ...formData, avaliacao: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n} Estrela{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Foto (URL)</label>
                    <input
                      type="url"
                      value={formData.fotoUrl}
                      onChange={(e) => setFormData({ ...formData, fotoUrl: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    {editingId ? "Atualizar" : "Adicionar"} Depoimento
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                      setFormData({ nome: "", cargo: "", empresa: "", texto: "", avaliacao: 5, fotoUrl: "" });
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </section>
      )}

      {/* Lista de Depoimentos para Admin */}
      {depoimentos.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-primary mb-8">Gerenciar Depoimentos</h2>
            <div className="grid gap-4">
              {depoimentos.map((depoimento) => (
                <Card key={depoimento.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex gap-2 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < depoimento.avaliacao ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-2">"{depoimento.texto}"</p>
                      <p className="font-semibold text-primary">{depoimento.nome}</p>
                      <p className="text-sm text-gray-600">{depoimento.cargo} - {depoimento.empresa}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(depoimento)}
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(depoimento.id)}
                      >
                        Deletar
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            {!showForm && (
              <Button onClick={() => setShowForm(true)} className="mt-6">
                <Plus size={20} className="mr-2" />
                Adicionar Novo Depoimento
              </Button>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
