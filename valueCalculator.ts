// const card_numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13]
// const card_types = ['heart', 'spade', 'club', 'diamond']
// const card_colors = ['red', 'black']

enum JokerType {
    JOKER,
    ULTER,
    MAAL,
    PREFIX,
    SUFFIX
}
enum CardType {
    HEART,
    DIAMOND,
    SPADE,
    CLUB,
    DEFAULT_JOKER
}
type Card = {
    card_number: number;
    card_type: CardType;
}
type UserCard = Card & {card_count: number}
type PointMap = {
    name: JokerType, point: number
}
type CardWithValue = Card & {joker_type: JokerType}

const pointMap: PointMap[] = [
    {name: JokerType.JOKER, point: 5},
    {name: JokerType.ULTER, point: 5},
    {name: JokerType.MAAL, point: 3},
    {name: JokerType.PREFIX, point: 2},
    {name: JokerType.SUFFIX, point: 2}
]
const MARRIAGE_POINT = 10
const FLOOR_MARRIAGE_POINT = 15
const SET_OF_THREE_POINT = 10
const FLOOR_SET_OF_THREE_POINT = 15
const IS_FLOOR_MARRIAGE = true
const IS_FLOOR_SET_OF_THREE = true
const deckJoker:Card = {card_number: 3, card_type: CardType.HEART}
const userCards:UserCard[] = [
    {card_number: 2, card_type: CardType.HEART, card_count: 1},
    {card_number: 3, card_type: CardType.HEART, card_count: 1},
    {card_number: 4, card_type: CardType.HEART, card_count: 3}
]
function getValueCards(_deckJoker: Card):CardWithValue[] {
    const valueCards:CardWithValue[] = []
    let _prefix: number
    let _suffix: number
    let _altCardType: CardType
    if (_deckJoker.card_number == 1) {
        _prefix = 13
        _suffix = 2
    } else if (_deckJoker.card_number == 13) {
        _prefix = 12
        _suffix = 1
    } else {
        _prefix = _deckJoker.card_number - 1
        _suffix = _deckJoker.card_number + 1
    }

    if (_deckJoker.card_type === CardType.HEART) {
        _altCardType = CardType.DIAMOND
    } else if (_deckJoker.card_type === CardType.SPADE) {
        _altCardType = CardType.CLUB
    } else if (_deckJoker.card_type === CardType.CLUB) {
        _altCardType = CardType.SPADE
    } else {
        _altCardType = CardType.HEART
    }

    valueCards.push({
        card_number: _prefix,
        card_type: _deckJoker.card_type,
        joker_type: JokerType.PREFIX
    })
    valueCards.push({
        card_number: _deckJoker.card_number,
        card_type: _deckJoker.card_type,
        joker_type: JokerType.MAAL
    })
    valueCards.push({
        card_number: _suffix,
        card_type: _deckJoker.card_type,
        joker_type: JokerType.SUFFIX
    })
    valueCards.push({
        card_number: _deckJoker.card_number,
        card_type: _altCardType,
        joker_type: JokerType.ULTER
    })
    valueCards.push({
        card_number: 0,
        card_type: CardType.DEFAULT_JOKER,
        joker_type: JokerType.JOKER
    })
    return valueCards
}

function getJokerMultiplierValue(_count: number): number {
    if (_count == 1) {
        return pointMap[JokerType.JOKER].point
    } else if (_count == 2) {
        return 15
    } else if (_count == 3) {
        return 25
    }
    return 0
}

function getUlterMultiplierValue(_count: number): number {
    if (_count == 1) {
        return pointMap[JokerType.JOKER].point
    } else if (_count == 2) {
        return 15
    } else if (_count == 3) {
        return 25
    }
    return 0
}

function getMaalMultiplierValue(_count: number): number {
    if (_count == 1) {
        return pointMap[JokerType.MAAL].point
    } else if (_count == 2) {
        return 8
    }
    return 0
}

function getPrefixMultiplierValue(_count: number): number {
    if (_count == 1) {
        return pointMap[JokerType.PREFIX].point
    } else if (_count == 2) {
        return 5
    } else if (_count == 3) {
        return 10
    }
    return 0
}

function getSuffixMultiplierValue(_count: number): number {
    if (_count == 1) {
        return pointMap[JokerType.SUFFIX].point
    } else if (_count == 2) {
        return 5
    } else if (_count == 3) {
        return 10
    }
    return 0
}

