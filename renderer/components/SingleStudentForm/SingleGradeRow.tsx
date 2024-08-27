import { StudentData, Subject } from "../../types/student";
import { FormEvent, SyntheticEvent, useState } from "react";

interface Props {
    subject: Subject;
    setGrades: React.Dispatch<React.SetStateAction<Subject[]>>;
    setHasDataChanged: React.Dispatch<React.SetStateAction<boolean>>;
    index: number;
}


export default function SingleGradeRow({ subject, setGrades, index, setHasDataChanged }: Props) {

    const [commentWordCount, setCommentWordCount] = useState<number>(0)

    // find update the subject and put it in the use state with spread. Need to find it and replace
    function handleUpdate(value: string) {
        switch (value) {
            case 'Unsatisfactory':
                subject.status = value;
                setGrades(prevArr => {
                    const newArr = [...prevArr];
                    newArr.splice(index, 1, subject);
                    return newArr;
                });
                setHasDataChanged(true)
                break;
            case 'Working-Towards':
                subject.status = null;
                setGrades(prevArr => {
                    const newArr = [...prevArr];
                    newArr.splice(index, 1, subject);
                    return newArr;
                });
                setHasDataChanged(true)
                break;
            case 'Satisfactory':
                subject.status = value;
                setGrades(prevArr => {
                    const newArr = [...prevArr];
                    newArr.splice(index, 1, subject);
                    return newArr;
                });
                setHasDataChanged(true)
                break;
            default:
                break;
        }
    }

    function handleCommentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        subject.comment = e.target.value
        setGrades(prevArr => {
            subject.comment = e.target.value
            const newArr = [...prevArr];
            newArr.splice(index, 1, subject)
            return newArr
        })
        setHasDataChanged(true);
        setCommentWordCount(subject.comment.length)
    }

    return (
        <div>
            {/* Title and percentage */}
            <div className='flex justify-between items-end'>
                <div className='flex justify-center items-center mt-3'>
                    <h3 className='text-[.85rem] text-gray-800'>{subject.name}</h3>
                    {(subject.name === 'Mathematics' || subject.name === 'Reading' || subject.name === 'Writing') &&
                        <p className='text-[.75rem] ml-2 text-gray-700 italic'>({subject.grade}%)</p>
                    }
                </div>
                {/* Grade Radio Buttons */}
                <div className='flex justify-around w-[50px]'>
                    <div className="flex flex-col items-center">
                        <label
                            htmlFor={`${subject.id}-unsatisfacory`}
                            className={`cursor-pointer text-center cursor-pointer rounded-[20px] ${subject.status === 'Unsatisfactory' ? 'opacity-100 bg-indigo-200 border-zinc-600' : 'opacity-25'}`}
                        >
                            🔴
                        </label>
                        <input
                            id={`${subject.id}-unsatisfacory`}
                            onChange={(e) => handleUpdate(e.target.value)}
                            type="radio" name={`${subject.id}-reading`}
                            value="Unsatisfactory"
                            className="sr-only"
                            checked={subject.status === 'Unsatisfactory'}
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <label
                            htmlFor={`${subject.id}-satisfactory`}
                            className={`text-center cursor-pointer rounded-[20px] ${subject.status === 'Satisfactory' ? 'opacity-100 bg-indigo-200 border-zinc-600' : 'opacity-25'}`}
                        >
                            🟢
                        </label>
                        <input
                            id={`${subject.id}-satisfactory`}
                            type="radio"
                            onChange={(e) => handleUpdate(e.target.value)}
                            name={`${subject.id}-reading`} value="Satisfactory"
                            className="sr-only"
                            checked={subject.status === 'Satisfactory'}
                        />
                    </div>
                </div>
            </div>
            {/* Comment Section */}
            <div className='relative'>
                <textarea
                    rows={3}
                    maxLength={80}
                    className="resize-none block w-[200px] p-[8px] text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-100 focus:border-blue-100 text-xs mb-3"
                    placeholder="Comment..."
                    onChange={(e) => handleCommentChange(e)}
                    value={subject.comment}
                >
                </textarea>
                <p className='absolute top-[65px] right-[10px] z-20 text-[.78rem] text-gray-500'>{commentWordCount}/80</p>
            </div>
        </div>
    )
}
