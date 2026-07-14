# language: pt

Funcionalidade: Pesquisa de produtos
  Como cliente da plataforma
  Quero pesquisar produtos
  Para localizar os itens que desejo comprar

  Cenário: Pesquisar um produto existente
    Dado que acesso a listagem de produtos
    Quando pesquiso por um produto existente
    Então deve ser exibida a seção de produtos pesquisados
    E os resultados devem estar relacionados ao termo informado

  Cenário: Pesquisar um produto inexistente
    Dado que acesso a listagem de produtos
    Quando pesquiso por um produto inexistente
    Então deve ser exibida a seção de produtos pesquisados
    E nenhum produto deve ser apresentado no resultado