import pytest

class TestProductEntity:
    def test_product_entity_accepts_all_fields(self):
        from backend.src.modules.product.product_entity import Product
        entity = Product(
            id='uuid',
            name='Product Name',
            description='A description',
            price=9.99,
            imageUrl='https://example.com/image.png',
            categoryId='uuid',
            available=True,
            order=1,
            createdAt='2024-01-01T00:00:00Z',
            updatedAt='2024-01-01T00:00:00Z'
        )
        assert entity.name == 'Product Name'
        assert entity.price == 9.99

    def test_product_entity_accepts_null_description_and_image_url(self):
        from backend.src.modules.product.product_entity import Product
        entity = Product(
            id='uuid',
            name='Product Name',
            description=None,
            price=9.99,
            imageUrl=None,
            categoryId='uuid',
            available=True,
            order=1,
            createdAt='2024-01-01T00:00:00Z',
            updatedAt='2024-01-01T00:00:00Z'
        )
        assert entity.description is None
        assert entity.imageUrl is None

    def test_product_entity_missing_required_field_raises_validation_error(self):
        from backend.src.modules.product.product_entity import Product
        with pytest.raises(Exception):
            entity = Product(name='Product Name')