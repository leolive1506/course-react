import { RepositoryItem } from "./RepositoryItem";
import '../styles/repositories.scss'
import { useEffect, useState } from "react";

interface Repository {
    name: string;
    description: string;
    html_url: string
}

export function RepositoryList() {
    const [repositories, setRepositories] = useState<Repository[]>([])
    // como vai fazer chamada api, demora um pouco p retornar dados. Por isso armazenar no state, ja que quando a pag terminar de carregar não vai ter os dados em si, assim que carregar o component é atualizado

    useEffect(() => {
        fetch('https://api.github.com/orgs/rocketseat/repos')
            .then(res => res.json())
            .then(data => setRepositories(data))
    }, [])


    return (
        <section className="repository-list">
            <h1>Lista de repositórios</h1>

            <ul>
                {repositories.map(repository => <RepositoryItem key={repository.name} repository={repository} />)}
            </ul>
        </section>
    )
}