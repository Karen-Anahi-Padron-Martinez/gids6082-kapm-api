// import { HttpException, HttpStatus } from "@nestjs/common";

// export class AppException extends HttpException{
//     contructor(
//         public readonly message: string,
//         public readonly statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
//         public readonly errorCode: string
//     ){
//         super(message,statusCode);

//     }
// }

import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
    constructor(
        message: string,
        statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
        errorCode?: string
    ) {
        super(message, statusCode);
        this.errorCode = errorCode;
    }

    public readonly errorCode?: string;
}