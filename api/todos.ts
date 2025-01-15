import { NextApiResponse, NextApiRequest } from "next";
import { Todo } from "@/types";

let todos : Todo[] = [
    {id:1, title:"Learn Next.js", completed:false},
    {id:2, title:"Build a Todo App", completed:false},
]

export default function handler(req:NextApiRequest, res:NextApiResponse)
{
    if(req.method === "GET"){
        res.status(200).json(todos);
    }
    else if(req.method=="POST"){
        const {title} = req.body;
        if(!title)
        {
            res.status(400).json({error:"Title is required"});
        }
        const newTodo = {id: Date.now(), title, completed:false};
        todos.push(newTodo);
        res.status(201).json(newTodo);
    }
    else if(req.method=="DELETE"){
        const {id} = req.query;
        todos = todos.filter((todo)=>todo.id!==Number(id));
        res.status(204).end();
    }
    else{
        res.status(405).json({error:"Method not allowed"});
    }
}
