module.exports = {
    preset: 'ts-jest', // Usa o preset para TypeScript
    testEnvironment: 'node', // Ambiente de execução dos testes
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest', // Transforma arquivos .ts e .tsx com ts-jest
    },
    moduleFileExtensions: ['ts', 'tsx', 'js'], // Extensões que o Jest vai reconhecer
  };
  