import {createPortal} from "react-dom";
import {ReactElement} from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children: ReactElement | ReactElement[]
}

export default function Modal(props: Props) {
    if (!props.isOpen) {
        return null
    }
    return createPortal(
        <div className="modal-background">
            <div className="modal">

                {props.children}
                <button onClick={props.onClose}>&times;</button>
            </div>
        </div>,
        document.body
    )
}