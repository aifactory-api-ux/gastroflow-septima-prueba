import pytest

class TestAuthService:
    def test_validate_user_returns_user_on_correct_credentials(self):
        pass

    def test_validate_user_returns_none_on_wrong_password(self):
        pass

    def test_validate_user_returns_none_on_nonexistent_email(self):
        pass

    def test_login_issues_jwt_tokens_on_success(self):
        pass

    def test_login_fails_on_invalid_credentials(self):
        pass

    def test_password_is_hashed_on_admin_seed(self):
        pass

    def test_rbac_enforces_admin_role_on_protected_action(self):
        pass