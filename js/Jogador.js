export default class Jogador
{
    constructor()
    {
        this.position = {x:50, y:50}
        this.width = 50
        this.height = 50
    }

    desenhar()
    {
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}