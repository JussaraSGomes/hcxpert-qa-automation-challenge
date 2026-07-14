# language: pt
Funcionalidade: Autenticação de usuário
  Como cliente da plataforma
  Quero autenticar minha conta
  Para acessar funcionalidades restritas

  Cenário: Realizar login com credenciais válidas
    Dado que estou na página de autenticação
    Quando informo credenciais válidas
    Então devo acessar a área autenticada

  Cenário: Impedir login com senha incorreta
    Dado que estou na página de autenticação
    Quando informo um e-mail válido e uma senha incorreta
    Então devo visualizar a mensagem de credenciais inválidas
