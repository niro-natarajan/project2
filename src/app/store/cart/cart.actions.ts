import { createAction, props } from '@ngrx/store';
import { products } from '../../services/attribute';

export const addToCart = createAction('[Cart] Add To Cart', props<{ product: products }>());

export const incrementCounter = createAction('[Cart] Increment Counter');

export const incrementQuantity = createAction('[Cart] Increment Quantity', props<{ id: number }>());
export const decrementQuantity = createAction('[Cart] Decrement Quantity', props<{ id: number }>());

export const deleteFromCart = createAction('[Cart] Delete From Cart', props<{ id: number }>());

export const clearCart = createAction('[Cart] Clear Cart');
