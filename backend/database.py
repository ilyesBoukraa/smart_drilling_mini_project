import os
from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise
from tortoise import Tortoise
from .config import TORTOISE_ORM

from tortoise.exceptions import DBConnectionError

# env variable so when I upload it on github
# no one will have access to my password 
# $env:TORTOISE_DATABASE_URL = 'mysql://<user>:<password>@<address>/<database>'

TORTOISE_DATABASE_URL = os.getenv('TORTOISE_DATABASE_URL')
#print("TORTOISE_ORM:", TORTOISE_ORM)
# print("TORTOISE_DATABASE_URL",TORTOISE_DATABASE_URL)
# print("TORTOISE_ORM",TORTOISE_ORM)


async def init_db(app: FastAPI):
    try:
        await Tortoise.init(
            config=TORTOISE_ORM,
            #db_url=TORTOISE_DATABASE_URL,
            modules={'models': ['backend.models']}
        )
        await Tortoise.generate_schemas()
        print("Connected to the database!")
    except DBConnectionError as e:
        print(f"Failed to connect to the database: {e}")
        raise






''' 
async def init_db(app: FastAPI):
    try:
        await Tortoise.init(
            config=TORTOISE_ORM,
            #db_url=TORTOISE_DATABASE_URL,
            #modules={'models': ['backend.models']}
        )
        await Tortoise.generate_schemas()
        print("Connected to the database!")
    except DBConnectionError as e:
        print(f"Failed to connect to the database: {e}")
        raise

        
async def init_db(app:FastAPI):
    try:
        await register_tortoise(
        app,
        config=TORTOISE_ORM,
        generate_schemas=True,
        add_exception_handlers=True)
        print("Connected to the database!")
    except DBConnectionError as e:
        print(f"Failed to connect to the database: {e}")
        raise





async def init_db(app: FastAPI):
    try:
        await Tortoise.init(
            db_url=TORTOISE_DATABASE_URL,
            modules={'models': ['backend.models']}
        )
        await Tortoise.generate_schemas()
        print("Connected to the database!")
    except DBConnectionError as e:
        print(f"Failed to connect to the database: {e}")
        raise


def init_db(app:FastAPI):
    register_tortoise(
        app,
        config=TORTOISE_ORM,
        #db_url=TORTOISE_DATABASE_URL,
        #modules={"models":["backend.models", "aerich.models"]},
        generate_schemas=True,
        add_exception_handlers=True
        )






def init_db(app:FastAPI):
    register_tortoise(
        app,
        db_url=TORTOISE_DATABASE_URL,
        modules={"models":["backend.models"]},
        generate_schemas=True,
        add_exception_handlers=True
        )


async def init_db():
    await Tortoise.init(
        db_url=TORTOISE_DATABASE_URL,
        modules={'models': ['backend.models']}
    )
    await Tortoise.generate_schemas()

async def close_db():
    await Tortoise.close_connections()


        
        

async def init_db
    await Tortoise.init(
        db_url=TORTOISE_DATABASE_URL,
        modules={'models': ['backend.models']}
    )
    await Tortoise.generate_schemas()

async def close_db():
    await Tortoise.close_connections()
'''
    