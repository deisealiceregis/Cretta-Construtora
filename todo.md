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

## Função de Busca de Empreendimentos

- [x] Implementar componente de busca na página de Empreendimentos
- [x] Adicionar filtro por nome/título
- [x] Adicionar filtro por localização
- [x] Implementar busca em tempo real (debounce)
- [x] Testar busca com diferentes termos
- [x] Salvar checkpoint

## Correção dos Ícones de Empreendimentos

- [x] Verificar se os ícones do menu contém todos os dados para edição
- [x] Corrigir os ícones para incluir: Título, Descrição, Localização, Preço, Metragem, Pavimentos, Quartos, Banheiros, Vagas, Unidades, Área, Tipo, Progresso, Datas, Diferenciais, URLs de Imagens
- [x] Atualizar o ícone da página central (está mostrando "Construções" em vez de "Empreendimentos")
- [x] Testar edição de empreendimentos através dos ícones
- [x] Salvar checkpoint

## Dados de Exemplo de Empreendimentos

- [x] Criar dados de exemplo no banco de dados
- [x] Adicionar 3 empreendimentos prontos com todas as informações
- [x] Adicionar 2 empreendimentos em construção com progresso
- [x] Adicionar 1 lançamento com data de lançamento
- [x] Verificar se os dados aparecem na página
- [x] Testar edição de um empreendimento no painel admin
- [x] Salvar checkpoint

## Ajustes na Página Home

- [x] Aumentar tamanho da logo CRETTA
- [x] Diminuir tamanho do título "CRETTA Construtora e Incorporadora"
- [x] Trocar banner "Empreendimentos Prontos" por "Reformas"
- [x] Integrar dados de reformas do banco de dados
- [x] Testar alterações
- [x] Salvar checkpoint

## Ajustes Visuais do Header

- [x] Aumentar logo com moldura redonda e degradê nas bordas
- [x] Diminuir ou suavizar a letra "CRETTA Construtora"
- [x] Centralizar o menu de cima
- [x] Testar alterações
- [x] Salvar checkpoint

## Remover Moldura e Tornar Texto Mais Delicado

- [x] Remover moldura redonda da logo no Header
- [x] Remover moldura redonda da logo na página Home
- [x] Tornar a escrita CRETTA mais delicada (font-extralight, tracking-widest)
- [x] Adicionar estilos CSS para cretta-brand
- [x] Testar alterações
- [x] Salvar checkpoint

## Implementar Tipografia e Logo Conforme Imagem

- [x] Atualizar logo SVG para estilo C geométrico
- [x] Implementar tipografia CRETTA em bold/heavy (Arial Black, font-weight 900)
- [x] Implementar tipografia CONSTRUTORA em fonte leve espaçada (Courier New, letter-spacing 0.25em)
- [x] Atualizar Header com novas classes
- [x] Atualizar Home com novas classes
- [x] Testar alterações
- [x] Salvar checkpoint

## Remover Logo Duplicada e Adicionar Detalhe no A

- [x] Remover logo duplicada da página Home (manter apenas uma)
- [x] Analisar detalhe do "A" final de "CRETTA" na imagem
- [x] Implementar detalhe especial no "A" final
- [x] Testar alterações
- [x] Salvar checkpoint

## Galeria de Imagens com Zoom e Miniaturas

- [x] Criar componente ImageGallery com zoom
- [x] Adicionar navegação por miniaturas
- [x] Implementar controles de zoom (+ e -)
- [x] Integrar galeria na página de Empreendimentos
- [x] Testar galeria com diferentes imagens
- [x] Salvar checkpoint

## Remover Tipografia do Header e Deixar Apenas Logo

- [x] Atualizar logo SVG conforme imagem fornecida
- [x] Remover tipografia "CRETTA CONSTRUTORA" do Header
- [x] Manter apenas a logo no Header
- [x] Testar alterações
- [x] Salvar checkpoint

## Centralizar Header

- [x] Centralizar logo e navegação no Header
- [x] Testar alterações
- [x] Salvar checkpoint

## Remover Ponto do A e Habilitar Fotos

- [x] Remover ponto após a letra "A" da CRETTA
- [x] Aumentar tamanho da escrita para melhor harmonia
- [x] Habilitar adição de fotos nos empreendimentos (formulário)
- [x] Testar alterações
- [x] Salvar checkpoint

## Habilitar Fotos e Atualizar Redes Sociais

- [x] Corrigir funcionalidade de adição de fotos nos empreendimentos
- [x] Atualizar WhatsApp para 47 3170 0160
- [x] Atualizar Facebook para https://www.facebook.com/crettaconstrutorae eincorporadora
- [x] Modificar ícones de redes sociais (Instagram, Facebook, WhatsApp)
- [x] Garantir que tudo seja editável no painel admin
- [x] Testar alterações
- [x] Salvar checkpoint

## Corrigir Funcionalidade de Fotos (Conflito de Variáveis)

- [x] Identificar conflito entre novaFoto para fotos e diferenciais
- [x] Criar variável separada novoDiferencial
- [x] Atualizar função adicionarDiferencial
- [x] Atualizar campo de entrada de diferenciais
- [x] Atualizar resetForm
- [x] Testar funcionalidade de fotos
- [x] Salvar checkpoint

## Problema: Não Consegue Adicionar Fotos

- [x] Debugar função adicionarFoto
- [x] Verificar se há erros no console do navegador
- [x] Testar adição de fotos com URL válida
- [x] Garantir que fotos sejam salvas no banco de dados
- [x] Permitir edição de andamento/progresso
- [x] Testar todas as funcionalidades
- [x] Salvar checkpoint
