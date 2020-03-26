import React from 'react';
import { Modal, ModalHeader, ModalBody, FormGroup, Label, NavbarBrand } from 'reactstrap';

const photos = [
  { src: '/stickers/1.png' },
  { src: '/stickers/2.png' },
  { src: '/stickers/3.png' },
  { src: '/stickers/4.png' },
  { src: '/stickers/5.png' },
  { src: '/stickers/6.png' },
  { src: '/stickers/7.png' },
  { src: '/stickers/8.png' },
  { src: '/stickers/9.png' },
  { src: '/stickers/10.png' },
  { src: '/stickers/11.png' },
  { src: '/stickers/12.png' },
  { src: '/stickers/13.png' },
  { src: '/stickers/14.png' },
  { src: '/stickers/15.png' },
  { src: '/stickers/16.png' },
  { src: '/stickers/17.png' },
  { src: '/stickers/18.png' },
  { src: '/stickers/19.png' },
  { src: '/stickers/20.png' },
  { src: '/stickers/21.png' },
  { src: '/stickers/22.png' },
  { src: '/stickers/23.png' },
  { src: '/stickers/24.png' },
  { src: '/stickers/25.png' },
  { src: '/stickers/26.png' },
  { src: '/stickers/27.png' },
  { src: '/stickers/28.png' },
  { src: '/stickers/29.png' },
  { src: '/stickers/30.png' },
  { src: '/stickers/31.png' },
  { src: '/stickers/32.png' },
  { src: '/stickers/33.png' },
  { src: '/stickers/34.png' },
  { src: '/stickers/35.png' },
  { src: '/stickers/36.png' },
  { src: '/stickers/37.png' },
  { src: '/stickers/38.png' },
  { src: '/stickers/39.png' },
  { src: '/stickers/40.png' },
  { src: '/stickers/41.png' },
  { src: '/stickers/42.png' },
  { src: '/stickers/43.png' },
  { src: '/stickers/44.png' },
  { src: '/stickers/45.png' },
  { src: '/stickers/46.png' },
  { src: '/stickers/47.png' },
  { src: '/stickers/48.png' },
  { src: '/stickers/49.png' },
  { src: '/stickers/50.png' },
  { src: '/stickers/51.png' },
  { src: '/stickers/52.png' },
  { src: '/stickers/53.png' },
  { src: '/stickers/54.png' },
  { src: '/stickers/55.png' },
  { src: '/stickers/56.png' },
  { src: '/stickers/57.png' },






];

