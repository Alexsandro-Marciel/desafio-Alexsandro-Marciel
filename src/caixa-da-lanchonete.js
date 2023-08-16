
class CaixaDaLanchonete {
    constructor() {
        // Definir o cardápio com os itens e seus valores
        this.itens = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50
        };
        
        // Definir os itens extras e seus itens principais correspondentes
        this.itensExtras = {
            extraChantily: 'sanduiche',
            extraQueijo: 'sanduiche'
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
            if (!this.itens.hasOwnProperty(codigo)) {
                return "Item inválido!";
            }

            // Adicionar a quantidade do item ao objeto quantidadeItens
            quantidadeItens[codigo] = (quantidadeItens[codigo] || 0) + parseInt(quantidade);

            // Adicionar o valor do item ao total da compra
            totalCompra += this.itens[codigo] * parseInt(quantidade);
        }

        // Verificar se há itens no carrinho de compra
        if (Object.keys(quantidadeItens).length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        // Verificar se a quantidade de itens é válida
        if (totalCompra === 0) {
            return "Quantidade inválida!";
        }

        // Aplicar desconto ou acréscimo de acordo com a forma de pagamento
        if (formaDePagamento === 'dinheiro') {
            totalCompra *= 0.95; // Aplicar desconto de 5%
        } else if (formaDePagamento === 'credito') {
            totalCompra *= 1.03; // Aplicar acréscimo de 3%
        }

        // Verificar a regra de itens extras sem item principal
        for (const itemInfo of itens) {
            const [codigo, quantidade] = itemInfo.split(',');

            if (this.itensExtras.hasOwnProperty(codigo)) {
                const itemPrincipal = this.itensExtras[codigo];
                if (!quantidadeItens[itemPrincipal]) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            }
        }

        // Formatar o valor da compra para o formato "R$ X,XX"
        const valorFormatado = `R$ ${totalCompra.toFixed(2).replace('.', ',')}`;
        return valorFormatado;
    }
}

export { CaixaDaLanchonete };



