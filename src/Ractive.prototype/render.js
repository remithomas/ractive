// Render instance to element specified here or at initialization
proto.render = function ( options ) {
	var el, transitionManager;

	el = ( options.el ? getEl( options.el ) : this.el );

	if ( !el ) {
		throw new Error( 'You must specify a DOM element to render to' );
	}

	// Clear the element, unless `append` is `true`
	if ( !options.append ) {
		el.innerHTML = '';
	}

	this._transitionManager = transitionManager = makeTransitionManager( this, options.complete );

	// Render our *root fragment*
	this.fragment = new DomFragment({
		descriptor: this.template,
		root: this,
		owner: this, // saves doing `if ( this.parent ) { /*...*/ }` later on
		parentNode: el
	});

	el.appendChild( this.fragment.docFrag );
	this.ready = true;

	// transition manager has finished its work
	this._transitionManager = null;
	transitionManager.ready = true;
	if ( !transitionManager.active ) {
		transitionManager.complete();
	}
};