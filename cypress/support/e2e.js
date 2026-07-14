Cypress.Commands.add(
  'takeEvidence',
  (featureName, scenarioName) => {
    const sanitizeFileName = (value) =>
      value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9-_ ]/g, '')
        .trim()
        .replace(/\s+/g, '_')
        .toLowerCase();

    const featureFolder = sanitizeFileName(featureName);
    const scenarioFile = sanitizeFileName(scenarioName);

    cy.screenshot(
      `${featureFolder}.feature/${scenarioFile}`,
      {
        capture: 'runner',
        overwrite: true,
      },
    );
  },
);

Cypress.Screenshot.defaults({
  capture: 'runner',
  overwrite: true,
});

Cypress.on('uncaught:exception', (error) => {
  console.warn(
    'Exceção não controlada pela aplicação:',
    error.message,
  );

  return false;
});

afterEach(function () {
  const scenarioName =
    this.currentTest?.title ?? 'cenario_nao_identificado';

  const specName =
    Cypress.spec.name?.replace('.feature', '') ??
    'feature_nao_identificada';

  cy.takeEvidence(specName, scenarioName);
});