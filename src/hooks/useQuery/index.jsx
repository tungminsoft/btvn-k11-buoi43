import { useLocation } from "react-router-dom";

const useQuery = () => {
  const location = useLocation();

  const query = new URLSearchParams(location.search)
  
  return query;
};

export default useQuery;
