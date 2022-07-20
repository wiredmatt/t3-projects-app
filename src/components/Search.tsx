import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

interface IProps {}

const Search: FC<IProps> = ({}) => {
  const [userToSearch, setUserToSearch] = useState<string>("");

  const router = useRouter();

  const [baseUrl, setBaseURL] = useState<string>("");

  useEffect(() => {
    setBaseURL(
      (window.location.href.replace(/^https?:\/\//, "").split("/")[0] || "") +
        "/user/"
    );
  }, []);

  const handleSearch = () => router.push("/user/" + userToSearch);

  console.log(baseUrl);

  return (
    <div className="my-4">
      <InputGroup size="sm">
        <InputLeftAddon>{baseUrl}</InputLeftAddon>
        <Input
          value={userToSearch}
          onChange={(e) => setUserToSearch(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={() => handleSearch()}>
            Search
          </Button>
        </InputRightElement>
      </InputGroup>
    </div>
  );
};

export default Search;
