# CRETTA Construtora - TODO

## Funcionalidades Principais

- [x] Estrutura básica do site (cabeçalho, rodapé, navegação)
- [x] Página Inicial com hero section e informações da empresa
- [x] Página de Construções com listagem e formulário de cadastro
- [x] Página de Projetos com listagem e formulário de cadastro
- [x] Página de Reformas com listagem e formulário de cadastro
- [x] Página "Quem Somos" com informações da empresa
- [x] Página "Visão" com valores e missão
- [x] Página de Contato com formulário e informações
- [x] Funcionalidade de upload de fotos para construções/projetos/reformas
- [x] Sistema de edição de conteúdo, cores e padrões
- [x] Integração com banco de dados para armazenar dados
- [x] Autenticação de usuários (admin)
- [x] Responsividade e design mobile-first

## Design Visual

- [x] Implementar paleta de cores (verde escuro, preto, bege)
- [x] Integrar logo da CRETTA
- [x] Aplicar Tailwind CSS com customizações
- [x] Criar componentes reutilizáveis

## Banco de Dados

- [ ] Criar tabelas para Construções
- [ ] Criar tabelas para Projetos
- [ ] Criar tabelas para Reformas
- [ ] Criar tabelas para armazenar URLs de fotos (S3)

## API/Backend

- [ ] Criar procedures tRPC para listar construções
- [ ] Criar procedures tRPC para criar construções
- [ ] Criar procedures tRPC para listar projetos
- [ ] Criar procedures tRPC para criar projetos
- [ ] Criar procedures tRPC para listar reformas
- [ ] Criar procedures tRPC para criar reformas
- [ ] Implementar upload de fotos para S3

## Testes e Finalização

- [ ] Testar todas as funcionalidades
- [ ] Verificar responsividade
- [ ] Criar guia de usuário (userGuide.md)
- [ ] Fazer checkpoint final


## Painel Administrativo

- [x] Criar painel admin para editar cores do site em tempo real
- [x] Adicionar campo "Status da Obra" (em andamento, concluída, planejamento)
- [x] Criar funcionalidade de editar/deletar construções, projetos e reformas
- [x] Adicionar campo de progresso/percentual de conclusão
- [x] Link de acesso rápido ao Admin no Header
- [ ] Implementar upload de fotos direto (sem URL)
- [ ] Interface de gerenciamento de conteúdo (WYSIWYG)
- [ ] Editar informações de contato e redes sociais
- [ ] Painel de estatísticas de projetos


## Galeria de Imagens

- [x] Criar tabela de imagens no banco de dados
- [x] Implementar upload de múltiplas fotos por projeto
- [x] Galeria de imagens na página de admin
- [x] Deletar imagens individuais
- [ ] Reordenar imagens na galeria
- [ ] Exibir galeria nas páginas públicas de projetos


## Logo e Branding

- [x] Criar componente Logo SVG com design da CRETTA
- [x] Integrar logo no Header
- [ ] Adicionar logo em outras páginas (footer, admin)


## Redes Sociais

- [x] Adicionar ícones de redes sociais no rodapé
- [x] Integrar links para Facebook, Instagram e WhatsApp
- [x] Estilizar ícones com cores da marca


## Navegação e UX

- [x] Adicionar botão "Voltar ao Topo" no canto inferior direito
- [x] Efeito smooth scroll ao clicar
- [x] Mostrar/ocultar dinamicamente baseado na posição da página


## Banner Especial

- [x] Criar banner destacado na página inicial
- [x] Adicionar imagem/background atrativo
- [x] Incluir CTA (Call-to-Action) button
- [x] Responsivo em mobile


## Galeria de Fotos no Banner

- [x] Criar componente de galeria automática no banner
- [x] Implementar ciclo automático de imagens
- [x] Adicionar controles de navegação (anterior/próximo)
- [x] Indicadores de progresso/dots
- [x] Transições suaves entre imagens


## Seção de Especialidades

- [x] Criar seção detalhada de especialidades na página inicial
- [x] Destacar Construção Civil como especialidade principal
- [x] Detalhar Reformas como segunda especialidade
- [x] Detalhar Projetos de Energia como terceira especialidade
- [x] Adicionar ícones e descrições para cada especialidade
- [x] Design responsivo e atrativo

## Textos e Mensagens

- [x] Atualizar frase do hero section: "Construímos seu futuro com eficiência, solidez e propósito de mudar a sua história de vida."
- [x] Atualizar banner secundário para "Reformas e Renovações"
- [x] Atualizar descrição do banner: "Reinventamos espaços para transformar o seu jeito de viver. Transforme seus ambientes com nossas soluções de reforma criativas e personalizadas."

## Textos e Mensagens - Atualização 2

- [x] Atualizar tagline para "Excelência em Construção Civil"
- [x] Atualizar botão 1 do hero para "Empreendimentos em Construção"
- [x] Atualizar botão 2 do hero para "Empreendimentos Prontos" (link para Portfólio)
- [x] Atualizar título do banner secundário para apenas "Reformas"

## Seção de Especialidades - Atualização 3

- [x] Remover subtítulos "Especialidade Principal", "Segunda" e "Terceira"
- [x] Atualizar descrição da Construção Civil para "Excelência em construir — de grandes edifícios e espaços comerciais a lares que inspiram."
- [x] Atualizar features da Construção Civil com foco em qualidade e excelência

## Redes Sociais - Atualização 4

- [x] Atualizar link do Instagram para @crettaconstrutora
- [x] Atualizar link do Facebook para "Cretta Construtora e Incorporadora"
- [x] Verificar ícones das redes sociais no rodapé

## Formulário de Orçamento - Implementação Completa

- [x] Criar tabela de orçamentos no banco de dados
- [x] Implementar funções de CRUD para orçamentos no db.ts
- [x] Criar procedimentos tRPC para orçamentos
- [x] Criar componente OrcamentoForm com validação
- [x] Integrar formulário na página de Contato
- [x] Testar formulário com todos os campos
- [x] Adicionar mensagens de sucesso/erro com toast
- [x] Implementar 3 seções de campos organizadas

## Mapa Interativo - Implementação

- [x] Instalar biblioteca Leaflet para mapa interativo
- [x] Criar componente MapaLocalizacao com Leaflet
- [x] Integrar mapa na página de Contato
- [x] Adicionar marcador com informações da empresa
- [x] Testar mapa e salvar checkpoint

## Projetos em Destaque - Implementação

- [ ] Criar componente ProjectCard para exibir projetos
- [ ] Criar seção Projetos em Destaque na página Home
- [ ] Criar páginas de detalhes para construções
- [ ] Criar páginas de detalhes para reformas
- [ ] Criar páginas de detalhes para projetos
- [ ] Integrar dados de projetos nas páginas de detalhes
- [ ] Testar navegação entre páginas
- [ ] Salvar checkpoint

## Correções Solicitadas

- [x] Adicionar logo da CRETTA ao lado do título no banner principal
- [x] Corrigir ícone do WhatsApp (usar ícone correto)
- [x] Alterar telefone principal para usar ícone de WhatsApp
- [x] Remover ou desabilitar link do Facebook
- [x] Corrigir botões do banner principal para exibir dados completos de Empreendimentos
- [x] Atualizar página Empreendimentos para buscar dados do banco de dados
- [x] Testar navegação dos botões "Empreendimentos em Construção" e "Empreendimentos Prontos"
