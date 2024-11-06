import React from "react"
import { Skeleton, Table } from "antd"
import cloneDeep from "lodash.clonedeep"

class TableWithLoader extends React.Component {
  defaultRows = 10

  getOverridedColumns = (columns, loaderComponent = null) => {
    if (!columns) return []

    return cloneDeep(columns).map((column) => {
      column.render = () =>
        loaderComponent ? loaderComponent : <Skeleton loading active />

      column.children?.map(children => {
        children.render = () => loaderComponent ? loaderComponent : <Skeleton loading active />
      })

      return column
    })
  }

  render() {
    let { dataSource, columns, loader } = this.props

    return (
      <Table
        {...this.props}
        dataSource={
          dataSource
            ? dataSource
            : Array(
              loader && loader.rows ? loader.rows : this.defaultRows
            ).fill({})
        }
        columns={
          dataSource
            ? columns
            : this.getOverridedColumns(
              columns,
              loader ? loader.component : undefined
            )
        }
      />
    )
  }
}

export default TableWithLoader
