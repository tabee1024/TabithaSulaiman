function PlaceholderBox({ label = "Visual placeholder", size = "default" }) {
    return (
        <div className={`placeholder-box placeholder-box-${size}`} aria-label={label}>
            <div className="placeholder-browser-bar" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className="placeholder-screen" aria-hidden="true">
                <div></div>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}

export default PlaceholderBox;