Cypress.on('uncaught:exception', (error) => {
  console.warn(
    'Exceção não controlada pela aplicação:',
    error.message,
  );

  return false;
});