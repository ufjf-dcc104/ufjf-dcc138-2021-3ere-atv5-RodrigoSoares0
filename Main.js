//import platform from './assets/platformA.png'
//<script src="Main.js" type="module"></script>  <-- descobrir como corrigir o erro em index.html
//o erro não permitiu a importação das classes separadas e nem de arquivos

const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')
canvas.width = 1280;
canvas.height = 720;

const gravidade = 0.5;
class Jogador
{   //resolver depois o problema de importação da classe, para dividir o projeto em partes. 
    //         erro:    Uncaught SyntaxError: Cannot use import statement outside a module
    constructor()
    {
        this.position = {x:100, y:600}
        this.velocity = {x:0, y:0}
        this.width = 10
        this.height = 25
    }

    desenhar()
    {   //desenha o jogador na tela
        c.fillStyle = 'LavenderBlush';
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    atualiza()
    {   //atualiza os status do jogador
        this.desenhar();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if(this.position.y + this.height + this.velocity.y <= canvas.height)
        {
            this.velocity.y += gravidade;
        }
        //else
          //  this.velocity.y = 0;
    }
}

class Plataforma
{
    constructor({x, y, largura, altura})
    {
        this.position = {x, y}
        this.width = largura;
        this.height = altura;
    }

    desenhar()
    {
        c.fillStyle = 'green'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}


let fase = 1
let quedas = 0

let jogador = new Jogador()

let plataformas = [new Plataforma({x: 0, y: 700, largura: 200, altura: 20}),
                     new Plataforma({x: 100, y: 500, largura: 200, altura: 20}), 
                     new Plataforma({x: 300, y: 100, largura: 200, altura: 20}), 
                     new Plataforma({x: 700, y: 680, largura: 200, altura: 20}), 
                     new Plataforma({x: 1200, y: 200, largura: 200, altura: 20}),
                     new Plataforma({x: 1800, y: 500, largura: 200, altura: 20}), 
                     new Plataforma({x: 2400, y: 510, largura: 200, altura: 20}),
                     new Plataforma({x: 3100, y: 700, largura: 200, altura: 20}),
                     new Plataforma({x: 3800, y: 500, largura: 200, altura: 20}),   
                     new Plataforma({x: 4500, y: 100, largura: 30, altura: 20})]



const keys =
{
    direita: 
    {
        pressionado: false
    },
    esquerda: 
    {
        pressionado: false
    },
    enter:
    {
        pressionado: false
    }
}

let pontoPosicao = 0 //variavel que guarda o ponto onde o jogador se encontra


function reset() //reseta quando o jogador cai
{

 jogador = new Jogador()

 if(fase === 1)
 {
        plataformas =  [new Plataforma({x: 0, y: 700, largura: 200, altura: 20}),
                            new Plataforma({x: 100, y: 500, largura: 200, altura: 20}), 
                            new Plataforma({x: 300, y: 100, largura: 200, altura: 20}), 
                            new Plataforma({x: 700, y: 680, largura: 200, altura: 20}), 
                            new Plataforma({x: 1200, y: 200, largura: 200, altura: 20}),
                            new Plataforma({x: 1800, y: 500, largura: 200, altura: 20}), 
                            new Plataforma({x: 2400, y: 510, largura: 200, altura: 20}),
                            new Plataforma({x: 3100, y: 700, largura: 200, altura: 20}),
                            new Plataforma({x: 3800, y: 500, largura: 200, altura: 20}),   
                            new Plataforma({x: 4500, y: 100, largura: 30, altura: 20})]
 }
 else
 {
     if(fase === 2)
     {
        plataformas =  [new Plataforma({x: 0, y: 700, largura: 200, altura: 20}),
            new Plataforma({x: 300, y: 200, largura: 60, altura: 20}), 
            new Plataforma({x: 1000, y: 310, largura: 200, altura: 20}), 
            new Plataforma({x: 1700, y: 400, largura: 60, altura: 20}), 
            new Plataforma({x: 2400, y: 700, largura: 200, altura: 20}),
            new Plataforma({x: 3100, y: 100, largura: 60, altura: 20}), 
            new Plataforma({x: 3700, y: 560, largura: 200, altura: 20}),
            new Plataforma({x: 4400, y: 200, largura: 60, altura: 20}),
            new Plataforma({x: 5100, y: 600, largura: 200, altura: 20}),   
            new Plataforma({x: 5800, y: 160, largura: 60, altura: 20}),  
            new Plataforma({x: 6700, y: 620, largura: 200, altura: 20}),  
            new Plataforma({x: 7000, y: 220, largura: 60, altura: 20}),  
            new Plataforma({x: 7900, y: 500, largura: 200, altura: 20}),  
            new Plataforma({x: 8500, y: 100, largura: 30, altura: 20})]
     }
 }




pontoPosicao = 0 //variavel que guarda o ponto onde o jogador se encontra
}

function contador()
{
    c.fillStyle = "white";
    c.font = "20px Impact"
    c.fillText("Quedas: " + quedas, 10, 20);
}

function telaInicial()
{
    c.fillStyle = "white";
    c.font = "20px Impact"
    c.fillText("Pressione ArrowLeft para se mover para a esquerda", 200, 200);
    c.fillText("Pressione ArrowRight para de mover para a direita", 200, 300)
    c.fillText("Pressione ArrouUp para pular", 200, 400)
}



function animacao()
{   

    //cria uma animação para o movimento do jogador
    requestAnimationFrame(animacao);
    c.clearRect(0, 0, canvas.width, canvas.height);
    jogador.atualiza();
    plataformas.forEach(plataforma =>
        {
            plataforma.desenhar();
        })
   
        
    //ifs e elses para o movimento horizontal
    if(keys.direita.pressionado && jogador.position.x < 700)
    {
        jogador.velocity.x = 5
    }
    else if(keys.esquerda.pressionado && jogador.position.x > 20)
    {
        jogador.velocity.x = -5
    }
    else
    {
        jogador.velocity.x = 0

        if(keys.direita.pressionado)
        {
            plataformas.forEach(plataforma =>
                {
                    pontoPosicao += 5;
                    plataforma.position.x -= 5;
                })

        }/*
        else
        {
            if(keys.esquerda.pressionado)
            {
                plataformas.forEach(plataforma =>
                    {
                        pontoPosicao -= 5;
                        plataforma.position.x += 5;
                    })

            }
        }*/
    }

    //ifs e elses para colisão com as plataformas
    plataformas.forEach(plataforma =>
        {
            if(//colisão superior
            jogador.position.y + jogador.height <= plataforma.position.y &&
            jogador.position.y + jogador.height + jogador.velocity.y >= plataforma.position.y &&
                //colisões laterais
                //lateral esquerda
            jogador.position.x + jogador.width >= plataforma.position.x &&
                //lateral direita
            jogador.position.x <= plataforma.position.x + plataforma.width
            )
            {
                jogador.velocity.y = 0;
            }
        })

        //condição de vitoria
        //if(jogador.position.x === 4500 && jogador.position.y === 220)
        //{
        //    console.log('chegada')
        //}

        if(pontoPosicao === 0 && fase === 1) //distancia necessaria para vencer (posteriormente isso será uma distancia para troca de cenario para boss battle)
        {
            telaInicial()
        }

        if(pontoPosicao > 38200 && jogador.position.y <= 100 && fase === 1) //distancia necessaria para vencer (posteriormente isso será uma distancia para troca de cenario para boss battle)
        {
            console.log('PARABÉNS! VOCÊ VENCEU!')
            fase++
            reset()
        }
        else
        {
            if(pontoPosicao > 109760 && jogador.position.y <= 100 && fase === 2) //distancia necessaria para vencer (posteriormente isso será uma distancia para troca de cenario para boss battle)
            {
                console.log(pontoPosicao)
                console.log('PARABÉNS! VOCÊ VENCEU!')
                //fase++
                //reset()
            }
        }

        //condição de derrota
        if(jogador.position.y > canvas.height || jogador.position.y < -200) //limita o jogados à borda inferios e -200 da borda superior
        {
                
            quedas ++;
            reset()
        }


        contador();

    
}

animacao();

addEventListener('keydown', ({keyCode}) => 
{
    switch(keyCode)
    {
        case 37:
            console.log('esquerda')
            keys.esquerda.pressionado = true
            break;
        case 38:
            console.log('cima')
            jogador.velocity.y -= 20;
            break;
        case 39:
            console.log('direita')
            keys.direita.pressionado = true
            break;
        case 40:
            console.log('baixo')
            break;
    }
});

addEventListener('keyup', ({keyCode}) => 
{
    switch(keyCode)
    {
        case 37:
            console.log('esquerda')
            keys.esquerda.pressionado = false

            break;
        case 38:
            console.log('cima')
            break;
        case 39:
            console.log('direita')
            keys.direita.pressionado = false
            break;
        case 40:
            console.log('baixo')
            break;
    }
});