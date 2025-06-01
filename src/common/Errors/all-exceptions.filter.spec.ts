import { AllExceptionsFilter } from './all-exceptions.filter';
import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

describe('AllExceptionsFilter', () => {
  let filter: AllExceptionsFilter;
  let mockResponse: any;
  let mockRequest: any;
  let mockHost: any;

  beforeEach(() => {
    filter = new AllExceptionsFilter();
    mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    mockRequest = { url: '/test-url' };
    mockHost = {
      switchToHttp: () => ({ getResponse: () => mockResponse, getRequest: () => mockRequest }),
    } as unknown as ArgumentsHost;
  });

  it('deve retornar erro customizado para HttpException', () => {
    const exception = new HttpException('Erro customizado', HttpStatus.BAD_REQUEST);
    filter.catch(exception, mockHost);
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HttpStatus.BAD_REQUEST,
        path: '/test-url',
        message: 'Erro customizado',
      })
    );
  });

  it('deve retornar erro padrão para erro desconhecido', () => {
    const exception = new Error('Erro desconhecido');
    filter.catch(exception, mockHost);
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        path: '/test-url',
        message: 'Ocorreu um erro na operação. Tente novamente mais tarde.',
      })
    );
  });
});
