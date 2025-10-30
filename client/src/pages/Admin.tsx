import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Trash2, Plus, Save } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("cores");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>({});

  // Settings
  const { data: settings } = trpc.settings.get.useQuery();
  const updateSettingsMutation = trpc.settings.update.useMutation();

  // Construções
  const { data: construcoes = [], refetch: refetchConstrucoes } = trpc.construcoes.list.useQuery();
  const updateConstrucaoMutation = trpc.construcoes.update.useMutation();
  const deleteConstrucaoMutation = trpc.construcoes.delete.useMutation();

  // Projetos
  const { data: projetos = [], refetch: refetchProjetos } = trpc.projetos.list.useQuery();
  const updateProjetoMutation = trpc.projetos.update.useMutation();
  const deleteProjetoMutation = trpc.projetos.delete.useMutation();

  // Reformas
  const { data: reformas = [], refetch: refetchReformas } = trpc.reformas.list.useQuery();
  const updateReformaMutation = trpc.reformas.update.useMutation();
  const deleteReformaMutation = trpc.reformas.delete.useMutation();

  const handleSaveColors = async () => {
    try {
      await updateSettingsMutation.mutateAsync({
        primaryColor: editData.primaryColor || settings?.primaryColor,
        secondaryColor: editData.secondaryColor || settings?.secondaryColor,
        accentColor: editData.accentColor || settings?.accentColor,
      });
      toast.success("Cores atualizadas com sucesso!");
      setEditData({});
    } catch (error) {
      toast.error("Erro ao atualizar cores");
    }
  };

  const handleUpdateItem = async (type: "construcoes" | "projetos" | "reformas", id: number) => {
    try {
      if (type === "construcoes") {
        await updateConstrucaoMutation.mutateAsync({ id, ...editData });
        refetchConstrucoes();
      } else if (type === "projetos") {
        await updateProjetoMutation.mutateAsync({ id, ...editData });
        refetchProjetos();
      } else {
        await updateReformaMutation.mutateAsync({ id, ...editData });
        refetchReformas();
      }
      toast.success("Item atualizado com sucesso!");
      setEditingId(null);
      setEditData({});
    } catch (error) {
      toast.error("Erro ao atualizar item");
    }
  };

  const handleDeleteItem = async (type: "construcoes" | "projetos" | "reformas", id: number) => {
    if (!confirm("Tem certeza que deseja deletar este item?")) return;
    try {
      if (type === "construcoes") {
        await deleteConstrucaoMutation.mutateAsync({ id });
        refetchConstrucoes();
      } else if (type === "projetos") {
        await deleteProjetoMutation.mutateAsync({ id });
        refetchProjetos();
      } else {
        await deleteReformaMutation.mutateAsync({ id });
        refetchReformas();
      }
      toast.success("Item deletado com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar item");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary text-white py-12 px-4">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Painel Administrativo</h1>
          <p className="text-lg text-gray-200">Gerencie cores, fotos e informações do seu site.</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="cores">Cores</TabsTrigger>
              <TabsTrigger value="construcoes">Construções</TabsTrigger>
              <TabsTrigger value="projetos">Projetos</TabsTrigger>
              <TabsTrigger value="reformas">Reformas</TabsTrigger>
            </TabsList>

            {/* Cores */}
            <TabsContent value="cores" className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-8 border border-border">
                <h2 className="text-2xl font-bold mb-6 text-primary">Personalizar Cores</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cor Primária (Verde)
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="color"
                        value={editData.primaryColor || settings?.primaryColor || "#2D5F4F"}
                        onChange={(e) => setEditData({ ...editData, primaryColor: e.target.value })}
                        className="w-20 h-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={editData.primaryColor || settings?.primaryColor || "#2D5F4F"}
                        onChange={(e) => setEditData({ ...editData, primaryColor: e.target.value })}
                        className="flex-1 px-4 py-2 border border-border rounded-lg"
                        placeholder="#2D5F4F"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cor Secundária (Preto)
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="color"
                        value={editData.secondaryColor || settings?.secondaryColor || "#000000"}
                        onChange={(e) => setEditData({ ...editData, secondaryColor: e.target.value })}
                        className="w-20 h-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={editData.secondaryColor || settings?.secondaryColor || "#000000"}
                        onChange={(e) => setEditData({ ...editData, secondaryColor: e.target.value })}
                        className="flex-1 px-4 py-2 border border-border rounded-lg"
                        placeholder="#000000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cor de Destaque
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="color"
                        value={editData.accentColor || settings?.accentColor || "#4CAF50"}
                        onChange={(e) => setEditData({ ...editData, accentColor: e.target.value })}
                        className="w-20 h-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={editData.accentColor || settings?.accentColor || "#4CAF50"}
                        onChange={(e) => setEditData({ ...editData, accentColor: e.target.value })}
                        className="flex-1 px-4 py-2 border border-border rounded-lg"
                        placeholder="#4CAF50"
                      />
                    </div>
                  </div>

                  <Button onClick={handleSaveColors} className="bg-primary text-white hover:bg-primary/90 flex items-center gap-2">
                    <Save size={20} />
                    Salvar Cores
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Construções */}
            <TabsContent value="construcoes" className="space-y-6">
              <div className="space-y-4">
                {construcoes.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md p-6 border border-border">
                    {editingId === item.id ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={editData.titulo || item.titulo}
                          onChange={(e) => setEditData({ ...editData, titulo: e.target.value })}
                          className="w-full px-4 py-2 border border-border rounded-lg"
                          placeholder="Título"
                        />
                        <textarea
                          value={editData.descricao || item.descricao}
                          onChange={(e) => setEditData({ ...editData, descricao: e.target.value })}
                          className="w-full px-4 py-2 border border-border rounded-lg"
                          placeholder="Descrição"
                          rows={3}
                        />
                        <select
                          value={editData.status || item.status}
                          onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                          className="w-full px-4 py-2 border border-border rounded-lg"
                        >
                          <option value="planejamento">Planejamento</option>
                          <option value="em_andamento">Em Andamento</option>
                          <option value="concluida">Concluída</option>
                        </select>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Progresso (%): {editData.progresso || item.progresso}%
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={editData.progresso || item.progresso}
                            onChange={(e) => setEditData({ ...editData, progresso: parseInt(e.target.value) })}
                            className="w-full"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={() => handleUpdateItem("construcoes", item.id)} className="bg-green-600 text-white hover:bg-green-700">
                            Salvar
                          </Button>
                          <Button onClick={() => setEditingId(null)} variant="outline">
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-primary">{item.titulo}</h3>
                            <p className="text-sm text-gray-600 mt-1">Status: <span className="font-semibold">{item.status}</span></p>
                            <p className="text-sm text-gray-600">Progresso: {item.progresso}%</p>
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={() => { setEditingId(item.id); setEditData(item); }} size="sm" variant="outline">
                              <Edit size={16} />
                            </Button>
                            <Button onClick={() => handleDeleteItem("construcoes", item.id)} size="sm" variant="destructive">
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                        <p className="text-gray-700">{item.descricao}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Projetos */}
            <TabsContent value="projetos" className="space-y-6">
              <div className="space-y-4">
                {projetos.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md p-6 border border-border">
                    {editingId === item.id ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={editData.titulo || item.titulo}
                          onChange={(e) => setEditData({ ...editData, titulo: e.target.value })}
                          className="w-full px-4 py-2 border border-border rounded-lg"
                          placeholder="Título"
                        />
                        <textarea
                          value={editData.descricao || item.descricao}
                          onChange={(e) => setEditData({ ...editData, descricao: e.target.value })}
                          className="w-full px-4 py-2 border border-border rounded-lg"
                          placeholder="Descrição"
                          rows={3}
                        />
                        <select
                          value={editData.status || item.status}
                          onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                          className="w-full px-4 py-2 border border-border rounded-lg"
                        >
                          <option value="planejamento">Planejamento</option>
                          <option value="em_andamento">Em Andamento</option>
                          <option value="concluida">Concluída</option>
                        </select>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Progresso (%): {editData.progresso || item.progresso}%
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={editData.progresso || item.progresso}
                            onChange={(e) => setEditData({ ...editData, progresso: parseInt(e.target.value) })}
                            className="w-full"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={() => handleUpdateItem("projetos", item.id)} className="bg-green-600 text-white hover:bg-green-700">
                            Salvar
                          </Button>
                          <Button onClick={() => setEditingId(null)} variant="outline">
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-primary">{item.titulo}</h3>
                            <p className="text-sm text-gray-600 mt-1">Status: <span className="font-semibold">{item.status}</span></p>
                            <p className="text-sm text-gray-600">Progresso: {item.progresso}%</p>
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={() => { setEditingId(item.id); setEditData(item); }} size="sm" variant="outline">
                              <Edit size={16} />
                            </Button>
                            <Button onClick={() => handleDeleteItem("projetos", item.id)} size="sm" variant="destructive">
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                        <p className="text-gray-700">{item.descricao}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Reformas */}
            <TabsContent value="reformas" className="space-y-6">
              <div className="space-y-4">
                {reformas.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md p-6 border border-border">
                    {editingId === item.id ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={editData.titulo || item.titulo}
                          onChange={(e) => setEditData({ ...editData, titulo: e.target.value })}
                          className="w-full px-4 py-2 border border-border rounded-lg"
                          placeholder="Título"
                        />
                        <textarea
                          value={editData.descricao || item.descricao}
                          onChange={(e) => setEditData({ ...editData, descricao: e.target.value })}
                          className="w-full px-4 py-2 border border-border rounded-lg"
                          placeholder="Descrição"
                          rows={3}
                        />
                        <select
                          value={editData.status || item.status}
                          onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                          className="w-full px-4 py-2 border border-border rounded-lg"
                        >
                          <option value="planejamento">Planejamento</option>
                          <option value="em_andamento">Em Andamento</option>
                          <option value="concluida">Concluída</option>
                        </select>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Progresso (%): {editData.progresso || item.progresso}%
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={editData.progresso || item.progresso}
                            onChange={(e) => setEditData({ ...editData, progresso: parseInt(e.target.value) })}
                            className="w-full"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={() => handleUpdateItem("reformas", item.id)} className="bg-green-600 text-white hover:bg-green-700">
                            Salvar
                          </Button>
                          <Button onClick={() => setEditingId(null)} variant="outline">
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-primary">{item.titulo}</h3>
                            <p className="text-sm text-gray-600 mt-1">Status: <span className="font-semibold">{item.status}</span></p>
                            <p className="text-sm text-gray-600">Progresso: {item.progresso}%</p>
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={() => { setEditingId(item.id); setEditData(item); }} size="sm" variant="outline">
                              <Edit size={16} />
                            </Button>
                            <Button onClick={() => handleDeleteItem("reformas", item.id)} size="sm" variant="destructive">
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                        <p className="text-gray-700">{item.descricao}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
