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

    // const CardInputField = ({ label, type, name, value, onChange }) => (
    //     <div className="col">
    //         <label className="form-label">
    //             {label}:
    //             {type === 'select' ? (
    //                 <select
    //                     name={name}
    //                     className="form-select"
    //                     value={value}
    //                     onChange={onChange}
    //                 >
    //                     <option value={CardType.HEART}>Heart</option>
    //                     <option value={CardType.DIAMOND}>Diamond</option>
    //                     <option value={CardType.SPADE}>Spade</option>
    //                     <option value={CardType.CLUB}>Club</option>
    //                 </select>
    //             ) : (
    //                 <input
    //                     type={type}
    //                     name={name}
    //                     className="form-control"
    //                     value={value}
    //                     onChange={onChange}
    //                 />
    //             )}
    //         </label>
    //     </div>
    // );

    return (
        <form onSubmit={handleSubmit} className="container mt-4">
            <h3 className="mb-3">Deck Joker</h3>
            <div className="row mb-3">
                <div className="col">
                    <label className="form-label">
                        Card Number:
                        <input
                            type="number"
                            name="cardNumber"
                            className="form-control"
                            value={deckJokerCard.cardNumber}
                            onChange={handleDeckJokerChange}
                        />
                    </label>
                </div>
                <div className="col">
                    <label className="form-label">
                        Card Type:
                        <select
                            name="cardType"
                            className="form-select"
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
            </div>

            <h3 className="mb-3">User Cards</h3>
            {cards.map((card, index) => (
                <div key={index} className="row mb-3">
                    <div className="col">
                        <label className="form-label">
                            Card Number:
                            <input
                                type="number"
                                name="cardNumber"
                                className="form-control"
                                value={card.cardNumber}
                                onChange={handleChange(index)}
                            />
                        </label>
                    </div>
                    <div className="col">
                        <label className="form-label">
                            Card Type:
                            <select
                                name="cardType"
                                className="form-select"
                                value={card.cardType}
                                onChange={handleChange(index)}
                            >
                                <option value={CardType.HEART}>Heart</option>
                                <option value={CardType.DIAMOND}>Diamond</option>
                                <option value={CardType.SPADE}>Spade</option>
                                <option value={CardType.CLUB}>Club</option>
                            </select>
                        </label>
                    </div>
                    <div className="col">
                        <label className="form-label">
                            Card Count:
                            <input
                                type="number"
                                name="cardCount"
                                className="form-control"
                                value={card.cardCount}
                                onChange={handleChange(index)}
                            />
                        </label>
                    </div>
                    {cards.length > 1 && (
                        <div className="col-auto">
                            <button type="button" className="btn btn-danger btn-sm mt-4" onClick={() => removeCard(index)}>
                                &#10005; {/* X icon */}
                            </button>
                        </div>
                    )}
                </div>
            ))}
            <div className="my-3">
                <button type="button" className="btn btn-primary me-2" onClick={addCard}>
                    &#43; {/* Plus icon */}
                </button>
                <button type="submit" className="btn btn-success">Submit</button>
            </div>
        </form>

    );
}

export default CardForm;