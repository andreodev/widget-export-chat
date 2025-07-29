# 🧩 Widget Export Chat

Widget React desenvolvido para exportar conversas de chat com suporte a PDF, agrupamento por data e filtragem por contato.  
Projeto realizado como **freelancer para a Inov Start**.

## ✨ Funcionalidades

- 🔍 Busca de chats por contato
- 📅 Agrupamento por data
- 📄 Exportação para PDF
- 🎨 Interface responsiva
- ⚙️ Totalmente integrável com plataformas de atendimento
- 📁 Suporte a exportação múltipla com flag "todos os chats"

---

## 🛠️ Tecnologias

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) (animações)

---

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/andreodev/widget-export-chat.git

# Acesse a pasta
cd widget-export-chat

# Instale as dependências
npm install

# Inicie em modo de desenvolvimento
npm run dev
```

---



## ⚙️ Parâmetros do Componente

| Propriedade       | Tipo     | Descrição                                             |
|-------------------|----------|--------------------------------------------------------|
| `contactId`       | `string` | ID do contato para buscar os chats                    |
| `showAllChats`    | `boolean`| Exporta todos os chats do contato                     |
| `onExportStart`   | `() => void` | Callback opcional para início de exportação     |
| `onExportComplete`| `() => void` | Callback opcional após finalização do PDF       |

---

## 📤 Exportação PDF

- Formato: `.pdf`
- Estilo baseado na interface do sistema
- Compactação leve com `html2pdf`
- Suporte a múltiplas páginas

---

## 📄 Licença

Este projeto está licenciado sob os termos da licença **MIT**. Veja o arquivo [LICENSE](./LICENSE) para mais informações.

---

## 🙋‍♂️ Autor

Feito com 💙 por **[Andreo Henrique](https://github.com/andreodev)**  
Desenvolvedor React | Node | TypeScript

---
