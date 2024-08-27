import { StudentData } from "../types/student"
import { useState, useEffect } from "react";
import { formatDate } from "../utils/formatDate"

interface Props {
    studentReport: StudentData
}
interface Subject {
    id: number;
    name: string;
    grade: number | null;
    status: string | null;
    comment: string;
    studentReportId: number | null;
}

interface StructuredStudentData {
    [key: string]: Subject;
}

export default function SingleReportPrintView({ studentReport }: Props) {

    const [studentData, setStudentData] = useState<StructuredStudentData>({})

    useEffect(() => {
        const structuredData = studentReport.subjects.reduce((acc, subject) => {
            if (subject.name.toLowerCase() === 'work habits') {
                // @ts-ignore
                acc.workHabits = subject;
                return acc;
            }
            acc[subject.name.toLowerCase()] = subject;
            return acc;
        }, {});

        setStudentData(structuredData);
    }, [studentReport]);

    return (
        <section style={{ width: '8.5in', height: '11in' }} className='mt-[-70px] p-[10px]'>
            {studentData &&
                <>
                    <div className='flex justify-between'>
                        {/* Logo Image */}
                        <img
                            src='/vcaLogo.png'
                            width={200}
                            height={200}
                            alt='village charter academy logo and penguin'
                            className='ml-[80px]'
                        />
                        {/* Table for Student Info */}
                        <table className="border border-gray-950 w-[410px] text-left">
                            <tbody>
                                {/* Row 1 */}
                                <tr>
                                    <td className="border border-gray-950 px-2 py-1 font-bold" colSpan={2}>Student/Estudiante:
                                        <span className='font-normal'> {studentReport.studentName}</span>
                                    </td>
                                </tr>

                                {/* Row 2 */}
                                <tr>
                                    <td className="border border-gray-950 px-2 py-1 font-bold" colSpan={2}>Teacher/Maestra(o):
                                        <span className='font-normal'> {studentReport.teacherName}</span>
                                    </td>
                                </tr>

                                {/* Row 3 */}
                                <tr>
                                    <td className="border border-gray-950 px-2 py-1 font-bold">Grade/Grado: <span className='font-normal'>5</span></td>
                                    <td className="border border-gray-950 px-2 py-1 font-bold">Room/Salon: <span className='font-normal'>15</span></td>
                                </tr>

                                {/* Row 4 */}
                                <tr>
                                    <td className="border border-gray-950 px-2 py-1 font-bold" colSpan={2}>Date/Fecha:
                                        <span className='font-normal'> {formatDate(studentReport.date)}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* Grades Table */}
                    <table className="border-collapse border border-gray-950 w-full text-center mt-[15px]">
                        <thead>
                            <tr>
                                <th className="border border-gray-950 px-2 py-1 w-[180px]">Subject<br />Area de Estudios</th>
                                <th className="border border-gray-950 px-2 py-1 w-[150px]">Satisfactory<br />Satisfactorio</th>
                                <th className="border border-gray-950 px-2 py-1 w-[150px]">Unsatisfactory<br />NO Satisfactorio</th>
                                <th className="border border-gray-950 px-2 py-1 w-[380px]" colSpan={5}>Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Row 1 */}
                            <tr>
                                <td className="border border-gray-950 px-2 py-1">Reading<br /><span className="italic">Lectura</span></td>
                                <td className="border border-gray-950 px-2 py-1">{studentData?.reading?.status === 'Satisfactory' && '✔'}</td>
                                <td className="border border-gray-950 px-2 py-1">{studentData?.reading?.status !== 'Satisfactory' && '✔'}</td>
                                <td className="border border-gray-950 px-2 py-1 text-[.9rem]">{studentData?.reading?.comment}</td>
                            </tr>
                            {/* Row 2 */}
                            <tr>
                                <td className="border border-gray-950 px-2 py-1">Mathematics<br /><span className="italic">Mathematics</span></td>
                                <td className="border border-gray-950 px-2 py-1">{studentData?.mathematics?.status === 'Satisfactory' && '✔'}</td>
                                <td className="border border-gray-950 px-2 py-1">{studentData?.mathematics?.status !== 'Satisfactory' && '✔'}</td>
                                <td className="border border-gray-950 px-2 py-1 text-[.9rem]">{studentData?.mathematics?.comment}</td>

                            </tr>
                            {/* Row 3 */}
                            <tr>
                                <td className="border border-gray-950 px-2 py-1">Written Language<br /><span className="italic">Lenguaje Escrito</span></td>
                                <td className="border border-gray-950 px-2 py-1">{studentData?.writing?.status === 'Satisfactory' && '✔'}</td>
                                <td className="border border-gray-950 px-2 py-1">{studentData?.writing?.status !== 'Satisfactory' && '✔'}</td>
                                <td className="border border-gray-950 px-2 py-1 text-[.9rem]">{studentData?.writing?.comment}</td>
                            </tr>
                            {/* Row 4 */}
                            <tr>
                                <td className="border border-gray-950 px-2 py-1">Work Habits<br /><span className="italic">Habitos de Trabajo</span></td>
                                <td className="border border-gray-950 px-2 py-1">{studentData?.workHabits?.status === 'Satisfactory' && '✔'}</td>
                                <td className="border border-gray-950 px-2 py-1">{studentData?.workHabits?.status !== 'Satisfactory' && '✔'}</td>
                                <td className="border border-gray-950 px-2 py-1 text-[.9rem]">{studentData?.workHabits?.comment}</td>
                            </tr>
                            {/* Row 5 */}
                            <tr>
                                <td className="border border-gray-950 px-2 py-1">Behavior<br /><span className="italic">Comportamiento</span></td>
                                <td className="border border-gray-950 px-2 py-1">{studentData?.behavior?.status === 'Satisfactory' && '✔'}</td>
                                <td className="border border-gray-950 px-2 py-1">{studentData?.behavior?.status !== 'Satisfactory' && '✔'}</td>
                                <td className="border border-gray-950 px-2 py-1 text-[.9rem]">{studentData?.behavior?.comment}</td>
                            </tr>
                            {/* Row 6 */}
                            <tr>
                                <td className="border border-gray-950 px-2 py-1">Homework<br /><span className="italic">Tarea</span></td>
                                <td className="border border-gray-950 px-2 py-1">{studentData?.homework?.status === 'Satisfactory' && '✔'}</td>
                                <td className="border border-gray-950 px-2 py-1">{studentData?.homework?.status !== 'Satisfactory' && '✔'}</td>
                                <td className="border border-gray-950 px-2 py-1 text-[.9rem]">{studentData?.homework?.comment}</td>
                            </tr>
                            {/* Attendance Row */}
                            <tr>
                                <td className="border border-gray-950 px-2 py-1">Attendance<br /><span className="italic">Asistencia</span></td>
                                <td className="border border-gray-950 px-2 py-1">{studentReport.absences} <br /> <span>Absences</span></td>
                                <td className="border border-gray-950 px-2 py-1">{studentReport.tardies} <br /> <span>Tardies</span></td>
                                <td className="border border-gray-950 px-2 py-1"></td>
                            </tr>
                            <tr>
                                <td className="border border-gray-950 px-2 py-1">Other Comments <br /><span className="italic">otros comentarios.</span></td>
                                <td className="border border-gray-950 px-2 py-1 text-[.9rem]" colSpan={3}>{studentReport?.otherComments}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Cut Line */}
                    <p className='text-center mt-[20px]'>Return bottom portion / Devolver la porción inferior</p>
                    <hr className='border-gray-950'></hr>

                    {/* Return Section */}
                    <div className='border border-gray-950 p-2 mt-3'>
                        <p className='mt-1'>Please sign below to verify that you recieved and reviewed <span className='font-bold'>{studentReport.studentName}'s </span>Progress Report and return it to Mr. Barragan.</p>
                        <p className='mt-1'>Por favor, firme abajo para verificar que recibió y revisó el Informe de Progreso de <span className='font-bold'>{studentReport.studentName} </span> y devuélvalo al Mr. Barragan</p>

                        <div className='flex justify-around'>
                            <p className='italic border-t border-gray-950 mt-[30px]'>Parent Signature / Firma del Tutor</p>
                            <p className='italic border-t border-gray-950 mt-[30px]'>Date / Fecha</p>
                        </div>
                        {/* Parent comments */}
                        <div className="border-t border-gray-950 mb-[50px] mt-2">
                            <p>Comments / Comentarios</p>
                        </div>
                    </div>
                </>
            }
        </section>
    )
}
