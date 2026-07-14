import productsPage from './productsPage';

class CartPage {
    elements = {
        cartTable: () => cy.get('#cart_info_table'),
        cartRows: () => cy.get('#cart_info_table tbody tr'),
        productName: () => cy.get('.cart_description h4 a'),
        productPrice: () => cy.get('.cart_price p'),
        productQuantity: () => cy.get('.cart_quantity button'),
    };

    visit() {
        cy.visit('/view_cart');
    }

    validateCartPage() {
        cy.url().should('include', '/view_cart');
    }

    openCartPage() {
        this.visit();
        this.validateCartPage();
    }

    prepareEmptyCart() {
        cy.clearCookies();
        cy.clearLocalStorage();
    }

    validateSelectedProductIsDisplayed() {
        const selectedProduct = productsPage.getSelectedProduct();

        expect(
            selectedProduct,
            'Dados do produto selecionado',
        ).not.to.be.null;

        this.elements
            .cartTable()
            .should('be.visible');

        this.elements
            .cartRows()
            .should('have.length.greaterThan', 0);

        this.elements
            .productName()
            .should('be.visible')
            .and('have.text', selectedProduct.name);
    }

    validateSelectedProductData() {
        const selectedProduct = productsPage.getSelectedProduct();

        expect(
            selectedProduct,
            'Dados do produto selecionado',
        ).not.to.be.null;

        this.elements
            .productName()
            .should('have.text', selectedProduct.name);

        this.elements
            .productPrice()
            .should('have.text', selectedProduct.price);

        this.elements
            .productQuantity()
            .should('have.text', selectedProduct.quantity);
    }

    validateEmptyCart() {
        cy.get('body')
            .find('#cart_info_table tbody tr')
            .should('have.length', 0);
    }
}

export default new CartPage();