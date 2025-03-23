import { Container } from "react-bootstrap";

const NotFound = () => {
  return (
    <div className="flex flex-col text-center mt-20 mb-10 justify-center items-center mx-auto h-full">
      <Container className="h-105">
        <p className="text-[100px]">404</p>
        <p>NOT FOUND PAGE</p>
      </Container>
    </div>
  );
};

export default NotFound;
