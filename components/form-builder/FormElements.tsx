import { FormElement } from '@/lib/types';
import { TextFieldFormElement } from './elements/TextField';
import { CheckboxFieldFormElement } from './elements/CheckboxField';

type FormElementsType = {
  [key: string]: FormElement;
};

export const formElements: FormElementsType = {
  TextField: TextFieldFormElement,
  Checkbox: CheckboxFieldFormElement,
};