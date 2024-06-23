import React from "react";

interface ApiDataContext{
  data: Response | null
  loading: boolean;
  error: string | null;
}



const ApiData = React.createContext<ApiDataContext>({
  data: null,
  loading: false,
  error: null,
})

export default ApiData