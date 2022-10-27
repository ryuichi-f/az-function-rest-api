import { CreateTodoDto } from "../dtos/CreateTodoDto";
import { UpdateTodoDto } from "../dtos/UpdateTodoDto";
import { HttpError } from "../errors/HttpError";
import { TodoItem } from "../models/TodoItem";
import { todoRepository } from "../repositories/todo-repository";
import { generateId } from "../utils/generate-id";

const getOnes = async (): Promise<TodoItem[] | any> => {
  return await todoRepository.getOnes();
};

const getOne = async (id: string): Promise<any> => {
  const existingTodo = await todoRepository.getOneById(id);
  if (!existingTodo) {
    throw new HttpError(`TodoItem(id=${id}) is not found.`, 404);
  }

  return existingTodo;
};

const createOne = async (dto: CreateTodoDto): Promise<TodoItem> => {
  const newTodo: TodoItem = {
    id: generateId(),
    ...dto,
    isCompleted: false,
  };

  return await todoRepository.createOne(newTodo);
};

const deleteOne = async (id: string) => {
  if (!id) {
    throw new HttpError("Todo item id is not provided", 400);
  }

  const existingTodo = await todoRepository.getOneById(id);
  if (!existingTodo) {
    throw new HttpError(`TodoItem(id=${id}) is not found.`, 404);
  }

  todoRepository.removeOneById(existingTodo.id);
};

const updateOne = async (dto: UpdateTodoDto, id: string) => {
  if (!id) {
    throw new HttpError("Todo item id is not provided", 400);
  }

  const existingTodo = await todoRepository.getOneById(id);

  if (!existingTodo) {
    throw new HttpError(`TodoItem(id=${id}) is not found.`, 404);
  }

  if (typeof dto.title !== "undefined") {
    existingTodo.title = dto.title;
  }

  if (typeof dto.isCompleted !== "undefined") {
    existingTodo.isCompleted = dto.isCompleted;
  }

  await todoRepository.update(existingTodo);
};

export const todoService = Object.freeze({
  getOnes,
  getOne,
  createOne,
  deleteOne,
  updateOne,
});
