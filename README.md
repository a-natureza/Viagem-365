# Viagem365

## Descrição do Projeto

Viagem365 é uma aplicação web para gerenciamento de viagens, permitindo aos usuários cadastrar, listar, editar e visualizar locais de destino em um mapa interativo.

## Funcionalidades

- **Login e Cadastro:** Autenticação de usuários.
- **Dashboard:** Exibição de informações principais e navegação.
- **Cadastro de Locais de Destino:** Adicionar novos destinos.
- **Listagem e Edição:** Listar, editar e deletar destinos.
- **Mapas:** Visualização de destinos cadastrados em um mapa.

## Tecnologias Utilizadas

- **Frontend:** React
- **Componentes de UI:** Material UI, Bootstrap
- **Formulários:** react-hook-form
- **Roteamento:** react-router-dom
- **API e Backend:** json-server para prototipagem rápida de API
- **Mapas:** Leaflet
- **Busca de Endereços:** API ViaCEP

## Como Executar

### Passos para clonar o repositório e rodar a aplicação localmente:

1. Clone o repositório:
    ```bash
    git clone https://github.com/a-natureza/Viagem-365.git
    cd viagem-365
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Inicie o servidor JSON (para prototipagem rápida de API):
    ```bash
    npx json-server --watch database.json --port 3000
    ```

4. Inicie a aplicação:
    ```bash
    npm run dev
    ```

5. Abra o navegador e acesse:
    ```
    http://localhost:5173
    ```

## Melhorias Futuras

- Implementar autenticação robusta com JWT.
- Adicionar testes unitários e de integração.
- Melhorar a UI com mais funcionalidades interativas.
- Otimizar o desempenho da aplicação.

## Vídeo de Apresentação
<!-- 
[![Assista ao vídeo de apresentação](https://img.youtube.com/vi/seu-video-id/0.jpg)](https://www.youtube.com/watch?v=seu-video-id) -->

## Estrutura do Projeto

- **src/**
  - **components/**: Componentes reutilizáveis.
  - **pages/**: Páginas principais (Login, Dashboard, etc).
  - **services/**: Serviços de API.
  - **styles/**: Estilos globais e específicos.
  - **utils/**: Utilitários e helpers.

## Contato

<!-- Para mais informações, entre em contato pelo e-mail: [seu-email@example.com](mailto:seu-email@example.com). -->