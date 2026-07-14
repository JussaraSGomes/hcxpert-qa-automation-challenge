import createAccountPage from './createAccountPage';
import loginPage from './loginPage';
import productsPage from './productsPage';

class CheckoutPage {
    elements = {
        addressDetailsTitle: () => cy.contains('h2', 'Address Details'),
        reviewOrderTitle: () => cy.contains('h2', 'Review Your Order'),
        orderProductRows: () => cy.get('#cart_info tbody tr[id^="product-"]'),
        orderComment: () => cy.get('textarea[name="message"]'),
        placeOrderButton: () => cy.contains('a', 'Place Order'),
        paymentTitle: () => cy.contains('h2', 'Payment'),
        nameOnCardInput: () => cy.get('[data-qa="name-on-card"]'),
        cardNumberInput: () => cy.get('[data-qa="card-number"]'),
        cvcInput: () => cy.get('[data-qa="cvc"]'),
        expiryMonthInput: () => cy.get('[data-qa="expiry-month"]'),
        expiryYearInput: () => cy.get('[data-qa="expiry-year"]'),
        payButton: () => cy.get('[data-qa="pay-button"]'),
        orderPlacedTitle: () => cy.get('[data-qa="order-placed"]'),
    };

    validateCheckoutPage() {
        cy.url().should('include', '/checkout');

        this.elements
            .addressDetailsTitle()
            .should('be.visible');

        this.elements
            .reviewOrderTitle()
            .should('be.visible');

        this.elements
            .orderProductRows()
            .should('have.length.greaterThan', 0)
            .and('be.visible');
    }

    confirmAddressAndOrder() {
        cy.fixture('users').then(({ payment }) => {
            this.elements
                .orderComment()
                .should('be.visible')
                .clear()
                .type(payment.orderComment);
        });

        this.elements
            .placeOrderButton()
            .should('be.visible')
            .click();

        this.elements
            .paymentTitle()
            .should('be.visible');
    }

    fillValidPaymentData() {
        cy.fixture('users').then(({ payment }) => {
            this.elements
                .nameOnCardInput()
                .clear()
                .type(payment.nameOnCard);

            this.elements
                .cardNumberInput()
                .clear()
                .type(payment.cardNumber);

            this.elements
                .cvcInput()
                .clear()
                .type(payment.cvc);

            this.elements
                .expiryMonthInput()
                .clear()
                .type(payment.expiryMonth);

            this.elements
                .expiryYearInput()
                .clear()
                .type(payment.expiryYear);
        });
    }

    confirmPurchase() {
        this.elements
            .payButton()
            .should('be.visible')
            .and('be.enabled')
            .click();
    }

    validateOrderPlacedSuccessfully() {
        this.elements
            .orderPlacedTitle()
            .should('be.visible')
            .and('contain.text', 'Order Placed!');
    }

    attemptPaymentWithoutCardData() {
        this.elements
            .payButton()
            .should('be.visible')
            .click();
    }

    validateRequiredPaymentFields() {
        this.validateRequiredField(
            this.elements.nameOnCardInput(),
        );

        this.validateRequiredField(
            this.elements.cardNumberInput(),
        );

        this.validateRequiredField(
            this.elements.cvcInput(),
        );

        this.validateRequiredField(
            this.elements.expiryMonthInput(),
        );

        this.validateRequiredField(
            this.elements.expiryYearInput(),
        );

        cy.url().should('include', '/payment');
    }

    validateRequiredField(input) {
        input.then(($input) => {
            expect(
                $input[0].checkValidity(),
                `Validade do campo ${$input.attr('name')}`,
            ).to.equal(false);
        });
    }
    prepareAuthenticatedUserWithProductInCart() {
        createAccountPage.createValidAccount();

        cy.then(() => {
            const createdUser = createAccountPage.getCreatedUser();

            expect(
                createdUser,
                'Usuário criado para o checkout',
            ).not.to.be.null;

            loginPage.visit();
            loginPage.validateLoginPage();

            loginPage.login(
                createdUser.email,
                createdUser.password,
            );

            loginPage.validateSuccessfulLogin();

            productsPage.addConfiguredProductAndOpenCart();
        });
    }
}

export default new CheckoutPage();