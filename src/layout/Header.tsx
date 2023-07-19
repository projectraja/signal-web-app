import { Dropdown, Menu, MenuProps, Modal } from "antd";
import Search from "antd/lib/input/Search";
import { ExclamationCircleOutlined, LogoutOutlined, UserOutlined, KeyOutlined } from '@ant-design/icons';
import { Icons } from "../constant/Icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import RootStore from "../mobx-store/RootStore";
import Function from "../utils/Function-Util";

const { confirm } = Modal;

const Header: React.FC = () => {
    const { authStore } = RootStore;
    let navigate = useNavigate();
    const { pathname } = useLocation();
    const logoutCb = useLogout();
    const pathnames = pathname.split("/").filter(Boolean);

    const onRouteToProfile = () => {
        navigate('/account/my-profile');
    }

    const onRouteToResetPassword = () => {
        navigate('/account/reset-password');
    }

    const showLogoutConfirm = () => {
        confirm({
            title: 'Logout',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to log out?',
            onOk() {
                logoutCb();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const items: MenuProps['items'] = [
        // {
        //     key: '1',
        //     label: 'Profile',
        //     icon: <UserOutlined />,
        //     onClick: onRouteToProfile
        // },
        // {
        //     type: 'divider',
        // },
        // {
        //     key: '2',
        //     label: 'Reset Password',
        //     icon: <KeyOutlined />,
        //     onClick: onRouteToResetPassword
        // },
        // {
        //     type: 'divider',
        // },
        {
            key: '3',
            label: 'Logout',
            icon: <LogoutOutlined />,
            onClick: showLogoutConfirm
        }
    ]

    return <div className="header">
        <div className="col d-flex align-items-center ps-2">
            <img src={Icons.BackNav} style={{ height: '22px', cursor: 'pointer' }} alt='Back-Nav' onClick={() => navigate(-1)} />
            <span className="ms-2 d-flex" style={{ alignItems: 'baseline' }}>
                {(pathnames.length && !pathname?.includes('dashboard')) ?
                    <span>
                        <Link to='/dashboard' style={{ color: '#635D5D', fontSize: '12px' }}>Dashboard</Link>
                        <span className="mx-1">/</span>
                    </span>
                    :
                    <span>
                        <div style={{ fontSize: '13px' }}>Dashboard</div>
                        {!pathname?.includes('dashboard') &&
                            <span className="mx-1">/</span>
                        }
                    </span>
                }
                {!pathname?.includes('dashboard') && pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;
                    return isLast ?
                        <div key={index} style={{ textTransform: 'capitalize', fontSize: '13px' }} className="text-ellipsis me-2">{name}</div>
                        :
                        <span key={index}>
                            <Link to={routeTo} style={{ textTransform: 'capitalize', color: '#635D5D', fontSize: '12px' }}>{name}</Link>
                            <span className="mx-1">/</span>
                        </span>
                })}
            </span>
        </div>
        <div className="col d-flex justify-content-end align-items-center pe-2">
            <div className="me-2" style={{ fontSize: '14.5px' }}>
                <span className="me-2" style={{ fontStyle: 'italic' }}>Hi,</span>{authStore?.roleName}</div>
            <Dropdown className="dropdown-btn" menu={{ items }} trigger={['click']}>
                <img src={Icons.User} style={{ height: '30px', cursor: 'pointer' }} alt='User' />
            </Dropdown>
        </div >
    </div >
}

export default Header;
