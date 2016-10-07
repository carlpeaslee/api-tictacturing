export default function winChecker(boardState) {
  if(boardState['0'] !== 'EMPTY' && boardState['0']===boardState['1'] && boardState['0']===boardState['2']) {
    return {
      winner: boardState['0'],
      locationOfWin: 'TOP'
    }
  }
  else if(boardState['3'] !== 'EMPTY' && boardState['3']===boardState['4'] && boardState['3']===boardState['5']) {
    return {
      winner: boardState['3'],
      locationOfWin: 'MIDDLE'
    }
  }
  else if(boardState['6'] !== 'EMPTY' && boardState['6']===boardState['7'] && boardState['6']===boardState['8']) {
    return {
      winner: boardState['6'],
      locationOfWin: 'BOTTOM'
    }
  }
  else if(boardState['0'] !== 'EMPTY' && boardState['0']===boardState['3'] && boardState['0']===boardState['6']) {
    return {
      winner: boardState['0'],
      locationOfWin: 'LEFT'
    }
  }
  else if(boardState['1'] !== 'EMPTY' && boardState['1']===boardState['4'] && boardState['1']===boardState['7']) {
    return {
      winner: boardState['1'],
      locationOfWin: 'CENTER'
    }
  }
  else if(boardState['2'] !== 'EMPTY' && boardState['2']===boardState['5'] && boardState['2']===boardState['8']) {
    return {
      winner: boardState['2'],
      locationOfWin: 'RIGHT'
    }
  }
  else if(boardState['0'] !== 'EMPTY' && boardState['0']===boardState['4'] && boardState['0']===boardState['8']) {
    return {
      winner: boardState['0'],
      locationOfWin: 'DIAGONAL_DOWN'
    }
  }
  else if(boardState['2'] !== 'EMPTY' && boardState['2']===boardState['4'] && boardState['2']===boardState['6']) {
    return {
      winner: boardState['2'],
      locationOfWin: 'DIAGONAL_UP'
    }
  }
  else if(!Object.values(boardState).includes('EMPTY')) {
    return {
      winner: "CAT'S GAME",
      locationOfWin: 'TIE'
    }
  } else {
    return false
  }
}
