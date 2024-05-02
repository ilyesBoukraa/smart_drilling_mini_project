from tortoise import fields
from tortoise.models import Model
from tortoise.contrib.pydantic import pydantic_model_creator

class ToDos(Model):
    '''
    args:
    content: str
    is_completed: boolean
    '''

    __tablename__ = "todos"
    id = fields.IntField(pk=True) 
    content = fields.CharField(max_length=255, null=False, unique=True)
    is_completed = fields.BooleanField(default=False)
    # new_column_to_test_aerich = fields.CharField(max_length=20)

    def __str__(self):
        return self.name


todos_pydantic = pydantic_model_creator(ToDos, name="todos")
todosIn_pydantic = pydantic_model_creator(ToDos, name="todos_in", exclude_readonly=True)
