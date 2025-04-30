import { Link } from "react-router-dom";
import styles from "./ProjectCard.module.css";

import { BsPencil, BsFillTrashFill } from "react-icons/bs";

const ProjectCard = ({ id, name, budget, category, handleRemove }) => {
    const remove = ((e) => {
        e.preventDefault();
        handleRemove(id);
    });
    
    return (
        <li className={styles.projectCard} id={id}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento: </span> R${budget}
            </p>
            <p>
                <span className={`${styles[category.toLowerCase()]}`}></span> {category}
            </p>
            <div className={styles.projectCardActions}>
                <Link to={`/project/${id}`}>
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </li>
    );
}

export default ProjectCard;