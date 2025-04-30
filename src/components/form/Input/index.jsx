import styles from "./Input.module.css";

const Input = ({ type, text, name, placeholder, handleOnChange, value }) => {
    return (
        <fieldset className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <input 
                type={type} 
                name={name} 
                id={name} 
                placeholder={placeholder} 
                onChange={handleOnChange}
                value={value} 
            />
        </fieldset>
    );
}

export default Input;