import ModalWrapper from "./ModalWrapper"
import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import axios from "axios";
import MainBtn from "../Buttons/MainBtn";
import { ReportingPeriod } from "../../types/student";

interface Props {
    closeModal: () => void;
    setReportingPeriods: React.Dispatch<React.SetStateAction<ReportingPeriod[]>>;
}
interface StudentData {
    [key: string]: any[]; // Key is a string (sheet name), value is an array of rows
}
export default function CreateStudentReport({ closeModal, setReportingPeriods }: Props) {

    const [studentData, setStudentData] = useState<File | null>(null)
    const [formattedStudentData, setFormattedStudentData] = useState<string>('');
    const [reportingPeriodName, setReportingPeriodName] = useState<string>('Trimester 1');
    const [reportingPeriodDate, setReportingPeriodDate] = useState<string>('')
    const [teacherName, setTeacherName] = useState<string>('')
    const [roomNumber, setRoomNumber] = useState<string>('')
    const [gradeLevel, setGradeLevel] = useState<string>('')


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const newReport = await axios.post('/api/reportingPeriod', {
                name: reportingPeriodName,
                teacherName: teacherName,
                studentData: formattedStudentData,
                reportDate: reportingPeriodDate,
                gradeLevel,
                roomNumber,
            });
            // setStudentData(allReports)
            setReportingPeriods(prevArr => [...prevArr, newReport.data].toReversed())
            closeModal();
        } catch (error) {
            console.error('Error creating report:', error);
        }
    };

    return (
        <ModalWrapper
            title='New Reports'
            closeModal={closeModal}
        >
            <form className="max-w-sm mx-auto">
                <div className='flex justify-between'>
                    <div className="mb-5">
                        <label htmlFor="teacherName" className="block mb-2 text-sm font-medium text-[var(--text-color)]">Teacher:</label>
                        <input type="text" id="teacherName" placeholder="Mrs. Johnson" onChange={(e) => setTeacherName(e.target.value)} className="bg-gray-50 border border-gray-300 w-[200px] text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 placeholder:italic" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="roomNumber" className="block mb-2 text-sm font-medium text-[var(--text-color)]">Room #:</label>
                        <input type="number" id="roomNumber" min={0} placeholder="15" onChange={(e) => setRoomNumber(e.target.value)} className="bg-gray-50 border border-gray-300 w-[85px] text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 placeholder:italic" required />
                    </div>
                </div>

                <div className='flex justify-between'>
                    <div>
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Trimester:</label>
                        <select onChange={(e) => setReportingPeriodName(e.target.value)} id="countries" className="bg-gray-50 w-[120px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                            <option value='Trimester 1'>Trimester 1</option>
                            <option value='Trimester 2'>Trimester 2</option>
                            <option value='Trimester 3'>Trimester 3</option>
                        </select>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="date" className="block mb-2 text-sm font-medium text-[var(--text-color)]">Date:</label>
                        <input type="date" id="date" onChange={(e) => setReportingPeriodDate(e.target.value)} className="bg-gray-50 w-[125px] border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2" required />
                    </div>

                    <div>
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Grade:</label>
                        <select onChange={(e) => setGradeLevel(e.target.value)} id="countries" className="bg-gray-50 w-[85px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                            <option>TK</option>
                            <option>Kindergarten</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                </div>

                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-[var(--text-color)]" htmlFor="upload-excel">Upload Spreadsheet (Optional)</label>
                    <input className="block w-full text-sm text-[var(--text-color)] border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-1 focus:outline-none" id="upload-excel" type="file" accept=".xls, .xlsx"
                        onChange={(e) => setStudentData(e.target.files ? e.target.files[0] : null)}
                    />
                </div>

                <div className='flex justify-center'>
                    <MainBtn
                        clickHandler={handleSubmit}
                        disabled={false}
                        text={'Create'}
                    />
                </div>
            </form>

        </ModalWrapper>
    )
}
