import style from '../assets/modules/Loader.module.css';
export default function Loader() {
    return (
        <div className={style.loader}>

            <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className={style.wheel_and_hamster}>
                <div className={style.wheel}></div>
                <div className={style.hamster}>
                    <div className={style.hamster__body}>
                        <div className={style.hamster__head}>
                            <div className={style.hamster__ear}></div>
                            <div className={style.hamster__eye}></div>
                            <div className={style.hamster__nose}></div>
                        </div>
                        <div className={`${style.hamster__limb} ${style.hamster__limb__fr}`}></div>
                        <div className={`${style.hamster__limb} ${style.hamster__limb__fl}`}></div>
                        <div className={`${style.hamster__limb} ${style.hamster__limb__br}`}></div>
                        <div className={`${style.hamster__limb} ${style.hamster__limb__bl}`}></div>
                        <div className={style.hamster__tail}></div>
                    </div>
                </div>
                <div className={style.spoke}></div>
            </div>

        </div>
    )
}