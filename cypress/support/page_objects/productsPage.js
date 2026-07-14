class ProductsPage {
    elements = {
        allProductsTitle: () => cy.contains('h2', 'All Products'),
        searchInput: () => cy.get('#search_product'),
        searchButton: () => cy.get('#submit_search'),
        searchedProductsTitle: () => cy.contains('h2', 'Searched Products'),
        productCards: () => cy.get('.features_items .product-image-wrapper'),
        productNames: () => cy.get('.features_items .productinfo p'),
        cartModal: () => cy.get('#cartModal'),
        viewCartButton: () => cy.contains('#cartModal a', 'View Cart'),
    };

    visit() {
        cy.visit('/products');
    }

    validateProductsPage() {
        this.elements
            .allProductsTitle()
            .should('be.visible');

        this.elements
            .searchInput()
            .should('be.visible');
    }

    searchFor(productName) {
        this.elements
            .searchInput()
            .should('be.visible')
            .clear()
            .type(productName);

        this.elements
            .searchButton()
            .should('be.enabled')
            .click();
    }

    validateSearchedProductsSection() {
        this.elements
            .searchedProductsTitle()
            .should('be.visible');
    }

    validateResultsRelatedTo(searchTerm) {
        this.elements
            .productCards()
            .should('have.length.greaterThan', 0);

        this.elements
            .productNames()
            .should('have.length.greaterThan', 0)
            .each(($productName) => {
                cy.wrap($productName)
                    .invoke('text')
                    .then((displayedName) => {
                        expect(displayedName.trim().toLowerCase())
                            .to.include(searchTerm.toLowerCase());
                    });
            });
    }

    validateNoProductsFound() {
        this.elements
            .productCards()
            .should('have.length', 0);
    }

    addConfiguredProductToCart() {
        cy.fixture('users').then(({ products }) => {
            this.addProductToCart(products.existingProduct);
        });
    }

    addProductToCart(productName) {
        cy.contains('.product-image-wrapper', productName)
            .should('be.visible')
            .within(() => {
                cy.get('.productinfo h2')
                    .invoke('text')
                    .then((price) => {
                        this.selectedProduct = {
                            name: productName,
                            price: price.trim(),
                            quantity: '1',
                        };
                    });

                cy.get('.productinfo .add-to-cart')
                    .should('be.visible')
                    .click();
            });

        this.elements
            .cartModal()
            .should('be.visible');
    }

    openCartFromConfirmation() {
        this.elements
            .viewCartButton()
            .should('be.visible')
            .click();

        cy.url().should('include', '/view_cart');
    }

    getSelectedProduct() {
        return this.selectedProduct;
    }

    addConfiguredProductAndOpenCart() {
        this.openProductsPage();
        this.addConfiguredProductToCart();
        this.openCartFromConfirmation();
    }

    openProductsPage() {
        this.visit();
        this.validateProductsPage();
    }
}

export default new ProductsPage();