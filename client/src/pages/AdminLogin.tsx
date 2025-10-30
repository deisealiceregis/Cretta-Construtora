import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validação simples (em produção, isso seria feito no servidor)
    if (username === "deisealice" && password === "123456") {
      // Salvar token no localStorage
      localStorage.setItem("adminToken", "authenticated");
      localStorage.setItem("adminUsername", username);
      toast.success("Login realizado com sucesso!");
      setLocation("/admin/painel");
    } else {
      toast.error("Usuário ou senha incorretos!");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <div className="flex justify-center mb-8">
            <div className="bg-primary rounded-full p-4">
              <Lock size={32} className="text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-2">Painel Administrativo</h1>
          <p className="text-gray-600 text-center mb-8">CRETTA Construtora e Incorporadora</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Usuário</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Seu usuário"
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                disabled={isLoading}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            © 2024 CRETTA Construtora. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
