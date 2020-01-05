import React, { useState, useEffect, useCallback } from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';

import { availableMoveForPiece } from './helper';
import Piece from '../sprites';

const pieces = [
  'King',
  'Queen',
  'Bishop',
  'Knight',
  'Rook',
  'Pawn',
];

const colors = ['White', 'Black'];

const { width, height } = Dimensions.get('window');
const measurementSide = width > height ? height - 10 : width - 10;

const SquareBackgroundColor = (verticalIndex: number, horizontalIndex: number) => {
  if (verticalIndex % 2 === 0) {
    return horizontalIndex % 2 === 0 ? '#777' : '#fff';
  } else {
    return horizontalIndex % 2 === 0 ? '#fff' : '#777';
  }
}

const Board = () => {
  const [whiteShouldMove, setIsWhiteShouldMove] = useState(true);
  const [activeIndex, setActiveIndex] = useState({ x: -1, y: -1});
  const [availablePosisitionsForSelectedPiece, setAvailablePosisitionsForSelectedPiece] = useState([{ x: -1, y: -1}]);
  const [board, setBoard] = useState();
  useEffect(() => {
    setBoard(ArrangePieces());
    setActiveIndex({ x: -1, y: -1 });
  }, []);
  const onPiecePress = useCallback((x, y) => {
    if (availablePosisitionsForSelectedPiece.findIndex(pos => pos.x === x && pos.y === y) !== -1) {
      const templateBoard = [...board];
      templateBoard[y][x] = templateBoard[activeIndex.y][activeIndex.x];
      templateBoard[activeIndex.y][activeIndex.x] = '';
      setActiveIndex({ x: -1, y: -1 })
      setBoard(templateBoard);
      setAvailablePosisitionsForSelectedPiece([]);
    } else {
      if (board[y][x]) {
        setActiveIndex({ x, y });
        setAvailablePosisitionsForSelectedPiece(availableMoveForPiece({ x, y, board }));
      } else {
        setActiveIndex({ x: -1, y: -1 });
      }
    }
  }, [board, activeIndex]);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#777' }}>
      <View style={{ flexWrap: 'wrap', flexDirection: 'row', width: measurementSide + 2, borderWidth: 1, borderColor: '#777' }}>
        {board && board.map((line: string[], verticalIndex: number) => {
          return line.map((piece: string, horizontalIndex) => {
            const backgroundColor = SquareBackgroundColor(verticalIndex, horizontalIndex);
            const styles = { backgroundColor, transform: verticalIndex < 2 ? [{ rotate: '360deg' }] : [], width: measurementSide / 8, height: measurementSide / 8 } as any;
            if (activeIndex.y === verticalIndex && activeIndex.x === horizontalIndex) { 
              Object.assign(styles, { borderWidth: 2, borderColor: '#44c'}) 
            }
            if (availablePosisitionsForSelectedPiece.filter((position) => position.y === verticalIndex && position.x === horizontalIndex).length) {
              Object.assign(styles, { borderWidth: 2, borderColor: '#f00'}) 
            }
            return (
              <TouchableOpacity onPress={onPiecePress.bind(null, horizontalIndex, verticalIndex)} 
                                key={`${verticalIndex}${horizontalIndex}`} 
                                style={styles}>
                {Boolean(piece) && <Piece name={piece as any} />}
              </TouchableOpacity>
            );
          })
        })}
      </View>
    </View>
  );
}

const ArrangePieces = () => {
  return [
    ['BlackRook', 'BlackKnight', 'BlackBishop', 'BlackKing', 'BlackQueen', 'BlackBishop', 'BlackKnight', 'BlackRook'],
    ['BlackPawn', 'BlackPawn', 'BlackPawn', 'BlackPawn', 'BlackPawn', 'BlackPawn', 'BlackPawn', 'BlackPawn', ],
    ['', '', '', '', '', '', '', '', ],
    ['', '', '', '', '', '', '', '', ],
    ['', '', '', '', '', '', '', '', ],
    ['', '', '', '', '', '', '', '', ],
    ['WhitePawn', 'WhitePawn', 'WhitePawn', 'WhitePawn', 'WhitePawn', 'WhitePawn', 'WhitePawn', 'WhitePawn', ],
    ['WhiteRook', 'WhiteKnight', 'WhiteBishop', 'WhiteKing', 'WhiteQueen', 'WhiteBishop', 'WhiteKnight', 'WhiteRook'],
  ];
}

export default Board;