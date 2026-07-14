class CreateAccountPage {
    constructor() {
        this.apiResponse = null;
        this.createdUser = null;
        this.duplicateAccountPayload = null;
    }

    parseResponseBody(body) {
        return typeof body === 'string' ? JSON.parse(body) : body;
    }

    generateUniqueEmail() {
        return `jussara.qa.${Date.now()}@example.com`;
    }

    buildPayload(user, email) {
        return {
            name: user.name,
            email,
            password: user.password,
            title: user.title,
            birth_date: user.birthDate,
            birth_month: user.birthMonth,
            birth_year: user.birthYear,
            firstname: user.firstName,
            lastname: user.lastName,
            company: user.company,
            address1: user.address1,
            address2: user.address2,
            country: user.country,
            zipcode: user.zipcode,
            state: user.state,
            city: user.city,
            mobile_number: user.mobileNumber,
        };
    }

    sendCreateAccountRequest(payload) {
        return cy.request({
            method: 'POST',
            url: '/api/createAccount',
            form: true,
            failOnStatusCode: false,
            body: payload,
        });
    }

    createValidAccount() {
        return cy.fixture('users').then(({ validUser }) => {
            const email = this.generateUniqueEmail();
            const payload = this.buildPayload(validUser, email);

            this.createdUser = {
                name: validUser.name,
                email,
                password: validUser.password,
            };

            this.duplicateAccountPayload = payload;

            return this.sendCreateAccountRequest(payload).then((response) => {
                this.apiResponse = response;

                Cypress.env('createdUser', this.createdUser);

                cy.log(`HTTP Status: ${response.status}`);
                cy.log(`Usuário criado: ${this.createdUser.email}`);
                cy.log(`Response Body: ${JSON.stringify(response.body)}`);
            });
        });
    }
    createPreviouslyRegisteredAccount() {
        return this.createValidAccount();
    }

    sendDuplicateAccountRequest() {
        expect(
            this.duplicateAccountPayload,
            'Payload da conta previamente cadastrada',
        ).to.not.be.null;

        return this.sendCreateAccountRequest(
            this.duplicateAccountPayload,
        ).then((response) => {
            this.apiResponse = response;

            cy.log(`HTTP Status: ${response.status}`);
            cy.log(`Response Body: ${JSON.stringify(response.body)}`);
        });
    }

    validateRequestProcessedSuccessfully() {
        expect(this.apiResponse, 'Resposta da API').to.not.be.null;
        expect(this.apiResponse.status).to.be.oneOf([200, 201]);
    }

    validateCreatedAccountBusinessCode() {
        const responseBody = this.parseResponseBody(this.apiResponse.body);

        expect(responseBody.responseCode).to.equal(201);
    }

    validateCreatedAccountMessage() {
        const responseBody = this.parseResponseBody(this.apiResponse.body);

        expect(responseBody.message).to.equal('User created!');
    }

    validateDuplicateAccountRejection() {
        const responseBody = this.parseResponseBody(this.apiResponse.body);

        expect(responseBody.responseCode).to.not.equal(201);
    }

    validateDuplicateEmailMessage() {
        const responseBody = this.parseResponseBody(this.apiResponse.body);

        expect(responseBody.message)
            .to.be.a('string')
            .and.contain('Email already exists');
    }
}

export default new CreateAccountPage();