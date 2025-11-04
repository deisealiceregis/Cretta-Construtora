import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import { getLoginUrl } from "./const";
import "./index.css";

// Verificar autenticação ANTES de renderizar a aplicação
const checkAuthBeforeRender = () => {
  const currentPath = window.location.pathname;
  
  // Rotas que requerem autenticação
  const protectedRoutes = ['/admin/painel', '/admin/empreendimentos'];
  
  // Verificar se a rota atual requer autenticação
  const isProtectedRoute = protectedRoutes.some(route => currentPath.startsWith(route));
  
  if (isProtectedRoute) {
    const token = localStorage.getItem("adminToken");
    const username = localStorage.getItem("adminUsername");
    
    // Se não houver token ou username válido, redirecionar para login
    if (!token || !username || token.trim() === "" || username.trim() === "") {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUsername");
      window.location.href = "/admin/login";
      return false;
    }
  }
  
  return true;
};

// Executar verificação antes de renderizar
if (!checkAuthBeforeRender()) {
  // Não renderizar nada se a autenticação falhar
  // O redirecionamento já foi feito acima
} else {
  const queryClient = new QueryClient();

  const redirectToLoginIfUnauthorized = (error: unknown) => {
    if (!(error instanceof TRPCClientError)) return;
    if (typeof window === "undefined") return;

    const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

    if (!isUnauthorized) return;

    window.location.href = getLoginUrl();
  };

  queryClient.getQueryCache().subscribe(event => {
    if (event.type === "updated" && event.action.type === "error") {
      const error = event.query.state.error;
      redirectToLoginIfUnauthorized(error);
      console.error("[API Query Error]", error);
    }
  });

  queryClient.getMutationCache().subscribe(event => {
    if (event.type === "updated" && event.action.type === "error") {
      const error = event.mutation.state.error;
      redirectToLoginIfUnauthorized(error);
      console.error("[API Mutation Error]", error);
    }
  });

  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: "/api/trpc",
        transformer: superjson,
        fetch(input, init) {
          return globalThis.fetch(input, {
            ...(init ?? {}),
            credentials: "include",
          });
        },
      }),
    ],
  });

  createRoot(document.getElementById("root")!).render(
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
