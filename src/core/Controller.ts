import { AppError } from "@shared/errors/AppError";

abstract class Controller {
  async execute(data: ControllerRequest): Promise<ControllerResponse> {
    try {
      const response = await this.handle(data);
      return response;
    } catch (error) {
      return this.handleExecutionFailure(error);
    }
  }

  abstract handle(data: ControllerRequest): Promise<ControllerResponse>;

  protected ok(data: any): ControllerResponse {
    return {
      statusCode: 200,
      data,
    };
  }

  protected created(data: any): ControllerResponse {
    return {
      statusCode: 201,
      data,
    };
  }

  protected noContent(): ControllerResponse {
    return {
      statusCode: 204,
    };
  }

  protected serverError(error: Error): ControllerResponse {
    return {
      statusCode: 500,
      error: "Internal server error",
    };
  }

  private handleExecutionFailure(error: Error): ControllerResponse {
    console.error(error);

    if (error instanceof AppError) {
      return {
        statusCode: 400,
        error: error.message,
      };
    }

    return this.serverError(error);
  }
}

interface ControllerResponse {
  statusCode: number;
  data?: any;
  error?: string;
}

interface ControllerRequestData {
  [key: string]: any;
}

interface ControllerRequest {
  data: ControllerRequestData;
  loggedUserId?: string;
}

export { Controller, ControllerRequest, ControllerResponse };
