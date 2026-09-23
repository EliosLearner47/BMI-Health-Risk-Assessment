import { AssessmentRecord } from '../types';

const STORAGE_KEY = 'bmi_assessment_history';

/**
 * Generate a unique ID — uses crypto.randomUUID() when in a secure context
 * (HTTPS / localhost) and falls back to a Math.random-based UUID v4 otherwise.
 */
export function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback: RFC 4122 UUID v4
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}


function isStorageAvailable(): boolean {
  try {
    const test = '__ls_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

export function getHistory(): AssessmentRecord[] {
  if (!isStorageAvailable()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveRecord(record: AssessmentRecord): void {
  if (!isStorageAvailable()) return;
  try {
    const history = getHistory();
    // Prepend newest record; keep max 50
    history.unshift(record);
    if (history.length > 50) history.splice(50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // localStorage quota exceeded or unavailable — fail silently
  }
}

export function deleteRecord(id: string): void {
  if (!isStorageAvailable()) return;
  try {
    const history = getHistory().filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // fail silently
  }
}

export function clearHistory(): void {
  if (!isStorageAvailable()) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // fail silently
  }
}

export function getTheme(): 'light' | 'dark' {
  if (!isStorageAvailable()) return 'light';
  try {
    const t = localStorage.getItem('bmi_theme');
    return t === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function saveTheme(theme: 'light' | 'dark'): void {
  if (!isStorageAvailable()) return;
  try {
    localStorage.setItem('bmi_theme', theme);
  } catch {
    // fail silently
  }
}
