type CableStatusColor = 'short-pairs' | 'ok-port' | 'open-pairs' | 'no-cable' | '';

export const getPairCellColor = (state: string): CableStatusColor => {
  let newClass: CableStatusColor;
  switch (state) {
    case 'Short':
      newClass = 'short-pairs'
      break;
    case 'OK':
      newClass = 'ok-port'
      break
    case 'Open':
      newClass = 'open-pairs';
      break;
    case 'Нет кабеля':
    default:
      newClass = 'no-cable'
      break;
  }

  return newClass;
}

export const getPortCellColor = (state: string): CableStatusColor => {
  let newClass: CableStatusColor;
  switch (state) {
    case 'Link-UP':
      newClass = 'ok-port';
      break;
    case 'Link-Down':
    default:
      newClass = 'no-cable';
      break;
  }

  return newClass;
}