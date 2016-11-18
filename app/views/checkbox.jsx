
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './checkbox.scss'


class CheckBox extends Component{

    constructor(props){
        super(props);

        var items = props.items;
        this.state = {
            items:items.map(function(item){
                return {
                    ...item,
                    selected:false
                };
            }),
            selectedIndex:-1
        };
        this.itemClick = this.itemClick.bind(this
        );
    }

    itemClick(index){
        const newItems = this.state.items.map(function(item,itemIndex){
            if(itemIndex == index){
                item.selected = !item.selected;
            }
            return item;
        });
        this.setState({
            items:newItems
        });
    }

    render(){
        var self = this;
        const title = this.props.title;
        const items = this.state.items;
        return (
            <div className="checkbox">
                <div className="checkbox-label">{title}</div>
                {items.map(function(item,index){
                    return (
                        <div className="checkbox-item" key={index} onClick={() => {self.itemClick(index);} }>
                            <div className={item.selected ? "checkbox-item-flag checkbox-item-flag-selected" : "checkbox-item-flag"}>
                                <div className={item.selected ? "checkbox-item-flag-inner checkbox-item-flag-inner-selected" : "checkbox-item-flag-inner"}></div>
                            </div>
                            <div className="checkbox-item-label">{item.label}</div>
                        </div>
                    );
                })}
            </div>
        );
    }

}

export default CheckBox