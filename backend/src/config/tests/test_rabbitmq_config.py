import pytest
import os

class TestRabbitMQConfig:
    def test_rabbitmq_config_valid_env_vars(self):
        os.environ['RABBITMQ_HOST'] = 'localhost'
        os.environ['RABBITMQ_PORT'] = '25672'
        os.environ['RABBITMQ_USER'] = 'user'
        os.environ['RABBITMQ_PASSWORD'] = 'pass'

        from backend.src.config.rabbitmq_config import rabbitmqConfig
        config = rabbitmqConfig()
        assert config is not None

    def test_rabbitmq_config_missing_user_env_var(self):
        os.environ['RABBITMQ_HOST'] = 'localhost'
        os.environ['RABBITMQ_PORT'] = '25672'
        if 'RABBITMQ_USER' in os.environ:
            del os.environ['RABBITMQ_USER']
        os.environ['RABBITMQ_PASSWORD'] = 'pass'

        from backend.src.config.rabbitmq_config import rabbitmqConfig
        with pytest.raises(Exception):
            config = rabbitmqConfig()

    def test_rabbitmq_config_invalid_port_type(self):
        os.environ['RABBITMQ_HOST'] = 'localhost'
        os.environ['RABBITMQ_PORT'] = 'not_a_number'
        os.environ['RABBITMQ_USER'] = 'user'
        os.environ['RABBITMQ_PASSWORD'] = 'pass'

        from backend.src.config.rabbitmq_config import rabbitmqConfig
        with pytest.raises(Exception):
            config = rabbitmqConfig()

    def test_rabbitmq_config_accepts_default_port(self):
        os.environ['RABBITMQ_HOST'] = 'localhost'
        os.environ['RABBITMQ_USER'] = 'user'
        os.environ['RABBITMQ_PASSWORD'] = 'pass'
        if 'RABBITMQ_PORT' in os.environ:
            del os.environ['RABBITMQ_PORT']

        from backend.src.config.rabbitmq_config import rabbitmqConfig
        config = rabbitmqConfig()
        assert config is not None