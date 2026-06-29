import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import type {
  DashboardSummary,
  DocumentGapReport,
  OnboardingData,
  Roadmap,
  ReadinessScoreData,
  Scholarship,
  ScholarshipMatch,
  TokenResponse,
  User,
  UserDocument,
  DocumentType,
} from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const ACCESS_TOKEN_KEY = "scholarpath_access_token";
const REFRESH_TOKEN_KEY = "scholarpath_refresh_token";

export const tokenStorage = {
  getAccess: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  set: (tokens: TokenResponse) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh_token);
  },
  clear: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

export const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenStorage.getAccess();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let refreshQueue: Array<() => void> = [];

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry && tokenStorage.getRefresh()) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshQueue.push(() => resolve(api(originalRequest)));
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = tokenStorage.getRefresh();
        const { data } = await axios.post<TokenResponse>(`${API_BASE_URL}/api/auth/refresh`, {
          refresh_token: refreshToken,
        });
        tokenStorage.set(data);
        refreshQueue.forEach((cb) => cb());
        refreshQueue = [];
        return api(originalRequest);
      } catch (refreshError) {
        tokenStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// ---------- Auth ----------
export const authApi = {
  register: (data: { full_name: string; email: string; password: string }) =>
    api.post<TokenResponse>("/api/auth/register", data).then((r) => r.data),

  login: (data: { email: string; password: string }) =>
    api.post<TokenResponse>("/api/auth/login", data).then((r) => r.data),

  me: () => api.get<User>("/api/auth/me").then((r) => r.data),

  onboarding: (data: OnboardingData) => api.post<User>("/api/auth/onboarding", data).then((r) => r.data),

  updateProfile: (data: Partial<OnboardingData & { full_name: string }>) =>
    api.patch<User>("/api/auth/profile", data).then((r) => r.data),
};

// ---------- Scholarships ----------
export const scholarshipsApi = {
  list: (params?: { country?: string; funding_type?: string; degree_level?: string; search?: string }) =>
    api.get<Scholarship[]>("/api/scholarships", { params }).then((r) => r.data),

  countries: () => api.get<string[]>("/api/scholarships/countries").then((r) => r.data),

  matches: () => api.get<ScholarshipMatch[]>("/api/scholarships/matches").then((r) => r.data),

  get: (id: number) => api.get<Scholarship>(`/api/scholarships/${id}`).then((r) => r.data),

  match: (id: number) => api.get<ScholarshipMatch>(`/api/scholarships/${id}/match`).then((r) => r.data),
};

// ---------- Documents ----------
export const documentsApi = {
  list: () => api.get<UserDocument[]>("/api/documents").then((r) => r.data),

  upsert: (data: { document_type: DocumentType; is_available: boolean; file_name?: string; notes?: string }) =>
    api.put<UserDocument>("/api/documents", data).then((r) => r.data),

  remove: (documentType: DocumentType) => api.delete(`/api/documents/${documentType}`),

  gap: (scholarshipId: number) =>
    api.get<DocumentGapReport>(`/api/documents/gap/${scholarshipId}`).then((r) => r.data),
};

// ---------- Readiness ----------
export const readinessApi = {
  compute: (scholarshipId?: number) =>
    api.post<ReadinessScoreData>("/api/readiness/compute", { scholarship_id: scholarshipId ?? null }).then((r) => r.data),

  latest: (scholarshipId?: number) =>
    api
      .get<ReadinessScoreData | null>("/api/readiness/latest", { params: { scholarship_id: scholarshipId } })
      .then((r) => r.data),

  history: () => api.get<ReadinessScoreData[]>("/api/readiness/history").then((r) => r.data),
};

// ---------- Roadmaps ----------
export const roadmapsApi = {
  generate: (scholarshipId: number) =>
    api.post<Roadmap>("/api/roadmaps/generate", { scholarship_id: scholarshipId }).then((r) => r.data),

  list: () => api.get<Roadmap[]>("/api/roadmaps").then((r) => r.data),

  get: (id: number) => api.get<Roadmap>(`/api/roadmaps/${id}`).then((r) => r.data),

  updateStep: (stepId: number, isComplete: boolean) =>
    api.patch<Roadmap>(`/api/roadmaps/steps/${stepId}`, { is_complete: isComplete }).then((r) => r.data),
};

// ---------- Dashboard ----------
export const dashboardApi = {
  summary: () => api.get<DashboardSummary>("/api/dashboard/summary").then((r) => r.data),
};

// ---------- Admin ----------
export const adminApi = {
  listScholarships: () => api.get<Scholarship[]>("/api/admin/scholarships").then((r) => r.data),
  createScholarship: (data: Record<string, unknown>) =>
    api.post<Scholarship>("/api/admin/scholarships", data).then((r) => r.data),
  updateScholarship: (id: number, data: Record<string, unknown>) =>
    api.put<Scholarship>(`/api/admin/scholarships/${id}`, data).then((r) => r.data),
  deleteScholarship: (id: number) => api.delete(`/api/admin/scholarships/${id}`),
  listUsers: () => api.get<User[]>("/api/admin/users").then((r) => r.data),
  deactivateUser: (id: number) => api.patch<User>(`/api/admin/users/${id}/deactivate`).then((r) => r.data),
  activateUser: (id: number) => api.patch<User>(`/api/admin/users/${id}/activate`).then((r) => r.data),
};
