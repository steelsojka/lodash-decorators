export interface DecoratorMetadata {
  kind: 'field' | 'method' | 'class';

}

export interface Tc39FieldDecoratorMetadata<T = any> extends DecoratorMetadata {
  kind: 'field';
  key: keyof T;
  placement: 'own' | 'static' | 'prototype';
  descriptor: PropertyDescriptor;
  initializer: () => any;
}

export interface Tc39MethodDecoratorMetadata<T = any> extends DecoratorMetadata {
  kind: 'method';
  key: keyof T;
  placement: 'own' | 'static' | 'prototype';
  descriptor: PropertyDescriptor;
}

export interface Tc39ClassDecoratorMetadata extends DecoratorMetadata {
  kind: 'class';
  elements: Tc39ClassElement[];
}

export interface Tc39OptionalElements {
  extras?: Tc39ClassElement;
  finisher?: () => any;
}

export type Tc39ClassElement = (Tc39FieldDecoratorMetadata | Tc39MethodDecoratorMetadata) & Tc39OptionalElements;
export type Tc39FieldDecorator = (metadata: Tc39FieldDecoratorMetadata) => Tc39FieldDecoratorMetadata & Tc39OptionalElements;
export type Tc39MethodDecorator = (metadata: Tc39MethodDecoratorMetadata) => Tc39MethodDecoratorMetadata & Tc39OptionalElements;
export type Tc39ClassDecorator = (metadata: Tc39ClassDecoratorMetadata) => Tc39MethodDecoratorMetadata & { finisher?: () => any };
