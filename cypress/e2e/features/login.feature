# language: pt

Funcionalidade: Login de usuário
  Como usuário cadastrado na plataforma
  Quero autenticar minha conta
  Para acessar as funcionalidades disponíveis para usuários logados

  Cenário: Realizar login com credenciais válidas
    Dado que acesso a página de login
    Quando informo um e-mail cadastrado
    E informo a senha correta
    E solicito a autenticação
    Então devo ser autenticado com sucesso
    E meu nome de usuário deve ser exibido na página inicial

  Cenário: Não realizar login com senha inválida
    Dado que acesso a página de login
    Quando informo um e-mail cadastrado
    E informo uma senha inválida
    E solicito a autenticação
    Então devo permanecer na página de login
    E deve ser exibida uma mensagem informando que o e-mail ou a senha estão incorretos

  Cenário: Não realizar login sem preencher as credenciais
    Dado que acesso a página de login
    Quando solicito a autenticação sem preencher e-mail e senha
    Então o login não deve ser realizado
    E os campos obrigatórios devem impedir o envio do formulário