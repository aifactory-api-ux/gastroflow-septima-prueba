import pytest

class TestBrandingEntity:
    def test_branding_entity_accepts_all_fields(self):
        from backend.src.modules.branding.branding_entity import Branding
        entity = Branding(
            id='uuid',
            restaurantName='Test Restaurant',
            logoUrl='https://example.com/logo.png',
            primaryColor='#E67E22',
            createdAt='2024-01-01T00:00:00Z',
            updatedAt='2024-01-01T00:00:00Z'
        )
        assert entity.restaurantName == 'Test Restaurant'

    def test_branding_entity_accepts_null_logo_url(self):
        from backend.src.modules.branding.branding_entity import Branding
        entity = Branding(
            id='uuid',
            restaurantName='Test Restaurant',
            logoUrl=None,
            primaryColor='#E67E22',
            createdAt='2024-01-01T00:00:00Z',
            updatedAt='2024-01-01T00:00:00Z'
        )
        assert entity.logoUrl is None

    def test_branding_entity_missing_required_field_raises_validation_error(self):
        from backend.src.modules.branding.branding_entity import Branding
        with pytest.raises(Exception):
            entity = Branding(restaurantName='Test Restaurant')