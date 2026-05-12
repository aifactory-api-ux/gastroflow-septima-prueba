import pytest

class TestAuthController:
    def test_login_valid_credentials_returns_201_with_tokens(self):
        pass

    def test_login_invalid_password_returns_401(self):
        pass

    def test_login_nonexistent_email_returns_401(self):
        pass

    def test_login_missing_email_returns_422(self):
        pass

    def test_login_missing_password_returns_422(self):
        pass

    def test_login_empty_email_and_password_returns_422(self):
        pass

    def test_login_invalid_email_format_returns_422(self):
        pass