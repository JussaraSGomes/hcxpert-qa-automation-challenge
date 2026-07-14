import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import createAccountPage from '../../support/page_objects/createAccountPage';
import loginPage from '../../support/page_objects/loginPage';
import homePage from '../../support/page_objects/homePage';

let testUser;

Given('que possuo uma conta válida cadastrada', () => {
    createAccountPage.createValidAccount();

    cy.then(() => {
        testUser = createAccountPage.getCreatedUser();

        expect(testUser, 'Usuário criado para o login').to.not.be.null;
    });
});

Given('que acesso a página de login', () => {
    loginPage.visit();
    loginPage.validateLoginPage();
});

When('informo as credenciais válidas', () => {
    loginPage.fillEmail(testUser.email);
    loginPage.fillPassword(testUser.password);
});

When('informo o e-mail cadastrado e uma senha inválida', () => {
    cy.fixture('users').then(({ invalidUser }) => {
        loginPage.fillEmail(testUser.email);
        loginPage.fillPassword(invalidUser.password);
    });
});

When('informo somente a senha', () => {
    cy.fixture('users').then(({ validUser }) => {
        loginPage.fillPassword(validUser.password);
    });
});

When('solicito a autenticação', () => {
    loginPage.clickLogin();
});

Then('devo ser autenticado com sucesso', () => {
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
});

Then('meu nome de usuário deve ser exibido no menu principal', () => {
    homePage.validateLoggedUser(testUser.name);
});

Then('devo permanecer na página de login', () => {
    cy.url().should('include', '/login');
});

Then('deve ser exibida a mensagem de credenciais inválidas', () => {
    loginPage.validateInvalidCredentialsMessage();
});

Then('o campo de e-mail deve impedir o envio do formulário', () => {
    loginPage.validateEmailRequired();
});