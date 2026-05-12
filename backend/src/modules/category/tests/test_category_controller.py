import pytest

class TestCategoryController:
    def test_get_categories_returns_all_categories_ordered(self):
        pass

    def test_post_category_valid_payload_creates_category(self):
        pass

    def test_post_category_missing_name_returns_422(self):
        pass

    def test_post_category_invalid_order_type_returns_422(self):
        pass

    def test_post_category_duplicate_name_returns_400(self):
        pass

    def test_get_categories_empty_returns_empty_list(self):
        pass