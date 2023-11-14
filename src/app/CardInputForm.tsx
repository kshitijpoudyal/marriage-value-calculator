import React, {useState, FormEvent} from 'react';
import {Card, CardType, UserCard} from "@/app/ValueCalculator";

export interface CardFormData {
    cardNumber: number;
    cardType: number;
    cardCount?: number;
}

interface CardFormProps {
    onSubmit: (deckJoker: Card, cardData: UserCard[]) => void;
}

const CardForm: React.FC<CardFormProps> = ({onSubmit}) => {
    const [cards, setCards] = useState<CardFormData[]>([
        { cardNumber: 0, cardType: 0, cardCount: 1 },
    ]);

    const [deckJokerCard, setDeckJokerCard] = useState<CardFormData>(
        { cardNumber: 10, cardType: CardType.HEART }
    );

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const formattedDeckJokerCard: Card = {
            cardNumber: deckJokerCard.cardNumber,
            cardType: deckJokerCard.cardType as CardType
        };
        const formattedCards: UserCard[] = cards.map(card => ({
            cardNumber: card.cardNumber,
            cardType: card.cardType as CardType,
            cardCount: card.cardCount ?? 0
        }));
        console.log("kcp");
        console.log(deckJokerCard);
        console.log(formattedCards);
        onSubmit(formattedDeckJokerCard, formattedCards);
    };

    const handleDeckJokerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setDeckJokerCard({
            ...deckJokerCard,
            [e.target.name]: e.target.name === 'cardNumber' || e.target.name === 'cardType' ? parseInt(e.target.value) : e.target.value
        });
    };

    const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.name === 'cardCount' || e.target.name === 'cardNumber' || e.target.name === 'cardType' ? parseInt(e.target.value) : e.target.value;
        const newCards = cards.map((card, i) =>
            i === index ? { ...card, [e.target.name]: value } : card
        );
        setCards(newCards);
    };

    const addCard = () => {
        setCards([...cards, { cardNumber: 0, cardType: CardType.HEART, cardCount: 1 }]);
    };

    const removeCard = (index: number) => {
        const newCards = cards.filter((_, i) => i !== index);
        setCards(newCards);
    };

    return (
        <form onSubmit={handleSubmit} >
            <h3 className="mb-3">Deck Joker</h3>
            <div className="mb-3">
                <label className="form-label">
                    Card Number:
                    <input
                        type="number"
                        name="cardNumber"
                        value={deckJokerCard.cardNumber}
                        onChange={handleDeckJokerChange}
                    />
                </label>
                <label className="form-label">
                    Card Type:
                    <select
                        name="cardType"
                        value={deckJokerCard.cardType}
                        onChange={handleDeckJokerChange}
                    >
                        <option value={CardType.HEART}>Heart</option>
                        <option value={CardType.DIAMOND}>Diamond</option>
                        <option value={CardType.SPADE}>Spade</option>
                        <option value={CardType.CLUB}>Club</option>
                    </select>
                </label>
            </div>
            <h3 className="mb-3">User Cards</h3>
            {cards.map((card, index) => (
                <div key={index} className="mb-3">
                    <div className="mb-3">
                        <label className="form-label">
                            Card Number:
                            <input
                                type="number"
                                name="cardNumber"
                                value={card.cardNumber}
                                onChange={handleChange(index)}
                            />
                        </label>
                        <label className="form-label">
                            Card Type:
                            <select
                                name="cardType"
                                value={card.cardType}
                                onChange={handleChange(index)}
                            >
                                <option value={CardType.HEART}>Heart</option>
                                <option value={CardType.DIAMOND}>Diamond</option>
                                <option value={CardType.SPADE}>Spade</option>
                                <option value={CardType.CLUB}>Club</option>
                            </select>
                        </label>
                        <label className="form-label">
                            Card Count:
                            <input
                                type="number"
                                name="cardCount"
                                value={card.cardCount}
                                onChange={handleChange(index)}
                            />
                        </label>

                    {cards.length > 1 && (
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => removeCard(index)}>
                            &#10005; {/* X icon */}
                        </button>
                    )}
                    </div>
                </div>
            ))}
            <div>
                <button type="button" className="btn btn-primary me-2" onClick={addCard}>
                    &#43; {/* Plus icon */}
                </button>
            </div>
            <div>
                <button type="submit" className="btn btn-success">Submit</button>
            </div>
        </form>
    );
}

export default CardForm;