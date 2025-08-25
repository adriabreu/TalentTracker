/**
 * Teste minimal para debugging do Jest
 * Sem dependências ou configurações complexas
 */

// Teste simples
describe('Teste Minimal', () => {
  // Um teste sincronizado básico
  test('1 + 1 deve ser igual a 2', () => {
    expect(1 + 1).toBe(2);
    console.log('✅ Teste sincronizado passou');
  });
  
  // Outro teste simples para garantir que múltiplos testes funcionem
  test('string deve ser concatenada corretamente', () => {
    expect('Hello ' + 'World').toBe('Hello World');
    console.log('✅ Teste de string passou');
  });
  
  // Garantir que tudo funciona corretamente
  afterAll(() => {
    console.log('✅ Suite de testes minimais concluída');
  });
});
