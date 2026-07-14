# language: pt
Funcionalidade: Adicionar produto ao carrinho
  Como cliente da plataforma
  Quero adicionar um produto ao carrinho
  Para comprá-lo posteriormente

  Cenário: Adicionar produto ao carrinho a partir da listagem
    Dado que estou visualizando a listagem de produtos
    Quando adiciono um produto ao carrinho
    Então o carrinho deve apresentar nome, preço e quantidade corretos

  Cenário: Validar persistência do produto no carrinho
    Dado que adicionei um produto ao carrinho
    Quando acesso a página do carrinho
    Então os dados do produto devem permanecer disponíveis
