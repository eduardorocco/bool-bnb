import { useField } from "formik";
import style from '../assets/modules/Input.module.css'
const CustomTextarea = ({ label, ...props }) => {
    const [field, meta] = useField(props)

    return (
        <div className="formComponents">
            <label>{label}<span> &#42;</span></label>
            <textarea {...props} {...field} className={`${style.classic} ${meta.touched && meta.error ? 'input_error' : ''}`} />
            {meta.touched && meta.error && <div className={`error ${style.error}`}>{meta.error}</div>}
        </div>
    )
}

export default CustomTextarea