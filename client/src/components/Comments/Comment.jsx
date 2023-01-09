import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import { postComment } from '../../actions/Comments/postComment';
import { deleteComment } from '../../actions/Comments/deleteComment';
import { getCurrentComment } from '../../actions/Comments/getCurrentComment';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import { Helmet } from 'react-helmet';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const CreateComment = () => {

    const currentUser = useSelector((state) => state?.users.currentUser);

    const dispatch = useDispatch();

    let navigate = useNavigate();

    /* eslint-disable */
    useEffect(() => {
        dispatch(getCurrentComment(currentUser.id))
    }, [dispatch])
    /* eslint-disable */

    let currentComment = useSelector((state) => state.currentComment);

    let [currentCommentState, setCurrentCommentState] = useState('Opine sobre su experiencia con la aplicacion:')

    // const [currentCommentState, setCurrentCommentState] = useState('')

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
        } catch (error) { alert("Fatal Error.") }
        navigate('/private');

    }

    function handleDelete(element) {
        try {
            dispatch(deleteComment(element))
            setCurrentCommentState('Opine sobre su experiencia con la aplicacion:')
        } catch (error) { }
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

            <Helmet>
                <title>Comentario | Sleep Tracker</title>
            </Helmet>

            <Grid
                item
            >
                <Typography
                    variant='h4'
                >
                    Registrar comentario
                </Typography>
            </Grid>

            <Grid
                item
            >
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIosNewIcon />}
                    href='/private/profile'
                >
                    Regresar
                </Button>
            </Grid>

            <Grid
                item
            >
                {
                    (currentComment.data) ?
                        <Typography
                            variant='h5'
                        >
                            {currentComment.data.comment}
                        </Typography>
                        :
                        <Typography
                            variant='h5'
                        >
                            {currentCommentState}
                        </Typography>
                }
            </Grid>


            <Grid
                item
            >
                {
                    !currentComment.data ?
                        <Button variant="outlined" disabled>
                            Eliminar comentario previo
                        </Button>
                        :
                        <Button
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            color='error'
                            onClick={() => handleDelete(currentUser.id)}
                        // href='/private'
                        >
                            Eliminar comentario previo
                        </Button>

                }
            </Grid>

            <Grid
                item
            >

                <Card
                    variant='outlined'
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

export default CreateComment;