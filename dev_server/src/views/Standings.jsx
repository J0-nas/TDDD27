import React from 'react';
import ReactDOM from 'react-dom';

import { Table } from 'react-bootstrap';

export default class Standings extends React.Component {
  constructor() {
    super();
  }
  
  render() {
    return (
      <Table responsive>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Points</th>
        <th>Artist</th>
        <th>Title</th>
        <th>Time</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
        <td>Table cell</td>
      </tr>
    </tbody>
  </Table>
    );
  }
}
