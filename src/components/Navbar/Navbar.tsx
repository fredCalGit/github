import React, {
  ChangeEvent,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";
import { ThemeContext } from "@/pages/_app";
import { darkTheme, lightTheme } from "@/styles/Theme";
import {
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Spacer,
  Switch,
} from "@chakra-ui/react";
import { useDebouncedValue } from "./hooks/useDebouncedValue";

interface NavbarProps {
  setQueryString: Dispatch<React.SetStateAction<string>>;
}

export function Navbar({ setQueryString }: NavbarProps) {
  const { theme, setTheme } = useContext(ThemeContext);
  const [isActive, setIsActive] = useState(false);
  const [realTimeValue, setRealTimeValue] = useState("");

  const debouncedValue = useDebouncedValue<string>(realTimeValue, 500);

  const handleClick = () => {
    if (theme.label === "light") {
      setTheme(darkTheme);
      setIsActive(true);
    } else {
      setTheme(lightTheme);
      setIsActive(false);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRealTimeValue(event.target.value);
  };

  useEffect(() => {
    setQueryString(debouncedValue);
  }, [debouncedValue, setQueryString]);

  return (
    <Flex
      flexDirection='row'
      alignItems='center'
      justifyContent='start'
      h='100px'
      px='2rem'
      py='1rem'
      bg='bgPrimary'
    >
      <Link href='#' mr='2rem'>
        <Image
          src={
            theme.label === "light"
              ? "/assets/images/logoBlack.svg"
              : "/assets/images/logoWhite.svg"
          }
          alt='Github Logo'
          w='70px'
        />
      </Link>
      <Spacer />
      <InputGroup w='80%' maxW='container.md'>
        <Input
          variant='flushed'
          placeholder='Search for Github Users'
          size='lg'
          color='secondary'
          style={{ borderBottomColor: theme.colors.primary }}
          onChange={(event) => handleInputChange(event)}
        />
        <InputRightElement pointerEvents='none' fontSize='1.2em'>
          <i
            className='fa fa-search'
            style={{ color: theme.colors.secondary }}
          ></i>
        </InputRightElement>
      </InputGroup>
      <Spacer />
      <Flex
        maxW='sm'
        justifyContent='space-between'
        alignItems='center'
        w='100px'
      >
        <i
          className='fa fa-moon'
          style={{
            color: isActive ? theme.colors.secondary : theme.colors.primary,
          }}
        ></i>
        <Switch size='lg' onChange={() => handleClick()} />
        <i
          className='fa fa-sun'
          style={{
            color: theme.colors.bgSecondary,
          }}
        ></i>
      </Flex>
    </Flex>
  );
}
