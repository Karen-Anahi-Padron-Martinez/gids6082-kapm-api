import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Response,Request} from 'express';
import { LogsService } from '../services/logs.service';

@Injectable() 
@Catch()
export class AllExceptionFilter implements ExceptionFilter{
    constructor(private readonly logsService: LogsService) {}

    catch(exception: any, host:ArgumentsHost){
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status = exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception instanceof HttpException
        ? exception.getResponse()
        :'Internal Server Error';

        //Guardar el log en la base de datos
        const errorBody = typeof message === 'string' 
            ? { message } 
            : (message as any);

        const logEntry = {
            statusCode: status,
            path: request.url,
            timestamp: new Date().toISOString(),
            error: errorBody.message || message,
            errorCode: exception.code || 'UKNOWN_ERROR',
            stack: exception instanceof Error ? exception.stack : null,
        };
        this.logsService.createLog(logEntry).catch(err => {
            console.error('Error guardando el log en DB:', err);
        });

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path : request.url,
            error:
             typeof message == 'string'
            ?message
            : (message as any).message || message,
            errorCode: exception.code || 'UKNOWN_ERROR'
        })

    }
}

