const ScoreWidget = (props) => {

    return (
        <div className="scoreDisplay">
            <h2>Score</h2>
            <div className="scoreContainer">
                <div className="row">
                    <p>Human: </p>
                    <p>{props.score.human}</p>
                </div>
                <div className="row">
                    <p>Computer: </p>
                    <p>{props.score.computer}</p>
                </div>
            </div>

        </div>
    );

}

export default ScoreWidget;