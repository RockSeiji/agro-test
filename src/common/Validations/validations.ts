const isValidCpfOrCnpj = (value: string): boolean => {
  const digitsOnly = value.replace(/\D/g, '');

  if (digitsOnly.length === 11) {
    return validateCpf(digitsOnly);
  } else if (digitsOnly.length === 14) {
    return validateCnpj(digitsOnly);
  }

  return false;
}

function validateCpf(cpf: string): boolean {
  if (/^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let firstCheck = 11 - (sum % 11);
  firstCheck = firstCheck > 9 ? 0 : firstCheck;
  if (firstCheck !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }

  let secondCheck = 11 - (sum % 11);
  secondCheck = secondCheck > 9 ? 0 : secondCheck;
  return secondCheck === parseInt(cpf.charAt(10));
}

function validateCnpj(cnpj: string): boolean {
  if (/^(\d)\1+$/.test(cnpj)) return false;

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj.charAt(i)) * weights1[i];
  }

  let firstCheck = sum % 11;
  firstCheck = firstCheck < 2 ? 0 : 11 - firstCheck;
  if (firstCheck !== parseInt(cnpj.charAt(12))) return false;

  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj.charAt(i)) * weights2[i];
  }

  let secondCheck = sum % 11;
  secondCheck = secondCheck < 2 ? 0 : 11 - secondCheck;
  return secondCheck === parseInt(cnpj.charAt(13));
}


export { isValidCpfOrCnpj };