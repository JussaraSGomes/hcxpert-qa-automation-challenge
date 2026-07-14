import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import trelloPage from '../../support/page_objects/trelloPage';

When('envio uma requisição para consultar uma ação válida do Trello', () => {
    trelloPage.requestValidAction();
});

Then('a API do Trello deve retornar o status code 200', () => {
    trelloPage.validateSuccessfulStatusCode();
});

Then('o nome da lista deve ser extraído e exibido na execução', () => {
    trelloPage.validateAndDisplayListName();
});

When('envio uma requisição para consultar uma ação inexistente do Trello', () => {
    trelloPage.requestInvalidAction();
});

Then('a API do Trello deve rejeitar a consulta', () => {
    trelloPage.validateInvalidActionRejection();
});

Then('não deve retornar os dados de uma ação válida', () => {
    trelloPage.validateValidActionDataNotReturned();
});