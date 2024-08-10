import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message:any = 'Internal server error';
    console.log(">>", exception, exception instanceof NotFoundException)
   // Handle NotFoundException (404 Not Found)
   if (exception instanceof NotFoundException) {
    status = HttpStatus.NOT_FOUND;
    message = exception.message || 'Resource not found';

  // Handle HTTP exceptions
  } else if (exception instanceof HttpException) {
    status = exception.getStatus();
    message = exception.getResponse();

  // Handle RPC exceptions
  } else if (exception instanceof RpcException) {
    const rpcError = exception.getError();
    status = HttpStatus.BAD_REQUEST; // Customize status code for RPC errors
    message = rpcError;
  }
   else if (exception instanceof TypeError) {
    status = HttpStatus.BAD_REQUEST;
    message = 'Type error occurred';

  // Handle custom exceptions or other known exceptions
  }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: message,
    });
  }
}
