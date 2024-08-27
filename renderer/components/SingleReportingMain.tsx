import { useState, useEffect } from "react";
import { formatDate } from "../utils/formatDate";
import StudentReportForm from "./SingleStudentForm/StudentReportForm";
import SingleReportPrintView from "./SingleReportPrintView";
import { StudentData } from "../types/student";
import axios from "axios";

export default function SingleReportingMain({ id }: { id:string }) {

    const [studentData, setStudentData] = useState<StudentData[]>([]);
    const [reportName, setReportName] = useState<string>('');
    const [reportDate, setReportDate] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    async function getStudentData() {
        try {
            const { data } = await axios.get(`/api/singleReportingPeriod/${id}`);
            setStudentData(data.studentReports);
            setReportDate(data.date);
            setReportName(data.name);
            setIsLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getStudentData();
    }, []);


    return (
        <>
            {!isLoading &&
                <>
                    <main className='print:hidden'>
                        <p>{formatDate(reportDate)}</p>
                        <p>{reportName}</p>
                        <section className='flex flex-wrap justify-center'>
                            {studentData && studentData.map((student) => (
                                <StudentReportForm
                                    key={student.id}
                                    studentReport={student}
                                    setStudentData={setStudentData}
                                />
                            ))}
                        </section>
                    </main>
                    {/* Only Shows in Print View */}
                    <main className='hidden print:block'>
                        {studentData && studentData.map((student) => (
                            <SingleReportPrintView
                                key={student.id}
                                studentReport={student}
                            />
                        ))}
                    </main>
                </>
            }
        </>
    )
}