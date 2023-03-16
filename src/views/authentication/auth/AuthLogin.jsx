import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox,
    Alert
} from '@mui/material';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { useForm, useAuthStore } from '../../../hooks';

const AuthLogin = ({ title, subtitle, subtext }) => {

    const {status, errorMessage} = useSelector(state => state.auth);
    const {email, password, onInputChange} = useForm({
        email: '',
        password: ''
    });

    const {startLogin} = useAuthStore();

    const isAuthenticating = useMemo( () => status === 'checking', [status]);

    const onSubmit = (event) => {
        event.preventDefault();
        startLogin({email, password});
    }

    return (
    <>
        {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
                {title}
            </Typography>
        ) : null}

        {subtext}

        <Alert severity='error' style={{display : !!errorMessage ? '' : 'none'}}>
            {errorMessage}
        </Alert>

        <form onSubmit={onSubmit}>
        <Stack>
            <Box>
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='username' mb="5px">Username</Typography>
                <CustomTextField 
                    id="email"
                    variant="outlined"
                    name="email"
                    value={email}
                    onChange={onInputChange}
                    fullWidth
                     />
            </Box>
            <Box mt="25px">
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='password' mb="5px" >Password</Typography>
                <CustomTextField
                    id="password"
                    type="password"
                    variant="outlined"
                    name="password"
                    value={password}
                    onChange={onInputChange}
                    fullWidth />
            </Box>
            <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Remeber this Device"
                    />
                </FormGroup>
                <Typography
                    component={Link}
                    to="/"
                    fontWeight="500"
                    sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                    }}
                >
                    Forgot Password ?
                </Typography>
            </Stack>
        </Stack>
        <Box>
            <Button
                disabled={isAuthenticating}
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                type="submit"
            >
                Sign In
            </Button>
        </Box>
        </form>
        {subtitle}
    </>
)};

export default AuthLogin;
