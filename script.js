function calcular() {

    // ==============================
    // ENTRADAS
    // ==============================

    const precoCompra =
        Number(document.getElementById("precoCompra").value);

    const roiDesejado =
        Number(document.getElementById("roiDesejado").value) / 100;

    const precoVendaReal =
        Number(document.getElementById("precoVendaReal").value);

    const comissao =
        Number(document.getElementById("comissao").value) / 100;

    const imposto =
        Number(document.getElementById("imposto").value) / 100;

    const quantidade =
        Number(document.getElementById("quantidade").value);

    const altura =
        Number(document.getElementById("altura").value);

    const largura =
        Number(document.getElementById("largura").value);

    const comprimento =
        Number(document.getElementById("comprimento").value);


    // ==============================
    // TAXA FIXA
    // ==============================

    const taxaFixa = 6.75;


    // ==============================
    // VALIDAÇÃO
    // ==============================

    if (
        !precoCompra ||
        !roiDesejado ||
        !precoVendaReal ||
        !comissao ||
        !imposto ||
        !quantidade ||
        !altura ||
        !largura ||
        !comprimento
    ) {

        alert("Preencha todos os campos.");

        return;
    }


    // ==============================
    // PESO VOLUMÉTRICO
    // ==============================

    const peso =
        (altura * largura * comprimento) / 5000;


    // ==============================
    // TABELA DE FRETE
    // ==============================

    const tabelaFrete = [

        [0, 0.3, 5.65, 6.85, 8.15, 12.95, 14.95, 16.95, 19.05, 21.65],
        [0.3, 0.5, 5.95, 6.95, 8.25, 13.85, 16.15, 18.15, 20.45, 23.25],
        [0.5, 1, 6.05, 7.15, 8.45, 14.45, 16.85, 19.05, 21.35, 24.45],
        [1, 1.5, 6.15, 7.35, 8.65, 14.75, 17.15, 19.45, 21.75, 25.45],
        [1.5, 2, 6.25, 7.45, 8.75, 15.05, 17.65, 19.85, 22.25, 25.55],
        [2, 3, 6.35, 8.65, 9.15, 16.45, 19.15, 21.65, 24.35, 27.05],
        [3, 4, 6.45, 8.75, 9.75, 17.85, 20.75, 23.35, 26.35, 29.25],
        [4, 5, 6.55, 8.85, 10.25, 19.75, 22.85, 26.05, 29.25, 32.45],
        [5, 6, 6.65, 8.95, 10.35, 25.95, 29.15, 33.35, 36.45, 40.85],
        [6, 7, 6.75, 9.05, 10.45, 27.55, 31.65, 36.75, 40.85, 45.25],
        [7, 8, 6.85, 9.25, 10.55, 29.45, 34.35, 39.25, 44.15, 49.35],
        [8, 9, 6.95, 9.35, 10.65, 30.25, 35.25, 40.35, 45.35, 50.75],
        [9, 10, 7.05, 9.45, 10.85, 38.25, 45.05, 51.95, 58.75, 65.85],
        [10, 11, 7.05, 9.65, 11.05, 41.65, 48.55, 55.45, 62.35, 69.35],
        [11, 13, 7.15, 10.05, 11.45, 42.55, 49.75, 56.85, 63.85, 70.95],
        [13, 15, 7.25, 10.25, 11.65, 45.55, 52.95, 60.55, 68.15, 75.65],
        [15, 17, 7.35, 10.45, 11.85, 48.95, 56.55, 64.05, 71.35, 79.35],
        [17, 20, 7.45, 10.65, 12.05, 55.15, 64.35, 73.55, 82.75, 91.95],
        [20, 25, 7.65, 11.05, 12.25, 64.55, 75.75, 85.45, 96.25, 106.85],
        [25, 30, 7.75, 11.25, 12.45, 66.45, 76.05, 86.25, 97.15, 107.85],
        [30, 40, 7.85, 11.45, 12.65, 68.35, 79.65, 89.75, 100.05, 107.95],
        [40, 50, 7.95, 11.65, 12.85, 70.95, 81.85, 92.85, 103.45, 111.65],
        [50, 60, 8.05, 11.85, 13.05, 75.55, 87.25, 99.05, 110.25, 119.05],
        [60, 70, 8.15, 12.05, 13.25, 80.95, 93.75, 105.95, 118.05, 127.45],
        [70, 80, 8.25, 12.25, 13.45, 84.65, 97.95, 110.75, 123.35, 133.15],
        [80, 90, 8.35, 12.45, 13.65, 94.05, 108.35, 122.95, 136.95, 147.85],
        [90, 100, 8.45, 12.65, 13.85, 107.45, 124.85, 140.45, 156.45, 168.85],
        [100, 125, 8.55, 12.85, 14.05, 120.15, 138.95, 156.95, 174.85, 188.85],
        [125, 150, 8.65, 12.85, 14.25, 127.45, 147.05, 166.55, 185.55, 200.35],
        [150, Infinity, 8.75, 12.85, 14.45, 167.05, 193.35, 218.45, 243.45, 262.85]

    ];


    // ==============================
    // ENCONTRAR LINHA DO FRETE
    // ==============================

    function encontrarLinhaFrete(peso) {

        for (let i = 0; i < tabelaFrete.length; i++) {

            const minimo = tabelaFrete[i][0];
            const maximo = tabelaFrete[i][1];

            if (
                peso >= minimo &&
                peso <= maximo
            ) {

                return tabelaFrete[i];

            }
        }

        return tabelaFrete[tabelaFrete.length - 1];
    }


    // ==============================
    // ENCONTRAR FRETE
    // ==============================

    function encontrarFrete(peso, precoVenda) {

        const linha =
            encontrarLinhaFrete(peso);

        let coluna;


        if (precoVenda < 19) {

            coluna = 2;

        } else if (precoVenda < 49) {

            coluna = 3;

        } else if (precoVenda < 79) {

            coluna = 4;

        } else if (precoVenda < 100) {

            coluna = 5;

        } else if (precoVenda < 120) {

            coluna = 6;

        } else if (precoVenda < 150) {

            coluna = 7;

        } else if (precoVenda < 200) {

            coluna = 8;

        } else {

            coluna = 9;

        }


        return linha[coluna];
    }


    // ==============================
    // PREÇO DE VENDA IDEAL
    // ==============================

    const lucroDesejado =
        precoCompra * roiDesejado;


    const faixasPreco = [

        {
            minimo: 0,
            maximo: 19
        },

        {
            minimo: 19,
            maximo: 49
        },

        {
            minimo: 49,
            maximo: 79
        },

        {
            minimo: 79,
            maximo: 100
        },

        {
            minimo: 100,
            maximo: 120
        },

        {
            minimo: 120,
            maximo: 150
        },

        {
            minimo: 150,
            maximo: 200
        },

        {
            minimo: 200,
            maximo: Infinity
        }

    ];


    let precoIdeal = null;
    let freteIdeal = null;


    for (const faixa of faixasPreco) {

        const frete =
            encontrarFrete(
                peso,
                faixa.minimo + 0.01
            );


        const precoCalculado =
            (
                precoCompra +
                taxaFixa +
                frete +
                lucroDesejado
            )
            /
            (
                1 -
                comissao -
                imposto
            );


        if (
            precoCalculado >= faixa.minimo &&
            precoCalculado < faixa.maximo
        ) {

            precoIdeal =
                precoCalculado;

            freteIdeal =
                encontrarFrete(
                    peso,
                    precoIdeal
                );

            break;
        }
    }


    // ==============================
    // CASO NÃO ENCONTRE A FAIXA
    // ==============================

    if (precoIdeal === null) {

        const frete =
            encontrarFrete(
                peso,
                200
            );


        precoIdeal =
            (
                precoCompra +
                taxaFixa +
                frete +
                lucroDesejado
            )
            /
            (
                1 -
                comissao -
                imposto
            );


        freteIdeal =
            encontrarFrete(
                peso,
                precoIdeal
            );
    }


    // ==============================
    // CÁLCULOS DO PREÇO REAL
    // ==============================

    const freteReal =
        encontrarFrete(
            peso,
            precoVendaReal
        );


    const comissaoReal =
        precoVendaReal * comissao;


    const impostoReal =
        precoVendaReal * imposto;


    const repasseReal =
        precoVendaReal -
        comissaoReal -
        taxaFixa -
        freteReal;


    const lucroReal =
        repasseReal -
        precoCompra -
        impostoReal;


    const lucroTotal =
        lucroReal * quantidade;


    const roiReal =
        (lucroReal / precoCompra) * 100;


    const margemReal =
        (lucroReal / precoVendaReal) * 100;


    // ==============================
    // DIFERENÇA ENTRE OS PREÇOS
    // ==============================

    const diferencaPreco =
        precoVendaReal - precoIdeal;


    // ==============================
    // MOSTRAR RESULTADOS
    // ==============================

    document.getElementById("precoIdeal").textContent =
        formatarMoeda(precoIdeal);


    document.getElementById("precoRealResultado").textContent =
        formatarMoeda(precoVendaReal);


    document.getElementById("diferencaPreco").textContent =
        formatarMoeda(diferencaPreco);


    document.getElementById("frete").textContent =
        formatarMoeda(freteReal);


    document.getElementById("repasse").textContent =
        formatarMoeda(repasseReal);


    document.getElementById("lucro").textContent =
        formatarMoeda(lucroReal);


    document.getElementById("lucroTotal").textContent =
        formatarMoeda(lucroTotal);


    document.getElementById("roiReal").textContent =
        formatarPorcentagem(roiReal);


    document.getElementById("margemReal").textContent =
        formatarPorcentagem(margemReal);

}


// ==============================
// FORMATAÇÃO DE MOEDA
// ==============================

function formatarMoeda(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// ==============================
// FORMATAÇÃO DE PORCENTAGEM
// ==============================

function formatarPorcentagem(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    ) + "%";

}