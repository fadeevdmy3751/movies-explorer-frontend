import './InfoTooltip.css';
import useEscapePress from '../../hooks/useEscapePress';

export default function InfoTooltip({onClose, status: {isOpen, successful, text}}) {
    function handleClickOverlay(e) {
        e.stopPropagation();
    }

//todo оценить дизайн и может заменить вовсе
    useEscapePress(onClose, isOpen);

    return (
        <div
            className={`info-tooltip ${isOpen && 'info-tooltip_opened'}`}
            onClick={onClose}
        >
            <div className="info-tooltip__container" onClick={handleClickOverlay}>
                <div
                    className={`info-tooltip__status ${
                        successful
                            ? 'info-tooltip__status_success'
                            : 'info-tooltip__status_fail'
                    }`}
                />
                <h2 className="info-tooltip__title">{text}</h2>
                <button
                    type="button"
                    className="info-tooltip__close-button"
                    onClick={onClose}
                />
            </div>
        </div>
    );
}
