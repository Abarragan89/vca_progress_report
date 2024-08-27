import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/prisma';
import { Subject } from '@prisma/client';

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        let { id: reportId } = req.query
        reportId = reportId as string;

        if (!reportId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const { data } = await req.body
        const { absences, tardies, grades, studentName, otherComments } = data;

        try {
            // Update each subject within the student report
            const updateGrades = await Promise.all(
                await grades.map(async (subject: Subject) => {
                    await prisma.subject.update({
                        where: { id: subject.id },
                        data: subject,
                    })
                }));

            const updatedUser = await prisma.studentReport.update({
                where: { id: parseInt(reportId) },
                data: {
                    absences,
                    tardies,
                    studentName,
                    otherComments
                },
                include: {
                    subjects: true,
                },
            });

            res.status(200).json(updatedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}