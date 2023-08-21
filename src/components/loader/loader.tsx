import { ThreeCircles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <ThreeCircles
        height="100"
        width="100"
        color="#801ab3"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor="#4c4cff"
        middleCircleColor=""
      />
    </div>
  );
};

export default Loader;
