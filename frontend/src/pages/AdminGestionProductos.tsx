import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { Card } from '../components/ui/Card';
import { InputField } from '../components/ui/InputField';
import { CTAButton } from '../components/ui/CTAButton';
import { Modal } from '../components/ui/Modal';
import { tokens } from '../styles/tokens';
import { Product } from '../types/product';

export function AdminGestionProductos() {
  const { products, loading, error, createProduct, updateProduct, deleteProduct } = useProducts();
  const { categories } = useCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleCreate = async () => {
    if (!name || !price || !categoryId) return;
    try {
      await createProduct({ name, price: parseFloat(price), description, categoryId });
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleUpdate = async () => {
    if (!editingProduct || !name) return;
    try {
      await updateProduct(editingProduct.id, { name, price: parseFloat(price), description, categoryId });
      setIsModalOpen(false);
      setEditingProduct(null);
      resetForm();
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
      } catch (err) {
        // Error handled by hook
      }
    }
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setDescription('');
    setCategoryId('');
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price.toString());
    setDescription(product.description || '');
    setCategoryId(product.categoryId);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacing.lg }}>
        <h2>Products</h2>
        <CTAButton onClick={() => setIsModalOpen(true)}>Add Product</CTAButton>
      </div>

      {error && <div role="alert" style={{ color: tokens.colors.error, marginBottom: tokens.spacing.md }}>{error}</div>}
      {loading && <div role="status">Loading...</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: tokens.spacing.md }}>
        {products.map(product => (
          <Card key={product.id} title={product.name} description={product.description || undefined}>
            <p style={{ fontWeight: 'bold', color: tokens.colors.primary }}>${product.price.toFixed(2)}</p>
            <div style={{ display: 'flex', gap: tokens.spacing.sm, marginTop: tokens.spacing.sm }}>
              <CTAButton variant="secondary" onClick={() => openEditModal(product)}>Edit</CTAButton>
              <CTAButton variant="secondary" onClick={() => handleDelete(product.id)}>Delete</CTAButton>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        open={isModalOpen}
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        onClose={() => { setIsModalOpen(false); setEditingProduct(null); resetForm(); }}
        onConfirm={editingProduct ? handleUpdate : handleCreate}
        confirmLabel={editingProduct ? 'Update' : 'Create'}
      >
        <InputField label="Name" value={name} onChange={setName} placeholder="Product name" />
        <div style={{ marginTop: tokens.spacing.md }}>
          <InputField label="Price" type="number" value={price} onChange={setPrice} placeholder="0.00" />
        </div>
        <div style={{ marginTop: tokens.spacing.md }}>
          <InputField label="Description" value={description} onChange={setDescription} placeholder="Description (optional)" />
        </div>
      </Modal>
    </div>
  );
}