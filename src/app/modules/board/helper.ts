import { POSSIBLE_KHIGHT_MOVES } from './domain/enums/possible-moves';

interface args { x: number, y: number, board: string[][] }

export const availableMoveForPiece = ({ x, y, board }: args): { x: number, y: number }[] => {
  const isWhite = board[y][x].indexOf('White') >= 0;
  if (board[y][x].indexOf('Pawn') >= 0) {
    return availableMoveForPawn({ x, y, board, isWhite });
  } else if (board[y][x].indexOf('Knight') >= 0) {
    return availableMoveForKnight({ x, y, board, isWhite });
  } else if (board[y][x].indexOf('Bishop') >= 0) {
    return availableMoveForBishop({ x, y, board, isWhite });
  } else if (board[y][x].indexOf('Rook') >= 0) {
    return availableMoveForRook({ x, y, board, isWhite });
  } else if (board[y][x].indexOf('King') >= 0) {
    return availableMoveForKing({ x, y, board, isWhite });
  } else if (board[y][x].indexOf('Queen') >= 0) {
    return availableMoveForQueen({ x, y, board, isWhite });
  }
  return [];
}

const availableMoveForPawn = ({ x, y, board, isWhite }: args & { isWhite: boolean }) => {
  const availableMoves = [];
  const mulriplier = isWhite ? -1 : 1;
  for (let verticalOffset = 1; verticalOffset < 3; verticalOffset++) {
    if (!board[y + verticalOffset * mulriplier][x]) {
      availableMoves.push({ x, y: y + verticalOffset * mulriplier });
    }
  }
  return availableMoves;
}



const availableMoveForKnight = ({ x, y, board, isWhite }: args & { isWhite: boolean }) => {
  const availableMoves: { x: number, y: number }[] = [];
  POSSIBLE_KHIGHT_MOVES.map((move) => {
    const posX = x + move.x;
    const posY = y + move.y;
    if (posX >= 0 && posX < 8 && posY >= 0 && posY < 8) {
      if (board[posY][posX].indexOf(isWhite ? 'White' : 'Black') === -1) {
        availableMoves.push({ x: posX, y: posY });
      }
    }
  });
  return availableMoves;
}

const availableMoveForBishop = ({ x, y, board, isWhite }: args & { isWhite: boolean }) => {
  const availableMoves: { x: number, y: number }[] = [];
  for (let direction = 0; direction < 4; direction++) {
    const multiplier = { multiX: direction % 2 === 0 ? 1 : -1, multiY: direction % 3 === 0 ? 1 : -1 };
    for (let posX = x, posY = y; posX >= 0 && posX < 8 && posY >= 0 && posY < 8; posX += multiplier.multiX, posY += multiplier.multiY) {
      if (posX === x && posY === y) { continue; }
      else if (board[posY][posX]) {
        if (board[posY][posX].indexOf(isWhite ? 'White' : 'Black') === -1) {
          availableMoves.push({ x: posX, y: posY });
        }
        break;
      }
      availableMoves.push({ x: posX, y: posY });
    }
  }
  return availableMoves;
}

const availableMoveForKing = ({ x, y, board, isWhite }: args & { isWhite: boolean }) => {
  const availableMoves: { x: number, y: number }[] = [];
  for (let posY = y - 1; posY <= y + 1; posY++) {
    if (!board[posY]) { continue; }
    for (let posX = x -1; posX <= x + 1; posX++) {
      if (posX === x && posY === y) { continue; }
      else if (board[posY][posX]) {
        if (board[posY][posX].indexOf(isWhite ? 'White' : 'Black') === -1) {
          availableMoves.push({ x: posX, y: posY });
        }
      } else if (!board[posY][posX]) { availableMoves.push({ x: posX, y: posY }); }
    }
  }
  return availableMoves;
}

const availableMoveForQueen = ({ x, y, board, isWhite }: args & { isWhite: boolean }) => {
  return [...availableMoveForRook({ x, y, board, isWhite }), ...availableMoveForBishop({ x, y, board, isWhite })];
}

const availableMoveForRook = ({ x, y, board, isWhite }: args & { isWhite: boolean }) => {
  const availableMoves: { x: number, y: number }[] = [];
  for (let direction = 0; direction < 4; direction++) {
    const addendum = { addX: direction % 2 === 0 ? 1 : -1, addY: direction % 3 === 0 ? 1 : -1 };
    for (let posX = x, posY = y; posX >= 0 && posX < 8 && posY >= 0 && posY < 8; posX += direction < 2 ? 0 : addendum.addX, posY += direction > 1 ? 0 : addendum.addY) {
      if (posX === x && posY === y) { continue; }
      else if (board[posY][posX]) {
        if (board[posY][posX].indexOf(isWhite ? 'White' : 'Black') === -1) {
          availableMoves.push({ x: posX, y: posY });
        }
        break;
      }
      availableMoves.push({ x: posX, y: posY });
    }
  }
  return availableMoves;
}