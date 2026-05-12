import pytest

class TestTypes:
    def test_login_dto_type_accepts_valid_fields(self):
        from backend.src.modules.shared.types import LoginDto
        dto = LoginDto(email='user@example.com', password='Password123')
        assert dto.email == 'user@example.com'

    def test_login_dto_type_missing_email_field(self):
        from backend.src.modules.shared.types import LoginDto
        with pytest.raises(Exception):
            dto = LoginDto(password='Password123')

    def test_category_type_accepts_null_description_and_image_url(self):
        from backend.src.modules.shared.types import Category
        category = Category(
            id='uuid-123',
            name='Beverages',
            description=None,
            imageUrl=None,
            order=1,
            createdAt='2024-01-01T00:00:00Z',
            updatedAt='2024-01-01T00:00:00Z'
        )
        assert category.description is None

    def test_product_type_missing_required_field(self):
        from backend.src.modules.shared.types import Product
        with pytest.raises(Exception):
            product = Product(
                id='uuid-123',
                description='desc',
                price=10.5,
                imageUrl=None,
                categoryId='uuid-cat',
                available=True,
                order=1,
                createdAt='2024-01-01T00:00:00Z',
                updatedAt='2024-01-01T00:00:00Z'
            )

    def test_branding_type_primary_color_hex_format(self):
        from backend.src.modules.shared.types import Branding
        branding = Branding(
            id='uuid-123',
            restaurantName='Testaurant',
            logoUrl=None,
            primaryColor='#E67E22',
            createdAt='2024-01-01T00:00:00Z',
            updatedAt='2024-01-01T00:00:00Z'
        )
        assert branding.primaryColor == '#E67E22'