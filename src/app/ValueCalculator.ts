// const cardNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13]
// const cardTypes = ['heart', 'spade', 'club', 'diamond']
// const card_colors = ['red', 'black']

//TODO add edge case for the following
//set of three for ulter 1.on hand 2. on floor
export enum JokerType {
    JOKER,
    ULTER,
    MAAL,
    PREFIX,
    SUFFIX
}
export enum CardType {
    HEART,
    DIAMOND,
    SPADE,
    CLUB,
    DEFAULT_JOKER
}

export type Card = {
    cardNumber: number;
    cardType: CardType;
}
export type UserCard = Card & { cardCount: number }
type PointMap = {
    name: JokerType, point: number
}
type CardWithValue = Card & { jokerType: JokerType }

const MARRIAGE_POINT = 10
const FLOOR_MARRIAGE_POINT = 15
const SET_OF_THREE_POINT = 10
const FLOOR_SET_OF_THREE_POINT = 15
const POINT_MAP: PointMap[] = [
    {name: JokerType.JOKER, point: 5},
    {name: JokerType.ULTER, point: 5},
    {name: JokerType.MAAL, point: 3},
    {name: JokerType.PREFIX, point: 2},
    {name: JokerType.SUFFIX, point: 2}
]

export class ValueCalculator {
    private isFloorMarriage: boolean;
    private isFloorSetOfThree: boolean;
    private deckJoker: Card;
    private calculateDeck: UserCard[];
    private valueCards: CardWithValue[];

    constructor(
        deckJoker: Card,
        userCards: UserCard[],
        isFloorMarriage = false,
        isFloorSetOfThree = false
    ) {
        this.deckJoker = deckJoker
        this.calculateDeck = [...userCards]
        this.isFloorMarriage = isFloorMarriage
        this.isFloorSetOfThree = isFloorSetOfThree
        this.valueCards = this.getValueCards()
        console.log(this.calculateAllValueCardsPoint())
    }

    private getValueCards(): CardWithValue[] {
        const valueCards: CardWithValue[] = []
        let _prefix: number
        let _suffix: number
        let _altCardType: CardType
        if (this.deckJoker.cardNumber == 1) {
            _prefix = 13
            _suffix = 2
        } else if (this.deckJoker.cardNumber == 13) {
            _prefix = 12
            _suffix = 1
        } else {
            _prefix = this.deckJoker.cardNumber - 1
            _suffix = this.deckJoker.cardNumber + 1
        }

        if (this.deckJoker.cardType === CardType.HEART) {
            _altCardType = CardType.DIAMOND
        } else if (this.deckJoker.cardType === CardType.SPADE) {
            _altCardType = CardType.CLUB
        } else if (this.deckJoker.cardType === CardType.CLUB) {
            _altCardType = CardType.SPADE
        } else {
            _altCardType = CardType.HEART
        }

        valueCards.push({
            cardNumber: _prefix,
            cardType: this.deckJoker.cardType,
            jokerType: JokerType.PREFIX
        })
        valueCards.push({
            cardNumber: this.deckJoker.cardNumber,
            cardType: this.deckJoker.cardType,
            jokerType: JokerType.MAAL
        })
        valueCards.push({
            cardNumber: _suffix,
            cardType: this.deckJoker.cardType,
            jokerType: JokerType.SUFFIX
        })
        valueCards.push({
            cardNumber: this.deckJoker.cardNumber,
            cardType: _altCardType,
            jokerType: JokerType.ULTER
        })
        valueCards.push({
            cardNumber: 0,
            cardType: CardType.DEFAULT_JOKER,
            jokerType: JokerType.JOKER
        })
        return valueCards
    }

    private getJokerMultiplierValue(_count: number): number {
        if (_count == 1) {
            return POINT_MAP[JokerType.JOKER].point
        } else if (_count == 2) {
            return 15
        } else if (_count == 3) {
            return 25
        }
        return 0
    }

    private getUlterMultiplierValue(_count: number): number {
        if (_count == 1) {
            return POINT_MAP[JokerType.JOKER].point
        } else if (_count == 2) {
            return 15
        } else if (_count == 3) {
            return 25
        }
        return 0
    }

