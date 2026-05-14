import "../style/Loading.scss";

const Loading = () => {
    return (
        <div className="loading-screen">
            <div className="loader"></div>

            <h2 className="loading-title">
                Loading your data...
            </h2>

            <p className="loading-subtitle">
                Please wait while we prepare everything for you
            </p>
        </div>
    );
};

export default Loading;