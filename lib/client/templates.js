Template.afMaterialnote.onCreated(function () {
  this.value = new ReactiveVar(this.data.value);
});

Template.afMaterialnote.onRendered(function () {
  var self = this;
  var options = this.data.atts.settings || {};
  var $editor = this.$("div[data-schema-key]");

  var onblur = options.onblur;
  options.onblur = function(e) {
    $editor.change();
    if (typeof onblur === 'function') {
      onblur.apply(this, arguments);
    }
  };

  $editor.materialnote(options);

  this.autorun(function () {
    $editor.code(self.value.get());
  });

  $editor.closest('form').on('reset', function() {
    $editor.code('');
  });

  /* Workaround for "Dropdown menus submit form"
   * https://github.com/Cerealkillerway/materialNote/issues/18
   */
  $editor
    .siblings(".note-editor")
    .find("button")
    .attr("type", "button");
});

Template.afMaterialnote.helpers({
  atts: function () {
    var self = this;

    /**
     * This is bit hacky but created and rendered callback sometimes
     * (or always?) get empty value. This helper gets called multiple
     * times so we intercept and save the value once it is not empty.
     */
    Tracker.nonreactive(function () {
      var t = Template.instance();
      if (t.value.get() !== self.value) {
        t.value.set(self.value);
      }
    });

    return _.omit(this.atts, 'settings');
  }
});
