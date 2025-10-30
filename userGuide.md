# CRETTA Construtora - Guia de Uso

## Bem-vindo ao seu site!

**Propósito:** Site profissional para a construtora CRETTA, permitindo apresentar projetos, construções e reformas com fotos e informações detalhadas.

**Acesso:** Público - Qualquer pessoa pode visualizar os projetos. Você pode adicionar, editar e gerenciar conteúdo diretamente pelo site.

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

### 2. Adicionando Construções

1. Clique em **"Construção"** no menu
2. Clique em **"Adicionar Nova Construção"**
3. Preencha os campos:
   - **Título:** Nome do projeto (ex: "Edifício Residencial Centro")
   - **Descrição:** Detalhes do projeto
   - **Cliente:** Nome do cliente
   - **Localização:** Endereço completo
   - **Pavimentos:** Número de andares (opcional)
   - **Apartamentos:** Quantidade de unidades (opcional)
   - **Área (m²):** Metragem total (opcional)
   - **URL da Foto:** Link para imagem do projeto
4. Clique em **"Salvar Construção"**

### 3. Adicionando Projetos

Siga o mesmo processo na aba **"Projetos"** com os mesmos campos.

### 4. Adicionando Reformas

Na aba **"Reformas"**, adicione reformas com:
- Título, Descrição, Cliente, Localização, Área (m²) e Foto

### 5. Enviando Mensagens de Contato

1. Clique em **"Contato"** no menu
2. Preencha o formulário com seu nome, email, telefone e mensagem
3. Clique em **"Enviar Mensagem"**

---

## Gerenciando Seu Website

### Editando Cores e Padrões

Acesse o **Management UI** (ícone de painel no canto superior direito):

1. **Settings** → **General**
   - Altere o nome do site em "Website Name"
   - Atualize o logo em "Website Logo"

2. **Settings** → **Domains**
   - Configure seu domínio customizado ou use o domínio automático

### Adicionando Fotos

Para cada construção, projeto ou reforma:
- Obtenha o **URL completo** da imagem (ex: `https://exemplo.com/foto.jpg`)
- Cole na aba **"URL da Foto"** ao adicionar um novo item
- A foto aparecerá automaticamente no card do projeto

### Visualizando Dados

Acesse **Management UI** → **Database** para:
- Ver todos os dados cadastrados
- Editar ou deletar itens diretamente
- Exportar informações

---

## Next Steps

**Talk to Manus AI anytime** para solicitar mudanças, adicionar novas funcionalidades ou fazer ajustes no design.

Comece adicionando seus primeiros projetos na aba **"Construção"** para que seus clientes vejam o trabalho da CRETTA!

---

**Dica:** Use imagens de alta qualidade (mínimo 800x600px) para os melhores resultados visuais nos cards de projetos.
