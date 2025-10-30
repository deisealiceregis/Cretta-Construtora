import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Reformas() {
  const [reformas, setReformas] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    cliente: "",
    localizacao: "",
    area: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReformas((prev) => [...prev, { ...formData, id: Date.now() }]);
    setFormData({ titulo: "", descricao: "", cliente: "", localizacao: "", area: "" });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary text-white py-12 px-4">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Reformas</h1>
          <p className="text-lg text-gray-200">Serviços especializados em reformas e renovações.</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container">
          <div className="bg-white rounded-lg shadow-md p-8 mb-8 border border-border">
            <h2 className="text-3xl font-bold mb-4 text-primary">Reformas</h2>
            <p className="text-gray-600 mb-6">Adicione novas reformas com fotos e informações detalhadas.</p>
            <Button onClick={() => setShowForm(!showForm)} className="bg-primary text-white hover:bg-primary/90 flex items-center gap-2">
              <Plus size={20} /> Adicionar Nova Reforma
            </Button>
          </div>

          {showForm && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-8 border border-border">
              <h3 className="text-2xl font-bold mb-6 text-primary">Adicionar Nova Reforma</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                  <input type="text" name="titulo" value={formData.titulo} onChange={handleInputChange} required className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                  <textarea name="descricao" value={formData.descricao} onChange={handleInputChange} required rows={4} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cliente</label>
                    <input type="text" name="cliente" value={formData.cliente} onChange={handleInputChange} required className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Localização</label>
                    <input type="text" name="localizacao" value={formData.localizacao} onChange={handleInputChange} required className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Área (m²)</label>
                  <input type="number" name="area" value={formData.area} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="flex gap-4">
                  <Button type="submit" className="bg-primary text-white hover:bg-primary/90">Salvar Reforma</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
                </div>
              </form>
            </div>
          )}

          {reformas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {reformas.map((reforma) => (
                <div key={reforma.id} className="bg-white rounded-lg shadow-md p-6 border border-border hover:shadow-lg transition">
                  <h3 className="text-2xl font-bold mb-2 text-primary">{reforma.titulo}</h3>
                  <p className="text-gray-600 mb-4">{reforma.descricao}</p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Cliente:</strong> {reforma.cliente}</p>
                    <p><strong>Localização:</strong> {reforma.localizacao}</p>
                    {reforma.area && <p><strong>Área:</strong> {reforma.area} m²</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center border border-border">
              <p className="text-gray-600 text-lg">Nenhuma reforma cadastrada ainda.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
