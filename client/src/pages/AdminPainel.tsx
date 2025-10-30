import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, X, LogOut } from "lucide-react";

export default function AdminPainel() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("empreendimentos");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formType, setFormType] = useState<"empreendimentos" | "projetos" | "reformas">("empreendimentos");

  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    localizacao: "",
    preco: "",
    metragem: "",
    unidades: "",
    area: "",
    pavimentos: "",
    quartos: "",
    banheiros: "",
    vagas: "",
    tipo: "pronto",
    progresso: "",
    previsaoConclusao: "",
    dataLancamento: "",
    diferenciais: "",
    imagensPrincipais: "",
    tipo_reforma: "",
  });

  // Verificar autenticação
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  const { data: empreendimentos = [], refetch: refetchEmpreendimentos } = trpc.empreendimentos.list.useQuery();
  const createMutation = trpc.empreendimentos.create.useMutation();
  const updateMutation = trpc.empreendimentos.update.useMutation();
  const deleteMutation = trpc.empreendimentos.delete.useMutation();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
    toast.success("Logout realizado!");
    setLocation("/admin/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      titulo: formData.titulo,
      descricao: formData.descricao,
      localizacao: formData.localizacao,
      preco: formData.preco,
      tipo: formData.tipo as "pronto" | "construcao" | "lancamento",
      metragem: formData.metragem ? parseInt(formData.metragem) : undefined,
      unidades: formData.unidades ? parseInt(formData.unidades) : undefined,
      area: formData.area ? parseInt(formData.area) : undefined,
      pavimentos: formData.pavimentos ? parseInt(formData.pavimentos) : undefined,
      quartos: formData.quartos ? parseInt(formData.quartos) : undefined,
      banheiros: formData.banheiros ? parseInt(formData.banheiros) : undefined,
      vagas: formData.vagas ? parseInt(formData.vagas) : undefined,
      progresso: formData.progresso ? parseInt(formData.progresso) : 0,
      previsaoConclusao: formData.previsaoConclusao || undefined,
      dataLancamento: formData.dataLancamento || undefined,
      diferenciais: formData.diferenciais || undefined,
      imagensPrincipais: formData.imagensPrincipais || undefined,
    };

    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, ...data });
        toast.success("Atualizado com sucesso!");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("Criado com sucesso!");
      }
      resetForm();
      refetchEmpreendimentos();
    } catch (error) {
      toast.error("Erro ao salvar");
    }
  };

  const handleEdit = (emp: any) => {
    setFormData({
      titulo: emp.titulo,
      descricao: emp.descricao,
      localizacao: emp.localizacao,
      preco: emp.preco,
      metragem: emp.metragem?.toString() || "",
      unidades: emp.unidades?.toString() || "",
      area: emp.area?.toString() || "",
      pavimentos: emp.pavimentos?.toString() || "",
      quartos: emp.quartos?.toString() || "",
      banheiros: emp.banheiros?.toString() || "",
      vagas: emp.vagas?.toString() || "",
      tipo: emp.tipo,
      progresso: emp.progresso?.toString() || "",
      previsaoConclusao: emp.previsaoConclusao || "",
      dataLancamento: emp.dataLancamento || "",
      diferenciais: emp.diferenciais || "",
      imagensPrincipais: emp.imagensPrincipais || "",
      tipo_reforma: "",
    });
    setEditingId(emp.id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza?")) {
      try {
        await deleteMutation.mutateAsync({ id });
        toast.success("Deletado com sucesso!");
        refetchEmpreendimentos();
      } catch (error) {
        toast.error("Erro ao deletar");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      titulo: "",
      descricao: "",
      localizacao: "",
      preco: "",
      metragem: "",
      unidades: "",
      area: "",
      pavimentos: "",
      quartos: "",
      banheiros: "",
      vagas: "",
      tipo: "pronto",
      progresso: "",
      previsaoConclusao: "",
      dataLancamento: "",
      diferenciais: "",
      imagensPrincipais: "",
      tipo_reforma: "",
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-black text-white p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
            <p className="text-sm opacity-90">CRETTA Construtora e Incorporadora</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut size={20} />
            Sair
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="empreendimentos">Empreendimentos</TabsTrigger>
            <TabsTrigger value="projetos">Projetos</TabsTrigger>
            <TabsTrigger value="reformas">Reformas</TabsTrigger>
          </TabsList>

          {/* Empreendimentos Tab */}
          <TabsContent value="empreendimentos" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gerenciar Empreendimentos</h2>
              <Button onClick={() => { setFormType("empreendimentos"); setIsFormOpen(true); }} className="flex items-center gap-2">
                <Plus size={20} />
                Novo Empreendimento
              </Button>
            </div>

            <div className="grid gap-4">
              {empreendimentos.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg">
                  <p className="text-gray-500 mb-4">Nenhum empreendimento cadastrado</p>
                </div>
              ) : (
                empreendimentos.map((emp: any) => (
                  <div key={emp.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold">{emp.titulo}</h3>
                        <p className="text-gray-600">{emp.localizacao}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => { handleEdit(emp); setFormType("empreendimentos"); }}>
                          <Edit2 size={16} />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(emp.id)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{emp.descricao}</p>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 font-semibold">Preço</p>
                        <p>{emp.preco}</p>
                      </div>
                      {emp.metragem && (
                        <div>
                          <p className="text-gray-600 font-semibold">Metragem</p>
                          <p>{emp.metragem} m²</p>
                        </div>
                      )}
                      {emp.unidades && (
                        <div>
                          <p className="text-gray-600 font-semibold">Unidades</p>
                          <p>{emp.unidades}</p>
                        </div>
                      )}
                      {emp.progresso > 0 && (
                        <div>
                          <p className="text-gray-600 font-semibold">Progresso</p>
                          <div className="flex items-center gap-1">
                            <div className="flex-1 bg-gray-200 rounded h-2">
                              <div className="bg-primary h-2 rounded" style={{ width: `${emp.progresso}%` }} />
                            </div>
                            <span>{emp.progresso}%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          {/* Projetos Tab */}
          <TabsContent value="projetos" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gerenciar Projetos</h2>
              <Button onClick={() => { setFormType("projetos"); setIsFormOpen(true); }} className="flex items-center gap-2">
                <Plus size={20} />
                Novo Projeto
              </Button>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              Projetos em desenvolvimento...
            </div>
          </TabsContent>

          {/* Reformas Tab */}
          <TabsContent value="reformas" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gerenciar Reformas</h2>
              <Button onClick={() => { setFormType("reformas"); setIsFormOpen(true); }} className="flex items-center gap-2">
                <Plus size={20} />
                Nova Reforma
              </Button>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              Reformas em desenvolvimento...
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {editingId ? "Editar" : "Novo"} {formType === "empreendimentos" ? "Empreendimento" : formType === "projetos" ? "Projeto" : "Reforma"}
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
                  <label className="block text-sm font-medium mb-1">Preço *</label>
                  <Input
                    value={formData.preco}
                    onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                    placeholder="R$ 500.000,00"
                    required
                  />
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
                {formType === "empreendimentos" && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Tipo</label>
                    <select
                      value={formData.tipo}
                      onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="pronto">Pronto</option>
                      <option value="construcao">Em Construção</option>
                      <option value="lancamento">Lançamento</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Metragem (m²)</label>
                  <Input
                    type="number"
                    value={formData.metragem}
                    onChange={(e) => setFormData({ ...formData, metragem: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Pavimentos</label>
                  <Input
                    type="number"
                    value={formData.pavimentos}
                    onChange={(e) => setFormData({ ...formData, pavimentos: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Quartos</label>
                  <Input
                    type="number"
                    value={formData.quartos}
                    onChange={(e) => setFormData({ ...formData, quartos: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Banheiros</label>
                  <Input
                    type="number"
                    value={formData.banheiros}
                    onChange={(e) => setFormData({ ...formData, banheiros: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Vagas</label>
                  <Input
                    type="number"
                    value={formData.vagas}
                    onChange={(e) => setFormData({ ...formData, vagas: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Unidades</label>
                  <Input
                    type="number"
                    value={formData.unidades}
                    onChange={(e) => setFormData({ ...formData, unidades: e.target.value })}
                  />
                </div>
              </div>

              {formType === "empreendimentos" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Progresso (%) - {formData.progresso}%</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={formData.progresso}
                        onChange={(e) => setFormData({ ...formData, progresso: e.target.value })}
                        className="w-full"
                      />
                      <div className="mt-2 bg-gray-200 rounded h-3 overflow-hidden">
                        <div className="bg-primary h-full transition-all" style={{ width: `${formData.progresso}%` }} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Previsão de Conclusão</label>
                      <Input
                        value={formData.previsaoConclusao}
                        onChange={(e) => setFormData({ ...formData, previsaoConclusao: e.target.value })}
                        placeholder="Dez/2024"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Data de Lançamento</label>
                    <Input
                      value={formData.dataLancamento}
                      onChange={(e) => setFormData({ ...formData, dataLancamento: e.target.value })}
                      placeholder="Jan/2024"
                    />
                  </div>
                </>
              )}

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
                  placeholder="https://exemplo.com/img1.jpg, https://exemplo.com/img2.jpg"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">
                  {editingId ? "Atualizar" : "Criar"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} className="flex-1">
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
