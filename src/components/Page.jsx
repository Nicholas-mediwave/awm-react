import Header from "./Header";

const Page = (props) => {
  return (
    <div className="container">
      <Header />
      {props.children}
    </div>
  );
};

export default Page;
