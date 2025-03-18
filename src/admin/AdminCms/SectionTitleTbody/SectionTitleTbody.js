import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import './SectionTitleTbody.css';
import { NavLink } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { TiArrowUnsorted } from "react-icons/ti";
import { HashLink } from 'react-router-hash-link';


const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = key => {
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};

const ProductTable = props => {
    const { items, requestSort, sortConfig } = useSortableData(props.products);
    const url = props.url;
    const getClassNamesFor = name => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };


    return (


                        <div className='container-fluid'>
                            <div className='dashboardContentPanel h-auto'>
                                <div className='add_table_box'>
                                    <div className='donationHistorycontentPanel adminSitePages'>

                                        <div className='history_table ad_s_pt_24 h_t_w_100'>
                                            <table className='t_head'>
                                                <thead>
                                                    <th>
                                                        Section Title
                                                        <span onClick={() => requestSort('name')}
                                                            className={getClassNamesFor('name')} style={{ paddingLeft: '10px', cursor: 'pointer' }}><TiArrowUnsorted /> </span>
                                                    </th>

                                                    <th>
                                                        Author
                                                        <span onClick={() => requestSort('name')}
                                                            className={getClassNamesFor('name')} style={{ paddingLeft: '10px', cursor: 'pointer' }}><TiArrowUnsorted /> </span>
                                                    </th>

                                                    <th>Action</th>
                                                </thead>

                                                <tbody>
                                                    {items.map(item => (
                                                        <tr key={item.id}>
                                                            <td>{item.name}</td>
                                                            <td>{item.courses}</td>
                                                            <td>
                                                                <div className='lc_flex'>
                                                                    <HashLink to={item.link}>
                                                                        <VisibilityIcon style={{ cursor: 'pointer' }} className='ico_color_suc'></VisibilityIcon>
                                                                    </HashLink>
                                                                    <NavLink to={`${url}/SitePagesWelcomeSection`}>
                                                                        <BorderColorIcon className='ico_color_pri c_ml_15'></BorderColorIcon>
                                                                    </NavLink>

                                                                    <DeleteOutlineIcon style={{ cursor: 'pointer' }} className='ico_color_danger c_ml_15'></DeleteOutlineIcon>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>


                                <div className='pagination'>
                                    <div>
                                        <p>showing 1 to 10 of 9,225 entries</p>
                                    </div>
                                    <div>
                                        <Pagination count={50} shape='rounded'></Pagination>
                                    </div>

                                    <div>
                                        <select>
                                            <option>5/page</option>
                                            <option>10/page</option>
                                            <option>15/page</option>
                                        </select>
                                    </div>

                                    <div>
                                        <span> go to</span>
                                        <input style={{ width: '50px' }}></input>
                                    </div>
                                </div>
                            </div>
                        </div>

    );
};


export default function SectionTitleTbody({ url }) {

    return (
        <div className='App w-100'>
            <ProductTable
                url={url}
                products={[
                    {
                        id: 2,
                        name: 'Banner Images',
                        courses: 'Admin',
                        link: '/#Top'
                    },
                    { id: 3, name: 'Welcome Section', courses: 'Admin', link: '/#welcomeContainer' },
                    { id: 4, name: 'Rise Of Medical Epidemic Section', courses: 'Admin', link: '/#riseOfMedicalEpidemicSection' },
                    {
                        id: 5,
                        name: 'Join Now Section',
                        courses: 'Admin',
                        link: '/#joinNowSection'
                    },
                    { id: 6, name: 'Join Section', courses: 'Admin', link: '/#joinSection' },
                    { id: 7, name: 'Footer Section', courses: 'Admin', link: '/#footer' },
                ]}
            />
        </div>
    );
}
