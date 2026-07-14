import { existsSync, mkdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');

const evidenceDirectory = resolve(
    projectRoot,
    'cypress',
    'evidencias',
);

const htmlReport = resolve(
    evidenceDirectory,
    'cucumber-report.html',
);

const jsonReport = resolve(
    evidenceDirectory,
    'cucumber-report.json',
);

const validateReport = (filePath, reportName) => {

    if (!existsSync(filePath)) {
        throw new Error(
            `${reportName} não encontrado. Execute primeiro: npm run test`
        );
    }

    if (statSync(filePath).size === 0) {
        throw new Error(
            `${reportName} foi gerado vazio.`
        );
    }

    console.log(`✔ ${reportName} encontrado.`);
};

try {

    mkdirSync(evidenceDirectory, {
        recursive: true,
    });

    validateReport(
        htmlReport,
        'Relatório HTML'
    );

    validateReport(
        jsonReport,
        'Relatório JSON'
    );

    console.log('\nRelatórios validados com sucesso.');

} catch (error) {

    console.error(`\n${error.message}`);

    process.exit(1);

}