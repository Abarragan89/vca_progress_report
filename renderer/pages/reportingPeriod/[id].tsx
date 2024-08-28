import { useRouter } from 'next/router';
import SingleReportingMain from "../../components/SingleReportingMain";
import Navigation from '../../components/Navigation';
import MainBtn from '../../components/Buttons/MainBtn';

export default function page() {

    const router = useRouter();

    let { id } = router.query;

    return (
        <main className='min-h-screen pt-16'>
            <Navigation />

            <SingleReportingMain
                id={id as string}
            />
        </main>
    )
}
