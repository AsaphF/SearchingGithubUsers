import { validateLocaleAndSetLanguage } from "typescript"

interface GithubUser {
    id: number,
    login: string,
    name:string,
    bio:string,
    public_repos: number,
    repos_url:string
}

let userList: Array<GithubUser> = []

interface GithubUserRepo {
    name:string,
    description:string,
    fork: boolean,
    stargazers_count:string
}

let userListRepos: Array<GithubUserRepo> = []



const requestButton = document.getElementById("requestUser")
requestButton?.addEventListener("click", getUSer)

function getUSer():void{
    
    let userName = prompt("Qual o nome do usuário que deseja pesquisar?")
    let urlGit = `https://api.github.com/users/${userName}`

        fetch(urlGit)
        .then((response) =>{
            if(response.ok){
            response.json()
            .then((data) =>{
                const githubUser: GithubUser = {
                    id: data.id,
                    login: data.login,
                    name: data.name,
                    bio: data.bio,
                    public_repos: data.public_repos,
                    repos_url: data.repos_url
                }
                userList.push(githubUser)
                console.log(githubUser)
            })
            }else{
            console.log({message: "Not Found"}) 
            }
        })
}


const infoReposButtons = document.getElementById("infoReposButtons")
infoReposButtons?.addEventListener("click", userInfo)

function userInfo():void {
    let userName = prompt("Qual o nome do usuário que deseja pesquisar?")  
    if(userList.length === 0){
        alert("É preciso pesquisar o usuário antes das informações.")
    }else{
        for(let user of userList){
            if(user.login === userName){
                fetch(user.repos_url)
                    .then(response => response.json())
                    .then(reposData =>{
                        for (let i = 0; i < reposData.length; i++){
                            let userRepos: GithubUserRepo = {
                                name: reposData[i].name,
                                description: reposData[i].description,
                                fork: reposData[i].fork,
                                stargazers_count: reposData[i].stargazers_count
                            }
                            userListRepos.push(userRepos)
                        }
    
                        console.log(userListRepos)
                    });
            }else{
            alert( "Nome do usuário não encontrado!");
            }
        }
    } 
}

const allUsersButtons = document.getElementById("allUsers")
allUsersButtons?.addEventListener("click", allUsers)

function allUsers():void {
    if(userList.length === 0){
        alert("É preciso ter usuários cadastrados antes das informações.")
    }else{
            console.log(userList)
    }
}


const sumReposButtons = document.getElementById("sumRepo")
sumReposButtons?.addEventListener("click", sumRepo)

function sumRepo():void{
    if(userList.length === 0){
        alert("É preciso pesquisar o usuário antes das informações.")
    }else{
       let sumArray: number[] = []
        for (let i = 0; i < userList.length; i++){
            sumArray.push(userList[i].public_repos)
        }
        const initialValue = 0;
        const sum = sumArray.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            initialValue
        );

        console.log(`A soma total do repositórios é de ${sum}`)
    }
}

const topUserListButton = document.getElementById("topUserList")
topUserListButton?.addEventListener("click", topUsers)

function topUsers():void{
    let repoArray: number[] = []
    if(userList.length === 0){
        alert("É preciso pesquisar o usuário antes das informações.")
    }else{
       userList.forEach(user =>{
        repoArray.push(user.public_repos)
       })   
    }

    repoArray.sort(function(a, b) {
        return a - b;
      })
    
    console.log(repoArray)
}