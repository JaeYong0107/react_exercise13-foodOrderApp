import imgLogo from '../assets/logo.jpg'


export default function Header({ onOpen, count }) {
    return (<div id='main-header'>
        <div id="title">
            <img src={imgLogo} />
            <h1 >REACTFOOD</h1>
        </div>
        <button className='text-button' onClick={onOpen}>{`Cart (${count})`}</button>
    </div>)
}