

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
        this.width = 25
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
        else
            this.velocity.y = 0;
    }
}

class Plataforma
{
    constructor({x, y})
    {
        this.position = {x, y}
        this.width = 200;
        this.height = 20;
    }

    desenhar()
    {
        c.fillStyle = 'green'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}


const jogador = new Jogador()
const plataformas = [new Plataforma({x: 100, y: 600}), new Plataforma({x: 300, y: 200})]

const keys =
{
    direita: 
    {
        pressionado: false
    },
    esquerda: 
    {
        pressionado: false
    }
}

function animacao()
{   //cria uma animação para o movimento do jogador
    requestAnimationFrame(animacao);
    c.clearRect(0, 0, canvas.width, canvas.height);
    jogador.atualiza();
    plataformas.forEach(plataforma =>
        {
            plataforma.desenhar();
        })
   

    //ifs e elses para o movimento horizontal
    if(keys.direita.pressionado && jogador.position.x < 400)
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
                    plataforma.position.x -= 5;
                })

        }
        else
        {
            if(keys.esquerda.pressionado)
            {
                plataformas.forEach(plataforma =>
                    {
                        plataforma.position.x += 5;
                    })

            }
        }
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