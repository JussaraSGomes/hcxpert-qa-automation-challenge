import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');

const reportPath = resolve(
    projectRoot,
    'cypress',
    'evidencias',
    'cucumber-report.json',
);

const templatesDirectory = resolve(
    projectRoot,
    'scripts',
    'templates',
);

const apiDefinitions = [
    {
        featureIdentifier: 'Trello',
        title: 'Evidência de API — GET Trello',
        template: 'api-evidence-01.html',
        outputDirectory: 'api_trello.feature',
        outputFile: 'api-trello-evidence.html',
    },
    {
        featureIdentifier: 'Criação de conta',
        title: 'Evidência de API — POST Create Account',
        template: 'api-evidence-02.html',
        outputDirectory: 'api_create_account.feature',
        outputFile: 'api-create-account-evidence.html',
    },
];

const escapeHtml = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const normalizeReport = (report) => {
    if (Array.isArray(report)) {
        return report;
    }

    if (Array.isArray(report.features)) {
        return report.features;
    }

    throw new Error(
        'Formato do relatório Cucumber não reconhecido.',
    );
};

const getScenarioStatus = (scenario) => {
    const steps = scenario.steps ?? [];

    const statuses = steps
        .map((step) => step.result?.status)
        .filter(Boolean);

    return statuses.every((status) => status === 'passed')
        ? 'PASSED'
        : 'FAILED';
};

const createScenarioSummary = (feature) => {
    const scenarios = (feature.elements ?? [])
        .filter((element) =>
            ['scenario', 'scenario_outline'].includes(
                element.type,
            ),
        );

    const result = scenarios.map((scenario) => ({
        scenario: scenario.name,
        status: getScenarioStatus(scenario),
    }));

    return {
        count: result.length,
        result,
    };
};

const renderTemplate = (template, values) => {
    return Object.entries(values).reduce(
        (rendered, [key, value]) =>
            rendered.replaceAll(`{{${key}}}`, escapeHtml(value)),
        template,
    );
};

if (!existsSync(reportPath)) {
    console.error(
        'Relatório JSON não encontrado. Execute primeiro: npm run report',
    );

    process.exit(1);
}

try {
    const rawReport = readFileSync(reportPath, 'utf8');
    const report = normalizeReport(JSON.parse(rawReport));

    for (const api of apiDefinitions) {
        const feature = report.find((item) =>
            item.name
                ?.toLowerCase()
                .includes(api.featureIdentifier.toLowerCase()),
        );

        if (!feature) {
            throw new Error(
                `Feature de API não encontrada: ${api.featureIdentifier}`,
            );
        }

        const templatePath = resolve(
            templatesDirectory,
            api.template,
        );

        if (!existsSync(templatePath)) {
            throw new Error(
                `Template não encontrado: ${templatePath}`,
            );
        }

        const summary = createScenarioSummary(feature);
        const allPassed = summary.result.every(
            ({ status }) => status === 'PASSED',
        );

        const outputDirectory = resolve(
            projectRoot,
            'cypress',
            'evidencias',
            api.outputDirectory,
        );

        mkdirSync(outputDirectory, {
            recursive: true,
        });

        const template = readFileSync(templatePath, 'utf8');

        const html = renderTemplate(template, {
            TITLE: api.title,
            STATUS: allPassed ? 'APROVADO' : 'REPROVADO',
            FEATURE: feature.name,
            SCENARIO_COUNT: summary.count,
            RESULT: JSON.stringify(
                summary.result,
                null,
                2,
            ),
            GENERATED_AT: new Date().toLocaleString('pt-BR'),
        });

        const outputPath = resolve(
            outputDirectory,
            api.outputFile,
        );

        writeFileSync(outputPath, html, 'utf8');

        console.log(`Evidência criada: ${outputPath}`);
    }

    console.log('\nEvidências das APIs geradas com sucesso.');
} catch (error) {
    console.error(
        `Falha ao gerar evidências das APIs: ${error.message}`,
    );

    process.exit(1);
}