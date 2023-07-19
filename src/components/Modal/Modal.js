import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    console.log('Modal componentDidMount');
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        console.log('e.code', e.code);
        console.log('Нажали Escape, нужно закрыть модалку');
        this.props.onClose();
      }
    
    });
  }

  componentWillUnmount() {
    console.log('Modal componentWillUnmount');
  }
  render() {
    return createPortal(
      <div className="Modal__backdrop">
        <div className="Modal__content">{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
