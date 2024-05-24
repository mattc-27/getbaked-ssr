
const Carousel = ({ recipes }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex - 1 < 0 ? recipes.length - 1 : prevIndex - 1
        );
    }
    const handleNextClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 === recipes.length ? 0 : prevIndex + 1
        );
    }
    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className='carousel'  >
            <div className="recipe-card">
                <div className='recipe-card-content'>
                    <img
                        className='recipe-card-img'
                        key={currentIndex}
                        src={recipes[currentIndex].image}
                    />
                    <div
                        className='recipe-card-title'
                    >
                        <h1>{recipes[currentIndex].title}</h1>
                    </div>
                </div>
            </div>
            <div className="slide_direction">

                <div className="indicator">
                    {recipes.map((_, index) => (
                        <div
                            key={index}
                            className={`dot ${currentIndex === index ? "active" : ""}`}
                            onClick={() => handleDotClick(index)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}