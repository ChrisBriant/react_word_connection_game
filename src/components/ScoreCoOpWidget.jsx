//Scoring for game with co-operative score scheme

import goldMedal from '../assets/gold_medal.png';
import silverMedal from '../assets/silver_medal.png';
import bronzeMedal from '../assets/bronze_medal.png';

const ScoreCoOpWidget = (props) => {
    return (
        <div className="scoreDisplay">
            <h2>Score</h2>
            <div className="scoreContainer">
                <div id="pointsSection" className='col'>
                    <div className="row">
                        <p>Points: </p>
                        <p>{props.score.overall}</p>
                    </div>
                    <div className="row">
                        <p>Round: </p>
                        <p>{props.score.round} / {props.score.totalRounds} </p>
                    </div>
                </div>

                <div className="col">
                    <div className="goal row">
                        <p>25 Points or Above</p>
                        <div className="goalImage">
                            <img src={goldMedal} alt="gold medal graphic" />
                        </div>
                    </div>
                    <div className="goal row">
                        <p>18 Points or Above</p>
                        <div className="goalImage">
                            <img src={silverMedal} alt="silver medal graphic" />
                        </div>
                    </div>
                    <div className="goal row">
                        <p>12 Points or Above</p>
                        <div className="goalImage">
                            <img src={bronzeMedal} alt="bronze medal graphic" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScoreCoOpWidget;