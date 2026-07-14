# language: pt
Funcionalidade: Finalização de compra
  Como cliente autenticado
  Quero concluir meu pedido
  Para finalizar a compra

  Cenário: Concluir checkout com dados obrigatórios válidos
    Dado que possuo um produto no carrinho e estou autenticado
    Quando preencho os dados obrigatórios de pagamento
    Então o pedido deve ser concluído com sucesso

  Cenário: Impedir checkout sem dados obrigatórios do cartão
    Dado que possuo um produto no carrinho e estou autenticado
    Quando tento finalizar o pagamento sem preencher dados obrigatórios
    Então a finalização deve ser impedida
