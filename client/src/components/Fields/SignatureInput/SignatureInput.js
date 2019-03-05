import React, { Component } from 'react';
import { connect } from 'react-redux'

import classes from './SignatureInput.scss'

class SignatureInput extends Component {
    
    state = {
        ctx: null,
        x: 0,
        y: 0,
    }

    componentDidMount(){
        this.setState({
            ctx: this.canvas.getContext('2d'),
            data: this.container.getBoundingClientRect()
        }, () => {
            this.resize();
            if(this.props.value){
                const img = new Image();
                img.onload = () => {
                    this.state.ctx.drawImage(img, 0, 0);
                };
                img.src = this.props.value;
            }
        })
    }

    resize = () => {
        this.state.ctx.canvas.width = this.container.clientWidth;
        this.state.ctx.canvas.height = this.container.clientHeight;
    }

    draw = e => {
        //left button must be pressed
        if (e.buttons !== 1) return;
        this.state.ctx.beginPath();
        this.state.ctx.lineWidth = this.props.styles.lineWidth;
        this.state.ctx.lineCap = 'round';
        this.state.ctx.strokeStyle = this.props.styles.color;

        this.state.ctx.moveTo(this.state.x, this.state.y); // from
        this.setPosition(e);
        this.state.ctx.lineTo(this.state.x, this.state.y); // to

        this.state.ctx.stroke(); // draw it!
    }

    setPosition = e => {
        const data = this.container.getBoundingClientRect();
        this.setState({
            x: e.clientX - data.left,
            y: e.clientY - data.top
        })
    }

    updateCanvas = () => {
        this.props.canvasHandler(this.canvas.toDataURL())
    }   

    render() {

        let holder = (
            <div className={classes.Holder}>...</div>
        )
        return (
            <div className={classes.Container} style={this.props.preview ? { background: '#eee' } : null}>
                {this.props.connectDragSource ? this.props.connectDragSource(holder) : holder}
                <div ref={el => this.container = el} className={classes.SignatureInput} >
                    <canvas ref={el => this.canvas=el} 
                        onMouseMove={this.draw}
                        onMouseDown={this.setPosition}
                        onMouseEnter={this.setPosition}
                        onMouseUp={this.updateCanvas}
                        >

                    </canvas>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    if(!props.id) return {}
    return {
        styles: props.blockId ? state.appState.editors[props.editorId][props.blockId].children[props.id].styles : state.appState.editors[props.editorId][props.id].styles
    }
}

export default connect(mapStateToProps)(SignatureInput);