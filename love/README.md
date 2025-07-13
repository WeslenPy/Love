# 💕 Site de Declaração de Amor

Um site romântico e interativo para declarações de amor, construído com React, Vite e Tailwind CSS.

## ✨ Características

- **Design Romântico**: Paleta de cores suaves em tons de rosa e vermelho
- **Animações Interativas**: Corações flutuantes e efeitos de partículas
- **Responsivo**: Funciona perfeitamente em desktop e mobile
- **Navegação Suave**: Scroll suave entre seções com navegação lateral
- **Efeitos Visuais**: Gradientes animados, hover effects e micro-interações

## 🚀 Como Usar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou pnpm

### Instalação e Execução

1. **Clone ou baixe o projeto**
2. **Instale as dependências:**
   ```bash
   cd declaracao-amor
   npm install
   # ou
   pnpm install
   ```

3. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   # ou
   pnpm run dev
   ```

4. **Acesse no navegador:**
   - Abra `http://localhost:5173`

### Build para Produção

```bash
npm run build
# ou
pnpm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## 🎨 Personalização

### Alterando o Conteúdo

Edite o arquivo `src/App.jsx` para personalizar:

- **Mensagens de amor**: Altere os textos nas seções
- **Timeline**: Modifique os momentos especiais na seção "Nossa História"
- **Promessas**: Personalize os cards de promessas
- **Citações**: Mude a citação final

### Personalizando Cores

No arquivo `src/App.css`, você pode alterar:

```css
:root {
  --primary: #dc2626;        /* Cor principal (vermelho) */
  --secondary: #ffc0cb;      /* Cor secundária (rosa) */
  --accent: #ffd700;         /* Cor de destaque (dourado) */
}
```

### Adicionando Fotos

1. Coloque suas imagens na pasta `src/assets/`
2. Importe no `App.jsx`:
   ```jsx
   import minhaFoto from './assets/minha-foto.jpg'
   ```
3. Use no JSX:
   ```jsx
   <img src={minhaFoto} alt="Descrição" />
   ```

## 📱 Seções do Site

1. **Hero**: Página inicial com título principal
2. **Carta do Coração**: Declaração de amor personalizada
3. **Nossa História**: Timeline dos momentos especiais
4. **Minhas Promessas**: Compromissos e promessas
5. **Declaração Final**: Mensagem final com botão interativo

## 🎯 Funcionalidades Interativas

- **Corações Flutuantes**: Aparecem automaticamente e ao clicar em botões
- **Navegação Lateral**: Pontos de navegação no lado direito
- **Scroll Suave**: Transições suaves entre seções
- **Hover Effects**: Efeitos visuais ao passar o mouse
- **Animações CSS**: Gradientes animados e efeitos de entrada

## 🛠️ Tecnologias Utilizadas

- **React 18**: Framework principal
- **Vite**: Build tool e servidor de desenvolvimento
- **Tailwind CSS**: Framework de CSS utilitário
- **Lucide React**: Biblioteca de ícones
- **shadcn/ui**: Componentes de interface

## 📝 Estrutura do Projeto

```
declaracao-amor/
├── src/
│   ├── components/ui/     # Componentes shadcn/ui
│   ├── App.jsx           # Componente principal
│   ├── App.css           # Estilos personalizados
│   ├── main.jsx          # Ponto de entrada
│   └── assets/           # Imagens e recursos
├── public/               # Arquivos públicos
├── index.html           # HTML principal
└── package.json         # Dependências
```

## 💡 Dicas de Personalização

1. **Textos**: Substitua todas as mensagens por suas próprias palavras
2. **Datas**: Atualize as datas na timeline com seus momentos especiais
3. **Cores**: Experimente diferentes paletas de cores no CSS
4. **Fotos**: Adicione fotos suas e da pessoa amada
5. **Música**: Considere adicionar uma música de fundo (opcional)

## 🎁 Ideias de Uso

- Pedido de namoro
- Aniversário de relacionamento
- Declaração de amor especial
- Presente romântico digital
- Renovação de votos

## 📞 Suporte

Se precisar de ajuda para personalizar ou tiver dúvidas, consulte:
- Documentação do React: https://react.dev
- Documentação do Tailwind: https://tailwindcss.com
- Documentação do Vite: https://vitejs.dev

---

💖 **Feito com amor para espalhar amor!** 💖

