import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, X, LogOut, Upload, Trash, Copy } from "lucide-react";
import * as Icons from "lucide-react";

const AVAILABLE_ICONS = [
  "Home", "Building", "Building2", "Zap", "Droplet", "Wind", "Sun", "Shield",
  "Lock", "Wifi", "Tv", "Utensils", "Dumbbell", "Sofa", "Trees", "Car",
  "Users", "Heart", "Star", "CheckCircle", "AlertCircle"
];

export default function AdminPainel() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("empreendimentos");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formType, setFormType] = useState<"empreendimentos" | "projetos" | "reformas">("empreendimentos");
  const [diferenciais, setDiferenciais] = useState<Array<{ texto: string; icone: string }>>([]);
  const [novaFoto, setNovaFoto] = useState("");
  const [novoIcone, setNovoIcone] = useState("Home");
  const [novoDiferencial, setNovoDiferencial] = useState("");

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
    progresso: "0",
    previsaoConclusao: "",
    dataLancamento: "",
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

  const adicionarDiferencial = () => {
    if (novoDiferencial.trim()) {
      setDiferenciais([...diferenciais, { texto: novoDiferencial, icone: novoIcone }]);
      setNovoDiferencial("");
      setNovoIcone("Home");
    }
  };

  const removerDiferencial = (index: number) => {
    setDiferenciais(diferenciais.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const diferencialString = diferenciais
      .map(d => `${d.texto}|${d.icone}`)
      .join("\n");

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
      quartos: formData.quartos,
      banheiros: formData.banheiros ? parseInt(formData.banheiros) : undefined,
      vagas: formData.vagas ? parseInt(formData.vagas) : undefined,
      progresso: formData.progresso ? parseInt(formData.progresso) : 0,
      previsaoConclusao: formData.previsaoConclusao || undefined,
      dataLancamento: formData.dataLancamento || undefined,
      diferenciais: diferencialString || undefined,
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
      progresso: emp.progresso?.toString() || "0",
      previsaoConclusao: emp.previsaoConclusao || "",
      dataLancamento: emp.dataLancamento || "",
      imagensPrincipais: emp.imagensPrincipais || "",
      tipo_reforma: emp.tipo_reforma || "",
    });

    // Parse diferenciais
    if (emp.diferenciais) {
      const parsed = emp.diferenciais.split("\n").map((d: string) => {
        const [texto, icone] = d.split("|");
        return { texto: texto.trim(), icone: icone?.trim() || "Home" };
      });
      setDiferenciais(parsed);
    } else {
      setDiferenciais([]);
    }

    setEditingId(emp.id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja deletar?")) {
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
      progresso: "0",
      previsaoConclusao: "",
      dataLancamento: "",
      imagensPrincipais: "",
      tipo_reforma: "",
    });
    setDiferenciais([]);
    setNovaFoto("");
    setNovoDiferencial("");
    setNovoIcone("Home");
    setEditingId(null);
    setIsFormOpen(false);
  };

  const adicionarFoto = () => {
    const urlTrimmed = novaFoto.trim();
    if (!urlTrimmed) {
      toast.error("Por favor, cole a URL da foto");
      return;
    }
    const fotos = formData.imagensPrincipais ? formData.imagensPrincipais.split(",").filter(f => f.trim()) : [];
    fotos.push(urlTrimmed);
    setFormData({ ...formData, imagensPrincipais: fotos.join(",") });
    setNovaFoto("");
    toast.success("Foto adicionada com sucesso!");
  };

  const removerFoto = (index: number) => {
    const fotos = formData.imagensPrincipais.split(",");
    fotos.splice(index, 1);
    setFormData({ ...formData, imagensPrincipais: fotos.join(",") });
  };

  const copiarFoto = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copiada!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-black text-white py-6 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-white text-primary hover:bg-gray-100"
          >
            <LogOut size={20} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="empreendimentos">Empreendimentos</TabsTrigger>
            <TabsTrigger value="projetos">Projetos</TabsTrigger>
            <TabsTrigger value="reformas">Reformas</TabsTrigger>
          </TabsList>

          <TabsContent value="empreendimentos">
            <div className="space-y-6">
              <Button
                onClick={() => {
                  setFormType("empreendimentos");
                  resetForm();
                  setIsFormOpen(true);
                }}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus size={20} className="mr-2" />
                Novo Empreendimento
              </Button>

              {isFormOpen && formType === "empreendimentos" && (
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                      {editingId ? "Editar" : "Novo"} Empreendimento
                    </h2>
                    <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                      <X size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Informações Básicas */}
                    <div>
                      <h3 className="text-lg font-bold mb-4">Informações Básicas</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Título"
                          value={formData.titulo}
                          onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                          required
                        />
                        <Input
                          placeholder="Localização"
                          value={formData.localizacao}
                          onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
                          required
                        />
                      </div>
                      <textarea
                        placeholder="Descrição"
                        value={formData.descricao}
                        onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                        className="w-full mt-4 p-2 border rounded-lg"
                        rows={4}
                        required
                      />
                    </div>

                    {/* Informações Financeiras */}
                    <div>
                      <h3 className="text-lg font-bold mb-4">Informações Financeiras</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Preço (ex: A partir de R$ 450.000)"
                          value={formData.preco}
                          onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    {/* Características Físicas */}
                    <div>
                      <h3 className="text-lg font-bold mb-4">Características Físicas</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <Input
                          type="number"
                          placeholder="Metragem (m²)"
                          value={formData.metragem}
                          onChange={(e) => setFormData({ ...formData, metragem: e.target.value })}
                        />
                        <Input
                          type="number"
                          placeholder="Pavimentos"
                          value={formData.pavimentos}
                          onChange={(e) => setFormData({ ...formData, pavimentos: e.target.value })}
                        />
                        <Input
                          placeholder="Quartos (ex: 2 a 3)"
                          value={formData.quartos}
                          onChange={(e) => setFormData({ ...formData, quartos: e.target.value })}
                        />
                        <Input
                          type="number"
                          placeholder="Banheiros"
                          value={formData.banheiros}
                          onChange={(e) => setFormData({ ...formData, banheiros: e.target.value })}
                        />
                        <Input
                          type="number"
                          placeholder="Vagas"
                          value={formData.vagas}
                          onChange={(e) => setFormData({ ...formData, vagas: e.target.value })}
                        />
                        <Input
                          type="number"
                          placeholder="Unidades"
                          value={formData.unidades}
                          onChange={(e) => setFormData({ ...formData, unidades: e.target.value })}
                        />
                        <Input
                          type="number"
                          placeholder="Área Total (m²)"
                          value={formData.area}
                          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Tipo e Status */}
                    <div>
                      <h3 className="text-lg font-bold mb-4">Tipo e Status</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <select
                          value={formData.tipo}
                          onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                          className="p-2 border rounded-lg"
                        >
                          <option value="pronto">Pronto</option>
                          <option value="construcao">Em Construção</option>
                          <option value="lancamento">Lançamento</option>
                        </select>

                        {formData.tipo === "construcao" && (
                          <>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              placeholder="Progresso (%)"
                              value={formData.progresso}
                              onChange={(e) => setFormData({ ...formData, progresso: e.target.value })}
                            />
                            <Input
                              placeholder="Previsão de Conclusão (ex: Dez/2024)"
                              value={formData.previsaoConclusao}
                              onChange={(e) => setFormData({ ...formData, previsaoConclusao: e.target.value })}
                            />
                          </>
                        )}

                        {formData.tipo === "lancamento" && (
                          <Input
                            placeholder="Data de Lançamento (ex: Jan/2024)"
                            value={formData.dataLancamento}
                            onChange={(e) => setFormData({ ...formData, dataLancamento: e.target.value })}
                          />
                        )}
                      </div>
                    </div>

                    {/* Fotos */}
                    <div>
                      <h3 className="text-lg font-bold mb-4">Fotos e Mídia</h3>
                      <p className="text-sm text-gray-600 mb-4">Cole a URL completa da foto e clique em Adicionar Foto</p>
                      <div className="flex gap-2 mb-4">
                        <Input
                          placeholder="URL da foto (ex: https://...)"
                          value={novaFoto}
                          onChange={(e) => setNovaFoto(e.target.value)}
                        />
                        <Button
                          type="button"
                          onClick={adicionarFoto}
                          className="bg-blue-500 hover:bg-blue-600 whitespace-nowrap"
                        >
                          <Upload size={20} className="mr-2" />
                          Adicionar Foto
                        </Button>
                      </div>

                      {formData.imagensPrincipais && (
                        <div className="space-y-2">
                          <h4 className="font-semibold">Fotos Adicionadas:</h4>
                          {formData.imagensPrincipais.split(",").map((foto, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                              <span className="text-sm truncate">{foto.trim()}</span>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => copiarFoto(foto.trim())}
                                  className="text-blue-500 hover:text-blue-700"
                                >
                                  <Copy size={18} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removerFoto(idx)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash size={18} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Diferenciais */}
                    <div>
                      <h3 className="text-lg font-bold mb-4">Diferenciais</h3>
                      <div className="flex gap-2 mb-4">
                        <Input
                          placeholder="Novo diferencial (ex: Piscina aquecida)"
                          value={novoDiferencial}
                          onChange={(e) => setNovoDiferencial(e.target.value)}
                        />
                        <select
                          value={novoIcone}
                          onChange={(e) => setNovoIcone(e.target.value)}
                          className="p-2 border rounded-lg"
                        >
                          {AVAILABLE_ICONS.map((icon) => (
                            <option key={icon} value={icon}>
                              {icon}
                            </option>
                          ))}
                        </select>
                        <Button
                          type="button"
                          onClick={adicionarDiferencial}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <Plus size={20} />
                        </Button>
                      </div>

                      {diferenciais.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-semibold">Diferenciais Adicionados:</h4>
                          {diferenciais.map((diff, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                              <span className="text-sm">{diff.texto} ({diff.icone})</span>
                              <button
                                type="button"
                                onClick={() => removerDiferencial(idx)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash size={18} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">
                      <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                        {editingId ? "Atualizar" : "Criar"} Empreendimento
                      </Button>
                      <Button
                        type="button"
                        onClick={resetForm}
                        variant="outline"
                        className="flex-1"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Lista de Empreendimentos */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left font-semibold">Título</th>
                        <th className="px-6 py-3 text-left font-semibold">Localização</th>
                        <th className="px-6 py-3 text-left font-semibold">Tipo</th>
                        <th className="px-6 py-3 text-left font-semibold">Preço</th>
                        <th className="px-6 py-3 text-left font-semibold">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {empreendimentos.map((emp: any) => (
                        <tr key={emp.id} className="border-b hover:bg-gray-50">
                          <td className="px-6 py-4">{emp.titulo}</td>
                          <td className="px-6 py-4">{emp.localizacao}</td>
                          <td className="px-6 py-4 capitalize">{emp.tipo}</td>
                          <td className="px-6 py-4">{emp.preco}</td>
                          <td className="px-6 py-4 flex gap-2">
                            <Button
                              onClick={() => handleEdit(emp)}
                              size="sm"
                              variant="outline"
                            >
                              <Edit2 size={18} />
                            </Button>
                            <Button
                              onClick={() => handleDelete(emp.id)}
                              size="sm"
                              variant="destructive"
                            >
                              <Trash2 size={18} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projetos">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-gray-600">Gerenciamento de Projetos em desenvolvimento...</p>
            </div>
          </TabsContent>

          <TabsContent value="reformas">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-gray-600">Gerenciamento de Reformas em desenvolvimento...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
