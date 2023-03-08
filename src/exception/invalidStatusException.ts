import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidStatusException extends HttpException {
  constructor(alertMessage: string, title: string | undefined = undefined) {
    super(
      {
        message: {
          code: 'INVALID_STATUS',
          alert: alertMessage,
          title: title,
        },
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
