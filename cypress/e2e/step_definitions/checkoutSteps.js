import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import cartPage from '../../support/page_objects/cartPage';
import checkoutPage from '../../support/page_objects/checkoutPage';

Given('que possuo uma conta autenticada com um produto no carrinho', () => {
    checkoutPage.prepareAuthenticatedUserWithProductInCart();
});

Given('acesso a etapa de checkout', () => {
    cartPage.proceedToCheckout();
    checkoutPage.validateCheckoutPage();
});

When('confirmo o endereço e os dados do pedido', () => {
    checkoutPage.confirmAddressAndOrder();
});

When('informo os dados válidos de pagamento', () => {
    checkoutPage.fillValidPaymentData();
});

When('confirmo a compra', () => {
    checkoutPage.confirmPurchase();
});

Then('o pedido deve ser finalizado com sucesso', () => {
    checkoutPage.validateOrderPlacedSuccessfully();
});

When('tento confirmar a compra sem preencher os dados do cartão', () => {
    checkoutPage.attemptPaymentWithoutCardData();
});

Then('os campos obrigatórios do pagamento devem impedir a finalização', () => {
    checkoutPage.validateRequiredPaymentFields();
});