import { Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import useLogin from "../../hooks/useLogin";
import { Alert, AlertIcon } from "@chakra-ui/react";
function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { login, loading, error } = useLogin();
  return (
    <>
      <Input
        value={inputs.email}
        placeholder="Email"
        fontSize={14}
        type="email"
        size={"sm"}
        onChange={(evt) => setInputs({ ...inputs, email: evt.target.value })}
      />
      <Input
        value={inputs.password}
        placeholder="Password"
        fontSize={14}
        type="password"
        size={"sm"}
        onChange={(evt) => setInputs({ ...inputs, password: evt.target.value })}
      />
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      )}
      <Button
        onClick={()=>{login(inputs)}}
        isLoading={loading}
        colorScheme="blue"
        variant="solid"
        fontSize={14}
        size={"sm"}
        w={"full"}
      >
        Log In
      </Button>
    </>
  );
}

export default Login;
