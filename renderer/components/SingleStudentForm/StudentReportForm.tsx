import { useState, useEffect } from "react";
import { StudentData } from "../../types/student";
import SingleGradeRow from "./SingleGradeRow"
import MainBtn from "../Buttons/MainBtn";
import { Subject } from "@prisma/client";
import axios from "axios";

interface Props {
    studentReport: StudentData
    setStudentData: React.Dispatch<React.SetStateAction<StudentData[]>>;
    deleteReportHandler: (id: number) => Promise<void>;
}

export default function StudentReportForm({ studentReport, setStudentData, deleteReportHandler }: Props) {

    const [grades, setGrades] = useState<Subject[]>([]);
    const [absences, setAbsences] = useState<number>(0);
    const [tardies, setTardies] = useState<number>(0);
    const [studentName, setStudentName] = useState<string>('');
    const [hasDataChanged, setHasDataChanged] = useState<boolean>(false);
    const [otherComments, setOtherComments] = useState<string>('');
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false)

    useEffect(() => {
        if (studentReport) setGrades(studentReport.subjects)
        if (studentReport?.absences) setAbsences(studentReport.absences)
        if (studentReport?.tardies) setTardies(studentReport.tardies)
        if (studentReport?.studentName) setStudentName(studentReport.studentName)
        if (studentReport?.otherComments) setOtherComments(studentReport.otherComments)
    }, [studentReport])

    async function handleSubmit() {
        try {
            const { data: updatedStudentReport } = await axios.put(`/api/studentReport/${studentReport.id}`, {
                data: {
                    grades,
                    tardies,
                    absences,
                    studentName,
                    otherComments
                }
            });
            // Need to update state here so print view is up-to-date
            setStudentData(prevArr => {
                const newArr = [...prevArr];
                // find the index in the array of the report updated
                const indexOfReport = prevArr.findIndex((item) => item.id === updatedStudentReport.id)
                // replace it with the updatedStudentReport (only happening in state, db already changed)
                newArr.splice(indexOfReport, 1, updatedStudentReport)
                return newArr
            })
        } catch (error) {
            console.error(error)
        }
        setHasDataChanged(false)
    }

    return (
        <article className='relative bg-blue-100 m-6 rounded-[5px] w-[460px]'>
            <input type="text" value={studentName} onChange={(e) => {
                setStudentName(e.target.value)
                setHasDataChanged(true)
            }
            }
                className='text-gray-900 text-center mb-3 bg-blue-300 py-2 rounded-tl-[4px] rounded-tr-[4px] text-[1.15rem] w-full ring:focus-1'
                maxLength={55}
            />

            <div className='flex justify-evenly'>
                <p className='text-[.75rem] text-gray-600'>🔴 <span className='italic'>unsatisfacory</span> </p>
                <p className='text-[.75rem] text-gray-600'>🟢 <span className='italic'>satisfactory</span></p>
            </div>
            <form>
                {/* Subjects */}
                <div className='flex flex-wrap justify-around'>
                    {studentReport.subjects.map((subject, index) => (
                        <SingleGradeRow
                            key={index}
                            index={index}
                            subject={subject}
                            setGrades={setGrades}
                            setHasDataChanged={setHasDataChanged}
                        />
                    ))}
                </div>
                {/* Other Comments */}
                <div className="flex justify-center mt-4 pt-4 border-t border-gray-300 w-[420px] mx-auto relative">
                    <textarea
                        id="otherComments"
                        rows={2}
                        maxLength={160}
                        className="resize-none block w-full w-[400px] p-[8px] text-gray-700 bg-gray-50 rounded-lg focus:ring-blue-100 focus:border-blue-100 text-xs mb-3 border border-gray-300"
                        placeholder="Other comments..."
                        onChange={(e) => {
                            setOtherComments(e.target.value);
                            setHasDataChanged(true)
                        }}
                        value={otherComments}
                    >
                    </textarea>
                    <p className='absolute top-[65px] right-[10px] z-20 text-[.78rem] text-gray-500'>{otherComments.length}/160</p>
                </div>

                {/* Absences and Tardies */}
                <div className='flex justify-around'>
                    <div>
                        <label htmlFor="number-input" className="block text-[.85rem] font-medium text-gray-700 text-center">Absences:</label>
                        <input type="number" onChange={(e) => {
                            setAbsences(parseInt(e.target.value))
                            setHasDataChanged(true)
                        }} id="number-input" className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[60px] p-1" value={absences.toString()} required min="0" />
                    </div>
                    <div>
                        <label htmlFor="number-input" className="block text-[.85rem] font-medium text-gray-700 text-center">Tardies:</label>
                        <input type="number" onChange={(e) => {
                            setTardies(parseInt(e.target.value))
                            setHasDataChanged(true)
                        }} id="number-input" maxLength={2} className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[60px] p-1" value={tardies.toString()} required min="0" />
                    </div>
                </div>

            </form>
            <div className="flex justify-around w-[70%] mb-3 mt-3 mx-auto">
                <MainBtn
                    text={hasDataChanged ? 'Save' : 'Saved'}
                    disabled={!hasDataChanged}
                    clickHandler={handleSubmit}
                />
                {confirmDelete ?
                    <MainBtn
                        text={'Confirm Delete'}
                        disabled={false}
                        red={true}
                        //@ts-ignore
                        clickHandler={() => deleteReportHandler(studentReport.id)}
                    />
                    :
                    <MainBtn
                        text={'Delete'}
                        disabled={false}
                        red={true}
                        //@ts-ignore
                        clickHandler={() => setConfirmDelete(true)}
                    />
                }
            </div>
        </article>
    )
}