import loading from "../../../img/loading.svg";

import styles from "./Loading.module.css";

const Loading = ({ className }) => {
    return (
        <div className={`${styles.loaderContainer} ${className}`}>
            <img className={styles.loader} src={loading} alt="Loading" />
        </div>
    );
}

export default Loading