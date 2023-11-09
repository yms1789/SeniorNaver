import { useEffect, useState } from "react";
import axios from "axios";

interface ShowData {
  pfId: string;
  pfName: string;
  startDate: string;
  endDate: string;
  theater: string;
  poster: string;
  genre: string;
  pfState: string;
  openRun: string;
}

function CurationTastes() {
  const [dataShows, setDataShows] = useState<ShowData[]>([]);
  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const response = await axios.get("/shows");
      setDataShows(response.data);
      console.log("공연 데이터", dataShows);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* {dataShows.map(show => {
        return (
          <div key={show.pfId}>
            <div>{show.pfName}</div>
          </div>
        );
      })} */}
    </div>
  );
}

export default CurationTastes;
