import { useState } from "react"
import { generateQuizQuestions } from "./components/utils.jsx";
import { StartingScreen } from "./components/StartingScreen.jsx";
import { QuizScreen } from "./components/QuizScreen.jsx";
import { ChooseTopicScreen } from "./components/ChooseTopicScreen.jsx";

export function App () {
    //? States
    const [screen, setScreen] = useState("starting");
    const [quizzes, setQuizzes] = useState();
    const [userAnswer, setUserAnswer] = useState();
    const [playerCorrectAnswer, setPlayerCorrectAnswer] = useState("");

    async function generateQuizQuestionsFromPromise (topic, numberOfQuestion) {
        const data = await generateQuizQuestions(numberOfQuestion, topic);
        setQuizzes(data);
        setUserAnswer(() => Array(Number(numberOfQuestion)).fill(""));
        setPlayerCorrectAnswer("");
        setScreen("quiz");
    };

    const handleChangeScreen = (setTo) => {
        setScreen(setTo);
    };

    const handleMultipleChoiceClick = (quizIndex, choiceIndex) => {
        setUserAnswer(prev => {
            const prevCopy = JSON.parse(JSON.stringify(prev));
            prevCopy[quizIndex] = choiceIndex;
            return prevCopy;
        });
    };
    
    const handleCheckAnswerButtonClick = (event) => {
        event.preventDefault();
        setPlayerCorrectAnswer(() => {
            let rightAnswerCount = 0;
            quizzes.forEach((quiz, index) => {
                if (quiz.rightAnswer === userAnswer[index]) rightAnswerCount++;
            });
            return rightAnswerCount;
        });
    };

    const returnScreen = (screen) => {
        if (screen === "starting") {
            return (
                <StartingScreen handleStartButtonClick = {handleChangeScreen} />
            )
        } else if (screen === "topic-screen") {
            return (
                <ChooseTopicScreen handleChooseTopicButton = {generateQuizQuestionsFromPromise}/>
            )
        } else if (screen === "quiz") {
            return (
                <QuizScreen 
                    quizzes = {quizzes} 
                    userAnswer = {userAnswer}
                    handleMultipleChoiceClick = {handleMultipleChoiceClick}
                    handleCheckAnswerButtonClick = {handleCheckAnswerButtonClick}
                    playerCorrectAnswer = {playerCorrectAnswer} 
                    handleResetButtonClick = {handleChangeScreen}
                />
            )
        };
    };

    return (
        <main className = "container">
            {returnScreen(screen)}
        </main>
    )
}
