import React, { Component } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { nanoid } from 'nanoid';
import {
  Input,
  Button,
  StyledForm,
  Label,
  ErrorMsg,
} from './ContactForm.styled';

const initialValues = {
  name: '',
  number: '',
};

const nameRegExp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

const phoneRegExp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      nameRegExp,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .trim()
    .required(),
  number: yup
    .string()
    .matches(
      phoneRegExp,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +. For example +123 456 789 or +987-654-321 or +123456789'
    )
    .trim()
    .required(),
});

class ContactForm extends Component {
  nameInputId = nanoid();
  telInputId = nanoid();

  handleSubmit = (values, { resetForm }) => {
    this.props.onSubmit(values);

    resetForm();
  };

  render() {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={this.handleSubmit}
      >
        <StyledForm autoComplete="off">
          <Label htmlFor={this.nameInputId}>Name</Label>
          <Input id={this.nameInputId} type="text" name="name" />
          <ErrorMsg component="p" name="name" />
          <Label htmlFor={this.telInputId}>Number</Label>
          <Input id={this.telInputId} type="tel" name="number" />
          <ErrorMsg component="p" name="number" />
          <Button type="submit">Add contact</Button>
        </StyledForm>
      </Formik>
    );
  }
}

export default ContactForm;
