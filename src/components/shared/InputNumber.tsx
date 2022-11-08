import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

export function withProperties<A, B>(component: A, properties: B): A & B {
  Object.keys(properties as any).forEach((key) => {
    (component as any)[key] = (properties as any)[key];
  });
  return component as A & B;
}

import Input from './Input';

interface IProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  forceReset?: boolean;
}
const useNumberProps = ({ initialValue, onChange, forceReset }: IProps = {}) => {
  const pattern = useMemo(() => /^[0-9]*[.]?[0-9]*$/, []);
  const fixedInitialValue = useMemo(() => initialValue || '', [initialValue]);
  const [value, set] = useState(fixedInitialValue);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const { value } = e.target;

      if (!pattern.test(value)) return;

      set(value);

      if (onChange) onChange(value);
    },
    [pattern, onChange]
  );

  const reset = useCallback(() => {
    set(fixedInitialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!forceReset) return;

    reset();
  }, [forceReset, reset]);

  const onFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return {
    reset,
    value,
    set,
    onChange: handleChange,
    isFocused,
    onFocus,
    onBlur,
  };
};

const InputNumber = styled(Input).attrs({
  inputmode: 'decimals',
})``;

export default withProperties(InputNumber, {
  useProps: useNumberProps,
});
