from fastapi import FastAPI, status, HTTPException,  Path, APIRouter
from typing import Optional
from tortoise.exceptions import BaseORMException, DBConnectionError
from ..schemas import ToDosSchema
from ..models import ToDos


# I don't need to usee the tags since
# I have only one group aka the todos group
# However I like the ui of the FastApi docs
# when I use it so why not?

router = APIRouter(prefix="/todos", tags=["Todos"])

# Get all the todos 
@router.get('/')
async def read_todos(filter_by_completed:Optional[bool]=False):
    if filter_by_completed==False:
        try:
            todos = await ToDos.all()
            # print(todos)
            all_todos = []
            for todo in todos:
                all_todos.append({"id": todo.id, "content": todo.content, "is_completed": todo.is_completed})
            return all_todos 
        except BaseORMException as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to retrieve todos: {str(e)}"
            )
    else:
        try:
            todos = await ToDos.filter(is_completed=True).all()
            return [{"id": todo.id, "content": todo.content, "is_completed": todo.is_completed} for todo in todos]
        except BaseORMException as e:
            error_message = f"An error occurred while filtering todos: {str(e)}"
            #print(error_message)
            raise HTTPException(status_code=500, detail=error_message)
        


# Get only one todo based on the ID
@router.get('/{todo_id}')
async def get_one_todo(todo_id: int = Path(..., title="The ID of the todo item to update")):
    try:
        my_todo = await ToDos.get(id=todo_id)
        return {"id": my_todo.id, "content":my_todo.content, "is_completed":my_todo.is_completed}
    except BaseORMException as e:
        raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Todo item with ID {todo_id} not found: {str(e)}"
            ) 

# :ToDosSchema

# Creat
@router.post('/', status_code=status.HTTP_201_CREATED)
async def create_todo(todo_item:ToDosSchema):
    print(todo_item)
    try:
        if not todo_item.content.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Content cannot be empty"
            )
        new_todo = await ToDos.create(content=todo_item.content, is_completed=todo_item.is_completed)
        return {"id": {new_todo.id}, "content": {new_todo.content}, "is_completed": {todo_item.is_completed}} 
    except BaseORMException as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create todo item: {str(e)}"
        )
    
    
# Update/Edit
@router.put("/{todo_id}/", status_code=status.HTTP_201_CREATED)
async def update_todo(content:str, 
                      todo_id: int = Path(..., title="The ID of the todo item to update"),
                      is_completed:Optional[bool]=False):
    try:
        my_todo = await ToDos.get(id=todo_id)
        if my_todo:
            my_todo.content = content
            my_todo.is_completed = is_completed
            await my_todo.save()
            return {"id": my_todo.id, "content":my_todo.content, "is_completed":my_todo.is_completed} 
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Todo item with ID {todo_id} not found"
            ) 
    except BaseORMException as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update todo item: {str(e)}"
        ) 
    
# Delete
@router.delete("/{todo_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(
    todo_id: int = Path(..., title="The ID of the todo item to delete")
):
    try:
        todo = await ToDos.get(id=todo_id)
        if todo:
            await todo.delete()
            return {"message": "Todo deleted successfully"}
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Todo item with ID {todo_id} not found"
            )
    except BaseORMException as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete todo item with ID {todo_id}: {str(e)}"
        )
    
