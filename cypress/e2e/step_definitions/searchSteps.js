import {
  Given,
  When,
  Then,
} from '@badeball/cypress-cucumber-preprocessor';

import productsPage from '../../support/page_objects/productsPage';

let searchedProduct;

Given('que acesso a listagem de produtos', () => {
  productsPage.visit();
  productsPage.validateProductsPage();
});

When('pesquiso por um produto existente', () => {
  cy.fixture('users').then(({ products }) => {
    searchedProduct = products.existingProduct;
    productsPage.searchFor(searchedProduct);
  });
});

When('pesquiso por um produto inexistente', () => {
  cy.fixture('users').then(({ products }) => {
    searchedProduct = products.nonexistentProduct;
    productsPage.searchFor(searchedProduct);
  });
});

Then('deve ser exibida a seção de produtos pesquisados', () => {
  productsPage.validateSearchedProductsSection();
});

Then('os resultados devem estar relacionados ao termo informado', () => {
  productsPage.validateResultsRelatedTo(searchedProduct);
});

Then('nenhum produto deve ser apresentado no resultado', () => {
  productsPage.validateNoProductsFound();
});