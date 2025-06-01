# Agro API

API RESTful para gerenciamento de produtores rurais, propriedades, safras e culturas plantadas.

## Tecnologias
- NestJS
- Prisma ORM
- PostgreSQL
- Swagger

## Funcionalidades
- Cadastro e listagem de produtores, propriedades, safras e culturas
- Dashboard com métricas (total de fazendas, hectares, uso do solo)
- Documentação Swagger
- Testes com Jest
- Dados mockados com Faker

## Preparando o container Kubernetes para o banco postgres (Caso ja tenha tudo configurado pule para o passo 6)
1. Instale o Chocolatey, caso não saiba pode seguir esse tutorial: https://chocolatey.org/install#individual
2. Execute o seguinte comando no Powershell para instalar o minikube: choco install minikube
3. Execute o seguinte comando no Powershell para instalar o cliente do kubernetes: choco install kubernetes-cli
4. Execute o seguinte comando para iniciar o minikube no container docker: minikube start --driver=docker
5. Execute o seguinte comando para verificar se os serviços subiram corretamente: kubectl get nodes
6. Execute o seguinte comando para criar a instância do servidor postgres: kubectl apply -f postgres-deployment.yaml
7. Execute o seguinte comando para iniciar o serviço do banco na porta indicada: kubectl port-forward svc/postgres 5432:5432

## Rodando
1. Configure o `.env`, a unica variável necessário é essa: DATABASE_URL="postgresql://agro_usr:agro_pwd@localhost:5432/agro"
2. Caso seja a primeira execução rodar o comando `npm run prisma-init` para criar a estrutura inicial do banco de dados
2. Rode `npm run start` ou `npm run seed` para popular dados
3. Acesse `http://localhost:3000/api` para a documentação Swagger
