import { IOrchestratorAdapter } from './adapterInterface';
import { 
  Finding, 
  Remediation, 
  Validation, 
  PullRequest, 
  AuditEvent, 
  Repository, 
  DashboardMetrics 
} from '../types';
import { apiClient } from '../api/client';
import { ApiError } from '../api/errors';
import {
  mapDashboardMetrics,
  mapRepository,
  mapFinding,
  mapRemediation,
  mapValidation,
  mapPullRequest,
  mapAuditEvent
} from '../api/mappers';
import {
  ApiDashboardMetrics,
  ApiRepository,
  ApiSecurityFinding,
  ApiRemediationResult,
  ApiValidation,
  ApiPullRequest,
  ApiAuditEvent
} from '../api/types';

export class ApiAdapter implements IOrchestratorAdapter {
  private listeners: Set<() => void> = new Set();

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  public async getMetrics(): Promise<DashboardMetrics> {
    const dto = await apiClient.get<ApiDashboardMetrics>('/api/metrics');
    return mapDashboardMetrics(dto);
  }

  public async getRepositories(): Promise<Repository[]> {
    const dtos = await apiClient.get<ApiRepository[]>('/api/repositories');
    return dtos.map(mapRepository);
  }

  public async getRepositoryByName(name: string): Promise<Repository | undefined> {
    try {
      const dto = await apiClient.get<ApiRepository>(`/api/repositories/${encodeURIComponent(name)}`);
      return mapRepository(dto);
    } catch (err) {
      if (err instanceof ApiError && err.kind === 'NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }

  public async getFindings(): Promise<Finding[]> {
    const dtos = await apiClient.get<ApiSecurityFinding[]>('/api/findings');
    return dtos.map(mapFinding);
  }

  public async getFindingById(id: string): Promise<Finding | undefined> {
    try {
      const dto = await apiClient.get<ApiSecurityFinding>(`/api/findings/${encodeURIComponent(id)}`);
      return mapFinding(dto);
    } catch (err) {
      if (err instanceof ApiError && err.kind === 'NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }

  public async getRemediationByFindingId(findingId: string): Promise<Remediation | undefined> {
    try {
      const dto = await apiClient.get<ApiRemediationResult>(`/api/remediations/finding/${encodeURIComponent(findingId)}`);
      return mapRemediation(dto);
    } catch (err) {
      if (err instanceof ApiError && err.kind === 'NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }

  public async getRemediationById(id: string): Promise<Remediation | undefined> {
    try {
      const dto = await apiClient.get<ApiRemediationResult>(`/api/remediations/${encodeURIComponent(id)}`);
      return mapRemediation(dto);
    } catch (err) {
      if (err instanceof ApiError && err.kind === 'NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }

  public async getValidationByRemediationId(remediationId: string): Promise<Validation | undefined> {
    try {
      const dto = await apiClient.get<ApiValidation>(`/api/validations/remediation/${encodeURIComponent(remediationId)}`);
      return mapValidation(dto);
    } catch (err) {
      if (err instanceof ApiError && err.kind === 'NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }

  public async getValidationById(id: string): Promise<Validation | undefined> {
    try {
      const dto = await apiClient.get<ApiValidation>(`/api/validations/${encodeURIComponent(id)}`);
      return mapValidation(dto);
    } catch (err) {
      if (err instanceof ApiError && err.kind === 'NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }

  public async getPullRequests(): Promise<PullRequest[]> {
    const dtos = await apiClient.get<ApiPullRequest[]>('/api/pull-requests');
    return dtos.map(mapPullRequest);
  }

  public async getPullRequestById(id: string): Promise<PullRequest | undefined> {
    try {
      const dto = await apiClient.get<ApiPullRequest>(`/api/pull-requests/${encodeURIComponent(id)}`);
      return mapPullRequest(dto);
    } catch (err) {
      if (err instanceof ApiError && err.kind === 'NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }

  public async getAuditEvents(): Promise<AuditEvent[]> {
    const dtos = await apiClient.get<ApiAuditEvent[]>('/api/audit');
    return dtos.map(mapAuditEvent);
  }

  public async startRemediation(findingId: string): Promise<Remediation> {
    const dto = await apiClient.post<ApiRemediationResult>('/api/remediations', { findingId });
    this.notify();
    return mapRemediation(dto);
  }

  public async runValidation(
    validationId: string, 
    _onStepUpdate?: (stepId: string, status: string) => void
  ): Promise<Validation> {
    const dto = await apiClient.post<ApiValidation>(`/api/validations/${encodeURIComponent(validationId)}/run`);
    this.notify();
    return mapValidation(dto);
  }

  public async resetState(): Promise<void> {
    try {
      await apiClient.post('/api/reset');
    } catch {
      // Ignore if backend reset fails
    }
    this.notify();
  }
}

export const apiAdapter = new ApiAdapter();
