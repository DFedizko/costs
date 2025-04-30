import styles from "./Select.module.css";

const Select = ({ text, name, options, handleOnChange, value }) => {
    return (
        <fieldset className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <select 
                name={name} 
                id={name} 
                onChange={handleOnChange} 
                value={value || ""}
            >
                <option disabled value="">Selecione uma opção</option>
                {options.map(option => <option key={option.id} value={option.id}>{option.name}</option> )}
            </select>
        </fieldset>
    );
}

export default Select;