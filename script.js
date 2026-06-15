/**@type {HTMLCanvasElement} */
const c = document.getElementById("myCanvas")
const ctx = c.getContext("2d")

const width = 800
const height = 800
c.width = width
c.height = height
const step = 100 // Vamos considerar que 100 pixels equivale a 1 unidade matemática
const cx = width/2
const cy = height/2

function converterCoordenadas(xUnidade, yUnidade, isIsometrica) {
    let xFinal, yFinal;

    // Aplica a transformação isométrica pura 
    const xIso = xUnidade - yUnidade;
    const yIso = (xUnidade + yUnidade) / 2;

    // Transforma para coordenadas de tela
    // INVERTENDO o eixo Y (subtraindo de 'cy') para a matemática ficar natural
    xFinal = cx + (xIso * step);
    yFinal = cy - (yIso * step);

    // Retorna um objeto com as coordenadas prontas para o Canvas
    return { x: xFinal, y: yFinal };
}

function desenharQuadradoIsometrico() {
    ctx.beginPath()
    ctx.lineWidth=4
    ctx.strokeStyle = "green";
    // Pegamos as coordenadas processadas pela nossa função
    let p1 = converterCoordenadas(0, 0);
    let p2 = converterCoordenadas(1, 0);
    let p3 = converterCoordenadas(1, 1);
    let p4 = converterCoordenadas(0, 1);
    // Desenhamos usando os valores prontos, sem pensar em pixels!
    ctx.moveTo(p1.x, p1.y); // A(0, 0)
    ctx.lineTo(p2.x, p2.y); // B(1, 0)
    ctx.lineTo(p3.x, p3.y); // C(1, 1)
    ctx.lineTo(p4.x, p4.y); // D(0, 1)
    ctx.lineTo(p1.x, p1.y); // Volta para a origem fechando o polígono
    ctx.stroke();
}

function planoCartesiano() {
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.strokeStyle="black"

    for (let x=0; x<=width; x+=step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height)
    }

    for (let y=0; y<=height; y+=step) {
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
    }

    ctx.stroke()
}

planoCartesiano()
desenharQuadradoIsometrico()