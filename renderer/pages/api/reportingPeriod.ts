
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const transaction = await prisma.$transaction(async (prisma) => {
            try {
                const data = req.body;
                console.log('data in here ', data)
                const { name, studentData, teacherName, reportDate, roomNumber, gradeLevel } = data;

                if (!name) {
                    res.status(400).json({ error: 'All fields are required' });
                }

                // generate based on excel spreadsheet
                if (studentData) {
                    const newReportingPeriod = await prisma.reportingPeriod.create({
                        data: {
                            name,
                            date: new Date(reportDate),
                            roomNumber,
                            gradeLevel,
                            studentReports: {
                                create: studentData.map((student: any) => ({
                                    studentName: student.studentName,
                                    teacherName,
                                    absences: 0,
                                    tardies: 0,
                                    otherComments: '',
                                    date: new Date(reportDate),
                                    subjects: {
                                        create: [
                                            {
                                                name: 'Mathematics',
                                                grade: student.mathGrade,
                                                comment: '',
                                                status: student.mathGrade >= 70 ? 'Satisfactory' : 'Unsatisfactory',
                                                assessments: {
                                                    create: Object.entries(student.mathAssessments).map(([testName, score]: [string, any]) => ({
                                                        testName,
                                                        score: parseInt(score, 10),
                                                    })),
                                                },
                                            },
                                            {
                                                name: 'Reading',
                                                grade: student.readingGrade,
                                                comment: '',
                                                status: student.readingGrade >= 70 ? 'Satisfactory' : 'Unsatisfactory',
                                                assessments: {
                                                    create: Object.entries(student.readingAssessments).map(([testName, score]: [string, any]) => ({
                                                        testName,
                                                        score: parseInt(score, 10),
                                                    })),
                                                },
                                            },
                                            {
                                                name: 'Writing',
                                                grade: student.writingGrade,
                                                comment: '',
                                                status: student.writingGrade >= 70 ? 'Satisfactory' : 'Unsatisfactory',
                                                assessments: {
                                                    create: Object.entries(student.writingAssessments).map(([testName, score]: [string, any]) => ({
                                                        testName,
                                                        score: parseInt(score, 10),
                                                    })),
                                                },
                                            },
                                            {
                                                name: 'Behavior',
                                                grade: null,
                                                comment: '',
                                                status: null,
                                            },
                                            {
                                                name: 'Work Habits',
                                                grade: null,
                                                comment: '',
                                                status: null
                                            },
                                            {
                                                name: 'Homework',
                                                grade: null,
                                                comment: '',
                                                status: null
                                            },
                                        ],
                                    },
                                })),
                            },
                        },
                    });
                    return res.json(newReportingPeriod)
                } else {
                    const newReportingPeriod = await prisma.reportingPeriod.create({
                        data: {
                            name,
                            date: new Date(reportDate),
                            roomNumber,
                            gradeLevel
                        },
                    });
                    return res.json(newReportingPeriod)
                }
                // Failing because user needs to be created first
            } catch (error) {
                console.error('eeeeeerrroroooorrr', error);
                throw new Error('Transaction failed, rolling back.');
            }
        });
        return transaction;
        // GET all posts
    } else if (req.method === 'GET') {
        try {
            const reportingPeriods = await prisma.reportingPeriod.findMany({
                select: {
                    id: true,
                    name: true,
                    date: true
                },
            });
            res.json(reportingPeriods)
        } catch (error) {
            console.error('Error fetching reporting periods:', error);
            res.json({ error: error })
        }
    }
}
