Materialnote for AutoForm
=======================

Add WYSIWYG editor to your Meteor app using Materialize.

Materialnote is a fork of summernote that can be found [here](https://github.com/Cerealkillerway/materialNote).

## Usage

1) Install `meteor add diegonc:autoform-materialnote`

2) Install Materialize or skip this if you have them installed

`meteor add materialize:materialize`

3) Create schema

```
var BookSchema = new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  content: {
    type: String,
    label: "Yet another poem",
    autoform: {
      afFieldInput: {
        type: 'summernote',
        class: 'editor' // optional
        settings: // summernote options goes here
      }
    }
  }
});
```

4) Attach schema to your collection `Books.attachSchema(BookSchema)`

5) Generate the form with `{{> quickform}}` or `{{#autoform}}`

```
{{> quickForm collection="Books" type="insert"}}
```

6) Remember to [sanitize the HTML on the server](https://atmospherejs.com/?q=sanitize)! Materialnote doesn't do that, and even if it did, the client could always send HTML containing `<script>` tags.

## Materialnote options

Materialnote is a fork of summernote that can be found [here](https://github.com/Cerealkillerway/materialNote).
See all available summernote options [here](http://summernote.org/#/deep-dive#api).

## Materialnote callbacks

Materialnote is a fork of summernote that can be found [here](https://github.com/Cerealkillerway/materialNote).
See all available summernote calbacks [here](http://summernote.org/#/deep-dive#callbacks).
