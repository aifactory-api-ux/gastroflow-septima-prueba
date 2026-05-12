import { useState, useEffect, useCallback } from 'react';
import { Category } from '../types/category';
import { api } from '../utils/api';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api<Category[]>('/api/categories');
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  }, []);

  const createCategory = useCallback(async (data: { name: string; description?: string; imageUrl?: string; order?: number }) => {
    setLoading(true);
    setError(null);
    try {
      const newCategory = await api<Category>('/api/categories', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create category');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCategory = useCallback(async (id: string, data: { name?: string; description?: string; imageUrl?: string; order?: number }) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await api<Category>(`/api/categories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      setCategories(prev => prev.map(c => c.id === id ? updated : c));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update category');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCategory = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await api(`/api/categories/${id}`, { method: 'DELETE' });
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete category');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error, createCategory, updateCategory, deleteCategory, refetch: fetchCategories };
}