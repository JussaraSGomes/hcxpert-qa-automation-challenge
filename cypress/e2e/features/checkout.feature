# language: pt

Funcionalidade: Finalização de compra
  Como cliente autenticado da plataforma
  Quero finalizar a compra dos produtos adicionados ao carrinho
  Para concluir meu pedido com segurança

  Cenário: Finalizar uma compra preenchendo os dados obrigatórios
    Dado que possuo uma conta autenticada com um produto no carrinho
    E acesso a etapa de checkout
    Quando confirmo o endereço e os dados do pedido
    E informo os dados válidos de pagamento
    E confirmo a compra
    Então o pedido deve ser finalizado com sucesso

  Cenário: Não finalizar uma compra sem preencher os dados obrigatórios do cartão
    Dado que possuo uma conta autenticada com um produto no carrinho
    E acesso a etapa de checkout
    Quando confirmo o endereço e os dados do pedido
    E tento confirmar a compra sem preencher os dados do cartão
    Então os campos obrigatórios do pagamento devem impedir a finalização