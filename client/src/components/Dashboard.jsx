import { useEffect, useState } from 'react';
import './Dashboard.css';
import BarChart from './BarChart';
import { useLayoutEffect } from 'react';
import api from '../constans/urls';
import PieChart from './PieChart';
import BookTable from './BookTable';

const Dashboard = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const [data, setData] = useState([
    { Name: "J.K. Rowling", numBooks: 500000000 },
    { Name: "Agatha Christie", numBooks: 400000000 },
    { Name: "Stephen King", numBooks: 350000000 },
    { Name: "J.R.R. Tolkien", numBooks: 250000000 },
    { Name: "Dan Brown", numBooks: 200000000 },
  ])
  const [language, setLanguage] = useState(
    [
    ]
  )

  useEffect(() => {
    api.get('/dashboard')
      .then(response => {
        setData(response.data.dashboardData)
        setLanguage(response.data.languageData)
        console.log('Dashboard data:', response.data);
      })
      .catch(error => {
        console.error('Error fetching dashboard data:', error);
      });
  }, []);


  useLayoutEffect(() => {
    function updateWindowSize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', updateWindowSize);
    updateWindowSize(); // Update on mount
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  const halfWidth = Math.floor(windowSize.width / 2) - 100;
  const halfHeight = Math.floor(windowSize.height / 2);


  return (
    <>
      <div className="dashboard">
        <div className="chart-container">
          <BarChart data={data} width={halfWidth} height={halfHeight} />
        </div>
        <div className="chart-container">
          <PieChart data={language} width={halfWidth} height={halfHeight} />
        </div>
      </div>
      <div  className="table-container">
        <BookTable width={halfWidth}/>
      </div>
    </>
  );
};

export default Dashboard;
