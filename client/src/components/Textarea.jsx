import { useField } from "formik";

const CustomTextarea = ({ label, ...props }) => {
    const [field, meta] = useField(props)

    return (
        <div className="formComponents">
            <label>{label}<span> &#42;</span></label>
            <textarea {...props} {...field} className={meta.touched && meta.error ? "inputError" : ""} />
            {meta.touched && meta.error && <div className="error">{meta.error}</div>}
        </div>
    )
}

export default CustomTextarea