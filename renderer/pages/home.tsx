import { useState, useEffect } from "react";
import CreateNewReport from "../components/Modals/CreateNewReport";
import DashboardReportingCard from "../components/DashboardReportingCard";
import Navigation from "../components/Navigation";
import MainBtn from "../components/Buttons/MainBtn";
import axios from 'axios';

interface ReportData {
  id: number;
  name: string
  date: string;
}

export default function Home() {

  const [showCreateReportModal, setShowCreateReportModal] = useState<boolean>(false)
  const [reportingPeriods, setReportingPeriods] = useState<ReportData[]>([]);

  async function getUserData() {
    try {
      const response = await axios.get(`/api/reportingPeriod`);
      setReportingPeriods(response.data);
    } catch (error) {
      console.log('error getting teacher reporting periods');
    }
  }

  useEffect(() => {
    getUserData();
  }, [])

  console.log(reportingPeriods)

  return (
    <main className='min-h-screen pt-16'>
      <Navigation />
      {showCreateReportModal &&
        <CreateNewReport
        setReportingPeriods={setReportingPeriods}
          closeModal={() => setShowCreateReportModal(false)}
        />
      }
      <div className='flex items-flex-start justify-between px-5'>
        <MainBtn
          text='Create Reports'
          disabled={false}
          clickHandler={() => setShowCreateReportModal(true)}
        />
      </div>

      <section className='flex flex-wrap justify-center mt-10'>
        {reportingPeriods && reportingPeriods.map((reportingPeriod) => (
          <DashboardReportingCard
            key={reportingPeriod.id}
            name={reportingPeriod.name}
            date={reportingPeriod.date}
            id={reportingPeriod.id}
          />
        ))
        }
      </section>
    </main>
  )
}
