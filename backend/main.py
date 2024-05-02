from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware
# from tortoise.exceptions import DBConnectionError
from .database import init_db
from .routers import todos
import asyncio

app = FastAPI()

origins = ["http://localhost",  "http://localhost:3030"]

app.add_middleware(CORSMiddleware,
                   allow_origins=origins,
                    allow_methods=["GET", "POST", "PUT", "DELETE"],
                    allow_headers=["*"],
                    allow_credentials=True)


#try:
#    init_db(app)
#    print("Connected to the database!")
#except DBConnectionError as e:
#    print(f"Failed to connect to the database: {e}")

async def initialize_db():
    try:
        await init_db(app)
    except Exception as e:
        print(f"An error occurred during database initialization: {e}")

asyncio.create_task(initialize_db())




app.include_router(todos.router)

@app.get("/")
def root():
    return {"message": "Hello World"}

