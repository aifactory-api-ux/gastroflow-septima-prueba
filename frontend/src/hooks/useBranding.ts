import { useState, useEffect, useCallback } from 'react';
import { Branding } from '../types/branding';
import { api } from '../utils/api';

export function useBranding() {
  const [branding, setBranding] = useState<Branding | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBranding = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api<Branding>('/api/branding');
      setBranding(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch branding');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBranding = useCallback(async (data: { restaurantName?: string; logoUrl?: string; primaryColor?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await api<Branding>('/api/branding', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      setBranding(updated);
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update branding');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBranding();
  }, [fetchBranding]);

  return { branding, loading, error, updateBranding, refetch: fetchBranding };
}