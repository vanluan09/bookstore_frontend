import { Button, Form, Select, Space } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import React, { createElement, useRef } from 'react'
import { WrapperButtonApply, WrapperButtonChooseFile, WrapperButtonComponent, WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../TableComponent/TableComponent'
import { useState } from 'react'
import InputComponent from '../InputComponent/InputComponent'
import { getBase64, renderOptions } from '../../utils'
import * as ProductService from '../../services/ProductService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import { useEffect } from 'react'
import * as message from '../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../ModalComponent/ModalComponent'

const ExcelJS = require('exceljs')



const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null);

  const inittial = () => ({
    name: '',
    price: '',
    description: [],
    image: '',
    type: [],
    countInStock: '',
    file:''
  })
  const [stateProduct, setStateProduct] = useState(inittial())
  const [stateProductDetails, setStateProductDetails] = useState(inittial())

  const [form] = Form.useForm();

  const mutation = useMutationHooks(
    (formData) => {
      const res = ProductService.createProduct(formData)
      return res
    }
  )

  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id,
        token,
        formData } = data
      const res = ProductService.updateProduct(
        id,
        token,
        formData)
      return res
    },
  )

  const mutationDeleted = useMutationHooks(
    (data) => {
      const { id,
        token,
      } = data
      const res = ProductService.deleteProduct(
        id,
        token)
      return res
    },
  )

  const mutationDeletedMany = useMutationHooks(
    (data) => {
      const { token, ...ids
      } = data
      const res = ProductService.deleteManyProduct(
        ids,
        token)
      return res
    },
  )

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct()

    return res
  }

  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProductService.getDetailsProduct(rowSelected)
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        price: res?.data?.price,
        description: res?.data?.description,
        image: res?.data?.image,
        type: res?.data?.type,
        countInStock: res?.data?.countInStock,
        file: res?.data?.file,
      })
    }
    setIsLoadingUpdate(false)
  }

  useEffect(() => {
    if(!isModalOpen) {
      form.setFieldsValue(stateProductDetails)
    }else {
      form.setFieldsValue(inittial())
    }
  }, [form, stateProductDetails, isModalOpen])

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true)
      fetchGetDetailsProduct(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])

  const handleDetailsProduct = () => {
    setIsOpenDrawer(true)
  }

  const handleDelteManyProducts = (ids) => {
    mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
    
  }

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    return res
  }

  const { data, isLoading, isSuccess, isError } = mutation

  const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate

  const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted

  const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


  const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProducts })
  console.log('queryProduct', queryProduct.data)
  const typeProduct = useQuery({ queryKey: ['type-product'], queryFn: fetchAllTypeProduct })
  const { isLoading: isLoadingProducts, data: products } = queryProduct


  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
        <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
      </div>
    )
  }


  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: '#ffc069',
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });


  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Giá sản phẩm',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: '>= 100000',
          value: '>=',
        },
        {
          text: '<= 100000',
          value: '<=',
        }
      ],
      onFilter: (value, record) => {
        if (value === '>=') {
          return record.price >= 100000
        }
        return record.price <= 100000
      },
    },
    {
      title: 'Mẫu sản phẩm',
      dataIndex: 'type',
    },
    {
      title: 'Số hàng trong kho',
      dataIndex: 'countInStock',
    },
    {
      title: 'Chỉnh sửa',
      dataIndex: 'action',
      render: renderAction
    },
  ];

  const dataTable = products?.data?.length && products?.data?.map((product) => {
    return { ...product, key: product._id }
  })

  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      message.success()
      handleCancel()
    } else if (isError) {
      message.error()
    }
  }, [isSuccess])

  useEffect(() => {
    if (isSuccessDelectedMany && dataDeletedMany?.status === 'OK') {
      message.success()

    } else if (isErrorDeletedMany) {
      message.error()
    }
  }, [isSuccessDelectedMany])

  useEffect(() => {
    if (isSuccessDelected && dataDeleted?.status === 'OK') {
      message.success()
      handleCancelDelete()
    } else if (isErrorDeleted) {
      message.error()
    }
  }, [isSuccessDelected])

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: '',
      price: '',
      description: [],
      image: '',
      type: [],
      countInStock: '',
      file:'',
    })
    form.resetFields()
  };

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success()
      handleCloseDrawer()
    } else if (isErrorUpdated) {
      message.error()
    }
  }, [isSuccessUpdated])

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }


  const handleDeleteProduct = () => {
    mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: '',
      price: '',
      description: [],
      image: '',
      type: [],
      countInStock: '',
    })
    form.resetFields()
  };

  const onFinish = () => {
    const formData = new FormData()
    formData.append('name', stateProduct.name);
    formData.append('price', stateProduct.price);
    stateProduct.description.forEach((item, index) => {
      formData.append(`description[${index}]`, item);
    });
    formData.append('image', stateProduct.image);
    stateProduct.type.forEach((item, index) => {
      formData.append(`type[${index}]`, item);
    });
    formData.append('countInStock', stateProduct.countInStock)
    if (stateProduct.file instanceof File) {
      formData.append('file', stateProduct.file);
    }
    mutation.mutate(formData, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  }

  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    })
  }

  const handleOnchangeTypeDetails = (value) => {
    setStateProductDetails({
      ...stateProductDetails,
      type: value
    })
  }

  const handleOnchangeDescriptionDetails = (value) => {
    setStateProductDetails({
      ...stateProductDetails,
      description: value
    })
  }

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview
    })
  }

  const handleOnchangeFile = async ({ fileList }) => {

    setStateProduct({
      ...stateProduct,
      file: fileList[0]?.originFileObj
    })
  }

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetails({
      ...stateProductDetails,
      image: file.preview
    })
  }

  const handleOnchangeFileDetails = async ({ fileList }) => {
    
    setStateProductDetails({
      ...stateProductDetails,
      file: fileList[0]?.originFileObj
    })
  }

  const onUpdateProduct = () => {
    const formData = new FormData()
    formData.append('name', stateProductDetails.name);
    formData.append('price', stateProductDetails.price);
    stateProductDetails.description.forEach((item, index) => {
      formData.append(`description[${index}]`, item);
    });
    formData.append('image', stateProductDetails.image);
    stateProductDetails.type.forEach((item, index) => {
      formData.append(`type[${index}]`, item);
    });
    formData.append('countInStock', stateProductDetails.countInStock)
    if (stateProductDetails.file instanceof File) {
      formData.append('file', stateProductDetails.file);
    }
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, formData}, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  }

  const handleChangeTypeSelect = (value) => {
      setStateProduct({
        ...stateProduct,
        type: value
      })
  }

  const handleChangeDescriptionSelect = (value) => {
      setStateProduct({
        ...stateProduct,
        description: value
      })
  }



  const exportExcel = () => {
  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet('My Sheet')
  sheet.properties.defaultRowHeight = 30
  sheet.columns = [
    {
      header: 'Tên sản phẩm',
      key: 'name',
      width: '30'     
    },
    {
      header: 'Giá sản phẩm',
      key: 'price',
      width: '15'
      
    },
    {
      header: 'Mẫu sản phẩm',
      key: 'type',
      width: '20'
    },
    {
      header: 'Số hàng trong kho',
      key: 'countInStock',
      width: '12'
    },
    {
      header: 'Chi tiết sản phẩm',
      key: 'description',
      width: '40'
    },
    
  ];
  dataTable?.map(product => {
    sheet.addRow({
      id: product?._id,
      name: product?.name,
      price: product?.price,
      type: product?.type,
      description: product?.description,
      countInStock: product?.countInStock,
 
    })
  })
  workbook.xlsx.writeBuffer().then(dataTable => {
    const blob = new Blob([dataTable], {type: '/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
    const url = window.URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'products.xlsx'
    anchor.click()
    window.URL.revokeObjectURL(url)
  })
}


  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>

      <div style={{ marginTop: '10px' }}>
        <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}><PlusOutlined style={{ fontSize: '60px' }} /></Button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <WrapperButtonComponent 
          onClick={exportExcel}
          textButton={'Xuất file Excel'}
          styleButton={{margin:'20px 0', display:'block', background:'#DC2129', border:'none', height:'auto', width:'auto', borderRadius:'12px', fontSize:'18px', color:'#fff'}}
        />
        
        <TableComponent 
          handleDelteMany={handleDelteManyProducts} 
          columns={columns} 
          isLoading={isLoadingProducts} 
          pagination={{
            pageSize: 10,
          }}
          data={dataTable} 
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                setRowSelected(record._id)
              }
            };
          }} 
        />
      </div>

      <ModalComponent forceRender title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Loading isLoading={isLoading}>

          <Form
            name="basic"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 17 }}
            onFinish={onFinish}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[{ required: true, message: 'Vui lòng điền tên sản phẩm!' }]}
            >
              <InputComponent value={stateProduct['name']} onChange={handleOnchange} name="name" />
            </Form.Item>

            <Form.Item
              label="Mẫu sản phẩm"
              name="type"
              rules={[{ required: true, message: 'Vui lòng điền mẫu sản phẩm!' }]}
            >
              <Select
                name="type"
                mode="tags"
                value={stateProduct.type}
                onChange={handleChangeTypeSelect}
                options={renderOptions(typeProduct?.data?.data)}
              />
            </Form.Item>
            
            <Form.Item
              label="Số hàng trong kho"
              name="countInStock"
              rules={[{ required: true, message: 'Vui lòng điền số hàng trong kho!' }]}
            >
              <InputComponent value={stateProduct.countInStock} onChange={handleOnchange} name="countInStock" />
            </Form.Item>
            <Form.Item
              label="Giá sản phẩm"
              name="price"
              rules={[{ required: true, message: 'Vui lòng điền Giá sản phẩm!' }]}
            >
              <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price" />
            </Form.Item>
            <Form.Item
              label="Chi tiết sản phẩm"
              name="description"
              rules={[{ required: true, message: 'Vui lòng điền chi tiết sản phẩm!' }]}
            >
              <Select
                name="description"
                mode="tags"
                value={stateProduct.description}
                onChange={handleChangeDescriptionSelect}
      
              />
            </Form.Item>
            <Form.Item
              label="Ảnh sản phẩm"
              name="image"
              rules={[{ required: true, message: 'Vui lòng thêm ảnh sản phẩm!' }]}
            >
              <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                <WrapperButtonChooseFile >Chọn ảnh</WrapperButtonChooseFile>
                {stateProduct?.image && (
                  <img src={stateProduct?.image} style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginLeft: '10px'
                  }} alt="Ảnh sản phẩm" />
                )}
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item
              label="File Sách đọc"
              name="file"
              rules={[]}
            >
              <WrapperUploadFile onChange={handleOnchangeFile} maxCount={1}>
                <WrapperButtonChooseFile >Chọn file</WrapperButtonChooseFile>
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <WrapperButtonApply type="primary" htmlType="submit">
                Xác nhận
              </WrapperButtonApply>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>

      <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

          <Form
            name="basic"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
            onFinish={onUpdateProduct}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[{ required: true, message: 'Vui lòng điền tên sản phẩm!' }]}
            >
              <InputComponent value={stateProductDetails['name']} onChange={handleOnchangeDetails} name="name" />
            </Form.Item>

            <Form.Item
              label="Mẫu sản phẩm"
              name="type"
              rules={[{ required: true, message: 'Vui lòng điền mẫu sản phẩm!' }]}
            >
              <Select
                name="type"
                mode="tags"
                value={stateProductDetails.type}
                onChange={handleOnchangeTypeDetails}
                options={renderOptions(typeProduct?.data?.data)}
              />
            </Form.Item>
            <Form.Item
              label="Số hàng trong kho"
              name="countInStock"
              rules={[{ required: true, message: 'Vui lòng điền số hàng trong kho!' }]}
            >
              <InputComponent value={stateProductDetails.countInStock} onChange={handleOnchangeDetails} name="countInStock" />
            </Form.Item>
            <Form.Item
              label="Giá sản phẩm"
              name="price"
              rules={[{ required: true, message: 'Vui lòng điền giá sản phẩm!' }]}
            >
              <InputComponent value={stateProductDetails.price} onChange={handleOnchangeDetails} name="price" />
            </Form.Item>
            <Form.Item
              label="Chi tiết sản phẩm"
              name="description"
              rules={[{ required: true, message: 'Vui lòng điền chi tiết sản phẩm!' }]}
            >
              <Select
                name="description"
                mode="tags"
                value={stateProductDetails.description}
                onChange={handleOnchangeDescriptionDetails}
      
              />
            </Form.Item>
            <Form.Item
              label="Ảnh sản phẩm"
              name="image"
              rules={[{ required: true, message: 'Vui lòng thêm ảnh sản phẩm!' }]}
            >
              <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                <Button >Chọn ảnh</Button>
                {stateProductDetails?.image && (
                  <img src={stateProductDetails?.image} style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginLeft: '10px'
                  }} alt="ảnh sản phẩm" />
                )}
              </WrapperUploadFile>
            </Form.Item>
            <Form.Item
              label="File sách đọc"
              name="file"
              rules={[]}
            >
              <WrapperUploadFile onChange={handleOnchangeFileDetails} maxCount={1}>
                <Button >Chọn File</Button>
              </WrapperUploadFile>
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>

      <ModalComponent title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct}>
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc xóa sản phẩm này không?</div>
        </Loading>
      </ModalComponent>

    </div>
  )
}

export default AdminProduct