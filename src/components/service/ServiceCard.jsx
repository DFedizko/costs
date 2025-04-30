import { BsFillTrashFill } from "react-icons/bs";
import styles from "../project/ProjectCard/ProjectCard.module.css";

const ServiceCard = ({ id, name, cost, description, handleRemove }) => {
    const remove = (e) => {
        e.preventDefault();
        handleRemove(id, cost);
    }
    
    return (
        <li className={styles.projectCard}>
            <h4>{name}</h4>
            <p>
                <span>Custo total:</span> R${cost}
            </p>
            <p>{description}</p>
            <div className={styles.projectCardActions}>
                <button onClick={remove}>
                    <BsFillTrashFill />
                    Excluir
                </button>
            </div>
        </li>
    );
}

export default ServiceCard;