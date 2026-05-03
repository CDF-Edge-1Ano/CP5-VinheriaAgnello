async function carregarDados() {
    const response = await fetch('/dados');
    const data = await response.json();

    const tempos = data.temperature.map(e => e.recvTime);
    const temperaturas = data.temperature.map(e => e.attrValue);
    const umidades = data.humidity.map(e => e.attrValue);
    const luminosidade = data.luminosity.map(e => e.attrValue);

    atualizarGrafico(tempChart, tempos, temperaturas, 'Temperatura');
    atualizarGrafico(humChart, tempos, umidades, 'Umidade');
    atualizarGrafico(lumChart, tempos, luminosidade, 'Luminosidade');
}

function criarGrafico(ctx, label) {
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: label,
                data: []
            }]
        }
    });
}

function atualizarGrafico(chart, labels, dados, label) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = dados;
    chart.update();
}

const tempChart = criarGrafico(document.getElementById('tempChart'), 'Temperatura');
const humChart = criarGrafico(document.getElementById('humChart'), 'Umidade');
const lumChart = criarGrafico(document.getElementById('lumChart'), 'Luminosidade');

setInterval(carregarDados, 2000); 