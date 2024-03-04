import imgLogo from '../assets/logo.jpg'


export default function Header() {
    return (<div id='main-header'>
        <div id="title">
            <img src={imgLogo} />
            <h1 >REACTFOOD</h1>
        </div>
        <button>Cart</button>
    </div>)
}