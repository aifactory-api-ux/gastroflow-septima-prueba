import pytest
from backend.src.modules.shared.utils import hashPassword, verifyPassword

class TestUtils:
    def test_hash_password_returns_different_value_than_plaintext(self):
        password = 'MySecret123!'
        hashed = hashPassword(password)
        assert hashed != password

    def test_verify_password_returns_true_for_correct_password(self):
        password = 'MySecret123!'
        hashed = hashPassword(password)
        result = verifyPassword(password, hashed)
        assert result is True

    def test_verify_password_returns_false_for_incorrect_password(self):
        password = 'MySecret123!'
        hashed = hashPassword(password)
        result = verifyPassword('WrongPassword', hashed)
        assert result is False

    def test_hash_password_empty_string(self):
        hashed = hashPassword('')
        assert hashed != ''
        assert isinstance(hashed, str)

    def test_verify_password_with_invalid_hash_format_raises_error(self):
        result = verifyPassword('test', 'not_a_real_hash')
        assert result is False