import React from "react"
import TestRenderer from "react-test-renderer"
import TableWithLoader from "../src/index"

import { Table } from "antd"
import { v4 } from "uuid"

const getTable = (props) => {
  return <TableWithLoader rowKey={() => v4()} {...props} /> // Adds to rowKey prop a  unique key.
}

describe("TableWithLoader", () => {
  it("Renders a table with skeleton when no dataSource is provided", () => {
    const columns = [
      { title: "Name", dataIndex: "name" },
      { title: "Age", dataIndex: "age" },
    ]
    const renderer = TestRenderer.create(getTable({ columns: columns }))
    const table = renderer.root.findByType(Table)

    expect(table.props.dataSource.length).toBe(10) // 10 is the default rows
  })

  it("Renders a table with custom loader component when loader is provided", () => {
    const columns = [
      { title: "Name", dataIndex: "name" },
      { title: "Age", dataIndex: "age" },
    ]
    const loaderComponent = <div>Custom loading..</div>
    const renderer = TestRenderer.create(
      getTable({
        columns: columns,
        loader: { component: loaderComponent },
      })
    )
    const table = renderer.root.findByType(Table)

    expect(table.props.dataSource.length).toBe(10)
    expect(table.props.columns[0].render()).toBe(loaderComponent)
  })

  it("Renders a table with provided dataSource and columns when both are provided", () => {
    const columns = [
      { title: "Name", dataIndex: "name" },
      { title: "Age", dataIndex: "age" },
    ]
    const dataSource = [
      { name: "John", age: 25 },
      { name: "Jane", age: 30 },
    ]
    const renderer = TestRenderer.create(
      getTable({
        columns: columns,
        dataSource: dataSource,
      })
    )
    const table = renderer.root.findByType(Table)

    expect(table.props.dataSource).toBe(dataSource)
    expect(table.props.dataSource.length).toBe(dataSource.length)

    expect(table.props.columns).toBe(columns)
  })
})


it("Renders a table with children with custom loader component when loader is provided", () => {
  const columns = [
    { title: "Name", dataIndex: "name", children: [
      {
        title: "Child name", dataIndex: "childName"
      }
    ] },
    { title: "Age", dataIndex: "age" },
  ]
  const loaderComponent = <div>Custom loading..</div>
  const renderer = TestRenderer.create(
    getTable({
      columns: columns,
      loader: { component: loaderComponent },
    })
  )
  const table = renderer.root.findByType(Table)

  expect(table.props.dataSource.length).toBe(10)
  expect(table.props.columns[0].render()).toBe(loaderComponent)
  expect(table.props.columns[0].children[0].render()).toBe(loaderComponent)
})