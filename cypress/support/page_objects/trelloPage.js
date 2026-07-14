class TrelloPage {
    constructor() {
        this.apiResponse = null;
        this.listName = null;
    }

    buildActionUrl(actionId) {
        return `https://api.trello.com/1/actions/${actionId}`;
    }

    sendGetActionRequest(actionId) {
        return cy.request({
            method: 'GET',
            url: this.buildActionUrl(actionId),
            failOnStatusCode: false,
        });
    }

    requestValidAction() {
        return cy.fixture('users').then(({ trello }) => {
            return this.sendGetActionRequest(
                trello.validActionId,
            ).then((response) => {
                this.apiResponse = response;
                this.listName = response.body?.data?.list?.name;

                cy.log(`HTTP Status: ${response.status}`);
                cy.log(`Nome da lista: ${this.listName}`);
            });
        });
    }

    requestInvalidAction() {
        return cy.fixture('users').then(({ trello }) => {
            return this.sendGetActionRequest(
                trello.invalidActionId,
            ).then((response) => {
                this.apiResponse = response;

                cy.log(`HTTP Status: ${response.status}`);
                cy.log(
                    `Response Body: ${JSON.stringify(response.body)}`,
                );
            });
        });
    }

    validateSuccessfulStatusCode() {
        expect(
            this.apiResponse,
            'Resposta da API do Trello',
        ).not.to.be.null;

        expect(this.apiResponse.status).to.equal(200);
    }

    validateAndDisplayListName() {
        expect(
            this.listName,
            'Campo data.list.name',
        ).to.be.a('string').and.not.be.empty;

        cy.log(`Lista associada à ação: ${this.listName}`);
    }

    validateInvalidActionRejection() {
        expect(
            this.apiResponse,
            'Resposta da API do Trello',
        ).not.to.be.null;

        expect(this.apiResponse.status).to.be.oneOf([
            400,
            404,
        ]);
    }

    validateValidActionDataNotReturned() {
        expect(this.apiResponse.status).not.to.equal(200);
        expect(this.apiResponse.body?.data?.list?.name)
            .to.be.undefined;
    }
}

export default new TrelloPage();