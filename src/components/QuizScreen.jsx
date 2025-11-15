import { useEffect, useRef } from "react";
import { clsx } from "clsx";
import { decode } from "html-entities";
import Confetti from "react-confetti";

//? Check answer sometimes does not work
export function QuizScreen (props) {
    //? Derived state
    const isAllChoosen = props.userAnswer.every(answer => Number.isInteger(answer));
    const isGameOver = props.playerCorrectAnswer ? true : false;
    const isAllCorrect = props.playerCorrectAnswer === props.quizzes.length;
    
    //? Reference
    const submitButton = useRef(null);

    useEffect(() => {
        if (isAllChoosen) submitButton.current.scrollIntoView({behavior: "smooth", container: "nearest"});
    }, [isAllChoosen]);

    const quizzesJSX = props.quizzes.map((quiz, quizIndex) => {
        const choosenAnswer = props.userAnswer[quizIndex];
        const choiceJSX = quiz.answers.map((choice, choiceIndex) => {
            return (
                <div className = {clsx("choice", choiceIndex === choosenAnswer ? "picked" : "unpicked")}>
                    <input 
                        type = "radio" 
                        name = {`quiz-${quizIndex}`} 
                        value = {choice} 
                        onClick = {() => props.handleMultipleChoiceClick(quizIndex, choiceIndex)} 
                        disabled = {isGameOver}/>
                    <p>{decode(choice)}</p>
                </div>
            );
        });

        const choiceWithAnswerJSX = quiz.answers.map((choice, choiceIndex) => {
            const isPicked = choiceIndex === choosenAnswer;
            return (
                <div className = {clsx("choice", isPicked && quiz.rightAnswer !== choiceIndex && "wrong", quiz.rightAnswer === choiceIndex && "right")}>
                    <input 
                        type = "radio" 
                        name = {`quiz-${quizIndex}`} 
                        value = {choice} 
                        onClick = {() => props.handleMultipleChoiceClick(quizIndex, choiceIndex)} 
                        disabled = {isGameOver}
                    />
                    <p>{decode(choice)}</p>
                </div>
            )
        })

        return (
            <fieldset className = "quiz">
                <div className = "question-container">
                    <span className = {clsx("difficulty-label", quiz.difficulty)}>{quiz.difficulty}</span>
                    <legend className = "quiz-question">{decode(quiz.question)}</legend>
                </div>
                <div className = {`multiple-choice-container${isGameOver ? " gameover" : ""}`}>
                    {isGameOver ? choiceWithAnswerJSX : choiceJSX}
                </div>
                <hr></hr>
            </fieldset>
        )
    })

    const displayCheckOrResetButtons = () => {
        if (isGameOver) {
            return (
                <div className = "result-announce">
                    <p>You got <u>{props.playerCorrectAnswer}</u> out of {props.quizzes.length} quizzes</p>
                    <div className = "reset-button-container">
                        <button 
                            className = "reset-button" 
                            type = "button" 
                            onClick = {() => props.handleResetButtonClick("topic-screen")}
                        >Reset the quiz</button>
                    </div>
                </div>
            )
        }

        if (isAllChoosen) {
            return (
                <button 
                    type = "submit" 
                    className = "check-answer-button"
                    onClick = {props.handleCheckAnswerButtonClick}
                    ref = {submitButton}
                >Check your answer</button> 
            )
        } 
    }

    return (
        <section className = "quiz-screen">
            {isAllCorrect && <Confetti numberOfPieces = {400} recycle = {false}/>}
            <form className = "quiz-form">
                {quizzesJSX}
                {displayCheckOrResetButtons()}
            </form>
        </section>
    )
}