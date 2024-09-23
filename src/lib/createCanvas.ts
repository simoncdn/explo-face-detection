export type AreaDimension = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export function createCanvasRectStroke(
  ctx: CanvasRenderingContext2D,
  color: string,
  dimension: AreaDimension,
) {
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = color;
  ctx.rect(dimension?.x, dimension?.y, dimension?.w, dimension?.h);
  ctx.stroke();
}

export function createCanvasRect(
  ctx: CanvasRenderingContext2D,
  color: string,
  dimension: AreaDimension,
) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.rect(dimension?.x, dimension?.y, dimension?.w, dimension?.h);
  ctx.fill();
}

