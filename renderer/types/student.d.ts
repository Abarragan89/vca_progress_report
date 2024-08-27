export interface ReportingPeriod {
    date: string;
    id: number;
    name: string;
}


export interface Subject {
    comment: string;
    grade: number | null;
    id: number;
    name: string;
    status: string | null
    studentReportId: number | null;
}

export interface StudentData {
    studentName: string;
    absences: number;
    date: string;
    id: number;
    reportingPeriodId: number;
    subjects: Subject[];
    tardies: number;
    teacherName: string;
    otherComments: string;
}