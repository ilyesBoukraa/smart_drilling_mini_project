# Used for Validating the inputs

from pydantic import BaseModel 
from typing import Optional

class ToDosSchema(BaseModel):
    content: str
    is_completed: Optional[bool] = False