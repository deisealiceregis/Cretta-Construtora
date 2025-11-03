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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProjetoModalOpen, setIsProjetoModalOpen] = useState(false);
  const [isReformaModalOpen, setIsReformaModalOpen] = useState(false);
  const [newEmpreendimento, setNewEmpreendimento] = useState({
    titulo: "",
    descricao: "",
    localizacao: "",
    preco: "",
    cliente: "",
    pavimentos: "",
    apartamentos: "",
    area: "",
    status: "planejamento",
    progresso: 0,
  });
  const [novasFotos, setNovasFotos] = useState<{ url: string; titulo: string }[]>([]);
  const [novaFotoUrl, setNovaFotoUrl] = useState("");
  const [novaFotoTitulo, setNovaFotoTitulo] = useState("");

  // Estados para Projetos
  const [newProjeto, setNewProjeto] = useState({
    titulo: "",
    descricao: "",
    localizacao: "",
    cliente: "",
    status: "planejamento",
    progresso: 0,
  });
  const [novasFotosProjeto, setNovasFotosProjeto] = useState<{ url: string; titulo: string }[]>([]);
  const [novaFotoUrlProjeto, setNovaFotoUrlProjeto] = useState("");
  const [novaFotoTituloProjeto, setNovaFotoTituloProjeto] = useState("");

  // Estados para Reformas
  const [newReforma, setNewReforma] = useState({
    titulo: "",
    descricao: "",
    localizacao: "",
    cliente: "",
    status: "planejamento",
    progresso: 0,
  });
  const [novasFotosReforma, setNovasFotosReforma] = useState<{ url: string; titulo: string }[]>([]);
  const [novaFotoUrlReforma, setNovaFotoUrlReforma] = useState("");
  const [novaFotoTituloReforma, setNovaFotoTituloReforma] = useState("");

  // Estados para upload de arquivo
  const [fileInputRef, setFileInputRef] = useState<HTMLInputElement | null>(null);
  const [fileInputRefProjeto, setFileInputRefProjeto] = useState<HTMLInputElement | null>(null);
  const [fileInputRefReforma, setFileInputRefReforma] = useState<HTMLInputElement | null>(null);

  // Função para converter arquivo em base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Função para lidar com upload de arquivo (Empreendimentos)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione um arquivo de imagem');
      return;
    }

    try {
      const base64 = await convertFileToBase64(file);
      setNovasFotos([...novasFotos, { url: base64, titulo: file.name.split('.')[0] }]);
      toast.success('Foto adicionada com sucesso');
      if (fileInputRef) fileInputRef.value = '';
    } catch (error) {
      toast.error('Erro ao processar a imagem');
    }
  };

  // Função para lidar com upload de arquivo (Projetos)
  const handleFileUploadProjeto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione um arquivo de imagem');
      return;
    }

    try {
      const base64 = await convertFileToBase64(file);
      setNovasFotosProjeto([...novasFotosProjeto, { url: base64, titulo: file.name.split('.')[0] }]);
      toast.success('Foto adicionada com sucesso');
      if (fileInputRefProjeto) fileInputRefProjeto.value = '';
    } catch (error) {
      toast.error('Erro ao processar a imagem');
    }
  };

  // Função para lidar com upload de arquivo (Reformas)
  const handleFileUploadReforma = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione um arquivo de imagem');
      return;
    }

    try {
      const base64 = await convertFileToBase64(file);
      setNovasFotosReforma([...novasFotosReforma, { url: base64, titulo: file.name.split('.')[0] }]);
      toast.success('Foto adicionada com sucesso');
      if (fileInputRefReforma) fileInputRefReforma.value = '';
    } catch (error) {
      toast.error('Erro ao processar a imagem');
    }
  };

  // Settings
  const { data: settings } = trpc.settings.get.useQuery();
  const updateSettingsMutation = trpc.settings.update.useMutation();

  // Construções
  const { data: construcoes = [], refetch: refetchConstrucoes } = trpc.construcoes.list.useQuery();
  const createConstrucaoMutation = trpc.construcoes.create.useMutation();
  const updateConstrucaoMutation = trpc.construcoes.update.useMutation();
  const deleteConstrucaoMutation = trpc.construcoes.delete.useMutation();

  // Projetos
  const { data: projetos = [], refetch: refetchProjetos } = trpc.projetos.list.useQuery();
  const createProjetoMutation = trpc.projetos.create.useMutation();
  const updateProjetoMutation = trpc.projetos.update.useMutation();
  const deleteProjetoMutation = trpc.projetos.delete.useMutation();

  // Reformas
  const { data: reformas = [], refetch: refetchReformas } = trpc.reformas.list.useQuery();
  const createReformaMutation = trpc.reformas.create.useMutation();
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

  const handleAddFotoToModal = () => {
    if (!novaFotoUrl) {
      toast.error("Preencha a URL da foto");
      return;
    }
    setNovasFotos([...novasFotos, { url: novaFotoUrl, titulo: novaFotoTitulo }]);
    setNovaFotoUrl("");
    setNovaFotoTitulo("");
    toast.success("Foto adicionada!");
  };

  const handleRemoveFotoFromModal = (index: number) => {
    setNovasFotos(novasFotos.filter((_, i) => i !== index));
  };

  const handleCreateEmpreendimento = async () => {
    try {
      if (!newEmpreendimento.titulo || !newEmpreendimento.descricao || !newEmpreendimento.localizacao) {
        toast.error("Preencha os campos obrigatórios");
        return;
      }
      const result = await createConstrucaoMutation.mutateAsync({
        titulo: newEmpreendimento.titulo,
        descricao: newEmpreendimento.descricao,
        localizacao: newEmpreendimento.localizacao,
        cliente: newEmpreendimento.cliente,
        pavimentos: newEmpreendimento.pavimentos ? parseInt(newEmpreendimento.pavimentos) : undefined,
        apartamentos: newEmpreendimento.apartamentos ? parseInt(newEmpreendimento.apartamentos) : undefined,
        area: newEmpreendimento.area ? parseInt(newEmpreendimento.area) : undefined,
        status: newEmpreendimento.status as "planejamento" | "em_andamento" | "concluida",
        progresso: newEmpreendimento.progresso,
      });

      // Salvar as fotos
      if (novasFotos.length > 0) {
        // Recarregar para pegar o ID do novo empreendimento
        await refetchConstrucoes();
        const novoEmpreendimento = construcoes[construcoes.length - 1];
        if (novoEmpreendimento?.id) {
          for (const foto of novasFotos) {
            await createImagemMutation.mutateAsync({
              projetoId: novoEmpreendimento.id,
              url: foto.url,
              titulo: foto.titulo,
              tipo: "construcao",
            });
          }
        }
      }

      toast.success("Empreendimento criado com sucesso!");
      setIsModalOpen(false);
      setNewEmpreendimento({
        titulo: "",
        descricao: "",
        localizacao: "",
        preco: "",
        cliente: "",
        pavimentos: "",
        apartamentos: "",
        area: "",
        status: "planejamento",
        progresso: 0,
      });
      setNovasFotos([]);
      refetchConstrucoes();
    } catch (error) {
      toast.error("Erro ao criar empreendimento");
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

  const handleAddFotoToProjeto = () => {
    if (!novaFotoUrlProjeto) {
      toast.error("Preencha a URL da foto");
      return;
    }
    setNovasFotosProjeto([...novasFotosProjeto, { url: novaFotoUrlProjeto, titulo: novaFotoTituloProjeto }]);
    setNovaFotoUrlProjeto("");
    setNovaFotoTituloProjeto("");
    toast.success("Foto adicionada!");
  };

  const handleRemoveFotoFromProjeto = (index: number) => {
    setNovasFotosProjeto(novasFotosProjeto.filter((_, i) => i !== index));
  };

  const handleCreateProjeto = async () => {
    try {
      if (!newProjeto.titulo || !newProjeto.descricao || !newProjeto.localizacao) {
        toast.error("Preencha os campos obrigatórios");
        return;
      }
      const result = await createProjetoMutation.mutateAsync({
        titulo: newProjeto.titulo,
        descricao: newProjeto.descricao,
        localizacao: newProjeto.localizacao,
        cliente: newProjeto.cliente,
        status: newProjeto.status as "planejamento" | "em_andamento" | "concluida",
        progresso: newProjeto.progresso,
      });

      // Salvar as fotos
      if (novasFotosProjeto.length > 0) {
        await refetchProjetos();
        const novoProjeto = projetos[projetos.length - 1];
        if (novoProjeto?.id) {
          for (const foto of novasFotosProjeto) {
            await createImagemMutation.mutateAsync({
              projetoId: novoProjeto.id,
              url: foto.url,
              titulo: foto.titulo,
              tipo: "projeto",
            });
          }
        }
      }

      toast.success("Projeto criado com sucesso!");
      setIsProjetoModalOpen(false);
      setNewProjeto({
        titulo: "",
        descricao: "",
        localizacao: "",
        cliente: "",
        status: "planejamento",
        progresso: 0,
      });
      setNovasFotosProjeto([]);
      refetchProjetos();
    } catch (error) {
      toast.error("Erro ao criar projeto");
    }
  };

  const handleAddFotoToReforma = () => {
    if (!novaFotoUrlReforma) {
      toast.error("Preencha a URL da foto");
      return;
    }
    setNovasFotosReforma([...novasFotosReforma, { url: novaFotoUrlReforma, titulo: novaFotoTituloReforma }]);
    setNovaFotoUrlReforma("");
    setNovaFotoTituloReforma("");
    toast.success("Foto adicionada!");
  };

  const handleRemoveFotoFromReforma = (index: number) => {
    setNovasFotosReforma(novasFotosReforma.filter((_, i) => i !== index));
  };

  const handleCreateReforma = async () => {
    try {
      if (!newReforma.titulo || !newReforma.descricao || !newReforma.localizacao) {
        toast.error("Preencha os campos obrigatórios");
        return;
      }
      const result = await createReformaMutation.mutateAsync({
        titulo: newReforma.titulo,
        descricao: newReforma.descricao,
        localizacao: newReforma.localizacao,
        cliente: newReforma.cliente,
        status: newReforma.status as "planejamento" | "em_andamento" | "concluida",
        progresso: newReforma.progresso,
      });

      // Salvar as fotos
      if (novasFotosReforma.length > 0) {
        await refetchReformas();
        const novaReforma = reformas[reformas.length - 1];
        if (novaReforma?.id) {
          for (const foto of novasFotosReforma) {
            await createImagemMutation.mutateAsync({
              projetoId: novaReforma.id,
              url: foto.url,
              titulo: foto.titulo,
              tipo: "reforma",
            });
          }
        }
      }

      toast.success("Reforma criada com sucesso!");
      setIsReformaModalOpen(false);
      setNewReforma({
        titulo: "",
        descricao: "",
        localizacao: "",
        cliente: "",
        status: "planejamento",
        progresso: 0,
      });
      setNovasFotosReforma([]);
      refetchReformas();
    } catch (error) {
      toast.error("Erro ao criar reforma");
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
            <TabsContent value="construcoes" className="space-y-6">
              {!selectedProjetoId && (
                <div className="bg-white rounded-lg shadow-md p-6 border border-border">
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-500 text-white hover:bg-green-600 flex items-center gap-2"
                  >
                    <Plus size={20} />
                    Novo Empreendimento
                  </Button>
                </div>
              )}
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
              {!selectedProjetoId && (
                <Button
                  onClick={() => setIsProjetoModalOpen(true)}
                  className="bg-green-500 text-white hover:bg-green-600 flex items-center gap-2"
                >
                  <Plus size={20} />
                  Novo Projeto
                </Button>
              )}
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
              {!selectedProjetoId && (
                <Button
                  onClick={() => setIsReformaModalOpen(true)}
                  className="bg-green-500 text-white hover:bg-green-600 flex items-center gap-2"
                >
                  <Plus size={20} />
                  Nova Reforma
                </Button>
              )}
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

      {/* Modal de Novo Empreendimento */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-border p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-primary">Novo Empreendimento</h2>
              <Button
                onClick={() => setIsModalOpen(false)}
                variant="ghost"
                size="icon"
              >
                <X size={24} />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Título *</label>
                <input
                  type="text"
                  value={newEmpreendimento.titulo}
                  onChange={(e) => setNewEmpreendimento({ ...newEmpreendimento, titulo: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg"
                  placeholder="Nome do empreendimento"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição *</label>
                <textarea
                  value={newEmpreendimento.descricao}
                  onChange={(e) => setNewEmpreendimento({ ...newEmpreendimento, descricao: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg h-24 resize-none"
                  placeholder="Descrição do empreendimento"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Localização *</label>
                <input
                  type="text"
                  value={newEmpreendimento.localizacao}
                  onChange={(e) => setNewEmpreendimento({ ...newEmpreendimento, localizacao: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg"
                  placeholder="Endereço do empreendimento"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cliente</label>
                <input
                  type="text"
                  value={newEmpreendimento.cliente}
                  onChange={(e) => setNewEmpreendimento({ ...newEmpreendimento, cliente: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg"
                  placeholder="Nome do cliente"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pavimentos</label>
                  <input
                    type="number"
                    value={newEmpreendimento.pavimentos}
                    onChange={(e) => setNewEmpreendimento({ ...newEmpreendimento, pavimentos: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Apartamentos</label>
                  <input
                    type="number"
                    value={newEmpreendimento.apartamentos}
                    onChange={(e) => setNewEmpreendimento({ ...newEmpreendimento, apartamentos: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Área (m²)</label>
                  <input
                    type="number"
                    value={newEmpreendimento.area}
                    onChange={(e) => setNewEmpreendimento({ ...newEmpreendimento, area: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={newEmpreendimento.status}
                    onChange={(e) => setNewEmpreendimento({ ...newEmpreendimento, status: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg"
                  >
                    <option value="planejamento">Planejamento</option>
                    <option value="em_andamento">Em Andamento</option>
                    <option value="concluida">Concluída</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Progresso (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newEmpreendimento.progresso}
                  onChange={(e) => setNewEmpreendimento({ ...newEmpreendimento, progresso: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-border rounded-lg"
                  placeholder="0"
                />
              </div>

              {/* Seção de Fotos */}
              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-semibold mb-4">Adicionar Fotos</h3>
                <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload de Imagem</label>
                    <input
                      ref={setFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="w-full px-4 py-2 border border-border rounded-lg cursor-pointer"
                    />
                  </div>
                  
                  <div className="text-center text-gray-500 text-sm">OU</div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">URL da Foto</label>
                    <input
                      type="text"
                      value={novaFotoUrl}
                      onChange={(e) => setNovaFotoUrl(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg"
                      placeholder="https://exemplo.com/foto.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Título da Foto (opcional)</label>
                    <input
                      type="text"
                      value={novaFotoTitulo}
                      onChange={(e) => setNovaFotoTitulo(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg"
                      placeholder="Título da foto"
                    />
                  </div>
                  <Button
                    onClick={handleAddFotoToModal}
                    className="w-full bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center gap-2"
                  >
                    <Plus size={20} />
                    Adicionar Foto via URL
                  </Button>
                </div>

                {/* Galeria de Fotos Adicionadas */}
                {novasFotos.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-3">Fotos Adicionadas ({novasFotos.length})</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {novasFotos.map((foto, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={foto.url}
                            alt={foto.titulo || "Foto"}
                            className="w-full h-24 object-cover rounded-lg border border-border"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%23999' font-size='12'%3EImagem inválida%3C/text%3E%3C/svg%3E";
                            }}
                          />
                          <button
                            onClick={() => handleRemoveFotoFromModal(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={16} />
                          </button>
                          {foto.titulo && (
                            <p className="text-xs text-gray-600 mt-1 truncate">{foto.titulo}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-border p-6 flex justify-end gap-3">
              <Button
                onClick={() => setIsModalOpen(false)}
                variant="outline"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreateEmpreendimento}
                className="bg-green-500 text-white hover:bg-green-600"
              >
                <Plus size={20} className="mr-2" />
                Criar Empreendimento
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Novo Projeto */}
      {isProjetoModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-border p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-primary">Novo Projeto</h2>
              <Button
                onClick={() => setIsProjetoModalOpen(false)}
                variant="ghost"
                size="icon"
              >
                <X size={24} />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Título *</label>
                <input
                  type="text"
                  value={newProjeto.titulo}
                  onChange={(e) => setNewProjeto({ ...newProjeto, titulo: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg"
                  placeholder="Nome do projeto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição *</label>
                <textarea
                  value={newProjeto.descricao}
                  onChange={(e) => setNewProjeto({ ...newProjeto, descricao: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg h-24 resize-none"
                  placeholder="Descrição do projeto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Localização *</label>
                <input
                  type="text"
                  value={newProjeto.localizacao}
                  onChange={(e) => setNewProjeto({ ...newProjeto, localizacao: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg"
                  placeholder="Endereço do projeto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cliente</label>
                <input
                  type="text"
                  value={newProjeto.cliente}
                  onChange={(e) => setNewProjeto({ ...newProjeto, cliente: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg"
                  placeholder="Nome do cliente"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={newProjeto.status}
                    onChange={(e) => setNewProjeto({ ...newProjeto, status: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg"
                  >
                    <option value="planejamento">Planejamento</option>
                    <option value="em_andamento">Em Andamento</option>
                    <option value="concluida">Concluída</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Progresso (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newProjeto.progresso}
                    onChange={(e) => setNewProjeto({ ...newProjeto, progresso: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-border rounded-lg"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Seção de Fotos */}
              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-semibold mb-4">Adicionar Fotos</h3>
                <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload de Imagem</label>
                    <input
                      ref={setFileInputRefProjeto}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUploadProjeto}
                      className="w-full px-4 py-2 border border-border rounded-lg cursor-pointer"
                    />
                  </div>
                  
                  <div className="text-center text-gray-500 text-sm">OU</div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">URL da Foto</label>
                    <input
                      type="text"
                      value={novaFotoUrlProjeto}
                      onChange={(e) => setNovaFotoUrlProjeto(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg"
                      placeholder="https://exemplo.com/foto.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Título da Foto (opcional)</label>
                    <input
                      type="text"
                      value={novaFotoTituloProjeto}
                      onChange={(e) => setNovaFotoTituloProjeto(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg"
                      placeholder="Título da foto"
                    />
                  </div>
                  <Button
                    onClick={handleAddFotoToProjeto}
                    className="w-full bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center gap-2"
                  >
                    <Plus size={20} />
                    Adicionar Foto via URL
                  </Button>
                </div>

                {novasFotosProjeto.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-3">Fotos Adicionadas ({novasFotosProjeto.length})</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {novasFotosProjeto.map((foto, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={foto.url}
                            alt={foto.titulo || "Foto"}
                            className="w-full h-24 object-cover rounded-lg border border-border"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%23999' font-size='12'%3EImagem inválida%3C/text%3E%3C/svg%3E";
                            }}
                          />
                          <button
                            onClick={() => handleRemoveFotoFromProjeto(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={16} />
                          </button>
                          {foto.titulo && (
                            <p className="text-xs text-gray-600 mt-1 truncate">{foto.titulo}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-border p-6 flex justify-end gap-3">
              <Button
                onClick={() => setIsProjetoModalOpen(false)}
                variant="outline"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreateProjeto}
                className="bg-green-500 text-white hover:bg-green-600"
              >
                <Plus size={20} className="mr-2" />
                Criar Projeto
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Nova Reforma */}
      {isReformaModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-border p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-primary">Nova Reforma</h2>
              <Button
                onClick={() => setIsReformaModalOpen(false)}
                variant="ghost"
                size="icon"
              >
                <X size={24} />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Título *</label>
                <input
                  type="text"
                  value={newReforma.titulo}
                  onChange={(e) => setNewReforma({ ...newReforma, titulo: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg"
                  placeholder="Nome da reforma"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição *</label>
                <textarea
                  value={newReforma.descricao}
                  onChange={(e) => setNewReforma({ ...newReforma, descricao: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg h-24 resize-none"
                  placeholder="Descrição da reforma"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Localização *</label>
                <input
                  type="text"
                  value={newReforma.localizacao}
                  onChange={(e) => setNewReforma({ ...newReforma, localizacao: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg"
                  placeholder="Endereço da reforma"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cliente</label>
                <input
                  type="text"
                  value={newReforma.cliente}
                  onChange={(e) => setNewReforma({ ...newReforma, cliente: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg"
                  placeholder="Nome do cliente"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={newReforma.status}
                    onChange={(e) => setNewReforma({ ...newReforma, status: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg"
                  >
                    <option value="planejamento">Planejamento</option>
                    <option value="em_andamento">Em Andamento</option>
                    <option value="concluida">Concluída</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Progresso (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newReforma.progresso}
                    onChange={(e) => setNewReforma({ ...newReforma, progresso: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-border rounded-lg"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Seção de Fotos */}
              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-semibold mb-4">Adicionar Fotos</h3>
                <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload de Imagem</label>
                    <input
                      ref={setFileInputRefReforma}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUploadReforma}
                      className="w-full px-4 py-2 border border-border rounded-lg cursor-pointer"
                    />
                  </div>
                  
                  <div className="text-center text-gray-500 text-sm">OU</div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">URL da Foto</label>
                    <input
                      type="text"
                      value={novaFotoUrlReforma}
                      onChange={(e) => setNovaFotoUrlReforma(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg"
                      placeholder="https://exemplo.com/foto.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Título da Foto (opcional)</label>
                    <input
                      type="text"
                      value={novaFotoTituloReforma}
                      onChange={(e) => setNovaFotoTituloReforma(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg"
                      placeholder="Título da foto"
                    />
                  </div>
                  <Button
                    onClick={handleAddFotoToReforma}
                    className="w-full bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center gap-2"
                  >
                    <Plus size={20} />
                    Adicionar Foto via URL
                  </Button>
                </div>

                {novasFotosReforma.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-3">Fotos Adicionadas ({novasFotosReforma.length})</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {novasFotosReforma.map((foto, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={foto.url}
                            alt={foto.titulo || "Foto"}
                            className="w-full h-24 object-cover rounded-lg border border-border"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%23999' font-size='12'%3EImagem inválida%3C/text%3E%3C/svg%3E";
                            }}
                          />
                          <button
                            onClick={() => handleRemoveFotoFromReforma(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={16} />
                          </button>
                          {foto.titulo && (
                            <p className="text-xs text-gray-600 mt-1 truncate">{foto.titulo}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-border p-6 flex justify-end gap-3">
              <Button
                onClick={() => setIsReformaModalOpen(false)}
                variant="outline"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreateReforma}
                className="bg-green-500 text-white hover:bg-green-600"
              >
                <Plus size={20} className="mr-2" />
                Criar Reforma
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
