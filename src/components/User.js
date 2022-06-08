import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Container, Paper} from "@mui/material";
import {useEffect, useState} from "react";
import Button from '@mui/material/Button';

export default function User() {
    const paperStyle = {
        padding: '50px 20px',
        width: 600,
        margin: '20px auto'
    }
    const[user_name, setName] = useState('')
    const[user_age, setAge] = useState('')
    const[result, setResult] = useState('')
    const[users, setUsers] = useState([])
    const handleClick = (e) => {
        e.preventDefault()
        const user = {user_name, user_age}
        fetch("/user/add", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(user)
        }).then(() => {
                setResult('Пользователь успешно добавлен!')
                setTimeout(()=> {setResult('')}, 3000)
            })
    }
    useEffect(()=>{
        fetch("/user/all")
            .then(res => res.json())
            .then((resul)=>{setUsers(resul)})
    }, [])
    const refresh = (e) => {
        e.preventDefault()
        fetch("/user/all")
            .then(res => res.json())
            .then((resul)=>{setUsers(resul)})
    }

    return (
        <Container>
            <Paper elevation = {3} style = {paperStyle}>
                <p style={{color: 'green', fontSize: '16pt'}}>{result}</p>
                <h1>Добавление юзера</h1>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" label="Имя пользователя" variant="outlined" fullWidth
                value = {user_name}
                onChange = {(e) => setName(e.target.value)}
            />
            <TextField id="outlined-basic" label="Возраст пользователя" variant="outlined" fullWidth
                value = {user_age}
                onChange={(e) => setAge(e.target.value)}
            />
        </Box>
                <Button variant="contained" onClick={handleClick}>Добавить!</Button>
            </Paper>
            <h1>Пользователи</h1>
        <Paper elevation={3} style={paperStyle}>
            <Button variant="contained" onClick={refresh}>Обновить список</Button>
            {users.map(user => (
            <Paper elevation={5} style={{margin: '10px', padding: '15px', textAlign:'left'}} key ={user.user_id}>
                Id: {user.user_id} <br/>
                Имя: {user.user_name} <br/>
                Возраст: {user.user_age} <br/>
            </Paper>
            ))}
        </Paper>
        </Container>
    );
}
