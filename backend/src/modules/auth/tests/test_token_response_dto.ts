import pytest

class TestTokenResponseDto:
    def test_token_response_dto_accepts_valid_tokens(self):
        from backend.src.modules.auth.dto.token_response_dto import TokenResponseDto
        dto = TokenResponseDto(accessToken='access.jwt.token', refreshToken='refresh.jwt.token')
        assert dto.accessToken == 'access.jwt.token'
        assert dto.refreshToken == 'refresh.jwt.token'

    def test_token_response_dto_missing_access_token_raises_validation_error(self):
        from backend.src.modules.auth.dto.token_response_dto import TokenResponseDto
        with pytest.raises(Exception):
            dto = TokenResponseDto(refreshToken='refresh.jwt.token')

    def test_token_response_dto_empty_refresh_token_raises_validation_error(self):
        from backend.src.modules.auth.dto.token_response_dto import TokenResponseDto
        with pytest.raises(Exception):
            dto = TokenResponseDto(accessToken='access.jwt.token', refreshToken='')