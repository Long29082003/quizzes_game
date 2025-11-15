import { useState } from "react";
export function ChooseTopicScreen(props) {
    const [questionCount, setQuestionCount] = useState(5);
    
    const sliderStyles = {
        left: `${(questionCount - 4) / 16.5 * 100}%`,
    };

    const sliderInputChange = (event) => {
        const value = event.currentTarget.value;
        setQuestionCount(value);
    }

    return (
        <section className = "topic-screen">
            <h1 id = "text-before-slider">Choose a number of quiz:</h1>
            <div className = "slider-container">
                <input 
                    id = "slider"
                    type = "range"
                    min = {5}
                    max = {20}
                    step = {1}
                    defaultValue = {5}
                    onInput = {sliderInputChange}
                />
                <div id = "selector" style = {sliderStyles}>{questionCount}</div>
            </div>
            
            <h1>Choose a topic:</h1>
            <div className = "topic-button-container">
                <button className = "topic-button" onClick = {() => props.handleChooseTopicButton("general-knowledge", questionCount)}>General knowledge</button>
                <button className = "topic-button" onClick = {() => props.handleChooseTopicButton("film", questionCount)}>Film</button>
                <button className = "topic-button" onClick = {() => props.handleChooseTopicButton("music", questionCount)}>Music</button>
                <button className = "topic-button" onClick = {() => props.handleChooseTopicButton("video-game", questionCount)}>Video game</button>
                <button className = "topic-button" onClick = {() => props.handleChooseTopicButton("mathematics", questionCount)}>Mathematics</button>
                <button className = "topic-button" onClick = {() => props.handleChooseTopicButton("history", questionCount)}>History</button>
                <button className = "topic-button" onClick = {() => props.handleChooseTopicButton("animal", questionCount)}>Animal</button>
            </div>
        </section>
    )
}