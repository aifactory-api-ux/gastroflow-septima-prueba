import pytest

class TestMediaController:
    def test_post_media_upload_valid_image_returns_url(self):
        pass

    def test_post_media_upload_missing_file_returns_400(self):
        pass

    def test_post_media_upload_invalid_file_type_returns_422(self):
        pass

    def test_post_media_upload_large_file_returns_413(self):
        pass

    def test_post_media_upload_duplicate_filename_returns_unique_url(self):
        pass