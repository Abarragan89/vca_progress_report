import { useRouter } from 'next/router';
import SingleReportingMain from "../../components/SingleReportingMain";
import Navigation from '../../components/Navigation';

export default function page() {

    const router = useRouter();

    let { id } = router.query;

    function printView() {
        window.print();
    }

    return (
        <main className='min-h-screen pt-16'>
            <Navigation />
            <button className='print:hidden' onClick={printView}>
                Print
            </button>
            <SingleReportingMain
                id={id as string}
            />
        </main>
    )
}
