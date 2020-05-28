export enum ActionType {
  AddPlayer,
  DrawGameCard,
  DrawDiscardedCard,
  PlayCard,
  SufflePlayerHand,
  DiscardCardFromHand,
  DiscardCardFromGame,
  AddHonorPoints,
  AddLifePoints,
  EndTurn,
  NewGame
}

export class Action {
  type: ActionType
  constructor(type: ActionType) {
    this.type = type;
  }
}

export class PlayerAction extends Action {
  playerId: string

  constructor(type: ActionType, playerId: string) {
    super(type);
    this.playerId = playerId;
  }
}

export class CardAction extends PlayerAction {
  cardPosition: number

  constructor(type: ActionType, playerId: string, cardPosition: number) {
    super(type, playerId);
    this.cardPosition = cardPosition;
  }
}

export class QuantityAction extends PlayerAction {
  quantity: number

  constructor(type: ActionType, playerId: string, quantity: number) {
    super(type, playerId);
    this.quantity = quantity;
  }
}

export const parseAction = function (raw: string): Action {

  let obj = JSON.parse(raw);
  switch (obj.type) {
    case ActionType.NewGame:
      return obj as Action;
    case ActionType.AddPlayer:
    case ActionType.EndTurn:
    case ActionType.SufflePlayerHand:
    case ActionType.DrawGameCard:
    case ActionType.DrawDiscardedCard:
      return obj as PlayerAction;
    case ActionType.PlayCard:
    case ActionType.DiscardCardFromHand:
    case ActionType.DiscardCardFromGame:
      return obj as CardAction;
    case ActionType.AddHonorPoints:
    case ActionType.AddLifePoints:
      return obj as QuantityAction;
    default:
      return {} as PlayerAction;
  }
}
