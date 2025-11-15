export function StartingScreen (props) {
    return (
        <section className = "starting-screen">
            <h1>Quizzical</h1>
            <p>Try out this game if you are not dumb!</p>
            <button onClick = {() => props.handleStartButtonClick("topic-screen")} type = "button">Start the quiz!</button>
        </section>
    )
}