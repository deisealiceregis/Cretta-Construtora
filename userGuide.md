# CRETTA Construtora - Guia de Uso

## Bem-vindo ao seu site!

**Propósito:** Site profissional para a construtora CRETTA, permitindo apresentar projetos, construções e reformas com fotos e informações detalhadas, com painel administrativo completo para gerenciar tudo.

**Acesso:** Público - Qualquer pessoa pode visualizar os projetos. Você tem acesso total ao painel administrativo para gerenciar conteúdo.

---

## Powered by Manus

**Tech Stack:**
- **Frontend:** React 19 + TypeScript + Tailwind CSS 4 + shadcn/ui
- **Backend:** Express.js + tRPC 11
- **Database:** MySQL com Drizzle ORM
- **Authentication:** Manus OAuth integrado
- **Deployment:** Auto-scaling infrastructure com global CDN

---

## Usando Seu Website

### 1. Navegação Principal

Acesse as seções pelo menu no topo:
- **Página Inicial** - Apresentação da empresa e serviços
- **Construção** - Projetos em construção
- **Projetos** - Acompanhamento de projetos
- **Reformas** - Serviços de reforma
- **Quem Somos** - Informações sobre a empresa
- **Visão** - Valores e missão
- **Contato** - Formulário de contato
- **Admin** - Painel de gerenciamento (botão destacado no menu)

### 2. Painel Administrativo

Clique no botão **"Admin"** no menu superior para acessar o painel de controle completo.

#### Aba de Cores
Personalize as cores do seu site em tempo real:
- **Cor Primária** (Verde) - Cor principal do site
- **Cor Secundária** (Preto) - Cor de contraste
- **Cor de Destaque** - Cor para elementos especiais

Use o seletor de cores ou digite o código hexadecimal (ex: #2D5F4F). As mudanças são aplicadas imediatamente!

#### Aba de Construções
Gerencie todas as suas construções:
1. Clique no ícone **Editar** para modificar qualquer construção
2. Atualize: Título, Descrição, Status, Progresso
3. **Status da Obra:** Escolha entre Planejamento, Em Andamento ou Concluída
4. **Progresso:** Use o slider para definir o percentual de conclusão (0-100%)
5. Clique em **Salvar** para confirmar as mudanças
6. Use o ícone **Lixeira** para deletar uma construção

#### Aba de Projetos
Mesmas funcionalidades da aba de Construções - gerencie seus projetos com status e progresso.

#### Aba de Reformas
Mesmas funcionalidades - controle suas reformas com status e progresso.

### 3. Adicionando Novos Itens

Nas páginas de Construção, Projetos e Reformas (fora do admin):
1. Clique em **"Adicionar Nova [Item]"**
2. Preencha os campos:
   - **Título:** Nome do projeto
   - **Descrição:** Detalhes do projeto
   - **Cliente:** Nome do cliente
   - **Localização:** Endereço completo
   - **Pavimentos/Apartamentos/Área:** Informações adicionais (opcional)
   - **URL da Foto:** Link para imagem do projeto
3. Clique em **"Salvar"**

### 4. Enviando Mensagens de Contato

1. Clique em **"Contato"** no menu
2. Preencha o formulário com seu nome, email, telefone e mensagem
3. Clique em **"Enviar Mensagem"**

---

## Gerenciando Seu Website

### Editando Cores e Padrões

Acesse o **Painel Admin** → **Aba de Cores** para:
- Mudar cores do site em tempo real
- Usar o seletor visual ou digitar códigos hexadecimais
- As mudanças são salvas automaticamente no banco de dados

### Acompanhando Obras

Para cada construção, projeto ou reforma você pode:
- Definir o **Status** (Planejamento, Em Andamento, Concluída)
- Atualizar o **Progresso** (0-100%) com um slider
- Editar descrição e informações a qualquer momento
- Deletar itens que não são mais relevantes

### Visualizando Dados

Acesse o **Management UI** (ícone de painel no canto superior direito) → **Database** para:
- Ver todos os dados cadastrados em tabelas
- Editar ou deletar itens diretamente
- Exportar informações se necessário

---

## Dicas Importantes

**Fotos:** Use imagens de alta qualidade (mínimo 800x600px) para os melhores resultados visuais nos cards de projetos.

**Status da Obra:** Mantenha atualizado o status e progresso para que seus clientes saibam como anda cada projeto.

**Cores:** Teste as cores em diferentes páginas antes de finalizar - as mudanças afetam todo o site.

---

## Next Steps

**Talk to Manus AI anytime** para solicitar mudanças, adicionar novas funcionalidades ou fazer ajustes no design.

Comece acessando o **Painel Admin** para personalizar as cores e depois adicione seus primeiros projetos na aba **"Construção"**!
