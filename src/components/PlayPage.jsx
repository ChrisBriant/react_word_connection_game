import { useEffect, useState } from "react";
import { connWithApiKey, getRequest, postRequest } from "../network/connections";
import LoadingWidget from "./LoadingWidget";
import { filterToLowercaseLetters, checkAlphabeticCharactersOnly } from "../utils/utils";
import ScoreWidget from "./ScoreWidget";
import ScoreCoOpWidget from "./ScoreCoOpWidget";

const PlayPage = (props) => {
    //console.log("PLAY PAGE", props)
    const [loading,setLoading] = useState(true);
    const [networkError, setNetworkError] = useState(false);
    const [wordData,setWordData] = useState([]);
    const [errorMessages,setErrorMessages] = useState([]);
    const [clueWord,setClueWord] = useState("");
    const [guessResponse,setGuessResponse] = useState(null);
    const [score,setScore] = useState({
        "human" : 0,
        "computer" : 0,
        "overall" : 0,
        "round" : 1,
        "totalRounds" : 5,
    });
    const [newTurn, setNewTurn] = useState(false);
    const [clue, setClue] = useState("");
    const [clueId,setClueId] = useState(null);
    const [clueWordCount, setClueWordCount] = useState(0);

    useEffect(() => {
        //Make call to API
        // setTimeout(() => {
        console.log("Using Effect");

        // },3000)
        if(props.player == "human") {
            // getRequest("/getwordselection", connWithApiKey).then((data) => {
            //     console.log("DATA FROM ENDPOINT", data);
            //     setWordData(data);
            //     setLoading(false);
                
            // }).catch(err => {
            //     console.log("NETWORK ERROR", err);
            //     setLoading(false);
            //     setNetworkError(true);
            // });
            //FIX the data for now
            setWordData([
                    {
                        "id": 1436,
                        "word": "laugh",
                    },
                    {
                        "id": 236,
                        "word": "highway",
                    },
                    {
                        "id": 1031,
                        "word": "devil",
                    },
                    {
                        "id": 1066,
                        "word": "cloud",
                    },
                    {
                        "id": 613,
                        "word": "design",
                    },
                    {
                        "id": 125,
                        "word": "education",
                    },
                    {
                        "id": 1335,
                        "word": "chemical",
                    },
                    {
                        "id": 916,
                        "word": "routine",
                    },
                    {
                        "id": 1110,
                        "word": "fault",
                    }
            ]);
            setLoading(false);
        } else {
            postRequest("/generatewordsandclue", connWithApiKey).then((data) => {
                console.log("DATA FROM ENDPOINT", data);
                setLoading(false);
            }).catch(err => {
                console.log("NETWORK ERROR", err);
                setLoading(false);
                setNetworkError(true);
                
            });
        }

    },[]);

    const getWordsAndClue = () => {
        postRequest("/generatewordsandclue", connWithApiKey).then((data) => {
            console.log("DATA FROM ENDPOINT", data);
            setClue(data.clue);
            setClueId(data.clue_id);
            setClueWordCount(data.number_of_selected_words);
            setWordData(data.words);
            setLoading(false);
        }).catch(err => {
            console.log("NETWORK ERROR", err);
            setLoading(false);
            setNetworkError(true);
            
        });
    }


    const handleNavigateToStart = () => {
        console.log("PROPS", props)
        props.setPlayer(null);
        props.setPage("start");
    }

    const toggleSelected = (word) => {
        //Get the selected word count for comparison
        const selectedWordCount = wordData.filter((w) => w.selected).length
        console.log("CLICKED WORD", word);
        let newWordData = [...wordData];
        const updateWord = newWordData.find((el) => el.id === word.id);
        if(clueWordCount && word.selected) {
            updateWord.selected = false;
        }
        
        if(clueWordCount && !word.selected && selectedWordCount < clueWordCount ) {
            updateWord.selected = true;
        } 
            
        if(!clueWordCount)    {
            updateWord.selected = !word.selected;
        }

        
        //Needs to update the word list
        console.log("NEW WORD DATA", newWordData);
        setWordData(newWordData);
    }

    const _handleSendClueToAi = async () => {
        //Check that the entered word is not empty and is not part of the word list
        console.log("Clue Word is ", clueWord);
        setErrorMessages([]);

        //Check the word is alphabetic characters only
        if(!checkAlphabeticCharactersOnly(clueWord)) {
            setErrorMessages(["The word must be a single word and only contain letters"]);
            return;
        }


        const formattedClueWord = filterToLowercaseLetters(clueWord);
        
        console.log("FORMATTED CLUE WORD", formattedClueWord);

        if(formattedClueWord.length < 2) {
            setErrorMessages([
                "The clue word must have at least 2 letters",
                "The clue word must be a single word containing only letters",
            ]);
            return;
        }

        //Plain words in array - check if the clue is in the list of words
        const listOfWords = wordData.map((word) => { return word.word });
        console.log("This is the list of words", listOfWords);
        if(listOfWords.includes(formattedClueWord)) {
            setErrorMessages(["The clue word must NOT be one of the words below."]);
            return;
        }

        //Word is okay so now we prepare the data to send to the endpoint
        const wordCount = wordData.filter(word => word.selected === true).length;
        //User must select one word
        if(wordCount < 1) {
            setErrorMessages(["At least one word must be selected"]);
            return;
        }
        const payload = {
            "clue" : formattedClueWord, 
            "number_of_selected_words" : wordCount,
            "words" : wordData.map((word) => { return {"id" : word.id, "word" : word.word} })
        }

        console.log("PAYLOAD", payload);
        setLoading(true);
        // postRequest("/guessselection",connWithApiKey,payload).then((res) => {
        //     console.log("RESPONSE", res);
        //     setLoading(false);
        // }).catch((err) => {
        //     console.error("Eror", err);
        //     setErrorMessages(["An error occurred guessing the word."]);
        //     setLoading(false);
        // });

        //Fix the response for now
        const res =            {
                "clue": "funny",
                "number_of_selected_words": 1,
                "words": [
                    {
                        "id": 1436,
                        "word": "laugh",
                        "selected": true
                    },
                    {
                        "id": 236,
                        "word": "highway",
                        "selected": true
                    },
                    {
                        "id": 1031,
                        "word": "devil",
                        "selected": false
                    },
                    {
                        "id": 1066,
                        "word": "cloud",
                        "selected": false
                    },
                    {
                        "id": 613,
                        "word": "design",
                        "selected": false
                    },
                    {
                        "id": 125,
                        "word": "education",
                        "selected": false
                    },
                    {
                        "id": 1335,
                        "word": "chemical",
                        "selected": false
                    },
                    {
                        "id": 916,
                        "word": "routine",
                        "selected": false
                    },
                    {
                        "id": 1110,
                        "word": "fault",
                        "selected": false
                    }
                ]
            }
        setGuessResponse(
            res
        );
        //Calculate the score
        // const newScore = {...score};
        // if(props.player === "human") {
        //     console.log("HUMAN SELECTION", wordData );
        //     console.log("COMPUTER SELECTION", res.words);
        //     const selectedIds1 = wordData
        //     .filter(item => item.selected)
        //     .map(item => item.id);

        //     const selectedIds2 = res.words
        //     .filter(item => item.selected)
        //     .map(item => item.id);

        //     const isMatch =
        //     selectedIds1.length === selectedIds2.length &&
        //     selectedIds1.every(id => selectedIds2.includes(id));

        //     console.log("IS MATCH", isMatch);
        //     if(isMatch) {
        //         newScore.human = score.human + wordCount;
        //         console.log("NEW SCORE IS", newScore);
        //     }
        //     setScore(newScore);

        // } else {

        // }

        //CHANGE TO A COOPERATIVE FOCUSED SCORE SYSTEM
                    console.log("HUMAN SELECTION", wordData );
            console.log("COMPUTER SELECTION", res.words);
        const newScore = {...score};
        //Check matched words
        const selectedIds1 = wordData
        .filter(item => item.selected)
        .map(item => item.id);

        const selectedIds2 = res.words
        .filter(item => item.selected)
        .map(item => item.id);

        const isMatch =
        selectedIds1.length === selectedIds2.length &&
        selectedIds1.every(id => selectedIds2.includes(id));
        if(isMatch) {
            newScore.overall = score.overall + wordCount; 
            
        }
        console.log("IS MATCH", isMatch);
        //increment the round
        newScore.round = score.round + 1; 
        setScore(newScore);
        setNewTurn(true);
        setLoading(false);
    }

    const _handleSwapPlayer = () => {
        setLoading(true);
        if(props.player === "human") {
            props.setPlayer("computer");
            getWordsAndClue();
            setNewTurn(false);
        } else {
            props.setPlayer("human");
            setNewTurn(false);
        }
    }

    return (
        <div id="playPage">
            {
                loading
                ? <LoadingWidget />
                : <>
                    {
                        networkError
                        ?  <div id="networErrorDisplay">
                            <h1>A Network Error Occurred</h1>
                            <button onClick={() => handleNavigateToStart() } >Home</button>
                        </div>

                        
                        : <div className="gameArea">
                            {
                                props.player === "human"
                                ? <>
                                    <h1>PLAY</h1>
                                    <ScoreCoOpWidget score={score} />
                                    <p>Select any number of the words below for and enter a linking word which matches these words.</p>
                                    <p>Click "Send" to let the AI guess.</p>
                                    <div className={errorMessages.length > 0 ? "errorMessages active" : "errorMessages"}>
                                        <div className="messages">
                                            {
                                                errorMessages.map((message) => (
                                                    <p className="error">{message}</p>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="typeWord">
                                        <label htmlFor="wordInput">Linking Word</label>
                                        <input id="wordInput" type="text" onChange={(evt) => { setClueWord(evt.target.value);}} value={clueWord}  />
                                    </div>
                                    <div className="wordsContainer">
                                        {
                                            wordData.map((word) => (
                                                <div key={word.idx} className={word.selected ? "wordCard selected" : "wordCard"} id={word.idx} onClick={() => toggleSelected(word)} >
                                                    <p  >{word.word}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    {
                                        newTurn
                                        ? <div className="actionButton">
                                            <button onClick={() => _handleSwapPlayer()}>Next</button>
                                        </div>
                                        : <div className="actionButton">
                                            <button onClick={() => _handleSendClueToAi()}>Send</button>
                                        </div>
                                    }
                                </>
                                :<>
                                    <h1>PLAY AI TURN</h1>
                                    <ScoreCoOpWidget score={score} />
                                    <p>Select any number of the words below for and enter a linking word which matches these words.</p>
                                    <p>Click "Send" to let the AI guess.</p>
                                    <div className={errorMessages.length > 0 ? "errorMessages active" : "errorMessages"}>
                                        <div className="messages">
                                            {
                                                errorMessages.map((message) => (
                                                    <p className="error">{message}</p>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="clueArea">
                                        <div className="heading col">
                                            <p>Clue</p>
                                        </div>
                                        <div className="clue">
                                            <p>{clue}</p>
                                        </div>
                                    </div>
                                    <p>Select {clueWordCount} words that match the clue</p>
                                    <div className="wordsContainer">
                                        {
                                            wordData.map((word) => (
                                                <div key={word.idx} className={word.selected ? "wordCard selected" : "wordCard"} id={word.idx} onClick={() => toggleSelected(word)} >
                                                    <p  >{word.word}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </>
                            }

                        </div>
                        
                        
                    }
                </> 
            }
        </div>
    )
}

export default PlayPage;