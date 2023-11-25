import { useEffect, useState } from "react";
import "./App.css";
import { MainContent } from "./components/Form";
import { ApiResponse } from "./types/types";

function App() {
  const [apiData, setApiData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3002/images");
        const data: ApiResponse = await response.json();
        setApiData(data);
        console.log("GET Response:", data);
      } catch (error) {
        console.error("GET Error:", error);
      }
    };

    fetchData();
  }, []);
  console.log(apiData?.data);
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Uploading App</h1>
        <MainContent />
      </header>
    </div>
  );
}

export default App;
