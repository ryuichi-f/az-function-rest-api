import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { HttpError } from "../lib/errors/HttpError";
import { todoService } from "../lib/services/todo-service";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const todoId = context.bindingData.id;

  try {
    await todoService.deleteOne(todoId);
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

  context.res = {
    status: 204,
  };
};

export default httpTrigger;
