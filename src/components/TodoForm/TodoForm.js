import React from 'react';

// Material UI
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Stack} from "@mui/material";

// Formik
import {useFormik} from "formik";

// Validation
import * as yup from 'yup';
import {addPost} from "../../redux/actions/posts";
import {useDispatch} from "react-redux";
import useAppContext from "../../hooks/useAppContext";

const validationSchema = yup.object({
    title: yup
        .string('Enter your title')
        .required('Title is required'),
});

const TodoForm = () => {
    const { setTabValue } = useAppContext();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            title: ''
        },
        validationSchema,
        onSubmit: ({title}) => {
            setTabValue(1)
            dispatch(addPost({
                post: {
                    id: Math.random() + Date.now().toLocaleString(),
                    title
                }
            }))
        },
    });

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, width: '25ch'},
            }}
            autoComplete="off"
            onSubmit={formik.handleSubmit}
        >
            <div>
                <Stack spacing={2} direction="row" alignItems="flex-start" justifyContent="center">
                    <TextField
                        name="title"
                        value={formik.values.title}
                        label="Title"
                        id="outlined-size-small"
                        size="small"
                        onChange={formik.handleChange}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                    />
                    <Button disabled={!formik.values.title} variant="contained" color="success" type="submit" style={{
                        margin: "8px"
                    }}>Create a Point</Button>
                </Stack>
            </div>
        </Box>
    );
}

export default TodoForm;

// Through Formik component
// import React, {useEffect, useState} from 'react';
//
// // Material UI
// import {Button} from "@mui/material";
//
// // Formik
// import {Formik, Form, Field} from "formik"
//
// const validateText = value => !value ? 'Required' : '';
//
// const TodoForm = () => {
//
//     const submitHandler = values => {
//         console.log(values)
//     }
//
//     return (
//         <Formik
//             initialValues={{
//                 title: '',
//             }}
//             onSubmit={submitHandler}
//         >
//             {
//                 ({errors, touched}) => (
//                     <Form>
//                         <Field name="title" type="text" id="outlined-size-small" size="small" validate={validateText}/>
//                         {errors.title && touched.title && (
//                             <div>{errors.title}</div>
//                         )}
//                         <Button variant="contained" color="success" type="submit">Create a Point</Button>
//                     </Form>
//                 )
//             }
//         </Formik>
//     );
// }
//
// export default TodoForm;