



  import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../../services/categoryService';
import { CategoryModal } from './CategoryModal';
import '../common/styles/ListingStyles.css';
import { UseSearchQuery } from 'hooks/useSearchQuery';
import { EnhancedTable } from 'components/SmartTable/SmartTable';
import { dayMonthYear } from 'helpers/Date';
import { PaginationComponent } from 'features/courses/components/Paginitation';



const actions = ( {url, id, category_name, handleEditCallback } ) => {


  const HandleEditButton = ( id, category_name ) => {

    handleEditCallback(id, category_name);                                                                                               

  }

  return(
    <>

          <div className='lc_flex justify-center items-center'>
                        
            <Button variant='contained' className='bt_danger' onClick={()=> HandleEditButton(id,category_name)} > Edit </Button>
                        
          </div>
    </>
    
  )
}

const ProductTable = ({url}) => {

  const { search, bindFormValue, setOrderByField, sortingOrder, setCount, setPage } = UseSearchQuery();
  const [ orderObject, setOrderObject ] = useState( {'order': null, 'orderBy': null })
  const [ isLoading, setIsLoading ] = useState(true);

  const [ rows, setRows ] = useState([]);
  
  

  const [ totalEntries, setTotalEntries ] = useState(0);
  const [selectedItem, setSelectedItem] = useState({'name': '', 'id': ''});
  const [showCategoryModal, SetShowCategoryModal] = useState(null);


  useEffect( () => {
    if(search){
      initData();
    }
   
  },[search])

  const HandleEditButton = ( categoryId, categoryName ) => {

    setSelectedItem({'name': categoryName, 'id': categoryId});
    SetShowCategoryModal(true);                                                                                                   
    
    }

  const handleCloseModal = (modalState) => {
    SetShowCategoryModal(modalState)
  };

  const handleAddCategory = () => {
    setSelectedItem({'name': null, 'id': null});
    SetShowCategoryModal(true);
    initData();
  };

  const initData = async () => {
    const response = await getAllCategories(search);
    
    setRows(response.data.data);
    setTotalEntries(response.data.totalCount);
    setIsLoading(false);
  } 

  const renderDate = (field, row) =>{
    return dayMonthYear(row[field]);
  }

  const headers = [
    { 'label': 'Category', 'id': 'category_name', 'align': 'start'},
    { 'label': 'Author', 'id':'Author','defaultValue':'Admin', 'align':'start'},
    { 'label': 'Category Creation Date', 'formattingCallbackV2':renderDate, 'id': 'createdAt', 'align': 'start'},

  ]



  if(!isLoading) {
  return (
    <>
    <div className='container-fluid'>

      <div className='content_title l_pad'>
      <Button variant={'outlined'} onClick={ handleAddCategory } handleAddCategoryvariant='contained'>Add Category</Button>
      </div>
    <div className='AdminDashboardContentPanel'>
      <EnhancedTable actions={(props) => actions({...props, 'handleEditCallback': HandleEditButton }) } actionsAdditionalFields={['category_name']} url={url} tableName={'List of Categories'} headers={headers}  rows={rows} setOrderOnParent={ (state) => { sortingOrder(state.order); setOrderByField(state.orderBy) } } />

      <PaginationComponent  initTotalEntries={totalEntries} initItemsPerPageCount={5} initPageNumber={1} setParamsOnParent={({page,itemsPerPageCount}) =>{setPage(page); setCount(itemsPerPageCount)} } ></PaginationComponent>
    </div>

    <CategoryModal showModal={ showCategoryModal } categoryName={ selectedItem.name } categoryId={selectedItem.id} onAddOrChange={ () => initData() } onClose={handleCloseModal}  > </CategoryModal>

  </div>
  </>
  );
  }
};


export default function AdminSitePages({ url }) {

  return (
    <div className='App w-100'>
      <ProductTable
        url={url}
      />
    </div>
  );
}






















