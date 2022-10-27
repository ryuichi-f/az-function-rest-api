import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { HttpError } from "../lib/errors/HttpError";
import { todoService } from "../lib/services/todo-service";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const todoId = context.bindingData.id;

  try {
    if (todoId) {
      const result = await todoService.getOne(todoId);
      context.res = {
        status: 200,
        body: result,
      };

      return;
    }
  } catch (err) {
    if (err instanceof HttpError) {
      context.res = {
        status: err.StatusCode,
        body: {
          error: {
            message: err.message,
          },
        },
      };
      return;
    }
  }

  const result = await todoService.getOnes();

  context.res = {
    status: 200,
    body: result,
  };
};

export default httpTrigger;
