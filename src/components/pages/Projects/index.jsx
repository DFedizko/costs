import { useLocation } from "react-router";
import { useState, useEffect } from "react";

import Message from "../../layout/Message";
import LinkButton from "../../layout/LinkButton";
import ProjectCard from "../../project/ProjectCard";
import Loading from "../../layout/Loading";

import styles from "./Projects.module.css";

const Projects = () => {
    const [projetcs, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState("");

    const BASE_URL = "http://localhost:5000/projects";

    const location = useLocation();
    let message = "";

    if (location.state) message = location.state.message;

    useEffect(() => {
        setTimeout(() => {
            fetch(BASE_URL)
            .then(res => res.json())
            .then(data => {
                setProjects(data);
                setRemoveLoading(true);
            })
            .catch(e => console.log(e));
        }, 1 * 1000);
    }, []);

    const removeProject = async (id) => {
        try {
            await fetch(`${BASE_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setProjects(projetcs.filter(project => {
                return project.id !== id;
            }));
            setProjectMessage("Projeto removido com sucesso!");
        } catch (error) {
            console.log(error);
        }
    } 

    return (
        <section className={styles.projectsSection}>
            <div className={styles.titleContainer}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/new-project" text="Criar Projeto" />
            </div>

            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}

            {!removeLoading && <Loading />}

            <ul className={styles.cardContainer}>
                {projetcs.length > 0 &&
                    projetcs.map(project => (
                        <ProjectCard 
                            key={project.id}
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            handleRemove={removeProject}
                        />
                    ))
                }
            </ul>

            {removeLoading && projetcs.length === 0 && (
                <p>Não há projetos cadastrados!</p>
            )}
        </section>
    );
}

export default Projects;