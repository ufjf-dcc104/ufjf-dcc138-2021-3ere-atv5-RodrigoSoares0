import Jogador from "./Jogador";

const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

const jogador = new Jogador()
jogador.desenhar()