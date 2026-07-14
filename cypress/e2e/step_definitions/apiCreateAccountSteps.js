import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import createAccountPage from '../../support/page_objects/createAccountPage';

When('envio uma requisição para criar uma conta com dados válidos', () => {
    createAccountPage.createValidAccount();
  });

Then('a API deve processar a requisição com sucesso', () => {
  createAccountPage.validateRequestProcessedSuccessfully();
});

Then('o código de negócio retornado deve ser 201', () => {
  createAccountPage.validateCreatedAccountBusinessCode();
});

Then('a mensagem deve informar que o usuário foi criado', () => {
  createAccountPage.validateCreatedAccountMessage();
});

Given('que existe uma conta previamente cadastrada', () => {
  createAccountPage.createPreviouslyRegisteredAccount();
});

When('envio uma nova requisição com o mesmo e-mail', () => {
  createAccountPage.sendDuplicateAccountRequest();
});

Then('a API deve rejeitar a criação da conta duplicada', () => {
  createAccountPage.validateDuplicateAccountRejection();
});

Then('deve informar que o e-mail já está cadastrado', () => {
  createAccountPage.validateDuplicateEmailMessage();
});