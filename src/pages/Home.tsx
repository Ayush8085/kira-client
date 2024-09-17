import { getLoggedInUser, logoutUser } from "@/services/authAPI";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    userData();
  }, []);

  const userData = async () => {
    setIsLoading(true);
    try {
      const data = await getLoggedInUser(axiosPrivate);
      setUser(data.user);
      setIsLoading(false);
    }
    catch (err) {
      console.error(err);
    }
  }

  const logout = async () => {
    setIsLoading(true);
    await logoutUser();
    console.log("LOGOUT");
    navigate("/login");
    setIsLoading(false);
  }

  return (
    <div>
      {
        user ? (
          <div>
            <h1>Welcome {user.username}</h1>
            <Button variant="secondary" onClick={logout}>Logout</Button>
          </div>
        ): (
          <div>
            <h1>Please Login</h1>
            <Button variant="secondary" onClick={logout}>Logout</Button>
          </div>
        )
      }
    </div>
  )
}

export default Home