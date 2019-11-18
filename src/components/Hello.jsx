import React,{Component} from "react";

import "../scss/hello.scss";

export default class Hello extends Component{
    render () {
        return (
            <div className="hello">
                <h1>Hello,world!</h1>
            </div>
        );
    }
}
