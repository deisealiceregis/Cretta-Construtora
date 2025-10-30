import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Send, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function OrcamentoForm() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    tipo: "construcao" as "construcao" | "reforma" | "projeto",
    assunto: "",
    descricao: "",
    localizacao: "",
    area: "",
    orcamento: "",
    prazo: "",
    observacoes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const createOrcamentoMutation = trpc.orcamentos.create.useMutation({
    onSuccess: () => {
      setSubmitSuccess(true);
      toast.success("Orçamento solicitado com sucesso! Entraremos em contato em breve.");
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        tipo: "construcao",
        assunto: "",
        descricao: "",
        localizacao: "",
        area: "",
        orcamento: "",
        prazo: "",
        observacoes: "",
      });
      setTimeout(() => setSubmitSuccess(false), 5000);
    },
    onError: (error) => {
      toast.error("Erro ao enviar orçamento. Tente novamente.");
      console.error("Erro:", error);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createOrcamentoMutation.mutateAsync({
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        tipo: formData.tipo,
        assunto: formData.assunto,
        descricao: formData.descricao,
        localizacao: formData.localizacao || undefined,
        area: formData.area ? parseInt(formData.area) : undefined,
        prazo: formData.prazo || undefined,
        observacoes: formData.observacoes || undefined,
      });
    } catch (error) {
      console.error("Erro ao enviar:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const tipoLabels = {
    construcao: "Construção Civil",
    reforma: "Reforma",
    projeto: "Projeto",
  };

  return (
    <div className="w-full">
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="font-semibold text-green-900">Orçamento Enviado com Sucesso!</h3>
            <p className="text-green-800 text-sm mt-1">
              Recebemos sua solicitação. Nossa equipe analisará e entrará em contato em breve.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md border border-border">
        {/* Seção 1: Informações Pessoais */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm">1</span>
            Informações Pessoais
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone *
              </label>
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="(47) 9999-9999"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Serviço *
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="construcao">Construção Civil</option>
                <option value="reforma">Reforma</option>
                <option value="projeto">Projeto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Seção 2: Detalhes do Projeto */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm">2</span>
            Detalhes do Projeto
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assunto *
              </label>
              <input
                type="text"
                name="assunto"
                value={formData.assunto}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ex: Construção de residência, Reforma de cozinha, Projeto estrutural"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição do Projeto *
              </label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Descreva detalhadamente o seu projeto. Inclua informações sobre o escopo, materiais desejados, acabamentos, etc."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localização
                </label>
                <input
                  type="text"
                  name="localizacao"
                  value={formData.localizacao}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Cidade, bairro ou endereço"
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
                  placeholder="Ex: 150"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Seção 3: Informações Adicionais */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm">3</span>
            Informações Adicionais
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prazo Desejado
              </label>
              <input
                type="text"
                name="prazo"
                value={formData.prazo}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ex: 3 meses, ASAP, Flexível"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Orçamento Estimado
              </label>
              <input
                type="text"
                name="orcamento"
                value={formData.orcamento}
                onChange={(e) => setFormData(prev => ({ ...prev, orcamento: e.target.value }))}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ex: R$ 50.000 - R$ 100.000"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observações Adicionais
            </label>
            <textarea
              name="observacoes"
              value={formData.observacoes}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Alguma informação adicional que gostaria de compartilhar?"
            />
          </div>
        </div>

        {/* Aviso */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-blue-800 text-sm">
            Seus dados serão tratados com confidencialidade. Entraremos em contato em até 24 horas úteis para analisar sua solicitação.
          </p>
        </div>

        {/* Botão Submit */}
        <Button
          type="submit"
          disabled={isSubmitting || createOrcamentoMutation.isPending}
          className="w-full bg-primary text-white hover:bg-primary/90 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={20} />
          {isSubmitting || createOrcamentoMutation.isPending ? "Enviando..." : "Solicitar Orçamento"}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          * Campos obrigatórios
        </p>
      </form>
    </div>
  );
}
