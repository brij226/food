import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    // ✅ Skip GraphQL requests entirely
    const gqlCtx = GqlExecutionContext.create(context);
    if (gqlCtx.getType() === 'graphql') {
      return next.handle();
    }

    // ✅ REST response wrapping
    const res = context.switchToHttp().getResponse();
    const statusCode = res.statusCode || 200;

    return next.handle().pipe(
      map((data) => ({
        status: true,
        message: data?.message || 'Success',
        statusCode,
        data: data?.data || data,
      })),
    );
  }
}
