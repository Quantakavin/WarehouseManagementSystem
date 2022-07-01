import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function TLoanTabs() {
  
      const [loan, setLoan] = useState([]);
      const [newLoan, setNewLoan] = useState([]);

      useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
          // get the data from the api
          const loan = await axios.get('https://localhost:5000/api/allLoan');
         
          setLoan(loan.data);
        }
      
        // call the function
        fetchData()
          // make sure to catch any error
          .catch(console.error);;
      }, [])

      useEffect(() => {

        const newLoan =loan.map(
            ({ }) => ({
               
            })
        )
        setNewLoan(newLoan)

    }, [loan])

   
   return(
        <Tabs>
            <TabList>
            <Tab>Current</Tab>
            <Tab>Pending</Tab>
            <Tab>Draft </Tab>
            <Tab>History</Tab>
            </TabList>

            <TabPanel>
                <div>
                    
                </div>

            </TabPanel>
            <TabPanel>
            <h2>Any content 2</h2>
            </TabPanel>
            <TabPanel>
            <h2>Any content 2</h2>
            </TabPanel>
            <TabPanel>
            <h2>Any content 2</h2>
            </TabPanel>
        </Tabs>
   )
};