function getPointValue(_card: CardWithValue, _cardCount?: number): number {
    if(!!_cardCount) {
        if (_card.joker_type == JokerType.JOKER) {
            console.log("JOKER +5")
            return getJokerMultiplierValue(_cardCount)
        } else if (_card.joker_type == JokerType.ULTER) {
            console.log("ULTER +5")
            return getUlterMultiplierValue(_cardCount)
        } else if (_card.joker_type == JokerType.MAAL) {
            console.log("MAAL +3")
            return getMaalMultiplierValue(_cardCount)
        } else if (_card.joker_type == JokerType.PREFIX) {
            console.log("PREFIX +2")
            return getPrefixMultiplierValue(_cardCount)
        } else {
            console.log("SUFFIX +2")
            return getSuffixMultiplierValue(_cardCount)
        }
    } else {
        return pointMap[_card.joker_type].point
    }
}

function calculateAllValueCardsPoint(_valueCards: CardWithValue[]): number {
    let _total: number = 0
    valueCards.forEach((valueCard)=> {
        if (valueCard.joker_type == JokerType.JOKER) {
            _total += getJokerMultiplierValue(1)
        } else if (valueCard.joker_type == JokerType.ULTER) {
            _total += getUlterMultiplierValue(1)
        } else if (valueCard.joker_type == JokerType.MAAL) {
            _total += getMaalMultiplierValue(1)
        } else if (valueCard.joker_type == JokerType.PREFIX) {
            _total += getPrefixMultiplierValue(1)
        } else {
            _total += getSuffixMultiplierValue(1)
        }
    })
    return _total
}

function isDeckJoker(_userCard: Card): boolean {
    return _userCard.card_number == deckJoker.card_number && _userCard.card_type == deckJoker.card_type
}

function isPrefixJoker(_userCard: Card): boolean {
    return _userCard.card_number == deckJoker.card_number - 1 && _userCard.card_type == deckJoker.card_type
}

function isSuffixJoker(_userCard: Card): boolean {
    return _userCard.card_number == deckJoker.card_number + 1 && _userCard.card_type == deckJoker.card_type
}
function hasMarriage(_userCards: Card[]): boolean {
    let hasDeckJoker: boolean = false
    let hasPrefix: boolean = false
    let hasSuffix: boolean = false
    _userCards.forEach((userCard: Card)=> {
        if (!hasDeckJoker) {
            hasDeckJoker = isDeckJoker(userCard)
        }
        if (!hasPrefix) {
            hasPrefix = isPrefixJoker(userCard)
        }
        if (!hasSuffix) {
            hasSuffix = isSuffixJoker(userCard)
        }
    })
    return hasDeckJoker && hasPrefix && hasSuffix
}

function calculateUserValueCardsPoint(_valueCards: CardWithValue[], _userCards: UserCard[]): number {
    let _totalPoints: number = 0
    let _hasMarriage: boolean = hasMarriage(_userCards)
    if (_hasMarriage) {
        if (IS_FLOOR_MARRIAGE) {
            console.log("FLOOR MARRIAGE +", FLOOR_MARRIAGE_POINT)
            _totalPoints = FLOOR_MARRIAGE_POINT
        } else {
            console.log("MARRIAGE +", MARRIAGE_POINT)
            _totalPoints = MARRIAGE_POINT
        }
    }
    _userCards.forEach((userCard: UserCard)=> {
        console.log(userCard)
        if (userCard.card_count == 3) {
            if (IS_FLOOR_SET_OF_THREE) {
                console.log("FLOOR SET OF THREE +", FLOOR_MARRIAGE_POINT)
                _totalPoints += FLOOR_SET_OF_THREE_POINT
            } else {
                console.log("SET OF THREE +", FLOOR_MARRIAGE_POINT)
                _totalPoints += SET_OF_THREE_POINT
            }
        } else {
            _valueCards.forEach((valueCard: CardWithValue)=> {
                if (_hasMarriage) {
                    if (!isDeckJoker(userCard) && !isPrefixJoker(userCard) && !isSuffixJoker(userCard)) {
                        if (
                            userCard.card_number == valueCard.card_number &&
                            userCard.card_type == valueCard.card_type &&
                            userCard.card_count < 3
                        ) {
                            _totalPoints += getPointValue(valueCard, userCard.card_count)
                        }
                    }
                } else {
                    if(
                        userCard.card_number == valueCard.card_number &&
                        userCard.card_type == valueCard.card_type &&
                        userCard.card_count < 3
                    ) {
                        _totalPoints += getPointValue(valueCard, userCard.card_count)
                    }
                }
            })
        }
    })
    return _totalPoints
}
const valueCards: CardWithValue[] = getValueCards(deckJoker)
const allValueCardsTotalPoints = calculateAllValueCardsPoint(valueCards)
console.log(allValueCardsTotalPoints)
const totalPoints = calculateUserValueCardsPoint(valueCards, userCards)
console.log(totalPoints)
