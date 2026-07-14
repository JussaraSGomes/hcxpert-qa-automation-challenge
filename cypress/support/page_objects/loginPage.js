class LoginPage {
    elements = {
        loginTitle: () => cy.contains('h2', 'Login to your account'),
        emailInput: () => cy.get('[data-qa="login-email"]'),
        passwordInput: () => cy.get('[data-qa="login-password"]'),
        loginButton: () => cy.get('[data-qa="login-button"]'),
        invalidCredentialsMessage: () =>
            cy.contains('p', 'Your email or password is incorrect!'),
    };

    visit() {
        cy.visit('/login');
    }

    validateLoginPage() {
        this.elements.loginTitle().should('be.visible');
    }

    fillEmail(email) {
        this.elements.emailInput().clear().type(email);
    }

    fillPassword(password) {
        this.elements.passwordInput().clear().type(password, {
            log: false,
        });
    }

    clickLogin() {
        this.elements.loginButton().click();
    }

    login(email, password) {
        this.fillEmail(email);
        this.fillPassword(password);
        this.clickLogin();
    }

    validateInvalidCredentialsMessage() {
        this.elements
            .invalidCredentialsMessage()
            .should('be.visible')
            .and('have.text', 'Your email or password is incorrect!');
    }

    validateEmailRequired() {
        this.elements.emailInput().then(($input) => {
            expect($input[0].checkValidity()).to.equal(false);
            expect($input[0].validationMessage).not.to.be.empty;
        });
    }
}

export default new LoginPage();