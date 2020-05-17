import React from 'react';
import Enzyme,{ shallow, ShallowWrapper } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter : new EnzymeAdapter() })
/**
 * Factory function to create a shallowwrapper for the app component
 * @function setup
 * @param {object} props -component props specific to this setup
 * @param {any} state - initial state for this setup
 * @returns {ShallowWrapper}
 */
const setup =(props={},state=null)=>{
  const wrapper = shallow(<App {...props} />); 
  if(state){
    wrapper.setState(state);
  }
  return wrapper;
}
/**
 * Return shallowwrapper containing node(s) with the given data-set value.
 * @param {ShallowWrapper} wrapper -Enzyme shallow wrapper to search within.
 * @param {string} val -value of data-test attrbute for search
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper,val)=>{
  return wrapper.find(`[data-test='${val}']`);
}

test('renders without fail', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper,'component-app'); 
  expect(appComponent.length).toBe(1);
});
test('render increment button',()=>{
  const wrapper = setup();
  const button = findByTestAttr(wrapper,'increment-button');
  expect(button.length).toBe(1);
})
test('render counter display',()=>{
  const wrapper = setup();
  const counter = findByTestAttr(wrapper,'counter-display');
  expect(counter.length).toBe(1);
})
test('render counter start at 0',()=>{
  const wrapper = setup();
  const initialState = wrapper.state('counter');
  expect(initialState).toBe(0);
})
test('render counter display after click button',()=>{
  const counter = 7;
  const wrapper = setup(null,{ counter });
  const button = findByTestAttr(wrapper,'increment-button');
  button.simulate('click');
  const counterDisplay = findByTestAttr(wrapper,'counter-display');
  //console.log(counterDisplay.text());
  expect(counterDisplay.text()).toContain(counter+1);
})
test('render decrement button',()=>{
  const wrapper = setup();
  const decrementButton = findByTestAttr(wrapper,'decrement-counter');
  expect(decrementButton.length).toBe(1);
})
test('render counter display after decrement click button',()=>{
  const counter = 7;
  const wrapper = setup(null,{counter});
  const decrementButton = findByTestAttr(wrapper,'decrement-counter');
  decrementButton.simulate('click');
  const counterDisplay = findByTestAttr(wrapper,'counter-display');
  expect(counterDisplay.text()).toContain(counter-1);
})
test('render error message after click decrement at counter 0',()=>{
  const counter = 0;
//  const errorFlag = false;
  const wrapper = setup(null,{ counter });
  const decrementButton = findByTestAttr(wrapper,'decrement-counter');
  decrementButton.simulate('click');
  //const errorDisplay = findByTestAttr(wrapper,'error-display');
  //expect(errorDisplay.text()).toContain('You cannot decrement.');
  expect(wrapper.state().errorFlag).toBe(true);
})
test('render error message after click increment counter',()=>{
  const counter = 0;
  const wrapper = setup(null,{ counter });
  const decrementButton = findByTestAttr(wrapper,'decrement-counter');
  decrementButton.simulate('click');
  const button = findByTestAttr(wrapper,'increment-button');
  button.simulate('click');
  expect(wrapper.state().errorFlag).toBe(false);
})