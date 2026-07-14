# language: pt

Funcionalidade: Consulta de ação do Trello pela API
  Como responsável pela qualidade da integração
  Quero consultar ações do Trello
  Para validar o retorno e os dados da lista associada

  Cenário: Consultar uma ação existente
    Quando envio uma requisição para consultar uma ação válida do Trello
    Então a API do Trello deve retornar o status code 200
    E o nome da lista deve ser extraído e exibido na execução

  Cenário: Consultar uma ação inexistente
    Quando envio uma requisição para consultar uma ação inexistente do Trello
    Então a API do Trello deve rejeitar a consulta
    E não deve retornar os dados de uma ação válida