import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { todoService } from "../lib/services/todo-service";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const todoCreateDto = req.body;
  const result = await todoService.createOne(todoCreateDto);

  context.res = {
    status: 201,
    body: result,
  };
};

export default httpTrigger;
