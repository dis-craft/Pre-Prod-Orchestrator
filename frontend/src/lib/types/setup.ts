export type ProjectType = 'Next.js' | 'React' | 'Node.js' | 'Python' | 'FastAPI' | 'Other';
export type RepositoryProvider = 'GitHub' | 'GitHub Enterprise';
export type DeploymentProvider = 'Vercel' | 'Other';
export type TargetEnvironment = 'Production' | 'Preview' | 'Development';

export interface SetupFormState {
  repoUrl: string;
  branch: string;
  provider: RepositoryProvider;
  projectType: ProjectType;
  deploymentProvider: DeploymentProvider;
  environment: TargetEnvironment;
  githubTokenDemo?: string;
  vercelTokenDemo?: string;
}

export interface AnalysisCheck {
  id: string;
  label: string;
  detail: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED';
}

export interface RepositoryAnalysis {
  repositoryName: string;
  branch: string;
  detectedStack: {
    framework: string;
    language: string;
    styling: string;
    packageManager: string;
  };
  existingWorkflowsCount: number;
  configurationChangesCount: number;
  checks: AnalysisCheck[];
}

export interface PlannedFile {
  id: string;
  path: string;
  action: 'CREATE' | 'UPDATE';
  purpose: string;
  language: 'yaml' | 'json' | 'markdown';
  content: string;
  originalContent?: string;
}

export interface PipelineStageConfig {
  id: string;
  name: string;
  description: string;
  status: 'READY' | 'CONFIGURED' | 'SIMULATED';
}

export interface GitHubActionsPlan {
  status: 'SIMULATED';
  workflowName: string;
  workflowPath: string;
  triggers: string[];
  stages: PipelineStageConfig[];
  yamlContent: string;
  isSimulated: boolean;
}

export interface VercelPlan {
  status: 'SIMULATED';
  projectName: string;
  environment: string;
  buildCommand: string;
  installCommand: string;
  outputDirectory: string;
  envVariables: string[];
  jsonContent: string;
  isSimulated: boolean;
}

export interface ValidationCheckItem {
  id: string;
  title: string;
  description: string;
  status: 'PENDING' | 'RUNNING' | 'PASSED' | 'FAILED';
}

export interface SetupState {
  step: number; // 0 to 6
  form: SetupFormState;
  isAnalyzing: boolean;
  analysis: RepositoryAnalysis;
  files: PlannedFile[];
  selectedFileIndex: number;
  viewMode: 'code' | 'diff';
  githubSimulated: boolean;
  vercelSimulated: boolean;
  validationChecks: ValidationCheckItem[];
  validationComplete: boolean;
}
