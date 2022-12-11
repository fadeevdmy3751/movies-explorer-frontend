import './MessageBox.css';
import useEscapePress from '../../hooks/useEscapePress';

export default function MessageBox({onClose, status: {isOpen, successful, text}}) {

    function handleClickOverlay(e) {
        e.stopPropagation();
    }

    useEscapePress(onClose, isOpen);

    return (
        <div
            className={`message-box ${isOpen && 'message-box_opened'}`}
            onClick={onClose}
        >
            <div className="message-box__container" onClick={handleClickOverlay}>
                <div
                    className={`message-box__status ${
                        successful
                            ? 'message-box__status_success'
                            : 'message-box__status_fail'
                    }`}
                />
                <h2 className="message-box__title">{text}</h2>
                <button
                    type="button"
                    className="message-box__close-button"
                    onClick={onClose}
                />
            </div>
        </div>
    );
}
