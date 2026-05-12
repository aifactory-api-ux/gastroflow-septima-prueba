import pytest
import os

class TestRedisConfig:
    def test_redis_config_valid_env_vars(self):
        os.environ['REDIS_HOST'] = 'localhost'
        os.environ['REDIS_PORT'] = '26379'

        from backend.src.config.redis_config import redisConfig
        config = redisConfig()
        assert config is not None

    def test_redis_config_missing_host_env_var(self):
        if 'REDIS_HOST' in os.environ:
            del os.environ['REDIS_HOST']
        os.environ['REDIS_PORT'] = '26379'

        from backend.src.config.redis_config import redisConfig
        with pytest.raises(Exception):
            config = redisConfig()

    def test_redis_config_invalid_port_type(self):
        os.environ['REDIS_HOST'] = 'localhost'
        os.environ['REDIS_PORT'] = 'not_a_number'

        from backend.src.config.redis_config import redisConfig
        with pytest.raises(Exception):
            config = redisConfig()

    def test_redis_config_accepts_default_port(self):
        os.environ['REDIS_HOST'] = 'localhost'
        if 'REDIS_PORT' in os.environ:
            del os.environ['REDIS_PORT']

        from backend.src.config.redis_config import redisConfig
        config = redisConfig()
        assert config is not None