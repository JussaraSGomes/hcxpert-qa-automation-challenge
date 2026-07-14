# language: pt

Funcionalidade: Adicionar produto ao carrinho
  Como cliente da plataforma
  Quero adicionar um produto ao carrinho
  Para revisar os dados antes de realizar a compra

  Cenário: Adicionar produto ao carrinho a partir da listagem
    Dado que acesso a listagem de produtos
    Quando adiciono um produto disponível ao carrinho
    E acesso o carrinho pela confirmação de inclusão
    Então o produto selecionado deve ser apresentado no carrinho
    E o nome, o preço e a quantidade devem estar corretos

  Cenário: Acessar o carrinho sem adicionar produtos
    Dado que nenhum produto foi adicionado ao carrinho
    Quando acesso diretamente a página do carrinho
    Então o carrinho não deve apresentar produtos