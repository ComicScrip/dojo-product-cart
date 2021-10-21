# Dojo React - Product cart

This dojo is meant as a practice about:

- list display
- state management
- forms
- events

First step: clone this repository (and get into it on your local machine afterwards)

## Launch the app

```sh
$ npm install && npm start
```

## Objectives

The global aim is to create a small React app to manage a shopping cart.

![Final app screenshot](https://i.imgur.com/TRUaDKk.png)

To make things easier, everything can be done in your `App` component.

Please pay attention to `App.css`, in order to use **only** existing CSS classes and limit the amount of styling you'll have to do.

Tip: _as usual_, keep your terminal open during development, it'd be too bad to miss a warning/error message ;-)

## Instructions

### Display products (Read | GET | SELECT)

In `App.js` you have data about a few products in the `initialProductList` constant.
Display these three products in an array with the following columns:

- 'Product' (`name`)
- 'Unit Price' (`price`)
- 'Quantity' (`quantity`)
- 'Total Price' (`price * quantity`)

Warning: Since we'll update this list in the next steps and we want React to propagate these changes on your app, **data about products should be drawn from your `App`'s `state`** (as opposed to directly from `initialProductList`, which should remain untouched and represent the **initial** list of products).

Under the table, display the total cart price. You can get it by adding every "Total Price" from the cart array.
Tip: You could use [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).

### Add a product in your cart (Create | POST | INSERT INTO)

Create a form to add a product to your order:

- It should contain two fields "Name" and "Price", plus a "Add" submit button.
- When you submit the form, the system should check:
  - that the name exist
  - that the price is coherent (HTML5 brought input types, check it out !)
- A newly added product has a quantity of 1
- Any newly added product should have a unique "id", randomly generated when the form is submitted. Tip: [This](https://www.npmjs.com/package/uuid) package is awesome in this case !

### Allow my user to change the needed quantity for any item (Update | PUT or PATCH | UPDATE)

In your array, the "Quantity" column should contain several `<input>` and nothing else (Think about your input type and about value consistency: we're speaking about a **quantity**)

### Delete a product from my list (Delete | DELETE | DELETE)

As soon as a "quantity" field reaches 0, a `window.confirm` pop-up should display to ask for a confirmation (Ex: "Are you sure you want to remove this product from your cart ?"):

- On user confirmation, we remove said product (How nice of us! :p)
- Otherwise, the quantity should not be updated (NB: It does **not** mean "Set quantity to 1 unit" !)
