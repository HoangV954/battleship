import { AiFillGithub } from "react-icons/ai";
import './footer.scss'

export default function Footer() {
    return (
        <div className='footer-bar'>
            <div className="footer-bar__text">Made by Hoang Vu at</div>
            <a href="https://github.com/HoangV954"><AiFillGithub fill="white" /></a>
        </div>
    )
}