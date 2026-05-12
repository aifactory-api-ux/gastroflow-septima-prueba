import React, { useState } from 'react';
import { useCategories } from '../hooks/useCategories';
import { Card } from '../components/ui/Card';
import { InputField } from '../components/ui/InputField';
import { CTAButton } from '../components/ui/CTAButton';
import { Modal } from '../components/ui/Modal';
import { tokens } from '../styles/tokens';
import { Category } from '../types/category';

export function AdminGestionCategorias() {
  const { categories, loading, error, createCategory, updateCategory, deleteCategory } = useCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = async () => {
    if (!name) return;
    try {
      await createCategory({ name, description });
      setIsModalOpen(false);
      setName('');
      setDescription('');
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleUpdate = async () => {
    if (!editingCategory || !name) return;
    try {
      await updateCategory(editingCategory.id, { name, description });
      setIsModalOpen(false);
      setEditingCategory(null);
      setName('');
      setDescription('');
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
      } catch (err) {
        // Error handled by hook
      }
    }
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setName(category.name);
    setDescription(category.description || '');
    setIsModalOpen(true);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacing.lg }}>
        <h2>Categories</h2>
        <CTAButton onClick={() => setIsModalOpen(true)}>Add Category</CTAButton>
      </div>

      {error && <div role="alert" style={{ color: tokens.colors.error, marginBottom: tokens.spacing.md }}>{error}</div>}
      {loading && <div role="status">Loading...</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: tokens.spacing.md }}>
        {categories.map(category => (
          <Card key={category.id} title={category.name} description={category.description || undefined}>
            <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
              <CTAButton variant="secondary" onClick={() => openEditModal(category)}>Edit</CTAButton>
              <CTAButton variant="secondary" onClick={() => handleDelete(category.id)}>Delete</CTAButton>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        open={isModalOpen}
        title={editingCategory ? 'Edit Category' : 'Add Category'}
        onClose={() => { setIsModalOpen(false); setEditingCategory(null); setName(''); setDescription(''); }}
        onConfirm={editingCategory ? handleUpdate : handleCreate}
        confirmLabel={editingCategory ? 'Update' : 'Create'}
      >
        <InputField label="Name" value={name} onChange={setName} placeholder="Category name" />
        <div style={{ marginTop: tokens.spacing.md }}>
          <InputField label="Description" value={description} onChange={setDescription} placeholder="Description (optional)" />
        </div>
      </Modal>
    </div>
  );
}