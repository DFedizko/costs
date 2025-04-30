import styles from "./NewProject.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import ProjectForm from "../../project/ProjectForm";
import Message from "../../layout/Message";

const NewProject = () => {
    const [message, setMessage] = useState();
    const navigate = useNavigate();

    const createPost = (project) => {

        if (!project.name.trim() || !project.budget || project.budget <= 0 || !project.category) {
            setTimeout(() => {
                setMessage("Por favor preencha todos os campos com valores válidos!");
            }, 0);
            setMessage("");
            return;
        }

        // initialize cost and services
        project.cost = 0;
        project.services = [];

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
        .then(() => {
            //redirect
            const state = { message: "Projeto criado com sucesso!" };
            navigate("/projects", {state});
        })
        .catch(err => console.log(err));
    }

    return (
        <div className={styles.new_project_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar seus serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
            {message && <Message type="error" msg={message} />}
        </div>
    );
}

export default NewProject;