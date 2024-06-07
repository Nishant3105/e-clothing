import ReactDOM from 'react-dom'


const ModalOverlay=(props)=>{
  return (
    <div>
        {props.children}
    </div>
  )
}

const Modal = (props) => {
  return (
    {ReactDOM.createPortal(<ModalOverlay/>,document.getElementById('modal-root'))}
  )
}

export default Modal