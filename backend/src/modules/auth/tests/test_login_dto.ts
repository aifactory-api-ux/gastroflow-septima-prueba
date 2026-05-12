import pytest

class TestLoginDto:
    def test_login_dto_accepts_valid_email_and_password(self):
        from backend.src.modules.auth.dto.login_dto import LoginDto
        dto = LoginDto(email='user@example.com', password='ValidPass123')
        assert dto.email == 'user@example.com'
        assert dto.password == 'ValidPass123'

    def test_login_dto_missing_email_raises_validation_error(self):
        from backend.src.modules.auth.dto.login_dto import LoginDto
        with pytest.raises(Exception):
            dto = LoginDto(password='ValidPass123')

    def test_login_dto_empty_password_raises_validation_error(self):
        from backend.src.modules.auth.dto.login_dto import LoginDto
        with pytest.raises(Exception):
            dto = LoginDto(email='user@example.com', password='')