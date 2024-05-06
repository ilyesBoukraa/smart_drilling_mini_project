import os 

TORTOISE_DATABASE_URL = os.getenv('TORTOISE_DATABASE_URL')

TORTOISE_ORM = {
    "connections": {
        "default": TORTOISE_DATABASE_URL,
    },
    "apps": {
        "models": {
            "models": ["models", "aerich.models"],
            "default_connection": "default",
        },
    },
}
