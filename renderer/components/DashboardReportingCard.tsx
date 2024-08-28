import { formatDate } from "../utils/formatDate";
import { useState } from "react";
import MainBtn from "./Buttons/MainBtn";
import MainLink from "./Buttons/MainLink";

interface Props {
    name: string;
    date: string;
    id: number;
    deleteReportingPeriod: (id: number) => Promise<void>;
}

export default function DashboardReportingCard({
    name,
    date,
    id,
    deleteReportingPeriod
}: Props) {


    const [confirmDelete, setConfirmDelete] = useState<boolean>(false)

    return (
        <div className="w-full max-w-sm bg-gray-200 border border-gray-400 rounded-lg shadow m-8">
            <div className="flex flex-col items-center py-5">
                <h5 className="mb-1 text-xl font-medium text-gray-900">{name}</h5>
                <span className="text-sm text-gray-500">{formatDate(date)}</span>
                <div className="flex justify-around w-[70%] mt-4 md:mt-6">
                    <MainLink
                        text='View'
                        href={`/reportingPeriod/${id}`}
                    />
                    {confirmDelete ?
                        <MainBtn
                            text='Confirm Delete'
                            clickHandler={() => deleteReportingPeriod(id)}
                            disabled={false}
                            red={true}
                        />
                        :
                        <MainBtn
                            clickHandler={() => setConfirmDelete(true)}
                            text='Delete'
                            disabled={false}
                            red={true}
                        />
                    }
                </div>
            </div>
        </div>

    )
}
