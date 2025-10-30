import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Construcoes from "./pages/Construcoes";
import Projetos from "./pages/Projetos";
import Reformas from "./pages/Reformas";
import SobreNos from "./pages/SobreNos";
import Visao from "./pages/Visao";
import Contato from "./pages/Contato";
import Admin from "./pages/Admin";
import Portfolio from "./pages/Portfolio";
import Depoimentos from "./pages/Depoimentos";
import Empreendimentos from "./pages/Empreendimentos";
import NotFound from "@/pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/construcoes" component={Construcoes} />
      <Route path="/projetos" component={Projetos} />
      <Route path="/reformas" component={Reformas} />
      <Route path="/quem-somos" component={SobreNos} />
      <Route path="/visao" component={Visao} />
      <Route path="/contato" component={Contato} />
      <Route path="/admin" component={Admin} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/depoimentos" component={Depoimentos} />
      <Route path="/empreendimentos" component={Empreendimentos} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Header />
          <Router />
          <Footer />
          <ScrollToTop />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
