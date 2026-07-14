import {
    existsSync,
    readFileSync,
} from 'node:fs';

import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');

const reportPath = resolve(
    projectRoot,
    'cypress',
    'evidencias',
    'cucumber-report.json',
);

const {
    XRAY_IMPORT_URL,
    XRAY_TOKEN,
} = process.env;

const requiredVariables = {
    XRAY_IMPORT_URL,
    XRAY_TOKEN,
};

const missingVariables = Object.entries(requiredVariables)
    .filter(([, value]) => !value)
    .map(([name]) => name);

if (missingVariables.length > 0) {
    console.error(
        `Variáveis obrigatórias ausentes: ${missingVariables.join(', ')}`,
    );

    console.error(
        'Configure as variáveis de ambiente antes de executar o upload.',
    );

    process.exit(1);
}

if (!existsSync(reportPath)) {
    console.error(
        `Relatório Cucumber não encontrado: ${reportPath}`,
    );

    console.error('Execute primeiro: npm run report');

    process.exit(1);
}

try {
    const reportContent = readFileSync(reportPath);

    const response = await fetch(XRAY_IMPORT_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${XRAY_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: reportContent,
    });

    const responseText = await response.text();

    if (!response.ok) {
        throw new Error(
            `Xray respondeu HTTP ${response.status}: ${responseText}`,
        );
    }

    console.log('Relatório enviado ao Xray com sucesso.');
    console.log(responseText);
} catch (error) {
    console.error(
        `Falha no upload para o Xray: ${error.message}`,
    );

    process.exit(1);
}