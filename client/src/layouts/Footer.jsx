import style from '../assets/modules/Footer.module.css'
import logo from '../assets/logo-gallery/turquoise-circle-text.png'
import {Link} from 'react-router'
export default function Footer() {
    return (
        <div className={`${style.footer} container-fluid`}>
            <figure className={style.logo}>
                <img src={logo}/>
            </figure>
            <div className={style.links}>
                <Link className={style.a}  to="https://github.com/Leonardo-Corazzini" target="_blank">Leonardo Corazzini</Link>
                <Link className={style.a}  to="https://github.com/GiuliaMoiraghi10" target="_blank">Giulia Moiraghi</Link>
                <Link className={style.a}  to="https://github.com/AndreaPotenza3" target="_blank">Andrea Potenza</Link>
                <Link className={style.a}  to="https://github.com/eduardorocco" target="_blank">Eduardo Rocco</Link>
                <Link className={style.a}  to="https://github.com/VitaFrancesco" target="_blank">Francesco Vita</Link>
            </div>
        </div>
    )
}