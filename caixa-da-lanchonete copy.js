class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        class CaixaDaLanchonete {
            constructor() {
              // Definir o cardápio com os itens e seus valores
              this.cardapio = {
                cafe: 3.00,
                chantily: 1.50,
                suco: 6.20,
                sanduiche: 6.50,
                queijo: 2.00,
                salgado: 7.25,
                combo1: 9.50,
                combo2: 7.50
              };
            }
          
            calcularValorDaCompra(formaDePagamento, itens) {
              // Verificar se a forma de pagamento é válida
              const formasValidas = ['debito', 'credito', 'dinheiro'];
              if (!formasValidas.includes(formaDePagamento)) {
                return "Forma de pagamento inválida!";
              }
          
              // Criar um objeto para armazenar a quantidade de cada item
              const quantidadeItens = {};
          
              // Calcular o total da compra e verificar as regras
              let totalCompra = 0;
          
              for (const itemInfo of itens) {
                const [codigo, quantidade] = itemInfo.split(',');
          
                // Verificar se o código do item existe no cardápio
                if (!this.cardapio.hasOwnProperty(codigo)) {
                  return "Item inválido!";
                }
          
                // Adicionar a quantidade do item ao objeto quantidadeItens
                quantidadeItens[codigo] = (quantidadeItens[codigo] || 0) + parseInt(quantidade);
          
                // Adicionar o valor do item ao total da compra
                totalCompra += this.cardapio[codigo] * parseInt(quantidade);
              }
          
              // Verificar se há itens no carrinho de compra
              if (Object.keys(quantidadeItens).length === 0) {
                return "Não há itens no carrinho de compra!";
              }
          
              // Verificar se a quantidade de itens é válida
              if (totalCompra === 0) {
                return "Quantidade inválida!";
              }
          
              // Verificar a regra de itens extras sem item principal
              const itensPrincipais = Object.keys(this.cardapio).filter(item => !item.startsWith('extra'));
              for (const codigo in quantidadeItens) {
                if (!itensPrincipais.includes(codigo) && !codigo.startsWith('extra')) {
                  return "Item extra não pode ser pedido sem o principal";
                }
              }
          
              // Aplicar desconto ou acréscimo de acordo com a forma de pagamento
              if (formaDePagamento === 'dinheiro') {
                totalCompra *= 0.95; // Aplicar desconto de 5%
              } else if (formaDePagamento === 'credito') {
                totalCompra *= 1.03; // Aplicar acréscimo de 3%
              }
          
              // Formatar o valor da compra para o formato "R$ X,XX"
              const valorFormatado = `R$ ${totalCompra.toFixed(2).replace('.', ',')}`;
          
              return valorFormatado;
            }
          }
          
          // Exemplos de uso
          const caixa = new CaixaDaLanchonete();
          
          console.log(caixa.calcularValorDaCompra('debito', ['chantily,1'])); // "Item extra não pode ser pedido sem o principal"
          console.log(caixa.calcularValorDaCompra('debito', ['cafe,1','chantily,1'])); // "R$ 4,50"
          console.log(caixa.calcularValorDaCompra('credito', ['combo1,1','cafe,2'])); // "R$ 15,96"
          
    }

}

export { CaixaDaLanchonete };