    private getMaalMultiplierValue(_count: number): number {
        if (_count == 1) {
            return POINT_MAP[JokerType.MAAL].point
        } else if (_count == 2) {
            return 8
        }
        return 0
    }

    private getPrefixMultiplierValue(_count: number): number {
        if (_count == 1) {
            return POINT_MAP[JokerType.PREFIX].point
        } else if (_count == 2) {
            return 5
        } else if (_count == 3) {
            return 10
        }
        return 0
    }

    private getSuffixMultiplierValue(_count: number): number {
        if (_count == 1) {
            return POINT_MAP[JokerType.SUFFIX].point
        } else if (_count == 2) {
            return 5
        } else if (_count == 3) {
            return 10
        }
        return 0
    }

    private getPointValue(_card: CardWithValue, _cardCount?: number): number {
        if (!!_cardCount) {
            if (_card.jokerType == JokerType.JOKER) {
                console.log("JOKER +", this.getJokerMultiplierValue(_cardCount))
                return this.getJokerMultiplierValue(_cardCount)
            } else if (_card.jokerType == JokerType.ULTER) {
                console.log("ULTER +", this.getUlterMultiplierValue(_cardCount))
                return this.getUlterMultiplierValue(_cardCount)
            } else if (_card.jokerType == JokerType.MAAL) {
                console.log("MAAL +", this.getMaalMultiplierValue(_cardCount))
                return this.getMaalMultiplierValue(_cardCount)
            } else if (_card.jokerType == JokerType.PREFIX) {
                console.log("PREFIX +", this.getPrefixMultiplierValue(_cardCount))
                return this.getPrefixMultiplierValue(_cardCount)
            } else {
                console.log("SUFFIX +", this.getSuffixMultiplierValue(_cardCount))
                return this.getSuffixMultiplierValue(_cardCount)
            }
        } else {
            return POINT_MAP[_card.jokerType].point
        }
    }

    private isDeckJoker(_userCard: Card): boolean {
        return _userCard.cardNumber == this.deckJoker.cardNumber && _userCard.cardType == this.deckJoker.cardType
    }

    private isDefaultJoker(_userCard: Card): boolean {
        return _userCard.cardNumber == 0 && _userCard.cardType == CardType.DEFAULT_JOKER
    }

    private isPrefixJoker(_userCard: Card): boolean {
        if (this.deckJoker.cardNumber == 1) {
            return _userCard.cardNumber == 13 && _userCard.cardType == this.deckJoker.cardType
        } else {
            return _userCard.cardNumber == this.deckJoker.cardNumber - 1 && _userCard.cardType == this.deckJoker.cardType
        }
    }

    private isSuffixJoker(_userCard: Card): boolean {
        if (this.deckJoker.cardNumber == 13) {
            return _userCard.cardNumber == 1 && _userCard.cardType == this.deckJoker.cardType
        } else {
            return _userCard.cardNumber == this.deckJoker.cardNumber + 1 && _userCard.cardType == this.deckJoker.cardType
        }
    }

    private hasMarriage(_userCards: UserCard[], removeMarriageCard: boolean): boolean {
        let hasMarriage: boolean
        let hasDeckJoker: boolean = false
        let hasPrefix: boolean = false
        let hasSuffix: boolean = false
        let deckJokerCard: UserCard
        let prefixJokerCard: UserCard
        let suffixJokerCard: UserCard
        _userCards.forEach((userCard: UserCard) => {
            console.log("has marriage check card", userCard)
            if (!hasDeckJoker) {
                console.log("b: hasDeckJoker", hasDeckJoker)
                hasDeckJoker = this.isDeckJoker(userCard)
                console.log("hasDeckJoker", hasDeckJoker)
                if (hasDeckJoker) {
                    deckJokerCard = userCard
                }
            }
            if (!hasPrefix) {
                console.log("b: hasPrefix", hasPrefix)
                hasPrefix = this.isPrefixJoker(userCard)
                console.log("hasPrefix", hasPrefix)
                if (hasPrefix) {
                    prefixJokerCard = userCard
                }
            }
            if (!hasSuffix) {
                console.log("b: hasSuffix", hasSuffix)
                hasSuffix = this.isSuffixJoker(userCard)
                console.log("hasSuffix", hasSuffix)
                if (hasPrefix) {
                    suffixJokerCard = userCard
                }
            }
        })
        hasMarriage = hasDeckJoker && hasPrefix && hasSuffix
        // @ts-ignore
        if (hasMarriage && removeMarriageCard && !!deckJokerCard && !!prefixJokerCard && !!suffixJokerCard) {
            this.removeMarriageCards(deckJokerCard, prefixJokerCard, suffixJokerCard)
        }
        return hasMarriage
    }

