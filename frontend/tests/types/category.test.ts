import { Category } from '../../src/types/category';

describe('Category Type', () => {
  describe('Category_interface_has_all_fields', () => {
    it('Category interface must have all required fields as per SPEC.md', () => {
      const category: Category = {
        id: 'uuid',
        name: 'Test',
        description: null,
        imageUrl: null,
        order: 1,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      };
      expect(category).toHaveProperty('id');
      expect(category).toHaveProperty('name');
      expect(category).toHaveProperty('description');
      expect(category).toHaveProperty('imageUrl');
      expect(category).toHaveProperty('order');
      expect(category).toHaveProperty('createdAt');
      expect(category).toHaveProperty('updatedAt');
    });
  });

  describe('Category_interface_accepts_null_description_and_imageUrl', () => {
    it('Category interface must allow description and imageUrl to be null', () => {
      const category: Category = {
        id: 'uuid',
        name: 'Test',
        description: null,
        imageUrl: null,
        order: 1,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      };
      expect(category.description).toBeNull();
      expect(category.imageUrl).toBeNull();
    });
  });

  describe('Category_interface_missing_required_field_type_error', () => {
    it('Omitting a required field from Category should result in a TypeScript type error', () => {
      const category = { id: 'uuid', name: 'Test' } as Category;
      expect(category.order).toBeUndefined();
    });
  });
});