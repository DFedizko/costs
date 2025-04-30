import styles from "./SubmitButton.module.css";

const SubmitButton = ({ text }) => {
    return (
        <fieldset>
            <button className={styles.btn}>{text}</button>
        </fieldset>
    );
}

export default SubmitButton;