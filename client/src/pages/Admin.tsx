'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Trash2, Plus, Save, Image as ImageIcon, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("cores");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [selectedProjetoId, setSelectedProjetoId] = useState<number | null>(null);
  const [novaImagemUrl, setNovaImagemUrl] = useState("");
  const [novaImagemTitulo, setNovaImagemTitulo] = useState("");

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

  // Imagens
  const { data: imagens = [] } = trpc.imagens.getByProjetoId.useQuery(
    selectedProjetoId && activeTab !== "cores"
      ? {
          projetoId: selectedProjetoId,
          tipo: activeTab as "construcao" | "projeto" | "reforma",
        }
      : { skip: true } as any
  );
  const createImagemMutation = trpc.imagens.create.useMutation();
  const deleteImagemMutation = trpc.imagens.delete.useMutation();

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

  const handleAddImagem = async () => {
    if (!selectedProjetoId || !novaImagemUrl) {
      toast.error("Preencha a URL da imagem");
      return;
    }
    try {
      await createImagemMutation.mutateAsync({
        projetoId: selectedProjetoId,
        tipo: activeTab as "construcao" | "projeto" | "reforma",
        url: novaImagemUrl,
        titulo: novaImagemTitulo || undefined,
        ordem: imagens.length,
      });
      toast.success("Imagem adicionada com sucesso!");
      setNovaImagemUrl("");
      setNovaImagemTitulo("");
    } catch (error) {
      toast.error("Erro ao adicionar imagem");
    }
  };

  const handleDeleteImagem = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar esta imagem?")) return;
    try {
      await deleteImagemMutation.mutateAsync({ id });
      toast.success("Imagem deletada com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar imagem");
    }
  };

  const renderItemForm = (item: any, type: "construcoes" | "projetos" | "reformas") => (
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
      <input
        type="text"
        value={editData.cliente || item.cliente}
        onChange={(e) => setEditData({ ...editData, cliente: e.target.value })}
        className="w-full px-4 py-2 border border-border rounded-lg"
        placeholder="Cliente"
      />
      <input
        type="text"
        value={editData.localizacao || item.localizacao}
        onChange={(e) => setEditData({ ...editData, localizacao: e.target.value })}
        className="w-full px-4 py-2 border border-border rounded-lg"
        placeholder="Localização"
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
          Progresso: {editData.progresso || item.progresso}%
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
        <Button
          onClick={() => handleUpdateItem(type, item.id)}
          className="bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
        >
          <Save size={20} />
          Salvar
        </Button>
        <Button
          onClick={() => {
            setEditingId(null);
            setEditData({});
          }}
          className="bg-gray-300 text-gray-800 hover:bg-gray-400"
        >
          Cancelar
        </Button>
      </div>
    </div>
  );

  const renderItemsList = (items: any[], type: "construcoes" | "projetos" | "reformas") => (
    <div className="space-y-4">
      {type === "construcoes" && (
        <Button
          onClick={() => {
            setEditingId(null);
            setEditData({});
            setSelectedProjetoId(null);
          }}
          className="bg-green-500 text-white hover:bg-green-600 flex items-center gap-2 mb-4"
        >
          <Plus size={20} />
          Novo Empreendimento
        </Button>
      )}
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-md p-6 border border-border">
          {editingId === item.id ? (
            renderItemForm(item, type)
          ) : (
            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-bold text-primary">{item.titulo}</h3>
                <p className="text-gray-600 text-sm">Cliente: {item.cliente}</p>
                <p className="text-gray-600 text-sm">Localização: {item.localizacao}</p>
                <p className="text-gray-600 text-sm">
                  Status: <span className="font-semibold capitalize">{item.status.replace("_", " ")}</span>
                </p>
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progresso:</span>
                    <span className="font-semibold">{item.progresso}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${item.progresso}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setEditingId(item.id);
                    setEditData(item);
                    setSelectedProjetoId(item.id);
                  }}
                  className="bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-2"
                >
                  <Edit size={20} />
                  Editar
                </Button>
                <Button
                  onClick={() => {
                    setSelectedProjetoId(item.id);
                    setActiveTab(type === "construcoes" ? "construcoes" : type === "projetos" ? "projetos" : "reformas");
                  }}
                  className="bg-green-500 text-white hover:bg-green-600 flex items-center gap-2"
                >
                  <ImageIcon size={20} />
                  Galeria
                </Button>
                <Button
                  onClick={() => handleDeleteItem(type, item.id)}
                  className="bg-red-500 text-white hover:bg-red-600 flex items-center gap-2"
                >
                  <Trash2 size={20} />
                  Deletar
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

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
              <TabsTrigger value="construcoes">Empreendimentos</TabsTrigger>
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
            <TabsContent value="empreendimentos" className="space-y-6">
              {selectedProjetoId ? (
                <div className="bg-white rounded-lg shadow-md p-6 border border-border">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-primary">Galeria de Imagens</h2>
                    <Button
                      onClick={() => setSelectedProjetoId(null)}
                      className="bg-gray-300 text-gray-800 hover:bg-gray-400"
                    >
                      Voltar
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {/* Adicionar nova imagem */}
                    <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300">
                      <h3 className="text-lg font-semibold mb-4">Adicionar Nova Imagem</h3>
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={novaImagemUrl}
                          onChange={(e) => setNovaImagemUrl(e.target.value)}
                          className="w-full px-4 py-2 border border-border rounded-lg"
                          placeholder="URL da imagem (ex: https://exemplo.com/foto.jpg)"
                        />
                        <input
                          type="text"
                          value={novaImagemTitulo}
                          onChange={(e) => setNovaImagemTitulo(e.target.value)}
                          className="w-full px-4 py-2 border border-border rounded-lg"
                          placeholder="Título da imagem (opcional)"
                        />
                        <Button
                          onClick={handleAddImagem}
                          className="bg-green-500 text-white hover:bg-green-600 flex items-center gap-2"
                        >
                          <Plus size={20} />
                          Adicionar Imagem
                        </Button>
                      </div>
                    </div>

                    {/* Galeria */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Imagens Cadastradas</h3>
                      {imagens.length === 0 ? (
                        <p className="text-gray-500">Nenhuma imagem cadastrada ainda.</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {imagens.map((img: any) => (
                            <div key={img.id} className="relative group">
                              <img
                                src={img.url}
                                alt={img.titulo || "Imagem"}
                                className="w-full h-48 object-cover rounded-lg border border-border"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                <Button
                                  onClick={() => handleDeleteImagem(img.id)}
                                  className="bg-red-500 text-white hover:bg-red-600 flex items-center gap-2"
                                >
                                  <Trash2 size={20} />
                                  Deletar
                                </Button>
                              </div>
                              {img.titulo && (
                                <p className="text-sm text-gray-600 mt-2 truncate">{img.titulo}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                renderItemsList(construcoes, "construcoes")
              )}
            </TabsContent>

            {/* Projetos */}
            <TabsContent value="projetos" className="space-y-6">
              {selectedProjetoId ? (
                <div className="bg-white rounded-lg shadow-md p-6 border border-border">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-primary">Galeria de Imagens</h2>
                    <Button
                      onClick={() => setSelectedProjetoId(null)}
                      className="bg-gray-300 text-gray-800 hover:bg-gray-400"
                    >
                      Voltar
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {/* Adicionar nova imagem */}
                    <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300">
                      <h3 className="text-lg font-semibold mb-4">Adicionar Nova Imagem</h3>
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={novaImagemUrl}
                          onChange={(e) => setNovaImagemUrl(e.target.value)}
                          className="w-full px-4 py-2 border border-border rounded-lg"
                          placeholder="URL da imagem (ex: https://exemplo.com/foto.jpg)"
                        />
                        <input
                          type="text"
                          value={novaImagemTitulo}
                          onChange={(e) => setNovaImagemTitulo(e.target.value)}
                          className="w-full px-4 py-2 border border-border rounded-lg"
                          placeholder="Título da imagem (opcional)"
                        />
                        <Button
                          onClick={handleAddImagem}
                          className="bg-green-500 text-white hover:bg-green-600 flex items-center gap-2"
                        >
                          <Plus size={20} />
                          Adicionar Imagem
                        </Button>
                      </div>
                    </div>

                    {/* Galeria */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Imagens Cadastradas</h3>
                      {imagens.length === 0 ? (
                        <p className="text-gray-500">Nenhuma imagem cadastrada ainda.</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {imagens.map((img: any) => (
                            <div key={img.id} className="relative group">
                              <img
                                src={img.url}
                                alt={img.titulo || "Imagem"}
                                className="w-full h-48 object-cover rounded-lg border border-border"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                <Button
                                  onClick={() => handleDeleteImagem(img.id)}
                                  className="bg-red-500 text-white hover:bg-red-600 flex items-center gap-2"
                                >
                                  <Trash2 size={20} />
                                  Deletar
                                </Button>
                              </div>
                              {img.titulo && (
                                <p className="text-sm text-gray-600 mt-2 truncate">{img.titulo}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                renderItemsList(projetos, "projetos")
              )}
            </TabsContent>

            {/* Reformas */}
            <TabsContent value="reformas" className="space-y-6">
              {selectedProjetoId ? (
                <div className="bg-white rounded-lg shadow-md p-6 border border-border">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-primary">Galeria de Imagens</h2>
                    <Button
                      onClick={() => setSelectedProjetoId(null)}
                      className="bg-gray-300 text-gray-800 hover:bg-gray-400"
                    >
                      Voltar
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {/* Adicionar nova imagem */}
                    <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300">
                      <h3 className="text-lg font-semibold mb-4">Adicionar Nova Imagem</h3>
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={novaImagemUrl}
                          onChange={(e) => setNovaImagemUrl(e.target.value)}
                          className="w-full px-4 py-2 border border-border rounded-lg"
                          placeholder="URL da imagem (ex: https://exemplo.com/foto.jpg)"
                        />
                        <input
                          type="text"
                          value={novaImagemTitulo}
                          onChange={(e) => setNovaImagemTitulo(e.target.value)}
                          className="w-full px-4 py-2 border border-border rounded-lg"
                          placeholder="Título da imagem (opcional)"
                        />
                        <Button
                          onClick={handleAddImagem}
                          className="bg-green-500 text-white hover:bg-green-600 flex items-center gap-2"
                        >
                          <Plus size={20} />
                          Adicionar Imagem
                        </Button>
                      </div>
                    </div>

                    {/* Galeria */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Imagens Cadastradas</h3>
                      {imagens.length === 0 ? (
                        <p className="text-gray-500">Nenhuma imagem cadastrada ainda.</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {imagens.map((img: any) => (
                            <div key={img.id} className="relative group">
                              <img
                                src={img.url}
                                alt={img.titulo || "Imagem"}
                                className="w-full h-48 object-cover rounded-lg border border-border"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                <Button
                                  onClick={() => handleDeleteImagem(img.id)}
                                  className="bg-red-500 text-white hover:bg-red-600 flex items-center gap-2"
                                >
                                  <Trash2 size={20} />
                                  Deletar
                                </Button>
                              </div>
                              {img.titulo && (
                                <p className="text-sm text-gray-600 mt-2 truncate">{img.titulo}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                renderItemsList(reformas, "reformas")
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
