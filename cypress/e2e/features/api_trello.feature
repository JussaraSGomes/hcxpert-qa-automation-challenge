# language: pt
Funcionalidade: Validação de serviços REST
  Como profissional de qualidade
  Quero validar os serviços definidos no desafio
  Para garantir o contrato e as regras de negócio das APIs

  Cenário: Consultar ação existente no Trello
    Quando envio uma requisição GET para a ação definida do Trello
    Então o serviço deve retornar o status code esperado
    E devo registrar o campo name contido na estrutura list

  Cenário: Impedir criação de conta sem parâmetros obrigatórios
    Quando envio uma requisição POST de criação de conta sem parâmetros obrigatórios
    Então o serviço deve retornar o status code esperado
    E deve informar a regra de negócio violada no corpo da resposta
