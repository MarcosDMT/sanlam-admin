// import PropTypes from 'prop-types';
// import { List, ListSubheader } from '@mui/material';
// import { DashboardSidebarItem } from './dashboard-sidebar-item';

// const renderNavItems = ({ depth = 0, items, path }) => (
//     <List disablePadding>
//         {items.reduce((acc, item) => reduceChildRoutes({ acc, depth, item, path }), [])}
//     </List>
// );

// const reduceChildRoutes = ({ acc, depth, item, path }) => {
//     const key = `${item.title}-${depth}`;
//     const partialMatch = item.path ? path.includes(item.path) : false;
//     const exactMatch = path.split('?')[0] === item.path; // We don't compare query params

//     if (item.children) {
//         acc.push(
//             <DashboardSidebarItem
//                 active={partialMatch}
//                 chip={item.chip}
//                 depth={depth}
//                 icon={item.icon}
//                 info={item.info}
//                 key={key}
//                 open={partialMatch}
//                 path={item.path}
//                 title={item.title}
//             >
//                 {renderNavItems({
//                     depth: depth + 1,
//                     items: item.children,
//                     path
//                 })}
//             </DashboardSidebarItem>
//         );
//     } else {
//         acc.push(
//             <DashboardSidebarItem
//                 active={exactMatch}
//                 chip={item.chip}
//                 depth={depth}
//                 icon={item.icon}
//                 info={item.info}
//                 key={key}
//                 path={item.path}
//                 title={item.title}
//             />
//         );
//     }

//     return acc;
// };

// export const DashboardSidebarSection = (props) => {
//     const { items, path, title, ...other } = props;

//     return (
//         <List
//             subheader={(
//                 <ListSubheader
//                     disableGutters
//                     disableSticky
//                     sx={{
//                         //color: 'neutral.500',
//                         fontSize: '0.75rem',
//                         fontWeight: 700,
//                         lineHeight: 2.5,
//                         ml: 4,
//                         textTransform: 'uppercase'
//                     }}
//                 >
//                     {title}
//                 </ListSubheader>
//             )}
//             {...other}>
//             {renderNavItems({
//                 items,
//                 path
//             })}
//         </List>
//     );
// };

// DashboardSidebarSection.propTypes = {
//     items: PropTypes.array.isRequired,
//     path: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired
// };



import PropTypes from 'prop-types';
import { List, ListSubheader } from '@mui/material';
import { DashboardSidebarItem } from './dashboard-sidebar-item';

const renderNavItems = ({ depth = 0, child, path }) => (
    <List disablePadding>
        {child.reduce((acc, item) => reduceChildRoutes({ acc, depth, item, path }), [])}
    </List>
);

const reduceChildRoutes = ({ acc, depth, item, path }) => {
    const key = `${item.pageName}-${depth}`;
    const partialMatch = item.route ? path?.includes(item.route) : false;
    const exactMatch = path?.split('?')[0] === item.route; // We don't compare query params

    //console.log('CHILDREN', item.child);

    if (Array.isArray(item.child)) {
        if (item.child.length !== 0) {
            acc.push(
                <DashboardSidebarItem
                    role ={item.role}
                    disabled={!item.enabled}
                    active={partialMatch}
                    chip={item.chip}
                    depth={depth}
                    icon={item.pageIcon}
                    info={item.info}
                    key={key}
                    open={partialMatch}
                    path={item.route}
                    title={item.pageName}
                >
                    {renderNavItems({
                        depth: depth + 1,
                        child: item.child ,
                        path
                    })}
                </DashboardSidebarItem>
            );
        }
        else{
            acc.push(
                <DashboardSidebarItem
                    role ={item.role}
                    disabled={!item.enabled}
                    active={exactMatch}
                    chip={item.chip}
                    depth={depth}
                    icon={item.pageIcon}
                    info={item.info}
                    key={key}
                    path={item.route}
                    title={item.pageName}
                />
            );
        }
    } else {
        acc.push(
            <DashboardSidebarItem
            role ={item.role}
                active={exactMatch}
                chip={item.chip}
                depth={depth}
                icon={item.pageIcon}
                info={item.info}
                key={key}
                path={item.route}
                title={item.pageName}
            />
        );
    }

    return acc;
};

export const DashboardSidebarSection = (props) => {
    //const { items, path, title, role, ...other } = props;
    const { child,  route, path, pageName, pageIcon, ...other } = props;
    return (
        <List
            subheader={(
                <ListSubheader
                    disableGutters
                    disableSticky
                    sx={{
                        //color: 'neutral.500',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        lineHeight: 2.5,
                        ml: 4,
                        textTransform: 'uppercase'
                    }}
                >
                    {pageName}
                </ListSubheader>
            )}
            {...other}>
            {renderNavItems({
                child,
                path
            })}
        </List>
    );
};

DashboardSidebarSection.propTypes = {
    // items: PropTypes.array.isRequired,
    route: PropTypes.string.isRequired,
    // title: PropTypes.string.isRequired
};
