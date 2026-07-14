# language: pt
Funcionalidade: Busca de produtos
  Como cliente da plataforma
  Quero pesquisar produtos
  Para localizar itens de interesse

  Cenário: Buscar produto existente
    Dado que estou na página de produtos
    Quando pesquiso por um produto existente
    Então devo visualizar resultados relacionados à busca

  Cenário: Buscar produto sem correspondência
    Dado que estou na página de produtos
    Quando pesquiso por um produto inexistente
    Então nenhum produto correspondente deve ser apresentado
