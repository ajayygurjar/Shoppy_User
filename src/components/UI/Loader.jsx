import { Spinner } from "react-bootstrap";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <Spinner animation="border" variant="primary" />
      <p className="mt-3 fw-bold">{text}</p>
    </div>
  );
};

export default Loader;
