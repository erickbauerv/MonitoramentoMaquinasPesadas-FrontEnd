# Monitoramento de Máquinas Pesadas - Front-End

### Sobre o projeto

O projeto foi desenvolvido como parte do processo seletivo da Concert Technologies, o objetivo do projeto é desenvolver um sistema de monitoramento de máquinas pesadas utilizando telemetria, o front-end da aplicação foi desenvolvido com TypeScript e Angular, consumindo a API em https://github.com/erickbauerv/MonitoramentoDeMaquinasPesadas-backend.

### Funcionalidades

O projeto consiste em um dashboard onde podem ser visualizadas as informações de Nome, Localização e Status das máquinas cadastradas, com a opção de filtrar por status e visualizar mais detalhes sobre cada máquina. No topo do dashboard são exibidos os botões de navegação para o mapa interativo exibindo a localização de cada máquina no mapa mundi e a opção de cadastrar novas máquinas.

Na tela de cadastro de máquina é exibido um formulário para que o usuário preencha os campos de Nome, Localização e Status, com validações para que todos os valores sejam preenchidos corretamente.

Na tela de mais detalhes diferente do dashboard também é exibido o id da máquina e a opção de editar a localização e o status, com as mesmas validações da tela de cadastro.

Na tela de mapa interativo é exibido um mapa mundi com ícones marcando onde as máquinas estão de acordo com a localização preenchida no cadastro ou na edição, ao clicar no ícone é exibido um popup com o nome é status da máquina.

### Instalação do projeto

1 - Clonar o repositório com `git clone https://github.com/erickbauerv/MonitoramentoMaquinasPesadas-FrontEnd.git`

2 - Na pasta do projeto rodar o comando `npm install` para instalar as dependências do projeto

3 - Para rodar a aplicação utilizar o comando `ng serve` ou `ng serve —open` para abrir direto no navegador

4 - A aplicação estará disponível em  [http://localhost:4200](http://localhost:4200/)
