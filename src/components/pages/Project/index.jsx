import { v4 as uuidv4 } from "uuid"

import styles from "./Project.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from "../../layout/Loading"
import ProjectForm from "../../project/ProjectForm";
import Message from "../../layout/Message";
import ServiceForm from "../../service/ServiceForm";
import ServiceCard from "../../service/ServiceCard";

const Project = () => {
    const { id } = useParams();

    const [project, setProject] = useState([]);
    const [services, setServices] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();
    const [showServiceForm, setShowServiceForm] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`)
            .then(res => res.json())
            .then(data => {
                setProject(data);
                setServices(data.services);
            })
            .catch(err => console.log(err));
        }, 300);
    }, [id]);

    const createService = async (project) => {
        setMessage("");

        // last service
        const lastService = project.services[project.services.length - 1];

        lastService.id = uuidv4();

        const lastServiceCost = lastService.cost;

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        if (newCost > parseFloat(project.budget)) {
            setMessage("Orçamento ultrapassado, verifique o valor do serviço");
            setType("error");
            project.services.pop();
            return false;
        }

        // add service cost to project total cost
        project.cost = newCost;

        // update project
        try {
            await fetch(`http://localhost:5000/projects/${project.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(project)
            });
            setShowServiceForm(false);
            // exibir os services
        } catch (error) {
            console.log(error);
        }
    }

    const toggleProjectForm = () => {
        setShowProjectForm(!showProjectForm);
    }

    const removeService = async (id, cost) => {
        const servicesUpdated = project.services.filter(service =>
            service.id !== id
        );

        const projectUpdated = project;
        projectUpdated.services = servicesUpdated;
        project.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

        try {
            await fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(projectUpdated)
            });
            setProject(projectUpdated);
            setServices(servicesUpdated);
            setType("success");
            setMessage("Serviço removido com sucesso!");
        } catch (error) {
            console.log(error);
        }
    }

    const toggleServiceForm = () => {
        setShowServiceForm(!showServiceForm);
    }
    
    const editPost = async (project) => {
        setMessage("");
        
        // budget validation
        if (project.budget < project.cost) {
            setMessage("O orçamento não pode ser maior que o custo do projeto!");
            setType("error");
            return false;
        }

        try {
            const res = await fetch(`http://localhost:5000/projects/${project.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(project)
            });

            const data = await res.json();
            setProject(data);
            setShowProjectForm(false);
            setMessage("Projeto atualizado!");
            setType("success");

        } catch (error) {
            console.log(error);
        }
    }

    return <>
        {project.name ?
            <div className={styles.projectContainer}>
                {message && <Message type={type} msg={message} />}
                <div className={styles.detailsContainer}>
                    <h1>{project.name}</h1>
                    <button onClick={toggleProjectForm} className={styles.btn}>
                        {!showProjectForm ? "Editar projeto" : "Fechar"}
                    </button>
                    {!showProjectForm ? 
                        <div className={styles.projectInfo}>
                            <p>
                                <span>Categoria: </span> {project.category.name}
                            </p>
                            <p>
                                <span>Total de Orçamento:</span> R${project.budget}
                            </p>
                            <p>
                                <span>Total Utilizado:</span> R${project.cost}
                            </p>
                        </div> 
                    : 
                        <div className={styles.projectInfo}>
                            <ProjectForm 
                                handleSubmit={editPost} 
                                btnText="Concluir edição" 
                                projectData={project} 
                            />
                        </div>
                    }
                </div>
                <div className={styles.serviceFormContainer}>
                    <h2>Adicione um serviço:</h2>
                    <button className={styles.btn} onClick={toggleServiceForm}>
                        {!showServiceForm ? "Adicionar serviço" : "Fechar"}
                    </button>
                    <div className={styles.projectInfo}>
                        {showServiceForm && 
                            <ServiceForm 
                                handleSubmit={createService}
                                textBtn="Adicionar Serviço"
                                projectData={project}
                            />
                        }
                    </div>
                </div>

                <h2>Serviços</h2>
                <ul className={styles.serviceContainer}>
                    {services.length > 0 ? 
                        services.map(service =>
                            <ServiceCard
                                id={service.id}
                                key={service.id}
                                name={service.name}
                                cost={service.cost}
                                description={service.description}
                                handleRemove={removeService}
                            />
                        )
                    :
                        <p>Não há serviços cadastrados.</p>
                    }
                </ul>
            </div>
        :
            <Loading className={styles.loading} />
        }
    </>;
}
 
export default Project;