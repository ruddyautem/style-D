import { Outlet } from 'react-router-dom';
import Directory from '../../components/directory/directory.component';

const Home = () => {
    return (
        <main>
            <Directory />
            <Outlet />
        </main>
    );
};

export default Home;