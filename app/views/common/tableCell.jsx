import React from 'react';
import './tableCell.scss';

class TableCell extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="table-cell" onClick={() => this.props.onClick()}>
                <div className="table-cell-image">
                    <img src={this.props.imageUrl}/>
                </div>
                <div className="table-cell-title">{this.props.title}</div>
                {
                    this.props.value ? (<div className="table-cell-value text-overflow">{this.props.value}</div>) : (
                        <div className="table-cell-extra">{this.props.extra}</div>)
                }
                {
                    !this.props.hiddenIndicator && (<div className="table-cell-indicator"></div>)
                }
            </div>
        );
    }
}

export default TableCell;