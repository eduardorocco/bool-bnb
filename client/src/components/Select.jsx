import { useField } from "formik";

const Select = ({ label, ...props }) => {
    const [field, meta] = useField(props)

    return (
        <div className="formComponents">
            <label>{label}<span> &#42;</span></label>
            <select {...props} {...field} className={meta.touched && meta.error ? "inputError" : ""} >
                <option value="" >Scegli</option>
                <option value="apartment" >Appartamento</option>
                <option value="room" >Stanza</option>
                <option value="villa" >Villa</option>
                <option value="loft" >Loft</option>
                <option value="chalet" >Chalet</option>
            </select>
            {meta.touched && meta.error && <div className="error">{meta.error}</div>}
        </div>
    )
}

export default Select