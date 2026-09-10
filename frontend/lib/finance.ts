export interface FinanceSummary {
  donations: number;
  expenses: number;
}

export const financeStorageKey = 'festival_finance_summary';
const financeEventName = 'festival-finance-updated';
export const defaultFinanceSummary: FinanceSummary = {
  donations: 20000,
  expenses: 10000,
};

export function readFinanceSummary(): FinanceSummary {
  if (typeof window === 'undefined') return defaultFinanceSummary;

  try {
    const stored = JSON.parse(localStorage.getItem(financeStorageKey) || 'null');
    if (
      stored &&
      Number.isFinite(stored.donations) &&
      Number.isFinite(stored.expenses) &&
      stored.donations >= 0 &&
      stored.expenses >= 0
    ) {
      return stored;
    }
  } catch {
    // Use defaults when stored data is invalid.
  }

  return defaultFinanceSummary;
}

export function financeSnapshot(): string {
  return JSON.stringify(readFinanceSummary());
}

export function saveFinanceSummary(summary: FinanceSummary): void {
  localStorage.setItem(financeStorageKey, JSON.stringify(summary));
  window.dispatchEvent(new Event(financeEventName));
}

export function subscribeToFinance(onChange: () => void): () => void {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === financeStorageKey) onChange();
  };
  const handleSameTabUpdate = () => onChange();

  window.addEventListener('storage', handleStorage);
  window.addEventListener(financeEventName, handleSameTabUpdate);
  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(financeEventName, handleSameTabUpdate);
  };
}
