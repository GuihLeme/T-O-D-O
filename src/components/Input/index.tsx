import { useField } from '@unform/core';
import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from '../../hooks/theme';

import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<InputProps> = ({name, ...rest}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState(false);
  const { theme } = useTheme();

  const { fieldName, registerField, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const toggleCheckbox = useCallback(() => {
    setIsChecked(!isChecked);
  }, [isChecked])

  return (
    <div className={`inputContainer ${theme}`}>
      <div className={isChecked ? 'checked' : 'checkbox'} onClick={toggleCheckbox}>
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
          <path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/>
        </svg>
      </div>
      <input
        type="text"
        placeholder="Create a new todo..."
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </div>
  );
}

export default Input;
