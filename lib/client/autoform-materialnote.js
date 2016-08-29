AutoForm.addInputType('materialnote', {
	template: 'afMaterialnote',
	valueOut: function() {
		return this.code();
	}
});
