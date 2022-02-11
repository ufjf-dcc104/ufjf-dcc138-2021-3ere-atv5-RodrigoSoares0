

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
        this.position = {x:50, y:50}
        this.velocity = {x:0, y:0}
        this.width = 25
        this.height = 25
    }

    desenhar()
    {   //desenha o jogador na tela
        c.fillStyle = 'blue';
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



const jogador = new Jogador()

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

    if(keys.direita.pressionado)
    {
        jogador.velocity.x = 5
    }
    else if(keys.esquerda.pressionado)
    {
        jogador.velocity.x = -5
    }
    else
    {
        jogador.velocity.x = 0
    }
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