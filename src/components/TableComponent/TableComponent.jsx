import { Table } from 'antd';
import React, { useState } from 'react'
import Loading from '../../components/LoadingComponent/Loading'

import { useMemo } from 'react';


const TableComponent = (props) => {
  const { selectionType = 'checkbox', data:dataSource = [], isLoading = false, columns = [], handleDelteMany } = props

  const [rowSelectedKeys, setRowSelectedKeys] = useState([])
  const newColumnExport = useMemo(() => {
    const arr = columns?.filter((col) => col.dataIndex !== 'action')
    return arr
  }, [columns])
  
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const handleDeleteAll = () => {
    handleDelteMany(rowSelectedKeys)
    setRowSelectedKeys([])

  }

  // const exportExcel = () => {
  //   const excel = new Excel();
  //   excel
  //     .addSheet("test")
  //     .addColumns(newColumnExport)
  //     .addDataSource(dataSource, {
  //       str2Percent: true
  //     })
  //     .saveAs("Excel.xlsx");
  // };

  
  return (
    <Loading isLoading={isLoading}>
      {!!rowSelectedKeys.length && (
        <div style={{
          background: 'rgb(157,131,81)',
          color: '#fff',
          fontWeight: 'bold',
          padding: '10px',
          cursor: 'pointer',
          fontSize: '18px'
        }}
          onClick={handleDeleteAll}
        >
          Xóa tất cả
        </div>
      )}
      
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        {...props}
      />
    </Loading>
  )
}

export default TableComponent