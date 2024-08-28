// Get Single Reporting Period
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "../../../utils/prisma";


// Get a single Reporting Period
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let { id: reportId } = req.query
    reportId = reportId as string;

    if (!reportId) {
        res.status(400).json({ error: 'User ID is required' });
    }

    if (req.method === 'GET') {

        try {
            const report = await prisma.reportingPeriod.findUnique({
                where: { id: parseInt(reportId) },
                include: {
                    studentReports: {
                        include: {
                            subjects: {
                                include: {
                                    assessments: true
                                }
                            }
                        }
                    }
                }
            })

            if (!report) {
                res.status(400).json({ error: 'Report not found' })
            }
            res.status(200).json(report)

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: '' })
        }
    } else if (req.method === 'DELETE') {
        try {
            const report = await prisma.reportingPeriod.delete({
                where: { id: parseInt(reportId) }
            })

            if (!report) {
                res.status(400).json({ error: 'Report not found' })
            }
            res.status(200).json(report)

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: '' })
        }
    }
}