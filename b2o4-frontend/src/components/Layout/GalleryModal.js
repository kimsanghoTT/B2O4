import '../css/GalleryModal.css';

// 버튼을 열거나 닫을 때 동작
const GalleryModal = ({isOpen, onClose, children}) => {
    // isOpen이 false이면 아래 return() 을 보지않고
    // 함수 종료

    if(!isOpen){
        return null; // 아래 return() 에 있는 html 태그를 보여주지 않고 돌려보냄
    }

    return(
        <div className="gallery-modal-overlay">
            <div className="gallery-modal-content">
                <button className="gallery-modal-close" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    )

}

export default GalleryModal;