import { Box, Button, Card, CardContent, Grid, Paper, Rating, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { postComment } from "../../actions/Comments/postComment";
import { deleteComment } from "../../actions/Comments/deleteComment";
import { getCurrentComment } from "../../actions/Comments/getCurrentComment";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { Helmet } from "react-helmet";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { message } from "react-message-popup";
import { makeStyles } from "@mui/styles";

const CreateComment = () => {
    const currentUser = useSelector((state) => state?.users.currentUser);

    const dispatch = useDispatch();

    let navigate = useNavigate();

    /* eslint-disable */
    useEffect(() => {
        dispatch(getCurrentComment(currentUser.id));
    }, [dispatch]);
    /* eslint-disable */

    let currentComment = useSelector((state) => state.currentComment);

    let [currentCommentState, setCurrentCommentState] = useState(
        "Opine sobre su experiencia con la aplicacion:"
    );

    // const [currentCommentState, setCurrentCommentState] = useState('')

    const [input, setInput] = useState({
        name: currentUser.names,
        rate: "",
        comment: "",
        id: currentUser.id,
    });

    function handleChangeComment(element) {

        setInput({
            ...input,
            [element.target.id]: element.target.value
        })
    }

    function handleChangeRate(element) {

        setInput({
            ...input,
            rate: element.target.defaultValue
        })
        console.log(input)
    }

    function handleSubmit(element) {
        try {
            element.preventDefault();
            dispatch(postComment(input));
            setInput({
                name: currentUser.names,
                rate: "",
                comment: "",
                id: currentUser.id,
            });
        } catch (error) {
            message.error("Fatal Error.", 2500);
        }
        navigate("/private/home");
    }

    function handleDelete(element) {
        try {
            dispatch(deleteComment(element));
            setCurrentCommentState("Opine sobre su experiencia con la aplicacion:");
        } catch (error) { }
        navigate("/private/home");
    }

    const classes = useStyles();

    return (
        <Paper
            className={classes.paperWraper}>

            <Grid
                container
                justifyContent="center"
                direction="column"
                alignItems="center"
                spacing={3}
            >
                <Helmet>
                    <title>Comentario | Sleep Tracker</title>
                </Helmet>

                <Grid item>
                    <Typography
                        variant="h2"
                        fontWeight='bold'
                        paddingTop={5}
                    >
                        Registrar comentario
                    </Typography>
                </Grid>

                <Grid item>
                    {currentComment.data ? (
                        <Box>
                            <Typography variant='h5'>Comentario anterior:</Typography>
                            <Typography variant="h6">{currentComment.data.comment}</Typography>
                            <Typography variant='h5'><Rating name="read-only" value={currentComment.data.rate} readOnly size='small' /></Typography>
                        </Box>
                    ) : (
                        <Typography variant="h5">{currentCommentState}</Typography>
                    )}
                </Grid>

                <Grid item>
                    {!currentComment.data ? (
                        <Button variant="outlined" disabled>
                            Eliminar comentario previo
                        </Button>
                    ) : (
                        <Button
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            color="error"
                            onClick={() => handleDelete(currentUser.id)}
                        // href='/private'
                        >
                            Eliminar comentario previo
                        </Button>
                    )}
                </Grid>

                <Grid item>
                    <Card variant="outlined">
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
                                    <Typography
                                        variant='h5'
                                    >
                                        Puntuacion:
                                    </Typography>
                                    {
                                        currentComment.data ?
                                            <Rating
                                                id='rate'
                                                size="large"
                                                name="simple-controlled"
                                                disabled
                                            />
                                            :
                                            <Rating
                                                id='rate'
                                                size="large"
                                                name="simple-controlled"
                                                onChange={element => handleChangeRate(element)}
                                            />
                                    }
                                </Grid>

                                <Grid
                                    item
                                >
                                    {
                                        currentComment.data ?
                                            <TextField
                                                id='comment'
                                                label="Comentario"
                                                type='text'
                                                variant="outlined"
                                                multiline
                                                rows={4}
                                                disabled
                                            />
                                            :
                                            <TextField
                                                inputProps={{ maxLength: 60 }}
                                                id='comment'
                                                label="Comentario"
                                                type='text'
                                                variant="outlined"
                                                multiline
                                                rows={4}
                                                onChange={(element) => handleChangeComment(element)}
                                            />
                                    }
                                </Grid>

                                <Grid item>
                                    {
                                        input.rate ?
                                            <Button
                                                variant="contained"
                                                startIcon={<CheckIcon />}
                                                types="submit"
                                                onClick={(element) => handleSubmit(element)}
                                            >
                                                Enviar
                                            </Button>
                                            :
                                            <Button
                                                variant="contained"
                                                startIcon={<CheckIcon />}
                                                types="submit"
                                                disabled
                                            >
                                                Enviar
                                            </Button>
                                    }
                                </Grid>
                            </Grid>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Paper>

    );
};

export default CreateComment;

const useStyles = makeStyles(() => ({
    paperWraper: {
        minHeight: '100vh'
    }
}));
