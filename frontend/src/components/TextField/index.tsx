import React, { FormEventHandler } from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faExclamationCircle,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

export enum TextFieldType {
  Text = 'text',
  Password = 'password',
}

interface Props {
  id: string;
  name: string;
  label: string;
  value: string;
  placeholder: string;
  type?: TextFieldType;
  leftIcon?: IconDefinition;
  error?: string;
  touched?: boolean;
  validFieldMessage?: string;
  onChangeFn: FormEventHandler<HTMLInputElement>;
  onFocusFn: FormEventHandler<HTMLInputElement>;
  onBlurFn: FormEventHandler<HTMLInputElement>;
}

const TextField = ({
  id,
  name,
  label,
  value,
  placeholder,
  type = TextFieldType.Text,
  leftIcon,
  error,
  touched,
  validFieldMessage,
  onChangeFn,
  onFocusFn,
  onBlurFn,
}: Props) => {
  const inputClassName = cn('input is-medium', {
    'is-success': touched && !error,
    'is-danger': touched && error,
  });
  return (
    <div className="field">
      <label htmlFor={id} className="label" data-testid="TextField-label">
        {label}
      </label>
      <div className="control has-icons-left has-icons-right">
        <input
          id={id}
          name={name}
          className={inputClassName}
          type={type}
          onChange={onChangeFn}
          onFocus={onFocusFn}
          onBlur={onBlurFn}
          placeholder={placeholder}
          value={value}
        />
        {leftIcon && (
          <span
            className="icon is-small is-left"
            data-testid="TextField-leftIcon"
          >
            <FontAwesomeIcon icon={leftIcon} />
          </span>
        )}

        {touched ? (
          error ? (
            <span
              className="icon is-small is-right has-text-danger"
              data-testid="TextField-dangerIcon"
            >
              <FontAwesomeIcon icon={faExclamationCircle} />
            </span>
          ) : (
            <span
              className="icon is-small is-right has-text-success"
              data-testid="TextField-successIcon"
            >
              <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
            </span>
          )
        ) : null}
      </div>

      {touched ? (
        error ? (
          <p className="help is-danger" data-testid="TextField-dangerMessage">
            {error}
          </p>
        ) : (
          validFieldMessage && (
            <p
              className="help is-success"
              data-testid="TextField-successMessage"
            >
              {validFieldMessage}
            </p>
          )
        )
      ) : null}
    </div>
  );
};

export default TextField;
