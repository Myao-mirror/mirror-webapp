import React from 'react';
import * as kendo from '@progress/kendo-ui';
/* Alternative approaches to load Kendo UI will be:
import '@progress/kendo-ui';
require("@progress/kendo-ui/js/kendo.all.js"); */
import '@progress/kendo-theme-default/dist/all.css';
import { Grid } from '@progress/kendo-grid-react-wrapper';


const gridOptions = {
  dataSource: {
    transport: {
      read: {
        url: 'https://demos.telerik.com/kendo-ui/service/Products',
        dataType: 'jsonp',
      },
      update: {
        url: 'https://demos.telerik.com/kendo-ui/service/Products/Update',
        dataType: 'jsonp',
      },
      destroy: {
        url: 'https://demos.telerik.com/kendo-ui/service/Products/Destroy',
        dataType: 'jsonp',
      },
      create: {
        url: 'https://demos.telerik.com/kendo-ui/service/Products/Create',
        dataType: 'jsonp',
      },
      parameterMap(options, operation) {
        if (operation !== 'read' && options.models) {
          return ({ models: kendo.stringify(options.models) });
        }
        return ({ models: '' });
      },
    },
    schema: {
      model: {
        id: 'ProductID',
        fields: {
          ProductID: { editable: false, nullable: true },
          ProductName: { validation: { required: true } },
          UnitPrice: { type: 'number', validation: { required: true, min: 1 } },
          Discontinued: { type: 'boolean' },
          UnitsInStock: { type: 'number', validation: { min: 0, required: true } },
        },
      },
    },
    pageSize: 20,
  },
  height: 550,
  selectable: true,
  filterable: true,
  groupable: true,
  sortable: true,
  pageable: true,
  editable: 'popup',
  toolbar: ['create'],
  columns: [
      { field: 'ProductID', filterable: false, title: 'ProductID' },
      { field: 'ProductName', title: 'Product Name' },
      { field: 'UnitPrice', title: 'Unit Price', format: '{0:c}' },
      { field: 'UnitsInStock', title: 'Units In Stock' },
      { field: 'Discontinued', title: 'Discontinued' },
      { command: ['edit', 'destroy'] },
  ],
};

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.dataSource = new kendo.data.DataSource({
      data: props.productData,
      pageSize: 20,
    });
    this.columns = [
      { field: 'ProductName', title: 'Product name' },
      { field: 'UnitPrice', title: 'Unit Price' },
      { field: 'UnitsInStock', title: 'Units In Stock' },
    ];
  }

  render() {
    return (
      <div>
        <Grid
          dataSource={this.dataSource}
          filterable
          sortable
          groupable
          pageable
          columns={this.columns}
          {...gridOptions}
        />
      </div>
    );
  }
}

export default Demo;
