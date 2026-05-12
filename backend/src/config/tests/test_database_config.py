import pytest
from datetime import datetime

class TestDatabaseConfig:
    def test_database_config_valid_env_vars(self):
        import os
        os.environ['POSTGRES_HOST'] = 'localhost'
        os.environ['POSTGRES_PORT'] = '25432'
        os.environ['POSTGRES_USER'] = 'user'
        os.environ['POSTGRES_PASSWORD'] = 'pass'
        os.environ['POSTGRES_DB'] = 'db'
        os.environ['DATABASE_URL'] = 'sqlite+aiosqlite:///:memory:'

        from backend.src.config.database_config import databaseConfig
        config = databaseConfig()
        assert config is not None

    def test_database_config_missing_required_env_var(self):
        import os
        os.environ['POSTGRES_HOST'] = 'localhost'
        os.environ['POSTGRES_PORT'] = '25432'
        os.environ['POSTGRES_USER'] = 'user'
        os.environ['POSTGRES_DB'] = 'db'
        if 'POSTGRES_PASSWORD' in os.environ:
            del os.environ['POSTGRES_PASSWORD']

        from backend.src.config.database_config import databaseConfig
        with pytest.raises(Exception):
            config = databaseConfig()

    def test_database_config_invalid_port_type(self):
        import os
        os.environ['POSTGRES_HOST'] = 'localhost'
        os.environ['POSTGRES_PORT'] = 'not_a_number'
        os.environ['POSTGRES_USER'] = 'user'
        os.environ['POSTGRES_PASSWORD'] = 'pass'
        os.environ['POSTGRES_DB'] = 'db'

        from backend.src.config.database_config import databaseConfig
        with pytest.raises(Exception):
            config = databaseConfig()

    def test_database_config_accepts_custom_db_name(self):
        import os
        os.environ['POSTGRES_HOST'] = 'localhost'
        os.environ['POSTGRES_PORT'] = '25432'
        os.environ['POSTGRES_USER'] = 'user'
        os.environ['POSTGRES_PASSWORD'] = 'pass'
        os.environ['POSTGRES_DB'] = 'custom_db'

        from backend.src.config.database_config import databaseConfig
        config = databaseConfig()
        assert config is not None