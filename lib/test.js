/* Tests */

App.test = {
	runJSpec: function(path, fixture) {
		var pathToFixture = fixture || '/spec/fixtures';
		JSpec
			.exec(path)
			.run({ fixturePath: pathToFixture })
			.report();
	}
};