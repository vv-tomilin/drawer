import '../styles/main.scss';

import Canvas from './Canvas';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const canvasApp = new Canvas(canvas);
canvasApp.resizeCanvas();
