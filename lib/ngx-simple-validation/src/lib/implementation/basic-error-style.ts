import { IErrorStyle } from '../contract/error-style';
import { IErrorElementStyle } from '../contract/error-element-style';
import { Self } from '@angular/core';

export class BasicErrorStyle implements IErrorStyle {
  private static errorElementStyle: IErrorElementStyle = null;
  private static counter = 0;

  constructor() {}

  public static configure(errorElementStyle: IErrorElementStyle): Self {
    BasicErrorStyle.errorElementStyle = errorElementStyle;

    return BasicErrorStyle;
  }

  public showError(element: HTMLElement, errorMessage: string) {
    const errorElementId = element.getAttribute('error-element-id');

    if (errorElementId) {
      const errorElement = document.getElementById(errorElementId);

      if (errorElement) {
        errorElement.innerHTML = errorMessage;
      } else {
        this.createErrorElement(element, errorMessage, errorElementId);
      }
    } else {
      this.createErrorElement(element, errorMessage);
    }
  }

  public removeError(element: HTMLElement) {
    const errorElementId = element.getAttribute('error-element-id');

    if (errorElementId) {
      const errorElement = document.getElementById(errorElementId);

      if (errorElement) {
        errorElement.remove();
      }
    }
  }

  private createErrorElement(
    element: HTMLElement,
    errorMessage: string,
    oldErrorElementId?: string
  ) {
    const errorElement = document.createElement(
      BasicErrorStyle.errorElementStyle.element
    );
    const errorElementId =
      oldErrorElementId || `error-field-${BasicErrorStyle.counter++}`;

    errorElement.className = BasicErrorStyle.errorElementStyle.className;
    errorElement.innerHTML = errorMessage;
    errorElement.id = errorElementId;
    element.setAttribute('error-element-id', errorElementId);

    for (const key in BasicErrorStyle.errorElementStyle.style) {
      if (BasicErrorStyle.errorElementStyle.style.hasOwnProperty(key)) {
        errorElement.style[key] = BasicErrorStyle.errorElementStyle.style[key];
      }
    }

    element.insertAdjacentElement('afterend', errorElement);
  }
}
