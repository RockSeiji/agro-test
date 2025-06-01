import { LoggerInterceptor } from './logger.interceptor';
import { CallHandler, ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';

describe('LoggerInterceptor', () => {
  let interceptor: LoggerInterceptor;
  let mockLogger: any;

  beforeEach(() => {
    mockLogger = { log: jest.fn() };
    interceptor = new LoggerInterceptor();
    interceptor.logger = mockLogger;
  });

  it('deve ser definido', () => {
    expect(interceptor).toBeDefined();
  });

  it('deve logar a requisição HTTP', (done) => {
    const mockRequest = {
      method: 'POST',
      url: '/test',
      body: { foo: 'bar' },
    };
    const mockContext = {
      switchToHttp: () => ({ getRequest: () => mockRequest }),
    } as unknown as ExecutionContext;
    const mockCallHandler: CallHandler = {
      handle: () => of('response'),
    };

    interceptor.intercept(mockContext, mockCallHandler).subscribe(() => {
      expect(mockLogger.log).toHaveBeenCalledWith(
        expect.stringContaining('POST /test'),
      );
      expect(mockLogger.log).toHaveBeenCalledWith(
        expect.stringContaining('payload: {"foo":"bar"}')
      );
      done();
    });
  });
});
