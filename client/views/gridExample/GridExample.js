import React from 'react';
import * as kendo from '@progress/kendo-ui';
/* Alternative approaches to load Kendo UI will be:
import '@progress/kendo-ui';
require("@progress/kendo-ui/js/kendo.all.js"); */
import '@progress/kendo-theme-default/dist/all.css';
import { Grid } from '@progress/kendo-grid-react-wrapper';
import Layout from '../../components/Layout';

class GridExample extends React.Component {
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

  componentDidMount() {
    document.title = 'Grid Example';
  }

  render() {
    const gridOptions = {
      dataSource: {
        type: 'odata',
        transport: {
          read: 'https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders',
        },
        schema: {
          model: {
            fields: {
              OrderID: { type: 'number' },
              Freight: { type: 'number' },
              ShipName: { type: 'string' },
              OrderDate: { type: 'date' },
              ShipCity: { type: 'string' },
            },
          },
        },
        pageSize: 20,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true,
      },
      height: 550,
      filterable: true,
      sortable: true,
      pageable: true,
      columns: [{
        field: 'OrderID',
        filterable: false,
      },
        'Freight',
      {
        field: 'OrderDate',
        title: 'Order Date',
        format: '{0:MM/dd/yyyy}',
      }, {
        field: 'ShipName',
        title: 'Ship Name',
      }, {
        field: 'ShipCity',
        title: 'Ship City',
      },
      ],
    };

    return (
      <Layout>
        <div className="mdl-grid">
          <h1 className="mdl-typography--title">Kendo UI Grid Example</h1>
          <div id="root" className="mdl-layout__content">
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
        </div>
      </Layout>
    );
  }
}

export default GridExample;
