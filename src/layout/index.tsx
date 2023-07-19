import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout: React.FC = () => {
    return <div className="d-flex" style={{ overflowX: 'hidden' }}>
        <Sidebar />
        <div className="d-flex flex-column bg-white col-10">
            <Header />
            <div className="content-body">
                <Content />
            </div>
            <Footer />
        </div>
    </div>
}

export default Layout;
