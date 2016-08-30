Template.afMaterialnote.onCreated(function () {
  this.value = new ReactiveVar(this.data.value);
  this.editor_enabled = new ReactiveVar(false);
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

  this.autorun(() => {
    var data = Template.currentData();

    Tracker.afterFlush(function () {
      var already_enabled = Tracker.nonreactive(function () {
        return self.editor_enabled.get();
      });

      if (_.has(data.atts, "readonly") && already_enabled) {
        $editor
          .siblings(".note-editor")
          .remove();
        self.editor_enabled.set(false);
      } else if (!_.has(data.atts, "readonly")) {
        $editor
          .siblings(".note-editor")
          .remove();
        $editor.materialnote(options);
        /* Workaround for "Dropdown menus submit form"
         * https://github.com/Cerealkillerway/materialNote/issues/18
         */
        $editor
          .siblings(".note-editor")
          .find("button")
          .attr("type", "button");
        self.editor_enabled.set(true);
      }
    });
  });

  this.autorun(function () {
    if (self.editor_enabled.get())
      $editor.code(self.value.get());
  });

  $editor.closest('form').on('reset', function() {
    if (self.editor_enabled.get())
      $editor.code('');
  });
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
  },
  readonly: function () {
    return _.has(this.atts, "readonly");
  }
});
