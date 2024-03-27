/**
 * This file determines layout
 * Sidebar to left, content to right
 * Should be imported on all 3 pages
 */
import SideNav from './SideNav';

const Layout = ({ children }) => {
    return (
        <div className="flex">
            <SideNav />
            <div className="flex-1 p-10">{children}</div>
        </div>
    );
};

export default Layout;