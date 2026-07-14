# language: pt

Funcionalidade: Login de usuário
  Como usuário cadastrado na plataforma
  Quero realizar login com minhas credenciais
  Para acessar as funcionalidades disponíveis para usuários autenticados

  Cenário: Realizar login com credenciais válidas
    Dado que possuo uma conta válida cadastrada
    E que acesso a página de login
    Quando informo as credenciais válidas
    E solicito a autenticação
    Então devo ser autenticado com sucesso
    E meu nome de usuário deve ser exibido no menu principal

  Cenário: Não realizar login com senha inválida
    Dado que possuo uma conta válida cadastrada
    E que acesso a página de login
    Quando informo o e-mail cadastrado e uma senha inválida
    E solicito a autenticação
    Então devo permanecer na página de login
    E deve ser exibida a mensagem de credenciais inválidas

  Cenário: Não realizar login sem preencher o e-mail
    Dado que acesso a página de login
    Quando informo somente a senha
    E solicito a autenticação
    Então o campo de e-mail deve impedir o envio do formulário