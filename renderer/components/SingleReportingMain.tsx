import { useState, useEffect } from "react";
import { formatDate } from "../utils/formatDate";
import StudentReportForm from "./SingleStudentForm/StudentReportForm";
import SingleReportPrintView from "./SingleReportPrintView";
import { StudentData } from "../types/student";
import axios from "axios";
import MainBtn from "./Buttons/MainBtn";

export default function SingleReportingMain({ id }: { id: string }) {

    const [studentData, setStudentData] = useState<StudentData[]>([]);
    const [reportName, setReportName] = useState<string>('');
    const [reportDate, setReportDate] = useState<string>('');
    const [showAddStudent, setShowAddStudent] = useState<boolean>(false)
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


    async function deleteStudentReport(id: number) {
        try {
            const { data } = await axios.delete(`/api/studentReport/${id}`)
            setStudentData(prevArr => prevArr.filter(report => report.id !== data.id))
        } catch (error) {
            console.log('error ', error)
        }
    }

    function addNewStudentReport() {

    }

    function printView() {
        window.print();
    }



    return (
        <>
            {!isLoading &&
                <>
                    <main className='print:hidden'>
                        {/* Create New Form Button */}
                        <div className='flex justify-between mx-[30px]'>
                            <MainBtn
                                clickHandler={printView}
                                text='Print'
                            />
                            <MainBtn
                                clickHandler={() => setShowAddStudent(true)}
                                text='+ Student Report'
                            />
                        </div>
                        {/* Heading Section */}
                        <div className='flex flex-col justify-center items-center'>
                            <p className='text-gray-300'>{reportName}</p>
                            <p className='text-gray-300'>{formatDate(reportDate)}</p>
                        </div>
                        <section className='flex flex-wrap justify-center'>
                            {studentData && studentData.map((student) => (
                                <StudentReportForm
                                    key={student.id}
                                    studentReport={student}
                                    setStudentData={setStudentData}
                                    deleteReportHandler={deleteStudentReport}
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