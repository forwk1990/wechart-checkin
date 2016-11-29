
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './radiobox.scss'


class RadioBox extends Component{

    constructor(props){
        super(props);

        var items = props.items;
        this.state = {
            items:items,
            selectedIndex:-1
        };
        this.itemClick = this.itemClick.bind(this
        );
    }

    itemClick(index){
        this.setState({
            selectedIndex:index
        });
        this.props.onChange([].push(this.props.items[index].value));
    }

    render(){
        var self = this;
        const title = this.props.title;
        const items = this.state.items;
        return (
            <div className="rb">
                <div className="rb-label">{title}</div>
                {items.map(function(item,index){
                    return (
                        <div className="rb-item" key={index} onClick={() => {self.itemClick(index);} }>
                            <div className={self.state.selectedIndex == index ? "rb-item-flag rb-item-flag-selected" : "rb-item-flag"}>
                                <div className={self.state.selectedIndex == index ? "rb-item-flag-inner rb-item-flag-inner-selected" : "rb-item-flag-inner"}></div>
                            </div>
                            <div className="rb-item-label">{item.label}</div>
                        </div>
                    );
                })}
            </div>
        );
    }

}

export default RadioBox