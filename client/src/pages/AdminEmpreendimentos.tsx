import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, X } from "lucide-react";

export default function AdminEmpreendimentos() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    localizacao: "",
    preco: "",
    unidades: "",
    area: "",
    tipo: "pronto" as "pronto" | "construcao" | "lancamento",
    progresso: "",
    previsaoConclusao: "",
    dataLancamento: "",
    diferenciais: "",
    imagensPrincipais: "",
  });

  // Verificar autenticação
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const username = localStorage.getItem("adminUsername");
    
    if (!token || !username || token.trim() === "" || username.trim() === "") {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUsername");
      setIsAuthenticated(false);
      setIsChecking(false);
      setTimeout(() => {
        setLocation("/admin/login");
      }, 100);
      return;
    }
    
    setIsAuthenticated(true);
    setIsChecking(false);
  }, [setLocation]);

  // Se está verificando ou não autenticado, não renderizar nada
  if (isChecking || !isAuthenticated) {
    return null;
  }

  const { data: empreendimentos = [], refetch } = trpc.empreendimentos.list.useQuery();
  const createMutation = trpc.empreendimentos.create.useMutation();
  const updateMutation = trpc.empreendimentos.update.useMutation();
  const deleteMutation = trpc.empreendimentos.delete.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      ...formData,
      unidades: formData.unidades ? parseInt(formData.unidades) : undefined,
      area: formData.area ? parseInt(formData.area) : undefined,
      progresso: formData.progresso ? parseInt(formData.progresso) : 0,
    };

    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, ...data });
        toast.success("Empreendimento atualizado com sucesso!");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("Empreendimento criado com sucesso!");
      }
      resetForm();
      refetch();
    } catch (error) {
      toast.error("Erro ao salvar empreendimento");
    }
  };

  const handleEdit = (emp: any) => {
    setFormData({
      titulo: emp.titulo,
      descricao: emp.descricao,
      localizacao: emp.localizacao,
      preco: emp.preco,
      unidades: emp.unidades?.toString() || "",
      area: emp.area?.toString() || "",
      tipo: emp.tipo,
      progresso: emp.progresso?.toString() || "",
      previsaoConclusao: emp.previsaoConclusao || "",
      dataLancamento: emp.dataLancamento || "",
      diferenciais: emp.diferenciais || "",
      imagensPrincipais: emp.imagensPrincipais || "",
    });
    setEditingId(emp.id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja deletar este empreendimento?")) {
      try {
        await deleteMutation.mutateAsync({ id });
        toast.success("Empreendimento deletado com sucesso!");
        refetch();
      } catch (error) {
        toast.error("Erro ao deletar empreendimento");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      titulo: "",
      descricao: "",
      localizacao: "",
      preco: "",
      unidades: "",
      area: "",
      tipo: "pronto",
      progresso: "",
      previsaoConclusao: "",
      dataLancamento: "",
      diferenciais: "",
      imagensPrincipais: "",
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Gerenciar Empreendimentos</h1>
          <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2">
            <Plus size={20} />
            Novo Empreendimento
          </Button>
        </div>

        {isFormOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {editingId ? "Editar Empreendimento" : "Novo Empreendimento"}
                </h2>
                <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Título *</label>
                    <Input
                      value={formData.titulo}
                      onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tipo *</label>
                    <select
                      value={formData.tipo}
                      onChange={(e) => setFormData({ ...formData, tipo: e.target.value as any })}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="pronto">Pronto</option>
                      <option value="construcao">Em Construção</option>
                      <option value="lancamento">Lançamento</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Descrição *</label>
                  <textarea
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    className="w-full border rounded px-3 py-2 h-24"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Localização *</label>
                    <Input
                      value={formData.localizacao}
                      onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Preço *</label>
                    <Input
                      value={formData.preco}
                      onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                      placeholder="Ex: R$ 500.000,00"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Unidades</label>
                    <Input
                      type="number"
                      value={formData.unidades}
                      onChange={(e) => setFormData({ ...formData, unidades: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Área (m²)</label>
                    <Input
                      type="number"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Progresso (%)</label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.progresso}
                      onChange={(e) => setFormData({ ...formData, progresso: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Previsão de Conclusão</label>
                    <Input
                      value={formData.previsaoConclusao}
                      onChange={(e) => setFormData({ ...formData, previsaoConclusao: e.target.value })}
                      placeholder="Ex: Dezembro 2024"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Data de Lançamento</label>
                    <Input
                      value={formData.dataLancamento}
                      onChange={(e) => setFormData({ ...formData, dataLancamento: e.target.value })}
                      placeholder="Ex: Janeiro 2024"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Diferenciais</label>
                  <textarea
                    value={formData.diferenciais}
                    onChange={(e) => setFormData({ ...formData, diferenciais: e.target.value })}
                    className="w-full border rounded px-3 py-2 h-20"
                    placeholder="Separe por quebra de linha"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">URLs de Imagens (separadas por vírgula)</label>
                  <textarea
                    value={formData.imagensPrincipais}
                    onChange={(e) => setFormData({ ...formData, imagensPrincipais: e.target.value })}
                    className="w-full border rounded px-3 py-2 h-20"
                    placeholder="https://exemplo.com/imagem1.jpg, https://exemplo.com/imagem2.jpg"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingId ? "Atualizar" : "Criar"} Empreendimento
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm} className="flex-1">
                    Cancelar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid gap-4">
          {empreendimentos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Nenhum empreendimento cadastrado</p>
              <Button onClick={() => setIsFormOpen(true)}>Criar Primeiro Empreendimento</Button>
            </div>
          ) : (
            empreendimentos.map((emp: any) => (
              <div key={emp.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{emp.titulo}</h3>
                    <p className="text-gray-600 text-sm">
                      {emp.tipo === "pronto" && "Pronto"}
                      {emp.tipo === "construcao" && "Em Construção"}
                      {emp.tipo === "lancamento" && "Lançamento"}
                      {" • "} {emp.localizacao}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(emp)}
                      className="flex items-center gap-2"
                    >
                      <Edit2 size={16} />
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(emp.id)}
                      className="flex items-center gap-2"
                    >
                      <Trash2 size={16} />
                      Deletar
                    </Button>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{emp.descricao}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Preço</p>
                    <p className="font-semibold">{emp.preco}</p>
                  </div>
                  {emp.unidades && (
                    <div>
                      <p className="text-gray-600">Unidades</p>
                      <p className="font-semibold">{emp.unidades}</p>
                    </div>
                  )}
                  {emp.area && (
                    <div>
                      <p className="text-gray-600">Área</p>
                      <p className="font-semibold">{emp.area} m²</p>
                    </div>
                  )}
                  {emp.tipo === "construcao" && emp.progresso !== undefined && (
                    <div>
                      <p className="text-gray-600">Progresso</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${emp.progresso}%` }}
                          />
                        </div>
                        <p className="font-semibold">{emp.progresso}%</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
