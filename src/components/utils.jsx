//? Find a way to get all the data back. The issue seems to be requesting too many API at the same time
import { nanoid } from "nanoid";
const categoriesId = {
    "general-knowledge": "&category=9",
    "film": "&category=11",
    "music": "&category=12",
    "video-game": "&category=15",
    "mathematics": "&category=19",
    "history": "&category=23",
    "animal": "&category=27",
};

export const generateQuizQuestions = async (numberOfQuestion, category) => {
    const apiLink = `https://opentdb.com/api.php?amount=${numberOfQuestion}${categoriesId[category]}`;
    const res = await fetch(apiLink);
    const data = await res.json();
    const quizzes = data["results"];
    //Merge correct answer in a quiz with incorrect ones
    quizzes.forEach(quiz => {
        quiz["incorrect_answers"].splice(Math.floor(Math.random() * quiz["incorrect_answers"].length), 0, quiz["correct_answer"])
    });

    const returnedQuizQuestions = await quizzes.map(quiz => {
        return {
            id: nanoid(),
            difficulty: quiz.difficulty,
            question: quiz.question,
            answers: quiz["incorrect_answers"],
            rightAnswer: quiz["incorrect_answers"].findIndex(answer => answer === quiz["correct_answer"])
        };
    });
    
    return returnedQuizQuestions;
};
