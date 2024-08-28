import ModalWrapper from "./ModalWrapper"
import { Assessments } from "../../types/student";
import MainBtn from "../Buttons/MainBtn";

interface Props {
    closeModal: () => void;
    assessmentList: Assessments[];
    title: string;
}
export default function AssessementList({ closeModal, assessmentList, title }: Props) {
    console.log('assessment list ', assessmentList)
    return (
        <ModalWrapper
            title={title}
            closeModal={closeModal}
        >
            {assessmentList.map((assessment) => (
                <div key={assessment.id} className='flex justify-between w-[75%] mx-auto'>
                    <p className='mb-1'>{assessment.testName}</p>
                    <p className='mb-1 text-blue-800'>{assessment.score}</p>
                </div>
            ))}
            <div className='flex justify-center'>
                <MainBtn
                    disabled={false}
                    text='Close'
                    clickHandler={closeModal}
                />
            </div>
        </ModalWrapper>
    )
}
