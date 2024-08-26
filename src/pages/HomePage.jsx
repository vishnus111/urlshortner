import { useSelector } from "react-redux";
import UrlForm from "../components/UrlForm";
import UrlList from "../components/UrlList";

function HomePage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="home-page ">
      {user ? (
        <>
          <div className="container-fluid ">
            <div className="row">
              <div className="col-md-6">
                <UrlForm />
              </div>
              <div className="col-md-6">
                <UrlList />
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="fs-3">Please log in to manage your URLs.</p>
      )}
    </div>
  );
}

export default HomePage;
