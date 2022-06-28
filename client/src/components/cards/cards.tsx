import "./cards.scss";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import axios, { AxiosResponse } from "axios";


// API 
import GetLoansOverview from "../../api/dashboard/GetLoansOverview";
import GetRMAsOverview from "../../api/dashboard/GetRMAsOverview";
import GetTLoanRMAChart from "../../api/dashboard/GetTLoanRMAChart";




function cards() {



  return (
    <div className="featured">
      <div className="featuredItem">   
        <span className="featuredTitle">T-Loan Overview</span> 
        <div> 
            <div> 
                <span className="Current">Current</span> 
                <h1 className="Current">20</h1> 
            </div>
            <div>       
                <span className="Drafts">Drafts</span> 
                <h1 className="Current">2</h1> 
            </div>
            <div> 
                <span className="Current">Pending</span> 
                <h1 className="Current">10</h1> 
            </div>
            <div> 
                <span className="Current">On-Extension</span> 
                <h1 className="Current">5</h1> 
            </div>
        </div>
        </div>

      <div className="featuredItem">
        <span className="featuredTitle">RMA Overview</span>       
        <div> 
            <div> 
                <span className="Current">Requested</span> 
                <h1 className="Current">20</h1> 
            </div>
            <div>       
                <span className="Drafts">Pending</span> 
                <h1 className="Current">2</h1> 
            </div>
            <div> 
                <span className="Current">Close</span> 
                <h1 className="Current">10</h1> 
            </div>
           </div>
        
   
      </div>
    
    </div>
  );
}

export default cards;