import { useEffect, useState } from "react";
import { useLocation } from "wouter";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "user";
}

export default function ProtectedRoute({ children, requiredRole = "admin" }: ProtectedRouteProps) {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const username = localStorage.getItem("adminUsername");

    // Se não houver token ou username, redirecionar para login
    if (!token || !username || token.trim() === "" || username.trim() === "") {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUsername");
      setIsAuthenticated(false);
      setIsLoading(false);
      // Usar setTimeout para garantir que o redirecionamento aconteça
      setTimeout(() => {
        setLocation("/admin/login");
      }, 0);
      return;
    }

    setIsAuthenticated(true);
    setIsLoading(false);
  }, [setLocation]);

  // Não renderizar nada enquanto está verificando autenticação
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  // Se não está autenticado, não renderizar o conteúdo
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
