const LoadingWidget = (props) => {
  return (
    <div className="spin-container">
        <div className="spinner"></div>
        {
          props.message
          ? <p className="center-text">{ props.message }</p>
          : <p className="center-text">Loading, please wait...</p>
        }
    </div>
  );
}

export default LoadingWidget;