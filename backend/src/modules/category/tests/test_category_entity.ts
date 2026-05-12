import pytest

class TestCategoryEntity:
    def test_category_entity_accepts_all_fields(self):
        from backend.src.modules.category.category_entity import Category
        entity = Category(
            id='uuid',
            name='Category Name',
            description='A description',
            imageUrl='https://example.com/image.png',
            order=1,
            createdAt='2024-01-01T00:00:00Z',
            updatedAt='2024-01-01T00:00:00Z'
        )
        assert entity.name == 'Category Name'

    def test_category_entity_accepts_null_description_and_image_url(self):
        from backend.src.modules.category.category_entity import Category
        entity = Category(
            id='uuid',
            name='Category Name',
            description=None,
            imageUrl=None,
            order=1,
            createdAt='2024-01-01T00:00:00Z',
            updatedAt='2024-01-01T00:00:00Z'
        )
        assert entity.description is None
        assert entity.imageUrl is None

    def test_category_entity_missing_required_field_raises_validation_error(self):
        from backend.src.modules.category.category_entity import Category
        with pytest.raises(Exception):
            entity = Category(name='Category Name')