    private removeCard(_card: UserCard) {
        this.calculateDeck = this.calculateDeck.filter(_cardTemp => {
            if (_cardTemp.cardNumber === _card.cardNumber && _cardTemp.cardType === _card.cardType) {
                if (_card.cardCount <= 1) {
                    return false
                } else {
                    const currentUserCard = this.calculateDeck.find(userCard =>
                        userCard.cardNumber === _card.cardNumber &&
                        userCard.cardType === _card.cardType
                    );
                    if (currentUserCard) {
                        currentUserCard.cardCount -= 1 // Decrease the cardCount by 1
                    }
                    return true
                }
            } else {
                return true
            }
        })
    }

    private removeMarriageCards(deckJokerCard: UserCard, prefixJokerCard: UserCard, suffixJokerCard: UserCard) {
        this.removeCard(deckJokerCard)
        this.removeCard(prefixJokerCard)
        this.removeCard(suffixJokerCard)
    }

    calculateAllValueCardsPoint(): number {
        let _total: number = 0
        this.getValueCards().forEach((valueCard) => {
            if (valueCard.jokerType == JokerType.JOKER) {
                _total += this.getJokerMultiplierValue(1)
            } else if (valueCard.jokerType == JokerType.ULTER) {
                _total += this.getUlterMultiplierValue(1)
            } else if (valueCard.jokerType == JokerType.MAAL) {
                _total += this.getMaalMultiplierValue(1)
            } else if (valueCard.jokerType == JokerType.PREFIX) {
                _total += this.getPrefixMultiplierValue(1)
            } else {
                _total += this.getSuffixMultiplierValue(1)
            }
        })
        return _total
    }

    //main function
    calculateUserValueCardsPoint(): number {
        let _totalPoints: number = 0
        let _hasMarriage: boolean = this.hasMarriage(this.calculateDeck, true)
        console.log("has marriage", _hasMarriage)
        if (_hasMarriage) {
            if (this.isFloorMarriage) {
                console.log("FLOOR MARRIAGE +", FLOOR_MARRIAGE_POINT)
                _totalPoints = FLOOR_MARRIAGE_POINT
            } else {
                console.log("MARRIAGE +", MARRIAGE_POINT)
                _totalPoints = MARRIAGE_POINT
            }
        }
        console.log("remaining deck before loop  = ", this.calculateDeck)
        this.calculateDeck.forEach((userCard: UserCard) => {
            if (userCard.cardCount == 3) {
                if (this.isFloorSetOfThree) {
                    console.log("FLOOR SET OF THREE +", FLOOR_SET_OF_THREE_POINT)
                    _totalPoints += FLOOR_SET_OF_THREE_POINT
                } else {
                    console.log("SET OF THREE +", SET_OF_THREE_POINT)
                    _totalPoints += SET_OF_THREE_POINT
                }
            } else {
                this.valueCards.forEach((valueCard: CardWithValue) => {
                    if (
                        userCard.cardNumber == valueCard.cardNumber &&
                        userCard.cardType == valueCard.cardType &&
                        userCard.cardCount > 0
                    ) {
                        _totalPoints += this.getPointValue(valueCard, userCard.cardCount)
                    }
                })
            }
        })
        return _totalPoints
    }

}
