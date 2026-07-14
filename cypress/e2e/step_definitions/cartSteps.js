import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import productsPage from '../../support/page_objects/productsPage';
import cartPage from '../../support/page_objects/cartPage';

When('adiciono um produto disponível ao carrinho', () => {
    productsPage.addConfiguredProductToCart();
});

When('acesso o carrinho pela confirmação de inclusão', () => {
    productsPage.openCartFromConfirmation();
});

Then('o produto selecionado deve ser apresentado no carrinho', () => {
    cartPage.validateSelectedProductIsDisplayed();
});

Then('o nome, o preço e a quantidade devem estar corretos', () => {
    cartPage.validateSelectedProductData();
});

Given('que nenhum produto foi adicionado ao carrinho', () => {
    cartPage.prepareEmptyCart();
});

When('acesso diretamente a página do carrinho', () => {
    cartPage.openCartPage();
});

Then('o carrinho não deve apresentar produtos', () => {
    cartPage.validateEmptyCart();
});