import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
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
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
            <ScrollToTop />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
