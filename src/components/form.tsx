import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Button, Container, Snackbar, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { IUser } from "../../interfaces"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Form = () => {

    const { hash } = useLocation()
    const [name, setName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [fieldError, setFieldError] = useState<{ [key: string]: string }>({})
    const [open, setOpen] = useState<boolean>(false)

    const navigate = useNavigate()

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (!name || name.length < 4) {
            setFieldError({
                name: 'Name field is required and must be atleast 4 character'
            })
            return
        }
        if (!phoneNumber || !/^[0-9]{10}$/.test(phoneNumber)) {
            setFieldError({
                phone: 'Phone field is required'
            })
            return
        }
        // eslint-disable-next-line no-useless-escape
        if (!email || !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/.test(email)) {
            setFieldError({
                email: 'Email field is required'
            })
            return
        }
        setFieldError({})
        try {
            const user: IUser = {
                name, phoneNumber, email
            }
            const userJSON = JSON.stringify(user)
            localStorage.setItem('currentUser', '')
            localStorage.setItem('currentUser', userJSON)
            setOpen(true)
            setTimeout(() => {
                navigate("/second-page")
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (hash) {
            setOpen(true)
            setTimeout(() => {
                navigate("/")
            }, 4000)
        }
    }, [])
    return (
        <>
            <Container maxWidth="xs">
                <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
                    <Alert onClose={() => { setOpen(false) }} severity="success" sx={{ width: '100%' }}>
                        {hash === '#redirect' ? "Please fill user info !!" : "user access granted"}
                    </Alert>
                </Snackbar>
                <form onSubmit={handleSubmit}>
                    {['name', 'phone', 'email'].includes(Object.keys(fieldError).toString()) && <Alert severity="error">{Object.values(fieldError)}</Alert>}
                    <TextField
                        error={fieldError['name'] ? true : false}
                        label="Name*"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        error={fieldError['phone'] ? true : false}
                        label="Phone Number*"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <TextField
                        error={fieldError['email'] ? true : false}
                        label="Email*"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button disabled={open && true} type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
            </Container >
        </>
    )
}

export default Form