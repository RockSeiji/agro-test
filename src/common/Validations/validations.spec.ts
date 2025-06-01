import { isValidCpfOrCnpj } from './validations';

describe('isValidCpfOrCnpj', () => {
  it('deve retornar true para CPF válido', () => {
    expect(isValidCpfOrCnpj('52998224725')).toBe(true);
  });

  it('deve retornar false para CPF inválido', () => {
    expect(isValidCpfOrCnpj('12345678900')).toBe(false);
    expect(isValidCpfOrCnpj('11111111111')).toBe(false);
    expect(isValidCpfOrCnpj('')).toBe(false);
  });

  it('deve retornar true para CNPJ válido', () => {
    expect(isValidCpfOrCnpj('11222333000181')).toBe(true);
  });

  it('deve retornar false para CNPJ inválido', () => {
    expect(isValidCpfOrCnpj('12345678000100')).toBe(false);
    expect(isValidCpfOrCnpj('11111111111111')).toBe(false);
    expect(isValidCpfOrCnpj('')).toBe(false);
  });

  it('deve ignorar caracteres não numéricos', () => {
    expect(isValidCpfOrCnpj('529.982.247-25')).toBe(true);
    expect(isValidCpfOrCnpj('11.222.333/0001-81')).toBe(true);
  });

  it('deve retornar false para strings com tamanho inválido', () => {
    expect(isValidCpfOrCnpj('123')).toBe(false);
    expect(isValidCpfOrCnpj('123456789012')).toBe(false);
    expect(isValidCpfOrCnpj('123456789012345')).toBe(false);
  });
});
