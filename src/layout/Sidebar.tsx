import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { Images } from "../constant/Images";
import { SVGs } from "../constant/SVGs";
import _routes from "../router/Routes";

const Sidebar: React.FC = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const matchedPath = useMatch(pathname);

    return <div className="col-2">
        <div className="navigation col-2">
            <div className="d-flex flex-column justify-content-center px-2" style={{ height: '8.5rem' }}>
                <div className="mt-2 mb-1 d-flex justify-content-center">
                    <img src={Images.BrandLogoWithNameLight} alt='brand-logo-light' style={{ width: '12.5rem', height: '9.5rem' }} />
                </div>
            </div>
            <ul className="pt-3">
                {_routes()?.GetByRole() && _routes()?.GetByRole()?.map((route, index) => {
                    const isActive = matchedPath?.pathname?.includes(`/${route?.path}`);
                    return route.name &&
                        <li key={index} className={`list ${isActive ? 'active' : ''}`}
                            onClick={() => navigate(route?.path)}>
                            <b></b>
                            <b></b>
                            <a>
                                <span className="icon">
                                    <img src={SVGs[route?.icon]} alt="sidebar-logo" height='26' width='26' className={isActive ? 'sidebar-icon-active' : 'sidebar-icon'} />
                                </span>
                                <span className="title">{route?.name}</span>
                            </a>
                        </li>
                })}
            </ul>
        </div>
    </div>
}

export default Sidebar;
