import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types/product';
import { api } from '../utils/api';

export function useProducts(categoryId?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = categoryId ? { categoryId } : undefined;
      const data = await api<Product[]>('/api/products', { params });
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  const createProduct = useCallback(async (data: { name: string; description?: string; price: number; imageUrl?: string; categoryId: string; available?: boolean; order?: number }) => {
    setLoading(true);
    setError(null);
    try {
      const newProduct = await api<Product>('/api/products', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create product');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProduct = useCallback(async (id: string, data: { name?: string; description?: string; price?: number; imageUrl?: string; categoryId?: string; available?: boolean; order?: number }) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await api<Product>(`/api/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      setProducts(prev => prev.map(p => p.id === id ? updated : p));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update product');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await api(`/api/products/${id}`, { method: 'DELETE' });
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, createProduct, updateProduct, deleteProduct, refetch: fetchProducts };
}