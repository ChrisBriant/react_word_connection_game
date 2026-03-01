import titleImage from '../assets/splash_screen_graphic.jpg'




const StartPage = (props) => {
    const startGame = (player) => {
        props.setPlayer(player);
        props.setPage("play");
    }


    return (
        <div id="startPage">
            <div className="splash">
                <div className="img-container title-img">
                    <img src={titleImage} alt="Chains of Thought" />
                </div>
                <div className="title">
                    <h1>Chains of Thought</h1>
                </div>
                
            </div>
            <div className="selectPlayerContainer">
                <div id="selectPlayer">
                    <h2>Who goes first?</h2> 
                    <div className="buttonGroup">
                        <button  onClick={() => startGame("human")}>Human</button>
                        <button  onClick={() => startGame("computer")}>Computer</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default StartPage;