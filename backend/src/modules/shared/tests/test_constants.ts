import pytest

class TestConstants:
    def test_constants_exports_roles_and_shared_values(self):
        from backend.src.modules.shared.constants import ROLES, DEFAULT_ROLE
        assert ROLES is not None
        assert DEFAULT_ROLE is not None

    def test_constants_roles_are_strings(self):
        from backend.src.modules.shared.constants import ROLES
        assert isinstance(ROLES, (list, tuple))
        for role in ROLES:
            assert isinstance(role, str)

    def test_constants_missing_export_returns_attribute_error(self):
        with pytest.raises(AttributeError):
            from backend.src.modules.shared.constants import NON_EXISTENT