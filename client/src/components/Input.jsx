import { useField } from "formik"
import style from '../assets/modules/Input.module.css'
const Input = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
        <div className={style.input}>
            <label>{label}</label>
            <input {...props} {...field} className={`${style.classic} ${meta.touched && meta.error ? 'input_error' : ''}`} />
            {meta.touched && meta.error && <div className={`error ${style.error_text}`}>{meta.error}</div>}
        </div>
    )
}

export default Input