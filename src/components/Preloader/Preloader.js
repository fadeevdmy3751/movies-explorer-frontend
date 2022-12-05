import './Preloader.css'

//todo фон добавить?

export default function Preloader({ isOpen }) {
  return (
    <>
      {isOpen && (
        <div className="preloader">
          <div className="preloader__container">
            <span className="preloader__round"/>
          </div>
        </div>
      )}
    </>
  );
}