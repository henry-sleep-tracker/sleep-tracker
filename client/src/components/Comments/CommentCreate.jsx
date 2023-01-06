import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import CheckIcon from '@mui/icons-material/Check';
import { postComment } from '../../actions/Comments/postComment';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const PostComment = () => {

    const currentUser = useSelector((state) => state?.users.currentUser);

    const dispatch = useDispatch();

    let navigate = useNavigate();

    const [input, setInput] = useState({
        name: currentUser.names,
        rate: "",
        comment: "",
        id: currentUser.id

    })

    function handleChange(element) {

        setInput({
            ...input,
            [element.target.id]: element.target.value
        })
        console.log(input)
    }

    function handleSubmit(element) {
        try {
            element.preventDefault();
            dispatch(postComment(input))
            setInput({
                name: currentUser.names,
                rate: "",
                comment: "",
                id: currentUser.id,
            })
            console.log(input)
        } catch (error) { alert("Fatal Error.") }
        navigate('/private');
    }


    return (
        <Grid
            container
            justifyContent='center'
            direction='column'
            alignItems='center'
            spacing={3}
        >
            <Grid
                item
            >
                <Typography variant='h4'>Registrar comentario</Typography>
            </Grid>

            <Grid
                item
            >
                <Button
                    variant="outlined"
                    startIcon={<HomeIcon />}
                    href='/private'>
                    Inicio
                </Button>

            </Grid>

            <Grid
                item
            >

                <Card
                    variant='outlined'
                    elevation={20}
                >
                    <CardContent>

                        <Grid
                            container
                            justifyContent='center'
                            direction='column'
                            alignItems='center'
                            spacing={3}
                        >

                            <Grid
                                item
                            >
                                <TextField
                                    value={(input.objetivos)}
                                    id='rate'
                                    label="Puntuacion"
                                    type='text'
                                    variant="outlined"
                                    onChange={(element) => handleChange(element)}
                                />

                            </Grid>

                            <Grid
                                item
                            >
                                <TextField
                                    value={(input.objetivosGenerales)}
                                    id='comment'
                                    label="Comentario"
                                    type='text'
                                    variant="outlined"
                                    onChange={(element) => handleChange(element)}
                                />

                            </Grid>

                            <Grid
                                item
                            >
                                <Button
                                    variant="contained"
                                    startIcon={<CheckIcon />}
                                    types='submit'
                                    onClick={(element) => handleSubmit(element)}
                                >
                                    Enviar
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
    )
}

export default PostComment;