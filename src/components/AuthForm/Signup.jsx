import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";
import { Alert, AlertIcon } from "@chakra-ui/react";
function Signup() {
  const [inputs, setInputs] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const {loading, error, signup} = useSignUpWithEmailAndPassword();
  return (
    <>
      <Input
        value={inputs.email}
        placeholder="Email"
        size={"sm"}
        fontSize={14}
        type="email"
        onChange={(evt) => setInputs({ ...inputs, email: evt.target.value })}
      />
      <Input
        value={inputs.userName}
        placeholder="User Name"
        size={"sm"}
        fontSize={14}
        type="text"
        onChange={(evt) => setInputs({ ...inputs, userName: evt.target.value })}
      />
      <Input
        value={inputs.fullName}
        placeholder="Full Name"
        size={"sm"}
        fontSize={14}
        type="text"
        onChange={(evt) => setInputs({ ...inputs, fullName: evt.target.value })}
      />
      <InputGroup>
        <Input
          value={inputs.password}
          placeholder="Password"
          size={"sm"}
          fontSize={14}
          type={showPassword ? "text" : "password"} //ternary operator}
          onChange={(evt) =>
            setInputs({ ...inputs, password: evt.target.value })
          }
        />
        <InputRightElement h={"full"}>
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>

      {error && (
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      )}

      <Button
        onClick={()=>signup(inputs)}
        isLoading={loading}
        colorScheme="blue"
        variant="solid"
        fontSize={14}
        size={"sm"}
        w={"full"}
      >
        Sign Up
      </Button>
    </>
  );
}

export default Signup;
