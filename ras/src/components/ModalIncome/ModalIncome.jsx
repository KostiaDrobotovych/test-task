import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import DatePicker from '../DatePicker/DatePicker';

// import getUserId from selectors

import Arrow from '../../assets/images/arrow.svg';
import Button from '../Button/Button';

import s from './ModalIncome.module.css';

const INITIAL_STATE = {
  date: new Date(),
  category: '',
  amount: null,
  comments: ''
};

const typeAndBalanceOfModal = (prevBalance, amount) => ({
  type: '+',
  balanceAfter: prevBalance + amount
});

class Modal extends Component {
  backdropRef = createRef();

  state = { ...INITIAL_STATE };

  componentDidMount() {
    window.addEventListener('click', this.handleBackdropClick);
    window.addEventListener('keydown', this.handleEscapeDown);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleBackdropClick);
    window.removeEventListener('keydown', this.handleEscapeDown);
  }

  handleAmountAndCommentChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: name === 'amount' ? Number(value) : value
    });
  };

  handleChangeDate = date => {
    this.setState({
      date
    });
  };

  handleCategoryChange = ({ target: { value } }) => {
    this.setState({
      category: value
    });
  };

  handleBtnClick = () => {
    const { handleCloseClick } = this.props;

    handleCloseClick();
  };

  handleEscapeDown = ({ code }) => {
    const { handleCloseClick } = this.props;

    if (code !== 'Escape') return;

    handleCloseClick();
  };

  handleBackdropClick = ({ target }) => {
    const { handleCloseClick } = this.props;

    if (this.backdropRef.current !== target) return;

    handleCloseClick();
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { handleCloseClick } = this.props;
    const { amount, date } = this.state;

    const dateInMilliseconds = date.getTime();
    console.log({
      ...this.state,
      ...typeAndBalanceOfModal(1000, amount),
      ...{ date: dateInMilliseconds }
    });
    this.setState({ ...INITIAL_STATE });
    handleCloseClick();
  };

  render() {
    const btnMobile = () => (
      <>
        <div className={s.wrapArrow}>
          <img src={Arrow} alt="arrow" className={s.arrow} />
        </div>
        <h2 className={s.titleArrow}>Add Income</h2>
      </>
    );

    const { handleSubmitForm } = this.props;
    const { date, category, amount, comments } = this.state;
    return (
      <div className={s.backdrop} ref={this.backdropRef} onSubmit={handleSubmitForm}>
        <div className={s.modal}>
          <div className={s.wrapBtn}>
            <Button type="button" style={s.arrowBtn} value={btnMobile()} onClick={this.handleBtnClick} />
          </div>
          <h2 className={s.title}>Add Income</h2>

          <form onSubmit={this.handleFormSubmit} className={s.form}>
            <input
              type="number"
              className={s.amountInp}
              placeholder="Amount.00"
              value={amount}
              name="amount"
              onChange={this.handleAmountAndCommentChange}
              required
            />
            <DatePicker style={s.dateInp} selected={date} onChange={this.handleChangeDate} />

            <h3 className={s.subtitle}>Category</h3>

            <label htmlFor="radioFirst" className={s.radioTop}>
              <input
                className={s.radioInp}
                type="radio"
                id="radioFirst"
                name="category"
                value="Regular Income"
                checked={category === 'Regular Income'}
                onChange={this.handleCategoryChange}
                required
              />
              <p>Regular Income</p>
            </label>
            <label htmlFor="radioSecond" className={s.radioBottom}>
              <input
                className={s.radioInp}
                type="radio"
                id="radioSecond"
                name="category"
                value="Irregular Income"
                checked={category === 'Irregular Income'}
                onChange={this.handleCategoryChange}
                required
              />
              <p>Irregular Income</p>
            </label>

            <h3 className={s.subtitle}>Comments</h3>

            <textarea
              className={s.text}
              onChange={this.handleAmountAndCommentChange}
              name="comments"
              value={comments}
              placeholder="Your comment"
              maxLength="56"
            />

            <Button style={s.btn} type="submit" value="Add" />
          </form>
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  handleSubmitForm: () => null,
  handleCloseClick: () => null
};

Modal.propTypes = {
  handleSubmitForm: PropTypes.func,
  handleCloseClick: PropTypes.func
};

export default Modal;

// const mapState = state => ({

// })

// const mapDispatch = {};

// export default connect(mapState,mapDispatch)(Modal);
