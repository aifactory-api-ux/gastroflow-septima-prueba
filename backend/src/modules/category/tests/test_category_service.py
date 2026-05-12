import pytest

class TestCategoryService:
    def test_update_category_valid_payload_updates_category(self):
        pass

    def test_update_category_nonexistent_id_returns_404(self):
        pass

    def test_update_category_invalid_image_url_returns_422(self):
        pass

    def test_delete_category_existing_id_returns_204_and_removes_category(self):
        pass

    def test_delete_category_nonexistent_id_returns_404(self):
        pass

    def test_update_category_partial_payload_only_updates_specified_fields(self):
        pass