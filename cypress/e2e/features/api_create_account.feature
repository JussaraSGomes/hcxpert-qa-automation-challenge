# language: pt

Funcionalidade: Criação de conta de usuário pela API
  Como responsável pela qualidade da plataforma
  Quero criar usuários por meio da API
  Para disponibilizar uma massa válida para os testes automatizados

  Cenário: Criar uma conta com dados válidos
    Quando envio uma requisição para criar uma conta com dados válidos
    Então a API deve processar a requisição com sucesso
    E o código de negócio retornado deve ser 201
    E a mensagem deve informar que o usuário foi criado

  Cenário: Não criar uma conta com e-mail já cadastrado
    Dado que existe uma conta previamente cadastrada
    Quando envio uma nova requisição com o mesmo e-mail
    Então a API deve rejeitar a criação da conta duplicada
    E deve informar que o e-mail já está cadastrado