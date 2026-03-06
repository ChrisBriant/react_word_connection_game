const PopupMessage = ({title, children, onDismiss}) => {
    return (
        <div className="overlay">
            <div className="messageBox">
                <p className="title">{title}</p>
                {children}
                <button onClick={() => onDismiss()} >Close</button>
            </div>            
        </div>
    );
}

export default PopupMessage;