const initialState = {
  toptext: "",
  bottomtext: "",
  isTopDragging: false,
  isBottomDragging: false,
  topY: "10%",
  topX: "50%",
  bottomX: "50%",
  bottomY: "90%"
}

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      currentImage: 0,
      modalIsOpen: false,
      currentImagebase64: null,
      ...initialState
    };
  }

  openImage = (index) => {
    const image = photos[index];
    const base_image = new Image();
    base_image.src = image.src;
    const base64 = this.getBase64Image(base_image);
    this.setState(prevState => ({
      currentImage: index,
      modalIsOpen: !prevState.modalIsOpen,
      currentImagebase64: base64,
      ...initialState
    }));
  }

  toggle = () => {
    this.setState(prevState => ({
      modalIsOpen: !prevState.modalIsOpen
    }));
  }

  changeText = (event) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    });
  }

  getStateObj = (e, type) => {
    let rect = this.imageRef.getBoundingClientRect();
    const xOffset = e.clientX - rect.left;
    const yOffset = e.clientY - rect.top;
    let stateObj = {};
    if (type === "bottom") {
      stateObj = {
        isBottomDragging: true,
        isTopDragging: false,
        bottomX: `${xOffset}px`,
        bottomY: `${yOffset}px`
      }
    } else if (type === "top") {
      stateObj = {
        isTopDragging: true,
        isBottomDragging: false,
        topX: `${xOffset}px`,
        topY: `${yOffset}px`
      }
    }
    return stateObj;
  }

  handleMouseDown = (e, type) => {
    const stateObj = this.getStateObj(e, type);
    document.addEventListener('mousemove', (event) => this.handleMouseMove(event, type));
    this.setState({
      ...stateObj
    })
  }

  handleMouseMove = (e, type) => {
    if (this.state.isTopDragging || this.state.isBottomDragging) {
      let stateObj = {};
      if (type === "bottom" && this.state.isBottomDragging) {
        stateObj = this.getStateObj(e, type);
      } else if (type === "top" && this.state.isTopDragging){
        stateObj = this.getStateObj(e, type);
      }
      this.setState({
        ...stateObj
      });
    }
  };

  handleMouseUp = (event) => {
    document.removeEventListener('mousemove', this.handleMouseMove);
    this.setState({
      isTopDragging: false,
      isBottomDragging: false
    });
  }

  convertSvgToImage = () => {
    const svg = this.svgRef;
    let svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    const svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;
    const img = document.createElement("img");
    img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))));
    img.onload = function() {
      canvas.getContext("2d").drawImage(img, 0, 0);
      const canvasdata = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.download = "shitpost-sticker.png";
      a.href = canvasdata;
      document.body.appendChild(a);
      a.click();
    };
  }

  getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
  }

  render() {
    const image = photos[this.state.currentImage];
    const base_image = new Image();
    base_image.src = image.src;
    var wrh = base_image.width / base_image.height;
    var newWidth = 512;
    var newHeight = newWidth / wrh;
    const textStyle = {
      fontFamily: "Impact",
      fontSize: "40px",
      textTransform: "uppercase",
      fill: "#FFF",
      stroke: "#000",
      strokeWidth:"2",
      userSelect: "none"
    }

    return (
      <div>
        <div className="main-content">
          <div className="sidebar">
            <NavbarBrand href="/">sticker printer go brrrr</NavbarBrand>
            <p>
              I've stole it shamelessly from github repo and stack overflow and glued it with anger.
            </p>
            <p>
              Click on sticker template, add bottom and top text, save image, sent it to me. If you think its that good.
            </p>
          </div>
          <div className="content">
            {photos.map((image, index) => (
              <div className="image-holder" key={image.src}>
                <span className="meme-top-caption">Upper text</span>
                <img
                  style={{
                    width: "100%",
                    cursor: "pointer",
                    height: "100%"
                  }}
                  alt={index}
                  src={image.src}
                  onClick={() => this.openImage(index)}
                  role="presentation"
                />
              <span className="meme-bottom-caption">Bottom text</span>
              </div>
            ))}
          </div>
        </div>
        <Modal className="meme-gen-modal" isOpen={this.state.modalIsOpen}>
          <ModalHeader toggle={this.toggle}>haha sticker printer go brrrr</ModalHeader>
          <ModalBody>
            <svg
              width={newWidth}
              id="svg_ref"
              height={newHeight}
              ref={el => { this.svgRef = el }}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink">
              <image
                ref={el => { this.imageRef = el }}
                xlinkHref={this.state.currentImagebase64}
                height={newHeight}
                width={newWidth}
              />
              <text
                style={{ ...textStyle, zIndex: this.state.isTopDragging ? 4 : 1 }}
                x={this.state.topX}
                y={this.state.topY}
                dominantBaseline="middle"
                textAnchor="middle"
                onMouseDown={event => this.handleMouseDown(event, 'top')}
                onMouseUp={event => this.handleMouseUp(event, 'top')}
              >
                  {this.state.toptext}
              </text>
              <text
                style={textStyle}
                dominantBaseline="middle"
                textAnchor="middle"
                x={this.state.bottomX}
                y={this.state.bottomY}
                onMouseDown={event => this.handleMouseDown(event, 'bottom')}
                onMouseUp={event => this.handleMouseUp(event, 'bottom')}
              >
                  {this.state.bottomtext}
              </text>
            </svg>
            <div className="sticker-form">
              <FormGroup>
                <Label for="toptext">Top Text</Label>
                <input className="form-control" type="text" name="toptext" id="toptext" placeholder="Add text to the top" onChange={this.changeText} />
              </FormGroup>
              <FormGroup>
                <Label for="bottomtext">Bottom Text</Label>
                <input className="form-control" type="text" name="bottomtext" id="bottomtext" placeholder="Add text to the bottom" onChange={this.changeText} />
              </FormGroup>
              <button onClick={() => this.convertSvgToImage()} className="btn btn-primary">Download Sticker!</button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default MainPage;
