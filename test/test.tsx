import * as React from 'react';
import { render } from 'react-dom';
import Griddle, { CustomColumnComponentProps } from 'griddle-react';

interface MyCustomResult {
  name: string,
  test: string
}

class LinkComponent extends React.Component<CustomColumnComponentProps<MyCustomResult>, any> {
  render() {
    var url = "speakers/" + this.props.rowData.test + "/" + this.props.data;
    return <a href={url}>{this.props.data}</a>
  }
}

const StatelessFunctionComponent = (props: CustomColumnComponentProps<MyCustomResult>) => {
  var url = "speakers/" + props.rowData.test + "/" + props.data;
  return <a href={url}>{props.data}</a>
};

var columnMeta = [
  {
    columnName: "name",
    order: 1,
    locked: false,
    visible: true,
    customComponent: StatelessFunctionComponent
  }];

var results: MyCustomResult[] = [
  {
    name: 'David Hara',
    test: 'blah'
  },
  {
    name: 'Hara, David',
    test: 'blah2'
  }
];

var rowMetaData = {
  bodyCssClassName: (rowData: MyCustomResult) => {
    return rowData.test;
  }
};

type TypedGriddle = new () => Griddle<MyCustomResult>;
const TypedGriddle = Griddle as TypedGriddle;

render(
  <div>
    <TypedGriddle
      results={results}
      columnMetadata={columnMeta}
      rowMetadata={rowMetaData}
      sortAscendingComponent={<span className="fa fa-sort-alpha-asc"/>}
      sortDescendingComponent={<span className="fa fa-sort-alpha-desc"/>}
      customRowComponent={LinkComponent}
    />
  </div>,
  document.getElementById('root')
);