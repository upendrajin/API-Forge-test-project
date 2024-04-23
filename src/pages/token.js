import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Formik, Form, Field } from 'formik';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Token() {
    const history = useHistory()
    const setToken = async (values) =>{
        localStorage.setItem('token',values)
        history.push('/data')
    }

  return (
    <>
      <Box sx={{ padding: "48px" }}>
        <Formik
          initialValues={{
            token: ''
          }}
          onSubmit={async (values) => {
            let stringify = JSON.stringify(values)
            let sendToken = JSON.parse(stringify).token
            setToken(sendToken)
          }}
        >
          <Form>
            <Field name="token">
              {({ field }) => (
                <TextField
                  {...field}
                  helperText=" "
                  label="Token"
                />
              )}
            </Field>
            <br />
            <Button variant="outlined" type="submit">Submit</Button>
          </Form>
        </Formik>
      </Box>
    </>
  );
}

export default Token;
