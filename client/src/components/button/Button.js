import './button.css'

export default function Button({children , classes , clickEvent}) {
    return (
        <button className={`button ${classes}`} onClick={clickEvent}>{children}</button>
    )
}
