import { describe, it, expect } from 'vitest';
import { 
  DEFAULT_SETUP_FORM, 
  generateSetupFiles, 
  generateAnalysis, 
  generateGitHubPlan, 
  generateVercelPlan, 
  extractRepoName,
  extractProjectSlug 
} from '../lib/demo/setupTemplates';

describe('Repository Setup Templates & Generator', () => {
  it('extracts repository owner and slug accurately', () => {
    expect(extractRepoName('https://github.com/dis-craft/Pre-prod-tester')).toBe('dis-craft/Pre-prod-tester');
    expect(extractProjectSlug('dis-craft/Pre-prod-tester')).toBe('Pre-prod-tester');
    expect(extractRepoName('https://github.com/example/payments-api/')).toBe('example/payments-api');
    expect(extractProjectSlug('example/payments-api')).toBe('payments-api');
  });

  it('generates the required configuration and workflow files', () => {
    const files = generateSetupFiles(DEFAULT_SETUP_FORM);
    expect(files.length).toBe(5);

    const paths = files.map((f) => f.path);
    expect(paths).toContain('.github/workflows/preprod-security.yml');
    expect(paths).toContain('.github/workflows/preprod-remediation.yml');
    expect(paths).toContain('.preprod/config.yml');
    expect(paths).toContain('vercel.json');
    expect(paths).toContain('README.md');

    const created = files.filter((f) => f.action === 'CREATE');
    const updated = files.filter((f) => f.action === 'UPDATE');
    expect(created.length).toBe(3);
    expect(updated.length).toBe(2);
  });

  it('includes security headers and build parameters in vercel.json', () => {
    const files = generateSetupFiles(DEFAULT_SETUP_FORM);
    const vercelFile = files.find((f) => f.path === 'vercel.json');
    expect(vercelFile).toBeDefined();
    expect(vercelFile?.content).toContain('X-Content-Type-Options');
    expect(vercelFile?.content).toContain('Strict-Transport-Security');
    expect(vercelFile?.content).toContain('buildCommand');
  });

  it('generates accurate repository analysis diagnostics', () => {
    const analysis = generateAnalysis(DEFAULT_SETUP_FORM);
    expect(analysis.repositoryName).toBe('dis-craft/Pre-prod-tester');
    expect(analysis.checks.length).toBe(6);
    expect(analysis.checks.every((c) => c.status === 'COMPLETED')).toBe(true);
  });

  it('generates GitHub Actions plan with 6 stages and simulated status', () => {
    const plan = generateGitHubPlan(DEFAULT_SETUP_FORM);
    expect(plan.status).toBe('SIMULATED');
    expect(plan.workflowName).toBe('preprod-security.yml');
    expect(plan.stages.length).toBe(6);
    expect(plan.yamlContent).toContain('name: Pre-Prod Security Analysis');
  });

  it('generates Vercel deployment plan marked as simulated', () => {
    const plan = generateVercelPlan(DEFAULT_SETUP_FORM);
    expect(plan.status).toBe('SIMULATED');
    expect(plan.projectName).toBe('Pre-prod-tester');
    expect(plan.envVariables.length).toBeGreaterThanOrEqual(2);
  });
});
